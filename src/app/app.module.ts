import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotTableModule } from 'ng2-handsontable';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective, StyleCellDirective } from './directives';
import { EmptyArrayPipe, FormatCellPipe } from './pipes';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent,
        PromptBoxComponent,
        CheckboxComponent,
        TableComponent,
        TabsComponent,
        JournalComponent,
        LedgerComponent,
        AccountsComponent,
        EntitiesComponent,
        HeaderComponent
      } from './components';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PromptBoxComponent,
    CheckboxComponent,
    TableComponent,
    TabsComponent,
    JournalComponent,
    LedgerComponent,
    AccountsComponent,
    EntitiesComponent,
    HeaderComponent,
    WebviewDirective,
    StyleCellDirective,
    EmptyArrayPipe,
    FormatCellPipe
  ],
  imports: [
    HotTableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
