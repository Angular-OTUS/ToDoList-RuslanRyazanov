import { Injectable } from "@angular/core";
import { TodoListItem, ItemStatus } from "../../interfaces/to-do-list-item";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment";
import { Observable } from "rxjs";
import { ToastService } from "./toastService";

@Injectable({
  providedIn: "root"
})
export class TodoListService {
  public getInteger = (min = 0, max = 10) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    if ( min < 0 || min >= max ) {
      throw new Error(`Значение min: ${min} превышает значение max: ${max} или указано отрицательное число`);
    }
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  private readonly apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}


  public addItem(title: string, description?: string) {
    if (title.trim()) {
      const newItem: TodoListItem  = {
        id: this.getInteger(1, 1000),
        text: title.trim(),
        description: description?.trim(),
        status: ItemStatus.IN_PROGRESS
      };
      this.httpClient.post(this.apiUrl, newItem)
      .subscribe({
        error: (err) => {
          this.toastService.showToast("Error adding new item");
          console.error(err);
        }
    })
    return true;
    }
    return false;
  }
  public getAllListItems(): Observable<TodoListItem[]> {
    return this.httpClient.get<TodoListItem[]>(this.apiUrl);
  }
  public updateItem(updatedItem: TodoListItem): Observable<TodoListItem> {
    return this.httpClient.put<TodoListItem>(`${this.apiUrl}/${updatedItem.id}`, updatedItem)
  }
  public deleteItem(itemId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${itemId}`)
  }
  public updateItemArray(items: TodoListItem[], updatedItem: TodoListItem): TodoListItem[] {
    const index: number = items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
    }
    return [...items];
  }
  public deleteItemArray(items: TodoListItem[], itemId: string): TodoListItem[] {
    return items.filter(item => item.id !== itemId);
  }
}
