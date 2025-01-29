import { Routes } from '@angular/router';
import { ToDoListComponent } from "./components/to-do-list/to-do-list.component";
import { ToDoListItemViewComponent } from './components/to-do-list-item-view/to-do-list-item-view.component';
import { TaskBoardComponent } from "./components/task-board/task-board.component";
import { BoardComponent } from "./components/board/board.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "backlog/tasks",
    pathMatch: "full"
  },
  {
    path: "",
    component: TaskBoardComponent,
    children: [
      {
        path: "backlog/tasks",
        component: ToDoListComponent,
        children: [
          {
            path: ":itemId",
            component: ToDoListItemViewComponent
          }
        ]
      },
      {
        path: "board",
        component: BoardComponent
      },
    ]
  },
  {
    path: "**",
    redirectTo: "/",
  }
];
