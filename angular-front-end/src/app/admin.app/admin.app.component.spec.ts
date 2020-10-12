import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppComponent } from './admin.app.component';

describe('Admin.AppComponent', () => {
  let component: AdminAppComponent;
  let fixture: ComponentFixture<AdminAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
