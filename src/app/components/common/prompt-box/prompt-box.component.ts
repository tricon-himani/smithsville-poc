import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-prompt-box',
  templateUrl: './prompt-box.component.html',
  styleUrls: ['./prompt-box.component.scss']
})
export class PromptBoxComponent {
  showPopUp = false;
  textBoxValue = '2018';
  @Output() prompt: EventEmitter<any> = new EventEmitter();

  showPromptBox() {
    this.showPopUp = true;
    $('body').addClass('modal-open');
    $('main').addClass('show-notification');
  }

  onOk() {
    this.showPopUp = false;
    $('body').removeClass('modal-open');
    $('main').removeClass('show-notification');
    if (this.textBoxValue) {
      this.prompt.emit({isSuccess: true, textBoxValue: this.textBoxValue});
    }
  }

  onCancel() {
    this.textBoxValue = '';
    $('body').removeClass('modal-open');
    $('main').removeClass('show-notification');
    this.showPopUp = false;
    this.prompt.emit({isSuccess: false});
  }

}
export default PromptBoxComponent;
