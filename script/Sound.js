var Sound = function () {
  this.synth = [
    new Tone.PolySynth().toDestination().sync(),
    new Tone.PolySynth().toDestination().sync()
  ]
  this.synth[0].maxPolyphony = 256;
  this.synth[1].maxPolyphony = 256;

  this.n = []; // range
  this.v = []; // variance
  this.vo = []; // voices

  this.generateNew = function () {
  	this.n[0] = Math.floor(Math.random()*4);
  	this.n[1] = Math.floor(Math.random()*4);
  	this.v[0] = Math.floor(Math.random()*3+1);
  	this.v[1] = Math.floor(Math.random()*3+1);
  	this.vo[0] = 2**Math.floor(Math.random()*5);
  	this.vo[1] = 2**Math.floor(Math.random()*5);
    return ''+this.n[0]+this.v[0]+this.vo[0]+'.'+this.n[1]+this.v[1]+this.vo[1];
  }

  this.stop = function () {
    Tone.Transport.stop().cancel();
    this.synth[0].releaseAll();
    this.synth[1].releaseAll();
  }

  this.play = function (k) {
  	this.stop();

  	var durations = [
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

  	var times = [0];
  	for (var i = 1; i<durations.length; i++) {
  		times[i] = times[i-1]+durations[i-1];
  	}

  	var origNotes = ['C3','C3','D3','C3','F3','E3','C3','C3','D3','C3','G3','F3','C3','C3','C4','A3','F3','E3','D3','Bb3','Bb3','A3','F3','G3','F3']

  	//semitone
  	var ST = 1.05946309436;

  	// semitone multiplier
  	var nk = this.n[k];

  	// frequency maximum variation
  	var fr = Math.pow(ST,nk);

  	// variance index
  	// https://riptutorial.com/javascript/example/8330/random--with-gaussian-distribution
  	var vk = this.v[k];

  	// number of voices
  	var voicesk = this.vo[k];

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
  	    this.synth[k].triggerAttackRelease(Tone.Frequency(origNotes[i])*r, duration, times[i]);
  	  }
  	}
  	Tone.Transport.start();
  }
}
