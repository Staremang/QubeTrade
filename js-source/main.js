function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
function setPlatform () {
	if (navigator.platform.indexOf('Mac') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
		document.querySelector('body').classList.add('ios')
	} else {
		document.querySelector('body').classList.add('android')
	}
}
ready(setPlatform ());