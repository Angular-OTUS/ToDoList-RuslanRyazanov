import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TodoListItem, ItemStatus } from '../../interfaces/to-do-list-item';
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { TodoListService } from "../../shared/services/todoListService";
import { ToastService } from "../../shared/services/toastService";
import { SpinnerComponent } from "../spinner/spinner.component";
import { MatOption, MatSelect } from "@angular/material/select";
import { ToDoCreateItemComponent } from "../to-do-create-item/to-do-create-item.component";
import { Router, RouterOutlet } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ToDoListItemComponent,
    FormsModule,
    NgForOf,
    MatFormField,

    NgIf,

    NgClass,
    SpinnerComponent,
    MatSelect,
    MatOption,
    ToDoCreateItemComponent,
    RouterOutlet
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit, OnDestroy {

  public newItemValue: string = '';
  public newItemDescription: string = '';
  public description: string = '';

  public componentTitle: string = "Todo List"
  public isLoading: boolean = true;
  public selectedItemId: string = '';
  public filteredItems: TodoListItem[] = [];
  public selectedStatus: ItemStatus | null = null;
  public statuses: string[] = Object.values(ItemStatus);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() =>  this.isLoading = false, 500);
    this.filterItems();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getAllListItems(): TodoListItem[] {
    return [...this.filteredItems];
  }

  public addItem(created: boolean):void {
    if (created) {
      this.filterItems();
      this.toastService.showToast("Item added");
    }
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.filteredItems = this.todoListService.deleteItemArray(this.filteredItems, itemId);
      this.toastService.showToast("Item deleted");
    });
  }

  public selectItem(itemId: string) {
    this.selectedItemId = itemId;
    this.router.navigate([`backlog/tasks/${itemId}`]).then();
  }
  public updateItem(updatedItem: TodoListItem) {
    this.todoListService.updateItem(updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: TodoListItem) => {
      this.filteredItems = this.todoListService.updateItemArray(this.filteredItems, response);
      this.toastService.showToast("Item updated");
    });
  }

  public filterItems(): void {
    if (this.selectedStatus === null) {
      this.todoListService.getAllListItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe((listItems) => {
        this.filteredItems = listItems;
      })
    } else {
      this.todoListService.getAllListItems()
        .pipe(takeUntil(this.destroy$))
        .subscribe((listItems) => {
        this.filteredItems = listItems.filter(item => item.status === this.selectedStatus);
      })
    }
  }
}
