import ResizeObserver from 'resize-observer-polyfill';
import {getScrollPercentage} from '../modules/getScrollPercentage';
import helpers from '../helpers';
import LocomotiveScroll from 'locomotive-scroll';

function init() {
	let headerPage = $('.header');
	let ancoreTop = $('.ancore-top');
	let htmlPage = $('html');
	let ancoreTopValue = $('#ancore-top-value');
	let ancoreTopCircle = $('#ancore-top-circle');
	let paddingTop = 100;
	// let flag = window.innerWidth;

	const locomotiveScroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true,
		smoothMobile: true,
		resetNativeScroll: true,
		// multiplier: 0.8,
	});

	// fix bottom empty
	new ResizeObserver(() => locomotiveScroll.update()).observe(
		document.querySelector('[data-scroll-container]'),
	);

	if (window.innerWidth < 1025) {
		$.each($('[data-scroll-speed]'), (index, value) => {
			value.removeAttribute('data-scroll-speed');
			value.setAttribute('data-scroll-repeat', '');
		});
	}

	if (helpers.psi()) {
		let style = document.createElement('style');
		style.innerHTML = '*{transition: none !important;}';
		$(htmlPage).addClass('Chrome-Lighthouse');
		$(htmlPage).prepend(style);
		$.each($('[data-scroll-speed]'), (index, value) => {
			value.removeAttribute('data-scroll-speed');
		});

		return;
	}

	$('head').append('<link rel="stylesheet" href="./css/locomotiveScroll.css" type="text/css" />');

	$.each($('.js-to-scroll'), (index, value) => {
		$(value).on('click', () => {
			if (window.innerWidth < 1025) {
				setTimeout(() => {
					locomotiveScroll.scrollTo($(value).attr('data-scroll-to'), {offset: -20});
				}, 450);
			} else {
				locomotiveScroll.scrollTo($(value).attr('data-scroll-to'), {offset: -70});
			}
		});
	});

	$(ancoreTop).on('click', () => {
		locomotiveScroll.scrollTo('top');
	});

	locomotiveScroll.on('scroll', ({limit, scroll}) => {
		// ancore top
		let scrollValue;
		if (!$(htmlPage).hasClass('has-scroll-smooth')) {
			scrollValue = Math.ceil(getScrollPercentage());
		} else {
			scrollValue = Math.ceil(scroll.y / limit.y * 100);
		}

		let strokeValue = 354 - 354 / 100 * scrollValue;

		$(ancoreTopValue).html(`${scrollValue} %`);
		$(ancoreTopCircle).css('stroke-dashoffset', strokeValue);

		if (scrollValue < 98 && $(ancoreTop).hasClass('js-page-end')) {
			$(ancoreTop).removeClass('js-page-end');
		}

		if (scrollValue >= 98) {
			$(ancoreTop).addClass('js-page-end');
		}

		// header
		if (scroll.y >= 80 && window.innerWidth > 1024) {
			$(headerPage).addClass('is-fixed');
			$(headerPage).css('padding-top', '20px');
			paddingTop = 20;
		}

		if (scroll.y <= 80 && window.innerWidth > 1024) {
			$(headerPage).removeClass('is-fixed');
			$(headerPage).css('padding-top', `${100 - scroll.y}px`);
			paddingTop = 100 - scroll.y;
		}
	});

	function resize() {
		if (window.innerWidth <= 1024) {
			$(headerPage).css('padding-top', '0');
		} else {
			$(headerPage).css('padding-top', `${paddingTop}px`);
		}
		locomotiveScroll.update();
		new ResizeObserver(() => locomotiveScroll.update()).observe(
			document.querySelector('[data-scroll-container]'),
		);
	}

	window.addEventListener('resize', resize);
	window.onload = setTimeout(resize, 200);
}

export default {
	init,
};
