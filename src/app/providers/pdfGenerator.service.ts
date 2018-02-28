import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable ()
export class PdfGeneratorService {

  GeneratePDF (elementToPrint) {
    const doc = new jsPDF();
    // doc.setProperties({
    //   title: 'Chart Of Accounts',
    //   subject: 'Chart Of Accounts',
    //    author: 'Author Name',
    //    keywords: 'generated, javascript, web 2.0, ajax',
    //    creator: 'Creator Name'
    //  });
    doc.addHTML(elementToPrint, () => {

   //  doc.output('save', 'filename.pdf'); // Try to save PDF as a file (not works on ie before 10, and some mobile devices)
    return doc.output('datauristring');       // returns the data uri string
 //     doc.output('datauri');              // opens the data uri in current window
//    doc.output('dataurlnewwindow');     // opens the data uri in new window
   //  doc.save('test.pdf');
      // const blob = doc.output('blob');
      // window.open(URL.createObjectURL(blob));
      // doc.autoPrint();
      // window.open(doc.output('blob'), '_blank');
    });
  }
}
