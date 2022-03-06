import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Soru } from './../../models/soru';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {
  sorular;
  secSoru: Soru = new Soru();
  sonuc : Sonuc = new Sonuc();
  ekleduzenle: boolean = false;
  detay: boolean = false;
  silme: boolean = false;

  constructor(
    public fbServis: FbServisService
  ) { }

  ngOnInit() {
    this.SoruListele();
  }
  SoruListele(){
    this.fbServis.SoruListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.sorular = data;
    });
  }


  Kaydet(){
    var tarih = new Date();
    if (this.secSoru.key == null) {
      this.secSoru.kayTarih = tarih.getTime().toString();
      this.secSoru.duzTarih = tarih.getTime().toString();
      // this.secSoru.islem =false;
      this.fbServis.SoruEkle(this.secSoru).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Soru Eklendi";
      });
    }else{
      this.secSoru.kayTarih = tarih.getTime().toString();
      this.secSoru.duzTarih = tarih.getTime().toString();
      // this.secSoru.islem =false;
      this.fbServis.SoruDuzenle(this.secSoru).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Soru Güncellendi";
      });
    }
  }

  SoruSec(soru:Soru){
    Object.assign(this.secSoru, soru);
  }
  Sil(){
    this.secSoru.islem =false;
    this.fbServis.SoruSil(this.secSoru.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ders Silindi";
      this.silme =false;
    });
  }

}
