import { Component, Input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() title = '';
  @Input() disabled = false;
  @Input() classTypeButton = '';

}
