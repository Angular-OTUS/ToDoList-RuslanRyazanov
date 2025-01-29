import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NgForOf, NgIf } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ToDoListItemComponent } from "../to-do-list-item/to-do-list-item.component";
import { ItemStatus, TodoListItem } from "../../interfaces/to-do-list-item";
import { TodoListService } from "../../shared/services/todoListService";
import { ToastService } from "../../shared/services/toastService";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgForOf,
    NgIf,
    RouterOutlet,
    ToDoListItemComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {
  protected isLoading: boolean = true;
  protected filteredItems: TodoListItem[] = [];
  protected selectedStatus: ItemStatus | null = null;
  protected statuses: string[] = Object.values(ItemStatus);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    setTimeout((): void => {
      this.isLoading = false;
    }, 500);
    this.filterItems();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getAllListItems(): TodoListItem[] {
    return [...this.filteredItems];
  }

  protected deleteItem(itemId: string): void {
    this.todoListService.deleteItem(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.filteredItems = this.todoListService.deleteItemArray(this.filteredItems, itemId);
      this.toastService.showToast("Item deleted");
    });
  }

  protected updateItem(updatedItem: TodoListItem): void {
    this.todoListService.updateItem(updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: TodoListItem) => {
      this.filteredItems = this.todoListService.updateItemArray(this.filteredItems, response);
      this.toastService.showToast("Item updated");
    });
  }

  protected filterItems(): void {
    if (this.selectedStatus === null) {
      this.todoListService.getAllListItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe((listItems: TodoListItem[]) => {
          this.filteredItems = listItems;
        });
    } else {
      this.todoListService.getAllListItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe((listItems: TodoListItem[]) => {
          this.filteredItems = listItems.filter((item: TodoListItem) => item.status === this.selectedStatus);
        });
    }
  }

  protected getAllListItemsByStatus(status: string): TodoListItem[] {
    return this.getAllListItems().filter((item: TodoListItem) => item.status === status);
  }
}
