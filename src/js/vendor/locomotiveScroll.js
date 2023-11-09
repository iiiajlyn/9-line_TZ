import LocomotiveScroll from 'locomotive-scroll';
import helpers from '../helpers';
import { getScrollPercentage } from '../components/getScrollPercentage'

function init() {
	let headerPage = $('.header');
	let ancoreTop = $('.ancore-top');
	let htmlPage = $('html');
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
		$(htmlPage).addClass('Chrome-Lighthouse');
		$(htmlPage).prepend(style);
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

	$(ancoreTop).on('click', () => {
		scroll.scrollTo('top')
	});
	let scrollValue;

	scroll.on('scroll', ({ limit, scroll }) => {
		//ancore top
		scrollValue = Math.round(scroll.y / limit.y * 100)
		let strokeValue = 354 - 354 / 100 * scrollValue;

		if (window.innerWidth <= 1024) {
			scrollValue = Math.round(getScrollPercentage())
		}

		$('#ancore-top-value').html(`${scrollValue} %`);
		$('#ancore-top-circle').css('stroke-dashoffset', strokeValue);

		if (scrollValue < 98 && $(ancoreTop).hasClass('js-page-end')) {
			$(ancoreTop).removeClass('js-page-end');
		}

		if (scrollValue > 98) {
			$(ancoreTop).addClass('js-page-end');
		}

		//header
		if (scroll.y >= 80 && window.innerWidth > 1024) {
			$(headerPage).addClass('is-fixed');
			$(headerPage).css('padding-top', '20px');
		}

		if (scroll.y <= 80 && window.innerWidth > 1024) {
			$(headerPage).removeClass('is-fixed');
			$(headerPage).css('padding-top', `${100 - scroll.y}px`);
		}
	});

	function resize() {
		if (window.innerWidth <= 1024) {
			$(headerPage).css('padding-top', '0');
		}

		scroll.start()
		scroll.update()
	}

	window.addEventListener('resize', resize);
	window.addEventListener('load', resize);

}

export default {
	init,
};
