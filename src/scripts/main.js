// $(function() {
// 	var contentMatch = window.location.href.match(/(\?|\&)content\=([^&]+)/);
// 	var app = new cc.Extended_CotApp('');
// 	app.render(function () {}, contentMatch && contentMatch.length >= 3 ? contentMatch[2] : '01_signin.html');
// });

// var host = "http://shelby.corp.toronto.ca:9080";
var host = "";
var cotLogin = null;
// QA
// var cotCcRoot= 'https://was-intra-qa.toronto.ca';
// PROD
var cotCcRoot= 'https://insideto-secure.toronto.ca';
// DEV
// var cotCcRoot= 'https://was-intra-sit.toronto.ca';

$(function () {
	var contentMatch = window.location.href.match(/(\?|\&)content\=([^&#]+)/);
	var app = new cc.Extended_CotApp('');
	var username = $.cookie("extract.cot_uname");
	if (!username) {
		history.pushState(null, null, '?content=01_signin.html');
		app.render(function () { auth(); }, '01_signin.html');
	} else {
		app.render(function () { auth() }, contentMatch && contentMatch.length >= 3 ? contentMatch[2] : '01_signin.html');
	}
	// if (!username && (contentMatch && contentMatch.length >= 3 ? contentMatch[2] : '01_signin.html') != "01_signin.html") {
	// 	window.location = "?content=01_signin.html";
	// }
	// app.render(function () { }, contentMatch && contentMatch.length >= 3 ? contentMatch[2] : '01_signin.html');
});

function auth() {
	cotLogin = new cot_login({
		appName: 'extract',
		ccRoot: cotCcRoot,
		onLogin: function (result) {
			// app.render(function () {}, '02_select.html');
			if (!window.location.href.includes('03_config') && !window.location.href.includes('02_select')) {
				window.location = "?content=02_select.html";
			}
		}
	});
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
