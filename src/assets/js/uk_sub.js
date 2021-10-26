
// selector ------------------------------------------------------------------------------------------------------------
const _top_link = $('.top_link');
const _sub_content = $('.sub_content');
const _content_area = _sub_content.find('> .content_area');
const _side_menu_area = $('.side_menu_area');
const _side_toggle = _side_menu_area.find('.side_menu_toggle');
const _side_menu = $('.side_menu');
const _side_menu_d3 = _side_menu.find('.depth3 > li');
const kmtemp_resize_iframe = 'kmtemp_resize_iframe';
const _content_bottom_btn = $('.content_bottom_btn');
const _go_top_btn = _content_bottom_btn.find('.go_top_btn');
const _con_lst_btn = _content_bottom_btn.find('.con_lst_btn');
const tab_menu = 'tab_menu';

const loading_scroll_top = 'loading_scroll_top';
let loading_sct = null;
const go_top_size = 200;


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

  // go top
  $(window).scrollTop() > go_top_size ? _go_top_btn.css('opacity',1) : false;
  _go_top_btn.on('click', function(){
    _htmlBody.stop().animate({scrollTop:0}, 800, 'easeInOutCubic');
    return false;
  });

  // 서브 텝메뉴가 5개 이상이경우 클래스 부여 (part menu)
  if( $('.'+tab_menu+' li').length > 5 ){
    $('.'+tab_menu).addClass('two_line_tab');
  }

  // content list 생성 및 클릭 시 이동
  const content_section = _content_area.children('section, article');
  if( !_body.is('.content_lst_none') ){
    _content_bottom_btn.addClass('list_show');

    const data_title_num = 'data-title-num';
    const content_list = 'content_list';
    _content_bottom_btn.append('<nav class="'+content_list+'"><ul class="cl_d1"></ul></nav>');
    const _content_list = $('.'+content_list+' ul');
    _content_list.before('<a href="#">'+ $('#content_title').text().replace('- by. UXKM','')+ '</a>');

    // h2 생성
    content_section.each(function(i, e){
      const h2_target = $(e).find('>h2');
      const h2_txt = h2_target.text().replace(/</g,"&lt;").replace(/>/g,"&gt;");
      const tit_number = 'title_'+(i+1);
      h2_target.attr(data_title_num, tit_number);
      _content_list.append('<li><a href="#" '+data_title_num+'="'+tit_number+'">'+h2_txt+'</a></li>');

      // h3 생성
      const data_conlist = $(e).attr('data-conlist');
      if( $(e).find('h3').is(':visible') && data_conlist !== 'false' ){
        _content_list.find('> li').eq(i).append('<ul class="cl_d2"></ul>');
        $(e).find('h3').each(function(j, k){
          const h3_target = $(k);
          let h3_text_append;

          if( h3_target.html().split('<')[0] !== '' ) h3_text_append = h3_target.html().split('<')[0];
          else h3_text_append = h3_target.text();

          const h3_txt = h3_text_append.replace(/</g,"&lt;").replace(/>/g,"&gt;");
          const tit_number = 'title_'+(i+1)+'_'+(j+1);
          h3_target.attr(data_title_num, tit_number);
          _content_list.find('> li').eq(i).find('.cl_d2').append('<li><a href="#" '+data_title_num+'="'+tit_number+'">'+h3_txt+'</a></li>');

          // h4 생성
          _content_list.find('> li').eq(i).find('.cl_d2 > li').eq(j).append('<ul class="cl_d3"></ul>');
          if( $(k).attr('data-conlist-h4') === 'true' ){
            $(k).nextAll().find('h4').each(function(a, b){

              const h4_target = $(b);
              let h4_text_append;

              if( h4_target.text().split(':')[0] !== '' ) h4_text_append = h4_target.text().split(':')[0];
              else h4_text_append = h4_target.text();

              const h4_txt = h4_text_append.replace(/</g,"&lt;").replace(/>/g,"&gt;");
              const tit_number = 'title_'+(i+1)+'_'+(j+1)+'_'+(a+1);
              h4_target.attr(data_title_num, tit_number);
              _content_list.find('> li').eq(i).find('.cl_d2 > li').eq(j).find('.cl_d3').append('<li><a href="#" '+data_title_num+'="'+tit_number+'">'+h4_txt+'</a></li>');

              console.log(h4_txt);
            });
          }
        });
      }
    });

    // 리스트 토글
    _con_lst_btn.on('click', function(){});
    
    // 컨텐츠 이동
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

  // go top 버튼 노출
  sct > go_top_size ? _go_top_btn.css('opacity',1) : _go_top_btn.css('opacity',0);
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