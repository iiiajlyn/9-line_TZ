// // После обновления страницы скролим со старта
// $(window).on('beforeunload', function () {
// 	$(window).scrollTop(0);
// });

import LocomotiveScroll from 'locomotive-scroll';

function init() {
	const scroll = new LocomotiveScroll({
		smooth: true,
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
