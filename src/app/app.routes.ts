import { Routes } from '@angular/router';
import { ToDoListComponent } from "./components/to-do-list/to-do-list.component";
import { ToDoListItemViewComponent } from './components/to-do-list-item-view/to-do-list-item-view.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full"
  },
  {
    path: "tasks",
    component: ToDoListComponent,
    children: [
      {
        path: ":itemId",
        component: ToDoListItemViewComponent,
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/tasks",
  }
];
