import Pace from 'pace-js';

// eslint-disable-next-line no-useless-escape
let psi = navigator.userAgent.match(/(Mozilla\/5\.0 \(Linux; Android 11; moto g power \(2022\)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/109\.0.0.0 Mobile Safari\/537\.36)|(Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 10_15_7\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/109\.0\.0\.0 Safari\/537\.36)|(Speed Insights)|(Chrome-Lighthouse)|(PSTS[\d\.]+)/);

// Создать куки запись
let setCookie = (name, value, days) => {
	let expires = '';

	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}

	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

// Получить куки запись
let getCookie = (name) => {
	let nameEQ = `${name}=`;
	let ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];

		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}

		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}

	return null;
};

// Плавное удаление
function removeFadeOut(el, speed) {
	let seconds = speed / 1000;
	el.style.transition = `opacity ${seconds}s ease`;
	el.style.opacity = 0;
	setTimeout(() => {
		el.remove();
	}, speed);
}

function paceProgress(img, width, height, progress) {
	img.style.transform = `translateX(${Math.ceil(width * progress)}px) translateY(-${Math.ceil(height * progress)}px)`;
}

// Прелоадер;
if (!getCookie('lastActivity') && !psi) {
	let preloader = document.querySelector('.preloader');
	let preloaderImg = preloader.querySelector('.preloader__img');
	let progressLoad = 0;
	let windowWidth = window.innerWidth + 591;
	let windowHeight = window.innerHeight + 591;

	// Опции
	Pace.options = {
		ajax: false,
		document: true,
		eventLag: false,
	};

	// Начало
	Pace.on('start', () => {
		document.querySelector('.site').before(preloader);
		preloader.prepend(preloaderImg);
	});

	// Прогресс
	let progressTick = setInterval(() => {
		paceProgress(preloaderImg, windowWidth, windowHeight, progressLoad);
		if (progressLoad >= 0.9) {
			Pace.stop();
			setTimeout(() => {
				removeFadeOut(preloader, 500);
				clearInterval(progressTick);
			}, 1050);
		}
	}, 1050);
	Pace.on('progress', (progress) => {
		progressLoad = Math.ceil(progress) / 100;
		// if (progressLoad >= 1) {
		// 	Pace.stop();
		// }
	});

	// Конец
	Pace.on('done', () => {
		setTimeout(() => {
			let paceInactive = document.querySelector('.pace-inactive');
			let paceActive = document.querySelector('.pace-active');

			if (paceInactive) {
				paceInactive.remove();
			}

			if (paceActive) {
				paceActive.remove();
			}

			document.querySelector('body').classList.remove('pace-running');
			document.querySelector('body').classList.remove('pace-done');
		}, 1000);
	});

	Pace.start();
}

// Пишем куки
let date = new Date();
setCookie('lastActivity', date, 30);
