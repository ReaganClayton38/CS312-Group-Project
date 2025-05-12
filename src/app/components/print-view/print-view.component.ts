import { Component, Input } from '@angular/core';
import { Color } from '../services/color.service';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.css'],
})
export class PrintViewComponent {
  @Input() colors: Color[] = [];
  @Input() colorCoordinates: { [key: string]: string[] } = {};
}
