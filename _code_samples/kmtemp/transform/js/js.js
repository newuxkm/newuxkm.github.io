

var $contentArea = $('.contentArea');
var $contentArticle = $contentArea.find('>article');
var $form_set = $('.form_set');
var key = '48 49 50 51 52 53 54 55 56 57 8 45 46 37 38 39 40 13 9 96 97 98 99 100 101 102 103 104 105 35 36 16 17 27 109 110 189';

$(document).ready(function(){
	$('.wrap').append('<p class="copy_info">클립보드에<br>복사되었습니다.</p>');
	form_ready();
	each_attr();

	$('.steps_link').click(function(){
		var steps_top = $('.steps_con').offset().top;
		$('html, body').stop().animate({'scrollTop':steps_top - 40}, 800, 'easeInOutCubic');
		console.log(steps_top);
	});

	$('.transition_steps .lft').each(function(i, e){
		$(e).find('.result_btn').click(function(){
			$(e).find('.ex_code').addClass('hover');
			var clear_hover = setInterval(function(){
				$(e).find('.ex_code').removeClass('hover');
				clearInterval(clear_hover);
			}, 1000);
		});
	});
});

function form_ready(){
	$form_set.each(function(i, e){
		var boxWrap = $(e).find('.box_wrap');
		var box = $(e).find('.box');
		var code = $(e).find('.code');
		var code_txt = $(e).find('.css_txt');
		var copy_txt = $(e).find('.copy_txt');
		var code_i = code_txt.find('i');
		var form = $(e).find('.form p');
		var result = $(e).find('.result');
		var ex_wrap = '.ex_wrap';
		var animation_ex = '.animation_ex';
		var po_box_wrap = '.po_box_wrap';
		var box_md = '.box_md';

		code.append('<textarea value="" class="copy_inp" style="width:300px; height:100px;"></textarea><a class="copy_btn dp_pc">Code Copy</a>');
		var copy_inp = $(e).find('.copy_inp');
		var copy_btn = $(e).find('.copy_btn');

		//3d만 해당
		if( $contentArticle.is('.t3d') ){
			boxWrap.find('.parent').append('<i class="xy_axis"></i><i class="z_axis"></i>');
			boxWrap.append(
				'<p class="axis_ex">' +
					'<i class="x_a">x</i>' +
					'<i class="y_a">y</i>' +
					'<i class="z_a">z</i>' +
				'</p>' +
				'<a class="d3_btn"><i data-txt="3D">3D 버튼</i></a>'
			);
		}


		form.each(function(j, k){
			var inp = $(k).find('input, select');
			code_i.eq(j).text( inp.val() );
			codeCopy();

			//설명글일때(input = range)
			if( $(e).is(ex_wrap) ) box.attr('style',copy_txt.text());
			
			//input에 값 입력 시 해당 숫자 변경
			inp.on({
				focusin:function(){ code_i.eq(j).addClass('on'); },
				focusout:function(){ code_i.eq(j).removeClass('on'); },
				keyup:function(){
					var k_code = String(event.keyCode);
					//console.log(k_code);
					if( !key.match(k_code) ){
						alert('숫자와 (-)만 입력 가능');
						$(this).val('').focus();
					}
					code_i.eq(j).text($(this).val());

					if( $contentArticle.is(box_md) ){
						if( $(this).parent().is('.copy_w') ){
							code.find('.hide i').text($(this).val());
							style_app();
						}
					}
					codeCopy();
				},
				input:function(){
					//console.log($(this).val())
					//code_i.eq(j).addClass('on');
					code_i.eq(j).text($(this).val());
					if( !$(animation_ex).is(':visible') ) style_app();
					codeCopy();

					if( $contentArticle.is(box_md) ){
						if( $(this).parent().is('.copy_w') ){
							code.find('.hide i').text($(this).val());
							style_app();
						}
					}
				},
				change:function(){
					code_i.eq(j).text($(this).val());
					box.removeClass('ani_start');
					if( !$(animation_ex).is(':visible') ) style_app();
					if( $(animation_ex).is(':visible') ) box.removeAttr('style');
					codeCopy();
				}
			});
			//코드 복사
			function codeCopy(){
				var copy_code = copy_txt.text().replace(/\t+|\v+$/g,'');  //텝만 제거
				//var copy_code = code_txt.text().replace(/\s/g,'');  //전체 공백 제거
				copy_inp.val( copy_code );
			}
		});

		//css 작동 함수
		function style_app(){
			var copy_code = code_txt.text().replace(/\t+|\v+$/g,'');
			box.attr('style', copy_code );

			if( $(e).find(po_box_wrap).is(':visible') ){
				$(po_box_wrap).attr('style', copy_code );
				//$('.spin_btn').click();
				//$(po_box_wrap).toggleClass('spin_on');
				/*
				$('.spin_btn').click();
				$('.spin_btn').removeClass('on');
				$(po_box_wrap).removeClass('spin_on');
				var click_off = setInterval(function(){
					$('.spin_btn').click();
					clearInterval(click_off);
				}, 10);
				*/
			}
		}
		
		//마우스 오버시 작동
		boxWrap.on({
			mouseenter: function () {
				if( !$(animation_ex).is(':visible') ) {
					style_app();
				}
			},
			mouseleave: function () {
				if( !$(e).is(ex_wrap) && !$(animation_ex).is(':visible') ) {
					box.removeAttr('style');
				}
			}
		});

		//result 클릭시 작동
		result.click(function(){
			if( !$(animation_ex).is(':visible') ) {
				style_app();
				var return_box1 = setInterval(function () {
					box.removeAttr('style');
					clearInterval(return_box1);
				}, 600);
			}else{
				box.removeAttr('style');
				var return_box2 = setInterval(function () {
					style_app();
					clearInterval(return_box2);
				}, 300);
			}
			return false;
		});

		//클립보드 복사
		copy_btn.click(function(){
			//복사 안내
			$('.copy_info').addClass('on');
			var copyInfo_close = setInterval(function(){
				$('.copy_info').removeClass('on');
				clearInterval(copyInfo_close);
			}, 800);
			
			//복사
			copy_inp.select();
			document.execCommand( 'copy' );
			return false;
		});

		//3D view 버튼
		$(e).find('.d3_btn').click(function(){
			$(this).toggleClass('on');
			$(this).parent().toggleClass('box_3d');
		});

		//박스 회전하기 버튼
		$(e).find('.spin_btn').click(function(){
			$(this).toggleClass('on');
			$(this).siblings(po_box_wrap).toggleClass('spin_on');
		});

		//backface-visibility
		$('.backface_ex .box_wrap').on({
			mouseenter:function(){ $(this).addClass('on'); },
			mouseleave:function(){ $(this).removeClass('on'); }
		});
	});
}

function each_attr(){
	var $attr_play = $('.attr_play');

	$attr_play.each(function(i, e){
		var $play = $(e).find('.play ');
		var $replay = $(e).find('.replay ');
		var $stop = $(e).find('.stop');
		var $c_sub = $(e).find('.c_sub');

		var $paused = $(e).find('.paused');
		var $running = $(e).find('.running');
		var $ani_bar = $(e).find('.ani_bar');

		$play.click(function(){
			$c_sub.addClass('play');
			$play.addClass('disabled');
			$replay.removeClass('disabled');
			$stop.removeClass('disabled');
		});
		$stop.click(function(){
			$c_sub.removeClass('play');
			$play.removeClass('disabled');
			$replay.addClass('disabled');
			$stop.addClass('disabled');
		});
		$replay.click(function(){
			if( !$stop.is('.disabled') ){
				$c_sub.addClass('replay').removeClass('play');
				var restart = setInterval(function(){
					$c_sub.removeClass('replay').addClass('play');
					clearInterval(restart);
				}, 200);
			}
		});

		$paused.click(function(){
			$ani_bar.addClass('paused').removeClass('running');
			$paused.addClass('disabled');
			$running.removeClass('disabled');
		});
		$running.click(function(){
			$ani_bar.removeClass('paused').addClass('running');
			$paused.removeClass('disabled');
			$running.addClass('disabled');
		});
	});
}