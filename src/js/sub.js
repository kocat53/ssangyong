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

function employSlider() {
	$('.list_employ_tab >li').click(function () {
		$(this).addClass('on').siblings().removeClass('on');
	});
	var empslider = new Swiper('.box_tab_content > .swiper-container', {
		loop: true,
		autoplay: {
			delay: 5000
		},
		navigation: {
			nextEl: '.xi-angle-left',
			prevEl: '.xi-angle-right',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	})
}

$(function () {
	CompanySlider();
	employSlider();
});