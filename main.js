var synth = new Tone.PolySynth().toDestination().sync();
synth.maxPolyphony = 256;

var play = function () {
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
	var n = document.querySelector('#n')/1 || 1;

	// frequency maximum variation
	var fr = Math.pow(ST,n);

	// variance index
	// https://riptutorial.com/javascript/example/8330/random--with-gaussian-distribution
	var v = 1

	// number of voices
	var voices = 15

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
	  for (j = 0; j < voices; j++) {
	    let d = (randomG(v)-0.5)*2*(fr-1);
	    let r;
	    if (d<0) {
	      r = 1/(-d+1);
	    } else {
	      r = d+1;
	    }
	    synth.triggerAttackRelease(Tone.Frequency(origNotes[i])*r, duration, times[i]);
	  }
	}
	Tone.Transport.start();
}

document.querySelector('button#stop').addEventListener('click', function () {
	Tone.Transport.stop().cancel();
	synth.releaseAll();
});

document.querySelector('button#startApp').addEventListener('click', async () => {
	await Tone.start();
	play();
});

document.querySelector('button#start').addEventListener('click', function () {
	play();
});
