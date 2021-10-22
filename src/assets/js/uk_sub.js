
// selector ------------------------------------------------------------------------------------------------------------
const _top_link = $('.top_link');
const _sub_content = $('.sub_content');
const _side_menu_area = $('.side_menu_area');
const _side_toggle = _side_menu_area.find('.side_menu_toggle');
const _side_menu = $('.side_menu');
const _side_menu_d3 = _side_menu.find('.depth3 > li');
const kmtemp_resize_iframe = 'kmtemp_resize_iframe';

const loading_scroll_top = 'loading_scroll_top';
let loading_sct = null;


// document ready ------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  header_common();
  ukEditor_txtarea();
  uk_editor();
  uk_gist_skin_code();
  //focus_controll();

  // side menu toggle
  const sideToggle = 'sideToggle';
  const side_close = 'side_close';
  _side_toggle.on('click', function(){
    const _this = $(this);
    
    // 닫기
    if( !_this.is('.active') ){
      _this.addClass('active').attr('title','사이드 메뉴 열기').parent().addClass(side_close);
      _this.find('b').text('OPEN');
      _html.addClass('side_close');
      sessionStorage.setItem(sideToggle, true);
    }
    // 열기
    else{
      _this.removeClass('active').attr('title','사이드 메뉴 닫기').parent().removeClass(side_close);
      _this.find('b').text('CLOSE');
      _html.removeClass('side_close');
      sessionStorage.clear(sideToggle);
    }

    return false;
  });

  // sessionStorage 의 sideToggle 에 true 값이 있으면 side menu 닫기 (<head>로 이동)
  // if( sessionStorage.getItem(sideToggle) ){
  //   _side_toggle.addClass('active').attr('title','사이드 메뉴 열기').parent().addClass(side_close);
  //   _side_toggle.find('b').text('OPEN');
  // }
});


// window load ---------------------------------------------------------------------------------------------------------
$(window).on('load', function(){
  setTimeout(function(){
    // 새로고침 시 window loading 후 기존 스크롤 탑 유지 (<head>에도 추가 / 스크롤 떨림 방지)
    if( window.performance.navigation.type === 1 ){
      $(window).on('scroll', function(){
        loading_sct = $(window).scrollTop();
        sessionStorage.setItem(loading_scroll_top, loading_sct);
      });
      _htmlBody.animate({'scrollTop':sessionStorage.getItem(loading_scroll_top)}, 0);

      setTimeout(function(){
        _sub_content.addClass('content_load');
        _ukFooter.addClass('content_load');
        _html.removeAttr('style');
      }, 100);
    }

    // front, back 버튼 또는 링크로 이동 시
    if( window.performance.navigation.type === 0 ){
      sessionStorage.setItem(loading_scroll_top, 0);
      _sub_content.addClass('content_load');
      _ukFooter.addClass('content_load');
    }
  }, 300);

  // 새로고침 시 document height, scrollTop 값 저장
  $(document).on('keydown', function(e){
    e.keyCode === 116 ? sessionStorage.setItem('html_height', $(document).height()) : false;
  });
  window.addEventListener('beforeunload', function(){
    sessionStorage.setItem('html_height', $(document).height());
    sessionStorage.setItem(loading_scroll_top, $(window).scrollTop());
  });

  // uk_gist_code_box 에러 발생시 다시 실행
  $('.uk_gist_code_box').each(function(i, e){
    if( !$(e).find('.uk_gist_content').is(':visible') ){
      console.log( 'uk_gist_code error !!!!!!!!!!' );
      uk_gist_code_layout();
      setTimeout(function(){
        uk_gist_skin_code();
        console.log( 'uk_gist_code error - solve a problem !!' );
      });
    }
  });

  // km_temp 컨텐츠 iframe resize
  uk_kmTemp_resize();


  $('.go_top button').css('opacity',1);
  $('.go_top button').on('click', function(){
    _htmlBody.stop().animate({scrollTop:0}, 800);
    return false;
  });
});


// side menu -----------------------------------------------------------------------------------------------------------
const tg_on = 'tg_on';
_side_menu_d3.each(function(i, e){
  if( _side_menu.is('.pub_side_nemu') ){
    if( $(e).children().length > 1 ){
      $(e).is('.active') ? $(e).addClass(tg_on) : false;
      $(e).addClass('toggle_box');
      $(e).find('> a').on('click', function(){
        $(this).parent().toggleClass(tg_on).siblings().removeClass(tg_on);
        $(this).next().slideToggle(200).parent().siblings().find('ul').slideUp(200);
        return false;
      });
    }
  }
});


// window scroll -------------------------------------------------------------------------------------------------------
let top_link_offset = _top_link.find('ul').offset().top - 1;
$(window).on('scroll', function(){
  let sct = $(window).scrollTop();
  hd_common(sct);

  // top_link 상단 고정(scroll top 값이 top_link 의 offset().top 보다 클 경우) (<head>에도 추가)
  sct > top_link_offset - _ukHeader.height() ?  _top_link.addClass('fixed') : _top_link.removeClass('fixed');

  // 로딩 상단 고정(scroll top 값이 sub_content 의 offset().top 보다 클 경우)
  sct > _sub_content.offset().top - _ukHeader.height() ? _sub_content.addClass('loading_fixed') : _sub_content.removeClass('loading_fixed') ;

  // side menu 타이틀 노출( side_close일 경우 ) (<head>에도 추가)
  let sub_top_offset = _sub_content.offset().top + Number(_sub_content.css('padding-top').replace('px','')) + $('#content_title').height()/2;
  sub_top_offset -= _ukHeader.height();
  sct > sub_top_offset ? _side_menu_area.addClass('title_show') : _side_menu_area.removeClass('title_show') ;
}).trigger('scroll');


// window resize -------------------------------------------------------------------------------------------------------
$(window).on('resize', function(){
  let win_w = $(window).width();
  let win_h = $(window).height();
  pc_mb_class(win_w);
  hd_layer_open_resize(win_w);

 if( win_w > md_size ){
   _side_menu.find('.depth4').removeAttr('style');
   if( _side_menu_d3.is('.active') ){
     _side_menu.find('.depth3 > li.active').addClass(tg_on);
   }
 }
 else{
   if( _side_menu_d3.is('.active') ){
     _side_menu_d3.removeClass(tg_on);
   }
 }

  // km_temp 컨텐츠 iframe resize
  uk_kmTemp_resize();
}).trigger('resize');


// detect --------------------------------------------------------------------------------------------------------------
_top_link.ukDetect({
  browser_check: true
});