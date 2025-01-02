import { Component, OnInit } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TodoListItem } from '../../interfaces/to-do-list-item';
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';
import {TodoListService} from "../../shared/services/todoListService";
import {ToastService} from "../../shared/services/toastService";

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
    NgClass
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit {

  public newItemValue: string = '';
  public isLoading: boolean = true;
  public newItemDescription: string = '';
  public selectedItemId: string = '';
  public description: string = '';

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    setTimeout(() =>  this.isLoading = false, 500);
  }

  protected getAllListItems(): TodoListItem[] {
    return this.todoListService.getAllListItems();
  }

  public addItem(text: string, description: string) {
    this.todoListService.addItem(text, description);
    this.toastService.showToast("Item added");
  }

  public deleteItem(itemId: string) {
    this.todoListService.deleteItem(itemId);
    this.toastService.showToast("Item deleted");
  }

  public selectItem(itemId: string) {
    this.selectedItemId = itemId;
  }

  protected updateItem(updatedItem: TodoListItem) {
    this.todoListService.updateItem(updatedItem);
    this.toastService.showToast("Item updated");
  }

  public isSelectedItemDescription(): string {
    return this.todoListService.getAllListItems().find(item => item.id === this.selectedItemId)?.description ?? '';
  }
}
