import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TodoListItem, ItemStatus } from '../../interfaces/to-do-list-item';
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { TodoListService } from "../../shared/services/todoListService";
import { ToastService } from "../../shared/services/toastService";
import { SpinnerComponent } from "../spinner/spinner.component";
import { MatOption, MatSelect } from "@angular/material/select";
import { ToDoCreateItemComponent } from "../to-do-create-item/to-do-create-item.component";
import { Router, RouterOutlet } from "@angular/router";
import { Subject, takeUntil, BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

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
    RouterOutlet,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit, OnDestroy {

  public newItemValue: string = '';
  public newItemDescription: string = '';
  public description: string = '';

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public selectedItemId: string = '';
  private filteredItems: BehaviorSubject<TodoListItem[]> = new BehaviorSubject<TodoListItem[]>([]);
  private selectedStatus: BehaviorSubject<ItemStatus | null> = new BehaviorSubject<ItemStatus | null>(null);
  public statuses: string[] = Object.values(ItemStatus);
  private destroy$: Subject<void> = new Subject<void>();


  public isLoading$: Observable<boolean> = this.isLoading.asObservable();
  public filteredItems$: Observable<TodoListItem[]> = this.filteredItems.asObservable();
  public selectedStatus$: Observable<ItemStatus | null> = this.selectedStatus.asObservable();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initFilter();
    setTimeout(() => this.isLoading.next(false), 500);

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addItem(created: boolean):void {
    if (created) {
      this.initFilter();
      this.toastService.showToast(this.translateService.instant('toast.task.created'));
    }
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const updatedItems: TodoListItem[] = this.todoListService.deleteItemArray(this.filteredItems.getValue(), itemId);
        this.filteredItems.next(updatedItems);
        this.toastService.showToast(this.translateService.instant('toast.task.deleted'));
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
      const updatedItems: TodoListItem[] = this.filteredItems.getValue().map(item =>
        item.id === response.id ? response : item
      );
      const selectedStatus: ItemStatus | null = this.selectedStatus.getValue();
      const filteredItems: TodoListItem[] =
        selectedStatus ? updatedItems.filter((item: TodoListItem) => item.status === selectedStatus) : updatedItems;
      this.filteredItems.next(filteredItems);
      this.toastService.showToast(this.translateService.instant('toast.task.updated'));
    });
  }




  protected setStatus(status: ItemStatus | null): void {
    this.selectedStatus.next(status);
  }
  private initFilter(): void {
    combineLatest([this.todoListService.getAllListItems(), this.selectedStatus$])
      .pipe(
        takeUntil(this.destroy$),
        map(([listItems, selectedStatus]) =>
          selectedStatus === null ? listItems : listItems.filter(item => item.status === selectedStatus)
        )
      )
      .subscribe(filteredItems => this.filteredItems.next(filteredItems));
  }
}
