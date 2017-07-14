function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 1400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}
//function fadeIn (el) {
//	el.style.opacity = 0;
//
//	let last = +new Date();
//	let tick = () => {
//		el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
//		last = +new Date();
//
//		if (+el.style.opacity < 0) {
//			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
//		} else if (+el.style.opacity > 0) {
//			el.style.opacity = 1;
//		}
//	};
//
//	tick();
//}
ready(function () {
	if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
		document.querySelector('body').classList.add('ios')
	} else {
		document.querySelector('body').classList.add('android')
	}
//	fadeIn(document.querySelector('.section-hero__video'));
	document.querySelector('.section-hero__video').play();
//	document.querySelector('.section-hero__video').style.opacity = 0;
	document.querySelector('.section-hero__video').classList.add('animated');
	document.querySelector('.section-hero__video').classList.add('fadeIn');
});
$(document).ready(function() {
	if (document.documentElement.clientWidth <= 768) {
		$('.carousel').addClass('owl-carousel owl-theme');
		$('.carousel').owlCarousel({
			loop:true,
			nav:true,
			margin: 7,
			navText: [ '', '' ],
			responsive : {
				0 : {
					items:2
				},
				440 : {
					items:3
				},
				560 : {
					items:4
				}
			}
		})
	}
})

