import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Journal, Account, ColumnSetting } from '../../../models';
import { DataService } from '../../../providers';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JournalComponent implements OnInit {

  journals: Journal[];
  accounts: Account[];
  filterDropDownData: Array<string> = ['All', 'Posted', 'Unposted'];
  selectedFilter: any = 'Filter entries';
  journalSettings: ColumnSetting[] =
  [
    {
      primaryKey: 'posted',
      header: 'Posted'
    },
    {
      primaryKey: 'account',
      header: 'Account'
    },
    {
      primaryKey: 'year',
      header: 'Year'
    },
    {
      primaryKey: 'description',
      header: 'Description'
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
      primaryKey: 'ref_2',
      header: 'Ref 2'
    }
  ];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    console.log('Journal Component loaded');
    this.journals = this.dataService.getJournals();
    this.accounts = this.dataService.getAccounts();
  }

  filterEntries(filterDd) {
    this.selectedFilter = filterDd;
    this.journals =  this.dataService.getJournals().filter(journal => {
      if (filterDd.toLowerCase() === 'posted') {
        return journal.posted ;
      } else if (filterDd.toLowerCase() === 'unposted') {
        return !journal.posted ;
      } else {
        return journal;
      }
    });
  }
}