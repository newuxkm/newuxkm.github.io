
// side menu -----------------------------------------------------------------------------------------------------------
const _side_name = $('.side_menu');
const _side_menu_d3 = _side_name.find('.depth3 > li');
_side_menu_d3.each(function(i, e){
  if( _side_name.is('.pub_side_nemu') ){
    const tg_on = 'tg_on';
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




//scroll ---------------------------------------------------------------------------------------------------------------
$(window).on('scroll', function(){
  let sct = $(window).scrollTop();
  hd_common(sct);
}).trigger('scroll');