// var url = {
// 	'ios': ['video/ios/1.mp4', 'video/ios/2.mp4', 'video/ios/3.mp4', 'video/ios/4.mp4', 'video/ios/5.mp4', 'video/ios/6.mp4',]
// }
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
		canPlay = false,
		played = false,
		el = this,
		video = el.children[0];

	if (document.getElementsByTagName('video')[0].canPlayType("video/mp4") !== '') {

		video.setAttribute('preload', 'none');

		if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
			video.setAttribute('src', 'video/ios/' + options);
		} else {
			video.setAttribute('src', 'video/android/' + options);
		}

		video.load();

		video.addEventListener('canplaythrough', function () {
			canPlay = true;
			visibleTrigger();
		})
		attachEvent(video, 'error', end);
		attachEvent(window, "scroll", visibleTrigger);
		attachEvent(window, "resize", visibleTrigger);
		visibleTrigger();
	} else {
		end();
	}

	function visibleTrigger () {
		if (isVisible() && !played) {

			if (canPlay) {
				played = true;
				start();
				console.log('play');
			} else {
				setTimeout(function () {
					if (!canPlay) {
						end();
					}
				}, 8000)
			}
		}
	};

	function start () {
		video.play();
		video.classList.add('animated');
		video.classList.add('fadeIn');
		video.addEventListener('ended', end)
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
		document.body.classList.add('ios')
	} else {
		document.body.classList.add('android')
	}
	document.querySelector('.section-hero__video-container').viewChecker('1.mp4');
	document.querySelector('.three-phones-container').viewChecker('2.mp4');
	document.querySelector('.account-state-screenshot-video').viewChecker('3.mp4');
	document.querySelector('.three-phones-at-an-angle-video').viewChecker('4.mp4');
	document.querySelector('.screenshot-of-the-current-price-video').viewChecker('5.mp4');
	document.querySelector('.horizontal-phone-video').viewChecker('6.mp4');

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

