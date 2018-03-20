import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public route: ActivatedRoute) {
   }

  ngOnInit() {
    console.log('Header Component loaded');
  }
}
