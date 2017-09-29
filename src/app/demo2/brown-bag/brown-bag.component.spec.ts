import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrownBagComponent } from './brown-bag.component';

describe('BrownBagComponent', () => {
  let component: BrownBagComponent;
  let fixture: ComponentFixture<BrownBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrownBagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrownBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
