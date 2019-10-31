// 헤더 - 검색영역 라인컬러 변경
function headerSearch() {
	$('.search_header input').on('focus',function () {
		$(this).parents('li').addClass('on');
	});

	$('.search_header input').on('blur',function () {
		$(this).parents('li').removeClass('on');
	});
}

// gnb 작업
function gnb() {

	function gnbOut(target) {
		$(target).removeClass('on')
		$('.gnb_dimmed').removeClass('on');
		$('.gnb_bg').removeAttr('style');
	};

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
			gnbOut($this);
		});
	});

	$('#gnb > li:first-child > a ').on('keydown', function (e) {
		if (e.keyCode == 9 && e.shiftKey) { 
			gnbOut('#gnb > li ');
		}
	});

	$('#gnb > li:last-child > .gnb_depth1 > li:last-child > .gnb_depth2 > li:last-child > a ').on('keydown', function (e) {
		if (e.keyCode == 9) {
			console.log('나갔는데');
			gnbOut('#gnb > li ');
			console.log('왜 안꺼지지');
		}
	})
}

$(function () {
	headerSearch();
});

$(window).on('load', function () {
	gnb();
});
