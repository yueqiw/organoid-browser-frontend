"use scrict";

window.onload = function() {
	var channelName = 'UCroBvqCbXYPnQy5B3KyVygg', //https://www.youtube.com/channel/UCroBvqCbXYPnQy5B3KyVygg
		userPublicKey = 'AIzaSyCaIEec20eKRzLktx2LVLkgYzftE87n_hE',
		mainWrapper = document.getElementsByClassName('main-wrapper')[0];

	var channelConfig = {
		part: 'contentDetails',
		id: channelName,
		key: userPublicKey
	};

	var videosConfig = {
		part: 'snippet',
		maxResults: 10,
		key: userPublicKey
	};

	function formatParams(params) {
		return "?" + Object
			.keys(params)
			.map(function(key) {
				return key + "=" + encodeURIComponent(params[key])
			})
			.join("&");
	}

	function createRequest(request, config, playlistId) {
		var xhr = new XMLHttpRequest();
		var videoPlaylistId = '';
		if (playlistId) {
			videoPlaylistId = '&playlistId=' + playlistId + '&';
		}
		xhr.open('GET', request + formatParams(config) + videoPlaylistId, false);
		xhr.send();
		if (xhr.status !== 200) {
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			return (xhr.responseText);
		}
	}

	function getPlaylistIds(playlistId) {
		var elementsList =  document.createDocumentFragment();
		JSON.parse(playlistId).items.forEach(function(item) {
			var playlistId = item.contentDetails.relatedPlaylists.uploads,
				videoArray = createRequest('https://www.googleapis.com/youtube/v3/playlistItems', videosConfig, playlistId),
				videoElement = parseVideo(videoArray),
				itemElement = document.createElement('div');
			itemElement.classList.add('video-container');
			itemElement.innerHTML = videoElement;
			elementsList.appendChild(itemElement);
		});
		mainWrapper.appendChild(elementsList);
	}

	function parseVideo(videoItem) {
		var output = '';
		JSON.parse(videoItem).items.forEach(function(item) {
			var videoTitle = item.snippet.description,
				videoId = item.snippet.resourceId.videoId;
				output += '<div class="video-item"><iframe class="video-demo" src=\"https://www.youtube.com/embed/'+videoId+'\"></iframe><p class="video-info">'+videoTitle+'</p></div>';
		});
		return output;
	}

	getPlaylistIds(createRequest('https://www.googleapis.com/youtube/v3/channels', channelConfig));
};