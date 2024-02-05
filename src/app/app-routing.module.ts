import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersManageComponent } from './users-manage/users-manage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { BoardComponent } from './board/board.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { ProjectDetailsLayoutComponent } from './project-details-layout/project-details-layout.component';

const routes: Routes = [
  { path: "login", component: LoginpageComponent },
  { path: "forgetPassword", component: ForgetpasswordComponent },
  { path: "register", component: RegisterpageComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "board", component: BoardComponent },
      {
        path: "projects",
        component: ProjectLayoutComponent,
        children: [
          { path: "", component: ProjectsComponent },
          { path: ":id/details", component: ProjectDetailsComponent},
          { path: ":id/people", component: UsersManageComponent}
        ],
      },
      { path: "users", component: UsersManageComponent },
      { path: "create-project", component: CreateProjectComponent },
      { path: "", redirectTo: "board", pathMatch: "full" }
    ],
  },
  { path: "**", component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
