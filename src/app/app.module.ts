import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './Coponents/home/home.component';
import { UserModuleModule } from './user/user-module/user-module.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MyComtttComponent } from './my-comttt/my-comttt.component';
import { AminModuleModule } from './Admin/amin-module/amin-module.module';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './Admin/admin-signup/admin-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MyComtttComponent,
    AdminLoginComponent,
    AdminSignupComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgbModule,
    UserModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AminModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
