import { Component, OnInit } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TodoListItem, ItemStatus } from '../../interfaces/to-do-list-item';
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';
import { TodoListService } from "../../shared/services/todoListService";
import { ToastService } from "../../shared/services/toastService";
import { SpinnerComponent } from "../spinner/spinner.component";
import { MatOption, MatSelect } from "@angular/material/select";
import { ToDoCreateItemComponent } from "../to-do-create-item/to-do-create-item.component";

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ToDoListItemComponent,
    FormsModule,
    NgForOf,
    MatFormField,
    MatInput,
    NgIf,
    ButtonComponent,
    TooltipDirective,
    NgClass,
    SpinnerComponent,
    MatSelect,
    MatOption,
    ToDoCreateItemComponent
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit {

  public newItemValue: string = '';
  public newItemDescription: string = '';
  public description: string = '';

  public componentTitle: string = "Todo List"
  public isLoading: boolean = true;
  public selectedItemId: string = '';
  public isSelectedItemDescription: string = '';
  public filteredItems: TodoListItem[] = [];
  public selectedStatus: ItemStatus | null = null;
  public statuses: string[] = Object.values(ItemStatus);

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    setTimeout(() =>  this.isLoading = false, 500);
    this.filterItems();
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
    this.todoListService.deleteItem(itemId);
    this.filterItems();
    this.toastService.showToast("Item deleted");
  }

  public selectItem(itemId: string) {
    this.selectedItemId = itemId;
    this.todoListService.getAllListItems()
    .subscribe((listItems) => {
    this.isSelectedItemDescription = listItems.find(item => item.id === this.selectedItemId)?.description ?? '';
  })
  }
  public updateItem(updatedItem: TodoListItem) {
    this.todoListService.updateItem(updatedItem);
    this.filterItems();
    this.toastService.showToast("Item updated");
  }

  public filterItems(): void {
    if (this.selectedStatus === null) {
      this.todoListService.getAllListItems()
        .subscribe((listItems) => {
        this.filteredItems = listItems;
      })
    } else {
      this.todoListService.getAllListItems()
        .subscribe((listItems) => {
        this.filteredItems = listItems.filter(item => item.status === this.selectedStatus);
      })
    }
  }
}
