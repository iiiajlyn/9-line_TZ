import LocomotiveScroll from 'locomotive-scroll';
import helpers from '../helpers';

function init() {
	let options1 = {
		immediate: true
	}
	const scroll = new LocomotiveScroll();

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
		$('head').append('<link rel="stylesheet" href="/css/locomotiveScroll.css" type="text/css" />');
	}

	$('.ancore-top').on('click', () => {
		scroll.scrollTo('top')
	});

	$.each($('.js-to-scroll'), function (index, value) {
		$(value).on('click', () => {
			scroll.scrollTo({ target: $(value).attr('href'), lenisOptions: {immediate: true} })
		})
	});
}

// После обновления страницы скролим со старта
$(window).on('beforeunload', function () {
	$(window).scrollTop(0);
});

export default {
	init,
};
