import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoListService } from "../../shared/services/todoListService";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map, Subject, switchMap, takeUntil } from "rxjs";
import { TodoListItem } from "../../interfaces/to-do-list-item";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-to-do-list-item-view',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './to-do-list-item-view.component.html',
  styleUrl: './to-do-list-item-view.component.scss'
})
export class ToDoListItemViewComponent implements OnInit, OnDestroy {


  private destroy$: Subject<void> = new Subject<void>();
  public listItem: TodoListItem | null = null;

  constructor(
    private todoListService: TodoListService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((paramMap: ParamMap) => {
          const itemId = paramMap.get("itemId");
          return this.todoListService.getAllListItems().pipe(
            map((listItems) => listItems.find(item => item.id === itemId))
          );
        })
      )
      .subscribe((item) => {
        if (item) {
          this.listItem = item;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public isSelectedItemDescription(): string {
    if (this.listItem == null || this.listItem.description == null) {
      return '';
    } else {
      return this.listItem.description;
    }
  }

}
