function CompanySlider() {
	var mySwiper = new Swiper('.slider_wrap', {
		loop: true,
		spaceBetween:0,
		navigation: {
			nextEl: '.arrow_next',
			prevEl: '.arrow_prev',
		},
		pagination: {
			el: '.workspace_dot',
			type: 'bullets',
			clickable: true
		},
	});
}

$(function () {
	CompanySlider();
});