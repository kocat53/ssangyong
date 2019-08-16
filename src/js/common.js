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
		var $this = $(this);

		$this.on('mouseenter focusin', function () {
			$this.addClass('on').siblings().removeClass('on');
			
			var $maxHeight = Math.max.apply(null, $this.find('.gnb_depth1 > li').map(function (){
				return $(this).height();
			}).get());
			
			console.log($maxHeight);
			$('.gnb_bg').addClass('on').css({
				'display':'block',
				'height': $maxHeight
			});
		});

		$this.on('mouseleave focusout', function () {
			$this.removeClass('on');			
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
