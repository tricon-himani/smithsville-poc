import { Component } from '@angular/core';
import { ElectronService,  DataService, PdfGeneratorService, XlGenService } from './providers';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { HomeComponent } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HomeComponent, DataService, PdfGeneratorService, XlGenService]
})
export class AppComponent {
  constructor(public electronService: ElectronService,
              private translate: TranslateService,
              public homeComponent: HomeComponent) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
      this.listenToRendererProcessEvents();
    } else {
      console.log('Mode web');
    }
  }

  listenToRendererProcessEvents() {
    this.electronService.ipcRenderer.on('call-angular-method', this.callAngularMethod.bind(this));
    this.electronService.ipcRenderer.on('download-pdf', this.homeComponent.downloadPDF.bind(this.homeComponent));
  }

  callAngularMethod() {
    console.log('electron invoked angular method');
  }

  saveFile() {
    console.log('hello world');
    this.electronService.ipcRenderer.send('save-file', 'hello world');
  }
}
