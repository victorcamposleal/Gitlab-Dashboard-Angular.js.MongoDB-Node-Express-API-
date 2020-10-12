import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIssuesComponent } from './total-issues.component';

describe('TotalIssuesComponent', () => {
  let component: TotalIssuesComponent;
  let fixture: ComponentFixture<TotalIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
