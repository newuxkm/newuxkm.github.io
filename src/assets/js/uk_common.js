
// variable ------------------------------------------------------------------------------------------------------------
const scroll_width = window.innerWidth - $(window).width();
const screen_lg_max = 1201 - scroll_width;
const screen_md_max = 993 - scroll_width;
const screen_sm_max = 767 - scroll_width;

// selector ------------------------------------------------------------------------------------------------------------
const _window = $(window);
const _document = $(document);
const _html = $('html');
const _body = $('body');
const _htmlBody = $('html, body');
const _ukWrap = $('.uk_wrap');
const _ukSkip = $('.uk_skip');

// header selector
const _ukHeader = $('.uk_header');
const _ukNavArea = _ukHeader.find('.hd_nav_area');
const _ukNav = _ukNavArea.find('.nav');
const search_btn = 'search_btn';
const sitemap_btn = 'sitemap_btn';
const search_close = 'search_close';
const _hd_layer_btn = _ukHeader.find('.ly_btn');
const _search_btn = _ukNavArea.find('.'+search_btn);
const _search_close = _ukNavArea.find('.'+search_close);
const _search_area = _ukNavArea.find('.search_area');
const _search_submit = _ukNavArea.find('.search_submit');
const _sitemap_btn = _ukNavArea.find('.'+sitemap_btn);
const _sitemap_area = _ukNavArea.find('.sitemap_area');
const _sitemap_type_btn = _sitemap_area.find('.map_type button');
const _sitemap_in = _sitemap_area.find('.sitemap_in');

// footer selector
const _ukFooter = $('.uk_footer');

// container selector
const _ukContainer = $('.uk_container');
const _ukContent = $('#content');
const _ukSubContent = $('.sub_content');
const _content_title = $('#content_title');
const _topLink = $('.top_link');

const ukEditor = 'uk_editor';
const result_wrap = 'result_wrap';
const browserTitle = 'browserTitle';
const focus_el = 'a, button, input, select, textarea, #content_title';

// class name
const hd_progress = 'hd_progress';
const hd_layer_open = 'hd_layer_open';

// variable
let scrollbar_size = 0;
let is_main = _html.is('.main_page');
let is_sub = _html.is('.sub_page');
let active_number = _ukWrap.attr('data-active') ? _ukWrap.attr('data-active').split('/') : false;


// functions -----------------------------------------------------------------------------------------------------------

// header common
function header_common(){
  _ukHeader.ukDetect({
    device_check:true,
    all_check:false
  });

  // site map & search open/close
  _hd_layer_btn.on('click', function(){
    const target_name = $(this).attr('data-modal-button');

    // open ---------------------------
    if( !$(this).is('.active') ){
      $(this).addClass('active').removeClass('after');

      // scroll controll
      let win_w = $(window).width();
      _html.css('overflow','hidden').addClass(hd_layer_open);
      _ukWrap.width(win_w);
      _ukHeader.width(win_w);
      scrollbar_size = _window.width() - _ukWrap.width();

      // layer target
      $('[data-modal-layer="'+target_name+'"]').addClass('active');

      // search open
      if( $(this).is('.'+search_btn) ){
        _sitemap_btn.addClass('active').removeClass('after');
      }

      // sitemap open
      if( $(this).is('.'+sitemap_btn) ){
        if( is_main ){
          _sitemap_in.find('.depth1 > li').eq(0).addClass('active').siblings().removeClass('active');
          _sitemap_in.find('.depth2 > li').eq(0).addClass('active').siblings().removeClass('active');
        }
        if( is_sub ){
          _sitemap_in.find('.depth1 > li').eq(active_number[0]).addClass('active').siblings().removeClass('active');
          _sitemap_in.find('.depth2 > li').eq(active_number[1]).addClass('active').siblings().removeClass('active');
        }
      }
    }

    // close --------------------------
    else if( $(this).is('.active') ){
      $(this).removeClass('active').addClass('after');

      // layer target
      $('[data-modal-layer="'+target_name+'"]').removeClass('active');

      // scroll controll
      layer_close_scroll();
    }

    return false;
  });
  _search_close.on('click', function(){
    _search_btn.removeClass('active').addClass('after');
    _sitemap_btn.removeClass('active').addClass('after');
    _search_area.removeClass('active');

    // scroll controll
    layer_close_scroll();

    return false;
  });

  // site map view type
  _sitemap_type_btn.on('click', function(){
    let type = $(this).attr('data-txt');
    $(this).addClass('active').siblings().removeClass('active');
    _sitemap_in.attr('data-type', type);
  });

  // site map tab view
  let is_type_tab = _sitemap_in.attr('data-type') === 'type_tab';
  _sitemap_in.find('.depth1 > li > a, .depth2 > li > a').on('click focus', function(){
    if( is_type_tab ){
      $(this).parent().addClass('active').siblings().removeClass('active');

      if( $(this).parent().parent().parent().index() === 2 ){
        _sitemap_in.find('.depth1 > li').eq(2).addClass('active').siblings().removeClass('active');
      }

      // depth1 click, focus
      if( $(this).next().is('.depth2') ){
        const next_li = $(this).next().find('> li');
        if( !next_li.is('.active') ) next_li.eq(0).addClass('active');
      }

      if( $(this).parents('.depth2').parent().index() !== 2 ){
        return false;
      }
    }
  });
  _sitemap_in.find('.depth1 > li > a, .depth2 > li > a').on('keydown', function(e){
    if( is_type_tab & e.keyCode == 9 && e.shiftKey ){
      const _prev_el = $(this).parent().prev();
      if( _prev_el.is(':visible') ){
        _prev_el.addClass('active').siblings().removeClass('active');
        _prev_el.find('> ul > li').last().addClass('active').siblings().removeClass('active');
      }
    }
  });
}
function layer_close_scroll(){
  _html.removeAttr('style').removeClass(hd_layer_open);
  _ukWrap.removeAttr('style');
  _ukHeader.removeAttr('style');
  scrollbar_size = 0;
}

// hd_layer_open resize (site map & search open/close ??? ??????)
function hd_layer_open_resize(win_w){
  if( _html.is('.'+hd_layer_open) ){
    _ukWrap.width( win_w - scrollbar_size );
    _ukHeader.width( win_w - scrollbar_size );
  }
}

// focus controll
function focus_controll(){
  const layer_tit = '.tit strong';

  // focus ?????? ?????????/????????? ??????
  let focus_direction = null;
  $(document).on('keydown', function(e){
    // focus ?????????
    if( e.keyCode == 9 && !e.shiftKey ){
      focus_direction = true;
    }
    // focus ?????????
    else if( e.keyCode == 9 && e.shiftKey ){
      focus_direction = false;
    }

    // esc ???????????? ?????? ??????
    if( e.keyCode == 27 ){
      if( _html.is('.'+hd_layer_open) ){
        // search ??????
        if( _search_btn.is('.active') ){
          console.log('search');
          _search_btn.removeClass('active').addClass('after').trigger('focus');
          _sitemap_btn.removeClass('active').addClass('after');
          _search_area.removeClass('active');
          layer_close_scroll();
        }
        // site map ??????
        if( _sitemap_btn.is('.active') ){
          console.log('sitemap');
          _sitemap_btn.removeClass('active').addClass('after').trigger('focus');
          _sitemap_area.removeClass('active');
          layer_close_scroll();
        }
      }
    }
  });

  // main h1 focus ----------------------------
  //const _content_h1 = _ukContent.find('h1');
  $(document).on({
    keydown:function(){
      if( is_sub ){
        _content_title.attr('tabindex','0');
      }
    }
  });
  _content_title.on('focus', function(){
    setTimeout(function(){
      if( _ukSubContent.is(':visible') ){
        $(window).scrollTop( _ukSubContent.offset().top - _ukHeader.height() );
      }
    }, 10);
  });
  _content_title.on('mousedown', function(){
    if( is_sub && _content_title.attr('tabindex') === '0' ){
      _content_title.removeAttr('tabindex');
    }
  });

  // header search focus ----------------------
  _search_btn.on({
    blur:function(){
      // search ????????? ???????????? ??? ?????? ??? site map ???????????? ????????? ??????
      if( focus_direction && !$(this).is('.active') ){
        _sitemap_btn.trigger('focus');
      }
    },
    click:function(){
      // search ?????? ?????? ??? ????????? ???????????? ?????????
      _search_area.find(layer_tit).attr('tabindex','0').trigger('focus');
    }
  });
  _search_area.find(layer_tit).on('blur', function(){
    // search ????????? ???????????? ????????? ??????????????? ?????? ?????? ??? ?????? ???????????? ????????? ??????
    if( !focus_direction && _search_btn.is('.active') ){
      _search_close.trigger('focus');
    }
  });
  _search_close.on({
    blur:function(){
      if( _search_btn.is('.active') ){
        // search ????????? ???????????? ?????? ???????????? ??? ?????? ??? ????????? ???????????? ????????? ??????
        if( focus_direction ){
          _search_area.find(layer_tit).trigger('focus');
        }
        // search ????????? ???????????? ?????? ???????????? ?????? ?????? ??? ????????? ?????? ?????? ??? ????????? ????????? ????????? ??????
        else if( !focus_direction ){
          _search_area.find(focus_el).last().trigger('focus');
        }
      }
    },
    click:function(){
      _search_area.find(layer_tit).removeAttr('tabindex');
      _search_btn.trigger('focus');
    }
  });

  // header site map focus --------------------
  _sitemap_btn.on({
    blur:function(){
      // site map ????????? ???????????? ??? ?????? ??? container??? ????????? ?????? ??? ????????? ????????? ????????? ??????
      if( focus_direction && !$(this).is('.active') ){
        _ukContainer.find(focus_el).first().trigger('focus');
      }
      if( !focus_direction ){
        // site map ????????? ???????????? ?????? ?????? ??? search ???????????? ????????? ??????
        if( !$(this).is('.active') ){
          _search_btn.trigger('focus');
        }
        // site map ?????? ???????????? ?????? ?????? ??? site map??? ????????? ?????? ??? ????????? ????????? ????????? ??????
        else{
          _sitemap_area.find(focus_el).last().trigger('focus');
        }
      }

      /*
      if( !$(this).is('.active') ){
        if( focus_direction ){
          _ukContainer.find(focus_el).first().trigger('focus');
        }
        else if( !focus_direction ){
          _search_btn.trigger('focus');
        }
      }
      else if( $(this).is('.active') ){
        if( !focus_direction ){
          _sitemap_area.find(focus_el).last().trigger('focus');
        }
      }
      */
    },
    click:function(){
      focus_direction = true;
      // site map ????????? ??? ??? ?????? ?????? ??? ????????? ???????????? ?????????
      if( $(this).is('.active') ){
        _sitemap_area.find(layer_tit).attr('tabindex','0').trigger('focus');
      }
      if( !$(this).is('.active') ){
        // site map ?????? ??? ??? ?????? ?????? ????????? ?????????
        _sitemap_area.find(layer_tit).removeAttr('tabindex');
        $(this).trigger('focus');
      }
    }
  });
  _sitemap_area.find(focus_el).last().on('blur', function(){
    // site map??? ????????? ????????? ???????????? ??? ?????? ??? site map ???????????? ????????? ??????
    if( focus_direction ){
      _sitemap_btn.trigger('focus');
    }
  });

  // container first focus el -----------------
  _ukContainer.find(focus_el).first().on('blur', function(){
    // container??? ????????? ?????? ??? ????????? ???????????? ?????? ?????? ??? site map ???????????? ????????? ??????
    if( !focus_direction ){
      _sitemap_btn.trigger('focus');
    }
  });

  // focus ?????? text ??????
  $('*').focus(function(){
    //console.log( $(this).text() );
  });
}

// uk editor
function ukEditor_txtarea(){
  $('.'+ukEditor).each(function(i, e){
		const target = $(e).parent().attr('data-target');
    const txtarea = $(e).find('textarea');
		txtarea.val('');
		if( target !== 'none' || target !== 'false' || target !== '' ){
			$.get('/_code_samples/'+target, function(content){
				txtarea.val(content);
			});
		}

    // editor focus controll
    let editor_focus_move = null;
    $(e).on('keydown', function(e){
      if( e.keyCode == 9 && !e.shiftKey ){
        editor_focus_move = true;
        //console.log(editor_focus_move, '?????????');
      }
      if( e.keyCode == 9 && e.shiftKey ){
        editor_focus_move = false;
        //console.log(editor_focus_move, '?????????');
      }
    });
    $(e).on('blur', function(){
      setTimeout(function(){
        if( editor_focus_move ){
          $(e).find('.'+browserTitle).trigger('focus');
        }
      }, 10);
    });

    setTimeout(function(){
      let focus_el_length = $(e).find('.'+result_wrap+' iframe').contents().find(focus_el).length;
      if( focus_el_length > 0 ){
        $(e).find('.'+result_wrap+' iframe').removeAttr('tabindex');
      }

      $(e).find('.'+browserTitle).each(function(j, k){
        $(k).on('blur', function(){
          setTimeout(function(){
            if( !editor_focus_move ){
              $(e).trigger('focus');
            }
          }, 10);
        });
      });
    }, 1000);
	});
}

// uk gist code box
function uk_gist_skin_code(){
  const app_speed = 0;
  const uk_gist_code_box = 'uk_gist_code_box';
  const uk_gist_content = 'uk_gist_content';
  const uk_gist_code_pre = 'uk_gist_code_pre';
  const uk_gist_code_wrap = 'uk_gist_code_wrap';
  const uk_gist_code_line = 'uk_gist_code_line';
  const uk_gist_footer = 'uk_gist_footer';
  const not_ko = /[a-z0-9]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  const not_hashTags = /[a-z0-9]|[???-???|???-???|???-???]|[\[\]{}()<>?|`~!@$%^&*-_+=,.;:\"'\\]/g;
  const ko_check = /[???-???|???-???|???-???]/;
  const code_tab_size = '  ';

  // ?????? ????????? ?????? <head>??? ??????
  /*$('.'+uk_gist_code_box).each(function(i, e){
    const str = $(e).find('textarea').val()
    .replace(/</g,"&lt;")                                                 // '<' ??????
    .replace(/>/g,"&gt;")                                                 // '>' ??????
    .replace(/\"/g,"<span class='uk_color_quot'>&quot;</span>")                // ???????????? ??????
    .replace(/\'/g,"&#39;")                                               // ??????????????? ??????
    //.replaceAll("____error__","<span class='uk_color_error'>")          // error?????? ?????? ??????
    //.replaceAll("__error____","</span>")                                // error?????? ?????? ??????
    .replace(/____error__/g,"<span class='uk_color_error'>")              // error?????? ?????? ??????
    .replace(/__error____/g,"</span>")                                    // error?????? ?????? ??????
    .replace(/--add--/g,"<span class='uk_color_add'>[-- ????????? ?????? --]</span>")     // --add--?????? ??????
    .replace(/--add_start--/g,"<span class='uk_color_add'>[-- ????????? ?????? {{ --]</span>")     // --add--?????? ??????
    .replace(/--add_end--/g,"<span class='uk_color_add'>[-- }} ????????? ?????? --]</span>")     // --add--?????? ??????
    .replace(/--edit--/g,"<span class='uk_color_edit'>[-- ????????? ?????? --]</span>")   // --edit--?????? ??????
    .replace(/--del--/g,"<span class='uk_color_edit'>[-- ????????? ?????? --]</span>")   // --edit--?????? ??????
    .replace(/--no_change--/g,"<span class='uk_color_nn'>[-- ?????? ?????? --]</span>")   // --edit--?????? ??????
    .replace(/\t/gi, code_tab_size);                                      // tab????????? ????????????(4???)??? ??????

    //----------------------------------------------------------------------------------------

    //????????? ????????? ???????????? ??????
    const line = str.split('\n');
    const lineLength = line.length - 1;

    //?????? ????????? ?????? ?????? ???????????? tab ?????? ??????
    const line_tab_split = line[0].trim().split('')[0];
    const line_tab_size = line[0].split(line_tab_split)[0];

    //----------------------------------------------------------------------------------------

    //????????? ??? ?????? ??????
    let str_content = '';
    let ex_line_color = '';
    let tab_count;
    let tab_count_css = '';
    const ex_line = '__ex_line__';
    for( i=0; i<lineLength; i++ ){
      //?????? ????????? ?????? ?????? ???????????? tab ?????? ??????
      if( line[i].match(line_tab_size) ){
        line[i] = line[i].replace(line_tab_size, '');
      }

      //?????? ????????? ?????? //ex_line
      if( line[i].match(ex_line) ){
        ex_line_color = line[i].split(' ')[0].split('__')[2];
        line[i] = line[i].replace(ex_line + ex_line_color + '__ ', '');
        line[i] = '<b class="uk_ex_line" style="color:'+ex_line_color+'">'+line[i]+'</b>';
      }

      //????????? ?????? ?????????
      let each_ko;
      if( line[i].match(ko_check) ){
        each_ko = line[i].replace(not_ko, '').split(' ').filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        $.each(each_ko, function(){
          line[i] = line[i].replace(this, '<span class="uk_leng_ko">'+this+'</span>')
        });
      }

      //???????????? ?????? ??????
      if( line[i] === '' ){
        str_content += '<span class="'+uk_gist_code_line+'">' + line[i] + '</span>\n';
      }
      //???????????? ?????? ?????? [ uk_gist_code_line class ?????? / doctype line ?????? / tab line ?????? ]
      else {
        //tab line ??????
        const each_tab_split = line[i].trim().split('')[0];
        const each_tab_size = line[i].split(each_tab_split)[0];
        tab_count = each_tab_size.split(code_tab_size).length - 1;

        let tab_indent = "";
        let tab_indent_line = "";
        if( tab_count > 0 && each_tab_size.match(code_tab_size) ){
          for( j=0; j<tab_count; j++ ){
            //tab_indent += '<span class="tab_indent tab_indent_'+(j+1)+'">'+ code_tab_size +'</span>';
            //tab_indent += '<span class="tab_indent tab_indent_'+(j+1)+'" data-tab="'+tab_size+'"></span>';
            tab_indent += '<span class="tab_indent" data-tab="'+code_tab_size+'"></span>';
          }
          tab_indent_line = '<span class="tab_indent_line">'+tab_indent+'</span>';
        }

        if( line[i].match('!DOCTYPE') ){
          str_content += '<span class="'+uk_gist_code_line+' uk_color_doctype">'+ line[i] + tab_indent_line + '</span>\n';
        }
        else {
          str_content += '<span class="'+uk_gist_code_line+'">'+ line[i] + tab_indent_line + '</span>\n';
        }
      }

      if( line[i].match('--del--') ){

      }
    }

    //----------------------------------------------------------------------------------------

    //data-tit ??????
    let dataTitle = '';
    if( $(e).attr('data-tit') ){
      dataTitle = '<b>' + $(e).attr('data-tit') + '</b> c';
    }else{
      dataTitle = 'C';
    }

    //----------------------------------------------------------------------------------------

    // textarea ?????? ??? ?????? ??????
    //$(e).find('.txtarea').remove();
    $(e).append(
      '<div class="'+uk_gist_content+'">' +
      '<pre class="'+uk_gist_code_pre+'">' +
      '<code class="'+uk_gist_code_wrap+'">'+str_content+'</code>' +
      '</pre>' +
      '</div>' +
      '<div class="'+uk_gist_footer+'">' +
      ''+dataTitle+'ode example ' +
      '<span class="by"><span class="hyphen">-</span> create <i>???</i> by <b>uxkm</b></span>' +
      '</div>'
    );

    //data-filename??? ?????? ??????
    const uk_gist_code_layer = 'uk_gist_code_layer';
    const file_name_box = 'file_name_box';
    const file_name = 'file_name';
    const view_full_layer = 'view_full_layer';
    const full_code_layer = 'full_code_layer';
    const code_layer_close = 'code_layer_close';
    const dataFilename = $(e).attr('data-filename');
    const if_next_layer = $(e).next().is('.'+full_code_layer);
    const if_e_layer = $(e).is('.'+full_code_layer);

    if( !$(e).is('.'+full_code_layer) && dataFilename || dataFilename !== undefined ){
      let dataFilename_btn = '<button type="button" class="'+file_name+' toggle_btn">'+dataFilename+' <span>[close]</span></button>';
      if( if_next_layer ) dataFilename_btn += '<button type="button" class="'+view_full_layer+'">View full code</button>';
      if( if_e_layer ){
        dataFilename_btn =
          '<span class="'+file_name+'">'+dataFilename+'</span>' +
          '<button type="button" class="'+code_layer_close+'"><i>layer close</i></button>'
        ;
      }
      $(e).prepend('<div class="'+file_name_box+'">'+ dataFilename_btn +'</div>');

      //file_name click
      $(e).find('.'+file_name_box+' button.'+file_name).on('click', function(){
        //code box ?????? ???
        if( !$(this).is('.on') ){
          $(this).addClass('on').children('span').text('[open]');
          $(this).parent().addClass('on').next().hide();
          $(e).next().find();
        }
        //code box ??? ???
        else{
          $(this).removeClass('on').children('span').text('[close]');
          $(this).parent().removeClass('on').next().show();
        }
        return false;
      });

      //view_full_layer click
      $(e).find('.'+file_name_box+' button.'+view_full_layer).on('click', function(){
        $(e).next().addClass('view_show');
        $html.css('overflow-y','hidden');
        return false;
      });
      //code_layer_close click
      $(e).find('.'+file_name_box+' button.'+code_layer_close).on('click', function(){
        $(this).parents('.'+uk_gist_code_layer).removeClass('view_show');
        $html.css('overflow-y','scroll');
        return false;
      });
    }

    //full_code_layer??? ??????
    if( if_e_layer ){
      $(e).wrap('<div class="uk_gist_code_layer">');

      if( device_check === 'desktop' ){
        const ly_scroll = 'ly_scroll';
        const pd = '17px';
        var code_width = $(e).find('.'+uk_gist_code_wrap).outerWidth();
        $(e).find('.'+uk_gist_code_wrap).css('padding-bottom',22);

        $(e).find('.'+uk_gist_content).after(
          '<div class="'+ly_scroll+'" style="overflow-x:auto; position:relative; z-index:2; height:'+pd+'; margin-top:-'+pd+';">' +
          '<p style="width:'+code_width+'px; font-size:0; text-indent:-9999px;">scroll var</p>' +
          '</div>'
        );

        $(e).find('.'+ly_scroll).scroll(function(){
          let scl = $(this).scrollLeft();
          $(e).find('.'+uk_gist_code_wrap).scrollLeft(scl);
        });
      }
    }

    const dataOpen = $(e).attr('data-open');
    if( dataOpen === 'false' ){
      $(e).find('.'+file_name_box).addClass('on');
      $(e).find('.'+file_name_box+' button.'+file_name).addClass('on').children().text('[open]')
      $(e).find('.'+uk_gist_content).hide();
    }

    //----------------------------------------------------------------------------------------

    //line number ??????
    $(e).find('.'+uk_gist_content).prepend('<ol class="line_number">');
    for( i=0; i<lineLength; i++ ){
      $(e).find('.line_number').append('<li></li>');
    }
  });*/

  //highlight.js ?????? ??? ?????? ?????????
  const hljsSelectorClass = '.hljs-selector-class';
  const hljsSelectorId = '.hljs-selector-id';
  const hljsNumber = '.hljs-number';
  setTimeout(function(){
    $('.'+uk_gist_code_wrap).each(function(i, e){
      //$(e).addClass('xml');
      $(this).parents('.'+uk_gist_content).siblings('textarea').remove(); //-----------------------
      hljs.highlightBlock(e);
      $(e).addClass('code_show');

      //class '.' ?????? ?????? class ??????
      if( $(e).find(hljsSelectorClass).is(':visible') ){
        $(hljsSelectorClass).each(function(j, k){
          const change_str = $(k).text().replace('.','<span class="uk_color_class_dot">.</span>');
          $(k).html(change_str);
        });
      }

      //id '#' ?????? ?????? class ??????
      if( $(e).find(hljsSelectorId).is(':visible') ){
        $(hljsSelectorId).each(function(j, k){
          const change_str = $(k).text().replace('#','<span class="uk_color_id_hashTags">#</span>');
          $(k).html(change_str);
        });
      }

      //number?????? ????????? ?????? ?????? ??????
      if( $(e).find(hljsNumber).is(':visible') ){
        $(hljsNumber).each(function(j, k){
          let change_str;
          const str_arr = $(k).text().split('');


          if( str_arr[0] === '#' ){
            $(k).addClass('uk_color_hexCode');
          }
          else {
            const string_str = $(k).text().replace(/[0-9]/g,'').replace(/\./g,'').replace(/\s/g,'');
            //console.log( string_str );
            change_str = $(k).text().replace(string_str,'<span class="uk_color_number_in_string">'+string_str+'</span>');
          }
          $(k).html(change_str);
        });
      }

      //???????????? .hljs-number ?????? ??????
      $(e).find('.'+uk_gist_code_line).each(function(j, k){
        if( $(k).text().match('#') ){
          $(k).html( $(k).html().replace( /#/g, '<span class="uk_string_hashTags">#</span>' ) );

          if( $(k).find(hljsNumber).prev().is('.uk_string_hashTags') ){
            $(k).find(hljsNumber).addClass('uk_color_number_in_string');
          }
        }
      });

      // ???????????? ------------------------------------------------------------------------------------------------------

      //sub element ?????? ?????? [????????? ??????]
      if( $(e).find(hljsSelectorClass).is(':visible') && $(e).parents('.'+uk_gist_code_box).attr('data-ex') === 'sub' ){
        $(e).find(hljsSelectorClass).each(function(j, k){
          if( $(k).text() === '.sub' ){
            $(k).addClass('hljs-selector-tag').find('.uk_color_class_dot').remove();
          }
        });
      }

      //img element > area ?????? ??????
      /*
      if( $(e).parents('.'+uk_gist_code_box).attr('data-ex') === 'img_area' ){
        let index;
        $(e).find('.'+uk_gist_code_line).each(function(j, k){
          if( $(k).text().match('<map name="vending">') ){
            index = j;
          }
          if( j === index + 1 ){
            $(k).find('.hljs-name').after(
              ' ' +
              '<span class="hljs-attr">shape</span>=<span class="hljs-string">"</span><span class="hljs-string">poly</span><span class="hljs-string">"</span>' +
              ' ' +
              '<span class="hljs-attr">coords</span>=<span class="hljs-string">"</span><span class="hljs-string">50,150,230,120,230,180,50,210</span><span class="hljs-string">"</span>' +
              ' ' +
              '<span class="hljs-attr">alt</span>=<span class="hljs-string">"</span><span class="hljs-string">??????</span><span class="hljs-string">"</span>' +
              ' ' +
              '<span class="hljs-attr">href</span>=<span class="hljs-string">"</span><span class="hljs-string">https://ko.wikipedia.org/wiki/%EC%A7%84%EC%8B%A4</span><span class="hljs-string">"</span>' +
              ''
            );
          }
          if( j === index + 2 ){
            $(k).find('.hljs-name').after(
              ' ' +
              '<span class="hljs-attr">shape</span>=<span class="hljs-string">"</span><span class="hljs-string">circle</span><span class="hljs-string">"</span>' +
              ' ' +
              '<span class="hljs-attr">coords</span>=<span class="hljs-string">"</span><span class="hljs-string">140,100,40</span><span class="hljs-string">"</span>' +
              ' ' +
              '<span class="hljs-attr">alt</span>=<span class="hljs-string">"</span><span class="hljs-string">??????</span><span class="hljs-string">"</span>' +
              ' ' +
              '<span class="hljs-attr">href</span>=<span class="hljs-string">"</span><span class="hljs-string">https://ko.wikipedia.org/wiki/%EA%B1%B0%EC%A7%93%EB%A7%90</span><span class="hljs-string">"</span>' +
              ''
            );
          }
        });
      }
      */

      //css ????????? level 1, 2 ?????? ?????? [????????? ??????]
      if( $(e).parents('.'+uk_gist_code_box).attr('data-ex') === 'attribute_selector' ){
        $(e).find('.'+uk_gist_code_line+':first .hljs-selector-tag').remove();
      }

      //text ?????? > vertical-align ?????? sub ?????? ??????
      /*value_error( 'align_vertical-align' );*/
      //text ?????? > word-break ?????? break-word ?????? ??????
      /*value_error( 'align_word-break' );*/
      //background ?????? > background-repeat ?????? ?????? ??????
      /*value_error( 'background-repeat' );*/
      //background ?????? > background-position ?????? ?????? ??????
      /*value_error( 'background-position' );*/
      function value_error( target ){
        if( $(e).parents('.'+uk_gist_code_box).attr('data-ex') === target ){
          const txt_clone = $(e).find('.hljs-attribute').clone();

          $(e).find('.hljs-attribute').parent().text('')
          .prepend('<span>'+ code_tab_size +'</span>')
          .append(txt_clone)
          .append('<span>'+ $(e).parents('.'+uk_gist_code_box).attr('data-text') +'</span>');
        }
      }

      //animation ????????? ?????? ?????????
      if( $(e).parents('.'+uk_gist_code_box).attr('data-ex') === 'animation-abbreviated-declaration' ){
        $(e).find('.hljs-attribute').each(function(j, k){
          const txt_clone = $(k).clone();
          let ex_text;
          ex_text = $(e).parents('.'+uk_gist_code_box).attr('data-ex-text'+(j+1));

          const each_split = ex_text.split(':')[1].replace(/\t/gi, '').replace(/\n/gi, '');
          ex_text = ':' + each_split;

          $(k).parent().text('')
          .prepend('<span>'+ code_tab_size +'</span>')
          .append(txt_clone).append(ex_text);
        });
      }

      //@media part-1 style ?????? ??????(style ?????? ??????)
      /*if( $(e).parents('.'+uk_gist_code_box).attr('data-ex') === 'style_tag_remove' ){
        //$('[data-ex="style_tag_remove"]').each(function(){});
        $(e).find('.'+uk_gist_code_line).first().remove();
        $(e).find('.css').first().remove();
        $(e).find('.'+uk_gist_code_line).last().remove();
        $(e).find('.css').last().remove();
        $(e).parents('.'+uk_gist_code_box).find('.line_number > li').slice(0, 2).remove();
      }*/

      //uk_gist_code_wrap each end -------------------------------------------------------------------------------------
    });
  }, app_speed);
}

// header common
function hd_common(sct){
	// uk_header ---------------------------//
	if( sct > 10 ) _ukHeader.addClass('fixed');
	else _ukHeader.removeClass('fixed');

	// uk_header progress (<head>?????? ??????)
	var docHeight = $(document).height() - window.innerHeight;
	var hd_proW = (sct/docHeight)*100;  //Math.ceil();
	$('.'+hd_progress).css('width', hd_proW+'%');

  // masonry
  depth3_masonry();
}

// depth3_masonry
function depth3_masonry(){
  _sitemap_area.find('.depth3').each(function(i, e){
    $(e).masonry({
      itemSelector: '.item',
      percentPosition: true
    });
  });
}

// pc&mb class
function pc_mb_class(win_w){
	var scroll_state = false;
	// ????????? pc
	if( win_w > screen_sm_max ){
		_html.addClass('pc').removeClass('mb');
		// pcmb_state = [];
		// pcmb_state.push('state_pc');
		// iscroll_psmb = [];
		// iscroll_psmb.push(true);
		// if( !scroll_state ){
		// 	$(window).trigger('scroll');
		// 	sroll_state = true;
		// }
	}
	// ????????? mobile
	else if( win_w <= screen_sm_max ){
		_html.addClass('mb').removeClass('pc');
		// pcmb_state = [];
		// pcmb_state.push('state_mb');
		// iscroll_psmb = [];
		// iscroll_psmb.push(false);
		// if( scroll_state ){
		// 	$(window).trigger('scroll');
		// 	sroll_state = false;
		// }
	}
}

// kmTemp ????????? height ??? ??????
function uk_kmTemp_resize(){
  const kmtemp_resize_iframe = 'kmtemp_resize_iframe';
  if( $('.'+kmtemp_resize_iframe).is(':visible') ){
    $('.'+kmtemp_resize_iframe).each(function(i, e) {
      var target = $(e).find('iframe');
      var the_height;
      the_height = target.contents().find('body').height();
      $(e).css({'height': the_height});
      $(e).addClass('resize_ok');

      // if( the_height === null ){
      //   var th_interval = setInterval(function(){
      //     if( the_height === null ){
      //       the_height = target.contents().find('body').height();
      //       $(e).css({'height': the_height});
      //     }
      //     else {
      //       clearInterval(th_interval);
      //     }
      //   }, 100);
      // }
    });
  }
}








