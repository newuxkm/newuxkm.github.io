import gulp from "gulp";
import express from 'express'; // 삭제할것
import dateFilter from "nunjucks-date-filter"; // 삭제할것
import nunjucksRender from "gulp-nunjucks-render";
import plumber from "gulp-plumber";
import data from "gulp-data";
import cached from "gulp-cached";
import fs from "fs";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import minificss from "gulp-minify-css";
import minify from "gulp-minify";
import autoprefixer from "autoprefixer";
import postCss from "gulp-postcss";
import dependents from "gulp-dependents";
import rename from "gulp-rename";
import dartSass from "dart-sass";
import Fiber from "fibers";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";
import path from "path";
import Jsonnet from "jsonnet";
//import jsonnet from "gulp-jsonnet";


// 소스 파일 경로 ------------------------------------------------------------------------------------------------------
const src = './src';
const dist = './dist';
const as = '/assets';
const das = '/_assets';
// 작업폴더 경로 ('src'에서 작업한 것을)
const PATH = {
  HTML: src + '/html',
  TEMP: src + '/html/_templates',
  SAMPLE: src + '/code_samples',
  ASSETS: {
    CSS: src + as + '/css',
    FONTS: src + as + '/fonts',
    IMAGES: src + as + '/images',
    JS: src + as + '/js',
    LIB: src + as + '/lib',
  }
}
// 산출물 경로 ('dist'에 생성한다.)
const DEST_PATH = {
  HTML: dist,
  SAMPLE: dist + '/_code_samples',
  ASSETS: {
    CSS: dist + das +'/css',
    FONTS: dist + das +'/fonts',
    IMAGES: dist + das +'/images',
    JS: dist + das +'/js',
    LIB: dist + das + '/lib',
  }
};


// 기타 설정 -----------------------------------------------------------------------------------------------------------

const onErrorHandler = (error) => console.log(error);  //plumber option (에러 발생 시 에러 로그 출력)
const apfBrwsowsers = [
  //'ie > 0', 'chrome > 0', 'firefox > 0'  // 브라우저의 모든 버전 적용
  'last 2 versions'                    // 최신 브라우저 기준 하위 2개의 버전까지 적용
];
var jsonnet = new Jsonnet();



// assets --------------------------------------------------------------------------------------------------------------

// html
const html = () => {
  const manageEnvironment = (environment) => {
    environment.addFilter('tabIndent', (str, numOfIndents, firstLine) => {
      str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('\t'));
      if(!firstLine) {
        str = str.replace(/^\s+/, "");
      }
      return str;
    });
    environment.addFilter('date', dateFilter);
  };
  const gnbJson = JSON.parse(fs.readFileSync(PATH.TEMP + '/_json/_gnb.json'));
  const pathJson = JSON.parse(fs.readFileSync(PATH.TEMP + '/_json/_path.json'));
  const json_all = {...gnbJson, ...pathJson};
  const datafile = () => {
    return json_all;
  }

  return gulp.src([
    PATH.HTML + '/**/*',
    '!' + PATH.HTML + '/**/_*',
    '!' + PATH.HTML + '/**/_*/**/*'
  ])
  .pipe( plumber({errorHandler:onErrorHandler}) )                     // 에러 발생 시 gulp종료 방지 및 에러 핸들링
  .pipe( data( datafile) )
  .pipe( nunjucksRender({
    envOptions: {
      autoescape: false,
      // addFilter: {
      //   'date': dateFilter
      // }
    },
    manageEnv: manageEnvironment,
    //path: [PATH.TEMP],                                 // nunjucks-render 적용
    path: [PATH.HTML],                                 // nunjucks-render 적용
  }) )
  .pipe( cached('html') )
  .pipe( gulp.dest(DEST_PATH.HTML) )                                  // 컴파일 후 html파일이 생성될 목적지 설정
}

// css
const css = () => {
  const options = {
    //scss 옵션 정의
    scss : {
      outputStyle: "expanded",  // 컴파일 스타일: nested(default), expanded, compact, compressed
      indentType: "space",      // 들여쓰기 스타일: space(default), tab
      indentWidth: 2,           // 들여쓰기 칸 수 (Default : 2)
      precision: 8,             // 컴파일 된 CSS 의 소수점 자리수 (Type : Integer , Default : 5)
      sourceComments: true,     // 코멘트 제거 여부 (Default : false)
      compiler: dartSass,       // 컴파일 도구
      fiber: Fiber,             // 컴파일 오버해드 방지
    },
    postcss: [ autoprefixer({
      overrideBrowserslist: apfBrwsowsers,
    }) ]
  };
  return gulp.src(
    PATH.ASSETS.CSS + '/**/*.scss',                          // 컴파일 대상 scss파일 찾기
    { since: gulp.lastRun(css) }               // 변경된 파일에 대해서만 scss:compile 진행
  )
  .pipe( plumber({errorHandler:onErrorHandler}) )         // 에러 발생 시 gulp종료 방지 및 에러 핸들링
  // *.css 생성
  .pipe( dependents() )                                   // 종속된 scss파일(@import)까지 변경된 파일 감지하여 진행
  .pipe( sourcemaps.init() )                              // 소스맵 작성
  .pipe( sass(options.scss).on('error', sass.logError) )  // scss 옵션 적용, scss 작성시 watch가 멈추지 않도록 logError 설정
  .pipe( postCss(options.postcss) )                       // 하위 브라우저 고려
  .pipe( sourcemaps.write() )                             // 소스맵 적용
  .pipe( gulp.dest(DEST_PATH.ASSETS.CSS) )                // 컴파일 후 css파일이 생성될 목적지 설정
  //.pipe( browserSync.reload({stream: true}) )             // 파일 변경 시 브라우저에 반영
  // *.min.css 생성
  .pipe( minificss() )                                    // 컴파일된 css 압축
  .pipe( rename({ suffix: '.min' }) )                     // 압축파일 *.min.css 생성
  .pipe( sourcemaps.write() )                             // 소스맵 적용
  .pipe( gulp.dest(DEST_PATH.ASSETS.CSS) )                // 컴파일 후 css파일이 생성될 목적지 설정
  //.pipe( browserSync.reload({stream: true}) );            // 파일 변경 시 브라우저에 반영
}

// images
const img = () => {
  return gulp.src( PATH.ASSETS.IMAGES + '/**/*' )
  //.pipe(image())
  .pipe( gulp.dest(DEST_PATH.ASSETS.IMAGES) );
}

// js
const js = () => {
  return gulp.src([
    PATH.ASSETS.JS + '/*',
    '!' + PATH.ASSETS.JS + '/_*'
  ])
  // .pipe( sourcemaps.init({ loadMaps: true }) )
  // .pipe( bro({
  //   transform: [
  //     babelify.configure({ /*sourceMaps: 'both', root: src,*/ presets: ['@babel/preset-env'] }),
  //     //[ 'uglifyify', { global: true, sourceMap: true  } ]
  //   ]
  // }) )
  // .pipe( sourcemaps.write('./') )
  .pipe(minify({
    ext: {
      min: '.min.js'
    },
    ignoreFiles: ['-min.js']
  }))
  .pipe( gulp.dest(DEST_PATH.ASSETS.JS) );
}

// library
const lib = () => {
  return gulp.src( PATH.ASSETS.LIB + '/**/*' )
    .pipe( gulp.dest( DEST_PATH.ASSETS.LIB ) );
}

// code sample
const code_sample = () => {
  // return gulp.src( src + '/code_samples/**/*' )
  // .pipe( gulp.dest( dist + '/_code_samples' ) );
  return gulp.src( PATH.SAMPLE + '/**/*' )
  .pipe( cached('code_sample') )
  .pipe( gulp.dest( DEST_PATH.SAMPLE ) );
}

// web config
const web_config = () => {
  return gulp.src( './web.config' )
  .pipe( gulp.dest( dist ) );
}

// nojekyll
const nojekyll = () => {
  return gulp.src( './.nojekyll' )
  .pipe( gulp.dest( dist ) );
}


// etc -----------------------------------------------------------------------------------------------------------------

// clean
const clean = () => del([dist]);
const cleanDeploy = () => del([".publish"]);

// webserver
const webserver = () => gulp.src(dist).pipe(ws({ /*port: 8000,*/ livereload: true, open: true }));

// watch
const watch = () => {
  const html_watcher = gulp.watch(PATH.HTML + "/**/*", html);
  file_management(html_watcher, PATH.HTML, DEST_PATH.HTML);

  const code_samples_watcher = gulp.watch(PATH.SAMPLE + "/**/*", code_sample);
  file_management(code_samples_watcher, PATH.SAMPLE, DEST_PATH.SAMPLE);

  const img_watcher = gulp.watch(PATH.ASSETS.IMAGES + "/**/*", img);
  file_management(img_watcher, PATH.ASSETS.IMAGES, DEST_PATH.ASSETS.IMAGES);

  const scss_watcher = gulp.watch(PATH.ASSETS.CSS + "/**/*", css);
  file_management(scss_watcher, PATH.ASSETS.CSS, DEST_PATH.ASSETS.CSS);

  const js_watcher = gulp.watch(PATH.ASSETS.JS + "/**/*", js);
  file_management(js_watcher, PATH.ASSETS.JS, DEST_PATH.ASSETS.JS);

  const lib_watcher = gulp.watch(PATH.ASSETS.LIB + "/**/*", lib);
  file_management(lib_watcher, PATH.ASSETS.LIB, DEST_PATH.ASSETS.LIB);
}
const file_management = (watcher_target, src_path, dist_path) => {
  watcher_target.on('unlink', (filepath) => {
    const filePathFromSrc = path.relative(path.resolve(src_path), filepath);
    const extension_type = filePathFromSrc.split('.')[filePathFromSrc.split('.').length-1];

    // scss 삭제 (min파일까지 생성했을 때)
    if( extension_type === 'scss' ){
      const destFilePath_css = path.resolve(dist_path, filePathFromSrc).replace('scss','css');
      del.sync(destFilePath_css);
      const destFilePath_minCss = path.resolve(dist_path, filePathFromSrc).replace('scss','min.css');
      del.sync(destFilePath_minCss);
    }
    // html 삭제 (js. images, fonts 등은 task 생성하면서 테스트 예정)
    else{
      const destFilePath = path.resolve(dist_path, filePathFromSrc);
      del.sync(destFilePath);
    }
  });
}

// github pages
const gh = () => {
  return gulp.src(dist+"/**/*")
  .pipe(ghPages({
    branch: "view-pages"
  }));
}


// build ---------------------------------------------------------------------------------------------------------------
const prepare = gulp.series([ clean, img ]);
const assets = gulp.series([ html, css, js, lib, code_sample, web_config, nojekyll ]);
const live = gulp.parallel([ webserver, watch ]);

export const build = gulp.series([ prepare, assets ]);
export const dev = gulp.series([ build, live ]);
export const deploy = gulp.series([ gh, cleanDeploy ]);