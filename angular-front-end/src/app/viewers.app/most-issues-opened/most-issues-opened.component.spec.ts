import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostIssuesOpenedComponent } from './most-issues-opened.component';

describe('MostIssuesOpenedComponent', () => {
  let component: MostIssuesOpenedComponent;
  let fixture: ComponentFixture<MostIssuesOpenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostIssuesOpenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostIssuesOpenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
