var playLoadedSound = function(buffer) {
  var source = Audiocontext.createBufferSource();
  source.buffer = buffer;
  source.connect(Synth.gain_nodes[0]);
  source.start(Audiocontext.currentTime);
}

var makeDistortionCurve = function(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

var Main = {
  scrolling_prevented : true,
  is_playing : false,
  is_rec:false,
  tabs: null,
  tabs2: null,
  pages: null,
  menu: null,
  ready: false,
  tour:0,
}

var Beats = {
  xhr: null,
  filter_yo: null, //filter node
  setting: 0,
  not_playing: true,
  responsy: [],
  convolver_yo: null, //reverb node
  compressor_yo: null, //compressor node
  dryGainNode: null, //reverb gain node
  wetGainNode: null, //reverb gain node
  id_yo: [],
  gain_nodes: [],
  pan_nodes: [],
  crush_nodes: [],
  delay_nodes: [],
  delay_fb_nodes: [], //these become gain nodes for feedback
  theThing: null, //this become the thing div
  effect_selected: 'pf',
  innitted: false,
  speed_setting: 273,

  one:0, //changes the recording spot from 0 (for tour) to 1

  //all these need ability to save and load
  beats_array: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //main array 
  beats_array2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2ndary array
  filterCutoff: 22050, //this is one is set with a logrithmic scale 
  reverbSetting: 30, //0-100, mixing dry and wet
  reverb_on: true,
  compressorSetting: 30,
  FX: {  //these xs are -100 to 100, these ys are 0-100 
    pitch: [0,0,0,0,0,0,0,0,0],
    crush: [0,0,0,0,0,0,0,0,0],
    pan: [0,0,0,0,0,0,0,0,0],
    gain: [0,0,0,0,0,0,0,0,0],
    delay_fb: [0,0,0,0,0,0,0,0,0],
    delay_time: [0,0,0,0,0,0,0,0,0]
  },
  is_animating_pitch: [false, false, false, false, false, false, false, false, false], 
  is_animating_pan: [false, false, false, false, false, false, false, false, false], 
  is_animating_feedback: [false, false, false, false, false, false, false, false, false], 

  //these 4 do not need to load, need to start as false for shuffleNodes to work.
  pan_on: [false,false,false,false,false,false,false,false,false], 
  crush_on: [false,false,false,false,false,false,false,false,false], 
  delay_on: [false,false,false,false,false,false,false,false,false], 
  delay_fb_on: [false,false,false,false,false,false,false,false,false], 

  reverb_dropdown_selected: 0,
  filter_dropdown_selected: 0,
  compressor_dropdown_selected: 0,

  bpm: 220,
  masterUrls: [false,false,false,false,false,false,false,false],
  masterUrlNames: ['kick','snare','hihat','kick808','bells','jawharp','clap','clave'],

  mix: 0
};

var Synth = {
  xhr: null,
  filter_yo: null, //filter node
  setting: 0,
  not_playing: true,
  convolver_yo: null, //reverb node
  compressor_yo: null, //compressor node
  dryGainNode: null, //reverb gain node
  wetGainNode: null, //reverb gain node
  id_yo: [],
  gain_nodes: [],
  pan_nodes: [],
  crush_nodes: [],
  delay_nodes: [],
  delay_fb_nodes: [], //these become gain nodes for feedback
  theThing: null, //this become the thing div
  effect_selected: 'lfo',
  innitted: false,
  speed_setting: 273,

  //all these need ability to save and load
  synth_array: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //main array 
  synth_array2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //2ndary array
  filterCutoff: 22050, //this is one is set with a logrithmic scale 
  reverbSetting: 30, //0-100, mixing dry and wet
  reverb_on: true,
  compressorSetting: 30,
  FX: {  //these xs are 0-100, these ys are 0-100 
    lfo1: 0,
    lfo2: 0,
    ah1: 0,
    ah2: 0,
    adsr1: 0,
    adsr2: 0,
    osc1wave: 25,
    osc1fade: 0,
    osc2wave: 0,
    osc2fade: 0
  },
  spotOctave: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  osc1Octave: 1,

  MOD: {
    arp: [0,0,0,0,0,0,0,0],
    ah: [0,0,0], //mod_selected variables are properties of sc
  },
  base_note: 45,
  scale: [0,0,2,4,5,7,9,11,12, 14,16,17,19,21,23,24, 26,28,29,31,33,35,36, 38],
  scale_setting: 30,

  reverb_dropdown_selected: 0,
  scale_dropdown_selected: 0
};


var INITbeats = function() {
      Beats.filter_yo = Audiocontext.createBiquadFilter(); //master filter
      Beats.filter_yo.type = 'lowpass';
      Beats.filter_yo.gain.value = 4;
      Beats.filter_yo.Q.value = 6;  //28 is high, 14 is med?

      Beats.verb_filter = Audiocontext.createBiquadFilter();
      Beats.verb_filter.type = 'highpass';
      Beats.verb_filter.gain.value = 0;
      Beats.verb_filter.Q.value = 0;
      Beats.verb_filter.frequency.value = 800;
      //HERE ARE THE SAMPLE PATHWAYS! source->gain->pan->distort->delay->destination(filter_yo->convolver_yo->gain[0]->compressor->final destination)
      //both distort and delay are disconnected if they are inactive, to save system resources. Master reverb as well.
      //0 is the master node! It connects at the end!!!!!!
      Beats.gain_nodes[0] = Audiocontext.createGain();
      Beats.gain_nodes[0].gain.value = 1.0;

      for (i=1; i<9; i++) {
      //pan, distort, and delay are all disconnected to start with.
          Beats.gain_nodes[i] = Audiocontext.createGain();
          Beats.gain_nodes[i].gain.value = 1.0;
          Beats.pan_nodes[i] = Audiocontext.createPanner();
          Beats.pan_nodes[i].panningModel = "equalpower";
          Beats.pan_nodes[i].setPosition(0,0,0); //scales from -1 to 1 on the first parameter
          Beats.gain_nodes[i].connect(Beats.filter_yo);
          Beats.crush_nodes[i] = Audiocontext.createWaveShaper();
          Beats.delay_nodes[i] = Audiocontext.createDelay();
          Beats.delay_fb_nodes[i] = Audiocontext.createGain();
      }

      Beats.convolver_yo = Audiocontext.createConvolver();

      Beats.compressor_yo = Audiocontext.createDynamicsCompressor();
        Beats.compressor_yo.threshold.value = -30;
        Beats.compressor_yo.knee.value= 40;   //[ut these in dropdown
        Beats.compressor_yo.ratio.value=12;   //put these in dropdown
        Beats.compressor_yo.reduction.value= -2;
        Beats.compressor_yo.attack.value = 0;
        Beats.compressor_yo.release.value=0.25;

      Beats.gain_nodes[0].connect(Beats.compressor_yo);
      Beats.compressor_yo.connect(Audiocontext.destination);


      Beats.dryGainNode = Audiocontext.createGain();
      Beats.wetGainNode = Audiocontext.createGain();

      Beats.filter_yo.connect(Beats.dryGainNode);
      Beats.dryGainNode.connect(Beats.gain_nodes[0]);

      Beats.filter_yo.connect(Beats.verb_filter);
      Beats.verb_filter.connect(Beats.wetGainNode);
      Beats.wetGainNode.connect(Beats.convolver_yo);

      Beats.convolver_yo.connect(Beats.gain_nodes[0]);
};

var INITsynth = function() {

      Synth.filter_yo = Audiocontext.createBiquadFilter(); //master filter
      Synth.filter_yo.type = 'lowpass';
      Synth.filter_yo.gain.value = 4;
      Synth.filter_yo.Q.value = 6;  //28 is high, 14 is med?

      //HERE ARE THE SAMPLE PATHWAYS! source->gain->pan->distort->delay->destination(filter_yo->convolver_yo->gain[0]->compressor->final destination)
      //both distort and delay are disconnected if they are inactive, to save system resources. Master reverb as well.
      //0 is the master node! It connects at the end!!!!!!
      Synth.gain_nodes[0] = Audiocontext.createGain();
      Synth.gain_nodes[0].gain.value = 1.0;

      for (i=1; i<9; i++) {
      //pan, distort, and delay are all disconnected to start with.
          Synth.gain_nodes[i] = Audiocontext.createGain();
          Synth.gain_nodes[i].gain.value = 1.0;
          Synth.pan_nodes[i] = Audiocontext.createPanner();
          Synth.pan_nodes[i].panningModel = "equalpower";
          Synth.pan_nodes[i].setPosition(0,0,0); //scales from -1 to 1 on the first parameter
          Synth.gain_nodes[i].connect(Synth.filter_yo);
          Synth.crush_nodes[i] = Audiocontext.createWaveShaper();
          Synth.delay_nodes[i] = Audiocontext.createDelay();
          Synth.delay_fb_nodes[i] = Audiocontext.createGain();
      }

      Synth.convolver_yo = Audiocontext.createConvolver();

      Synth.compressor_yo = Audiocontext.createDynamicsCompressor();
        Synth.compressor_yo.threshold.value = -30;
        Synth.compressor_yo.knee.value= 40;   //[ut these in dropdown
        Synth.compressor_yo.ratio.value=12;   //put these in dropdown
        Synth.compressor_yo.reduction.value= -2;
        Synth.compressor_yo.attack.value = 0;
        Synth.compressor_yo.release.value=0.25;

      Synth.gain_nodes[0].connect(Synth.compressor_yo);
      Synth.compressor_yo.connect(Audiocontext.destination);


      Synth.dryGainNode = Audiocontext.createGain();
      Synth.wetGainNode = Audiocontext.createGain();

      Synth.filter_yo.connect(Synth.dryGainNode);
      Synth.dryGainNode.connect(Synth.gain_nodes[0]);

      Synth.filter_yo.connect(Synth.wetGainNode);
      Synth.wetGainNode.connect(Synth.convolver_yo);

      Synth.convolver_yo.connect(Synth.gain_nodes[0]);

      initSynth();
};