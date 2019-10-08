function headerSearch() {
	$('.search_header input').on('focus',function () {
		$(this).parents('li').addClass('on');
	});

	$('.search_header input').on('blur',function () {
		$(this).parents('li').removeClass('on');
	});
}

function gnb() {
	$('#gnb > li').each(function () {
		var $this = $(this),
			$depth2 = $this.find('.gnb_depth1> li');

		// 포커스 in
		$this.on('mouseenter focusin', function () {
			$this.addClass('on').siblings().removeClass('on');
			
			// 높이 구하기
			var $maxHeight = Math.max.apply(null, $this.find('li').map(function (){
				return $(this).innerHeight();
			}).get());

			// 넓이 구하기
			var $width = (100 / $depth2.length).toFixed(3);
						
			$depth2.css({
				'width': $width+"%",
				'height': $maxHeight
			});

			$('.gnb_bg').css({
				'display':'block',
				'height': $maxHeight
			});

			$('.gnb_dimmed').addClass('on');
		});

		// 마우스 out
		$this.on('mouseleave', function () {
			$this.removeClass('on');		
			$('.gnb_dimmed').removeClass('on');
			$('.gnb_bg').removeAttr('style');
		});
	});
}

$(function () {
	headerSearch();
});

$(window).on('load', function () {
	gnb();
});
