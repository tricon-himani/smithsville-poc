import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnChanges } from '@angular/core';
import { ColumnSetting, Journal } from '../../../models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {

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
    newJournal: Journal = new Journal();
    @ViewChild('addForm') form: any;
    refCounter: number;
    idCounter: number;
    @Output() submitForm: EventEmitter<any> = new EventEmitter();
    submitted = false;
    readonly = false;
    editMode = false;
    showForm = false;
    filteredAccounts = [];
    search: string;
    posY;

    ngOnChanges() {
        console.log('Table Component loaded');
     //   this.calculateEmptyArrayLength();
        this.keys = Object.keys(this.records[0]);
        console.log('Source:', this.source, 'Columns:', this.keys, 'Rows:', this.records);
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

    }

    ngOnInit() {

    }

    calculateEmptyArrayLength() {
        this.emptyArrayLength = 13 - this.records.length || 0;
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

    onSubmit() {
        if (this.form.valid) {
            this.getIdCounter();
            this.getRefCounter();
            Object.assign(this.newJournal, {
                id: this.idCounter + 1,
                posted: false,
                year: Number(this.newJournal.year),
                ref_2: this.refCounter + 1,
                debits: this.newJournal.debits || 0,
                credits: this.newJournal.credits || 0
            });
           console.log('Form Submitted!');
           this.submitForm.emit({ 'newJournal': this.newJournal });
           this.records.push(this.newJournal);
           this.newJournal =  new Journal();
     //      this.calculateEmptyArrayLength();
        }
    }

    reset() {
        this.form.reset();
    }

    onFilterChange($event) {
        if ($event.target.checked) {
            this.newJournal.description = 'Closing Entry';
            this.readonly = true;
        } else {
            this.newJournal.description = '';
        }
    }

    getIdCounter() {
        this.idCounter = Math.max.apply(Math, this.records.map(record => record.id));
    }

    getRefCounter() {
        this.refCounter = Math.max.apply(Math, this.records.filter(record => record.posted).map(o => o.ref_2));
    }

    createEntry(journal) {
        console.log('journal', journal);
    }

    selectYear(year) {
        this.selectedYear = year;
        this.newJournal.year = year;
    }

    navigateToEditForm(record, event) {
        console.log(record, event.clientY);
        record.isEdit = true;
        this.newJournal = record;
        this.editMode = true;
        this.showForm = true;
    }

    filterArray(searchKey) {
        searchKey = searchKey.toUpperCase();
        this.filteredAccounts =  this.accounts.filter(account => {
            return account.description.toUpperCase().indexOf(searchKey) !== -1;
        });
    }

    onBlur(searchKey) {
         if (!searchKey) {
            this.filteredAccounts =  this.accounts;
         }
    }

    selectAccount(account) {
        this.newJournal.account = account.description;
        if (account.child_accounts.length) {
            this.submitForm.emit({ 'openDetailJournal': true, 'childAccounts': account.child_accounts });
        }
    }


}

