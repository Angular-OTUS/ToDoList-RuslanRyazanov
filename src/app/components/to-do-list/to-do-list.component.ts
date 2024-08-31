import { Component } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TodoListItem } from '../../interfaces/to-do-list-item';
import { FormsModule } from "@angular/forms";
import { NgForOf } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ToDoListItemComponent,
    FormsModule,
    NgForOf,
    MatFormField,
    MatInput,
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {

  public newItemValue: string = '';

  public listItems: TodoListItem[] = [
    { id: 1, text: "Buy a new gaming laptop" },
    { id: 2, text: "Complete previous task" },
    { id: 3, text: "Create some angular app" }
  ]

  public addItem(text: string) {
    if (text.trim()) {
      const newItem = {
        id: this.listItems.length + 1,
        text: text.trim()
      };
      this.listItems.push(newItem);
    }
  }

  public deleteItem(itemId: number) {
    this.listItems = this.listItems.filter(item => item.id !== itemId);
  }
}
