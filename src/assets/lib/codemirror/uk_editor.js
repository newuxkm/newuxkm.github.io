
//uk_editor();
function uk_editor(){
	function qsa(sel){
		return Array.apply(null, document.querySelectorAll(sel));
	}

	qsa(".uk_editor").forEach(function(e){
    var _html = document.querySelector('html');

    editor_start();
    function editor_start(){
      //타켓 class
      var wrapArr = ['code_wrap', 'result_wrap', 'btn_wrap', 'info_wrap'];
      var btnArr = ['Reset', 'Download', 'FullScreen', 'Browser', 'Info'];
      var browserBtnArr = [
        ['minimize', '최소화'],
        ['exitMinimize', '이전 크기로 복원'],
        ['fixed', '브라우저 전체화면'],
        ['exitFixed', '이전 크기로 복원'],
        ['fullscreen', '모니터 전체화면'],
        ['exitFullscreen', '이전 크기로 복원'],
        ['closing', '닫기']
      ];
      var infoArr = ['edite_info', 'browser_info'];
      var info_txtArr = [
        [
          '초기 코드로 되돌립니다.',
          '코드를 html 파일로 다운로드할 수 있습니다.',
          //'코드의 결과물을 확인할 수 있으며, 우측 Result Area의 모든 창모드를 기본으로 되돌립니다.'
          '에디터를 브라우저 기준 전체 화면으로 확장합니다. 조금 더 편리한 코딩이 가능합니다.'
        ],
        [
          'Result Area를 최소화 합니다.',
          'Result Area를 브라우저 기준 전체 화면으로 확대합니다.',
          'Result Area를 모니터 기준 전체 화면으로 확대합니다.',
          'Result Area를 닫습니다. Browser button을 클릭하여 기본 모드로 되돌릴 수 있습니다.',
        ]
      ];
      var title_txt;
      var editor_info = 'editor_info';
      var browser_full = 'browser_full';
      var browser_hide = 'browser_hide';
      var browser_mini = 'browser_mini';
      var browser_fixed = 'browser_fixed';
      var pullscreen_mode = 'fullscreen_mode';
      var readonly;
      var result_true = e.getAttribute('data-result') === 'true';
      e.classList.add(device_check);
      e.setAttribute('tabindex','0');


      //타켓 정의 및 reset_btn 생성
      if( result_true ){
        if(device_check === 'device') readonly = 'nocursor';
        else if (device_check === 'desktop') readonly = false;

        var rs_wrap = document.createElement('div');
        e.appendChild(rs_wrap).classList.add(wrapArr[1]);
        var bt_wrap = document.createElement('div');
        e.appendChild(bt_wrap).classList.add(wrapArr[2]);
        var if_wrap = document.createElement('div');
        e.appendChild(if_wrap).classList.add(wrapArr[3]);
      }
      for( i=0; i<e.children.length; i++ ){
        if( e.children[i].className === wrapArr[0] ){
          var el_codeWrap = e.children[i];
          /*
          var el_txtarea = el_codeWrap.children[0];
          var target = e.parentElement.dataset.target;

          if( target.match('html') ){
            $.get('/ukncs/tutorials/'+target, function(content){
              el_txtarea.innerHTML = content;
              //console.log(el_txtarea);
            });
          }
          */
        }
        if( result_true ){
          if( e.children[i].className === wrapArr[1] ){
            var el_resultWrap = e.children[i];
          }
          if( e.children[i].className === wrapArr[2] ) var el_btnWrap = e.children[i];
          if( e.children[i].className === wrapArr[3] ) var el_infoWrap = e.children[i];
        }
      }

      //코드미러 적용
      var el_editor = el_codeWrap.firstElementChild;
      var beforeVal = el_editor.value;
      //console.log(beforeVal);
      var code_editor = CodeMirror.fromTextArea(el_editor, {
        mode: e.getAttribute('data-mode'),
        /*
          //주요테마
          ayu-mirage
          seti
          ttcn
          yonce
          uxkm_custom
        */
        //theme: e.getAttribute('data-theme'),
        theme: 'ayu-mirage',
        /* 테마 */

        lineNumbers: true,        //라인 넘버 사용 여부
        fixedGutter: false,       //라인 넘버 왼쪽 고정 여부
        styleActiveLine: true,
        readOnly: readonly,
        tabSize: 2,							//탭키 간격
        indentWithTabs: true,
        scrollbarStyle: 'simple',		//스크롤바 스타일 //simple
        //lineWrapping: true,			//가로 스크롤바 숨김, 너비에 맞게 줄바꿈.
        //keyMap: "sublime",			//괄호강조
        //matchBrackets: true,			//괄호강조
        highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}, // 같은단어강조
      });
      code_editor.on('change', function(){
        code_editor.save();
        setTimeout(resultApp);
      });

      var result_button;
      if( result_true ){
        //버튼 생성 및 정의
        buttonSet();
        function buttonSet(){
          for( i=0; i<btnArr.length; i++ ){
            var addBtn = document.createElement('button');
            addBtn.setAttribute('type','button');
            addBtn.setAttribute('tabindex','-1');
            addBtn.classList.add('fas');
            addBtn.classList.add('edit_btn');
            addBtn.classList.add(btnArr[i]+'_btn');
            el_btnWrap.appendChild(addBtn);
            var edit_btn = el_btnWrap.children[i];
            var btnTxt = document.createElement('i');
            btnTxt.innerHTML = btnArr[i];
            edit_btn.appendChild(btnTxt);

            //Reset 버튼
            if( i === 0 ){
              edit_btn.addEventListener('click', function(){
                code_editor.setValue(beforeVal);	//에디터 리셋
                setTimeout(resultApp, 100);
                return false;
              });
            }

            //Download 버튼
            else if( i === 1 ){
              if( browser_name === 'ie' || browser_name === 'edge' || browser_name === 'safari' || device_check === 'device' ) edit_btn.style.display = 'none';
              edit_btn.addEventListener('click', htmlDown);
            }

            //FullScreen 버튼
            else if( i === 2 ){
              if( device_check === 'device' ) edit_btn.style.display = 'none';
              edit_btn.addEventListener('click', function(){
                var instant_box = 'instant_box';

                //pullscreen 작동
                if( !e.className.match(pullscreen_mode) ){
                  var el_height = e.offsetHeight;
                  var ins_div = document.createElement('div');
                  ins_div.classList.add(instant_box);
                  ins_div.classList.add('mt_ms');
                  ins_div.style.height = el_height+'px';
                  var ins_el = e.parentNode.appendChild(ins_div);
                  ins_el.innerText = 'uk editor pull screen';

                  e.classList.add(pullscreen_mode);
                  this.classList.add('active');
                  _html.style.overflow = 'hidden';
                }

                //pullscreen 취소
                else{
                  var removeTarget = e.parentNode.querySelector('.'+instant_box);
                  //removeTarget.remove();
                  e.parentNode.removeChild(removeTarget);
                  e.classList.remove(pullscreen_mode);
                  this.classList.remove('active');
                  _html.removeAttribute('style');
                }

                editor_trigger();
                return false;
              });
            }

            //Result 버튼
            else if( i === 3 ){
              edit_btn.style.display = 'none';
              edit_btn.addEventListener('click', function(){
                this.style.display = 'none';
                e.classList.remove(browser_hide);
                e.classList.remove(browser_mini);
                e.classList.remove(browser_fixed);
                resultApp();
              });
              result_button = edit_btn;
            }

            //Info 버튼
            if( i === 4 ){
              if( device_check === 'device' ) edit_btn.style.display = 'none';
              edit_btn.addEventListener('click', function(){
                e.classList.add(editor_info);
              });
            }
          }
        }
        function editor_trigger(){
          var code_value = el_editor.value;
          code_editor.setValue(code_value);
          setTimeout(resultApp, 100);
        }

        //result button
        resultApp();
        function resultApp(){
          el_resultWrap.innerHTML = '';
          el_resultWrap.setAttribute('tabindex','0');
          var code_value = el_editor.value;

          if(typeof(code_value) == "string" && code_value.length >= 0) {
            //iframe 생성 및 코드 적용
            var ifr = document.createElement("iframe");
            ifr.setAttribute('frameborder','0');
            el_resultWrap.appendChild(ifr);
            var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
            ifrw.document.open();
            ifrw.document.write(code_value);
            ifrw.document.close();

            browserTitle();
            browserBtn();
            return false;
          }
        }

        //info wrap
        editorInfo();
        function editorInfo(){
          el_infoWrap.addEventListener('click', function(){
            e.classList.remove(editor_info);
          });

          el_infoWrap.setAttribute('data-left','Editor Box');
          el_infoWrap.setAttribute('data-right','Result Area');
          el_infoWrap.classList.add(browser_name);

          for( i=0; i<infoArr.length; i++){
            var info_ul = document.createElement('ul');
            info_ul.classList.add(infoArr[i]);
            el_infoWrap.appendChild(info_ul);

            for( j=0; j<info_txtArr[i].length; j++ ){
              var info_li = document.createElement('li');
              var if_wrap = document.createElement('div');
              var info_t = document.createElement('strong');
              var info_i = document.createElement('i');
              info_i.innerHTML = info_txtArr[i][j];

              if( i === 0 ){
                info_li.classList.add('info_'+btnArr[j]);
                info_t.innerHTML = btnArr[j];
              }
              else if( i === 1 ){
                var target_j = 0;
                if( j !== 0 ) target_j = j * 2;
                info_li.classList.add('info_'+browserBtnArr[target_j][0]);
                info_t.innerHTML = browserBtnArr[target_j][1];
              }

              if_wrap.appendChild(info_t);
              if_wrap.appendChild(info_i);
              info_li.appendChild(if_wrap);
              el_infoWrap.children[i].appendChild(info_li);
            }
          }

          var end_txt_p = document.createElement('p');
          end_txt_p.classList.add('info_end');
          end_txt_p.innerHTML = '클릭 시 설명 창이 닫힙니다.';
          el_infoWrap.appendChild(end_txt_p);
        }

        //browser title
        function browserTitle(){
          var el_bTitle;
          var browserTitle = 'browserTitle';
          if( el_resultWrap.firstElementChild.contentWindow.document.title ){
            title_txt = el_resultWrap.firstElementChild.contentWindow.document.title;
          }
          else{
            title_txt = 'UXKM editor';
          }

          var append_title = document.createElement('p');
          var append_icon = document.createElement('i');
          el_resultWrap.appendChild(append_title).classList.add(browserTitle);
          for( i=0; i<el_resultWrap.children.length; i++ ){
            if( el_resultWrap.children[i].className === browserTitle ) el_bTitle = el_resultWrap.children[i];
          }
          el_bTitle.classList.add(device_check);
          el_bTitle.setAttribute('data-tit',title_txt);
          var title_txtNode = document.createTextNode(title_txt);
          el_bTitle.appendChild(append_icon);
          el_bTitle.appendChild(title_txtNode);
          el_bTitle.firstElementChild.classList.add('fas', 'fa-globe-asia');

          //브라우저 로고 설정
          el_bTitle.classList.add(browser_name);

          //클릭시
          el_bTitle.addEventListener('click', exitMinimize);

          //favicon
          var favicon_target = el_resultWrap.firstElementChild.contentWindow.document.head.children;
          for( i=0; i<favicon_target.length; i++ ){
            if( favicon_target[i].getAttribute('rel') === 'icon' || favicon_target[i].getAttribute('rel') === 'shortcut icon' ){
              //favicon_target[i-1].remove();
              var favicon = 'favicon';
              el_bTitle.classList.add(favicon);

              var favicon_url = favicon_target[i].getAttribute('href');
              var favicon_add = document.createElement('span');
              favicon_add.classList.add('i_'+favicon, 'fas');
              if( favicon_url.indexOf('.ico') !== -1 ) favicon_add.style.zIndex = '9';

              var favicon_child = document.createElement('span');
              favicon_child.innerHTML = favicon;
              favicon_child.style.backgroundImage = 'url('+favicon_url+')';
              favicon_add.appendChild(favicon_child);
              el_bTitle.appendChild(favicon_add);
            }
          }

          //주소창
          var l_url = location.href.slice(7);
          el_resultWrap.setAttribute('data-url',l_url);
        }

        //browser button
        var full_browser_md = 'full_browser_md';
        function browserBtn(){
          var el_browserBtn;
          var browserBtn = 'browserBtn';
          var createBwBtn = document.createElement("div");
          el_resultWrap.appendChild(createBwBtn).classList.add(browserBtn);
          el_resultWrap.classList.add(browser_name);
          for( i=0; i<el_resultWrap.children.length; i++ ){
            if( el_resultWrap.children[i].className === browserBtn ) el_browserBtn = el_resultWrap.children[i];
          }
          for( i=0; i<browserBtnArr.length; i++ ){
            var bwBtn = document.createElement("button");
            bwBtn.innerHTML = browserBtnArr[i][0];
            bwBtn.setAttribute('type','button');
            bwBtn.setAttribute('tabindex','-1');
            bwBtn.setAttribute('title',browserBtnArr[i][1]);
            bwBtn.classList.add(browserBtnArr[i][0]+'_btn');

            el_browserBtn.appendChild(bwBtn);
            var el_bwBtn = el_browserBtn.children[i];

            //minimize
            if( i === 0 ){
              el_bwBtn.addEventListener('click', function(){
                exitFullscreen();
                e.classList.add(browser_mini);
                e.classList.remove(browser_full);
                e.classList.remove(browser_fixed);
                windowRsize();
              });
            }
            //exitMinimize
            else if( i === 1 ){
              el_bwBtn.addEventListener('click', function(){
                exitMinimize();
                windowRsize();
              });
            }

            //fixed
            else if( i === 2 ){
              if( device_check === 'device' ) el_bwBtn.style.display = 'none';
              el_bwBtn.addEventListener('click', function(){
                exitFullscreen();
                e.classList.add(browser_fixed);
                e.classList.remove(browser_mini, browser_full);
                _html.style.overflow = 'hidden';
              });
            }
            //exitFixed
            else if( i === 3 ){
              el_bwBtn.addEventListener('click', function(){
                e.classList.remove(browser_fixed);
                if( !e.className.match(pullscreen_mode) ) _html.removeAttribute('style');
              });
            }

            //fullscreen
            else if( i === 4 ){
              el_bwBtn.addEventListener('click', function(){
                e.classList.add(browser_full);
                if(_html.clientWidth < 1200) e.classList.add(full_browser_md);
                e.classList.remove(browser_mini, browser_fixed);
                el_resultWrap.requestFullscreen();
                console.log( _html.clientWidth );
              });
            }
            //exitFullscreen
            else if( i === 5 ){
              el_bwBtn.addEventListener('click', exitFullscreen);
            }

            //closing
            else if( i === 6 ){
              el_bwBtn.addEventListener('click', function(){
                exitFullscreen();
                e.classList.add(browser_hide);
                e.classList.remove(browser_mini, browser_full, browser_fixed);
                result_button.style.display = 'inline-block';
                editor_trigger();
              });
            }
          }
        }
        function exitMinimize(){
          e.classList.remove(browser_mini);
        }
        function exitFullscreen(){
          if( e.classList.contains(browser_full) ){
            e.classList.remove(browser_full, full_browser_md);
            document.exitFullscreen();
          }
        }
        function windowRsize(){
          var windowRsize = window.document.createEvent('UIEvents');
          windowRsize.initUIEvent('resize', true, false, window, 0);
          window.dispatchEvent(windowRsize);
        }

        //browser mode
        browserMode();
        function browserMode(){
          var browser_mode = e.getAttribute('data-browser');
          if( browser_mode === 'mini' ) e.classList.add(browser_mini);
          else if( browser_mode === 'hidden' ) e.classList.add(browser_hide);
        }

        //download btn
        function htmlDown(){
          if( browser_name === 'ie' || browser_name === 'edge' ){
            alert('파일 다운로드는 크롬, 파이어폭스, 오페라, 사파리 등 상위 브라우져에서 가능합니다.');
          }
          else{
            var elHtml = el_editor.value;
            var link = document.createElement('a');
            link.setAttribute('download', title_txt + '.html');
            link.setAttribute('href', 'data:application/text; charset=utf-8,' + encodeURIComponent(elHtml));
            link.click();
          }
          return false;
        }


        /*
        setTimeout(function(){
          var scroll_target = e.querySelector('.CodeMirror-scroll');
          var gutter_wrapper = e.querySelectorAll('.CodeMirror-gutter-wrapper');
          var codeMirror_code = e.querySelector('.CodeMirror-code').childNodes;


          scroll_target.onscroll = function(){
            var sct = scroll_target.scrollTop;
            var scl = scroll_target.scrollLeft;
            gutter_wrapper.forEach(function(k){
              k.style.transform = 'translateX(' + scl + 'px)';
            });
          };
        }, 500);
        */
      }
    }

    // 적용 실패 시 대응
    var reCodeSet = setInterval(function(){
      var lineLength = e.querySelector('.CodeMirror-code').childNodes.length;
      if( lineLength <= 1 ){
        setTimeout(function(){
          var codeMirror = e.querySelector('.CodeMirror');
          var result_wrap = e.querySelector('.result_wrap');
          var btn_wrap = e.querySelector('.btn_wrap');
          var info_wrap = e.querySelector('.info_wrap');
          codeMirror.parentNode.removeChild(codeMirror);
          result_wrap.parentNode.removeChild(result_wrap);
          btn_wrap.parentNode.removeChild(btn_wrap);
          info_wrap.parentNode.removeChild(info_wrap);
          editor_start();
        });
      }
      else{
        clearInterval(reCodeSet);
      }
    }, 100);

    // 중복 적용 시 대응
    function overlap_remove(){
      var code_wrapTarget = e.querySelector('.code_wrap');
      var remove_codemirror = setInterval(function(){
        var editorLength = code_wrapTarget.childNodes.length;
        console.log( editorLength );
        if( editorLength > 3 ){
          code_wrapTarget.removeChild(code_wrapTarget.childNodes[2]);
        }
        else {
          clearInterval(remove_codemirror);
        }
      }, 50);
    }


    /*
		//코드미러 적용이 실패시 재시도 및 클래스 부여
		//var codeScrollA = e.getElementsByClassName('CodeMirror-scroll');
		//var codeScrollB = e.querySelector('.CodeMirror-scroll');
		var codeScrollA = e.getElementsByClassName('CodeMirror');
		var codeScrollB = e.querySelector('.CodeMirror');
		setTimeout(function(){
			var codeTxt = e.querySelector('.CodeMirror-code').textContent;
			if( codeTxt.length < 3 ){
				editor_start();
				console.log('editor reload');
			}

			var codeScrollCount = codeScrollA.length;
			for(i=0; i<codeScrollCount; i++){
				codeScrollB.classList.add('removeScroll'+(1+i));
			}
		}, 500);

		//.CodeMirror-code가 두개 이상일 때 마지막 .CodeMirror-code 제거
		setTimeout(function(){
			var removeScroll = e.querySelector('.removeScroll2');
			if( removeScroll != null ){
				removeScroll.parentNode.removeChild(removeScroll);
			}
		}, 300);
		*/
	});
}