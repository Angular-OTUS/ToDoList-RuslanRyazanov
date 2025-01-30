import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ButtonComponent } from "../button/button.component";
import { ToastService } from "../../shared/services/toastService";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgForOf,
    ButtonComponent
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnDestroy {

  public closeToastButtonTitle:string = 'X';
  public toasts: string[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private toastsService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastsService.toasts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  protected removeToast(toastIndex: number) {
    this.toastsService.removeToast(toastIndex);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
