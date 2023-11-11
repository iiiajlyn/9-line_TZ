const init = () => {
	function imgBox() {
		let imgHeight = $('.picture-experience__img').height() / 2;
		let windowHeight = $(window).height();
		let box = $('.picture-experience__box');
		let colum = $('.picture-experience');
		let columTop = imgHeight + (windowHeight / 2 - imgHeight * 2) - 10;

		if (window.innerWidth > 1024) {
			box.css('padding-top', `calc(50vh - ${imgHeight}px)`);
			box.css('margin-bottom', `${imgHeight}px`);
			colum.css('height', `calc(100% + ${columTop}px)`);
			colum.css('top', `-${columTop}px`);
		} else {
			box.css('padding-top', '0');
			box.css('margin-bottom', '0');
			colum.css('height', 'auto');
			colum.css('top', '0');
		}
	}

	window.addEventListener('resize', imgBox);
	window.addEventListener('load', imgBox);
};

export default {
	init,
};
