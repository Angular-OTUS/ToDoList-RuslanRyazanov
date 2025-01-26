import { Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';
import { TodoListItem, ItemStatus } from '../../interfaces/to-do-list-item';
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
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  public deleteButtonTitle: string = "Delete";
  public saveButtonTitle: string = "Save";
  public isEditing: boolean = false;
  public editText: string = '';
  constructor(
    private elementRef: ElementRef
  ) {}

  public deleteItem() {
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

  public toggleStatus(): void {
    this.listItem.status = this.listItem.status === ItemStatus.IN_PROGRESS ?
      ItemStatus.COMPLETED : ItemStatus.IN_PROGRESS;
    this.update.emit(this.listItem);
  }

  public ItemStatus = ItemStatus;
}
