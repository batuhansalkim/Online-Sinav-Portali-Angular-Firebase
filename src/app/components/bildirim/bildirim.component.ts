import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Bildirim } from './../../models/bildirim';
import { Component, OnInit } from '@angular/core';
import { map  } from 'rxjs/operators';

@Component({
  selector: 'app-bildirim',
  templateUrl: './bildirim.component.html',
  styleUrls: ['./bildirim.component.scss']
})
export class BildirimComponent implements OnInit {
  bildirimler;
  secBildirim: Bildirim = new Bildirim();
  sonuc : Sonuc = new Sonuc();
  ekleduzenle: boolean = false;
  detay: boolean = false;
  silme: boolean = false;

  constructor(
    public fbServis: FbServisService
  ) { }

  ngOnInit() {
    this.BildirimListele();
  }

  BildirimListele(){
    this.fbServis.BildirimListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.bildirimler = data;
    });
  }

  Kaydet(){
    var tarih = new Date();
    if (this.secBildirim.key == null) {
      this.secBildirim.kayTarih = tarih.getTime().toString();
      this.secBildirim.islem =false;
      this.fbServis.BildirimEkle(this.secBildirim).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Bildirim Eklendi";
      });
    }else{
      this.secBildirim.kayTarih = tarih.getTime().toString();
      this.secBildirim.islem =false;
      this.fbServis.BildirimDuzenle(this.secBildirim).then(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Bidlirim Güncellendi";
      });
    }
  }

  BildirimSec(bildirim:Bildirim){
    Object.assign(this.secBildirim, bildirim);
  }
  Sil(){

    this.secBildirim.islem =false;
    this.fbServis.BildirimSil(this.secBildirim.key).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Bildirim Silindi";
      this.silme =false;
    });
  }

  TamamlaIptal(bildirim:Bildirim, islem: boolean){
    var tarih = new Date();
    bildirim.islem = islem;
    this.fbServis.BildirimDuzenle(bildirim).then(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Bildirim Güncellendi";
    })
  }

}
