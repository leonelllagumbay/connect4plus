import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { Demo1Component } from './demo/bootstrap/demo1/demo1.component';

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
