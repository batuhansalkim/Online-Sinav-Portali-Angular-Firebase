import { map } from 'rxjs/operators/';
import { Soru } from './../../models/soru';
import { FbServisService } from './../../services/fbServis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorular',
  templateUrl: './sorular.component.html',
  styleUrls: ['./sorular.component.css']
})
export class SorularComponent implements OnInit {
  sorular:Soru[];
  tiklandi:boolean = false;
  dogrumu:boolean = true;
dogrusayisi:number = 0;
yanlissayisi:number = 0;
sinavbitti:boolean = false;
cs:number = 0;
  constructor(
    public fbServis: FbServisService
  ) { }

  ngOnInit() {
    this.sorularigetir()
    
  }
  sorularigetir(){
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

  cevapla(cevap,verilen,soru){
    this.tiklandi = true
if (cevap == verilen) {
  // alert("Doğru cevap")
  this.dogrusayisi += 1
  soru.cevap = false;
  let shand = document.getElementsByClassName(soru.key) as HTMLCollectionOf<HTMLElement>;
if (shand.length != 0) {
  shand[0].style.color = "rgb(8, 236, 8)";
}
}else{
  // alert("yanlış cevap Cevap :"+cevap)
  this.yanlissayisi += 1
  soru.cevap = true;

  let shand = document.getElementsByClassName(soru.key) as HTMLCollectionOf<HTMLElement>;
  if (shand.length != 0) {
    shand[0].style.color = "red";
  }
}
 this.sorular.forEach(element => {
   if (element.key == soru.key) {
     element.cevaplandi = true;
   };
 }); 

 this.cs += 1
 if (this.cs == this.sorular.length) {
   this.sinavbitti = true
 }else{
   console.log(this.sorular.length)
   console.log(this.cs)
   this.sinavbitti = false
 }
  }
}
