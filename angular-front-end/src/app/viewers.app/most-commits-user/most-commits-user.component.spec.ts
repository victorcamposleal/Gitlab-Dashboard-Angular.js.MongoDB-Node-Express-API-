import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostCommitsUserComponent } from './most-commits-user.component';

describe('MostCommitsUserComponent', () => {
  let component: MostCommitsUserComponent;
  let fixture: ComponentFixture<MostCommitsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostCommitsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostCommitsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
