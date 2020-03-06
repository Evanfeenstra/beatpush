 //window.Polymer = {lazyRegister: true, dom: 'shady'};




  var bc=document.getElementById('beat-card');
  var sc=document.getElementById('synth-card');

  var Audiocontext = null;
  var bufferLoader = null;
  var bufferListy = null;

  var loadedBufferArray = {};

  var loadFromUrl=false;


(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    initializeBeatPush();
  });

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    //app.$.appcard$..scrollToTop(true);
  };

  app.closeDrawer = function() {
    //app.$.paperDrawerPanel.closeDrawer();
  };

})(document);

function initializeBeatPush() {

  bc=document.getElementById('beat-card');
  sc=document.getElementById('synth-card');

    try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext; //WEBKIT FOR SAFARI 
      window.Audiocontext = new AudioContext();
     }
     catch(e) {
      alert("dang yo, Web Audio API is not supported in this browser");
     }

     INITbeats();
     INITsynth();

     console.log("initializeBeatPush")


     bufferLoader = new BufferLoader(
        Audiocontext,
        [
        "/beats/sounds/kick.mp3",
        "/beats/sounds/snare.mp3",
        "/beats/sounds/hihat.mp3",
        "/beats/sounds/Kick808.mp3",
        "/beats/sounds/tamborine.mp3",
        "/beats/sounds/jawharp.mp3",
        "/beats/sounds/clap.mp3",
        "/beats/sounds/tic.mp3",
        "/beats/irsounds/irEmt_s.mp3",  //8
        "/beats/irsounds/irEmt_l.mp3",
        "/beats/irsounds/irChurch.mp3",
        "/beats/irsounds/irFactory.mp3",
        "/beats/irsounds/irHall.mp3",
        "/beats/irsounds/irSpring.mp3",
        "/beats/irsounds/irBucket.mp3",
        "/beats/irsounds/irDjembe.mp3",
        "/beats/irsounds/irEcho.mp3",
        "/beats/irsounds/irPot.mp3",
        "/beats/irsounds/irTelephone.mp3",
        "/beats/irsounds/irVacuum.mp3",
        "/beats/sounds/chimes.mp3"
        ],
        bufferLoadCompleted  
    );

  bufferLoader.load();
  Main.ready=true;



  Main.tabs = document.getElementById('tabs')
    Main.tabs2 = document.getElementById('tabs2')
    Main.tabs.selected=1;
    Main.tabs.selected=0;
    Main.tabs2.selected=1;
    Main.tabs2.selected=0;

    
    function selector() {
      //var s=window.getComputedStyle(bc.$.middle_container).width;
      //if(s=='auto'){s=window.getComputedStyle(sc.$.middle_containerS).width};
      Main.pages.select(Main.tabs.selected);
      Main.tabs2.selected = Main.tabs.selected;
      if (Main.tabs.selected < 2) {
        no_scroll();
        resize();
      }
      else {
        let_scroll();
      }
      /*if (Main.tabs.selected==0) {
          sizeBeats(s);
        }
        if (Main.tabs.selected==1) {
          sizeSynth(s);
        }*/
      Main.tabs.removeEventListener('iron-select', selector)
      window.setTimeout(addAgain,501)
    }
    function addAgain() {
      Main.tabs.addEventListener('iron-select', selector);
    }
    function selector2() {
      Main.pages.select(Main.tabs2.selected);
      Main.tabs.selected = Main.tabs2.selected;
      Main.tabs2.removeEventListener('iron-select', selector2)
      window.setTimeout(addAgain2,501)
    }
    function addAgain2() {
      Main.tabs2.addEventListener('iron-select', selector2);
    }

    Main.menu = document.getElementById('mainmenu')
    Main.pages = document.getElementById('pages')
    Main.tabs.addEventListener('iron-select', selector);
    Main.tabs2.addEventListener('iron-select', selector2);

    document.ontouchmove = function(e){ e.preventDefault(); };
    window.addEventListener("resize", resize, false);
    window.addEventListener("orientationchange", resize, false);


}

app.taketour= function() {
    app.$.tourer.classList.add('tourflex');
    app.$.tourtext.innerHTML=tourArray[Main.tour];
    var wWidth=window.innerWidth;
    var wHeight=window.innerHeight;
    tourFunctions[0](wWidth, wHeight);
}

app.getstarted = function() {
  Beats.one=1;
}

app.tournext=function() {
  Main.tour++;
  app.$.tourtext.innerHTML=tourArray[Main.tour];
  tourFunctions[Main.tour]();
}

app.tourexit=function() {
    var hand=app.$.handsvg
    var wWidth=window.innerWidth;
    var wHeight=window.innerHeight;
    hand.style.cssText="display:block;transition:transform 2s;-webkit-transition:-webkit-transform 2s;transform:translate("+wWidth+"px,"+wHeight+"px);-webkit-transform:translate("+wWidth+"px,"+wHeight+"px);";
    window.setTimeout(function() {
      hand.style.display="none";
      var tourer=app.$.tourer
      tourer.style.opacity=0;
      var button=app.$.appcard.$.topbar.$.button
      button.click();
      button.getRipple().simulatedRipple()
      window.setTimeout(function() {
        tourer.setAttribute('style','display:none !important');
        app.$.appcard.$.topbar.cleary()
        if(Beats.setting==0) {
          Beats.id_yo[Beats.id_yo.length-1].style.opacity=0.6;
          Beats.id_yo[Beats.id_yo.length-1].style.boxShadow="2px 2px 10px #444";
          Synth.id_yo[Synth.id_yo.length-1].style.opacity=0.6;
          Synth.id_yo[Synth.id_yo.length-1].style.boxShadow="2px 2px 10px #444";
        }
        else{
          Beats.id_yo[Beats.setting-1].style.opacity=0.6;
          Beats.id_yo[Beats.setting-1].style.boxShadow="2px 2px 10px #444";
          Synth.id_yo[Synth.setting].style.opacity=0.6;
          Synth.id_yo[Synth.setting].style.boxShadow="2px 2px 10px #444";
          Beats.setting=0;
          Synth.setting=0;
        }
      },2000);
    },1000);
}


var bufferLoadCompleted = function() {
    bufferListy=bufferLoader.bufferList.slice(0); //slice[0] keeps lists independent
    console.log('audio loaded')

    Beats.convolver_yo.buffer = bufferListy[8];
    Beats.filter_yo.frequency.value = Beats.filterCutoff;
    Beats.dryGainNode.gain.value = 1-(Beats.reverbSetting/100.0);
    Beats.wetGainNode.gain.value = (Beats.reverbSetting/100.0);
    Beats.innitted=true;

    Synth.convolver_yo.buffer = bufferListy[8];
    Synth.filter_yo.frequency.value = Synth.filterCutoff;
    Synth.dryGainNode.gain.value = 1-(Synth.reverbSetting/100.0);
    Synth.wetGainNode.gain.value = (Synth.reverbSetting/100.0);

    if(loadFromUrl==true) {
      loadData();
    }

    document.getElementById('loader').style.opacity="0";
    window.setTimeout(function() {
      document.getElementById('loader').style.display='none';
    }, 1000);
    document.getElementById('introdialog').open();
    resize()
  };



var hasitloadedyet=0.0500;
var hasitloadedyettoggle=false;

var playSound = function(buffer, time, samp) {

    var source = Audiocontext.createBufferSource();
    source.buffer = buffer;
    if (Beats.is_animating_pitch[samp]==true) {
      source.playbackRate.value=1.0 + (bc.pitch_anim[samp]/100.0); //set sample pitches here
    }
    else {
      source.playbackRate.value=1.0 + (Beats.FX.pitch[samp]/100.0); //set sample pitches here
    }

    //connect to the appropriate gain node
    source.connect(Beats.gain_nodes[samp]);
    source.start(time+hasitloadedyet);

    //to correct a little bug that cuts off the beginning of the first sound played
    if (hasitloadedyet!=0) {
      if (hasitloadedyettoggle==true) {
        hasitloadedyet=0;
      }
      hasitloadedyettoggle=true;
    }
}

var playLoadedSound = function(buffer) {
  var source = Audiocontext.createBufferSource();
  source.buffer = buffer;
  source.connect(Synth.gain_nodes[0]);
  source.start(Audiocontext.currentTime);
}


function unmute_ios(bufferList) {
  var hihat = bufferList[20];
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = Audiocontext.currentTime + 0.100;
    playSound(hihat, startTime, 3);
    document.getElementById('introdialog').close();
    Beats.one=1;
}

var sizeSynth=function(s) {
    //var sc=document.getElementById('synth-card')
    sc.$.middle_containerS.style.height=s;
    //m_cS.style.height=window.getComputedStyle(m_cS).width;
    if(sc.$.innertabsS.selected==2) {
      sc.xyheight=sc.$.xy_bounderS.clientHeight;
      sc.xywidth=sc.$.xy_bounderS.clientWidth;
      //if (Synth.effect_selected=='lfo') {
        sc.lfo_height = Synth.FX.lfo2 * (sc.xyheight / 100);
        sc.lfo_stretch = Synth.FX.lfo1 * (sc.xywidth / 100);
      //}
      if (Synth.effect_selected!='lfo') {sc.$.lfosvg.style.display="none";}
      moddropChange(Synth.effect_selected);
    } 
  }

var sizeBeats=function(s) {
    //var bc=document.getElementById('beat-card')
    bc.$.middle_container.style.height=s;
    //m_c.style.height=window.getComputedStyle(m_c).width;
    if(bc.$.innertabs.selected==2) {
      bc.xyheight=bc.$.xy_bounder.clientHeight;
      bc.xywidth=bc.$.xy_bounder.clientWidth;
    }
  }

var resize = function(){
    if(Main.tabs.selected<2) {
      var s=window.getComputedStyle(bc.$.middle_container).width;
      if(s=='auto'){s=window.getComputedStyle(sc.$.middle_containerS).width};
      sizeBeats(s);
      sizeSynth(s);
    }
  }
 var let_scroll = function() {
    if (Main.scrolling_prevented==true) {
      document.ontouchmove = function(e){ return true; };
      Main.scrolling_prevented=false;
    }
    drawerCollapse();
  }
  var no_scroll = function() {
    if (Main.scrolling_prevented==false) {
      document.ontouchmove = function(e){ e.preventDefault(); };
      Main.scrolling_prevented=true;
    }
  }
  var drawerCollapse = function() {
    document.getElementById('paperDrawerPanel').togglePanel();
    Main.menu.selected = 5;
  }

var arr2ab = function(arr) {
  var aLen = arr.byteLength;
  var buf = new ArrayBuffer(aLen); // 2 bytes for each char
  var view = new DataView(buf);
  for (var i=0; i<aLen; i++) {
    //buf[i] = arr[i];
    view.setUint8(i,arr[i],false);
  }
  return buf;
}



/******FACEBOOK*******/

window.fbAsyncInit = function() {
  FB.init({
    appId      : '874589882625487',
    xfbml      : true,
    version    : 'v2.3'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));




