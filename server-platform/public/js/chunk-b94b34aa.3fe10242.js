(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b94b34aa"],{"057f":function(t,e,n){var r=n("fc6a"),o=n("241c").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},"428f":function(t,e,n){var r=n("da84");t.exports=r},"4de4":function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").filter,i=n("1dde"),a=i("filter");r({target:"Array",proto:!0,forced:!a},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));n("b64b"),n("a4d3"),n("4de4"),n("e439"),n("159b"),n("dbb4");function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},"746f":function(t,e,n){var r=n("428f"),o=n("5135"),i=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});o(e,t)||a(e,t,{value:i.f(t)})}},7977:function(t,e,n){},"937b":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"ownContainer",staticClass:"own-container"},[n("div",{staticClass:"own-selecter-menu",on:{mouseleave:t.handleMouseLeave}},[t._l(t.menu,(function(e,r){return n("router-link",{key:e.title,ref:"selectItem",refInFor:!0,attrs:{to:e.to,"exact-active-class":"own-active-link"},nativeOn:{mouseover:function(e){return t.handleMouseOver(r)}}},[t._v(t._s(e.title))])})),n("div",{staticClass:"smooth-cursor",style:{width:t.cursorConfig.width+"px",left:t.cursorConfig.left+"px",transition:t.transition}})],2),n("div",{staticClass:"content"},[n("div",{staticClass:"own-left-content"},[n("el-avatar",{staticStyle:{margin:"0 auto","margin-top":"27px",display:"block"},attrs:{shape:"square",size:180,src:t.avatarUrl}}),n("p",[t._v("昵称:"+t._s(t.username))]),n("p",[t._v("(账号名:"+t._s(t.user)+")")])],1),n("div",{staticClass:"own-right-content"},[n("transition",{attrs:{name:"slide",appear:"",mode:"out-in",duration:500}},[n("router-view")],1)],1)])])},o=[],i=n("5530"),a=n("2f62"),s={data:function(){return{cursorConfig:{width:100,left:0},menu:[{title:"首页",to:"/own/home"},{title:"我的头像",to:"/own/avatar"},{title:"我的信息",to:"/own/change"},{title:"上传歌曲",to:"/own/upload"},{title:"我上传的歌曲",to:"/own/manage/song"},{title:"我的歌单",to:"/own/user/favlist"},{title:"我的关注",to:"/own/follow"},{title:"账号密码",to:"/own/user/safe"}],transition:"none"}},mounted:function(){var t=this;this.handleMouseLeave(),window.requestAnimationFrame((function(){t.transition="width 0.3s ease-in, left 0.3s ease-in"}))},computed:Object(i["a"])({},Object(a["c"])("User",["avatarUrl","username","user"])),created:function(){this.eventBus.$on("updateNavbar",this.handleMouseLeave)},methods:{handleMouseOver:function(t){var e=this.$refs.selectItem[t].$el;this.cursorConfig.left=e.offsetLeft,this.cursorConfig.width=e.offsetWidth},handleMouseLeave:function(){for(var t="own-active-link",e=0;e<this.$refs.selectItem.length;e++)if(this.$refs.selectItem[e].$el.classList.contains(t)){this.handleMouseOver(e);break}}}},c=s,f=(n("994b"),n("2877")),u=Object(f["a"])(c,r,o,!1,null,"5ed482d2",null);e["default"]=u.exports},"994b":function(t,e,n){"use strict";n("7977")},a4d3:function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),i=n("d066"),a=n("c430"),s=n("83ab"),c=n("4930"),f=n("d039"),u=n("5135"),l=n("e8b5"),d=n("861d"),b=n("d9b5"),v=n("825a"),h=n("7b0b"),p=n("fc6a"),w=n("a04b"),g=n("577e"),m=n("5c6c"),y=n("7c73"),O=n("df75"),j=n("241c"),P=n("057f"),S=n("7418"),k=n("06cf"),C=n("9bf2"),_=n("d1e7"),x=n("9112"),D=n("6eeb"),E=n("5692"),M=n("f772"),$=n("d012"),I=n("90e3"),L=n("b622"),N=n("e538"),F=n("746f"),J=n("d44e"),U=n("69f3"),q=n("b727").forEach,A=M("hidden"),T="Symbol",W="prototype",z=L("toPrimitive"),B=U.set,Q=U.getterFor(T),G=Object[W],H=o.Symbol,K=i("JSON","stringify"),R=k.f,V=C.f,X=P.f,Y=_.f,Z=E("symbols"),tt=E("op-symbols"),et=E("string-to-symbol-registry"),nt=E("symbol-to-string-registry"),rt=E("wks"),ot=o.QObject,it=!ot||!ot[W]||!ot[W].findChild,at=s&&f((function(){return 7!=y(V({},"a",{get:function(){return V(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=R(G,e);r&&delete G[e],V(t,e,n),r&&t!==G&&V(G,e,r)}:V,st=function(t,e){var n=Z[t]=y(H[W]);return B(n,{type:T,tag:t,description:e}),s||(n.description=e),n},ct=function(t,e,n){t===G&&ct(tt,e,n),v(t);var r=w(e);return v(n),u(Z,r)?(n.enumerable?(u(t,A)&&t[A][r]&&(t[A][r]=!1),n=y(n,{enumerable:m(0,!1)})):(u(t,A)||V(t,A,m(1,{})),t[A][r]=!0),at(t,r,n)):V(t,r,n)},ft=function(t,e){v(t);var n=p(e),r=O(n).concat(vt(n));return q(r,(function(e){s&&!lt.call(n,e)||ct(t,e,n[e])})),t},ut=function(t,e){return void 0===e?y(t):ft(y(t),e)},lt=function(t){var e=w(t),n=Y.call(this,e);return!(this===G&&u(Z,e)&&!u(tt,e))&&(!(n||!u(this,e)||!u(Z,e)||u(this,A)&&this[A][e])||n)},dt=function(t,e){var n=p(t),r=w(e);if(n!==G||!u(Z,r)||u(tt,r)){var o=R(n,r);return!o||!u(Z,r)||u(n,A)&&n[A][r]||(o.enumerable=!0),o}},bt=function(t){var e=X(p(t)),n=[];return q(e,(function(t){u(Z,t)||u($,t)||n.push(t)})),n},vt=function(t){var e=t===G,n=X(e?tt:p(t)),r=[];return q(n,(function(t){!u(Z,t)||e&&!u(G,t)||r.push(Z[t])})),r};if(c||(H=function(){if(this instanceof H)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?g(arguments[0]):void 0,e=I(t),n=function(t){this===G&&n.call(tt,t),u(this,A)&&u(this[A],e)&&(this[A][e]=!1),at(this,e,m(1,t))};return s&&it&&at(G,e,{configurable:!0,set:n}),st(e,t)},D(H[W],"toString",(function(){return Q(this).tag})),D(H,"withoutSetter",(function(t){return st(I(t),t)})),_.f=lt,C.f=ct,k.f=dt,j.f=P.f=bt,S.f=vt,N.f=function(t){return st(L(t),t)},s&&(V(H[W],"description",{configurable:!0,get:function(){return Q(this).description}}),a||D(G,"propertyIsEnumerable",lt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:H}),q(O(rt),(function(t){F(t)})),r({target:T,stat:!0,forced:!c},{for:function(t){var e=g(t);if(u(et,e))return et[e];var n=H(e);return et[e]=n,nt[n]=e,n},keyFor:function(t){if(!b(t))throw TypeError(t+" is not a symbol");if(u(nt,t))return nt[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!c,sham:!s},{create:ut,defineProperty:ct,defineProperties:ft,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:bt,getOwnPropertySymbols:vt}),r({target:"Object",stat:!0,forced:f((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(h(t))}}),K){var ht=!c||f((function(){var t=H();return"[null]"!=K([t])||"{}"!=K({a:t})||"{}"!=K(Object(t))}));r({target:"JSON",stat:!0,forced:ht},{stringify:function(t,e,n){var r,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(r=e,(d(e)||void 0!==t)&&!b(t))return l(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!b(e))return e}),o[1]=e,K.apply(null,o)}})}H[W][z]||x(H[W],z,H[W].valueOf),J(H,T),$[A]=!0},b64b:function(t,e,n){var r=n("23e7"),o=n("7b0b"),i=n("df75"),a=n("d039"),s=a((function(){i(1)}));r({target:"Object",stat:!0,forced:s},{keys:function(t){return i(o(t))}})},dbb4:function(t,e,n){var r=n("23e7"),o=n("83ab"),i=n("56ef"),a=n("fc6a"),s=n("06cf"),c=n("8418");r({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,n,r=a(t),o=s.f,f=i(r),u={},l=0;while(f.length>l)n=o(r,e=f[l++]),void 0!==n&&c(u,e,n);return u}})},e439:function(t,e,n){var r=n("23e7"),o=n("d039"),i=n("fc6a"),a=n("06cf").f,s=n("83ab"),c=o((function(){a(1)})),f=!s||c;r({target:"Object",stat:!0,forced:f,sham:!s},{getOwnPropertyDescriptor:function(t,e){return a(i(t),e)}})},e538:function(t,e,n){var r=n("b622");e.f=r}}]);
//# sourceMappingURL=chunk-b94b34aa.3fe10242.js.map