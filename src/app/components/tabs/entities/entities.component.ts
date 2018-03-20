import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Entity, ColumnSetting } from '../../../models';
import { DataService } from '../../../providers';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntitiesComponent implements OnInit {

  entities: Entity[];
  entitySettings: ColumnSetting[] =
  [
      {  primaryKey: 'fund', header: 'Fund #' },
      {  primaryKey: 'description', header: 'Description' }
  ];
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('Entities Component loaded');
    this.entities = this.dataService.getEntities();
  }
}
