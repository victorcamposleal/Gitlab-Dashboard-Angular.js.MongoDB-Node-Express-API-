import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewers.AppComponent } from './viewers.app.component';

describe('Viewers.AppComponent', () => {
  let component: Viewers.AppComponent;
  let fixture: ComponentFixture<Viewers.AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viewers.AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viewers.AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
