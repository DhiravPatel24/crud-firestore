import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {AngularFireModule} from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { AuthService } from './share/auth.service';
import { environment } from '../environment/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'

@NgModule({
  declarations: [
    AppComponent,
    
    
    
  ],
  imports: [
    
    RegisterComponent,
    LoginComponent,
    BrowserModule,
    AppRoutingModule,
    EmployeeComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    AngularFireModule

  ],
  providers: [
    AuthService,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
