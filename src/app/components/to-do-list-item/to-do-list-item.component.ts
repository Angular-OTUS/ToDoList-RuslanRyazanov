import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoListItem } from '../../interfaces/to-do-list-item';

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  @Input() listItem!: TodoListItem;
  @Output() delete = new EventEmitter<number>();

  public deleteItem() {
    this.delete.emit(this.listItem.id);
  }
}
