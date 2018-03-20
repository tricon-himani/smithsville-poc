import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit {

  constructor(public route: ActivatedRoute) {
   }

  ngOnInit() {
    console.log('Tabs Component loaded');
  }
}
