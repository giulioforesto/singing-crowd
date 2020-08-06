var synth = [];
synth[0] = new Tone.PolySynth().toDestination().sync();
synth[1] = new Tone.PolySynth().toDestination().sync();
synth[0].maxPolyphony = synth[1].maxPolyphony = 256;

var n = [], v = [], voices = [];

var generateNew = function (nn, vv, vo) {
	nn[0] = Math.floor(Math.random()*4);
	nn[1] = Math.floor(Math.random()*4);
	vv[0] = Math.floor(Math.random()*3+1);
	vv[1] = Math.floor(Math.random()*3+1);
	vo[0] = 2**Math.floor(Math.random()*5);
	vo[1] = 2**Math.floor(Math.random()*5);
	document.querySelector('div#code').innerText = ''+n[0]+v[0]+voices[0]+'.'+n[1]+v[1]+voices[1];
}

var stop = function () {
	Tone.Transport.stop().cancel();
	synth[0].releaseAll();
	synth[1].releaseAll();
}

var next = function () {
	stop();
	generateNew(n, v, voices);
}

var loadCounter = 0;
document.querySelector('iframe').onload = function () {
	loadCounter++;
	if (loadCounter % 2 == 1) {
		next();
	}
}

var play = function (k) {
	stop();

	durations = [
	  Tone.Time('8t')*2,
	  Tone.Time('8t'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('2n'),
	  Tone.Time('8t')*2,
	  Tone.Time('8t'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('2n'),
	  Tone.Time('8t')*2,
	  Tone.Time('8t'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('2n'),
	  Tone.Time('8t')*2,
	  Tone.Time('8t'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	  Tone.Time('4n'),
	]

	times = [0];
	for (i = 1; i<durations.length; i++) {
		times[i] = times[i-1]+durations[i-1];
	}

	origNotes = ['C3','C3','D3','C3','F3','E3','C3','C3','D3','C3','G3','F3','C3','C3','C4','A3','F3','E3','D3','Bb3','Bb3','A3','F3','G3','F3']

	//semitone
	var ST = 1.05946309436;

	// semitone multiplier
	var nk = n[k];

	// frequency maximum variation
	var fr = Math.pow(ST,nk);

	// variance index
	// https://riptutorial.com/javascript/example/8330/random--with-gaussian-distribution
	var vk = v[k];

	// number of voices
	var voicesk = voices[k];

	// simili-gaussian random generator
	function randomG(vv){
	    var r = 0;
	    for(let i = vv; i > 0; i --){
	        r += Math.random();
	    }
	    return r / vv;
	}

	for (i = 0; i < durations.length; i++) {
		let duration = durations[i];
	  if (origNotes[i] == origNotes[i+1]) {
	  	duration *= 0.6;
	  }
	  for (j = 0; j < voicesk; j++) {
	    let d = (randomG(vk)-0.5)*2*(fr-1);
	    let r;
	    if (d<0) {
	      r = 1/(-d+1);
	    } else {
	      r = d+1;
	    }
	    synth[k].triggerAttackRelease(Tone.Frequency(origNotes[i])*r, duration, times[i]);
	  }
	}
	Tone.Transport.start();
}

document.querySelector('button#stop0').addEventListener('click', stop);
document.querySelector('button#stop1').addEventListener('click', stop);

document.querySelector('button#start0').addEventListener('click', async () => {
	await Tone.start();
	play(0);
	document.querySelector('button#start0').addEventListener('click', function () {play(0)});
}, {once: true});

document.querySelector('button#start1').addEventListener('click', async () => {
	await Tone.start();
	play(1);
	document.querySelector('button#start1').addEventListener('click', function () {play(1)});
}, {once: true});
