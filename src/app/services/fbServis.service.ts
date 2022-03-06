import { Kayit } from 'src/app/models/kayit';
import { Uye } from './../models/uye';
import { Bildirim } from './../models/bildirim';
import { Soru } from './../models/soru';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Key } from 'protractor';
import { Kayits } from '../models/kayits';
import { AngularFireAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class FbServisService {
  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  private dbDers = '/Ders';
  private dbSoru = '/Sorular';
  private dbBildirim = '/Bildirim';
  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  dersRef: AngularFireList<Kayits> = null;
  soruRef: AngularFireList<Soru> = null;
  bildirimRef: AngularFireList<Bildirim> = null;
  http: any;
  apiUral: string;

constructor(
  public db: AngularFireDatabase,
  public afAuth:AngularFireAuth
) {
  this.kayitRef = db.list(this.dbKayit);
  this.uyeRef = db.list(this.dbUye);
  this.dersRef = db.list(this.dbDers);
  this.soruRef = db.list(this.dbSoru);
  this.bildirimRef = db.list(this.dbBildirim);
 }

 OturumAc(mail:string,parola:string){
   return this.afAuth.signInWithEmailAndPassword(mail,parola)
 }
 OturumKapat(){
   return this.afAuth.signOut();
 }
 OturumKontrol(){
   if(localStorage.getItem("user")){
     return true;
   }else{
     return false;
   }
 }
 UyeOl(uye:Uye){
   return this.afAuth.createUserWithEmailAndPassword(uye.mail,uye.parola);
 }
 UyeEkle(uye:Uye){
   return this.uyeRef.push(uye);
 }

 /* Bildirim Bölümü Başla */
 BildirimListele(){
   return this.bildirimRef;
 }
 BildirimEkle(bildirim:Bildirim){
   return this.bildirimRef.push(bildirim);
 }
 BildirimDuzenle(bildirim:Bildirim){
   return this.bildirimRef.update(bildirim.key, bildirim);
 }
 BildirimSil(key:string){
   return this.bildirimRef.remove(key);
 }
 /* Bildirim Bölümü Bitiş */

   /* Soru Bölümü Başla */
 SoruListele(){
   return this.soruRef;
 }
 SoruEkle(soru:Soru){
   return this.soruRef.push(soru);
 }
 SoruDuzenle(soru:Soru){
   return this.soruRef.update(soru.key, soru);
 }
 SoruSil(key:string){
   return this.soruRef.remove(key);
 }
 /* Soru Bölümü Bitiş */

 /* Ders Bölümü Başla */

 DersListele(){
   return this.dersRef;
 }
 DersEkle(ders:Kayits){
   return this.dersRef.push(ders)
 }
 DersDuzenle(ders:Kayits){
   return this.dersRef.update(ders.key, ders)
 }
 DersSil(key:string){
   return this.dersRef.remove(key);
 }
 /* Ders Bölümü Bitiş */

 /* Kayıt Bölümü Başla */

 KayitListele() {
    return this.kayitRef;
  }
  KayitEkle(kayit: Kayit){
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit: Kayit)  {
    return this.kayitRef.update(kayit.key, kayit );
  }
  KayitSil(key:string) {
    return this.kayitRef.remove(key);
  }
  /* Kayıt Bölümü Bitiş */

}
