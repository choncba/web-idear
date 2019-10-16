import { Component, OnInit, AfterContentInit } from '@angular/core';
//import { jarallax } from 'jarallax';
//import * as jarallax from 'jarallax';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-sumate',
  templateUrl: './sumate.component.html',
  styleUrls: ['./sumate.component.css']
})
export class SumateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
  }

}
