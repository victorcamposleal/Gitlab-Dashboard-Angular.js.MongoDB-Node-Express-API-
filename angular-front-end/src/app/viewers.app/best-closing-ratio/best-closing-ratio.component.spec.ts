import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestClosingRatioComponent } from './best-closing-ratio.component';

describe('BestClosingRatioComponent', () => {
  let component: BestClosingRatioComponent;
  let fixture: ComponentFixture<BestClosingRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestClosingRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestClosingRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
