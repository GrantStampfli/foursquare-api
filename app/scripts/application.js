/* global $ */ 'use strict';

var Application = window.Application = (function() {
  return {
    run: function() {
		  $(document).ready(function() {
			'use strict';
			if ("geolocation" in navigator) {
				console.log('good to go');
			} else {
			  console.log('shit is going down');
			}

			navigator.geolocation.getCurrentPosition(function(position) {
				var ll = position.coords.latitude + ',' +position.coords.longitude;
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
					'limit': '200',
					'venuePhotos': '1'
				};
				$.ajax(url, { dataType: 'jsonp', data: fourSquareOptions})
				.then(function(data, status, xhr) {
					console.log(status);
					console.log('success (promises): ' + data);
					var dataArray = data.response.groups[0].items;
					console.log(data);
					var rngNumb = Math.floor((Math.random() * dataArray.length));
					var placeArray = data.response.groups[0].items[rngNumb];
					generatePics(generatePicUrl(placeArray));
					generateTitle(placeArray);
					var latitude = placeArray.venue.location.lat;
					var longitude =placeArray.venue.location.lng;
					google.maps.event.addDomListener(window, 'load', initialize(latitude, longitude));
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
				$('<h6>').text(array.venue.contact.formattedPhone).appendTo('div.phone');
				$('<p>').text(array.venue.location.address).appendTo('div.address');
				$('<p>').text(array.venue.location.city + ', ' + array.venue.location.state).appendTo('div.address');

			}

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

    },
    controllers: {
      posts: require('./controllers/posts')
    }
  };

})();

$(function() {
  Application.run();
});
