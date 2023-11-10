import LocomotiveScroll from 'locomotive-scroll';
import helpers from '../helpers';
import { getScrollPercentage } from '../components/getScrollPercentage'

function init() {
	let headerPage = $('.header');
	let ancoreTop = $('.ancore-top');
	let htmlPage = $('html');
	let ancoreTopValue = $('#ancore-top-value');
	let ancoreTopCircle = $('#ancore-top-circle');
	const scroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true,
		smoothMobile: true,
		resetNativeScroll: true,
		multiplier: 0.8,
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
			if (window.innerWidth < 1025) {
				setTimeout(() => {
					scroll.scrollTo($(value).attr('data-scroll-to'), { offset: -20 });
				}, 400);
			} else {
				scroll.scrollTo($(value).attr('data-scroll-to'), { offset: -70 })
			}
		})
	});

	$(ancoreTop).on('click', () => {
		scroll.scrollTo('top')
	});

	let scrollValue;
	scroll.on('scroll', ({ limit, scroll }) => {
		//ancore top
		if (!$(htmlPage).hasClass("has-scroll-smooth")) {
			scrollValue = Math.round(getScrollPercentage())
		} else {
			scrollValue = Math.round(scroll.y / limit.y * 100)
		}

		let strokeValue = 354 - 354 / 100 * scrollValue;

		$(ancoreTopValue).html(`${scrollValue} %`);
		$(ancoreTopCircle).css('stroke-dashoffset', strokeValue);

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
		// scroll.init()
		// scroll.start()
		scroll.update()
	}

	window.addEventListener('resize', resize);
	window.addEventListener('load', resize);

}

export default {
	init,
};
