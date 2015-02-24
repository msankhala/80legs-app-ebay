// This 80app returns the full HTML of each URL crawled

var EightyApp = function() {
  this.processDocument = function(html, url, headers, status, jQuery) {
    var app = this;
    $ = jQuery;
    var $html = app.parseHtml(html, $);

    var alibaba_china_product = {};
    alibaba_china_product.url = url;
    regex = /[\u4E00–\u9FCC\u3400–\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;
    alibaba_china_product.name = app.decodeUnicode(regex, $html.find('#mod-detail-hd .d-title').text().trim());
    console.log(alibaba_china_product.name);
    alibaba_china_product.price_range = {};
    alibaba_china_product.price_range.price1 = $html.find('#mod-detail-bd .widget-custom-container table td.ladder-2-1 .value').text().trim();
    alibaba_china_product.price_range.price2 = $html.find('#mod-detail-bd .widget-custom-container table td.ladder-2-2 .value').text().trim();
    alibaba_china_product.item_condition = $html.find('#vi-itm-cond').text().trim();
    url_arr = url.split('/');
    basename = url_arr[url_arr.length - 1];
    item_number = basename.split('.')[0];
    alibaba_china_product.item_number = item_number;
    alibaba_china_product.quantity = $html.find('.total').text().trim();

    return JSON.stringify(alibaba_china_product);
  };

  this.parseLinks = function(html, url, headers, status, jQuery) {
    var app = this;
    var $ = jQuery;
    var $html = app.parseHtml(html, $);
    var links = [];

    // gets all links in the html document
    // $html.find('.lvtitle a').each(function(i, obj) {
    //  var link = app.makeLink(url, $(this).attr('href'));
    //  if(link !== null) {
    //    links.push(link);
    //  }
    // });
    links.push(url);
    return links;
  };
};

try {
  // Testing
  module.exports = function(EightyAppBase) {
    EightyApp.prototype = new EightyAppBase();
    return new EightyApp();
  };
} catch(e) {
  // Production
  console.log("Eighty app exists.");
  EightyApp.prototype = new EightyAppBase();
}
