import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { BooklistComponent } from './booklist/booklist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookmanageComponent } from './bookmanage/bookmanage.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import {HttpClientModule} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    PagenotfoundComponent,
    LoginpageComponent,
    HomepageComponent,
    BooklistComponent,
    NavbarComponent,
    BookmanageComponent,
    ManageuserComponent,
    SinglebookComponent,
    ForgetpasswordComponent,
    ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
