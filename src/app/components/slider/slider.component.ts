import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.bxslider').bxSlider({ // ver https://bxslider.com/examples/image-slideshow-captions/
      mode: 'fade',
      auto: true,
      pager: false,
      adaptiveHeight: true,
      infiniteLoop: true,
      controls: false,
      captions: false,
      responsive: true//,
      //slideWidth: 1000
    });
  }

}
