import {getScrollPercentage} from './getScrollPercentage';

/**
* Обрабатываем события в зависимости от процента скролла
*/
const init = () => {
	// let status = false;

	// $('.ancore-top').on('click', () => {
	// 	if (getScrollPercentage() > 98) {
	// 		status = true;
	// 	}
	// });

	document.addEventListener('DOMContentLoaded', () => {
		window.onscroll = () => {
			let scrollValue = Math.round(getScrollPercentage());
			let strokeValue = 354 - 354 / 100 * scrollValue;

			/**
			* Проргесс скрола
			*/
			$('#ancore-top-value').html(`${scrollValue} %`);
			$('#ancore-top-circle').css('stroke-dashoffset', strokeValue);

			/**
			* Если скролл и пользователь не в конце удаляем класс стрелку
			*/
			if (getScrollPercentage() <= 99 && $('.ancore-top').hasClass('js-page-end')) {
				$('.ancore-top').removeClass('js-page-end');
			}

			/**
			* Пользователь достиг конца страницы добавляем класс меняем статус
			*/
			if (getScrollPercentage() > 99) {
				$('.ancore-top').addClass('js-page-end');
			}

			/**
			* Если статус верный и есть что скролить запускаем ракету
			*/
			// if (status && getScrollPercentage() > 1) {
			// 	$('.ancore-top').addClass('ancore-top-animation');
			// 	$('.ancore-top__rocket').css('top', `${scrollValue}%`);
			// };

			/**
			* Если статус верный и скролл на верху убираем ракету меняем статус
			*/
			// if (status && getScrollPercentage() < 5) {
			// 	$('.ancore-top').removeClass('ancore-top-animation');
			// 	status = false;
			// };
		};
	});
};

export default {
	init,
};
