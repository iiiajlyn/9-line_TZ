import LocomotiveScroll from 'locomotive-scroll';
import helpers from '../helpers';

function init() {
	const scroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true
	});

	if (window.innerWidth < 1025) {
		$.each($('[data-scroll-speed]'), function (index, value) {
			value.removeAttribute('data-scroll-speed');
			value.setAttribute('data-scroll-repeat', '')
		});
	}

	if (helpers.psi()) {
		let style = document.createElement('style');
		style.innerHTML = '*{transition: none !important;}'
		$('html').addClass('Chrome-Lighthouse');
		$('html').prepend(style);
		$.each($('[data-scroll-speed]'), function (index, value) {
			value.removeAttribute('data-scroll-speed');
		});

		return
	} else {
		$('head').append('<link rel="stylesheet" href="./css/locomotiveScroll.css" type="text/css" />');
	}

	$.each($('.js-to-scroll'), function (index, value) {
		$(value).on('click', () => {
			scroll.scrollTo($(value).attr('data-scroll-to'))
		})
	});

	$('.ancore-top').on('click', () => {
		scroll.scrollTo('top')
	});

	//ancore top
	scroll.on('scroll', ({ limit, scroll }) => {
		let scrollValue = Math.round(scroll.y / limit.y * 100)
		let strokeValue = 354 - 354 / 100 * scrollValue;

		$('#ancore-top-value').html(`${scrollValue} %`);
		$('#ancore-top-circle').css('stroke-dashoffset', strokeValue);

		if (scrollValue < 98 && $('.ancore-top').hasClass('js-page-end')) {
			$('.ancore-top').removeClass('js-page-end');
		}

		if (scrollValue > 98) {
			$('.ancore-top').addClass('js-page-end');
		}

		// //header
		// if (scroll.y >= 175) {
		// 	$('.header').addClass('is-fixed');
		// } else {
		// 	$('.header').removeClass('is-fixed');
		// }
	});
}

export default {
	init,
};
