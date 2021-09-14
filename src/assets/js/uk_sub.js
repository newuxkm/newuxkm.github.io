
// selector ------------------------------------------------------------------------------------------------------------
const _top_link = $('.top_link');
const _side_name = $('.side_menu');
const _side_menu_d3 = _side_name.find('.depth3 > li');


// document ready ------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  header_common();
  ukEditor_txtarea();
  uk_editor();
  uk_gist_skin_code();
  focus_controll();
});


// window load ---------------------------------------------------------------------------------------------------------
$(window).on('load', function(){
  setTimeout(function(){
  }, 500);
});


// side menu -----------------------------------------------------------------------------------------------------------
const tg_on = 'tg_on';
_side_menu_d3.each(function(i, e){
  if( _side_name.is('.pub_side_nemu') ){
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

  sct > top_link_offset - _ukHeader.height() ?  _top_link.addClass('fixed') : _top_link.removeClass('fixed');
}).trigger('scroll');


// window resize -------------------------------------------------------------------------------------------------------
$(window).on('resize', function(){
  let win_w = $(window).width();
  let win_h = $(window).height();
  pc_mb_class(win_w);
  hd_layer_open_resize(win_w);

 if( win_w > md_size ){
   _side_name.find('.depth4').removeAttr('style');
   if( _side_menu_d3.is('.active') ){
     _side_name.find('.depth3 > li.active').addClass(tg_on);
   }
 }
 else{
   if( _side_menu_d3.is('.active') ){
     _side_menu_d3.removeClass(tg_on);
   }
 }
}).trigger('resize');


// detect --------------------------------------------------------------------------------------------------------------
_top_link.ukDetect({
  browser_check: true
});