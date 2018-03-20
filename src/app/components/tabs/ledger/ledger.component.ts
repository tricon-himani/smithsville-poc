import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GeneralLedger, ColumnSetting } from '../../../models';
import { DataService } from '../../../providers';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LedgerComponent implements OnInit {

  generalLedgers: GeneralLedger[];
  generalLedgerSettings: ColumnSetting[] =
  [
    {
      primaryKey: 'account',
      header: 'Account'
    },
    {
      primaryKey: 'ref',
      header: 'Ref'
    },
    {
      primaryKey: 'year',
      header: 'Year'
    },
    {
      primaryKey: 'account_description',
      header: 'Account-Description'
    },
    {
      primaryKey: 'debits',
      header: 'Debits',
      format: 'currency'
    },
    {
      primaryKey: 'credits',
      header: 'Credits',
      format: 'currency'
    },
    {
      primaryKey: 'balance',
      header: 'Balance Dr(CR)'
    }
  ];
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('Ledger Component loaded');
    this.generalLedgers =  this.dataService.getGeneralLedgers();
  }
}
