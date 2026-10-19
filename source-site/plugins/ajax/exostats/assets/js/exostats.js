(function($){
	"use strict";

	// cached google configuration object
	var googleApi = {};

	function sendGtag(clickType, value) {
		if (!googleApi.idApi) {
			return;
		}

		var mapping = {
			tel: 'keyApiPhones',
			mail: 'keyApiEmails',
			address: 'keyApiAddresses',
			form: 'keyApiForms'
		};

		var listKey = mapping[clickType];
		if (!listKey || typeof googleApi[listKey] === 'undefined') {
			return;
		}

		Object.values(googleApi[listKey]).forEach(function(item){
			var match = false;
			switch(clickType) {
				case 'tel':    match = (value === item.phoneNumber); break;
				case 'mail':   match = (value === item.emailAddress); break;
				case 'address':
					match = (value.replace(/\r?\n/g,' ') === item.postalAddress);
					break;
				case 'form':
					// value unused for forms, matching is done elsewhere
					break;
			}
			if (match) {
				var key = 'googleKeyApi' + clickType.charAt(0).toUpperCase() + clickType.slice(1);
				gtag('event','conversion',{send_to: googleApi.idApi + '/' + item[key], value:1.0, currency:'EUR', event_callback:function(){}});
			}
		});
	}

	function sendAjax(click, value) {
		$.ajax({
			type: 'POST',
			async: false,
			url: '/index.php?option=com_ajax&plugin=Exostats&format=json',
			data: {
				click: click,
				click_value: value,
				request_uri: window.location.pathname,
				title: document.title
			}
		});
	}

	$(function(){
		if (typeof Joomla !== 'undefined') {
			googleApi = Joomla.getOptions('googleApi') || {};
			if (googleApi.idApi) {
				$('<script/>',{
					async: true,
					src: 'https://www.googletagmanager.com/gtag/js?id=' + googleApi.idApi,
					type: 'text/javascript'
				}).appendTo('head');
			}
		}

		$('a[href^="tel:"], a[href^="callto:"]').on('click',function(){
			var val = $(this).text().trim();
			sendGtag('tel',val);
			sendAjax('tel',val);
		});

		$('a[href^="mailto:"]').on('click',function(){
			var val = $(this).text().trim();
			sendGtag('mail',val);
			sendAjax('mail',val);
		});

		$('a[href*="google.com/maps/place/"], a[href*="google.fr/maps/place/"]').on('click',function(){
			var val = $(this).text().trim();
			sendGtag('address', val);
			sendAjax('address', val);
		});

		$('.com-baforms-wrapper > form .ba-form-submit-btn').on('click',function(){
			var form = $(this).closest('form');
			var id = form.data('id');
			if (googleApi && googleApi.keyApiForms) {
				Object.values(googleApi.keyApiForms).forEach(function(item){
					if (parseInt(item.itemId) === id && !form.find('.ba-input-wrapper').hasClass('ba-alert')) {
						gtag('event','conversion',{send_to: googleApi.idApi + '/' + item.googleKeyApiForm, value:1.0, currency:'EUR', event_callback:function(){}});
					}
				});
			}
			sendAjax('form','');
		});
	});
})(jQuery);
