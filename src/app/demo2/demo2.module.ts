import { NgModule } from '@angular/core';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrownBagComponent } from './brown-bag/brown-bag.component';
import { DynamicComponent } from './dynamic/dynamic.component';

@NgModule({
  declarations: [
    BrownBagComponent,
    DynamicComponent
  ],
  entryComponents: [DynamicComponent],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule.forRoot()
  ],
  exports: [
    BrownBagComponent
  ],
  providers: []
})
export class Demo2Module { }
