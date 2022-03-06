import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdminansyfComponent } from './components/adminansyf/adminansyf.component';
import { KayitekleComponent } from './components/kayitekle/kayitekle.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BildirimComponent } from './components/bildirim/bildirim.component';
import { HosgeldinComponent } from './components/hosgeldin/hosgeldin.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';
import { Test2Component } from './components/test2/test2.component';
import { Test1Component } from './components/test1/test1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { KullanıcıansyfComponent } from './components/kullanıcıansyf/kullanıcıansyf.component';

const redirectLogin=()=>redirectUnauthorizedTo(['login']);
const redirectLogins=()=>redirectUnauthorizedTo(['adminlogin']);
const routes: Routes = [
  {path:'login' , component: HomeComponent,canActivate:[AngularFireAuthGuard],
data:{
  authGuardPipe: redirectLogin
}},
// {path:'kayitekle' , component: KayitekleComponent,canActivate:[AngularFireAuthGuard],
// data:{
//   authGuardPipe: redirectLogin
// }},
  {path:'' , component: LoginComponent},
  {path:'register' , component: RegisterComponent},
  {path:'dersialanögrenciler' , component: Test1Component,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogin}},

  {path:'soruhazirla' , component: Test2Component,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogin}},
  {path:'kayitlar' , component: KayitlarComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogin}},
  {path:'hoşgeldin' , component: HosgeldinComponent},
  {path:'sorular' , component: SorularComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogin}},
  {path:'bildirim' , component: BildirimComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogin}},
  {path:'kullanıcıanasayfa' , component: KullanıcıansyfComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogin}},
  {path:'adminanasayfa' , component: AdminansyfComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectLogins}},
  {path:'adminlogin' , component: AdminloginComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
