
// side menu -----------------------------------------------------------------------------------------------------------
const _side_name = $('.side_menu');
const _side_menu_d3 = _side_name.find('.depth3 > li');
_side_menu_d3.each(function(i, e){
  const tg_on = 'tg_on';
  if( $(e).children().length > 1 ){
    $(e).addClass('toggle_box');
    $(e).find('> a').on('click', function(){
      $(this).parent().toggleClass(tg_on).siblings().removeClass(tg_on);
      $(this).next().slideToggle(200).parent().siblings().find('ul').slideUp(200);
      return false;
    });
  }
});