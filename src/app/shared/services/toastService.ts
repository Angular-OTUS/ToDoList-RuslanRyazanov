import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {}

  public get toasts$(): Observable<string[]> {
    return this._toasts$.asObservable();
  }

  public showToast(message: string) {
    const updatedToasts: string[] = [...this._toasts$.value, message];
    this._toasts$.next(updatedToasts);
  }
  public removeToast(index: number) {
    const updatedToasts: string[] = this._toasts$.value.filter((_, i) => i !== index);
    this._toasts$.next(updatedToasts);
  }
}
