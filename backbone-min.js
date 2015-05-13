(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,s){t.Backbone=e(t,s,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore"),r;try{r=require("jquery")}catch(s){}e(t,exports,i,r)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var s=t.Backbone;var n=[];var a=n.slice;e.VERSION="1.2.0";e.$=r;e.noConflict=function(){t.Backbone=s;return this};e.emulateHTTP=false;e.emulateJSON=false;var h=e.Events={};var o=/\s+/;var u=function(t,e,r,s,n,a){var h=0,u,l;if(r&&typeof r==="object"){for(u=i.keys(r);h<u.length;h++){e=t(e,u[h],r[u[h]],n,a)}}else if(r&&o.test(r)){for(u=r.split(o);h<u.length;h++){e=t(e,u[h],s,n,a)}}else{e=t(e,r,s,n,a)}return e};h.on=function(t,e,i){this._events=u(l,this._events||{},t,e,i,this);return this};h.listenTo=function(t,e,r){if(!t)return this;var s=t._listenId||(t._listenId=i.uniqueId("l"));var n=this._listeningTo||(this._listeningTo={});var a=n[s];if(!a){a=n[s]={obj:t,events:{}};s=this._listenId||(this._listenId=i.uniqueId("l"));var h=t._listeners||(t._listeners={});h[s]=this}t.on(e,r,this);a.events=u(l,a.events,e,r);return this};var l=function(t,e,i,r,s){if(i){var n=t[e]||(t[e]=[]);n.push({callback:i,context:r,ctx:r||s})}return t};h.off=function(t,e,r){if(!this._events)return this;this._events=u(c,this._events,t,e,r);var s=this._listeners;if(s){var n=r!=null?[r._listenId]:i.keys(s);for(var a=0;a<n.length;a++){var h=s[n[a]];if(!h)break;f(h,this,t,e)}if(i.isEmpty(s))this._listeners=void 0}return this};h.stopListening=function(t,e,i){if(this._listeningTo)f(this,t,e,i,true);return this};var c=function(t,e,r,s){if(!t||!e&&!s&&!r)return;var n=e?[e]:i.keys(t);for(var a=0;a<n.length;a++){e=n[a];var h=t[e];if(!h)break;var o=[];if(r||s){for(var u=0,l=h.length;u<l;u++){var c=h[u];if(r&&r!==c.callback&&r!==c.callback._callback||s&&s!==c.context){o.push(c)}}}if(o.length){t[e]=o}else{delete t[e]}}if(!i.isEmpty(t))return t};var f=function(t,e,r,s,n){var a=t._listeningTo;var h=e?[e._listenId]:i.keys(a);for(var o=0;o<h.length;o++){var l=h[o];var f=a[l];if(!f)break;e=f.obj;if(n)e._events=u(c,e._events,r,s,t);var d=u(c,f.events,r,s);if(!d){delete a[l];delete f.obj._listeners[t._listenId]}}if(i.isEmpty(a))t._listeningTo=void 0};h.once=function(t,e,r){var s=d(t,e,i.bind(this.off,this));return this.on(s,void 0,r)};h.listenToOnce=function(t,e,r){var s=d(e,r,i.bind(this.stopListening,this,t));return this.listenTo(t,s)};var d=function(t,e,r){return u(function(t,e,r,s){if(r){var n=t[e]=i.once(function(){s(e,n);r.apply(this,arguments)});n._callback=r}return t},{},t,e,r)};h.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var r=0;r<e;r++)i[r]=arguments[r+1];u(v,this,t,void 0,i);return this};var v=function(t,e,i,r){if(t._events){var s=t._events[e];var n=t._events.all;if(s)p(s,r);if(n)p(n,[e].concat(r))}return t};var p=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e);return}};var g=function(t,e,r){switch(t){case 1:return function(){return i[e](this[r])};case 2:return function(t){return i[e](this[r],t)};case 3:return function(t,s){return i[e](this[r],t,s)};case 4:return function(t,s,n){return i[e](this[r],t,s,n)};default:return function(){var t=a.call(arguments);t.unshift(this[r]);return i[e].apply(i,t)}}};var m=function(t,e,r){i.each(e,function(e,s){if(i[s])t.prototype[s]=g(e,s,r)})};h.bind=h.on;h.unbind=h.off;i.extend(e,h);var _=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(_.prototype,h,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,r){var s,n,a,h,o,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;a=r.unset;o=r.silent;h=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(s in n){e=n[s];if(!i.isEqual(c[s],e))h.push(s);if(!i.isEqual(l[s],e)){this.changed[s]=e}else{delete this.changed[s]}a?delete c[s]:c[s]=e}if(!o){if(h.length)this._pending=r;for(var f=0;f<h.length;f++){this.trigger("change:"+h[f],this,c[h[f]],r)}}if(u)return this;if(!o){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var s=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(s[n],e=t[n]))continue;(r||(r={}))[n]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r.call(t.context,e,i,t);e.trigger("sync",e,i,t)};F(this,t);return this.sync("read",this,t)},save:function(t,e,r){var s,n,a,h=this.attributes,o;if(t==null||typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r=i.extend({validate:true},r);o=r.wait;if(s&&!o){if(!this.set(s,r))return false}else{if(!this._validate(s,r))return false}if(s&&o){this.attributes=i.extend({},h,s)}if(r.parse===void 0)r.parse=true;var u=this;var l=r.success;r.success=function(t){u.attributes=h;var e=r.parse?u.parse(t,r):t;if(o)e=i.extend(s||{},e);if(i.isObject(e)&&!u.set(e,r)){return false}if(l)l.call(r.context,u,t,r);u.trigger("sync",u,t,r)};F(this,r);n=this.isNew()?"create":r.patch?"patch":"update";if(n==="patch"&&!r.attrs)r.attrs=s;a=this.sync(n,this,r);if(s&&o)this.attributes=h;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var s=t.wait;var n=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(s||e.isNew())n();if(r)r.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}F(this,t);var a=this.sync("delete",this,t);if(!s)n();return a},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||q();if(this.isNew())return t;var e=this.id||this.attributes[this.idAttribute];return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var y={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};m(_,y,"attributes");var b=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var x={add:true,remove:true,merge:true};var w={add:true,remove:false};i.extend(b.prototype,h,{model:_,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,w))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});for(var s=0;s<t.length;s++){var n=t[s]=this.get(t[s]);if(!n)continue;var a=this.modelId(n.attributes);if(a!=null)delete this._byId[a];delete this._byId[n.cid];var h=this.indexOf(n);this.models.splice(h,1);this.length--;if(!e.silent){e.index=h;n.trigger("remove",n,this,e)}this._removeReference(n,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,x);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:t.slice();var s,n,a,h,o;var u=e.at;if(u!=null)u=+u;if(u<0)u+=this.length+1;var l=this.comparator&&u==null&&e.sort!==false;var c=i.isString(this.comparator)?this.comparator:null;var f=[],d=[],v={};var p=e.add,g=e.merge,m=e.remove;var _=!l&&p&&m?[]:false;var y=false;for(var b=0;b<t.length;b++){a=t[b];if(h=this.get(a)){if(m)v[h.cid]=true;if(g&&a!==h){a=this._isModel(a)?a.attributes:a;if(e.parse)a=h.parse(a,e);h.set(a,e);if(l&&!o&&h.hasChanged(c))o=true}t[b]=h}else if(p){n=t[b]=this._prepareModel(a,e);if(!n)continue;f.push(n);this._addReference(n,e)}n=h||n;if(!n)continue;s=this.modelId(n.attributes);if(_&&(n.isNew()||!v[s])){_.push(n);y=y||!this.models[b]||n.cid!==this.models[b].cid}v[s]=true}if(m){for(var b=0;b<this.length;b++){if(!v[(n=this.models[b]).cid])d.push(n)}if(d.length)this.remove(d,e)}if(f.length||y){if(l)o=true;this.length+=f.length;if(u!=null){for(var b=0;b<f.length;b++){this.models.splice(u+b,0,f[b])}}else{if(_)this.models.length=0;var w=_||f;for(var b=0;b<w.length;b++){this.models.push(w[b])}}}if(o)this.sort({silent:true});if(!e.silent){var E=u!=null?i.clone(e):e;for(var b=0;b<f.length;b++){if(u!=null)E.index=u+b;(n=f[b]).trigger("add",n,this,E)}if(o||y)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var r=0;r<this.models.length;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return a.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;var e=this.modelId(this._isModel(t)?t.attributes:t);return this._byId[t]||this._byId[e]||this._byId[t.cid]},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){var r=i.matches(t);return this[e?"find":"filter"](function(t){return r(t.attributes)})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var s=t.reset?"reset":"set";r[s](i,t);if(e)e.call(t.context,r,i,t);r.trigger("sync",r,i,t)};F(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};var r=e.wait;if(!(t=this._prepareModel(t,e)))return false;if(!r)this.add(t,e);var s=this;var n=e.success;e.success=function(t,e,i){if(r)s.add(t,i);if(n)n.call(i.context,t,e,i)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_isModel:function(t){return t instanceof _},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(t==="change"){var s=this.modelId(e.previousAttributes());var n=this.modelId(e.attributes);if(s!==n){if(s!=null)delete this._byId[s];if(n!=null)this._byId[n]=e}}this.trigger.apply(this,arguments)}});var E={forEach:3,each:3,map:3,collect:3,reduce:4,foldl:4,inject:4,reduceRight:4,foldr:4,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:2,contains:2,invoke:2,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3};m(b,E,"models");var k=["groupBy","countBy","sortBy","indexBy"];i.each(k,function(t){if(!i[t])return;b.prototype[t]=function(e,r){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,r)}});var S=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,T));this._ensureElement();this.initialize.apply(this,arguments)};var I=/^(\S+)\s*(.*)$/;var T=["model","collection","el","id","attributes","className","tagName","events"];i.extend(S.prototype,h,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[t[e]];if(!r)continue;var s=e.match(I);this.delegate(s[1],s[2],i.bind(r,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i)},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i)},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,r,s){var n=P[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!s.url){a.url=i.result(r,"url")||q()}if(s.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(s.attrs||r.toJSON(s))}if(s.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(s.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(s.emulateJSON)a.data._method=n;var h=s.beforeSend;s.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(h)return h.apply(this,arguments)}}if(a.type!=="GET"&&!s.emulateJSON){a.processData=false}var o=s.error;s.error=function(t,e,i){s.textStatus=e;s.errorThrown=i;if(o)o.call(s.context,t,e,i)};var u=s.xhr=e.ajax(i.extend(a,s));r.trigger("request",r,u,s);return u};var P={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var H=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var $=/\((.*?)\)/g;var A=/(\(\?)?:\w+/g;var C=/\*\w+/g;var N=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend(H.prototype,h,{initialize:function(){},route:function(t,r,s){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){s=r;r=""}if(!s)s=this[r];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);if(n.execute(s,a,r)!==false){n.trigger.apply(n,["route:"+r].concat(a));n.trigger("route",r,a);e.history.trigger("route",n,r,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(N,"\\$&").replace($,"(?:$1)?").replace(A,function(t,e){return e?t:"([^/?]+)"}).replace(C,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var R=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var O=/^[#\/]|\s+$/g;var j=/^\/+|\/+$/g;var U=/#.*$/;R.started=false;i.extend(R.prototype,h,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},matchRoot:function(){var t=this.decodeFragment(this.location.pathname);var e=t.slice(0,this.root.length-1)+"/";return e===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._usePushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(O,"")},start:function(t){if(R.started)throw new Error("Backbone.history has already been started");R.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window;this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(j,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){var r=document.createElement("iframe");r.src="javascript:0";r.style.display="none";r.tabIndex=-1;var s=document.body;this.iframe=s.insertBefore(r,s.firstChild).contentWindow;this.iframe.document.open().close();this.iframe.location.hash="#"+this.fragment}var n=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState){n("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){n("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._usePushState){t("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe.frameElement);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);R.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){if(!this.matchRoot())return false;t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!R.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var r=i+t;t=this.decodeFragment(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._usePushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,r)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe)){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(r)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new R;var M=function(t,e){var r=this;var s;if(t&&i.has(t,"constructor")){s=t.constructor}else{s=function(){return r.apply(this,arguments)}}i.extend(s,r,e);var n=function(){this.constructor=s};n.prototype=r.prototype;s.prototype=new n;if(t)i.extend(s.prototype,t);s.__super__=r.prototype;return s};_.extend=b.extend=H.extend=S.extend=R.extend=M;var q=function(){throw new Error('A "url" property or function must be specified')};var F=function(t,e){var i=e.error;e.error=function(r){if(i)i.call(e.context,t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map