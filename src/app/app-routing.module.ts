import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProjectsComponent } from './projects/projects.component';
import { BookmanageComponent } from './bookmanage/bookmanage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { dashboardGuard } from './Guard/dashboard.guard';
import { userGuard } from './Guard/user.guard';
import { addbookGuard } from './Guard/addbook.guard';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { singlebookGuard } from './Guard/singlebook.guard';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { BoardComponent } from './board/board.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DialerComponent } from './dialer/dialer.component';
const routes: Routes = [
 {path:"login",component:LoginpageComponent},
 {path:"forgetPassword",component:ForgetpasswordComponent},
 {path:"register",component:RegisterpageComponent},
 {path:"",component:LayoutComponent,
 canActivate:[dashboardGuard],
  children:[
    {path:"board",component:BoardComponent},
    {path:"projects",component:ProjectsComponent},
    {path:"users",component:ManageuserComponent},
    {path:"dialer",component:DialerComponent},
    {path:"create-project",component:CreateProjectComponent},
    {path:"",redirectTo:"board",pathMatch:"full"}

    // {path:"addbooks",component:BookmanageComponent,canActivate:[addbookGuard]},
    // {path:"users",component:ManageuserComponent,canActivate:[userGuard]},
    // {path:":id",component:SinglebookComponent,canActivate:[singlebookGuard]},
  ]
 },
 {path:"**",component:PagenotfoundComponent,
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
