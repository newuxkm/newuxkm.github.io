/**
 * ukDetect 1.0.0
 * Copyright 2019 kyo-Sung, Chu
 * http://921430km.com/_temp/table/
 * Released under the kyo-Sung, Chu License
 * Released on: August 15, 2019
 * 구조 변형 없이 제목셀과 왼쪽 셀을 고정할 수 있는 테이블 플러그인이다.
 * It is a table plug-in that can fix a title cell and a left cell without structural deformation.
 */


//ready
var device_check, desktopOs_check, deviceOs_check, browser_check, browser_name, deviceName_check, ie_class, ie_version;
var root_html, detectAdd, ie_no, new_b, old_b, filter, mb_b_chk;
ie_no = ' ie_no';
new_b = ' new_b';
old_b = ' old_b';
filter = "win16|win32|win64|mac|macintel";
detectAdd = '';
mb_b_chk = false;
root_html = document.getElementsByTagName('html')[0];

//device check
if( navigator.platform ){
	if( navigator.userAgent.indexOf('Mobile') !== -1 ){
		device_check = 'device';
		detectAdd += device_check;
		//deviceName_add();
		//browser_add();
		deviceOs_add();
	}
	else{
		device_check = 'desktop';
		detectAdd += device_check;
		desktopOs_add();
		//deviceName_add();
		browser_add();
	}
}

//browser check
function browser_add(){
	var agent = navigator.userAgent.toLowerCase();

	//ie
	if (agent.indexOf('msie') > -1 || agent.indexOf("trident") > -1) {
		ie_version = 11;
		agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
		if( agent ) ie_version = parseInt(agent[1]);
		browser_name = 'ie';
		browser_check = browser_name;
		ie_class = '';
		ie_class += ' ie'+ie_version;
		if( ie_version < 10 ) ie_class += old_b;
		else ie_class += new_b;
		// IE10이하 에서 lt-ie 버전에 대한 멀티 클래스를 추가
		for (var i = ie_version + 1; i <= 11; i++) {
			ie_class += ' lt-ie' + i;
		}
		detectAdd += ' '+browser_check+' '+ie_class;
	}
	//edge
	else if (agent.indexOf('edge') > -1) {
		browser_name = 'edge';
		browser_check = browser_name+' ie'+new_b;
	}
	//firefox
	else if (agent.indexOf('firefox') > -1) {
		browser_name = 'firefox';
		browser_check = browser_name+ie_no+new_b;
	}
	//opera
	else if (agent.indexOf('opr') > -1) {
		browser_name = 'opera';
		browser_check = browser_name+ie_no+new_b;
	}
	//chrome
	else if (agent.indexOf('chrome') > -1) {
		browser_name = 'chrome';
		browser_check = browser_name+ie_no+new_b;
	}
	//safari
	else if (agent.indexOf('safari') > -1) {
		browser_name = 'safari';
		browser_check = browser_name+ie_no+new_b;
	}
	//netscape
	else if(agent.indexOf("netscape") > -1) {
		browser_name = 'netscape';
		browser_check = browser_name+ie_no;
	}
	//skipstone
	else if(agent.indexOf("skipstone") > -1) {
		browser_name = 'skipstone';
		browser_check = browser_name+ie_no+new_b;
	}
	//etc
	else {
		browser_name = 'etc_browser';
		browser_check = browser_name+ie_no;
	}

	//add Class
	if( ie_class === '' || ie_class === undefined ) detectAdd += ' '+browser_check;
	mb_b_chk = true;
}

//desktopOs check
function desktopOs_add(){
	if ( navigator.userAgent.indexOf('Mac OS X') != -1 ) desktopOs_check = 'macos apple_os';
	else desktopOs_check = 'winos';
	detectAdd += ' '+desktopOs_check;
}

//deviceName check
function deviceOs_add(){
	//IOS
	if( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) ) {
		deviceOs_check = 'ios apple_os';
	}
	//안드로이드
	else if( (navigator.userAgent.match(/Android/i)) ) {
		deviceOs_check = 'android';
	}
	//윈도우 CE
	else if( (navigator.userAgent.match(/Windows CE/i)) ) {
		deviceOs_check = 'wince';
	}
	//윈도우 Phone
	else if( (navigator.userAgent.match(/Windows Phone/i)) ) {
		deviceOs_check = 'winphone';
	}
	//윈도우 NT
	else if( (navigator.userAgent.match(/Windows NT/i)) ) {
		deviceOs_check = 'winnt';
	}
	//블랙베리
	else if( (navigator.userAgent.match(/BlackBerry/i)) ) {
		deviceOs_check = 'blackberry';
	}
	//심비안
	else if( (navigator.userAgent.match(/Symbian/i)) ) {
		deviceOs_check = 'symbian';
	}
	//미고
	else if( (navigator.userAgent.match(/MeeGo/i)) ) {
		deviceOs_check = 'meego';
	}
	//PlayBook
	else if( (navigator.userAgent.match(/PlayBook/i)) ) {
		deviceOs_check = 'playbook';
	}
	//기타 OS
	else {
		deviceOs_check = 'etc_os';
	}

	if( !mb_b_chk ) detectAdd += ' '+deviceOs_check + ie_no + new_b;
	else detectAdd += ' '+deviceOs_check;

}

//device name check
function deviceName_add(){
	var device = "";
	var userAgent = navigator.appVersion.toLowerCase().replace(/ /g,'');
	var mobileDevice;
	var mobilePhones = [
		'iphone',
		'ipod',
		'ipad',
		'android',
		'tablet',
		'touch',
		'blackberry',
		'windows-ce',
		'nokia',
		'nokian9',
		'webos',
		'opera-mini',
		'sonyericsson',
		'opera-mobi',
		'iemobile',
		'kfapwi',
		'lgms323',
		'x64',
		'nexus',
		'nexus4',
		'nexus5',
		'nexus6',
		'nexus7',
		'nexus10',
		'lumia520',
		'lumia550',
		'lumia950',
		'hw-h60-j1',
		'hw-cam-l32',
		'hw-scl-l32',
		'hw-m2-802l',
		'edi-al10',
		'h1512',
		'kiw-al10',
		'bln-al10',
		'stf-l09',
		'stf-al00',
		'stf-al10',
		'stf-tl10',
		'am-h200',
		'am-h100',
		'tg-l900',
		'tg-l800',
		'a6363',
		'a9191',
		'desire',
		'ggl-nx1',
		'hd2',
		'htc-p515e',
		'htc-x315e',
		'htc-x515e',
		'pg86200',
		's710e',
		'sensation',
		'x315e',
		'mw600',
		'st18i',
		'lt15i',
		'e10i',
		'u20i',
		'd2533',
		'e5503',
		'd6503',
		'c660x',
		'c6903',
		'd2005',
		'f8331',
		'd5833',
		'd6653',
		'e6653',
		'd5823',
		'd6853',
		'f8131',
		'im-s500',
		'im-u560',
		'im-u660',
		'p-2100',
		'im-t100',
		'im-a600',
		'im-a630',
		'im-a650',
		'im-a690',
		'im-a710',
		'im-a720',
		'im-a725',
		'im-a730',
		'im-a740',
		'im-a750',
		'im-a760',
		'im-a770',
		'im-a780',
		'im-a800',
		'im-a810',
		'im-a820',
		'im-a830',
		'im-a840',
		'im-a840sp',
		'im-a830ke',
		'im-a850',
		'im-a860',
		'im-a870',
		'im-a880',
		'im-a890',
		'im-a900',
		'im-a910',
		'im-a920',
		'im-100',
		'lg-d329',
		'lg-sh840',
		'lg-f100',
		'lg-f120',
		'lg-f160',
		'lg-f180',
		'lg-f200',
		'lg-f220',
		'lg-f240',
		'lg-f260',
		'lg-f300',
		'lg-f320',
		'lg-f340',
		'lg-f350',
		'lg-f370',
		'lg-f400',
		'lg-f410',
		'lg-f430',
		'lg-f440',
		'lg-f460',
		'lg-f470',
		'lg-f480',
		'lg-f490',
		'lg-f500',
		'lg-f510',
		'lg-f520',
		'lg-f540',
		'lg-f560',
		'lg-f570',
		'lg-f580',
		'lg-f590',
		'lg-f610',
		'lg-f660',
		'lg-ls660',
		'lg-h525',
		'lg-t480',
		'lg-t540',
		'lg-d700',
		'lg-e960',
		'lg-d821',
		'lg-f600',
		'lg-f650',
		'lg-f670',
		'lg-f690',
		'lg-f700',
		'lg-f720',
		'lg-f740',
		'lg-f750',
		'lg-f770',
		'lg-f800',
		'lg-f820',
		'lg-g620',
		'lg-h791',
		'lgm-k120',
		'lgm-k121',
		'lgm-g600',
		'a1241',
		'a1303',
		'a1349',
		'a1332',
		'a1387',
		'a1429',
		'a1532',
		'a1456',
		'a1529',
		'a1533',
		'a1453',
		'a1530',
		'a1549',
		'a1586',
		'a1522',
		'a1524',
		'a1688',
		'a1687',
		'a1723',
		'a1778',
		'a1784',
		'a1865',
		'a1901',
		'a1902',
		'sm-b510',
		'shw-m110',
		'shw-m250',
		'shw-e110',
		'shw-a300',
		'shw-m240',
		'shw-m340',
		'shw-m420',
		'shw-e500',
		'sm-t255',
		'sm-g910',
		'sm-g600',
		'shw-m570',
		'sm-m580d',
		'sm-g155',
		'sm-g150n',
		'sm-g1600',
		'sm-c115',
		'sm-g720n0',
		'sm-g710',
		'shv-e270',
		'sm-j320n0',
		'sm-j500',
		'sm-j510',
		'sm-j700',
		'sm-j710',
		'shv-e120',
		'gt-i9300',
		'shv-m440',
		'shv-e210',
		'shv-e470',
		'sm-c105',
		'shv-e300',
		'shv-e310',
		'shv-e370',
		'shv-e330',
		'sm-g900',
		'sm-g906',
		'shv-e160',
		'shv-e250',
		'gt-n7100',
		'sm-n900',
		'sm-n750',
		'sm-n910',
		'sm-n915',
		'sm-n916',
		'sm-g610',
		'sm-g850',
		'sm-a300',
		'sm-a310',
		'sm-a500',
		'sm-a510',
		'sm-a700',
		'sm-a710',
		'sm-a800',
		'sm-a810',
		'sm-g920',
		'sm-g925',
		'sm-g928',
		'sm-g930',
		'sm-g935',
		'sm-n920',
		'sm-n930',
		'sm-g955',
		'sm-g950'
	];
	//pc, mobile 확인
	for(var i=0;i<mobilePhones.length;i++) {
		if(userAgent.indexOf(mobilePhones[i]) != -1){
			device = mobilePhones[i];
		}
	}
	//mobile device name 확인
	for(var txt in mobilePhones){
		if(userAgent.match(mobilePhones[txt]) != null){
			mobileDevice = mobilePhones[txt];
			break;
		}
	}
	deviceName_check = ' '+device;
	detectAdd += ' '+deviceName_check;
}

//add class
root_html.className += detectAdd;


//plugin
;(function($){
	$.fn.ukDetect = function(options) {
		var opts = $.extend({}, $.fn.ukDetect.defaults, options);
		return this.each(function(i, e) {
			var el = $(e);
			var all_check_true = opts.all_check === true || opts.all_check === "true";
			var device_check_true = opts.device_check === true || opts.device_check === "true";
			var os_check_true = opts.os_check === true || opts.os_check === "true";
			var browser_check_true = opts.browser_check === true || opts.browser_check === "true";

			//all_check
			if( all_check_true ){
				if( !opts.device_check && !opts.os_check && !opts.browser_check ){
					el.addClass(detectAdd);
				}
			}

			//device_check
			if( device_check_true ){
				el.addClass(device_check);
			}

			//os_check
			if( os_check_true ){
				if( device_check === 'device' ){
					el.addClass(deviceOs_check + ie_no + new_b);
				}
				else{
					el.addClass(desktopOs_check);
				}
			}

			//browser_check
			if( browser_check_true ){
				el.addClass(browser_check);
				if( browser_check === 'ie' ) el.addClass(ie_class);
			}
		});
	};


	//default_option
	$.fn.ukDetect.defaults = {
		all_check: true,		//전체 조건을 체크하여 해당 엘리먼트에 선언

		device_check: false,
		os_check: false,
		browser_check: false,
	};
}(jQuery));
