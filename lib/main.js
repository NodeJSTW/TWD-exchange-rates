/*!
 * TWD-exchange-rates (twd.js)
 * https://github.com/NodeJSTW/TWD-exchange-rates
 * 
 * Author: Chieh-Wen Yang <dragon.d.firedrake@gmail.com>
 * Released under MIT license
 */

'use strict'


(function() {

  var twd = {};

  // Load Modules
  var request = require('request');
  var cheerio = require('cheerio');
  var async = require('async');
  var csv = require('csv');
  var fs = require('fs');
  var querystring = require('querystring');
  var Papa = require('babyparse');

  // Query parameters
  var q = querystring.parse('lang=en-US&fileType=1&date=2014-09-02T10:27:11');
  // console.log(q);

  var options = {
	  url: 'http://rate.bot.com.tw/Pages/UIP003/Download.ashx?lang=en-US&fileType=1&date=2014-09-02T14:54:16',
	  headers: {
		  'User-Agent': 'request'
	  }
  }

  /** 
   * Get CSV data, then convert CSV to JSON
   */
  function getExchangeRates() {
    request(options, function(err, response, data) {
	    if (!err && response.statusCode == 200) {
		    // Try to parse the data as JSON
        try {
    	    //console.log(data);
    	    Papa.parse(data, {
    	    	header: true,
			    	worker: true,
		     		delimiter: ",",
		    		step: function(row) {
		    			console.log("Row:", row.data);
		    		},
		    		complete: function() {
		    			console.log("All done!");
		    		}
	    		});
        }	catch (err) {
        	//console.log(err);
        }
      }
    });
  }

  // Export the library module:
	module.exports = twd;
	
}())



//getExchangeRates();