import {Injectable} from "@angular/core";
import {TodoListItem} from "../../interfaces/to-do-list-item";
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

  private listItems: TodoListItem[] = [
    { id: this.getInteger(1, 1000), text: "Buy a new gaming laptop", description: "It should be super cool" },
    { id: this.getInteger(1, 1000), text: "Complete previous task", description: "Be happy about your new laptop" },
    { id: this.getInteger(1, 1000), text: "Create some angular app", description: "Give it a try" },
  ];
  public addItem(title: string, description: string) {
    if (title.trim()) {
      const newItem = {
        id: this.getInteger(1, 1000),
        text: title.trim(),
        description: description.trim(),
      };
      this.listItems.push(newItem);
    }
  }
  public getAllListItems(): TodoListItem[] {
    return [...this.listItems];
  }
  public updateItem(updatedItem: TodoListItem) {
    const index = this.listItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.listItems[index] = updatedItem;
    } else {
      throw Error(`List item with id ${updatedItem.id}`)
    }
  }
  public deleteItem(itemId: string) {
    this.listItems = this.listItems.filter(item => item.id !== itemId);
  }



}
