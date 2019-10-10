import { Component, OnInit } from '@angular/core';

import * as parallax from 'simple-parallax-js';

@Component({
  selector: 'app-sumate',
  templateUrl: './sumate.component.html',
  styleUrls: ['./sumate.component.css']
})
export class SumateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var images = document.querySelectorAll('.image_sumate');
    new parallax(images, {
      delay: 0,
      orientation: 'down',
      scale: 1.3,
      overfow: true
    });
  }

}
