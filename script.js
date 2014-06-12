$(document).ready(function() {
	var url = 'https://api.foursquare.com/v2/venues/search?' +
	'll=40.7,-74&' + 
	'oauth_token=JP04W21OWYKPVTZJ3PSALNNCTT2G5H1KBLNNSJR3OZFDGRDF&v=20140612';
	$.ajax(url, { dataType: 'jsonp' })
	.then(function(data, status, xhr) {
		console.log(status);
		console.log('success (promises): ' + data);
		console.log(data.response.venues[0].id);
	}, function(xhr, status, error) {
		console.log(status);
		console.log('failed (promises): ' + error);
	});
});