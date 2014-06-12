$(document).ready(function() {
	var url = 'https://api.foursquare.com/v2/venues/explore?' +
	'near=Portland,%20OR&' + 
	'client_id=ZEFCPOZI0JUGL1H2IKFMHO1PLHSWCOKKZSDOUSPHYQ2QHNEO&' +
	'client_secret=I214RPZ3LOUZXYXAESRLBGZRJCVI2J1EKYPVSOGPPCH5RZQN&'+
	'v=20140612&' +
	'radius=1000&' +
	'section=food&' +
	'limit=20&' +
	'venuePhotos=1&';
	console.log(url);
	$.ajax(url, { dataType: 'jsonp' })
	.then(function(data, status, xhr) {
		console.log(status);
		console.log('success (promises): ' + data);
		console.log(data);
		console.log(data.response);
	}, function(xhr, status, error) {
		console.log(status);
		console.log('failed (promises): ' + error);
	});
});

var assemblePicUrl = function(obj) {
	var rngNumb = Math.floor((Math.random() * 30) + 1);
	var placeArray = obj.response.venues;
	var url = generatePicUrl(placeArray, rngNumb);
	return url;
};

var generatePicUrl = function(array, numb) {
	// https://irs0.4sqi.net/img/general/300x500/2341723_vt1Kr-SfmRmdge-M7b4KNgX2_PHElyVbYL65pMnxEQw.jpg
	// https://ss1.4sqi.net/img/categories_v2/food/icecream_/original.png
	var prefix = array[numb].categories[0].icon.prefix;
	var size = 'original';
	var suffix = array[numb].categories[0].icon.suffix;
	var url = prefix + size + suffix ;
	return url;
};