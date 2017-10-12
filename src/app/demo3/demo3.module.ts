import { CanDeactivateFriends } from './class/can-deactivate-friends';
import { ConnectFourService } from './service/connect-four.service';
import { AppComponent } from './../app.component';
import { ChatServiceService } from './service/chat-service.service';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { DiscCellComponent } from './component/disc-cell/disc-cell.component';
import { MatrixColumnComponent } from './component/matrix-column/matrix-column.component';
import { DiscCaseRowComponent } from './component/disc-case-row/disc-case-row.component';
import { PlaygroundMatrixComponent } from './component/playground-matrix/playground-matrix.component';
import { ConnectFourComponent } from './component/connect-four/connect-four.component';
import { ModalInfoComponent } from './component/modal-info/modal-info.component';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './component/friends/friends.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [{
  path: '',
  component: AppComponent
}, {
  path: 'demo3',
  component: ConnectFourComponent
}, {
  path: 'friends',
  component: FriendsComponent,
  canDeactivate: [CanDeactivateFriends]
}];

const config: SocketIoConfig = {
url: 'https://calm-meadow-29333.herokuapp.com', options: {}
};

@NgModule({
  declarations: [
    ConnectFourComponent,
    PlaygroundMatrixComponent,
    DiscCaseRowComponent,
    MatrixColumnComponent,
    DiscCellComponent,
    ToolbarComponent,
    ModalInfoComponent,
    FriendsComponent
  ],
  entryComponents: [ModalInfoComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule.forRoot(),
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes, {useHash: false}),
    HttpClientModule
  ],
  exports: [], // Exports may be necessary if the component is not fount in other module
  providers: [ChatServiceService, ConnectFourService, CanDeactivateFriends, HttpClient]
})
export class Demo3Module { }
