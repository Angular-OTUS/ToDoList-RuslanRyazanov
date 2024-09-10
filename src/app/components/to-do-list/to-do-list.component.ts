import { Component, OnInit } from '@angular/core';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item.component';
import { TodoListItem } from '../../interfaces/to-do-list-item';
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ButtonComponent } from '../button/button.component';

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
    ButtonComponent
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit {

  public newItemValue: string = '';
  public isLoading: boolean = true;

  public listItems: TodoListItem[] = [
    { id: 1, text: "Buy a new gaming laptop" },
    { id: 2, text: "Complete previous task" },
    { id: 3, text: "Create some angular app" }
  ]

  ngOnInit(): void {
    setTimeout(() =>  this.isLoading = false, 500);
  }

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
