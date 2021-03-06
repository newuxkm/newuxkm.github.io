
// selector ------------------------------------------------------------------------------------------------------------
const _top_link = $('.top_link');
const _sub_content = $('.sub_content');
const _content_area = _sub_content.find('> .content_area');
const _side_menu_area = $('.side_menu_area');
const _side_toggle = _side_menu_area.find('.side_menu_toggle');
const _side_menu = $('.side_menu');
const _side_menu_d3 = _side_menu.find('.depth3 > li');
const kmtemp_resize_iframe = 'kmtemp_resize_iframe';
const tab_menu = 'tab_menu';

const _content_bottom = $('.content_bottom');
const _go_top_btn = _content_bottom.find('.go_top_btn');
const _con_lst_btn = _content_bottom.find('.con_lst_btn');
const content_list = 'content_list';
const content_list_close = 'content_list_close';
const list_title = 'list_title';
const list_active = 'list_active';
const data_title_num = 'data-title-num';
let content_list_empty = 50;
const cl_d1 = 'cl_d1';
const cl_d2 = 'cl_d2';
const cl_d3 = 'cl_d3';
let list_moving = false;
let con_tit_offsetTop = 0;
let list_offset_top = [];

const loading_scroll_top = 'loading_scroll_top';
const go_top_size = 200;
let loading_sct = null;


function content_list_offset(){
  if( _con_lst_btn.is(':visible') ){
    let header_height = _ukHeader.height();
    let win_width = $(window).width();
    if( win_width < screen_md_max ) content_list_empty = 40;
    if( win_width < screen_sm_max ) content_list_empty = 65;

    // h2, h3, h4 offset top
    const minus_height = header_height + content_list_empty;
    list_offset_top = [];
    _content_area.find('['+data_title_num+']').each(function(i, e){
      let offset_top = $(e).offset().top - minus_height;
      if( $(e).is('.sound_only') ) offset_top = $(e).parent().offset().top - minus_height
      list_offset_top.push( Math.ceil(offset_top) );
    });

    // h1 offset top
    let subCon_offsetTop = _sub_content.offset().top;
    con_tit_offsetTop = 0;
    if( win_width >= screen_md_max ) con_tit_offsetTop = subCon_offsetTop - header_height;
    // md-max
    if( win_width < screen_md_max ) con_tit_offsetTop = subCon_offsetTop - minus_height + 20;
    // sm-max
    if( win_width < screen_sm_max ) con_tit_offsetTop = subCon_offsetTop - header_height;
  }
}
function content_list_active(sct){
  if( _con_lst_btn.is(':visible') ){
    const _title_target = _content_area.find('['+data_title_num+']');
    const _target_length = _title_target.length-1;
    _title_target.each(function(i, e){
      if( !list_moving ){
        // h2, h3, h4 active
        if( sct >= list_offset_top[i] ){
          $('.'+content_list).find('[data-title-num]').removeClass('active').eq(i).addClass('active');
          $('.'+list_title+' a').removeClass('active');

          // ????????? ???????????? height?????? ?????? ?????? scroll top??? max?????? ????????? title active
          if( Math.ceil(sct + _window.height()) >= _document.height() ){
            $('.'+content_list).find('[data-title-num]').removeClass('active');
            $('.'+content_list).find('[data-title-num]').eq(_target_length).addClass('active');
          }
        }

        // h1 active
        //if( sct >= con_tit_offsetTop || sct < list_offset_top[0] ){
        if( sct >= con_tit_offsetTop && sct < list_offset_top[0] ){
          $('.'+content_list).find('[data-title-num]').removeClass('active');
          $('.'+list_title+' a').addClass('active');
        }
        if( sct < con_tit_offsetTop ){
          $('.'+list_title+' a').removeClass('active');
        }
      }
    });
  }
}


// document ready ------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  header_common();
  ukEditor_txtarea();
  uk_editor();
  uk_gist_skin_code();
  focus_controll();

  // side menu toggle
  const sideToggle = 'sideToggle';
  const side_close = 'side_close';
  _side_toggle.on('click', function(){
    const _this = $(this);
    
    // ??????
    if( !_this.is('.active') ){
      _this.addClass('active').attr('title','????????? ?????? ??????').parent().addClass(side_close);
      _this.find('b').text('OPEN');
      _html.addClass('side_close');
      sessionStorage.setItem(sideToggle, true);
    }
    // ??????
    else{
      _this.removeClass('active').attr('title','????????? ?????? ??????').parent().removeClass(side_close);
      _this.find('b').text('CLOSE');
      _html.removeClass('side_close');
      sessionStorage.clear(sideToggle);
    }
    return false;
  });

  // sessionStorage ??? sideToggle ??? true ?????? ????????? side menu ?????? (<head>??? ??????)
});


// window load ---------------------------------------------------------------------------------------------------------
$(window).on('load', function(){
  setTimeout(function(){
    // ???????????? ??? window loading ??? ?????? ????????? ??? ?????? (<head>?????? ?????? / ????????? ?????? ??????)
    if( window.performance.navigation.type === 1 ){
      $(window).on('scroll', function(){
        loading_sct = $(window).scrollTop();
        sessionStorage.setItem(loading_scroll_top, loading_sct);
      });
      _htmlBody.animate({'scrollTop':sessionStorage.getItem(loading_scroll_top)}, 0);
      _html.removeAttr('style');
    }

    // front, back ?????? ?????? ????????? ?????? ???
    if( window.performance.navigation.type === 0 ){
      sessionStorage.setItem(loading_scroll_top, 0);
    }
  }, 300);

  // ???????????? ??? document height, scrollTop ??? ??????
  $(document).on('keydown', function(e){
    e.keyCode === 116 ? sessionStorage.setItem('html_height', $(document).height()) : false;
  });
  window.addEventListener('beforeunload', function(){
    sessionStorage.setItem('html_height', $(document).height());
    sessionStorage.setItem(loading_scroll_top, $(window).scrollTop());
  });

  // uk_gist_code_box ?????? ????????? ?????? ??????
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

  // km_temp ????????? iframe resize
  uk_kmTemp_resize();

  // go top
  $(window).scrollTop() > go_top_size ? _go_top_btn.css('opacity',1) : false;
  _go_top_btn.on('click', function(){
    _htmlBody.stop().animate({scrollTop:0}, 600, 'easeInOutCubic');
    return false;
  });

  // ?????? ???????????? 5??? ??????????????? ????????? ?????? (part menu)
  if( $('.'+tab_menu+' li').length > 5 ){
    $('.'+tab_menu).addClass('two_line_tab');
  }

  // content list ?????? ??? ?????? ??? ??????
  if( !_body.is('.content_lst_none') ){
    _content_bottom.addClass('list_show');
    const content_section = _content_area.children('section, article');
    const prefix_tit = 'title_';

    _content_bottom.append('<nav class="'+content_list+'"><ul class="'+cl_d1+'"></ul></nav>');
    const _content_list = $('.'+content_list+' ul');
    //const h1_txt = _content_title.html().split('<em')[0];
    const h1_txt = _content_title.text().replace('- by. UXKM','').replace(/\t/gi,'').replace(/\n/g,'');
    const h1_num = _content_title.attr('data-number');
    _content_list.before('<strong class="'+list_title+'"><a href="#">'+ h1_num+h1_txt +'</a></strong>');
    $('.'+content_list).append('<button type="button" class="'+content_list_close+'"><i>?????? ??????</i></button>');
    $('.'+list_title).find('span').removeAttr('class');

    // h2 ?????? ---------------------------------------------------------------------------------------------------------
    content_section.each(function(i, e){
      const h2_target = $(e).find('>h2');
      const h2_txt = h2_target.text().replace(/</g,"&lt;").replace(/>/g,"&gt;");
      const tit_number = prefix_tit+(i+1);
      h2_target.attr(data_title_num, tit_number);
      _content_list.append('<li><a href="#" '+data_title_num+'="'+tit_number+'">'+h2_txt+'</a></li>');

      // h3 ?????? -------------------------------------------------------------------------------------------------------
      if( $(e).find('h3').is(':visible') && $(e).attr('data-conlist') !== 'false' ){
        _content_list.find('> li').eq(i).append('<ul class="'+cl_d2+'"></ul>');
        $(e).find('h3').each(function(j, k){
          const h3_target = $(k);
          let h3_text_custom;

          if( h3_target.html().split('<')[0] !== '' ) h3_text_custom = h3_target.html().split('<')[0];
          else h3_text_custom = h3_target.text();

          const h3_txt = h3_text_custom.replace(/</g,"&lt;").replace(/>/g,"&gt;");
          const tit_number = prefix_tit+(i+1)+'_'+(j+1);
          h3_target.attr(data_title_num, tit_number);
          _content_list.find('> li').eq(i).find('.'+cl_d2).append('<li><a href="#" '+data_title_num+'="'+tit_number+'">'+h3_txt+'</a></li>');

          // h4 ?????? ---------------------------------------------------------------------------------------------------
          if( $(k).attr('data-conlist-h4') === 'true' ){
            _content_list.find('> li').eq(i).find('.'+cl_d2+' > li').eq(j).append('<ul class="'+cl_d3+'"></ul>');
            $(k).nextAll().find('h4').each(function(a, b){
              const h4_target = $(b);
              let h4_text_custom;

              if( h4_target.text().split(':')[0] !== '' ) h4_text_custom = h4_target.text().split(':')[0];
              else h4_text_custom = h4_target.text();

              const h4_txt = h4_text_custom.replace(/</g,"&lt;").replace(/>/g,"&gt;");
              const tit_number = prefix_tit+(i+1)+'_'+(j+1)+'_'+(a+1);
              h4_target.attr(data_title_num, tit_number);
              _content_list.find('> li').eq(i).find('.'+cl_d2+' > li').eq(j).find('.'+cl_d3).append('<li><a href="#" '+data_title_num+'="'+tit_number+'">'+h4_txt+'</a></li>');
            });
          }
        });
      }
    });

    // ????????? ??????
    _con_lst_btn.on('click', function(){
      _content_bottom.addClass(list_active);
      return false;
    });

    // ????????? ??????
    $('.'+content_list_close).on('click', function(){
      _content_bottom.removeClass(list_active);
      return false;
    });
    
    // ????????? ??????
    const sct = $(window).scrollTop();
    const list_moving_speed = 400;
    const list_moving_effect = 'easeInOutCubic';
    let list_moving_timeout;
    content_list_offset();
    content_list_active(sct);
    $('.'+content_list+' .'+cl_d1).find('a').each(function(i, e){
      $(e).on('click', function(){
        list_moving = true;
        clearTimeout(list_moving_timeout);

        _htmlBody.stop().animate({scrollTop:list_offset_top[i]}, list_moving_speed, list_moving_effect);
        $('.'+content_list+' .'+cl_d1).find('a').removeClass('active');
        $('.'+list_title+' a').removeClass('active');
        $(e).addClass('active');

        list_moving_timeout = setTimeout(function(){
          list_moving = false;
        }, list_moving_speed + 100);
        return false;
      });
    });
    $('.'+list_title+' a').on('click', function(){
      list_moving = true;
      clearTimeout(list_moving_timeout);

      _htmlBody.stop().animate({scrollTop:con_tit_offsetTop}, list_moving_speed, list_moving_effect);
      $('.'+content_list+' .'+cl_d1).find('a').removeClass('active');
      $('.'+list_title+' a').addClass('active')

      list_moving_timeout = setTimeout(function(){
        list_moving = false;
      }, list_moving_speed + 100);
      return false;
    });
  }
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
$(window).on('scroll', function(){
  let sct = $(window).scrollTop();
  hd_common(sct);
  content_list_active(sct);

  // top_link ?????? ??????(scroll top ?????? top_link ??? offset().top ?????? ??? ??????) (<head>?????? ??????)
  if( _top_link.is(':visible') ){
    let top_link_offset = _top_link.find('ul').offset().top - 1;
    sct > top_link_offset - _ukHeader.height() ?  _top_link.addClass('fixed') : _top_link.removeClass('fixed');
  }

  // side menu ????????? ??????( side_close??? ?????? ) (<head>?????? ??????)
  if( _side_menu_area.is(':visible') ){
    let sub_top_offset = _sub_content.offset().top + Number(_sub_content.css('padding-top').replace('px','')) + $('#content_title').height()/2;
    sub_top_offset -= _ukHeader.height();
    sct > sub_top_offset ? _side_menu_area.addClass('title_show') : _side_menu_area.removeClass('title_show') ;
  }

  // go top ?????? ??????
  sct > go_top_size ? _go_top_btn.css('opacity',1) : _go_top_btn.css('opacity',0);
}).trigger('scroll');


// window resize -------------------------------------------------------------------------------------------------------
$(window).on('resize', function(){
  let win_w = $(window).width();
  let win_h = $(window).height();
  pc_mb_class(win_w);
  content_list_offset();
  hd_layer_open_resize(win_w);

 if( win_w > screen_md_max ){
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

  // km_temp ????????? iframe resize
  uk_kmTemp_resize();
}).trigger('resize');


// detect --------------------------------------------------------------------------------------------------------------
_top_link.ukDetect({
  browser_check: true
});
const _update_header = $('.update_header');
if( _update_header.is(':visible') ){
  _update_header.ukDetect({
    all_check: false,
    device_check: true,
    browser_check: true,
  });
}







