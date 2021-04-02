import Plugin from 'src/plugin-system/plugin.class';
import StoreApiClient from 'src/service/store-api-client.service';

// xhr call storage
let xhr = null;

export default class BilliePayment extends Plugin {

  static options = {
    src: null,
    checkoutSessionId: null,
    merchantName: null,
    checkoutData: null
  };

  init() {
    this._insertWidget();
    this._registerEvents();
  }

  _registerEvents() {
    this.el.form.addEventListener('submit', this._submitForm.bind(this))
  }

  _submitForm(event) {
    if (this._isAddressConfirmed()) {
      //address has been already confirmed and validated. So we will process the order.
      return true;
    } else {
      // address has not been confirmed and must be validated
      event.preventDefault();

      BillieCheckoutWidget.mount({
        billie_config_data: {
          'session_id': this.options.checkoutSessionId,
          'merchant_name': this.options.merchantName
        },
        billie_order_data: this.options.checkoutData
      }).then((data) => {
        const client = new StoreApiClient;

        let url = '/billie-payment/update-addresses';
        let locationMatch = window.location.href.match(/account\/order\/edit\/([A-Za-z0-9]+)/);
        if (locationMatch && locationMatch.length === 2) {
          // payment get updated
          url += '/' + locationMatch[1];
        }

        client.post(url, JSON.stringify(data), (response, xmlHttpRequest) => {
          if (xmlHttpRequest.status === 204) {
            this._setAddressConfirmed(true);
            this.el.value = this.options.checkoutSessionId;
            this.el.form.submit();
          } else {
            console.log(response);
          }
        });
      }).catch((err) => {
        // code to execute when there is an error or when order is rejected
        if (err.state !== 'declined') {
          //we assume, that the error popup of billie will be displayed, when the order got declined
          console.error('Error occurred', err);
          // this._showDefaultMessage();
        }
        // me.unlockSubmitButton();
      });
    }
  }

  _insertWidget() {
    window.billiePaymentData = this.options.checkoutData;
    // @formatter:off
    (function(w,d,s,o,f,js,fjs){
      w['BillieCheckoutWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
      w.billieSrc=f;js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];js.id=o;
      js.src=f;js.charset='utf-8';js.async=1;fjs.parentNode.insertBefore(js,fjs);bcw('init');
    }(window,document,'script','bcw', this.options.src));
    // @formatter:on
  }

  _setAddressConfirmed(flag) {
    this.el.form.dataset.billieConfirmed = parseInt(flag);
  }

  _isAddressConfirmed() {
    return parseInt(this.el.form.dataset.billieConfirmed) === 1;
  }

}
