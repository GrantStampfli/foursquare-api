/* global google, $ */ 'use strict';

var Application = window.Application = (function() {
  return {
    run: function() {
		  $(document).ready(function() {
			if ('geolocation' in navigator) {
				console.log('good to go');
			} else {
			  console.log('shit is going down');
			}

			navigator.geolocation.getCurrentPosition(function(position) {
				var mylat = position.coords.latitude;
				var mylng = position.coords.longitude;
				var ll = mylat + ', ' + mylng;
		  	console.log(ll);

				var url = 'https://api.foursquare.com/v2/venues/explore?';
				var fourSquareOptions = {
					'll': ll,
			    // 'near': 'Portland, OR',
			 		'client_id': 'ZEFCPOZI0JUGL1H2IKFMHO1PLHSWCOKKZSDOUSPHYQ2QHNEO',
					'client_secret': 'I214RPZ3LOUZXYXAESRLBGZRJCVI2J1EKYPVSOGPPCH5RZQN',
					'v': '20140612',
					'radius': '1000',
					'section': 'food',
					'limit': '20',
					'venuePhotos': '1'
				};
				$.ajax(url, { dataType: 'jsonp', data: fourSquareOptions})
				.then(function(data, status, xhr) {
					console.log(status);
					console.log('success (promises): ' + data);
					var dataArray = data.response.groups[0].items;

					var rngNumb = Math.floor((Math.random() * dataArray.length));
					var placeArray = data.response.groups[0].items[rngNumb];
					generatePics(generatePicUrl(placeArray));
					generateTitle(placeArray);
					var latitude = placeArray.venue.location.lat;
					var longitude =placeArray.venue.location.lng;
					google.maps.event.addDomListener(window, 'load', initialize(mylat, mylng, latitude, longitude));
				}, function(xhr, status, error) {
					console.log(status);
					console.log('failed (promises): ' + error);
				});
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
				$('<img>').attr('src', urlGenerated).appendTo('div.img');
			}
		function generateTitle (array) {
				$('<h3>').text(array.venue.name).appendTo('div.title');
				// $('div.title').append(array.venue.name);
			}
		var directionsDisplay;
		var directionsService = new google.maps.DirectionsService();
		var map;
		function initialize(mylat, mylng, lat, lng) {
			directionsDisplay = new google.maps.DirectionsRenderer();
		  var myLatlng = new google.maps.LatLng(mylat, mylng);
		  var foodLatlng = new google.maps.LatLng(lat, lng);
			var mapOptions = {
			  zoom: 15,
			  center: myLatlng
			};
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker = new google.maps.Marker({
			    position: foodLatlng,
			    title:'Go here!'
			});
			marker.setMap(map);
			directionsDisplay.setMap(map);
			calcRoute(mylat, mylng, lat, lng);
		}
		function calcRoute(mylat, mylng, lat, lng) {
			var start = mylat + ',' + mylng;
			var end = lat + ',' + lng;
			console.log(end);
			console.log(google.maps.TravelMode.WALKING)
			var request = {
				origin:start,
				destination:end,
				travelMode: google.maps.TravelMode.WALKING
			};
			directionsService.route(request, function(result, status) {
				console.log(google.maps)
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(result);
				}
			});
		}

    },
    controllers: {
      posts: require('./controllers/posts')
    }
  };

})();

$(function() {
  Application.run();
});
