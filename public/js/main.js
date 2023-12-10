/*! For license information please see main.js.LICENSE.txt */
(()=>{var t={417:(t,e,n)=>{var r;!function(){"use strict";var e="input is invalid type",i="object"==typeof window,o=i?window:{};o.JS_SHA256_NO_WINDOW&&(i=!1);var s=!i&&"object"==typeof self,a=!o.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;a?o=n.g:s&&(o=self);var h=!o.JS_SHA256_NO_COMMON_JS&&t.exports,c=n.amdO,u=!o.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,l="0123456789abcdef".split(""),f=[-2147483648,8388608,32768,128],p=[24,16,8,0],d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],y=["hex","array","digest","arrayBuffer"],g=[];!o.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!u||!o.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var v=function(t,e){return function(n){return new E(e,!0).update(n)[t]()}},b=function(t){var e=v("hex",t);a&&(e=w(e,t)),e.create=function(){return new E(t)},e.update=function(t){return e.create().update(t)};for(var n=0;n<y.length;++n){var r=y[n];e[r]=v(r,t)}return e},w=function(t,r){var i,s=n(463),a=n(350).Buffer,h=r?"sha224":"sha256";return i=a.from&&!o.JS_SHA256_NO_BUFFER_FROM?a.from:function(t){return new a(t)},function(n){if("string"==typeof n)return s.createHash(h).update(n,"utf8").digest("hex");if(null==n)throw new Error(e);return n.constructor===ArrayBuffer&&(n=new Uint8Array(n)),Array.isArray(n)||ArrayBuffer.isView(n)||n.constructor===a?s.createHash(h).update(i(n)).digest("hex"):t(n)}},m=function(t,e){return function(n,r){return new x(n,e,!0).update(r)[t]()}},A=function(t){var e=m("hex",t);e.create=function(e){return new x(e,t)},e.update=function(t,n){return e.create(t).update(n)};for(var n=0;n<y.length;++n){var r=y[n];e[r]=m(r,t)}return e};function E(t,e){e?(g[0]=g[16]=g[1]=g[2]=g[3]=g[4]=g[5]=g[6]=g[7]=g[8]=g[9]=g[10]=g[11]=g[12]=g[13]=g[14]=g[15]=0,this.blocks=g):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function x(t,n,r){var i,o=typeof t;if("string"===o){var s,a=[],h=t.length,c=0;for(i=0;i<h;++i)(s=t.charCodeAt(i))<128?a[c++]=s:s<2048?(a[c++]=192|s>>6,a[c++]=128|63&s):s<55296||s>=57344?(a[c++]=224|s>>12,a[c++]=128|s>>6&63,a[c++]=128|63&s):(s=65536+((1023&s)<<10|1023&t.charCodeAt(++i)),a[c++]=240|s>>18,a[c++]=128|s>>12&63,a[c++]=128|s>>6&63,a[c++]=128|63&s);t=a}else{if("object"!==o)throw new Error(e);if(null===t)throw new Error(e);if(u&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||u&&ArrayBuffer.isView(t)))throw new Error(e)}t.length>64&&(t=new E(n,!0).update(t).array());var l=[],f=[];for(i=0;i<64;++i){var p=t[i]||0;l[i]=92^p,f[i]=54^p}E.call(this,n,r),this.update(f),this.oKeyPad=l,this.inner=!0,this.sharedMemory=r}E.prototype.update=function(t){if(!this.finalized){var n,r=typeof t;if("string"!==r){if("object"!==r)throw new Error(e);if(null===t)throw new Error(e);if(u&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||u&&ArrayBuffer.isView(t)))throw new Error(e);n=!0}for(var i,o,s=0,a=t.length,h=this.blocks;s<a;){if(this.hashed&&(this.hashed=!1,h[0]=this.block,h[16]=h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=0),n)for(o=this.start;s<a&&o<64;++s)h[o>>2]|=t[s]<<p[3&o++];else for(o=this.start;s<a&&o<64;++s)(i=t.charCodeAt(s))<128?h[o>>2]|=i<<p[3&o++]:i<2048?(h[o>>2]|=(192|i>>6)<<p[3&o++],h[o>>2]|=(128|63&i)<<p[3&o++]):i<55296||i>=57344?(h[o>>2]|=(224|i>>12)<<p[3&o++],h[o>>2]|=(128|i>>6&63)<<p[3&o++],h[o>>2]|=(128|63&i)<<p[3&o++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),h[o>>2]|=(240|i>>18)<<p[3&o++],h[o>>2]|=(128|i>>12&63)<<p[3&o++],h[o>>2]|=(128|i>>6&63)<<p[3&o++],h[o>>2]|=(128|63&i)<<p[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.block=h[16],this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},E.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>2]|=f[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},E.prototype.hash=function(){var t,e,n,r,i,o,s,a,h,c=this.h0,u=this.h1,l=this.h2,f=this.h3,p=this.h4,y=this.h5,g=this.h6,v=this.h7,b=this.blocks;for(t=16;t<64;++t)e=((i=b[t-15])>>>7|i<<25)^(i>>>18|i<<14)^i>>>3,n=((i=b[t-2])>>>17|i<<15)^(i>>>19|i<<13)^i>>>10,b[t]=b[t-16]+e+b[t-7]+n<<0;for(h=u&l,t=0;t<64;t+=4)this.first?(this.is224?(o=300032,v=(i=b[0]-1413257819)-150054599<<0,f=i+24177077<<0):(o=704751109,v=(i=b[0]-210244248)-1521486534<<0,f=i+143694565<<0),this.first=!1):(e=(c>>>2|c<<30)^(c>>>13|c<<19)^(c>>>22|c<<10),r=(o=c&u)^c&l^h,v=f+(i=v+(n=(p>>>6|p<<26)^(p>>>11|p<<21)^(p>>>25|p<<7))+(p&y^~p&g)+d[t]+b[t])<<0,f=i+(e+r)<<0),e=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),r=(s=f&c)^f&u^o,g=l+(i=g+(n=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7))+(v&p^~v&y)+d[t+1]+b[t+1])<<0,e=((l=i+(e+r)<<0)>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10),r=(a=l&f)^l&c^s,y=u+(i=y+(n=(g>>>6|g<<26)^(g>>>11|g<<21)^(g>>>25|g<<7))+(g&v^~g&p)+d[t+2]+b[t+2])<<0,e=((u=i+(e+r)<<0)>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),r=(h=u&l)^u&f^a,p=c+(i=p+(n=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7))+(y&g^~y&v)+d[t+3]+b[t+3])<<0,c=i+(e+r)<<0,this.chromeBugWorkAround=!0;this.h0=this.h0+c<<0,this.h1=this.h1+u<<0,this.h2=this.h2+l<<0,this.h3=this.h3+f<<0,this.h4=this.h4+p<<0,this.h5=this.h5+y<<0,this.h6=this.h6+g<<0,this.h7=this.h7+v<<0},E.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,n=this.h2,r=this.h3,i=this.h4,o=this.h5,s=this.h6,a=this.h7,h=l[t>>28&15]+l[t>>24&15]+l[t>>20&15]+l[t>>16&15]+l[t>>12&15]+l[t>>8&15]+l[t>>4&15]+l[15&t]+l[e>>28&15]+l[e>>24&15]+l[e>>20&15]+l[e>>16&15]+l[e>>12&15]+l[e>>8&15]+l[e>>4&15]+l[15&e]+l[n>>28&15]+l[n>>24&15]+l[n>>20&15]+l[n>>16&15]+l[n>>12&15]+l[n>>8&15]+l[n>>4&15]+l[15&n]+l[r>>28&15]+l[r>>24&15]+l[r>>20&15]+l[r>>16&15]+l[r>>12&15]+l[r>>8&15]+l[r>>4&15]+l[15&r]+l[i>>28&15]+l[i>>24&15]+l[i>>20&15]+l[i>>16&15]+l[i>>12&15]+l[i>>8&15]+l[i>>4&15]+l[15&i]+l[o>>28&15]+l[o>>24&15]+l[o>>20&15]+l[o>>16&15]+l[o>>12&15]+l[o>>8&15]+l[o>>4&15]+l[15&o]+l[s>>28&15]+l[s>>24&15]+l[s>>20&15]+l[s>>16&15]+l[s>>12&15]+l[s>>8&15]+l[s>>4&15]+l[15&s];return this.is224||(h+=l[a>>28&15]+l[a>>24&15]+l[a>>20&15]+l[a>>16&15]+l[a>>12&15]+l[a>>8&15]+l[a>>4&15]+l[15&a]),h},E.prototype.toString=E.prototype.hex,E.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,n=this.h2,r=this.h3,i=this.h4,o=this.h5,s=this.h6,a=this.h7,h=[t>>24&255,t>>16&255,t>>8&255,255&t,e>>24&255,e>>16&255,e>>8&255,255&e,n>>24&255,n>>16&255,n>>8&255,255&n,r>>24&255,r>>16&255,r>>8&255,255&r,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o,s>>24&255,s>>16&255,s>>8&255,255&s];return this.is224||h.push(a>>24&255,a>>16&255,a>>8&255,255&a),h},E.prototype.array=E.prototype.digest,E.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),e.setUint32(20,this.h5),e.setUint32(24,this.h6),this.is224||e.setUint32(28,this.h7),t},x.prototype=new E,x.prototype.finalize=function(){if(E.prototype.finalize.call(this),this.inner){this.inner=!1;var t=this.array();E.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(t),E.prototype.finalize.call(this)}};var S=b();S.sha256=S,S.sha224=b(!0),S.sha256.hmac=A(),S.sha224.hmac=A(!0),h?t.exports=S:(o.sha256=S.sha256,o.sha224=S.sha224,c&&(void 0===(r=function(){return S}.call(S,n,S,t))||(t.exports=r)))}()},350:()=>{},463:()=>{}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.amdO={},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{"use strict";var t=n(417),e=function(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))};function r(t,e){var n=t.lc,r=t.up,i=t.dg,o=t.sp;if(!(n&&r&&i&&o))return!1;var s=Math.min(n,r,i,o),a=Math.max(n,r,i,o);return a-s<e&&(a<e?e-1:a)}var i=["!","#","$","%","&","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","]","^","_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"];function o(t){return t.replace(/\s+/g,"")}var s=function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{h(r.next(t))}catch(t){o(t)}}function a(t){try{h(r.throw(t))}catch(t){o(t)}}function h(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}h((r=r.apply(t,e||[])).next())}))},a=function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(h){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,r=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break}i[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,h])}}},h=function(){function t(t,e){this.domain=t,this.loginId=e,this.init()}return t.prototype.init=function(){this.loadDataFromPage()},t.prototype.loadDataFromPage=function(){return s(this,void 0,void 0,(function(){var t,e,n,r;return a(this,(function(i){switch(i.label){case 0:return[4,this.getCurrentTab()];case 1:return t=i.sent().url,[4,this.getUsername()];case 2:return e=i.sent(),n=new URL(t||"").hostname,(r=/[^\.]+\.{1}[^\.]+$/.exec(n))&&(this.domain.value=o(r[0])),this.loginId.value=o(e),[2]}}))}))},t.prototype.getCurrentTab=function(){return s(this,void 0,void 0,(function(){var t;return a(this,(function(e){switch(e.label){case 0:return t={active:!0,lastFocusedWindow:!0},[4,chrome.tabs.query(t)];case 1:return[2,e.sent()[0]]}}))}))},t.prototype.getUsername=function(){return s(this,void 0,void 0,(function(){var t,e;return a(this,(function(n){switch(n.label){case 0:return[4,this.getCurrentTab()];case 1:return t=n.sent(),e={type:"REQUEST_LOGIN_ID"},t.id?[4,chrome.tabs.sendMessage(t.id,e)]:[3,3];case 2:return[2,n.sent().loginId];case 3:return[2]}}))}))},t}(),c=function(){function t(t){this.env=t,"ext"===this.env?(this.storage={set:function(t,e){var n;return chrome.storage.local.set(((n={})[t]=e,n))},get:chrome.storage.local.get},this.getAllConfigExt()):"web"===this.env&&(this.storage={set:function(t,e){return localStorage.setItem(t,e)},get:function(t){return new Promise((function(e,n){var r;return e(((r={})[t]=localStorage.getItem(t)||"",r))}))}},this.getAllConfigWeb())}return t.prototype.subscribe=function(e,n){t.subscriptions.push({eventType:e,handler:n})},t.prototype.addConfig=function(t){var e=this.stringifyConfig(t),n=this.getConfigName(t);this.storage.set(e,n),this.reloadConfigs()},t.prototype.getConfig=function(t){return this.parseConfig(t)},t.prototype.getConfigName=function(t){var e=t.domain,n=t.loginId;return"".concat(e,": ").concat(n.substring(0,7),"...")},Object.defineProperty(t.prototype,"configs",{get:function(){return t.configList},enumerable:!1,configurable:!0}),t.prototype.signalSubscribers=function(e){for(var n=0,r=t.subscriptions;n<r.length;n++){var i=r[n];i.eventType===e&&i.handler(this.configs)}},t.prototype.stringifyConfig=function(t){var e=t.domain,n=t.loginId,r=t.variant,i=t.length;return"".concat(e,";").concat(n,";").concat(r,";").concat(i||"").toLowerCase()},t.prototype.parseConfig=function(t){var e=t.split(";");return{domain:e[0],loginId:e[1],variant:e[2],length:e[3]}},t.prototype.isEmpty=function(t){return 0===Object.keys(t).length},t.prototype.reloadConfigs=function(){"ext"===this.env?this.getAllConfigExt():"web"===this.env&&this.getAllConfigWeb()},t.prototype.getAllConfigExt=function(){var e=this;chrome.storage.local.get().then((function(n){var r=Object.keys(n);t.configList=r.map((function(t){return{key:t,value:n[t]}})),e.signalSubscribers("LIST_LOADED")}))},t.prototype.getAllConfigWeb=function(){var e=this;setTimeout((function(){var n=Object.keys(localStorage);t.configList=n.map((function(t){return{key:t,value:localStorage[t]}})),e.signalSubscribers("LIST_LOADED")}),0)},t.configList=[],t.subscriptions=[],t}(),u="",l=document.getElementById("generateBtn"),f=document.getElementById("copy"),p=document.getElementById("saveConfig"),d=document.getElementById("secretKey"),y=document.getElementById("domain"),g=document.getElementById("loginId"),v=document.getElementById("variant"),b=document.getElementById("passLength"),w=document.getElementById("pass"),m=document.getElementById("passConfig");function A(){u="";var n=d.value,o=y.value,s=g.value,a=b.value,h=+v.value;u=function(n,o,s){var a=o.length||17,h=function(t,e){var n=/[a-z]/,i=/[A-Z]/,o=/\d/,s=t.split(""),a={lc:void 0,up:void 0,dg:void 0,sp:void 0};for(var h in s){var c=s[h];switch(!0){case!!c.match(n):a.lc=+h;break;case!!c.match(i):a.up=+h;break;case!!c.match(o):a.dg=+h;break;default:a.sp=+h}var u=r(a,e);if(u)return t.substring(u-e+1,u+1)}return null}(function(n){var r=e([],i,!0),o=t.sha256.create();o.update(n);var s=o.array().map((function(t){return function(t,e){var n=e.length,r=t%n,i=Math.floor(t/n),o=e[r],s=e[i];return r===i?e.splice(r,1):r>i?(e.splice(r,1),e.splice(i,1)):(e.splice(i,1),e.splice(r,1)),"".concat(s).concat(o)}(t,r)})).join("");return console.log({hash:o.hex(),longPass:s}),s}("".concat(n).concat(o.domain).concat(o.loginId).concat(s)),+a);return console.log({generatedPassword:h}),h}(n,{domain:o,loginId:s,length:a},h)||"NONE",w.innerText=u,v.value="".concat(h)}function E(){navigator.clipboard.writeText(u).catch((function(t){console.error("copy to clipboard has an error: ",t)}))}function x(t){if(null==t?void 0:t.length){m.innerHTML="<option selected disabled hidden>Select password</option>";for(var e=0,n=t;e<n.length;e++){var r=n[e];m.appendChild(new Option(r.value,r.key))}}}!function(){var t,e=new c(chrome.tabs?"ext":"web");chrome.tabs&&new h(y,g);try{t=e,f.addEventListener("click",E),p.addEventListener("click",(function(){return function(t){var e={domain:y.value,loginId:g.value,variant:v.value,length:b.value};t.addConfig(e)}(t)})),l.addEventListener("click",A),b.addEventListener("change",A),v.addEventListener("change",A),m.addEventListener("change",(function(e){return function(t,e){return n=this,r=void 0,o=function(){var n,r;return function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(h){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,r=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break}i[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,h])}}}(this,(function(i){return n=t.target.value,r=e.getConfig(n),y.value=r.domain,g.value=r.loginId,v.value=r.variant||"0",b.value=r.length||"",[2]}))},new((i=void 0)||(i=Promise))((function(t,e){function s(t){try{h(o.next(t))}catch(t){e(t)}}function a(t){try{h(o.throw(t))}catch(t){e(t)}}function h(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(s,a)}h((o=o.apply(n,r||[])).next())}));var n,r,i,o}(e,t)})),function(t){for(var e=function(t){t.addEventListener("change",(function(e){t.value=t.value.toLowerCase()}))},n=0,r=t;n<r.length;n++)e(r[n])}([y,g]),e.subscribe("LIST_LOADED",x)}catch(t){console.error(t)}}()})()})();
//# sourceMappingURL=main.js.map