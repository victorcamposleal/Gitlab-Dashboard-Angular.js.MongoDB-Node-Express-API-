import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostCommitsLastWeekComponent } from './most-commits-last-week.component';

describe('MostCommitsLastWeekComponent', () => {
  let component: MostCommitsLastWeekComponent;
  let fixture: ComponentFixture<MostCommitsLastWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostCommitsLastWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostCommitsLastWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
