import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-testimoniales',
  templateUrl: './testimoniales.component.html',
  styleUrls: ['./testimoniales.component.css']
})
export class TestimonialesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.testimoniales-bxslider').bxSlider({ // ver https://bxslider.com/examples/image-slideshow-captions/
      mode: 'horizontal',
      auto: false,
      pager: false,
      adaptiveHeight: true,
      infiniteLoop: true,
      controls: false,
      captions: false,
      responsive: true//,
      //slideWidth: 1000
    });

    // Saco de esta forma el box shadow porque el css del plugin esta en una jerarquía superior
    $('.bx-wrapper').css('box-shadow', 'none');
  }

}
