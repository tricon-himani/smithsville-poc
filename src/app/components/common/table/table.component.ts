import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnChanges } from '@angular/core';
import { ColumnSetting } from '../../../models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

    keys: string[];
    emptyArrayLength: number;
    @Input() records: any[];
    @Input() source: string;
    @Input() settings: ColumnSetting[];
    @Input() accounts: any[];
    columnMaps: ColumnSetting[];
    yearDropDownData: Array<number> = [2017, 2018, 2019];
    selectedYear: any = 'Add Year';
    selectedAccount: any = 'Select Account';

    addEntryForm: FormGroup;

    ngOnChanges() {
        console.log('Table Component loaded');
        this.keys = Object.keys(this.records[0]);
        console.log('Source:', this.source, 'Columns:', this.keys, 'Rows:', this.records);
        if (this.source === 'journal') {
            this.emptyArrayLength = 17 - this.records.length || 0;
        }
        if (this.settings) { // when settings provided
            this.columnMaps = this.settings;
        } else { // no settings, create column maps with defaults
            this.columnMaps = Object.keys(this.records[0])
                .map( key => {
                     return {
                         primaryKey: key,
                         header: key.slice(0, 1).toUpperCase() + key.replace(/_/g, ' ' ).slice(1),
                         format: 'default'
                };
            });
        }

        this.addEntryForm = new FormGroup({
            account: new FormControl(),
            year: new FormControl(),
            description: new FormControl(),
            debits: new FormControl(),
            credits: new FormControl()
        });
    }

    selectRow(record) {
        if (this.source === 'journal') {
            record.selected = true;
            this.records.map((j: any) => {
              if (j.id !== record.id) {
                j.selected = false;
              }
              return j;
            });
        }
    }

    selectYear(year) {
        this.selectedYear = year;
    }

    selectAccount(account) {
        this.selectedAccount = account.description;
    }
}

