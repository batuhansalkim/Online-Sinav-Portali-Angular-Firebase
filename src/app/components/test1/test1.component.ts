import { Kayit } from 'src/app/models/kayit';
import { Kayits } from './../../models/kayits';
import { Sonuc } from './../../models/sonuc';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  dersler;
  secDers: Kayits = new Kayits();
  sonuc : Sonuc = new Sonuc();
  ekleduzenle: boolean = false;
  detay: boolean = false;
  silme: boolean = false;
  
  constructor(
    public fbServis: FbServisService
  ) { }

  ngOnInit(): void {
    this.DersListele();
  }
  





  DersListele(){
    this.fbServis.DersListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dersler = data;
    });
  }
  

  Kaydet(){
    var tarih = new Date();
    if (this.secDers.key == null) {
      this.secDers.kayTarih = tarih.getTime().toString();
      this.secDers.duzTarih = tarih.getTime().toString();
      this.secDers.islem =false;
      this.fbServis.DersEkle(this.secDers).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    }else{
      this.secDers.kayTarih = tarih.getTime().toString();
      this.secDers.duzTarih = tarih.getTime().toString();
      this.secDers.islem =false;
      this.fbServis.DersDuzenle(this.secDers).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Güncellendi";
      });
    }
  }

  DersSec(ders:Kayits){
    Object.assign(this.secDers, ders);
  }
  Sil(){

    this.secDers.islem =false;
    this.fbServis.DersSil(this.secDers.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
      this.silme =false;
    });
  }

  TamamlaIptal(ders:Kayits, islem: boolean){
    var tarih = new Date();
    ders.duzTarih = tarih.getTime().toString();
    ders.islem = islem;
    this.fbServis.DersDuzenle(ders).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Güncellendi";
    })
  }
}
