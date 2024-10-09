(function(){var e={792:function(){},302:function(){let{Component:e}=Shopware,t=function(e){e.response&&e.response.data&&e.response.data.errors&&"BILLIE__INVOICE_NUMBER_MISSING"===e.response.data.errors.pop().code?this.createNotificationError({message:this.$tc("billie.transition.errors.invoiceNumberMissing")}):this.$super("createStateChangeErrorNotification",e)};e.override("sw-order-state-history-card",{methods:{createStateChangeErrorNotification:t}}),e.override("sw-order-general-info",{methods:{createStateChangeErrorNotification:t}}),e.override("sw-order-details-state-card",{methods:{createStateChangeErrorNotification:t}})},612:function(e,t,i){var n=i(792);n.__esModule&&(n=n.default),"string"==typeof n&&(n=[[e.id,n,""]]),n.locals&&(e.exports=n.locals),i(346).Z("0c674bd8",n,!0,{})},346:function(e,t,i){"use strict";function n(e,t){for(var i=[],n={},r=0;r<t.length;r++){var s=t[r],a=s[0],o={id:e+":"+r,css:s[1],media:s[2],sourceMap:s[3]};n[a]?n[a].parts.push(o):i.push(n[a]={id:a,parts:[o]})}return i}i.d(t,{Z:function(){return h}});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},a=r&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,d=!1,c=function(){},p=null,u="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,i,r){d=i,p=r||{};var a=n(e,t);return m(a),function(t){for(var i=[],r=0;r<a.length;r++){var o=s[a[r].id];o.refs--,i.push(o)}t?m(a=n(e,t)):a=[];for(var r=0;r<i.length;r++){var o=i[r];if(0===o.refs){for(var l=0;l<o.parts.length;l++)o.parts[l]();delete s[o.id]}}}}function m(e){for(var t=0;t<e.length;t++){var i=e[t],n=s[i.id];if(n){n.refs++;for(var r=0;r<n.parts.length;r++)n.parts[r](i.parts[r]);for(;r<i.parts.length;r++)n.parts.push(g(i.parts[r]));n.parts.length>i.parts.length&&(n.parts.length=i.parts.length)}else{for(var a=[],r=0;r<i.parts.length;r++)a.push(g(i.parts[r]));s[i.id]={id:i.id,refs:1,parts:a}}}}function b(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function g(e){var t,i,n=document.querySelector("style["+u+'~="'+e.id+'"]');if(n){if(d)return c;n.parentNode.removeChild(n)}if(f){var r=l++;t=w.bind(null,n=o||(o=b()),r,!1),i=w.bind(null,n,r,!0)}else t=y.bind(null,n=b()),i=function(){n.parentNode.removeChild(n)};return t(e),function(n){n?(n.css!==e.css||n.media!==e.media||n.sourceMap!==e.sourceMap)&&t(e=n):i()}}var v=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}();function w(e,t,i,n){var r=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=v(t,r);else{var s=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}function y(e,t){var i=t.css,n=t.media,r=t.sourceMap;if(n&&e.setAttribute("media",n),p.ssrId&&e.setAttribute(u,t.id),r&&(i+="\n/*# sourceURL="+r.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}}},t={};function i(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={id:n,exports:{}};return e[n](s,s.exports,i),s.exports}i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="bundles/billiepaymentsw6/",window?.__sw__?.assetPath&&(i.p=window.__sw__.assetPath+"/bundles/billiepaymentsw6/"),function(){"use strict";let e=Shopware.Classes.ApiService;class t extends e{constructor(e,t,i="billie"){super(e,t,i),this.name="billieApiService"}testCredentials(t,i,n){return this.httpClient.post(`${this.getApiBasePath()}/test-credentials`,{id:t,secret:i,isSandbox:n},{headers:this.getBasicHeaders()}).then(t=>e.handleResponse(t))}}Shopware.Application.addServiceProvider("billieApiService",()=>{let e=Shopware.Application.getContainer("factory"),i=Shopware.Application.getContainer("init"),n=e.apiService,r=new t(i.httpClient,Shopware.Service("loginService")),s=r.name;return n.register(s,r),r});let{Component:n}=Shopware;n.override("sw-settings-payment-detail",{template:'{% block sw_settings_payment_detail_content_card %}\n    {% parent %}\n\n    {% block billie_payment_config_content %}\n        <sw-card v-if="paymentMethod && paymentMethod.extensions.billieConfig != null"\n                 class="billie--payment-config--card"\n                 :title="$tc(\'billie.paymentConfig.card.title\')"\n                 :isLoading="isLoading">\n            <template v-if="!isLoading">\n\n                {% block billie_payment_config_fields %}\n                    <sw-field\n                        type="number"\n                        :label="$tc(\'billie.paymentConfig.fields.duration.label\')"\n                        v-model="paymentMethod.extensions.billieConfig.duration"\n                        min="1">\n                    </sw-field>\n                {% endblock %}\n            </template>\n        </sw-card>\n    {% endblock %}\n{% endblock %}\n'}),i(612);let{Component:r}=Shopware,{mapState:s}=r.getComponentHelper();r.register("sw-order-detail-billie-payment",{template:'<sw-card class="billie-payment-order-data-card"\n         :title="$tc(\'billie.orderData.cart.title\')"\n         v-if="order.extensions.billieData"\n         positionIdentifier="order-details-billie-card">\n    {% block billie_payment_order_data %}\n        <sw-container columns="repeat(auto-fit, minmax(250px, 1fr))" gap="30px 30px">\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.referenceId.label\') }}</dt>\n                <dd>{{ order.extensions.billieData.referenceId }}</dd>\n            </sw-description-list>\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.externalInvoiceNumber.label\') }}</dt>\n                <dd>\n                    <sw-text-field v-model:value="order.extensions.billieData.externalInvoiceNumber"></sw-text-field>\n                </dd>\n            </sw-description-list>\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.externalInvoiceUrl.label\') }}</dt>\n                <dd>\n                    <sw-text-field v-model:value="order.extensions.billieData.externalInvoiceUrl"></sw-text-field>\n                </dd>\n            </sw-description-list>\n\n            <sw-description-list columns="1fr" grid="1fr">\n                <dt>{{ $tc(\'billie.orderData.fields.externalDeliveryNoteUrl.label\') }}</dt>\n                <dd>\n                    <sw-text-field v-model:value="order.extensions.billieData.externalDeliveryNoteUrl"></sw-text-field>\n                </dd>\n            </sw-description-list>\n\n        </sw-container>\n    {% endblock %}\n</sw-card>\n',inject:["acl"],metaInfo(){return{title:"Billie Payment"}},computed:{...s("swOrderDetail",["order"])}}),Shopware.Module.register("sw-order-detail-tab-billie-payment",{routeMiddleware(e,t){"sw.order.detail"===t.name&&t.children.push({name:"sw.order.detail.billie-payment",path:"/sw/order/detail/:id/billie-payment",component:"sw-order-detail-billie-payment",meta:{parentPath:"sw.order.detail",meta:{parentPath:"sw.order.index",privilege:"order.viewer"}}}),e(t)}}),i(302);var a=JSON.parse('{"sw-order":{"detail":{"billie-payment":"Billie Zahlung"}}}'),o=JSON.parse('{"sw-order":{"detail":{"billie-payment":"Billie Payment"}}}');let{Component:l,State:d}=Shopware;l.override("sw-order-detail",{template:'{% block sw_order_detail_content_tabs_extension %}\n    {% parent %}\n\n    {% block sw_order_detail_content_tabs_billie %}\n        <sw-tabs-item\n            v-if="order && order.extensions.billieData"\n            class="sw-order-detail__tabs-tab-billie-payment"\n            :route="{ name: \'sw.order.detail.billie-payment\', params: { id: $route.params.id } }"\n            :title="$tc(\'sw-order.detail.billie-payment\')"\n        >\n            {{ $tc(\'sw-order.detail.billie-payment\') }}\n        </sw-tabs-item>\n    {% endblock %}\n\n{% endblock %}\n',snippets:{"de-DE":a,"en-GB":o},methods:{createdComponent(){this.$super("createdComponent"),this._65to64LoadOrderBackwardCompatibility()},_65to64LoadOrderBackwardCompatibility(){this.versionContext||this.order&&this.order.id===this.orderId||(d.commit("swOrderDetail/setLoading",["order",!0]),this.orderRepository.get(this.orderId,Shopware.Context.api,this.orderCriteria).then(e=>{d.commit("swOrderDetail/setOrder",e)}))}}});var c=JSON.parse('{"billie":{"config":{"testCredentialsButton":{"text":"Zugangsdaten testen"},"notification":{"validCredentials":"Die Zugangsdaten sind korrekt!","invalidCredentials":"Die Zugangsdaten sind leider falsch!","failedToTestCredentials":"Beim Pr\xfcfen der Zugangsdaten ist ein Fehler aufgetreten!"}}}}'),p=JSON.parse('{"billie":{"config":{"testCredentialsButton":{"text":"Test credentials"},"notification":{"validCredentials":"The credentials are correct!","invalidCredentials":"The credentials are unfortunately wrong!","failedToTestCredentials":"An error occurred while checking the credentials!"}}}}');let{Component:u,Mixin:f}=Shopware;u.register("billie-test-credentials-button",{template:'{% block billie_test_credentials_button %}\n    <div class="billie-test-credentials-button">\n        {% block billie_test_credentials_button_process_button %}\n            <sw-button-process\n                class="billie-test-credentials-button__process-button"\n                :isLoading="isLoading"\n                :processSuccess="isTestSuccessful"\n                :disabled="isLoading"\n                @click.prevent="testCredentials"\n                @process-finish="onTestFinish"\n                block>\n                {{ $tc(\'billie.config.testCredentialsButton.text\') }}\n            </sw-button-process>\n        {% endblock %}\n    </div>\n{% endblock %}\n',inject:["billieApiService"],mixins:[f.getByName("notification")],snippets:{"de-DE":c,"en-GB":p},props:{apiMode:{type:String,required:!0}},data(){return{isLoading:!1,isTestSuccessful:!1}},methods:{onTestFinish(){this.isTestSuccessful=!1},testCredentials(){this.isTestSuccessful=!1,this.isLoading=!0;let e=document.querySelector(`[name="BilliePaymentSW6.config.${this.apiMode}ClientId"]`).value,t=document.querySelector(`[name="BilliePaymentSW6.config.${this.apiMode}ClientSecret"]`).value,i="test"===this.apiMode;this.billieApiService.testCredentials(e,t,i).then(e=>{this.isLoading=!1,e.success?(this.isTestSuccessful=!0,this.createNotificationSuccess({message:this.$tc("billie.config.notification.validCredentials")})):this.createNotificationError({message:this.$tc("billie.config.notification.invalidCredentials")})}).catch(()=>{this.isLoading=!1,this.createNotificationError({message:this.$tc("billie.config.notification.failedToTestCredentials")})})}}})}()})();