/*awesome synth architecture from web audio API ninja Chris Wilson*/
var voices = new Array();

var _S={

ModWaveform : 'sine',	// SINE
ModFrequency : 0, // Hz * 10 : 2.1
oscwaves:['sine','square','sawtooth','triangle'],
Osc1Waveform : 'square',
Osc1Octave : 1,  // 16'     1is16
Osc1Detune : 5,	// 0
Osc1Mix : 80,	// 50%

Osc2Waveform : 'triangle', // SQ:1, sin:0, tri:3
Osc2Octave : 1,  // 16'    0is16
Osc2Detune : -5,	// fat detune makes pretty analogue-y sound.  :)
Osc2Mix : 80,	// 0%

FilterCutoff : 45,
FilterQ : 7.0,
FilterMod : 0,

FilterEnv : 0,

EnvA : 2,
EnvD : 15,
EnvS : 100,
EnvR : 10,

FilterEnvA : 2,
FilterEnvD : 15,
FilterEnvS : 50,
FilterEnvR : 10,

Vol : 99,


effectChain : null,
waveshaper : null,
volNode : null,

Octave : 3,
modOscFreqMultiplier : 1,
moDouble : false,
moQuadruple : false,

noteOn : function( note, velocity ) {
	if (voices[note] == null) {
		// Create a new synth node
		voices[note] = new Voice(note, velocity);
		/*var e = document.getElementById( "k" + note );
		if (e)
			e.classList.add("pressed");*/
	}
},

noteOff :function( note ) {
	if (voices[note] != null) {
		// Shut off the note playing and clear it 
		voices[note].noteOff();
		voices[note] = null;
		/*var e = document.getElementById( "k" + note );
		if (e)
			e.classList.remove("pressed");*/
	}

},

//var currentPitchWheel = 0.0;
// 'value' is normalized to [-1,1]
/*function pitchWheel( value ) {
	var i;

	currentPitchWheel = value;
	for (var i=0; i<255; i++) {
		if (voices[i]) {
			if (voices[i].osc1)
				voices[i].osc1.detune.value = currentOsc1Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
			if (voices[i].osc2)
				voices[i].osc2.detune.value = currentOsc2Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
		}
	}
}*/

onModWaveform : function( value ) {
	_S.ModWaveform = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setModWaveform( _S.ModWaveform );
		}
	}
},


onModFrequency : function( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	_S.ModFrequency = value;
	var oscFreq = _S.ModFrequency * _S.modOscFreqMultiplier;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateModFrequency( oscFreq );
		}
	}
},

/*function onModOsc1( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	currentModOsc1 = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateModOsc1( value );
		}
	}
}

function onModOsc2( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	currentModOsc2 = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateModOsc2( value );
		}
	}
}*/

onFilterCutoff : function( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	_S.FilterCutoff = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setFilterCutoff( value );
		}
	}
},

onFilterQ : function( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	_S.FilterQ = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setFilterQ( value );
		}
	}
},

onFilterMod : function( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	_S.FilterMod = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setFilterMod( value );
		}
	}
},

onFilterEnv : function( value ) {
	_S.FilterEnv = value;
},

onOsc1Wave : function( value ) {
	_S.Osc1Waveform = value;
	//currentOsc1Waveform = oscwaves[ev.target.selectedIndex];
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setOsc1Waveform( _S.Osc1Waveform );
		}
	}
},

onOsc1Octave : function( value ) {
	_S.Osc1Octave = value;
	//currentOsc1Octave = ev.target.selectedIndex;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Frequency();
		}
	}
},

/*function onOsc1Detune( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	currentOsc1Detune = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Frequency();
		}
	}
}*/

onOsc1Mix : function( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	_S.Osc1Mix = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc1Mix( value );
		}
	}
},

onOsc2Wave : function( value ) {
	_S.Osc2Waveform = value;
	//currentOsc2Waveform = oscwaves[ev.target.selectedIndex];
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].setOsc2Waveform( _S.Osc2Waveform );
		}
	}
},

onOsc2Octave : function( value ) {
	_S.Osc2Octave = value;
	//currentOsc2Octave = ev.target.selectedIndex;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc2Frequency();
		}
	}
},

/*function onOsc2Detune( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	currentOsc2Detune = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc2Frequency();
		}
	}
}*/

onOsc2Mix : function( value ) {
	if (value.currentTarget)
		value = value.currentTarget.value;
	_S.Osc2Mix = value;
	for (var i=0; i<255; i++) {
		if (voices[i] != null) {
			voices[i].updateOsc2Mix( value );
		}
	}
},

onEnvA : function( value ) {
	_S.EnvA = value;
},

onEnvD : function( value ) {
	_S.EnvD = value;
},

onEnvS : function( value ) {
	_S.EnvS = value;
},

onEnvR : function( value ) {
	_S.EnvR = value;
},

onFilterEnvA : function( value ) {
	_S.FilterEnvA = value;
},

onFilterEnvD : function( value ) {
	_S.FilterEnvD = value;
},

onFilterEnvS : function( value ) {
	_S.FilterEnvS = value;
},

onFilterEnvR : function( value ) {
	_S.FilterEnvR = value;
},

onDrive : function( value ) {
	_S.Drive = value;
    waveshaper.setDrive( 0.01 + (_S.Drive*_S.Drive/500.0) );
},

onVolume : function( value ) {
	volNode.gain.value = value/100.0;
},

onReverb: function( value ) {
	value = value/100;

	// equal-power crossfade
	var gain1 = Math.cos(value * 0.5*Math.PI);
	var gain2 = Math.cos((1.0-value) * 0.5*Math.PI);

	//revBypassGain.gain.value = gain1;
	//revGain.gain.value = gain2;
}

} //END _S

/*
var FOURIER_SIZE = 4096;
var wave = false;

	if ( wave ) {
		var real = new Float32Array(FOURIER_SIZE);
		var imag = new Float32Array(FOURIER_SIZE);
		real[0] = 0.0;
		imag[0] = 0.0;

		for (var i=1; i<FOURIER_SIZE; i++) {
			real[i]=1.0;
			imag[i]=1.0;
		}

		var wavetable = Audiocontext.createWaveTable(real, imag);
		oscillatorNode.setWaveTable(wavetable);
	} else {

*/

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function filterFrequencyFromCutoff( pitch, cutoff ) {
    var nyquist = 0.5 * Audiocontext.sampleRate;

    var filterFrequency = Math.pow(2, (9 * cutoff) - 1) * pitch;
    if (filterFrequency > nyquist)
        filterFrequency = nyquist;
	return filterFrequency;
}

function Voice( note, velocity ) {
	this.originalFrequency = frequencyFromNoteNumber( note );

	// create osc 1
	this.osc1 = Audiocontext.createOscillator();
	this.updateOsc1Frequency();
	this.osc1.type = _S.Osc1Waveform;

	this.osc1Gain = Audiocontext.createGain();
	this.osc1Gain.gain.value = 0.005 * _S.Osc1Mix;
//	this.gain.gain.value = 0.05 + (0.33 * velocity);
	this.osc1.connect( this.osc1Gain );

	// create osc 2
	this.osc2 = Audiocontext.createOscillator();
	this.updateOsc2Frequency();
	this.osc2.type = _S.Osc2Waveform;

	this.osc2Gain = Audiocontext.createGain();
	this.osc2Gain.gain.value = 0.005 * _S.Osc2Mix;
	this.osc2.connect( this.osc2Gain );

	// create modulator osc
	this.modOsc = Audiocontext.createOscillator();
	this.modOsc.type = _S.ModWaveform;
	this.modOsc.frequency.value = _S.ModFrequency/10 * _S.modOscFreqMultiplier;
/*
	this.modOsc1Gain = Audiocontext.createGain();
	this.modOsc.connect( this.modOsc1Gain );
	console.log('aaaarg')
	this.modOsc1Gain.gain.value = currentModOsc1/10;
	this.modOsc1Gain.connect( this.osc1.frequency );	// tremolo
console.log('aaaaaaa')
	this.modOsc2Gain = Audiocontext.createGain();
	this.modOsc.connect( this.modOsc2Gain );
		console.log('aaaarg')
	this.modOsc2Gain.gain.value = currentModOsc2/10;
	this.modOsc2Gain.connect( this.osc2.frequency );	// tremolo*/

	// create the LP filter
	//console.log('heel?')
	this.filter1 = Audiocontext.createBiquadFilter();
	this.filter1.type = 'lowpass';
	this.filter1.Q.value = _S.FilterQ;
	//this.filter2 = Audiocontext.createBiquadFilter();
	//this.filter2.type = this.filter2.LOWPASS;
	//this.filter2.Q.value = currentFilterQ;

	this.osc1Gain.connect( this.filter1 );
	this.osc2Gain.connect( this.filter1 );
	//this.filter1.connect( this.filter2 );

	// connect the modulator to the filters
	this.modFilterGain = Audiocontext.createGain();
	this.modOsc.connect( this.modFilterGain );
	this.modFilterGain.gain.value = _S.FilterMod*10;
	this.modFilterGain.connect( this.filter1.detune );	// filter tremolo
	//this.modFilterGain.connect( this.filter2.detune );	// filter tremolo

	// create the volume envelope
	this.envelope = Audiocontext.createGain();
	this.filter1.connect( this.envelope );
	this.envelope.connect( effectChain );

	// set up the volume and filter envelopes
	var now = Audiocontext.currentTime;
	var envAttackEnd = now + (_S.EnvA/20.0);

	this.envelope.gain.value = 0.0;
	this.envelope.gain.setValueAtTime( 0.0, now );
	this.envelope.gain.linearRampToValueAtTime( 1.0, envAttackEnd );
	this.envelope.gain.setTargetAtTime( (_S.EnvS/100.0), envAttackEnd, (_S.EnvD/100.0)+0.001 );

    var pitchFrequency = this.originalFrequency;
    var filterInitLevel = filterFrequencyFromCutoff( pitchFrequency, _S.FilterCutoff/100 );
	var filterAttackLevel = filterFrequencyFromCutoff( pitchFrequency, _S.FilterCutoff/100 +
		(_S.FilterEnv/120) );
	var filterSustainLevel = filterFrequencyFromCutoff( pitchFrequency, _S.FilterCutoff/100 +
		((_S.FilterEnv/120) * (_S.FilterEnvS/100.0)) );
	var filterAttackEnd = now + (_S.FilterEnvA/20.0);

//	console.log( "pitchFrequency: " + pitchFrequency + " filterInitLevel: " + filterInitLevel +
//				 " filterAttackLevel: " + filterAttackLevel + " filterSustainLevel: " + filterSustainLevel );
	this.filter1.frequency.value = filterInitLevel;
	this.filter1.frequency.setValueAtTime( filterInitLevel, now );
	this.filter1.frequency.linearRampToValueAtTime( filterAttackLevel, filterAttackEnd );
	this.filter1.frequency.setTargetAtTime( filterSustainLevel, filterAttackEnd, (_S.FilterEnvD/100.0) );
	//this.filter2.frequency.value = filterInitLevel;
	//this.filter2.frequency.setValueAtTime( filterInitLevel, now );
	//this.filter2.frequency.linearRampToValueAtTime( filterAttackLevel, filterAttackEnd );
	//this.filter2.frequency.setTargetAtTime( filterSustainLevel, filterAttackEnd, (currentFilterEnvD/100.0) );

	this.osc1.start(0);
	this.osc2.start(0);
	this.modOsc.start(0);
}//end voice


Voice.prototype.setModWaveform = function( value ) {
	this.modOsc.type = value;
}

Voice.prototype.updateModFrequency = function( value ) {
	this.modOsc.frequency.value = value/10;
}

/*Voice.prototype.updateModOsc1 = function( value ) {
	this.modOsc1Gain.gain.value = value/10;
}

Voice.prototype.updateModOsc2 = function( value ) {
	this.modOsc2Gain.gain.value = value/10;
}*/

Voice.prototype.setOsc1Waveform = function( value ) {
	this.osc1.type = value;
}

Voice.prototype.updateOsc1Frequency = function( value ) {
	this.osc1.frequency.value = (this.originalFrequency*Math.pow(2,_S.Osc1Octave-2));  // -2 because osc1 is 32', 16', 8'
	//this.osc1.detune.value = currentOsc1Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
}

Voice.prototype.updateOsc1Mix = function( value ) {
	this.osc1Gain.gain.value = 0.005 * value;
}

Voice.prototype.setOsc2Waveform = function( value ) {
	this.osc2.type = value;
}

Voice.prototype.updateOsc2Frequency = function( value ) {
	this.osc2.frequency.value = (this.originalFrequency*Math.pow(2,_S.Osc2Octave-1));
	//this.osc2.detune.value = currentOsc2Detune + currentPitchWheel * 500;	// value in cents - detune major fifth.
}

Voice.prototype.updateOsc2Mix = function( value ) {
	this.osc2Gain.gain.value = 0.005 * value;
}

Voice.prototype.setFilterCutoff = function( value ) {
	var now =  Audiocontext.currentTime;
	var filterFrequency = filterFrequencyFromCutoff( this.originalFrequency, value/100 );
	this.filter1.frequency.cancelScheduledValues( now );
	this.filter1.frequency.setValueAtTime( filterFrequency, now );
	//this.filter2.frequency.cancelScheduledValues( now );
	//this.filter2.frequency.setValueAtTime( filterFrequency, now );
}

Voice.prototype.setFilterQ = function( value ) {
	this.filter1.Q.value = value;
	//this.filter2.Q.value = value;
}

Voice.prototype.setFilterMod = function( value ) {
	this.modFilterGain.gain.value = _S.FilterMod*10;
}


Voice.prototype.noteOff = function() {
	//console.log('voice.prototype.noteoff')
	var now =  Audiocontext.currentTime;
	var release = now + (_S.EnvR/10.0);	
    var initFilter = filterFrequencyFromCutoff( this.originalFrequency, _S.FilterCutoff/100 * (1.0-(_S.FilterEnv/100.0)) );

//    console.log("noteoff: now: " + now + " val: " + this.filter1.frequency.value + " initF: " + initFilter + " fR: " + currentFilterEnvR/100 );
	this.envelope.gain.cancelScheduledValues(now);
	this.envelope.gain.setValueAtTime( this.envelope.gain.value, now );  // this is necessary because of the linear ramp
	this.envelope.gain.setTargetAtTime(0.0, now, (_S.EnvR/100));
	this.filter1.frequency.cancelScheduledValues(now);
	this.filter1.frequency.setValueAtTime( this.filter1.frequency.value, now );  // this is necessary because of the linear ramp
	this.filter1.frequency.setTargetAtTime( initFilter, now, (_S.FilterEnvR/100.0) );
	//this.filter2.frequency.cancelScheduledValues(now);
	//this.filter2.frequency.setValueAtTime( this.filter2.frequency.value, now );  // this is necessary because of the linear ramp
	//this.filter2.frequency.setTargetAtTime( initFilter, now, (currentFilterEnvR/100.0) );

	this.osc1.stop( release );
	this.osc2.stop( release );
}



function changeModMultiplier() {
	_S.modOscFreqMultiplier = (moDouble?2:1)*(moQuadruple?4:1);
	onModFrequency( _S.ModFrequency );
}



function onChangeOctave( ev ) {
	_S.Octave = ev.target.selectedIndex;
}


initSynth = function() {
	
	//isIOS = (navigator.userAgent.indexOf("iPad")!=-1)||(navigator.userAgent.indexOf("iPhone")!=-1);

	effectChain = Audiocontext.createGain();

	effectChain.connect(Synth.filter_yo);

   /* if (!isIOS) {
	  	var irRRequest = new XMLHttpRequest();
		irRRequest.open("GET", "sounds/irRoom.wav", true);
		irRRequest.responseType = "arraybuffer";
		irRRequest.onload = function() {
	  		Audiocontext.decodeAudioData( irRRequest.response, 
	  			function(buffer) { if (revNode) revNode.buffer = buffer; else console.log("no revNode ready!")} );
		}
		irRRequest.send();
	}*/

}

