import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookmanageComponent } from './bookmanage/bookmanage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { dashboardGuard } from './Guard/dashboard.guard';
import { userGuard } from './Guard/user.guard';
import { addbookGuard } from './Guard/addbook.guard';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { singlebookGuard } from './Guard/singlebook.guard';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const routes: Routes = [
 {path:"login",component:LoginpageComponent},
 {path:"forgetPassword",component:ForgetpasswordComponent},
 {path:"register",component:RegisterpageComponent},
 {path:"dashboard",component:HomepageComponent,
 canActivate:[dashboardGuard],
  children:[
    {path:"",component:BooklistComponent},
    {path:"addbooks",component:BookmanageComponent,canActivate:[addbookGuard]},
    {path:"users",component:ManageuserComponent,canActivate:[userGuard]},
    {path:":id",component:SinglebookComponent,canActivate:[singlebookGuard]},
  ]
 },
 {path:'',redirectTo:'/login',pathMatch:"full"},
 {path:"**",component:PagenotfoundComponent,
},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
