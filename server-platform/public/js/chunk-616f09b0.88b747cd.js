(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-616f09b0"],{"057f":function(t,e,n){var r=n("fc6a"),o=n("241c").f,a={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==a.call(t)?c(t):o(r(t))}},"0797":function(t,e,n){"use strict";n("3e50")},"0ccb":function(t,e,n){var r=n("50c4"),o=n("577e"),a=n("1148"),i=n("1d80"),c=Math.ceil,u=function(t){return function(e,n,u){var s,l,f=o(i(e)),d=f.length,p=void 0===u?" ":o(u),g=r(n);return g<=d||""==p?f:(s=g-d,l=a.call(p,c(s/p.length)),l.length>s&&(l=l.slice(0,s)),t?f+l:l+f)}};t.exports={start:u(!1),end:u(!0)}},"107c":function(t,e,n){var r=n("d039"),o=n("da84"),a=o.RegExp;t.exports=r((function(){var t=a("(?<a>b)","g");return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")}))},1148:function(t,e,n){"use strict";var r=n("a691"),o=n("577e"),a=n("1d80");t.exports=function(t){var e=o(a(this)),n="",i=r(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(n+=e);return n}},1276:function(t,e,n){"use strict";var r=n("d784"),o=n("44e7"),a=n("825a"),i=n("1d80"),c=n("4840"),u=n("8aa5"),s=n("50c4"),l=n("577e"),f=n("14c3"),d=n("9263"),p=n("9f7f"),g=n("d039"),b=p.UNSUPPORTED_Y,v=[].push,h=Math.min,m=4294967295,x=!g((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));r("split",(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=l(i(this)),a=void 0===n?m:n>>>0;if(0===a)return[];if(void 0===t)return[r];if(!o(t))return e.call(r,t,a);var c,u,s,f=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,b=new RegExp(t.source,p+"g");while(c=d.call(b,r)){if(u=b.lastIndex,u>g&&(f.push(r.slice(g,c.index)),c.length>1&&c.index<r.length&&v.apply(f,c.slice(1)),s=c[0].length,g=u,f.length>=a))break;b.lastIndex===c.index&&b.lastIndex++}return g===r.length?!s&&b.test("")||f.push(""):f.push(r.slice(g)),f.length>a?f.slice(0,a):f}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var o=i(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,o,n):r.call(l(o),e,n)},function(t,o){var i=a(this),d=l(t),p=n(r,i,d,o,r!==e);if(p.done)return p.value;var g=c(i,RegExp),v=i.unicode,x=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(b?"g":"y"),y=new g(b?"^(?:"+i.source+")":i,x),w=void 0===o?m:o>>>0;if(0===w)return[];if(0===d.length)return null===f(y,d)?[d]:[];var O=0,I=0,S=[];while(I<d.length){y.lastIndex=b?0:I;var E,j=f(y,b?d.slice(I):d);if(null===j||(E=h(s(y.lastIndex+(b?I:0)),d.length))===O)I=u(d,I,v);else{if(S.push(d.slice(O,I)),S.length===w)return S;for(var P=1;P<=j.length-1;P++)if(S.push(j[P]),S.length===w)return S;I=O=E}}return S.push(d.slice(O)),S}]}),!x,b)},"14c3":function(t,e,n){var r=n("c6b6"),o=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var a=n.call(t,e);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"3e50":function(t,e,n){},"428f":function(t,e,n){var r=n("da84");t.exports=r},"44e7":function(t,e,n){var r=n("861d"),o=n("c6b6"),a=n("b622"),i=a("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},"4d90":function(t,e,n){"use strict";var r=n("23e7"),o=n("0ccb").start,a=n("9a0c");r({target:"String",proto:!0,forced:a},{padStart:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"4de4":function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").filter,a=n("1dde"),i=a("filter");r({target:"Array",proto:!0,forced:!i},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("b64b"),n("a4d3"),n("4de4"),n("e439"),n("159b"),n("dbb4");function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},6322:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"upload-container p-r"},[r("transition",{attrs:{name:"upload",mode:"out-in",duration:500}},[t.isUploaded?r("div",{key:2},[r("h1",[r("span",[t._v("歌曲信息")])]),r("el-form",{staticClass:"upload-form",attrs:{"label-width":"130px"}},[r("el-form-item",{attrs:{label:"歌名："}},[r("el-input",{model:{value:t.uploadInfo.songName,callback:function(e){t.$set(t.uploadInfo,"songName",e)},expression:"uploadInfo.songName"}})],1),r("el-form-item",{attrs:{label:"歌长："}},[r("el-input",{attrs:{disabled:""},model:{value:t.uploadInfo.songTime,callback:function(e){t.$set(t.uploadInfo,"songTime",e)},expression:"uploadInfo.songTime"}})],1),r("el-form-item",{attrs:{label:"歌曲性质："}},[r("el-radio-group",{model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.radioGroup,(function(e){return r("el-radio",{key:e.value,attrs:{label:e.value,title:e.title}},[t._v(t._s(e.label))])})),1)],1),r("el-form-item",[r("el-button",{staticStyle:{width:"100%","border-radius":"0"},attrs:{type:"primary"},on:{click:t.addSong}},[t._v("提交")])],1)],1)],1):r("div",{key:1},[r("img",{class:{hide:!t.loading},staticStyle:{width:"20%","margin-bottom":"-100px"},attrs:{src:n("cf1c"),alt:""}}),r("p",{staticStyle:{"margin-bottom":"27px"}},[t._v(" 亲，你可以在这里上传歌曲，然后到"),r("span",{staticStyle:{color:"#14a9ff",cursor:"pointer"},on:{click:t.routerToManageSong}},[t._v("我的上传歌曲")]),t._v("进行管理 ")]),r("el-upload",{staticClass:"upload-demo",attrs:{drag:"","show-file-list":!1,action:t.actionUrl,name:"mp3",limit:1,"on-success":t.successUpload,"before-upload":t.beforeUpload,"on-error":t.showErrorMessage}},[r("i",{staticClass:"el-icon-upload"}),r("div",{staticClass:"el-upload__text"},[t._v("将歌曲拖到此处，或"),r("em",[t._v("点击上传")])]),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("上传歌曲，支持mp3")])])],1)])],1)},o=[],a=n("1da1"),i=n("5530"),c=(n("96cf"),n("b0c0"),n("2f62")),u=n("cadb"),s={data:function(){return{actionUrl:"/api/upload/song",type:1,radioGroup:[{title:"创作歌曲包含自己唱的，作者同意的上传，或已经有版权的，此歌曲上传后需由管理员审核，若审核不过，将会默认转为他人歌曲",label:"创作歌曲",value:1},{title:"他人歌曲为他人歌曲，未经过他人同意上传，仅供自己在歌单内播放不会发布到平台上作为共享资源",label:"他人歌曲",value:2}],loading:!1,isUploaded:!1,uploadInfo:{url:"",songName:"",songTime:"",duration:0}}},created:function(){document.title="上传"},computed:Object(i["a"])({},Object(c["c"])("User",["userId"])),methods:{beforeUpload:function(t){this.loading=!0;var e=t.name.lastIndexOf(".");this.uploadInfo.songName=e>=0?t.name.substring(0,e):t.name},showErrorMessage:function(){this.$message({message:"抱歉出错了哦",type:"error",duration:1500})},successUpload:function(t,e){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r,o,a,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.code,o=t.data,200!==r){e.next=11;break}return n.uploadInfo.url=o,e.next=5,n.$api.requestSongLen({url:o});case 5:a=e.sent,i=a.code,c=a.data,200===i&&(n.uploadInfo.duration=c,n.uploadInfo.songTime=Object(u["b"])(c),n.loading=!1,n.isUploaded=!0),e.next=12;break;case 11:n.showErrorMessage();case 12:case"end":return e.stop()}}),e)})))()},addSong:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.storeSongInfo({url:t.uploadInfo.url,UserId:t.userId,originName:t.uploadInfo.songName,duration:t.uploadInfo.duration,type:t.type});case 2:n=e.sent,r=n.code,o=n.data,200===r?t.$message({message:"成功添加歌曲",type:"success",duration:1500}):t.$message({message:o,type:"error",duration:1500});case 6:case"end":return e.stop()}}),e)})))()},routerToManageSong:function(){var t=this;this.$router.push({name:"OwnSong"},(function(){t.$nextTick((function(){t.eventBus.$emit("updateNavbar")}))}))}}},l=s,f=(n("0797"),n("2877")),d=Object(f["a"])(l,r,o,!1,null,"41a8d488",null);e["default"]=d.exports},"746f":function(t,e,n){var r=n("428f"),o=n("5135"),a=n("e538"),i=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});o(e,t)||i(e,t,{value:a.f(t)})}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("577e"),o=n("ad6d"),a=n("9f7f"),i=n("5692"),c=n("7c73"),u=n("69f3").get,s=n("fce3"),l=n("107c"),f=RegExp.prototype.exec,d=i("native-string-replace",String.prototype.replace),p=f,g=function(){var t=/a/,e=/b*/g;return f.call(t,"a"),f.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),b=a.UNSUPPORTED_Y||a.BROKEN_CARET,v=void 0!==/()??/.exec("")[1],h=g||v||b||s||l;h&&(p=function(t){var e,n,a,i,s,l,h,m=this,x=u(m),y=r(t),w=x.raw;if(w)return w.lastIndex=m.lastIndex,e=p.call(w,y),m.lastIndex=w.lastIndex,e;var O=x.groups,I=b&&m.sticky,S=o.call(m),E=m.source,j=0,P=y;if(I&&(S=S.replace("y",""),-1===S.indexOf("g")&&(S+="g"),P=y.slice(m.lastIndex),m.lastIndex>0&&(!m.multiline||m.multiline&&"\n"!==y.charAt(m.lastIndex-1))&&(E="(?: "+E+")",P=" "+P,j++),n=new RegExp("^(?:"+E+")",S)),v&&(n=new RegExp("^"+E+"$(?!\\s)",S)),g&&(a=m.lastIndex),i=f.call(I?n:m,P),I?i?(i.input=i.input.slice(j),i[0]=i[0].slice(j),i.index=m.lastIndex,m.lastIndex+=i[0].length):m.lastIndex=0:g&&i&&(m.lastIndex=m.global?i.index+i[0].length:a),v&&i&&i.length>1&&d.call(i[0],n,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(i[s]=void 0)})),i&&O)for(i.groups=l=c(null),s=0;s<O.length;s++)h=O[s],l[h[0]]=i[h[1]];return i}),t.exports=p},"9a0c":function(t,e,n){var r=n("342f");t.exports=/Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(r)},"9f7f":function(t,e,n){var r=n("d039"),o=n("da84"),a=o.RegExp;e.UNSUPPORTED_Y=r((function(){var t=a("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=a("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a4d3:function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),a=n("d066"),i=n("c430"),c=n("83ab"),u=n("4930"),s=n("d039"),l=n("5135"),f=n("e8b5"),d=n("861d"),p=n("d9b5"),g=n("825a"),b=n("7b0b"),v=n("fc6a"),h=n("a04b"),m=n("577e"),x=n("5c6c"),y=n("7c73"),w=n("df75"),O=n("241c"),I=n("057f"),S=n("7418"),E=n("06cf"),j=n("9bf2"),P=n("d1e7"),R=n("9112"),k=n("6eeb"),_=n("5692"),N=n("f772"),T=n("d012"),U=n("90e3"),M=n("b622"),$=n("e538"),C=n("746f"),D=n("d44e"),A=n("69f3"),J=n("b727").forEach,B=N("hidden"),Y="Symbol",F="prototype",G=M("toPrimitive"),K=A.set,W=A.getterFor(Y),q=Object[F],L=o.Symbol,Q=a("JSON","stringify"),V=E.f,z=j.f,H=I.f,X=P.f,Z=_("symbols"),tt=_("op-symbols"),et=_("string-to-symbol-registry"),nt=_("symbol-to-string-registry"),rt=_("wks"),ot=o.QObject,at=!ot||!ot[F]||!ot[F].findChild,it=c&&s((function(){return 7!=y(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=V(q,e);r&&delete q[e],z(t,e,n),r&&t!==q&&z(q,e,r)}:z,ct=function(t,e){var n=Z[t]=y(L[F]);return K(n,{type:Y,tag:t,description:e}),c||(n.description=e),n},ut=function(t,e,n){t===q&&ut(tt,e,n),g(t);var r=h(e);return g(n),l(Z,r)?(n.enumerable?(l(t,B)&&t[B][r]&&(t[B][r]=!1),n=y(n,{enumerable:x(0,!1)})):(l(t,B)||z(t,B,x(1,{})),t[B][r]=!0),it(t,r,n)):z(t,r,n)},st=function(t,e){g(t);var n=v(e),r=w(n).concat(gt(n));return J(r,(function(e){c&&!ft.call(n,e)||ut(t,e,n[e])})),t},lt=function(t,e){return void 0===e?y(t):st(y(t),e)},ft=function(t){var e=h(t),n=X.call(this,e);return!(this===q&&l(Z,e)&&!l(tt,e))&&(!(n||!l(this,e)||!l(Z,e)||l(this,B)&&this[B][e])||n)},dt=function(t,e){var n=v(t),r=h(e);if(n!==q||!l(Z,r)||l(tt,r)){var o=V(n,r);return!o||!l(Z,r)||l(n,B)&&n[B][r]||(o.enumerable=!0),o}},pt=function(t){var e=H(v(t)),n=[];return J(e,(function(t){l(Z,t)||l(T,t)||n.push(t)})),n},gt=function(t){var e=t===q,n=H(e?tt:v(t)),r=[];return J(n,(function(t){!l(Z,t)||e&&!l(q,t)||r.push(Z[t])})),r};if(u||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?m(arguments[0]):void 0,e=U(t),n=function(t){this===q&&n.call(tt,t),l(this,B)&&l(this[B],e)&&(this[B][e]=!1),it(this,e,x(1,t))};return c&&at&&it(q,e,{configurable:!0,set:n}),ct(e,t)},k(L[F],"toString",(function(){return W(this).tag})),k(L,"withoutSetter",(function(t){return ct(U(t),t)})),P.f=ft,j.f=ut,E.f=dt,O.f=I.f=pt,S.f=gt,$.f=function(t){return ct(M(t),t)},c&&(z(L[F],"description",{configurable:!0,get:function(){return W(this).description}}),i||k(q,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:L}),J(w(rt),(function(t){C(t)})),r({target:Y,stat:!0,forced:!u},{for:function(t){var e=m(t);if(l(et,e))return et[e];var n=L(e);return et[e]=n,nt[n]=e,n},keyFor:function(t){if(!p(t))throw TypeError(t+" is not a symbol");if(l(nt,t))return nt[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),r({target:"Object",stat:!0,forced:!u,sham:!c},{create:lt,defineProperty:ut,defineProperties:st,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:pt,getOwnPropertySymbols:gt}),r({target:"Object",stat:!0,forced:s((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(b(t))}}),Q){var bt=!u||s((function(){var t=L();return"[null]"!=Q([t])||"{}"!=Q({a:t})||"{}"!=Q(Object(t))}));r({target:"JSON",stat:!0,forced:bt},{stringify:function(t,e,n){var r,o=[t],a=1;while(arguments.length>a)o.push(arguments[a++]);if(r=e,(d(e)||void 0!==t)&&!p(t))return f(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!p(e))return e}),o[1]=e,Q.apply(null,o)}})}L[F][G]||R(L[F],G,L[F].valueOf),D(L,Y),T[B]=!0},ac1f:function(t,e,n){"use strict";var r=n("23e7"),o=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b64b:function(t,e,n){var r=n("23e7"),o=n("7b0b"),a=n("df75"),i=n("d039"),c=i((function(){a(1)}));r({target:"Object",stat:!0,forced:c},{keys:function(t){return a(o(t))}})},cadb:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}));n("99af"),n("4d90"),n("ac1f"),n("1276");function r(t){var e=Math.round(t)%60+"",n=Math.floor(Math.round(t)/60)+"";return"".concat(n.padStart(2,"0")," : ").concat(e.padStart(2,"0"))}function o(t){var e=t+"",n=e.indexOf("."),r="000";n>=0&&(r=e.split(".")[1].substring(0,3)),t=Math.floor(t);var o=Math.round(t)%60+"",a=Math.floor(Math.round(t)/60)+"";return"".concat(a.padStart(2,"0"),":").concat(o.padStart(2,"0"),".").concat(r)}},cf1c:function(t,e,n){t.exports=n.p+"img/loading.cd5e6c6c.gif"},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),o=n("9263"),a=n("d039"),i=n("b622"),c=n("9112"),u=i("species"),s=RegExp.prototype;t.exports=function(t,e,n,l){var f=i(t),d=!a((function(){var e={};return e[f]=function(){return 7},7!=""[t](e)})),p=d&&!a((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[f]=/./[f]),n.exec=function(){return e=!0,null},n[f](""),!e}));if(!d||!p||n){var g=/./[f],b=e(f,""[t],(function(t,e,n,r,a){var i=e.exec;return i===o||i===s.exec?d&&!a?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}));r(String.prototype,t,b[0]),r(s,f,b[1])}l&&c(s[f],"sham",!0)}},dbb4:function(t,e,n){var r=n("23e7"),o=n("83ab"),a=n("56ef"),i=n("fc6a"),c=n("06cf"),u=n("8418");r({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,n,r=i(t),o=c.f,s=a(r),l={},f=0;while(s.length>f)n=o(r,e=s[f++]),void 0!==n&&u(l,e,n);return l}})},e439:function(t,e,n){var r=n("23e7"),o=n("d039"),a=n("fc6a"),i=n("06cf").f,c=n("83ab"),u=o((function(){i(1)})),s=!c||u;r({target:"Object",stat:!0,forced:s,sham:!c},{getOwnPropertyDescriptor:function(t,e){return i(a(t),e)}})},e538:function(t,e,n){var r=n("b622");e.f=r},fce3:function(t,e,n){var r=n("d039"),o=n("da84"),a=o.RegExp;t.exports=r((function(){var t=a(".","s");return!(t.dotAll&&t.exec("\n")&&"s"===t.flags)}))}}]);
//# sourceMappingURL=chunk-616f09b0.88b747cd.js.map