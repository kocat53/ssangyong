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

function prSlider() {
	var prSlider = new Swiper('.slider_event_area > .swiper-container', {
		loop: true,
		autoplay: {
			delay: 5000
		},
		navigation: {
			nextEl: '.xi-angle-right-thin',
			prevEl: '.xi-angle-left-thin',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	})
}

// 구매정보 슬라이드
function purchaseSlider() {
	var prSlider = new Swiper('.down_carPdf > .swiper-container', {
		loop: true,
		autoplay: {
			delay: 5000
		},
		navigation: {
			nextEl: '.xi-angle-right',
			prevEl: '.xi-angle-left',
		},
		pagination: {
			el: '.dot',
			type: 'bullets',
			clickable: true
		},
	});
	
	prSlider.on('slideChange', function () {
		var $index = prSlider.activeIndex,
			$link = $('.down_carPdf').find('.swiper-slide').eq($index).data('link')
		
		$('.down_catalog').attr('href','javascript:alert("'+$link+ '")' )
	})
}

function tabSelect() {
	$('.search_shop_wrap  > .title').click(function () {
		var $this = $(this);

		$(this).parent().addClass('on').siblings().removeClass('on');
	})
}

function customSelect() {
	$('.search_wrap').each(function () {
		var $this = $(this);
		if ($this.hasClass('type_select')) {
			$this.on('click', function () {
				$(this).toggleClass('on');
			});

			$($this).on('focusin keydown', function (e) {
				if (e.keyCode == 13) { 
					$(this).toggleClass('on');
				}
			});
		}
	})

	// 셀렉트 된 값 클릭했을 경우
	$('.item_select').click(function () {
		var $this = $(this),
			$text = $this.text();
		
		$this.parents('.list_select').siblings('.name_val').text($text);
	});

	// 마지막 컨텐츠 에서 포커스 아웃 시 메뉴 닫힘
	$('.list_select > li:last-child ').on('focusout', function () {
		$(this).parents('.search_wrap').removeClass('on');
	})
}

$(function () {
	CompanySlider();
	employSlider();
	prSlider();
	purchaseSlider();
	customSelect();
	tabSelect();
});