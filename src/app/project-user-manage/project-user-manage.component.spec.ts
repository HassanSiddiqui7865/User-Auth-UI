import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserManageComponent } from './project-user-manage.component';

describe('ProjectUserManageComponent', () => {
  let component: ProjectUserManageComponent;
  let fixture: ComponentFixture<ProjectUserManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectUserManageComponent]
    });
    fixture = TestBed.createComponent(ProjectUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
