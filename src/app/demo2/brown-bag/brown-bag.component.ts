import { DynamicComponent } from './../dynamic/dynamic.component';
import { Component, OnInit, ComponentFactoryResolver, AfterViewInit, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-brown-bag',
  // templateUrl: './brown-bag.component.html',
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{myHero}}</h2>
    <p>Heroes:</p>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero }}
      </li>
    </ul>

    <ng-template #dynamicInsert></ng-template>
  `,

  styleUrls: ['./brown-bag.component.scss']
})
export class BrownBagComponent implements OnInit, AfterViewInit {
  title = 'Tour of Heroes';
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[0];

  @ViewChild('dynamicInsert', {
    read: ViewContainerRef
  }) dynamicInsert: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    // const containerRef = this.viewContainerRef;
    // containerRef.clear();
    // containerRef.createComponent(componentFactory);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    const containerRef = this.viewContainerRef;
    containerRef.clear();
    const dynamicComponent = <DynamicComponent>this.dynamicInsert.createComponent(componentFactory).instance;
    dynamicComponent.someProp = 'Hello Onel';
  }

}
