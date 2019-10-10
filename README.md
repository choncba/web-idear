# WebIdear

## Dependencies
jQuery
bxslider
simple-parallax-js https://www.npmjs.com/package/simple-parallax-js
--> HOW-TO
As it library doesn't have a typescript definition we must to declare it to use:

1 - add to src/typings.d.ts (create this file if doesn´t exists):
declare var simpleParallax: any;

2 - In your module add:
import * as parallax from 'simple-parallax-js'; // parallax can be any name that you want

3 - Then on ngInit():
var images = document.querySelectorAll('.image_sumate');
    new parallax(images, {
      delay: 0,
      orientation: 'down',
      scale: 1.3,
      overfow: true
    });



