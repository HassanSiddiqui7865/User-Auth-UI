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
import { BookmanageComponent } from './bookmanage/bookmanage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { BoardComponent } from './board/board.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteComponentComponent } from './Components/delete-component/delete-component.component';
import { UpdateProjectComponent } from './Components/update-project/update-project.component';
import {MatIconModule} from '@angular/material/icon'
import {MatTableModule} from '@angular/material/table';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTaskComponent } from './Components/create-task/create-task.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ShowMembersComponent } from './Components/show-members/show-members.component';
import { DialerComponent } from './dialer/dialer.component';

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
    BookmanageComponent,
    ManageuserComponent,
    SinglebookComponent,
    ForgetpasswordComponent,
    LayoutComponent,
    BoardComponent,
    DeleteComponentComponent,
    UpdateProjectComponent,
    SidebarComponent,
    CreateProjectComponent,
    CreateTaskComponent,
    ShowMembersComponent,
    DialerComponent,
    ],
  imports: [
    MatProgressBarModule,
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
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
