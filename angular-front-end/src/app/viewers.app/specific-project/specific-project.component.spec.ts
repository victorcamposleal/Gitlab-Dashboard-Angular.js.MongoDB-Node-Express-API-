import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificProjectComponent } from './specific-project.component';

describe('SpecificProjectComponent', () => {
  let component: SpecificProjectComponent;
  let fixture: ComponentFixture<SpecificProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
