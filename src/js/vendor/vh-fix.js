/**
* Модуль исправления багов на iOs устройствах
* определяет высоту экрана и при любом изменении переопределяет её
* в стилях используйте кастомные стили var(--vh)
*/
function init() {
	if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
		let vh = window.innerHeight;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		window.addEventListener('resize', () => {
			vh = window.innerHeight;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
	}
};

export default { init };
