import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { MatInput } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TooltipDirective } from "../../shared/directives/tooltip.directive";
import { TodoListService } from "../../shared/services/todoListService";

@Component({
  selector: 'app-to-do-create-item',
  standalone: true,
  imports: [
    ButtonComponent,
    MatInput,
    ReactiveFormsModule,
    TooltipDirective,
    FormsModule
  ],
  templateUrl: './to-do-create-item.component.html',
  styleUrl: './to-do-create-item.component.scss'
})
export class ToDoCreateItemComponent {
  public readonly inputPlaceholder: string = "Add your new todo"
  public readonly descriptionPlaceholder: string = "Add your new todo description"
  public readonly addButtonTitle: string = "Add task"
  public readonly newItemValue: string = '';
  public readonly newItemDescription: string = '';

  @Output() addItem: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private todoListService: TodoListService
  ) {}

  protected createItem(title: string, description?: string): void {
    this.addItem.emit(this.todoListService.addItem(title, description));
  }
}
