import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.team-slider').bxSlider({ // ver https://bxslider.com/examples/image-slideshow-captions/
      mode: 'horizontal',
      pager: false,
      minSlides: 4,
      maxSlides: 4,
      slideMargin: 10
    });

    // Saco de esta forma el box shadow porque el css del plugin esta en una jerarquía superior
    $('.bx-wrapper').css('box-shadow', 'none');
  }

}
