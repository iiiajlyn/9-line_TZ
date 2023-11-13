/**
* Получаем процент скролла
*/
export const getScrollPercentage = () => {
	let scrollTop = window.scrollY || document.documentElement.scrollTop;
	let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	let documentHeight = Math.max(
		document.body.scrollHeight,
		document.body.offsetHeight,
		document.body.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight,
		document.documentElement.clientHeight,
	);

	return scrollTop / (documentHeight - windowHeight) * 100;
};

