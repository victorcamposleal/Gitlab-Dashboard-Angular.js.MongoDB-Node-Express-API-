import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostIssuesComponent } from './most-issues.component';

describe('MostIssuesComponent', () => {
  let component: MostIssuesComponent;
  let fixture: ComponentFixture<MostIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
