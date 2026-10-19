var nameExoCookies = 'exocookie';
var ca = document.cookie.split(';');
var acceptCookie = false;

var d = new Date();
d.setTime(d.getTime() + (365 * (24 * 60 * 60 * 1000)));
var expires_cookie = 'expires = ' + d.toUTCString();

for (var i=0; i < ca.length; i++) {
	var c = ca[i];

	while (c.charAt(0) == ' ') {
		c = c.substring(1);
	}

	if (c.indexOf(nameExoCookies) == 0) {
		acceptCookie = true;
	}
}

window.addEventListener('DOMContentLoaded', function() {
	if (!acceptCookie) {
		for (var i=0; i < ca.length; i++) {
			var c1 = ca[i];
			document.cookie = c1 + '; expires = Thu, 01 Jan 1970 00:00:00 GMT path=/';
		}

		document.getElementById('exocookie').style.display = 'flex';
	}
});

function CloseExoCookies() {
	document.getElementById('exocookie').style.display = 'none';
	document.cookie = 'exocookie=true; ' + expires_cookie + '; path=/';
}
