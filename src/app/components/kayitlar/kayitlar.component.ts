import { Kayit } from './../../models/kayit';
import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.scss']
})
export class KayitlarComponent implements OnInit {
  kayitlar: any;
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbServis: FbServisService,
    
  ) { }

  ngOnInit() {
    this.KayitListele();
    this.secKayit.key=null;
  }
  KayitListele(){
    this.fbServis.KayitListele().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data;
    });
  }

  KayitDuzenle(kayit:Kayit){
    Object.assign(this.secKayit,kayit);
  }
  KayitSil(kayit:Kayit){
    this.fbServis.KayitSil(kayit.key).then(()=>{
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kayıt Silindi";
    });
  }

  Kaydet(){
    var tarih =new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();

    if (this.secKayit.key == null) {
      this.secKayit.kayTarih = tarih.getTime().toString();
      this.fbServis.KayitEkle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Eklendi";
      });
    }
    else{
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kayıt Düzenlendi";
    });
   }
 }
 Vazgec(){
   this.secKayit = new Kayit();
   this.secKayit.key = null;
 }


 
}


