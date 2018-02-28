import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService, PdfGeneratorService, XlGenService } from '../../providers';
import * as jsPDF from 'jspdf';
import * as $ from 'jquery';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { PromptBoxComponent } from '../common';
import excelData from './excel-data';
import { HotTableComponent } from 'ng2-handsontable';
import { DomSanitizer } from '@angular/platform-browser';
import data from '../../../mocks/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService, PdfGeneratorService, XlGenService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  dataObj: any;
  columns: any;
  colHeaders: any;
  options: any;
  fileToUpload: File = null;
  uriString: any;
  recentProjects: Array<any> = [];
  @ViewChild(PromptBoxComponent) promptPopUp: PromptBoxComponent;
  @ViewChild(HotTableComponent) hot: HotTableComponent;

  constructor(public dataService: DataService,
              public pdfGeneratorService: PdfGeneratorService,
              public xlGenService: XlGenService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.dataService.getJSON().subscribe(data =>
    //   this.dataObj = data,
    // error => console.log(error));
    this.dataObj = data;

    this.recentProjects = localStorage.getItem('recentProjects') ? JSON.parse(localStorage.getItem('recentProjects')) : [];

    this.columns = [{ data: 'Select', type: 'checkbox', checkedTemplate: 'Yes', uncheckedTemplate: 'No' },
                    { data: 'id', type: 'numeric' },
                    { data: 'currencyCode', type: 'text' },
                    { data: 'currency', type: 'text' },
                    { data: 'level', type: 'numeric', numericFormat: {  pattern: '0.0000' }},
                    { data: 'units', type: 'text' },
                    { data: 'asOf', type: 'text', dateFormat: 'MM/DD/YYYY' },
                    { data: 'onedChng', type: 'numeric', numericFormat: { pattern: '0.00%' }}
                  ];
    this.colHeaders =  [ 'Select', 'ID', 'Code',  'Currency', 'Level', 'Units', 'Date', 'Change' ];


     this.options = {
      stretchH: 'all',
      manualColumnResize: true,
                //  className: 'my-table-container',
  //    manualRowResize: true,
      readOnly: true,
    //  fixedRowsTop: 2,
  //    fixedColumnsLeft: 2,
   //   mergeCells: true,
  //    contextMenu: true,
 //     manualRowMove: true,
      manualColumnMove: true,
      columnSorting: true,
  //    rowHeaders: true,
  //    colHeaders: true,
       colWidths: [40, 55, 80, 80, 80, 80, 80, 80],
  //    rowHeights: [50, 40, 100],
      // declares a list of merged sections:
      mergeCells: [
        {row: 1, col: 1, rowspan: 3, colspan: 3},
        {row: 3, col: 4, rowspan: 2, colspan: 2},
        {row: 5, col: 6, rowspan: 3, colspan: 3}
      ],
      contextMenu: {
        callback: function (key, options) {
          if (key === 'unpost') {
            setTimeout(function () {
              // timeout is used to make sure the menu collapsed before alert is shown
              alert('Unposting Entry');
            }, 100);
          }
        },
        items: {
          'row_above': {
            name: 'Insert Entry Above',
            disabled: function () {
              // if first row, disable this option
         //     return hot3.getSelected()[0] === 0;
            }
          },
          'row_below': {
            name: 'Insert Entry Below',
            disabled: function () {
              // if last row, disable this option
              //     return hot3.getSelected()[0] === 0;
            }
          },
          'remove_row': {
            name: 'Delete Entry',
            disabled: function () {
              // if first row, disable this option
      //        return hot3.getSelected()[0] === 0
            }
          },
          'hsep2': '---------',
          'unpost': {
            name: 'Unpost Entry',
            disabled: function () {
              // if first row, disable this option
      //        return hot3.getSelected()[0] === 0
            }
          }
        }
      }
    };
  }

  downloadPDF() {
    const elementToPrint = document.getElementById('excel');
  //  this.pdfGeneratorService.GeneratePDF(elementToPrint);
    const doc = new jsPDF();
    doc.addHTML(elementToPrint, () => {
      doc.save('downloadPDf.pdf');
   //  const data = doc.output('dataurlstring', {});
   //   this.uriString = this.sanitizer.bypassSecurityTrustResourceUrl(doc.output('dataurlstring', {}));
   //   console.log(this.uriString);
   //   $('#report').html('<iframe src="data"></iframe>');
    });
  }

  exportToCSV() {
    const angular2Csv = new Angular2Csv(excelData, 'My Report');
  }

  exportToExcel() {
    this.xlGenService.callgenXL();
  }

  openFile(event) {
    const input = event.target;
    for (let index = 0; index < input.files.length; index++) {
        this.recentProjects.push(input.files[index].path);
        const reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
            const text = reader.result;
            console.log('text', JSON.parse(text));
        };
        reader.readAsText(input.files[index]);
        console.log('file path', this.recentProjects);
        localStorage.setItem('recentProjects', JSON.stringify(this.recentProjects));
    }
  }

  saveFile() {
    const debug = {hello: 'world'};
    const blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
    this.xlGenService.saveAsJSONFile(blob, 'saveAsFileExample');
  }

  showPromptBox() {
    this.promptPopUp.showPromptBox();
  }

  onPromptAction(event) {
    console.log('onPromptAction: ', event.textBoxValue);

  }

}
