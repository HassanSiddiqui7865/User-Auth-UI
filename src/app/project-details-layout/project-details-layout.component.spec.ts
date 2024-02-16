import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsLayoutComponent } from './project-details-layout.component';

describe('ProjectDetailsLayoutComponent', () => {
  let component: ProjectDetailsLayoutComponent;
  let fixture: ComponentFixture<ProjectDetailsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsLayoutComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
