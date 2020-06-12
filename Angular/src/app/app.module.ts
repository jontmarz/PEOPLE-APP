import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from './services/user.service';
import { IdentityGuard } from './services/identity.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PeopleComponent } from './components/people/people.component';
import { NewPersonComponent } from './components/new-person/new-person.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    PeopleComponent,
    NewPersonComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    IdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
