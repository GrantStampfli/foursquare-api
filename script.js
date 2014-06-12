$(document).ready(function() {
	var url = 'https://api.foursquare.com/v2/venues/explore?';
	var fourSquareOptions = {
    'near': 'Portland, OR',
 		'client_id': 'ZEFCPOZI0JUGL1H2IKFMHO1PLHSWCOKKZSDOUSPHYQ2QHNEO',
		'client_secret': 'I214RPZ3LOUZXYXAESRLBGZRJCVI2J1EKYPVSOGPPCH5RZQN',
		'v': '20140612',
		'radius': '2000',
		'section': 'food',
		'limit': '100',
		'venuePhotos': '1'
	};
	$.ajax(url, { dataType: 'jsonp', data: fourSquareOptions})
	.then(function(data, status, xhr) {
		console.log(status);
		console.log('success (promises): ' + data);
		var dataArray = data.response.groups[0].items;

		var rngNumb = Math.floor((Math.random() * 100));
		var placeArray = data.response.groups[0].items[rngNumb];
		generatePics(generatePicUrl(placeArray));
		generateTitle(placeArray);
		var latitude = placeArray.venue.location.lat;
		var longitude =placeArray.venue.location.lng;
		console.log(latitude, longitude);
		google.maps.event.addDomListener(window, 'load', initialize(latitude, longitude));

	}, function(xhr, status, error) {
		console.log(status);
		console.log('failed (promises): ' + error);
	});
});

var generatePicUrl = function(array) {
	var prefix = array.venue.photos.groups[0].items[0].prefix;
	var size = '500x500';
	var suffix = array.venue.photos.groups[0].items[0].suffix;
	var url = prefix + size + suffix ;
	return url;
};

function generatePics(urlGenerated) {
		$('div.img').append('<img src="' + urlGenerated + '"/>');
	}
function generateTitle (array) {
		$('div.title').append(array.venue.name);
	}

var map;
function initialize(lat, lng) {
  var myLatlng = new google.maps.LatLng(lat, lng);
var mapOptions = {
  zoom: 16,
  center: myLatlng
};
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

var marker = new google.maps.Marker({
    position: myLatlng,
    title:""
});


marker.setMap(map);
  }

console.log(navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
}));


