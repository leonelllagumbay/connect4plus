import { ChatServiceService } from './demo3/service/chat-service.service';
import { Demo2Module } from './demo2/demo2.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeroService } from './demo/hero/service/hero.service';
// import { OnelModule } from './onel/onel.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Demo1Component } from './demo/bootstrap/demo1/demo1.component';
import { HeroComponent } from './demo/hero/hero.component';
import { HeroDetailComponent } from './demo/hero/hero-detail/hero-detail.component';
import { HeroesComponent } from './demo/hero/component/heroes/heroes.component';
import { MyDashboardComponent } from './demo/hero/component/my-dashboard/my-dashboard.component';
import { ConnectFourComponent } from './demo3/component/connect-four/connect-four.component';
import { PlaygroundMatrixComponent } from './demo3/component/playground-matrix/playground-matrix.component';
import { DiscCaseRowComponent } from './demo3/component/disc-case-row/disc-case-row.component';
import { MatrixColumnComponent } from './demo3/component/matrix-column/matrix-column.component';
import { DiscCellComponent } from './demo3/component/disc-cell/disc-cell.component';
import { DynamicInfoComponent } from './demo3/component/dynamic-info/dynamic-info.component';
import { SocketIoModule, SocketIoConfig} from 'ng-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:8988', options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    HeroComponent,
    HeroDetailComponent,
    HeroesComponent,
    MyDashboardComponent,
    ConnectFourComponent,
    PlaygroundMatrixComponent,
    DiscCaseRowComponent,
    MatrixColumnComponent,
    DiscCellComponent,
    DynamicInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // OnelModule,
    Demo2Module,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgbModule.forRoot()
  ],
  providers: [HeroService, ChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
