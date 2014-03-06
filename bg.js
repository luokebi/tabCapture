var localStream;

chrome.browserAction.onClicked.addListener(function () {
	chrome.tabCapture.capture({
		audio: false,
		video: true
	}, function(stream){
		localStream = stream;
		chrome.tabs.create({url:"play.html"})
	});
});