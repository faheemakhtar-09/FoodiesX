import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formsDatas:any;
  d:any
  constructor() { }

  ngOnInit(): void {
    // console.log("Hello")
  }
  addData(f: NgForm) {
    console.log(f.value);  
  }
}
