

//댓글 start
var comment_wrap = $('.comment_wrap');
var the_iframe = 'the_iframe';
var id_iframe = '#'+the_iframe;

$(window).on('load', function(){
	reload();
	function reload(){
		re_height();
		function re_height(){
			$(window).resize(function(){
				var the_height= $(id_iframe).contents().find('body').height();
				comment_wrap.css({'position':'relative', 'height':the_height});
				$(id_iframe).css({
					'position':'absolute', 'left':'0', 'bottom':'0', 'width':'100%',
					'height':'100%', 'overflow':'hidden'
				});
			}).trigger('resize');
		}

		/*$(id_iframe).contents().find('.cmmd_write, .cmt_btn .cbt_d').click(function(){
			comment_wrap.addClass('reSize');
		});
		$(id_iframe).contents().find('.cmmd_write').click(function(){
			comment_wrap.addClass('re_cmmd');
		});
		$(id_iframe).contents().find('.cmt_btn .cbt_e').click(function(){
			$(id_iframe).contents().find('.cmmd_write').click(function(){
				comment_wrap.addClass('reSize');
			});
		});

		var start_time = 0;
		var end_time = 1000;
		$(id_iframe).contents().on('click', function(){
			if( comment_wrap.is('.reSize') ){
				if( comment_wrap.is('.re_cmmd') && $(id_iframe).contents().find('.cmmd_txtbox').val() === '' ){
					return false;
				}else{
					var iframe_re = setInterval(function(){
						start_time += 100;
						$(window).trigger('resize');
						//console.log(start_time, 'bbb');

						if( start_time === end_time ){
							start_time = 0;
							clearInterval(iframe_re);
							setTimeout(function(){
								clearInterval(iframe_re);
							}, 100);
							setTimeout(function(){
								clearInterval(iframe_re);
							}, 200);
							$(window).trigger('resize');
							comment_wrap.removeClass('reSize').removeClass('re_cmmd');
							reload();
						}
					}, 100);
				}
			}
		});*/
	}
});
//댓글 end