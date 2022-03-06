import { Sonuc } from './../../models/sonuc';
import { Router, Routes } from '@angular/router';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();

  constructor(
    public fbservis: FbServisService,
    public router : Router
  ) { }

  ngOnInit() {
  }
  GirisYap(mail:string,parola:string){
    this.fbservis.OturumAc(mail,parola).then(d => {
        localStorage.setItem("user", JSON.stringify(d.user));
        this.router.navigate(['/kullanıcıanasayfa']);
    }, err => {
      this.sonuc.islem= false;
      this.sonuc.mesaj = "E-Posta Adresi veya parola Geçersizdir.";
    });
  }

}
