function CompanySlider() {
	var mySwiper = new Swiper('.slider_wrokspace > .swiper-container', {
		loop: true,
		autoplay: {
			delay: 5000
		},
		spaceBetween:0,
		navigation: {
			nextEl: '.slider_wrokspace .arrow_next',
			prevEl: '.slider_wrokspace .arrow_prev',
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