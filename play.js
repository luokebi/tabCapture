var Bg = chrome.extension.getBackgroundPage();
var v = document.querySelector('video');
v.src = window.URL.createObjectURL(Bg.localStream);
var data = [];
var interval;
var interval2;
var i = 0;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');


v.addEventListener('canplay', function () {
	canvas.width = v.videoWidth;
	canvas.height = v.videoHeight;

	interval = setInterval(function () {
		ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
		data.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
	}, 16);
}, false);

document.querySelector('#stop').addEventListener('click',function () {
	Bg.localStream.stop();
	console.log(data);
	clearInterval(interval);
}, false);

document.querySelector('#play').addEventListener('click', function () {
	var canvas2 = document.createElement('canvas');
	document.body.appendChild(canvas2);
	canvas2.width = canvas.width;
	canvas2.height = canvas.height;
	var ctx2 = canvas2.getContext('2d');
	v.style.display = "none";

	interval2 = setInterval(function () {
		if (data[i]) {
			ctx2.putImageData(data[i], 0, 0);
			i++;
		} else {
			alert('finish!');
			clearInterval(interval2);
		}
		
	}, 160);
});
