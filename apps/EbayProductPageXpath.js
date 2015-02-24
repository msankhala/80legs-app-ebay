// This 80app returns the full HTML of each URL crawled
// function _x(STR_XPATH) {
//     var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
//     var xnodes = [];
//     var xres;
//     while (xres = xresult.iterateNext()) {
//         xnodes.push(xres);
//     }

//     return xnodes;
// }

var EightyApp = function() {
  this.processDocument = function(html, url, headers, status, jQuery) {
    // return html;
    var app = this;
    $ = jQuery;
    var $html = app.parseHtml(html, $);
    var object = {};
    xpath = require('jquery_xpath_js');

    var products = [];
    // $html.filter('#ListViewInner > li').each(function(i, obj) {
    //  var product = {};
    //  product.name = $(this).filter('.lvtitle a').text();
    //  // product.url = $(this).filter('.lvtitle a').attr('href');
    //  product.price = $(this).filter('.lvprice > span').clone().children().remove().end().text();
    //  products.push(product);
    // });
    products.name = $html.xpath('//*[@id="itemTitle"]').text().trim();
    products.price = $html.xpath('//*[@id="prcIsum_bidPrice"]').text().trim();
    object.products = products;

    return JSON.stringify(object);
  };

  this.parseLinks = function(html, url, headers, status, jQuery) {
    var app = this;
    var $ = jQuery;
    var $html = app.parseHtml(html, $);
    var links = [];

    // gets all links in the html document
    // $html.find('.lvtitle a').each(function(i, obj) {
    //   var link = app.makeLink(url, $(this).attr('href'));
    //   if(link !== null) {
    //     links.push(link);
    //   }
    // });

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
