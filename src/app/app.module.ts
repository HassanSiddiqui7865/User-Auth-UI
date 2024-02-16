import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectUserManageComponent } from './project-user-manage/project-user-manage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { BoardComponent } from './board/board.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteComponentComponent } from './Components/delete-component/delete-component.component';
import {MatIconModule} from '@angular/material/icon'
import {MatTableModule} from '@angular/material/table';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';

import { ShowMembersComponent } from './Components/show-members/show-members.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AssignUserComponent } from './Components/assign-user/assign-user.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectLayoutComponent } from './project-layout/project-layout.component';
import { ProjectDetailsLayoutComponent } from './project-details-layout/project-details-layout.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { AvatarSelectComponent } from './Components/avatar-select/avatar-select.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ViewTicketComponent } from './Components/view-ticket/view-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    PagenotfoundComponent,
    LoginpageComponent,
    LayoutComponent,
    ProjectsComponent,
    NavbarComponent,
    ProjectUserManageComponent,
    ManageuserComponent,
    ForgetpasswordComponent,
    LayoutComponent,
    DeleteComponentComponent,
    SidebarComponent,
    CreateProjectComponent,
    CreateTaskComponent,
    ShowMembersComponent,
    AssignUserComponent,
    ProjectDetailsComponent,
    ProjectLayoutComponent,
    ProjectDetailsLayoutComponent,
    CreateUserComponent,
    AvatarSelectComponent,
    BoardComponent,
    SidenavComponent,
    ViewTicketComponent, 
    ],
  imports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
