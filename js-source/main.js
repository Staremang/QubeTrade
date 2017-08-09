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
	
	var trigger = false,
		isLoad = false,
		ended = false,
		el = this;
		// video = el.children[0];

	reset(el);
	
	if (isCanPlay()) {
		var timeoutId,
			video;

		var videoLoaded = function () {
			isLoad = true;
			visibleTrigger();
		}

		var visibleTrigger = function () {
			if (isVisible() && !trigger) {
				window.removeEventListener('scroll', visibleTrigger);
				window.removeEventListener('resize', visibleTrigger);

				if (isLoad) {
					trigger = true;
					start();
				} else {
					timeoutId = setTimeout(() => {
						if (!isLoad) {
							log(false, 'Видео не загрузилось в указанный период');
							video.removeEventListener('canplaythrough', videoLoaded);
							end();
						}
					}, 8000)
				}
			}
		};

		var start = function () {
			const promise = video.play();

			clearTimeout(timeoutId);

			video.style.opacity = '1';
			video.style.visibility = 'visible';


			setTimeout(() => {
				if (!el.classList.contains('media-last-frame'))
					el.classList.add('media-last-frame');
			}, 500);
			
			video.addEventListener('ended', end);

			if (promise instanceof Promise) {
				promise
					.then(
						() => {
							log(true);
						}
					)
					.catch(
						(error) => {
							log(false, error.message);
							end();
						}
					);

			} else {
				setTimeout(() => {
					if (!ended) {
						log(false, 'Видео слишком долго грузилось');

						video.removeEventListener('canplaythrough', videoLoaded);
						end();
					}
				}, 10000)
			}
		};

		video = createVideo(el);

		video.addEventListener('canplaythrough', videoLoaded);


		window.addEventListener('scroll', visibleTrigger);
		window.addEventListener('resize', visibleTrigger);

		window.addEventListener('unload', del);
		document.querySelector('.header-switch').addEventListener('click', del);

		function del () {
			console.log('gsg');
			clearTimeout(timeoutId);
			video.removeEventListener('canplaythrough', videoLoaded);
			window.removeEventListener('scroll', visibleTrigger);
			window.removeEventListener('resize', visibleTrigger);
			window.removeEventListener('unload', del);
			document.querySelector('.header-switch').removeEventListener('click', del);

			videoLoaded = null;
			visibleTrigger = null;
			start = null;
		}

		visibleTrigger();

	} else {
		log(false, 'Воспроизведение данного формата недоступно для вашего браузера');
		end();
	}
	
	function createVideo (parent) {
		var video = document.createElement('video');

		if (navigator.userAgent.indexOf('OPR') !== -1) {
			if (options.os === 'ios') {
				video.setAttribute('src', 'video_ios/' + options.name + '.webm');
			} else {
				video.setAttribute('src', 'video_android/' + options.name + '.webm');
			}
			video.setAttribute('type', 'video/webm');
		} else {
			if (options.os === 'ios') {
				video.setAttribute('src', 'video_ios/' + options.name + '.mp4');
			} else {
				video.setAttribute('src', 'video_android/' + options.name + '.mp4');
			}
			video.setAttribute('type', 'video/mp4');
		}

		// video.setAttribute('preload', 'none');

		video.classList.add('mediaobject-element');

		parent.insertBefore(video, parent.children[0]);
		
		video.load();
		video.addEventListener('error', (error) => {
			log(false, error);
			end();
		});
		
		return video;
	}
	
	function log (okay, msg) {
		if (okay)
			console.log(options.name + ' - Успешно')
		else {
			if (typeof msg !== 'undefined')
				console.error(options.name, msg)
			else
				console.error(options.name, ' - Unknown error')
		}
	}
	
	function reset (element) {
		element.innerHTML = '';
		if (element.classList.contains('media-last-frame'))
			element.classList.remove('media-last-frame');
		if (element.classList.contains('media-end'))
			element.classList.remove('media-end');
	}

	function end () {
		ended = true;

		if (!el.classList.contains('media-last-frame'))
			el.classList.add('media-last-frame');

		el.classList.add('media-end');
	}
	function isCanPlay () {
		return document.getElementsByTagName('video')[0].canPlayType("video/mp4") !== '' || document.getElementsByTagName('video')[0].canPlayType("video/mp4") !== '';
	}
	function isVisible () {
		return el.getBoundingClientRect().top <= document.documentElement.clientHeight;
	};

	return this;
}
function setVideo (os) {
	document.querySelector('.section-hero__video-container').viewChecker({
		name: '1',
		os: os
	});
	document.querySelector('.three-phones-container').viewChecker({
		name: '2',
		os: os
	});
	document.querySelector('.three-phones-at-an-angle-video').viewChecker({
		name: '4',
		os: os
	});
	document.querySelector('.horizontal-phone-video').viewChecker({
		name: '6',
		os: os
	});
}

ready(function () {
	svg4everybody();
	console.log('v1.2 - 09.08');
	if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
		document.body.classList.add('ios');
		document.querySelector('.header-switch__item[data-os="ios"]').classList.add('active');
	} else {
		document.body.classList.add('android');
		document.querySelector('.header-switch__item[data-os="android"]').classList.add('active');
	}
});
window.addEventListener('load', function () {
	if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
		setVideo('ios');
	} else {
		setVideo('android');
	}
})

$(document).ready(function() {
	$('.header-switch').click(function () {
		$('.header-switch__item').removeClass('active');
		
		if (document.body.classList.contains('android')) {
			document.body.classList.remove('android');
			document.body.classList.add('ios');
			document.querySelector('.header-switch__item[data-os="ios"]').classList.add('active');
			setVideo('ios');
		} else {
			document.body.classList.remove('ios');
			document.body.classList.add('android');
			document.querySelector('.header-switch__item[data-os="android"]').classList.add('active');
			setVideo('android');
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

