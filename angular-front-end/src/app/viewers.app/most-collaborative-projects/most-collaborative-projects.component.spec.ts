import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostCollaborativeProjectsComponent } from './most-collaborative-projects.component';

describe('MostCollaborativeProjectsComponent', () => {
  let component: MostCollaborativeProjectsComponent;
  let fixture: ComponentFixture<MostCollaborativeProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostCollaborativeProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostCollaborativeProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
