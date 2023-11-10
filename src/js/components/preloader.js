import helpers from '../helpers';
import Pace from 'pace-js';

/**
* Плавное удаление
*/
function removeFadeOut(el, speed) {
	let seconds = speed / 1000;
	el.style.transition = `opacity ${seconds}s ease`;

	el.style.opacity = 0;
	setTimeout(() => {
		el.parentNode.removeChild(el);
	}, speed);
}

/**
* Прелоадер
*/

function init() {
	if (!helpers.getCookie('lastActivity') && !helpers.psi()) {
		let flag = 0;
		let preloader = document.createElement('div');
		let preloaderImg = document.createElement('div');
		$(preloader).addClass('preloader');
		$(preloaderImg).addClass('man-rocket');
		console.log(helpers.getCookie('lastActivity'));
		/**
		* Опции
		*/
		Pace.options = {
			ajax: false,
			document: false,
			eventLag: false,
			elements: {
				selectors: ['.site'],
			},
		};

		/**
		* Начало
		*/
		Pace.on('start', () => {
			$('.site').after(preloader);
			$(preloader).prepend(preloaderImg);
			helpers.lockScroll(true, $(preloader));
		});

		/**
		* Прогресс
		*/
		Pace.on('progress', (progress) => {
			if (progress > 90) {
				flag++;
				if (flag > 50) {
					Pace.stop();
				}
			}

			$(preloaderImg).css('left', `${progress}%`);
			$(preloaderImg).css('bottom', `${progress}%`);
		});

		/**
		* Конец
		*/
		Pace.on('hide', () => {
			helpers.lockScroll(false, $(preloader));
			removeFadeOut(preloader, 1000);
		});

		Pace.start();
	}

	/**
	* Пишем куки
	*/
	let date = new Date();
	helpers.setCookie('lastActivity', date, 30);
}

export default {
	init,
	removeFadeOut,
};
