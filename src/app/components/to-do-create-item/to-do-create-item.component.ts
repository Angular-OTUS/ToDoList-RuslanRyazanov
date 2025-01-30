import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { MatInput } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TooltipDirective } from "../../shared/directives/tooltip.directive";
import { TodoListService } from "../../shared/services/todoListService";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "../../shared/services/toastService";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-to-do-create-item',
  standalone: true,
  imports: [
    ButtonComponent,
    MatInput,
    ReactiveFormsModule,
    TooltipDirective,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './to-do-create-item.component.html',
  styleUrl: './to-do-create-item.component.scss'
})
export class ToDoCreateItemComponent implements OnDestroy {
  public newItemValue: string = '';
  public newItemDescription: string = '';

  private destroy$: Subject<void> = new Subject<void>();

  @Output() addItem: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private todoListService: TodoListService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  protected createItem(title: string, description?: string): void {
    this.todoListService.addItem(title, description)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      error: (err) => {
        this.toastService.showToast(this.translateService.instant('toast.task.error'));
        throw Error("Error adding new item: " + err.message);
      }
    });
    this.addItem.emit(true);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
