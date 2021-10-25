
// [ dom 이 그려질때 바로 실행되야 하는 스크립트 ] ---------------------------------------------------------------------

// 새로고침 시 sessionStorage 에 저장한 document height 값 적용(window.load 후 삭제 for uk_sub.js)
if( window.performance.navigation.type === 1 ) {
  $('html').css('height', sessionStorage.getItem('html_height'));
}

// 새로고침 시 기존 scroll top 유지
if( window.performance.navigation.type === 1 ){
  // $(window).on('scroll', function(){
  //   let loading_sct = $(window).scrollTop();
  //   sessionStorage.setItem('loading_scroll_top', loading_sct);
  // });
  $('html, body').animate({'scrollTop':sessionStorage.getItem('loading_scroll_top')}, 0);
  sessionStorage.setItem('loading_scroll_top', $(window).scrollTop());
}

// ---------------------------------------------------------------------------------------------------------------------

setTimeout(function(){
  let sct = $(window).scrollTop();

  // sessionStorage 의 sideToggle 에 true 값이 있으면 side menu 닫기 (레이아웃 깜빡임 방지) ----------------------------
  if( sessionStorage.getItem('sideToggle') ){
    $('.side_menu_toggle').addClass('active').attr('title','사이드 메뉴 열기').parent().addClass('side_close');
    $('.side_menu_toggle').find('b').text('OPEN');
    $('html').addClass('side_close');
  }

  // uk_header progress ------------------------------------------------------------------------------------------------
  let docHeight = $(document).height() - window.innerHeight;
  let hd_proW = (sct/docHeight)*100;
  $('.hd_progress').css('width', hd_proW+'%');

  // uk_gist_code_box 적용 전 세로값 유지 ------------------------------------------------------------------------------
  uk_gist_code_layout();

  // content list 한개 이상일 때 con_lst_btn 버튼 노출 -----------------------------------------------------------------
  const content_section = $('.content_area').children('section, article');
  if( !$('body').is('.content_lst_none') ) $('.content_bottom_btn').addClass('list_show');


  // top_link 상단 고정(scroll top 값이 top_link 의 offset().top 보다 클 경우) -----------------------------------------
  // let top_link_offset = $('.top_link').find('ul').offset().top - 1;
  // if( top_link_offset !== undefined || top_link_offset !== 'undefined' ){
  //   sct > top_link_offset - $('.uk_header').height() ?  $('.top_link').addClass('fixed') : $('.top_link').removeClass('fixed');
  // }

  // side menu 타이틀 노출( side_close일 경우 ) ------------------------------------------------------------------------
  // let sub_content_offTop = $('.sub_content').offset().top;
  // if( sub_content_offTop !== undefined || sub_content_offTop !== 'undefined' ){
  //   let sub_top_offset = sub_content_offTop + Number($('.sub_content').css('padding-top').replace('px','')) + $('#content_title').height()/2;
  //   sub_top_offset -= $('.uk_header').height();
  //   sct > sub_top_offset ? $('.side_menu_area').addClass('title_show') : $('.side_menu_area').removeClass('title_show') ;
  // }
});


function uk_gist_code_layout(){
  const uk_gist_code_box = 'uk_gist_code_box';
  const uk_gist_content = 'uk_gist_content';
  const uk_gist_code_pre = 'uk_gist_code_pre';
  const uk_gist_code_wrap = 'uk_gist_code_wrap';
  const uk_gist_code_line = 'uk_gist_code_line';
  const uk_gist_footer = 'uk_gist_footer';
  const not_ko = /[a-z0-9]|[\[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  const not_hashTags = /[a-z0-9]|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[\[\]{}()<>?|`~!@$%^&*-_+=,.;:\"'\\]/g;
  const ko_check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const code_tab_size = '  ';
  $('.'+uk_gist_code_box).each(function(i, e){
    const str = $(e).find('textarea').val()
    .replace(/</g,"&lt;")                                                 // '<' 변환
    .replace(/>/g,"&gt;")                                                 // '>' 변환
    .replace(/\"/g,"<span class='uk_color_quot'>&quot;</span>")                // 큰따옴표 변환
    .replace(/\'/g,"&#39;")                                               // 작은따옴표 변환
    //.replaceAll("____error__","<span class='uk_color_error'>")          // error코드 시작 태그
    //.replaceAll("__error____","</span>")                                // error코드 종료 태그
    .replace(/____error__/g,"<span class='uk_color_error'>")              // error코드 시작 태그
    .replace(/__error____/g,"</span>")                                    // error코드 종료 태그
    .replace(/--add--/g,"<span class='uk_color_add'>[-- 추가된 부분 --]</span>")     // --add--색상 변환
    .replace(/--add_start--/g,"<span class='uk_color_add'>[-- 추가된 부분 &#123;&#123; --]</span>")     // --add--색상 변환
    .replace(/--add_end--/g,"<span class='uk_color_add'>[-- }} 추가된 부분 --]</span>")     // --add--색상 변환
    .replace(/--edit--/g,"<span class='uk_color_edit'>[-- 수정된 부분 --]</span>")   // --edit--색상 변환
    .replace(/--del--/g,"<span class='uk_color_edit'>[-- 삭제된 부분 --]</span>")   // --edit--색상 변환
    .replace(/--no_change--/g,"<span class='uk_color_nn'>[-- 변경 없음 --]</span>")   // --edit--색상 변환
    .replace(/\t/gi, code_tab_size);                                      // tab공백을 띄어쓰기(4칸)로 변경

    //----------------------------------------------------------------------------------------

    //문장을 줄바꿈 기준으로 배열
    const line = str.split('\n');
    const lineLength = line.length - 1;

    //모든 문장의 앞에 있는 불필요한 tab 공백 추츨
    const line_tab_split = line[0].trim().split('')[0];
    const line_tab_size = line[0].split(line_tab_split)[0];

    //----------------------------------------------------------------------------------------

    //커스텀 후 배열 합침
    let str_content = '';
    let ex_line_color = '';
    let tab_count;
    let tab_count_css = '';
    const ex_line = '__ex_line__';
    for( i=0; i<lineLength; i++ ){
      //모든 문장의 앞에 있는 불필요한 tab 공백 제거
      if( line[i].match(line_tab_size) ){
        line[i] = line[i].replace(line_tab_size, '');
      }

      //한줄 설명글 강조 //ex_line
      if( line[i].match(ex_line) ){
        ex_line_color = line[i].split(' ')[0].split('__')[2];
        line[i] = line[i].replace(ex_line + ex_line_color + '__ ', '');
        line[i] = '<b class="uk_ex_line" style="color:'+ex_line_color+'">'+line[i]+'</b>';
      }

      //한글만 따로 감싸기
      let each_ko;
      if( line[i].match(ko_check) ){
        each_ko = line[i].replace(not_ko, '').split(' ').filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        $.each(each_ko, function(){
          line[i] = line[i].replace(this, '<span class="uk_leng_ko">'+this+'</span>')
        });
      }

      //컨텐츠가 없는 라인
      if( line[i] === '' ){
        str_content += '<span class="'+uk_gist_code_line+'">' + line[i] + '</span>\n';
      }
      //컨텐츠가 있는 라인 [ uk_gist_code_line class 적용 / doctype line 구분 / tab line 적용 ]
      else {
        //tab line 표시
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

    //data-tit 적용
    let dataTitle = '';
    if( $(e).attr('data-tit') ){
      dataTitle = '<b>' + $(e).attr('data-tit') + '</b> c';
    }else{
      dataTitle = 'C';
    }

    //----------------------------------------------------------------------------------------

    // textarea 삭제 후 코드 적용
    $(e).append(
      '<div class="'+uk_gist_content+'">' +
      '<pre class="'+uk_gist_code_pre+'">' +
      '<code class="'+uk_gist_code_wrap+'">'+str_content+'</code>' +
      '</pre>' +
      '</div>' +
      '<div class="'+uk_gist_footer+'">' +
      ''+dataTitle+'ode example ' +
      '<span class="by"><span class="hyphen">-</span> create <i>❤</i> by <b>uxkm</b></span>' +
      '</div>'
    );

    //data-filename이 있을 경우
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
        //code box 접을 때
        if( !$(this).is('.on') ){
          $(this).addClass('on').children('span').text('[open]');
          $(this).parent().addClass('on').next().hide();
          $(e).next().find();
        }
        //code box 열 때
        else{
          $(this).removeClass('on').children('span').text('[close]');
          $(this).parent().removeClass('on').next().show();
        }
        return false;
      });

      //view_full_layer click
      $(e).find('.'+file_name_box+' button.'+view_full_layer).on('click', function(){
        $(e).next().addClass('view_show');
        $('html').css('overflow-y','hidden');
        return false;
      });
      //code_layer_close click
      $(e).find('.'+file_name_box+' button.'+code_layer_close).on('click', function(){
        $(this).parents('.'+uk_gist_code_layer).removeClass('view_show');
        $('html').css('overflow-y','scroll');
        return false;
      });
    }

    //full_code_layer일 경우
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

    //line number 생성
    $(e).find('.'+uk_gist_content).prepend('<ol class="line_number">');
    for( i=0; i<lineLength; i++ ){
      $(e).find('.line_number').append('<li></li>');
    }
  });
}
// setTimeout end ------------------------------------------------------------------------------------------------------