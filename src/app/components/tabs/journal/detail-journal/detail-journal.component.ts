import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';

console.log('`detail-journal` component loaded asynchronously');

@Component({
  selector: 'app-detail-journal',
  templateUrl: './detail-journal.component.html',
  styleUrls: ['./detail-journal.component.scss']
})

export class DetailJournalComponent {

  @Input() showPopUp = false;


  constructor() { }

  showPopup() {
    this.showPopUp = true;
    $('body').addClass('modal-open');
    $('main').addClass('show-notification');
  }


  onClose() {
    this.showPopUp = false;
    $('body').removeClass('modal-open');
    $('main').removeClass('show-notification');
  }

}
