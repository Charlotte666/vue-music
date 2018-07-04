# Love Music
![author](https://img.shields.io/badge/author-wangjiahuan-brightgreen.svg)
![version](https://img.shields.io/badge/version-v1.0.0-ff69b4.svg) 
[ ![语言 中文](https://img.shields.io/badge/语言-中文-orange.svg)](https://github.com/MrWangjiahuan/vue-music)

Suggest a direct scavenging experience!

![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/code.png)

👉 Project demo address 1: http://wangjiahuan.top (At the PC side, please look at the browser's mobile mode)

👉 Project demo address 2: http://www.wangjiahuan.top (At the PC side, please look at the browser's mobile mode)


Based on the **Vue family barrel (2.x)** made, an independent development of the original mobile end of the mobile end of music App, complete project, complete function, UI beautiful, interactive first class.

![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/1.png)
![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/2.png)

![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/3.png)
![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/4.png)

![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/5.png)
![图片预览](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/6.png)


## technology stack

【Front end】

- `Vue`：The MVVM framework used to build a user interface. Its core is ** response data binding ** and ** group system **
- `vue-router`：The routing system provided for single page application is used before the project is launched `Lazy Loading Routes` technology to achieve asynchronous loading optimization
- `vuex`：Vue centralized state management is very convenient when multiple components share certain states
- `vue-lazyload`：Third party picture lazy loading library, optimize page loading speed
- `vux`：The mobile terminal UI component library based on WeUI and Vue.js provides rich components to meet the common business needs of mobile terminals (WeChat) pages.
- `better-scroll`：Optimized version of iscroll enables mobile terminal to slide more smoothly.
- `stylus and less`：CSS precompiler
- `ES6`：ECMAScript new generation of grammar, modularity, deconstruction assignment, Promise, Class and other methods are very good.

【back-end】

- `Node.js`：Using Express to serve as a local test server
- `jsonp`：Server-side communication. Grab QQ music data
- `axios`：Server-side communication. Combining Node.js agent backend request to grab QQ music data

【Automated construction and other tools】

- `vue-cli`：Vue scaffolding tools, quick initialization of project code
- `webpack`：It is a module loader and packaging tool that can use and process resources such as JS (including JSX), coffee, style (including less/sass/stylus), and pictures as modules.
- `eslint`：Code style checking tool, specification code writing (the item is temporarily annotated)
- `vConsole`：Mobile end debugger, log on the mobile end


## Harvest

1. A set of Vue generic components that can reuse 15+ basic components and 25+ business components in other projects is summarized.
2. A set of common `stylus mixin` libraries is summarized
3. A common set of `JS` tool functions is summarized.
4. Realize the convenience brought by component-based and modular development.
5. Realize the convenience of encapsulating objects into `ES6 class`, and initialize class instances in factory mode.
6. Learn to write transitional effects and animation effects using `js` to create a good user interaction experience.
7. Learn how to use convenient component libraries for development, such as `vux's tab and swiper`.


## TODO

1. All data comes from QQ music. If interface changes, `jsonp` and `axios` code may be modified.
2. I will constantly optimize the page experience

## Implement details

Main pages: the player kernel page, (home page) recommendation page, singsong detail page, singer page, singer detail page, new song page, album page, introduction page, rankings page, search page, song page, personal center page, etc.

Core page: player kernel page, home page, singer page, new song page

**Component tree**

```
<app> ................... Root component
  <player> .............. Global player kernel components
  <header> .............. Head component
  <router-view> ......... Route
    <recommend> ......... Recommendation page (Music Hall)
    <singer> ............ Singer page
    <rank> .............. Rankings page
    <type> .............. Classified sheet page
    <radio-station> ..... Radio page
    <search> ............ Search page
    <user-center> ....... Personal center page
    <about> ............. About page
```

**Recommendation page (Music Hall)**

The above part is a carousel chart component, which is implemented by using the third party library `better-scroll`, and uses the `jsonp` to grab the QQ music (mobile end) data.

The next part is a list of singer recommendation, using the `axios + Node.js` proxy back end request, bypassing the host limit (forged headers), and grabbing the QQ music (PC) data

Song list recommended list of pictures, using picture lazy loading technology `vue-lazyload`, optimize page loading speed.

For better user experience, the `loading` component is displayed when data is not requested.

**Singer page**

The left and right linkage is the difficulty of this component

On the left is a list of singers, using `jsonp` to grab QQ music (PC end) singer data and restructure JSON data structure.

List pictures using lazy loading technology `vue-lazyload` to optimize page loading speed.

On the right is an alphabet list, linked to the left singer list, and the rolling fixed heading is implemented.

**Radio page**

The realization is about the same as the singer page

**Classified sheet page**

The upper part is the selected classification name

The next part is the song list under each category

It's easy to implement

**Player kernel page**

Core components. Use `vuex` to manage various playback status, play, pause and other function calls [audio API](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)

The player can be maximized and minimized

Central record animation uses the third party JS animation library `create-keyframe-animation`.

The bottom operation area icon uses `iconfonts`.

A lateral progress bar component and a circular progress bar component are abstracted. The lateral progress bar can drag the ball and click progress bar to change the playback progress. The circular progress bar component uses the SVG `<circle>` element

The playback modes are sequential play, single cycle and random play. The principle is to adjust the list of Songs List.

Lyrics crawl takes advantage of the `axios` agent's back-end request and forgeries `headers` to convert the lyrics jsonp format to JSON format, and then use the third party library [`js-base64`](https://github.com/dankogai/js-base64) base64 decoding operation, and finally use the third party library [`lyric-parser`](https://github.com/ustbhuangyi/lyric-parser) formatting the lyrics

It achieves the interactive effect of sideslip display, lyrics, and progress bar highlighting.

Added the current playlist component to which you can add / delete songs.

**Rankings page**

Common component


**Search page**

Grasping data, writing components, and doing the function of pull-up and refreshing according to the characteristics of data captured.

Considering the problem of large and frequent data, the request is throttled.

Taking account of the problem of mobile terminal keyboard occupation, `blur () operation of `input` before rolling is done.

`localstorage` cache was used for search history, and modified `confirm` components were used to empty search history.

Support to add search songs to the playlist

**Personal Center**

The "Favorites" and "recent playback" in `localstorage` are reflected on the interface.

**Other**

The whole data of this application comes from QQ music

Global general application level state using `vuex` centralized management

`fastclick` library is introduced globally to eliminate click mobile browser 300ms delay.

The page is responsive, adaptable to the common mobile terminal screen, using `flex` layout.

## Build Setup

``` bash
# clone the repo into your disk.
$ git clone https://github.com/MrWangjiahuan/vue-music.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build
```


## Welcome

![](https://github.com/MrWangjiahuan/vue-music/blob/master/Screenshots/star.jpg)
