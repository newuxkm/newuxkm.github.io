/* Device & Desktop Check */
var filter = "win16|win32|win64|mac|macintel";
if( navigator.platform ){
	if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
		document.getElementsByTagName('html')[0].className = 'device ';
		$('.btn').addClass('device');
		deviceOsCheck();
		deviceNameCheck();
	} else {
		document.getElementsByTagName('html')[0].className = 'desktop ';
		opCheck();
		deviceNameCheck();
	}
}


/* OS & Browser Check */
function opCheck() {
	var OSPC = {};
	OSPC.check = {
		siteCode : window.LOCALE ? window.LOCALE : '',
		os : (function () { 
			var agent = navigator.userAgent;
			if (agent.indexOf('Mac OS X') != -1) {
				$("html").addClass("macos apple_os");
			} else {
				$("html").addClass("winos");
			}
		})(),
		browser : (function () {
			var agent = navigator.userAgent.toLowerCase();
			var browserchk;
			if(agent.indexOf('edge/') > -1) {
				browserchk = 'ie_yes new_b edge ';
			}
			else if(agent.indexOf('safari') > -1) { // Chrome or Safari
				if(agent.indexOf('opr') > -1) { // Opera
					browserchk = 'ie_no new_b opera';
				} else if(agent.indexOf('chrome') > -1) { // Chrome
					browserchk = 'ie_no new_b chrome';
				} else { // Safari
					browserchk = 'ie_no new_b safari';
				}
			} else if(agent.indexOf('firefox') > -1) { // Firefox
				browserchk = 'ie_no new_b firefox';
			}
			$("html").addClass(browserchk);
			if (agent.indexOf('msie') != -1 || agent.indexOf('trident') != -1) {
				var version = 11;
				agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
				if (agent) { 
					version = parseInt(agent[1]); 
				}
				var classNames = '';
				// IE 10 이하에 html 클래스를 추가한다.
				if(version <= 11) {
				}

				classNames += ' ie_yes ie';
				classNames += ' ie' + version;
				if( version < 10 ){
					// IE11 이하에 사용할 ie 공통 클래스도 추가
					// 현재 버전 표시를 추가
					classNames += ' old_b';
				}else{
					// IE11 이하에 사용할 ie 공통 클래스도 추가
					// 현재 버전 표시를 추가
					classNames += ' new_b';
				}
				// IE10이하 에서 lt-ie 버전에 대한 멀티 클래스를 추가
				for (var i = version + 1; i <= 11; i++) {
					classNames += ' lt-ie' + i;
				}
				// 위 코드에서 체크한 클래스를 html 태그에 추가한다.
				document.getElementsByTagName('html')[0].className += classNames;
			}
		})()
	};
	/*
	if(OSPC.check.browser == 'ie10') { 
		console.log('ie10 입니다. 해당 버전에서의 실행 로직을 작성하세요!'); 
	}
	*/
}




/* Smart Device OS Check */
function deviceOsCheck() {
	if( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) ) {
		//alert('OS가 IOS 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no ios apple_os';
	} else if( (navigator.userAgent.match(/Android/i)) ) {
		//alert('OS가 안드로이드 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no android ';
	} else if( (navigator.userAgent.match(/Windows CE/i)) ) {
		//alert('OS가 윈도우 CE 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no wince ';
	} else if( (navigator.userAgent.match(/Windows Phone/i)) ) {
		//alert('OS가 윈도우 Phone 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no winphone ';
	} else if( (navigator.userAgent.match(/Windows NT/i)) ) {
		//alert('OS가 윈도우 NT 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no winnt ';
	} else if( (navigator.userAgent.match(/BlackBerry/i)) ) {
		//alert('OS가 블랙베리 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no blackberry ';
	} else if( (navigator.userAgent.match(/Symbian/i)) ) {
		//alert('OS가 심비안 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no symbian ';
	} else if( (navigator.userAgent.match(/MeeGo/i)) ) {
		//alert('OS가 미고 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no meego ';
	} else if( (navigator.userAgent.match(/PlayBook/i)) ) {
		//alert('OS가 PlayBook 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no playbook ';
	} else {
		//alert('기타 OS 일 경우');
		document.getElementsByTagName('html')[0].className += 'ie_no etcos ';
	}
}
/* Device Name Check */
function deviceNameCheck() {
	var device = "";
	var browserName = undefined;
	var userAgent = navigator.appVersion.toLowerCase().replace(/ /g,'');
	var userAgentName = navigator.appName;
	var mobileDevice;
	var mobilePhones = new Array(
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
	);
	/* pc, mobile 확인 */
	for(var i=0;i<mobilePhones.length;i++) {
		if(userAgent.indexOf(mobilePhones[i]) != -1){
			device = mobilePhones[i];
		}
	}	/* mobile device name 확인 */
	for(var txt in mobilePhones){
		if(userAgent.match(mobilePhones[txt]) != null){
			mobileDevice = mobilePhones[txt];
			break;
		}
	}
	document.getElementsByTagName('html')[0].className += ' ' + device;
	//deviceClassName();
}
$(document).ready(function() {
	//console.log($('html').attr('class'));
	//$('.browser').text(navigator.userAgent);
	//$('.browser i').text( $('html').attr('class') );
	//$('.browser span').text( navigator.userAgent );
});
