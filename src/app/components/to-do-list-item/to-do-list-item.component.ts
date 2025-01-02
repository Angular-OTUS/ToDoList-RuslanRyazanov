import { Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';
import { TodoListItem } from '../../interfaces/to-do-list-item';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from "../../shared/directives/tooltip.directive";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective, FormsModule, NgIf],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  @Input() listItem!: TodoListItem;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<TodoListItem>();
  deleteButtonTitle = "Delete";
  saveButtonTitle = "Save";
  isEditing = false;
  editText = '';
  constructor(
    private elementRef: ElementRef
  ) {}

  public deleteItem(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit(this.listItem.id);
  }
  public enableEdit() {
    this.isEditing = true;
    this.editText = this.listItem.text;
  }
  public saveTitle() {
    if (this.editText.trim()) {
      this.listItem.text = this.editText;
      this.update.emit(this.listItem);
      this.isEditing = false;
    }
  }
  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isEditing) {
      this.isEditing = false;
    }
  }
}
