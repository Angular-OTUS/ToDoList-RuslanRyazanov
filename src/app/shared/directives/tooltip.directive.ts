import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2 } from '@angular/core';

  @Directive({
    standalone: true,
    selector: "[tooltip]"
  })
  export class TooltipDirective implements OnDestroy {
    @Input() tooltip = "";
    @Input() delay? = 100;

    private myPopup: any;
    private timer: any;

    constructor(private el: ElementRef) {}

    ngOnDestroy(): void {
      if (this.myPopup) {
        this.myPopup.remove();
      }
    }

    @HostListener("mouseenter") onMouseEnter(event: MouseEvent) {
        this.timer = setTimeout(() => {
          const x =
            this.el.nativeElement.getBoundingClientRect().left +
            this.el.nativeElement.offsetWidth / 2;
          const y =
            this.el.nativeElement.getBoundingClientRect().top +
            this.el.nativeElement.offsetHeight + 6;
          this.createTooltipPopup(x, y);
        }, this.delay);

    }

    @HostListener("mouseleave") onMouseLeave() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.myPopup) {
        this.myPopup.remove();
      }
    }

    private createTooltipPopup(x: number, y: number) {
      let popup = document.createElement("div");
      popup.innerHTML = this.tooltip;
      popup.setAttribute("class", "tooltip-container");
      popup.style.top = y.toString() + "px";
      popup.style.left = x.toString() + "px";
      document.body.appendChild(popup);
      this.myPopup = popup;
      setTimeout(() => {
        if (this.myPopup) this.myPopup.remove();
      }, 5000);
    }
  }
