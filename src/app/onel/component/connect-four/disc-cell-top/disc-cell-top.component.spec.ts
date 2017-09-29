import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscCellTopComponent } from './disc-cell-top.component';

describe('DiscCellTopComponent', () => {
  let component: DiscCellTopComponent;
  let fixture: ComponentFixture<DiscCellTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscCellTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscCellTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
