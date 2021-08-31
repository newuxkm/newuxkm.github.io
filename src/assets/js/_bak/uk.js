import { random } from './_util';
import './uk_main';

const rOne = random(10);
const rTwo = random(20);

console.log( rOne, rTwo );


// 임시 스크립트 -------------------------------------------------------------------------------------------------------
$('.assetsLink_btn').click(function(){
  //열기
  if( !$(this).is('.active') ){
    $(this).addClass('active').removeClass('after');
    // $html.css('overflow','hidden').addClass(hd_assetsLink_on+' '+sub_black);
    // $assetsLink_area.trigger('focus').removeClass(hash_move);
    // offsetTopControl();
    //
    // setTimeout(function(){
    //   al_depth1.find('> li').each(function(i, e){
    //     $(e).find('.al_depth2').masonry('layout');
    //   });
    // }, loadingEndTime);
  }
  //닫기
  else if( $(this).is('.active') ){
    $(this).removeClass('active').addClass('after');
    // $html.removeAttr('style').removeClass(hd_assetsLink_on);
    // setTimeout(function(){
    //   $html.removeClass(sub_black);
    // }, 300);
    // setTimeout(function(){
    //   $('.'+top_link+' ul').removeClass(opacity_on).removeAttr('style');
    //   $('.'+side_menu).removeClass(opacity_on).removeAttr('style');
    //   $(window).trigger('scroll');
    // }, 600);
  }
  return false;
});

