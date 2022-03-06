import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminansyfComponent } from './components/adminansyf/adminansyf.component';
import { KayitekleComponent } from './components/kayitekle/kayitekle.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BildirimComponent } from './components/bildirim/bildirim.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { HosgeldinComponent } from './components/hosgeldin/hosgeldin.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Test2Component } from './components/test2/test2.component';
import { Test1Component } from './components/test1/test1.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { KullanıcıansyfComponent } from './components/kullanıcıansyf/kullanıcıansyf.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component,
    HomeComponent,
    KayitlarComponent,
    HosgeldinComponent,
    SorularComponent,
    BildirimComponent,
    LoginComponent,
    RegisterComponent,
    KayitekleComponent,
    KullanıcıansyfComponent,
    AdminansyfComponent,
    AdminloginComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
