import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { FbServisService } from './../../services/fbServis.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbservis: FbServisService,
    public router : Router
  ) { }

  ngOnInit() {
  }
  AdminGirisYap(mail:string,parola:string){
    this.fbservis.OturumAc(mail,parola).then(d => {
        localStorage.setItem("user", JSON.stringify(d.user));
        this.router.navigate(['/adminanasayfa']);
    }, err => {
      this.sonuc.islem= false;
      this.sonuc.mesaj = "E-Posta Adresi veya parola Geçersizdir.";
    });
  }

}
