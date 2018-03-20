import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
@Input() posted;

constructor() {}
}
export default CheckboxComponent;

