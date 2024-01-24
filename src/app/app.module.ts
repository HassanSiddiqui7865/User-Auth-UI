import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
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
import { CreateProjectComponent } from './Components/create-project/create-project.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteComponentComponent } from './Components/delete-component/delete-component.component';
import { UpdateProjectComponent } from './Components/update-project/update-project.component';

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
    CreateProjectComponent,
    DeleteComponentComponent,
    UpdateProjectComponent,
    ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
