// This 80app returns the full HTML of each URL crawled

var EightyApp = function() {
  this.processDocument = function(html, url, headers, status, jQuery) {
    var app = this;
    $ = jQuery;
    var $html = app.parseHtml(html, $);

    var ebay_seller = {};
    ebay_seller.seller_url = url;
    ebay_seller.seller_name = $html.find('.mbg .mbg-id').text().trim();
    ebay_seller.seller_score = $html.find('.mbg .mbg-id').next().text().trim();
    return JSON.stringify(ebay_seller);
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
