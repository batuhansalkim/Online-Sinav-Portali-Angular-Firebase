import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adsoyad:string;
  uid:string;

  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.uid = user.uid;
    this.adsoyad = user.displayName;
  }
  OturumKapat(){
    this.fbServis.OturumKapat().then(d =>{
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    })
  }

}
