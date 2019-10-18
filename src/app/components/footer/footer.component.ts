import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#_arriba").click(function(){
      $('html, body').animate({
        scrollTop: $(".inicio").offset().top - 100
      }, 1000);
    });
  }

}
