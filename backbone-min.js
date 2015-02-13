(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,s,r){t.Backbone=e(t,r,i,s)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,s){var r=t.Backbone;var n=[];var a=n.slice;e.VERSION="1.2.0";e.$=s;e.noConflict=function(){t.Backbone=r;return this};e.emulateHTTP=false;e.emulateJSON=false;var h=e.Events={};var o=/\s+/;var u=function(t,e,s,r,n,a){var h=0,u,l;if(s&&typeof s==="object"){for(u=i.keys(s),l=u.length;h<l;h++){e=t(e,u[h],s[u[h]],n,a)}}else if(s&&o.test(s)){for(u=s.split(o),l=u.length;h<l;h++){e=t(e,u[h],r,n,a)}}else{e=t(e,s,r,n,a)}return e};h.on=function(t,e,i){this._events=u(l,this._events||{},t,e,i,this);return this};h.listenTo=function(t,e,s){if(!t)return this;var r=t._listenId||(t._listenId=i.uniqueId("l"));var n=this._listeningTo||(this._listeningTo={});var a=n[r];if(!a){a=n[r]={obj:t,events:{}};r=this._listenId||(this._listenId=i.uniqueId("l"));var h=t._listeners||(t._listeners={});h[r]=this}t.on(e,s,this);a.events=u(l,a.events,e,s);return this};var l=function(t,e,i,s,r){if(i){var n=t[e]||(t[e]=[]);n.push({callback:i,context:s,ctx:s||r})}return t};h.off=function(t,e,s){if(!this._events)return this;this._events=u(c,this._events,t,e,s);var r=this._listeners;if(r){var n=s!=null?[s._listenId]:i.keys(r);for(var a=0,h=n.length;a<h;a++){var o=r[n[a]];if(!o)break;f(o,this,t,e)}if(i.isEmpty(r))this._listeners=void 0}return this};h.stopListening=function(t,e,i){if(this._listeningTo)f(this,t,e,i,true);return this};var c=function(t,e,s,r){if(!t||!e&&!r&&!s)return;var n=e?[e]:i.keys(t);for(var a=0,h=n.length;a<h;a++){e=n[a];var o=t[e];if(!o)break;var u=[];if(s||r){for(var l=0,c=o.length;l<c;l++){var f=o[l];if(s&&s!==f.callback&&s!==f.callback._callback||r&&r!==f.context){u.push(f)}}}if(u.length){t[e]=u}else{delete t[e]}}if(!i.isEmpty(t))return t};var f=function(t,e,s,r,n){var a=t._listeningTo;var h=e?[e._listenId]:i.keys(a);for(var o=0,l=h.length;o<l;o++){var f=h[o];var d=a[f];if(!d)break;e=d.obj;if(n)e._events=u(c,e._events,s,r,t);var v=u(c,d.events,s,r);if(!v){delete a[f];delete d.obj._listeners[t._listenId]}}if(i.isEmpty(a))t._listeningTo=void 0};h.once=function(t,e,s){var r=d(t,e,i.bind(this.off,this));return this.on(r,void 0,s)};h.listenToOnce=function(t,e,s){var r=d(e,s,i.bind(this.stopListening,this,t));return this.listenTo(t,r)};var d=function(t,e,s){return u(function(t,e,s,r){if(s){var n=t[e]=i.once(function(){r(e,n);s.apply(this,arguments)});n._callback=s}return t},{},t,e,s)};h.trigger=function(t){if(!this._events)return this;var e=a.call(arguments,1);u(p,this,t,v,e);return this};var v={};var p=function(t,e,i,s){if(t._events){if(i!==v)s=[i].concat(s);var r=t._events[e];var n=t._events.all;if(r)g(r,s);if(n)g(n,[e].concat(s))}return t};var g=function(t,e){var i,s=-1,r=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++s<r)(i=t[s]).callback.call(i.ctx);return;case 1:while(++s<r)(i=t[s]).callback.call(i.ctx,n);return;case 2:while(++s<r)(i=t[s]).callback.call(i.ctx,n,a);return;case 3:while(++s<r)(i=t[s]).callback.call(i.ctx,n,a,h);return;default:while(++s<r)(i=t[s]).callback.apply(i.ctx,e);return}};h.bind=h.on;h.unbind=h.off;i.extend(e,h);var m=e.Model=function(t,e){var s=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)s=this.parse(s,e)||{};s=i.defaults({},s,i.result(this,"defaults"));this.set(s,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(m.prototype,h,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return i.matches(t)(this.attributes)},set:function(t,e,s){var r,n,a,h,o,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;s=e}else{(n={})[t]=e}s||(s={});if(!this._validate(n,s))return false;a=s.unset;o=s.silent;h=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(r in n){e=n[r];if(!i.isEqual(c[r],e))h.push(r);if(!i.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}a?delete c[r]:c[r]=e}if(!o){if(h.length)this._pending=s;for(var f=0,d=h.length;f<d;f++){this.trigger("change:"+h[f],this,c[h[f]],s)}}if(u)return this;if(!o){while(this._pending){s=this._pending;this._pending=false;this.trigger("change",this,s)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var s in this.attributes)e[s]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,s=false;var r=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(r[n],e=t[n]))continue;(s||(s={}))[n]=e}return s},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var s=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(s)s.call(t.context,e,i,t);e.trigger("sync",e,i,t)};q(this,t);return this.sync("read",this,t)},save:function(t,e,s){var r,n,a,h=this.attributes;if(t==null||typeof t==="object"){r=t;s=e}else{(r={})[t]=e}s=i.extend({validate:true},s);if(r&&!s.wait){if(!this.set(r,s))return false}else{if(!this._validate(r,s))return false}if(r&&s.wait){this.attributes=i.extend({},h,r)}if(s.parse===void 0)s.parse=true;var o=this;var u=s.success;s.success=function(t){o.attributes=h;var e=o.parse(t,s);if(s.wait)e=i.extend(r||{},e);if(i.isObject(e)&&!o.set(e,s)){return false}if(u)u.call(s.context,o,t,s);o.trigger("sync",o,t,s)};q(this,s);n=this.isNew()?"create":s.patch?"patch":"update";if(n==="patch"&&!s.attrs)s.attrs=r;a=this.sync(n,this,s);if(r&&s.wait)this.attributes=h;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var s=t.success;var r=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())r();if(s)s.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}q(this,t);var n=this.sync("delete",this,t);if(!t.wait)r();return n},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||M();if(this.isNew())return t;var e=this.id||this.attributes[this.idAttribute];return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var s=this.validationError=this.validate(t,e)||null;if(!s)return true;this.trigger("invalid",this,s,i.extend(e,{validationError:s}));return false}});var _=["keys","values","pairs","invert","pick","omit","chain","isEmpty"];i.each(_,function(t){if(!i[t])return;m.prototype[t]=function(){var e=a.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var y=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var b={add:true,remove:true,merge:true};var x={add:true,remove:false};i.extend(y.prototype,h,{model:m,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,x))},remove:function(t,e){var s=!i.isArray(t);t=s?[t]:i.clone(t);e||(e={});for(var r=0,n=t.length;r<n;r++){var a=t[r]=this.get(t[r]);if(!a)continue;var h=this.modelId(a.attributes);if(h!=null)delete this._byId[h];delete this._byId[a.cid];var o=this.indexOf(a);this.models.splice(o,1);this.length--;if(!e.silent){e.index=o;a.trigger("remove",a,this,e)}this._removeReference(a,e)}return s?t[0]:t},set:function(t,e){e=i.defaults({},e,b);if(e.parse)t=this.parse(t,e);var s=!i.isArray(t);t=s?t?[t]:[]:t.slice();var r,n,a,h,o;var u=e.at;if(u!=null)u=+u;if(u<0)u+=this.length+1;var l=this.comparator&&u==null&&e.sort!==false;var c=i.isString(this.comparator)?this.comparator:null;var f=[],d=[],v={};var p=e.add,g=e.merge,m=e.remove;var _=!l&&p&&m?[]:false;var y=false;for(var x=0,w=t.length;x<w;x++){a=t[x];if(h=this.get(a)){if(m)v[h.cid]=true;if(g&&a!==h){a=this._isModel(a)?a.attributes:a;if(e.parse)a=h.parse(a,e);h.set(a,e);if(l&&!o&&h.hasChanged(c))o=true}t[x]=h}else if(p){n=t[x]=this._prepareModel(a,e);if(!n)continue;f.push(n);this._addReference(n,e)}n=h||n;if(!n)continue;r=this.modelId(n.attributes);if(_&&(n.isNew()||!v[r])){_.push(n);y=y||!this.models[x]||n.cid!==this.models[x].cid}v[r]=true}if(m){for(var x=0,w=this.length;x<w;x++){if(!v[(n=this.models[x]).cid])d.push(n)}if(d.length)this.remove(d,e)}if(f.length||y){if(l)o=true;this.length+=f.length;if(u!=null){for(var x=0,w=f.length;x<w;x++){this.models.splice(u+x,0,f[x])}}else{if(_)this.models.length=0;var E=_||f;for(var x=0,w=E.length;x<w;x++){this.models.push(E[x])}}}if(o)this.sort({silent:true});if(!e.silent){var k=u!=null?i.clone(e):e;for(var x=0,w=f.length;x<w;x++){if(u!=null)k.index=u+x;(n=f[x]).trigger("add",n,this,k)}if(o||y)this.trigger("sort",this,e)}return s?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var s=0,r=this.models.length;s<r;s++){this._removeReference(this.models[s],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return a.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;var e=this.modelId(this._isModel(t)?t.attributes:t);return this._byId[t]||this._byId[e]||this._byId[t.cid]},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){var s=i.matches(t);return this[e?"find":"filter"](function(t){return s(t.attributes)})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var s=this;t.success=function(i){var r=t.reset?"reset":"set";s[r](i,t);if(e)e.call(t.context,s,i,t);s.trigger("sync",s,i,t)};q(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var s=this;var r=e.success;e.success=function(t,i){if(e.wait)s.add(t,e);if(r)r.call(e.context,t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var s=new this.model(t,e);if(!s.validationError)return s;this.trigger("invalid",this,s.validationError,e);return false},_isModel:function(t){return t instanceof m},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,s){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,s);if(t==="change"){var r=this.modelId(e.previousAttributes());var n=this.modelId(e.attributes);if(r!==n){if(r!=null)delete this._byId[r];if(n!=null)this._byId[n]=e}}this.trigger.apply(this,arguments)}});var w=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];i.each(w,function(t){if(!i[t])return;y.prototype[t]=function(){var e=a.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var E=["groupBy","countBy","sortBy","indexBy"];i.each(E,function(t){if(!i[t])return;y.prototype[t]=function(e,s){var r=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,r,s)}});var k=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,S));this._ensureElement();this.initialize.apply(this,arguments)};var I=/^(\S+)\s*(.*)$/;var S=["model","collection","el","id","attributes","className","tagName","events"];i.extend(k.prototype,h,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var s=t[e];if(!i.isFunction(s))s=this[t[e]];if(!s)continue;var r=e.match(I);this.delegate(r[1],r[2],i.bind(s,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i)},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i)},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,s,r){var n=T[t];i.defaults(r||(r={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!r.url){a.url=i.result(s,"url")||M()}if(r.data==null&&s&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(r.attrs||s.toJSON(r))}if(r.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(r.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(r.emulateJSON)a.data._method=n;var h=r.beforeSend;r.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(h)return h.apply(this,arguments)}}if(a.type!=="GET"&&!r.emulateJSON){a.processData=false}var o=r.error;r.error=function(t,e,i){r.textStatus=e;r.errorThrown=i;if(o)o.call(r.context,t,e,i)};var u=r.xhr=e.ajax(i.extend(a,r));s.trigger("request",s,u,r);return u};var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var H=/\((.*?)\)/g;var P=/(\(\?)?:\w+/g;var A=/\*\w+/g;var C=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,h,{initialize:function(){},route:function(t,s,r){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(s)){r=s;s=""}if(!r)r=this[s];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);if(n.execute(r,a,s)!==false){n.trigger.apply(n,["route:"+s].concat(a));n.trigger("route",s,a);e.history.trigger("route",n,s,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(C,"\\$&").replace(H,"(?:$1)?").replace(P,function(t,e){return e?t:"([^/?]+)"}).replace(A,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var s=t.exec(e).slice(1);return i.map(s,function(t,e){if(e===s.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var R=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var U=/#.*$/;N.started=false;i.extend(N.prototype,h,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=decodeURI(this.location.pathname+this.getSearch());var e=this.root.slice(0,-1);if(!t.indexOf(e))t=t.slice(e.length);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._hasPushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(R,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(O,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&(!this._wantsPushState||!this._hasPushState)){var s=document.createElement("iframe");s.src="javascript:0";s.style.display="none";s.tabIndex=-1;var r=document.body;this.iframe=r.insertBefore(s,r.firstChild).contentWindow;this.iframe.document.open().close();this.iframe.location.hash="#"+this.fragment}var n=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._hasPushState){n("popstate",this.checkUrl,false)}else if(this._wantsHashChange&&this._hasHashChange&&!this.iframe){n("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._hasPushState){t("popstate",this.checkUrl,false)}else if(this._wantsHashChange&&this._hasHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe.frameElement);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var s=i+t;t=decodeURI(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,s)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe)){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(s)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var s=t.href.replace(/(javascript:|#).*$/,"");t.replace(s+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var j=function(t,e){var s=this;var r;if(t&&i.has(t,"constructor")){r=t.constructor}else{r=function(){return s.apply(this,arguments)}}i.extend(r,s,e);var n=function(){this.constructor=r};n.prototype=s.prototype;r.prototype=new n;if(t)i.extend(r.prototype,t);r.__super__=s.prototype;return r};m.extend=y.extend=$.extend=k.extend=N.extend=j;var M=function(){throw new Error('A "url" property or function must be specified')};var q=function(t,e){var i=e.error;e.error=function(s){if(i)i.call(e.context,t,s,e);t.trigger("error",t,s,e)}};return e});
//# sourceMappingURL=backbone-min.map