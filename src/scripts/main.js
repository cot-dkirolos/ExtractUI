// $(function() {
// 	var contentMatch = window.location.href.match(/(\?|\&)content\=([^&]+)/);
// 	var app = new cc.Extended_CotApp('');
// 	app.render(function () {}, contentMatch && contentMatch.length >= 3 ? contentMatch[2] : '01_signin.html');
// });


var cotLogin = null;
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
		// ccRoot: 'https://was-intra-sit.toronto.ca',
		ccRoot: 'https://insideto-secure.toronto.ca',
		onLogin: function (result) {
			// app.render(function () {}, '02_select.html');
			if (window.location.href.includes('01_signin.html')) {
				window.location = "?content=02_select.html";
			}
		}
	});
}