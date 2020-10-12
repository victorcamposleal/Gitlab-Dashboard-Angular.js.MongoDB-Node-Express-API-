import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostIssuesClosedComponent } from './most-issues-closed.component';

describe('MostIssuesClosedComponent', () => {
  let component: MostIssuesClosedComponent;
  let fixture: ComponentFixture<MostIssuesClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostIssuesClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostIssuesClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
