!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=(window.__sw__.assetPath + '/bundles/billiepaymentsw6/'),n(n.s="G7bt")}({"/zRP":function(e,t,n){},"6zAI":function(e){e.exports=JSON.parse('{"billie":{"config":{"testCredentialsButton":{"text":"Test credentials"},"notification":{"validCredentials":"The credentials are correct!","invalidCredentials":"The credentials are unfortunately wrong!","failedToTestCredentials":"An error occurred while checking the credentials!"}}}}')},"8h1x":function(e,t){var n=Shopware.Component,r=function(e){e.response&&e.response.data&&e.response.data.errors?"BILLIE__INVOICE_NUMBER_MISSING"===e.response.data.errors.pop().code?this.createNotificationError({message:this.$tc("billie.transition.errors.invoiceNumberMissing")}):this.$super("createStateChangeErrorNotification",e):this.$super("createStateChangeErrorNotification",e)};n.override("sw-order-state-history-card",{methods:{createStateChangeErrorNotification:r}}),n.override("sw-order-general-info",{methods:{createStateChangeErrorNotification:r}}),n.override("sw-order-details-state-card",{methods:{createStateChangeErrorNotification:r}})},G7bt:function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(o=i.key,a=void 0,a=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!==r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"),"symbol"===r(a)?a:String(a)),i)}var o,a}function a(e,t){return(a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=c(e);if(t){var i=c(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return l(this,n)}}function l(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}n.r(t);var d=Shopware.Classes.ApiService,u=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(c,e);var t,n,r,l=s(c);function c(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"billie";return i(this,c),(n=l.call(this,e,t,r)).name="billieApiService",n}return t=c,(n=[{key:"testCredentials",value:function(e,t,n){return this.httpClient.post("".concat(this.getApiBasePath(),"/test-credentials"),{id:e,secret:t,isSandbox:n},{headers:this.getBasicHeaders()}).then((function(e){return d.handleResponse(e)}))}}])&&o(t.prototype,n),r&&o(t,r),Object.defineProperty(t,"prototype",{writable:!1}),c}(d);Shopware.Application.addServiceProvider("billieApiService",(function(){var e=Shopware.Application.getContainer("factory"),t=Shopware.Application.getContainer("init"),n=e.apiService,r=new u(t.httpClient,Shopware.Service("loginService")),i=r.name;return n.register(i,r),r}));Shopware.Component.override("sw-settings-payment-detail",{template:'{% block sw_settings_payment_detail_content_card %}\n    {% parent %}\n\n    {% block billie_payment_config_content %}\n        <sw-card v-if="paymentMethod && paymentMethod.extensions.billieConfig != null"\n                 class="billie--payment-config--card"\n                 :title="$tc(\'billie.paymentConfig.card.title\')"\n                 :isLoading="isLoading">\n            <template v-if="!isLoading">\n\n                {% block billie_payment_config_fields %}\n                    <sw-field\n                        type="number"\n                        :label="$tc(\'billie.paymentConfig.fields.duration.label\')"\n                        v-model="paymentMethod.extensions.billieConfig.duration"\n                        min="1">\n                    </sw-field>\n                {% endblock %}\n            </template>\n        </sw-card>\n    {% endblock %}\n{% endblock %}\n'});n("TE8p");function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==f(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===f(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=Shopware.Component,y=m.getComponentHelper().mapState;m.register("sw-order-detail-billie-payment",{template:'<sw-card class="billie-payment-order-data-card"\n         :title="$tc(\'billie.orderData.cart.title\')"\n         v-if="order.extensions.billieData"\n         positionIdentifier="order-details-billie-card">\n    {% block billie_payment_order_data %}\n        <sw-container columns="repeat(auto-fit, minmax(250px, 1fr))" gap="30px 30px">\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.referenceId.label\') }}</dt>\n                <dd>{{ order.extensions.billieData.referenceId }}</dd>\n            </sw-description-list>\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.externalInvoiceNumber.label\') }}</dt>\n                <dd>\n                    <sw-text-field v-model="order.extensions.billieData.externalInvoiceNumber"></sw-text-field>\n                </dd>\n            </sw-description-list>\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.externalInvoiceUrl.label\') }}</dt>\n                <dd>\n                    <sw-text-field v-model="order.extensions.billieData.externalInvoiceUrl"></sw-text-field>\n                </dd>\n            </sw-description-list>\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.externalDeliveryNoteUrl.label\') }}</dt>\n                <dd>\n                    <sw-text-field v-model="order.extensions.billieData.externalDeliveryNoteUrl"></sw-text-field>\n                </dd>\n            </sw-description-list>\n\n        </sw-container>\n    {% endblock %}\n</sw-card>\n',inject:["acl"],metaInfo:function(){return{title:"Billie Payment"}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},y("swOrderDetail",["order"]))}),Shopware.Module.register("sw-order-detail-tab-billie-payment",{routeMiddleware:function(e,t){"sw.order.detail"===t.name&&t.children.push({name:"sw.order.detail.billie-payment",path:"/sw/order/detail/:id/billie-payment",component:"sw-order-detail-billie-payment",meta:{parentPath:"sw.order.detail",meta:{parentPath:"sw.order.index",privilege:"order.viewer"}}}),e(t)}});n("8h1x");var h=n("Rf+r"),v=n("y2kM"),g=Shopware,w=g.Component,S=g.State;w.override("sw-order-detail",{template:'{% block sw_order_detail_content_tabs_extension %}\n    {% parent %}\n\n    {% block sw_order_detail_content_tabs_billie %}\n        <sw-tabs-item\n            v-if="order && order.extensions.billieData"\n            class="sw-order-detail__tabs-tab-billie-payment"\n            :route="{ name: \'sw.order.detail.billie-payment\', params: { id: $route.params.id } }"\n            :title="$tc(\'sw-order.detail.billie-payment\')"\n        >\n            {{ $tc(\'sw-order.detail.billie-payment\') }}\n        </sw-tabs-item>\n    {% endblock %}\n\n{% endblock %}\n',snippets:{"de-DE":h,"en-GB":v},methods:{createdComponent:function(){this.$super("createdComponent"),this._65to64LoadOrderBackwardCompatibility()},_65to64LoadOrderBackwardCompatibility:function(){this.versionContext||this.order&&this.order.id===this.orderId||(S.commit("swOrderDetail/setLoading",["order",!0]),this.orderRepository.get(this.orderId,Shopware.Context.api,this.orderCriteria).then((function(e){S.commit("swOrderDetail/setOrder",e)})))}}});var C=n("z9Tv"),_=n("6zAI"),x=Shopware,O=x.Component,j=x.Mixin;O.register("billie-test-credentials-button",{template:'{% block billie_test_credentials_button %}\n    <div class="billie-test-credentials-button">\n        {% block billie_test_credentials_button_process_button %}\n            <sw-button-process\n                class="billie-test-credentials-button__process-button"\n                :isLoading="isLoading"\n                :processSuccess="isTestSuccessful"\n                :disabled="isLoading"\n                @click.prevent="testCredentials"\n                @process-finish="onTestFinish"\n                block>\n                {{ $tc(\'billie.config.testCredentialsButton.text\') }}\n            </sw-button-process>\n        {% endblock %}\n    </div>\n{% endblock %}\n',inject:["billieApiService"],mixins:[j.getByName("notification")],snippets:{"de-DE":C,"en-GB":_},props:{apiMode:{type:String,required:!0}},data:function(){return{isLoading:!1,isTestSuccessful:!1}},methods:{onTestFinish:function(){this.isTestSuccessful=!1},testCredentials:function(){var e=this;this.isTestSuccessful=!1,this.isLoading=!0;var t=document.querySelector('[name="BilliePaymentSW6.config.'.concat(this.apiMode,'ClientId"]')).value,n=document.querySelector('[name="BilliePaymentSW6.config.'.concat(this.apiMode,'ClientSecret"]')).value,r="test"===this.apiMode;this.billieApiService.testCredentials(t,n,r).then((function(t){e.isLoading=!1,t.success?(e.isTestSuccessful=!0,e.createNotificationSuccess({message:e.$tc("billie.config.notification.validCredentials")})):e.createNotificationError({message:e.$tc("billie.config.notification.invalidCredentials")})})).catch((function(){e.isLoading=!1,e.createNotificationError({message:e.$tc("billie.config.notification.failedToTestCredentials")})}))}}})},"Rf+r":function(e){e.exports=JSON.parse('{"sw-order":{"detail":{"billie-payment":"Billie Zahlung"}}}')},TE8p:function(e,t,n){var r=n("/zRP");r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n("ydqr").default)("5860e277",r,!0,{})},y2kM:function(e){e.exports=JSON.parse('{"sw-order":{"detail":{"billie-payment":"Billie Payment"}}}')},ydqr:function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s={id:e+":"+i,css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}n.r(t),n.d(t,"default",(function(){return b}));var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),s=null,l=0,c=!1,d=function(){},u=null,f="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function b(e,t,n,i){c=n,u=i||{};var a=r(e,t);return m(a),function(t){for(var n=[],i=0;i<a.length;i++){var s=a[i];(l=o[s.id]).refs--,n.push(l)}t?m(a=r(e,t)):a=[];for(i=0;i<n.length;i++){var l;if(0===(l=n[i]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete o[l.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],r=o[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(h(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(h(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function y(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function h(e){var t,n,r=document.querySelector("style["+f+'~="'+e.id+'"]');if(r){if(c)return d;r.parentNode.removeChild(r)}if(p){var i=l++;r=s||(s=y()),t=w.bind(null,r,i,!1),n=w.bind(null,r,i,!0)}else r=y(),t=S.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var v,g=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function w(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=g(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function S(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),u.ssrId&&e.setAttribute(f,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},z9Tv:function(e){e.exports=JSON.parse('{"billie":{"config":{"testCredentialsButton":{"text":"Zugangsdaten testen"},"notification":{"validCredentials":"Die Zugangsdaten sind korrekt!","invalidCredentials":"Die Zugangsdaten sind leider falsch!","failedToTestCredentials":"Beim Prüfen der Zugangsdaten ist ein Fehler aufgetreten!"}}}}')}});