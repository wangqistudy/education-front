(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{350:function(t,e,n){"use strict";n(101);var d=n(349),r=n.n(d);r.a.defineLocale("zh-cn",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"Ah点mm分",LTS:"Ah点m分s秒",L:"YYYY-MM-DD",LL:"YYYY年MMMD日",LLL:"YYYY年MMMD日Ah点mm分",LLLL:"YYYY年MMMD日ddddAh点mm分",l:"YYYY-MM-DD",ll:"YYYY年MMMD日",lll:"YYYY年MMMD日Ah点mm分",llll:"YYYY年MMMD日ddddAh点mm分"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(t,e){return 12===t&&(t=0),"凌晨"===e||"早上"===e||"上午"===e?t:"下午"===e||"晚上"===e?t+12:t>=11?t:t+12},meridiem:function(t,e,n){var d=100*t+e;return d<600?"凌晨":d<900?"早上":d<1130?"上午":d<1230?"中午":d<1800?"下午":"晚上"},calendar:{sameDay:function(){return 0===this.minutes()?"[今天]Ah[点整]":"[今天]LT"},nextDay:function(){return 0===this.minutes()?"[明天]Ah[点整]":"[明天]LT"},lastDay:function(){return 0===this.minutes()?"[昨天]Ah[点整]":"[昨天]LT"},nextWeek:function(){var t,e;return t=_moment__default().startOf("week"),e=this.unix()-t.unix()>=604800?"[下]":"[本]",0===this.minutes()?e+"dddAh点整":e+"dddAh点mm"},lastWeek:function(){var t,e;return t=_moment__default().startOf("week"),e=this.unix()<t.unix()?"[上]":"[本]",0===this.minutes()?e+"dddAh点整":e+"dddAh点mm"},sameElse:"LL"},ordinalParse:/\d{1,2}(日|月|周)/,ordinal:function(t,e){switch(e){case"d":case"D":case"DDD":return t+"日";case"M":return t+"月";case"w":case"W":return t+"周";default:return t}},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},week:{dow:1,doy:4}}),e.a=r.a},480:function(t,e,n){"use strict";var d=n(3);e.a={data:function(){return{}},mounted:function(){this.$startViewTamp=(new Date).getTime()},beforeDestroy:function(){this.getDisTime()},methods:{getDisTime:function(){this.$startViewEndTamp=(new Date).getTime(),this.$startViewTamp&&this.$startViewEndTamp&&this.reportViewTime&&this.reportViewTime(this.$startViewEndTamp-this.$startViewTamp)},reportViewTime:function(t){this.searchLogId>0&&d.a.report_search_log({duration:Math.ceil(t/1e3),searchLogId:this.searchLogId})},resetStart:function(){this.$startViewTamp=(new Date).getTime()}}}},483:function(t,e,n){var map={"./af":351,"./af.js":351,"./ar":352,"./ar-dz":353,"./ar-dz.js":353,"./ar-kw":354,"./ar-kw.js":354,"./ar-ly":355,"./ar-ly.js":355,"./ar-ma":356,"./ar-ma.js":356,"./ar-sa":357,"./ar-sa.js":357,"./ar-tn":358,"./ar-tn.js":358,"./ar.js":352,"./az":359,"./az.js":359,"./be":360,"./be.js":360,"./bg":361,"./bg.js":361,"./bm":362,"./bm.js":362,"./bn":363,"./bn.js":363,"./bo":364,"./bo.js":364,"./br":365,"./br.js":365,"./bs":366,"./bs.js":366,"./ca":367,"./ca.js":367,"./cs":368,"./cs.js":368,"./cv":369,"./cv.js":369,"./cy":370,"./cy.js":370,"./da":371,"./da.js":371,"./de":372,"./de-at":373,"./de-at.js":373,"./de-ch":374,"./de-ch.js":374,"./de.js":372,"./dv":375,"./dv.js":375,"./el":376,"./el.js":376,"./en-SG":377,"./en-SG.js":377,"./en-au":378,"./en-au.js":378,"./en-ca":379,"./en-ca.js":379,"./en-gb":380,"./en-gb.js":380,"./en-ie":381,"./en-ie.js":381,"./en-il":382,"./en-il.js":382,"./en-nz":383,"./en-nz.js":383,"./eo":384,"./eo.js":384,"./es":385,"./es-do":386,"./es-do.js":386,"./es-us":387,"./es-us.js":387,"./es.js":385,"./et":388,"./et.js":388,"./eu":389,"./eu.js":389,"./fa":390,"./fa.js":390,"./fi":391,"./fi.js":391,"./fo":392,"./fo.js":392,"./fr":393,"./fr-ca":394,"./fr-ca.js":394,"./fr-ch":395,"./fr-ch.js":395,"./fr.js":393,"./fy":396,"./fy.js":396,"./ga":397,"./ga.js":397,"./gd":398,"./gd.js":398,"./gl":399,"./gl.js":399,"./gom-latn":400,"./gom-latn.js":400,"./gu":401,"./gu.js":401,"./he":402,"./he.js":402,"./hi":403,"./hi.js":403,"./hr":404,"./hr.js":404,"./hu":405,"./hu.js":405,"./hy-am":406,"./hy-am.js":406,"./id":407,"./id.js":407,"./is":408,"./is.js":408,"./it":409,"./it-ch":410,"./it-ch.js":410,"./it.js":409,"./ja":411,"./ja.js":411,"./jv":412,"./jv.js":412,"./ka":413,"./ka.js":413,"./kk":414,"./kk.js":414,"./km":415,"./km.js":415,"./kn":416,"./kn.js":416,"./ko":417,"./ko.js":417,"./ku":418,"./ku.js":418,"./ky":419,"./ky.js":419,"./lb":420,"./lb.js":420,"./lo":421,"./lo.js":421,"./lt":422,"./lt.js":422,"./lv":423,"./lv.js":423,"./me":424,"./me.js":424,"./mi":425,"./mi.js":425,"./mk":426,"./mk.js":426,"./ml":427,"./ml.js":427,"./mn":428,"./mn.js":428,"./mr":429,"./mr.js":429,"./ms":430,"./ms-my":431,"./ms-my.js":431,"./ms.js":430,"./mt":432,"./mt.js":432,"./my":433,"./my.js":433,"./nb":434,"./nb.js":434,"./ne":435,"./ne.js":435,"./nl":436,"./nl-be":437,"./nl-be.js":437,"./nl.js":436,"./nn":438,"./nn.js":438,"./pa-in":439,"./pa-in.js":439,"./pl":440,"./pl.js":440,"./pt":441,"./pt-br":442,"./pt-br.js":442,"./pt.js":441,"./ro":443,"./ro.js":443,"./ru":444,"./ru.js":444,"./sd":445,"./sd.js":445,"./se":446,"./se.js":446,"./si":447,"./si.js":447,"./sk":448,"./sk.js":448,"./sl":449,"./sl.js":449,"./sq":450,"./sq.js":450,"./sr":451,"./sr-cyrl":452,"./sr-cyrl.js":452,"./sr.js":451,"./ss":453,"./ss.js":453,"./sv":454,"./sv.js":454,"./sw":455,"./sw.js":455,"./ta":456,"./ta.js":456,"./te":457,"./te.js":457,"./tet":458,"./tet.js":458,"./tg":459,"./tg.js":459,"./th":460,"./th.js":460,"./tl-ph":461,"./tl-ph.js":461,"./tlh":462,"./tlh.js":462,"./tr":463,"./tr.js":463,"./tzl":464,"./tzl.js":464,"./tzm":465,"./tzm-latn":466,"./tzm-latn.js":466,"./tzm.js":465,"./ug-cn":467,"./ug-cn.js":467,"./uk":468,"./uk.js":468,"./ur":469,"./ur.js":469,"./uz":470,"./uz-latn":471,"./uz-latn.js":471,"./uz.js":470,"./vi":472,"./vi.js":472,"./x-pseudo":473,"./x-pseudo.js":473,"./yo":474,"./yo.js":474,"./zh-cn":475,"./zh-cn.js":475,"./zh-hk":476,"./zh-hk.js":476,"./zh-tw":477,"./zh-tw.js":477};function d(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}d.keys=function(){return Object.keys(map)},d.resolve=r,t.exports=d,d.id=483},526:function(t,e,n){var content=n(611);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("1e17c700",content,!0,{sourceMap:!1})},610:function(t,e,n){"use strict";var d=n(526);n.n(d).a},611:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,".video-detail-wrap[data-v-d24500ac],.video-detail-wrap .video-detail-inner[data-v-d24500ac]{width:100%}.video-detail-wrap .video-detail-inner .detail-container[data-v-d24500ac]{width:1200px;margin:0 auto;padding-top:20px}.video-detail-wrap .video-detail-inner .detail-container .detail-content[data-v-d24500ac]{width:100%;background-color:#fff}.video-detail-wrap .video-detail-inner .detail-container .detail-content .content-header[data-v-d24500ac]{width:100%;height:50px;background-color:#e3f1ff;line-height:50px;padding-left:36px;color:#0566ce;font-size:16px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml[data-v-d24500ac]{min-height:720px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc[data-v-d24500ac]{width:680px;margin:0 auto;padding-top:10px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .header[data-v-d24500ac]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;margin-bottom:30px;padding:0 10px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .header h2[data-v-d24500ac]{font-size:16px;color:#333}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .header p[data-v-d24500ac]{font-size:14px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .header p .teacher a[data-v-d24500ac]{color:#0566ce}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .header p .lessonCount span[data-v-d24500ac]{color:#ff7885}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .video-content[data-v-d24500ac]{width:100%;height:382px;background-color:#000}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .video_desc .video-content #video[data-v-d24500ac]{width:100%;height:100%}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .lesson-hours[data-v-d24500ac]{width:1000px;margin:38px auto 0}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .lesson-hours .header-name[data-v-d24500ac],.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .lesson-hours h3[data-v-d24500ac]{font-size:16px;color:#333}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .lesson-hours .outline[data-v-d24500ac]{padding-left:38px;padding-top:20px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .lesson-hours .outline[data-v-d24500ac] img{max-width:80%;margin-bottom:20px}.video-detail-wrap .video-detail-inner .detail-container .detail-content .contentHtml .lesson-hours .outline[data-v-d24500ac] p{text-indent:2em;margin-bottom:20px}",""])},643:function(t,e,n){"use strict";n.r(e);n(12);var d=n(3),r=n(350),o=(n(25),n(2));function c(){return(c=Object(o.a)(regeneratorRuntime.mark((function t(e){var n,r,param,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isDev,n=e.route,e.store,e.env,e.params,e.query,e.req,e.res,e.redirect,e.error,t.abrupt("return",{});case 3:return r=n.params.id,param={id:r},t.next=8,d.a.video_detail(param);case 8:return o=t.sent,t.abrupt("return",{info:o.data,firstRender:!0});case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var l={name:"videoDetail",asyncData:function(t){return c.apply(this,arguments)},mixins:[n(480).a],mounted:function(){this.firstRender||(this.firstRender=!1,this.getInfo())},head:function(){return{title:"视频详情-少儿编程教育",meta:[{hid:"description",name:"description",content:"少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课"}]}},data:function(){return{info:{}}},computed:{},filters:{localtimeFilter:function(t){return Object(r.a)(t).format("LL")}},methods:{getInfo:function(){var t=this;return new Promise((function(e,n){var r=t.$route.params.id;d.a.video_detail({id:r}).then((function(data){t.info=data.data,e()})).catch((function(){n()}))}))}}},m=(n(610),n(8)),component=Object(m.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"video-detail-wrap"},[n("div",{staticClass:"video-detail-inner"},[n("div",{staticClass:"detail-container"},[n("div",{staticClass:"detail-content"},[t._m(0),t._v(" "),n("div",{staticClass:"contentHtml"},[n("div",{staticClass:"lesson-hours"},[n("h2",{staticClass:"header-name"},[t._v("\n                        "+t._s(t.info.title)+"\n                      ")])]),t._v(" "),n("div",{staticClass:"video_desc"},[n("div",{staticClass:"header"},[n("p",{staticClass:"header-desc"},[n("span",{staticClass:"teacher"},[t._v("主讲： "),n("router-link",{attrs:{to:"/teacher/"+t.info.teacher_id}},[t._v(t._s(t.info.teacherName))])],1)])]),t._v(" "),n("div",{staticClass:"video-content"},[t.info.url?n("video",{attrs:{id:"video",controls:"",preload:"none",width:"680",height:"382",poster:t.info.thumbnail}},[n("source",{attrs:{src:t.info.url,type:"video/mp4"}})]):t._e()])]),t._v(" "),n("div",{staticClass:"lesson-hours"},[n("h3",[t._v("课程大纲 ")]),t._v(" "),n("div",{staticClass:"outline",domProps:{innerHTML:t._s(t.info.detail)}})])])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-header"},[e("span",[this._v("课程详情")])])}],!1,null,"d24500ac",null);e.default=component.exports}}]);