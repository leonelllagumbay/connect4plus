import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import { ConnectFourComponent } from './component/connect-four/connect-four/connect-four.component';
import { PlaygroundMatrixComponent } from './component/connect-four/playground-matrix/playground-matrix.component';
import { DiscCaseRowComponent } from './component/connect-four/disc-case-row/disc-case-row.component';
import { MatrixColumnComponent } from './component/connect-four/matrix-column/matrix-column.component';
import { DiscCellComponent } from './component/connect-four/disc-cell/disc-cell.component';
import { DynamicInfoComponent } from './component/connect-four/dynamic-info/dynamic-info.component';
import { DiscCellTopComponent } from './component/connect-four/disc-cell-top/disc-cell-top.component';

@NgModule({
  declarations: [
    ConnectFourComponent,
    PlaygroundMatrixComponent,
    DiscCaseRowComponent,
    MatrixColumnComponent,
    DiscCellComponent,
    DynamicInfoComponent,
    DiscCellTopComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  exports: [
    ConnectFourComponent
  ],
  providers: [],
})
export class OnelModule { }
