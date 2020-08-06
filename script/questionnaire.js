var sound = new Sound();

var stop = function () {
	sound.stop();
}

var next = function () {
	stop();
	document.querySelector('div#code').innerText = sound.generateNew();
}

// calls next after form submission (form loads once at new form call and once at submission)
var loadCounter = 0;
document.querySelector('iframe').onload = function () {
	stop();
	loadCounter++;
	if (loadCounter % 2 == 1) {
		next();
	}
}

document.querySelector('button#stop0').addEventListener('click', stop);
document.querySelector('button#stop1').addEventListener('click', stop);

document.querySelector('button#start0').addEventListener('click', async () => {
	await Tone.start();
	sound.play(0);
	document.querySelector('button#start0').addEventListener('click', function () {sound.play(0)});
}, {once: true});

document.querySelector('button#start1').addEventListener('click', async () => {
	await Tone.start();
	sound.play(1);
	document.querySelector('button#start1').addEventListener('click', function () {sound.play(1)});
}, {once: true});
