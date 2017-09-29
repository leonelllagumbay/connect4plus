import { Demo2Module } from './demo2/demo2.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeroService } from './demo/hero/service/hero.service';
import { OnelModule } from './onel/onel.module';
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

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    HeroComponent,
    HeroDetailComponent,
    HeroesComponent,
    MyDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OnelModule,
    Demo2Module,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
