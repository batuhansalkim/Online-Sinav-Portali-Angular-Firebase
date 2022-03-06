import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-hosgeldin',
  templateUrl: './hosgeldin.component.html',
  styleUrls: ['./hosgeldin.component.css']
})
export class HosgeldinComponent implements OnInit {

  @ViewChild('name') nameKey! : ElementRef;
  constructor() { }

  ngOnInit() {
  }
  startQuiz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
  }

}
