import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectUserManageComponent } from './project-user-manage/project-user-manage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { BoardComponent } from './board/board.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { ProjectDetailsLayoutComponent } from './project-details-layout/project-details-layout.component';
import { loginGuard } from './Guards/login.guard';
import { projectsGuard } from './Guards/projects.guard';
import { SingleUserComponent } from './single-user/single-user.component';

const routes: Routes = [
  { path: "login", component: LoginpageComponent,canActivate:[loginGuard]},
  { path: "forgetPassword", component: ForgetpasswordComponent },
  { path: "register", component: RegisterpageComponent },
  {
    path: "",
    component: LayoutComponent,
    canActivate:[projectsGuard],
   
    children: [
      {
        path: "projects",
        component: ProjectLayoutComponent,
        children: [
          { path: "", component: ProjectsComponent },
          { path: `:id`, component: ProjectDetailsLayoutComponent,
        children:[
          { path: "details", component: ProjectDetailsComponent},
          { path: "people", component: ProjectUserManageComponent}
        ]},
        ],
      },
      {path:"board/:id",component:BoardComponent},
      { path: "users", component: ManageuserComponent },
      {path:"user/:id",component:SingleUserComponent},
      { path: "", redirectTo: "projects", pathMatch: "full" }
    ],
  },
  { path: "**", component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
