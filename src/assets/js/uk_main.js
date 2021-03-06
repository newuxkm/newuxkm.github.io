
// selector ------------------------------------------------------------------------------------------------------------
const _main_container = $('.main_page .uk_container');
const _main_intro = _main_container.find('.main_intro');
const _main_info = _main_container.find('.main_info');
const _mainInfoStep1 = _main_info.find('.step1');
const _mainInfoStep2 = _main_info.find('.step2');
const _mainInfoStep3 = _main_info.find('.step3');
const _mainInfoStep4 = _main_info.find('.step4');
const _mainInfoStep5 = _main_info.find('.step5');


// document ready ------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  header_common();
  ukEditor_txtarea();
  uk_editor();
  uk_gist_skin_code();
});


// window load ---------------------------------------------------------------------------------------------------------
$(window).on('load', function(){
  focus_controll();
  _html.removeAttr('style');
  _main_intro.addClass('start');

  // d3 button click
  $('.d3_button input').on({
    click:function(){
      d3_button_click( $(this) );
    },
    keypress:function(e){
      if((e.keyCode ? e.keyCode : e.which) == 13){
        d3_button_click( $(this) );
        $(this).trigger('click');
      }
    }
  });
  function d3_button_click(target){
    const none_3d = 'none_3d';
    const hover_state = 'hover_state';
    if( target.is(":checked") === true ){
      _main_intro.addClass(none_3d+' '+hover_state);
      const class_re = setInterval(function(){
        if( _main_intro.is('.'+none_3d) && !_main_intro.is('.'+hover_state) ){
          _main_intro.addClass(hover_state);
          clearInterval(class_re);
        }
      }, 100);
    }
    else if( target.is(":checked") === false ){
      _main_intro.removeClass(none_3d);
      setTimeout(function(){
        _main_intro.removeClass(hover_state);
      }, 1600);
    }
  }

  // main_intro ukDetect 적용
  _main_intro.ukDetect({
    device_check:true,
    all_check:false
  });
  _main_intro.find('.uxkm_front').ukDetect({
    browser_check:true
  });
});


// resize --------------------------------------------------------------------------------------------------------------
$(window).on('resize', function(){
  let win_w = $(window).width();
  let win_h = $(window).height();
  pc_mb_class(win_w);
  hd_layer_open_resize(win_w);

  //main intro height
  if( device_check === 'device' ) _main_intro.css('height', win_h);
}).trigger('resize');


// scroll --------------------------------------------------------------------------------------------------------------
$(window).on('scroll', function(){
  let sct = $(window).scrollTop();
  hd_common(sct);

  //main info scroll ---------------------------//
  let info_top = _main_intro.height() - _ukHeader.height();
  if( sct >= info_top ) _main_info.addClass('info_scroll');
  //keyboard 페럴렉스
  let f_sct = sct - info_top;

  if( _html.is('.pc') ){
    _mainInfoStep1.css('transform','translateY('+ (f_sct*-0.8) +'px)');
    _mainInfoStep2.css('transform','translateY('+ (f_sct*-0.6) +'px)');
    _mainInfoStep3.css('transform','translateY('+ (f_sct*-0.4) +'px)');
    _mainInfoStep4.css('transform','translateY('+ (f_sct*-0.2) +'px)');
    _mainInfoStep5.css('transform','translateY('+ (f_sct*-0.1) +'px)');
  }
  else if( _html.is('.mb') ){
    _mainInfoStep1.css('transform','translateY('+ (f_sct*-0.4) +'px)');
    _mainInfoStep2.css('transform','translateY('+ (f_sct*-0.3) +'px)');
    _mainInfoStep3.css('transform','translateY('+ (f_sct*-0.2) +'px)');
    _mainInfoStep4.css('transform','translateY('+ (f_sct*-0.1) +'px)');
    _mainInfoStep5.css('transform','translateY('+ (f_sct*-0.05) +'px)');
  }
}).trigger('scroll');


// 메인 인트로 next클릯 ------------------------------------------------------------------------------------------------
$(document).on('click', '.next_content', function(){
  const topSize = _main_intro.height() - _ukHeader.height();
  _htmlBody.stop().animate({'scrollTop':topSize}, 1000, 'easeInOutQuint');
  return false;
});