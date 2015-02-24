// This 80app returns the full HTML of each URL crawled

var EightyApp = function() {
	this.processDocument = function(html, url, headers, status, jQuery) {
		var app = this;
		$ = jQuery;
		var $html = app.parseHtml(html, $);

		var ebay_product = {};
		ebay_product.url = url;
		ebay_product.name = $html.find('#itemTitle').text().trim();
		ebay_product.price = $html.find('#prcIsum').text().trim();
		ebay_product.item_condition = $html.find('#vi-itm-cond').text().trim();
		ebay_product.item_number = $html.find('#vi-desc-maincntr .iti-act-num').text().trim();
		ebay_product.brand = $html.find('#vi-desc-maincntr .itemAttr table td h2[itemprop="brand"]').text().trim();
		ebay_product.seller_url = $html.find('.si-inner .mbg a').attr('href');
		ebay_product.seller_name = $html.find('.si-inner .mbg a span').text().trim();

		return JSON.stringify(ebay_product);
	};

	this.parseLinks = function(html, url, headers, status, jQuery) {
		var app = this;
		var $ = jQuery;
		var $html = app.parseHtml(html, $);
		var links = [];

		// gets all links in the html document
		// $html.find('.lvtitle a').each(function(i, obj) {
		// 	var link = app.makeLink(url, $(this).attr('href'));
		// 	if(link !== null) {
		// 		links.push(link);
		// 	}
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
