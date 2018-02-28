import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs.min';
import * as randomSentence from 'random-sentence';
import * as _ from 'lodash';

// const Excel = require('exceljs');
// const randomSentence = require('random-sentence');
// const _ = require('lodash');

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const JSON_TYPE = 'application/json';
const EXCEL_EXTENSION = '.xlsx';
const JSON_EXTENSION = '.json';

@Injectable()
export class XlGenService {

  constructor() { }

    callgenXL() {
       const wb = this.genXL();
        wb.xlsx.writeBuffer()
            .then(buffer => {
            this.saveAsExcelFile(buffer, 'npmexcelFileName');
            })
            .catch(function(error) {
            throw error;
            });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    saveAsJSONFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
        type: JSON_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + JSON_EXTENSION);
    }

    genXL() {
        const workbook = new Excel.Workbook();
        workbook.creator = 'Me';
        workbook.lastModifiedBy = 'Her';
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2017, 9, 27);

        // var sheet = workbook.addWorksheet('My Sheet');

        const ws = workbook.addWorksheet('My sheet', {
            pageSetup: { paperSize: 9, orientation: 'landscape' }
        });

        ws.columns = [
            { key: 'types', width: 50 },
            { key: 'space', width: 10 },
            { key: 'debits', width: 20 },
            { key: 'credits', width: 20 },
        ];
        let rowNo = 1;
        const titleList = [
            'City of Smithville',
            'General Fund',
            'Pre-Closing Trial Balance',
            'For year 2017'
        ];
        titleList.forEach((title) => {
            this.headerCreater({ ws, title, rowNo });
            rowNo++;
        });
        ws.addRow([]);
        rowNo++;
        const presentC = `C${rowNo}`;
        ws.getCell(presentC).value = 'Debits';
        ws.getCell(presentC).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell(presentC).font = {
            bold: true
        };
        const presentD = `D${rowNo}`;
        ws.getCell(presentD).value = 'Credits';
        ws.getCell(presentD).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell(presentD).font = {
            bold: true
        };
        rowNo++;
        const {
            list,
            debitTotal,
            creaditTotal
        } = this.genList();


        ws.getColumn(3).numFmt = '#,##';
        ws.getColumn(4).numFmt = '#,##';
        list.forEach((rowData) => {
            ws.addRow(_.values(rowData));
            rowNo++;
        });
        ws.addRow(['Totals for all accounts', '', debitTotal, creaditTotal]);
        ws.getRow(rowNo).font = {
            bold: true
        };
        const debitTotalC = `C${rowNo}`;
        ws.getCell(debitTotalC).border = {
            top: { style: 'thin' },
            bottom: { style: 'double' }
        };
        const creaditTotalD = `D${rowNo}`;

        ws.getCell(creaditTotalD).border = {
            top: { style: 'thin' },
            bottom: { style: 'double' }
        };


        ws.getCell(debitTotalC).numFmt = '$ #,##';
        ws.getCell(creaditTotalD).numFmt = '$ #,##';




        // ws.mergeCells('A1:D1')
        // ws.getCell('A1').value = 'City of Smithville';
        // ws.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
        // ws.getCell('A1').font = {
        //     bold: true
        // };

        // ws.addRow([]);

        // ws.addRow(["Cash", '', 553715, '']);
        // ws.addRow(["Allowance for Uncollectible Delinquent Taxes", '', '', 105430]);
        // ws.addRow(["Allowance for Uncollectible Delinquent Taxes", '', '', 105430]);
        // ws.addRow(["Totals for all accounts", '', 11487147, 11487147]);

        // ws.getCell('C7').border = {
        //     top: { style: 'thin' },
        //     bottom: { style: 'double' }
        // };


        // ws.getCell('C7').numFmt = '$ #,##';
        // ws.getCell('C8').numFmt = '$ #,##';
        // ws.getRow('7').font = {
        //     bold: true
        // };

        // ws.getCell('D7').border = {
        //     top: { style: 'thin' },
        //     bottom: { style: 'double' }
        // };


        // workbook.xlsx.writeFile('hello.xlsx')
        //     .then(function () {
        //         console.log('done');
        //     });
        return workbook;

    }


    headerCreater({ ws, rowNo, title }) {
        const fromCell = `A${rowNo}`;
        const toCell = `D${rowNo}`;
        ws.mergeCells(`${fromCell}:${toCell}`);
        ws.getCell(fromCell).value = title;
        ws.getCell(fromCell).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell(fromCell).font = {
            bold: true
        };
    }

   genList() {
        let creaditTotal = 0;
        let debitTotal = 0;
        const list = [];
        const listNo = this.randomIntFromInterval(10, 25);
        for (let i = 0; i < listNo; i++) {
            const temp = {
                title: '',
                space: '',
                debits: 0,
                credits: 0
            };
            temp.title = randomSentence({ max: 9 });
            const money = this.randomIntFromInterval(1, 1000000);
            if ((money % 2) === 0) {
                temp.credits = money;
                creaditTotal += money;
            } else {
                temp.debits = money;
                debitTotal += money;
            }
            list.push(temp);
        }
        return {
            list,
            debitTotal,
            creaditTotal
        };


    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


}






