import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Account, ColumnSetting } from '../../../models';
import { DataService } from '../../../providers';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  accountSettings: ColumnSetting[] =
  [
    {
      primaryKey: 'account_number',
      header: 'Account Number',
    },
    {
      primaryKey: 'description',
      header: 'Description',
    },
    {
      primaryKey: 'control_account',
      header: 'Control Account',
    }
  ];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('Accounts Component loaded');
    this.accounts = this.dataService.getAccounts();
  }
}
