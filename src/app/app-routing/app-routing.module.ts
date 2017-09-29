import { HeroDetailComponent } from './../demo/hero/hero-detail/hero-detail.component';
import { HeroesComponent } from './../demo/hero/component/heroes/heroes.component';
import { MyDashboardComponent } from './../demo/hero/component/my-dashboard/my-dashboard.component';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: 'heroes',
  component: HeroesComponent
}, {
  path: 'dashboard',
  component: MyDashboardComponent
}, {
  path: 'x',
  redirectTo: '/dashboard',
  pathMatch: 'full'
}, {
  path: 'detail/:id',
  component: HeroDetailComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
