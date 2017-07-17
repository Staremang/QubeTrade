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

Element.prototype.viewChecker = function (options) {
	
	// if (this.length !== 0) {
	// 	for (let i = 0; i < this.length; i++) {
	// 		setPupup(this[i]);
	// 	}
	// }
		// function set (el) {
	// 	if (typeof el !== 'undefined') {
	// 			attachEvent(window, el, );
	// 		};
	// 	};
	// };
	var trigger = false,
		el = this;


	attachEvent(window, "scroll", visibleTrigger);
	attachEvent(window, "resize", visibleTrigger);
	visibleTrigger();

	function visibleTrigger () {
		if (isVisible() && !trigger) {
			trigger = true;
			start();
		}
	};

	function start () {
		el.children[0].play();
		el.children[0].classList.add('animated');
		el.children[0].classList.add('fadeIn');
		el.children[0].addEventListener('ended', end)
	};
	function end () {
		el.classList.add('ended');
	}
	function isVisible () {
		return el.getBoundingClientRect().top <= document.documentElement.clientHeight;
	};

	function attachEvent(element, event, callbackFunction) {
	    if (element.addEventListener) {
	        element.addEventListener(event, callbackFunction, false);
	    } else if (element.attachEvent) {
	        element.attachEvent('on' + event, callbackFunction);
	    }
	};

	return this;
}


ready(function () {
	if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
		document.querySelector('body').classList.add('ios')
	} else {
		document.querySelector('body').classList.add('android')
	}
	document.querySelector('.section-hero__video-container').viewChecker();
	document.querySelector('.three-phones-container').viewChecker();
	document.querySelector('.account-state-screenshot-video').viewChecker();
	document.querySelector('.three-phones-at-an-angle-video').viewChecker();
	document.querySelector('.screenshot-of-the-current-price-video').viewChecker();
	document.querySelector('.horizontal-phone-video').viewChecker();
	
//	fadeIn(document.querySelector('.section-hero__video'));
	// document.querySelector('.section-hero__video').play();
//	document.querySelector('.section-hero__video').style.opacity = 0;
	// document.querySelector('.section-hero__video').classList.add('animated');
	// document.querySelector('.section-hero__video').classList.add('fadeIn');
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

