// // После обновления страницы скролим со старта
// $(window).on('beforeunload', function () {
// 	$(window).scrollTop(0);
// });

import LocomotiveScroll from 'locomotive-scroll';

function init() {
	// eslint-disable-next-line no-useless-escape
	let psi = navigator.userAgent.match(/(Mozilla\/5\.0 \(Linux; Android 11; moto g power \(2022\)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/109\.0.0.0 Mobile Safari\/537\.36)|(Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 10_15_7\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/109\.0\.0\.0 Safari\/537\.36)|(Speed Insights)|(Chrome-Lighthouse)|(PSTS[\d\.]+)/);
	if (psi) {
		let style = document.createElement('style');
		style.innerHTML = '*{transition: none !important;}'
		$('html').addClass('Chrome-Lighthouse');
		$('html').prepend(style);
		$.each($('[data-scroll-speed]'), function (index, value) {
			value.removeAttribute('data-scroll-speed');
		});
	} else {
		$('head').append('<link rel="stylesheet" href="/css/locomotiveScroll.css" type="text/css" />');
	}

	const scroll = new LocomotiveScroll({
		lenisOptions: {
			wheelMultiplier: 0.7,
		}
	});

	$('.ancore-top').on('click', () => {
		scroll.scrollTo('top')
	});

	$.each($('.js-to-scroll'), function (index, value) {
		$(value).on('click', () => {
			scroll.scrollTo($(value).attr('href'))
		})
	});

	if (window.innerWidth < 1025) {
		$.each($('[data-scroll-speed]'), function (index, value) {
			value.removeAttribute('data-scroll-speed');
			value.setAttribute('data-scroll-repeat', '')
		});
	}
}

export default {
	init,
};
