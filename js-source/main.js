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
		isLoad = false,
		played = false,
		el = this;
		// video = el.children[0];

	if (isCanPlay()) {
		var video = document.createElement('video');

		if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
			video.setAttribute('src', 'video_ios/' + options);
		} else {
			video.setAttribute('src', 'video_android/' + options);
		}

		// video.setAttribute('preload', 'none');

		video.classList.add('mediaobject-element');

		el.insertBefore(video, el.children[0]);



		video.addEventListener('canplaythrough', videoLoaded)
		video.addEventListener('error', end);
		window.addEventListener('scroll', visibleTrigger);
		window.addEventListener('resize', visibleTrigger);
		visibleTrigger();

		function videoLoaded () {
			isLoad = true;
			visibleTrigger();
		}

		function visibleTrigger () {
			if (isVisible() && !played) {

				if (isLoad) {
					played = true;
					start();
				} else {
					setTimeout(function () {
						if (!isLoad) {
							video.removeEventListener('canplaythrough', videoLoaded)
							video.removeEventListener('error', end);
							window.removeEventListener('scroll', visibleTrigger);
							window.removeEventListener('resize', visibleTrigger);
							end();
						}
					}, 8000)
				}
			}
		};

		function start () {
			const promise = video.play();

			video.style.opacity = '1';
			video.style.visibility = 'visible';

			if (promise instanceof Promise) {
				promise.then(function() {
					console.log(options, 'autoplay')
				}).catch(function(error) {
					console.error(options, error.message);
					end();
				});

			} else {
				console.error('autoplay unknown');
				end();
			}

			window.removeEventListener('scroll', visibleTrigger);
			window.removeEventListener('resize', visibleTrigger);
			video.addEventListener('ended', end)
		};

	} else {
		end();
	}

	function end () {
		el.classList.add('media-end');
	}
	function isCanPlay () {
		return document.getElementsByTagName('video')[0].canPlayType("video/mp4") !== ''
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
		document.body.classList.add('ios');
		document.querySelector('.header-switch__item[data-os="ios"]').classList.add('active');
	} else {
		document.body.classList.add('android');
		document.querySelector('.header-switch__item[data-os="android"]').classList.add('active');
	}
	document.querySelector('.section-hero__video-container').viewChecker('1.mp4');
	document.querySelector('.three-phones-container').viewChecker('2.mp4');
		// document.querySelector('.account-state-screenshot-video').viewChecker('3.mp4');
	document.querySelector('.three-phones-at-an-angle-video').viewChecker('4.mp4');
		// document.querySelector('.screenshot-of-the-current-price-video').viewChecker('5.mp4');
	document.querySelector('.horizontal-phone-video').viewChecker('6.mp4');

//	fadeIn(document.querySelector('.section-hero__video'));
	// document.querySelector('.section-hero__video').play();
//	document.querySelector('.section-hero__video').style.opacity = 0;
	// document.querySelector('.section-hero__video').classList.add('animated');
	// document.querySelector('.section-hero__video').classList.add('fadeIn');
});
$(document).ready(function() {
	$('.header-switch__item').click(function () {
		$('.header-switch__item').removeClass('active');
		$(this).addClass('active');
		if ($(this).attr('data-os') === 'ios') {
			$('body').removeClass('android');
			$('body').addClass('ios');
		} else {
			$('body').removeClass('ios');
			$('body').addClass('android');
		}
	})
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

