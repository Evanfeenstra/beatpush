function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
};

function effectDropChange(index) {

  Beats.effect_selected = index;
    //var bc = document.getElementById('beat-card');
    var thing=bc.$.thing;
    var getter = bc.$.fx_ui1;
    var getter2 = bc.$.fx_ui2;
    var samp = bc.sample_selected+1;
    bc.set_translate(thing, 0);
  if (index=='pf') {
    getter.innerHTML = "Pitch: "; getter2.innerHTML = "Fade: ";
      bc.x_pos = Beats.FX.pitch[samp];
      bc.y_pos = Beats.FX.gain[samp];
      thing.style.transition='left 0s ease-in, top 0s ease-in';
      thing.style.borderRadius='10px'
      thing.style.height='10px';
      thing.style.width='10px';
      thing.style.border='5px solid ' + color_array[samp];
      thing.style.left = scaleToX(Beats.FX.pitch[samp])+'px';
      thing.style.top = scaleToY(Beats.FX.gain[samp])+'px';
  }
  else if (index=='pc') {
    getter.innerHTML ="Pan: "; getter2.innerHTML = "Crush: ";
      bc.x_pos = Beats.FX.pan[samp];
      bc.y_pos = Beats.FX.crush[samp];
      thing.style.transition='left 0s ease-in, top 0s ease-in';
        thing.style.borderRadius='0px';
        thing.style.height='8px';
        thing.style.width='8px';
        thing.style.border='5px solid ' + color_array[samp];
      thing.style.left = scaleToX(Beats.FX.pan[samp])+'px';
        thing.style.top = scaleToY(Beats.FX.crush[samp])+'px';
  }
  else if (index=='d') {
    getter.innerHTML ="Repeat: "; getter2.innerHTML = "Time: ";
      bc.x_pos = Beats.FX.delay_fb[samp];
      bc.y_pos = Beats.FX.delay_time[samp];
      thing.style.transition='left 0s ease-in, top 0s ease-in';
        thing.style.borderRadius='7px';
        thing.style.height='0px';
        thing.style.width='0px';
        thing.style.border='9px double ' + color_array[samp];
      thing.style.left = scaleToX(Beats.FX.delay_fb[samp])+'px';
        thing.style.top = scaleToY(Beats.FX.delay_time[samp])+'px';
  }
toggleThingYellow(samp, index, thing);
window.scroll(0,0) 
  
};
compressorDropChange = function(index) {
  if (index==0) {
    Beats.compressor_yo.knee.value= 40;//set these as well in index.html
        Beats.compressor_yo.ratio.value=12; 
  }
  else if (index==1) {
    Beats.compressor_yo.knee.value= 40;
        Beats.compressor_yo.ratio.value=4;
  }
  else if (index==2) {
    Beats.compressor_yo.knee.value= 40;
        Beats.compressor_yo.ratio.value=48;
  }
  else if (index==3) {
    Beats.compressor_yo.knee.value= 6;
        Beats.compressor_yo.ratio.value=12;
  }
  else if (index==4) {
    Beats.compressor_yo.knee.value= 6;
        Beats.compressor_yo.ratio.value=4;
  }
  else if (index==5) {
    Beats.compressor_yo.knee.value= 6;
        Beats.compressor_yo.ratio.value=48;
  }
  //console.log('ratio: ',Beats.compressor_yo.ratio.value,':1');
  //console.log('knee: ',Beats.compressor_yo.knee.value,' dB');
  Beats.compressor_dropdown_selected=index;
window.scroll(0,0) 
};
filterDropChange = function(index) {
  Beats.filter_dropdown_selected=index;
  //lpf=0 hpf=1
  if (index==0) {
    Beats.filter_yo.type = 'lowpass';
    Beats.filter_yo.Q.value = 4;
  }
  else if (index==1) {
    Beats.filter_yo.type = 'highpass';
    Beats.filter_yo.Q.value = 4;
  }
  else if (index==2) {
    Beats.filter_yo.type = 'lowpass';
    Beats.filter_yo.Q.value = 12;
  }
  else if (index==3) {
    Beats.filter_yo.type = 'highpass';
    Beats.filter_yo.Q.value = 12;
  }
  else if (index==4) {
    Beats.filter_yo.type = 'lowpass';
    Beats.filter_yo.Q.value = 24;
  }
  else if (index==5) {
    Beats.filter_yo.type = 'highpass';
    Beats.filter_yo.Q.value = 24;
  }
  //console.log('filter Q: ',Beats.filter_yo.Q.value,' dB');
  window.scroll(0,0) 
};
reverbDropChange = function(index) {
  Beats.convolver_yo.buffer = bufferListy[(index+8)];
  Beats.reverb_dropdown_selected=index;
  window.scroll(0,0) 
  resize();
};

var goEvent=new CustomEvent("go", {});

function play_yo_yo(bc,sc) {

  Synth.setting = Beats.setting;
  play_yo_yoS(sc);

  if (Beats.setting==0) {
          //var id_style=window.getComputedStyle(Beats.id_yo[Beats.setting], null).getPropertyValue('backgroundColor');
          Beats.id_yo[Beats.setting].style.boxShadow="none";
          Beats.id_yo[Beats.setting].style.opacity="1.0";
          Beats.id_yo[(Beats.id_yo.length-1)].style.boxShadow="2px 2px 10px #444";
          Beats.id_yo[Beats.id_yo.length-1].style.opacity="0.6";
        }
        else {
         //////var id_style=window.getComputedStyle(Beats.id_yo[Beats.setting], null).getPropertyValue('backgroundColor'); outline: 1px solid #fff;
         Beats.id_yo[Beats.setting].style.boxShadow="none";
         Beats.id_yo[Beats.setting].style.opacity="1.0";
         Beats.id_yo[(Beats.setting-1)].style.boxShadow="2px 2px 10px #444";
         Beats.id_yo[(Beats.setting-1)].style.opacity="0.6"
         //Beats.id_yo[Beats.setting].style.backgroundColor='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')'
       }

       var startTime = Audiocontext.currentTime;

       var samp = Beats.beats_array[Beats.setting];
       if (samp !=0) {
        //console.log(samp);
        playSound(bufferListy[samp-1], startTime, samp);
      }
      var samp2 = Beats.beats_array2[Beats.setting];
      if (samp2 !=0) {
        //console.log(samp);
        playSound(bufferListy[samp2-1], startTime, samp2);
      }

      document.dispatchEvent(goEvent);

      Beats.setting = Beats.setting +1;
      if (Beats.setting>31) {
        Beats.setting=0;
        
      }
}

function shuffleDelayNodes(samp) {
  //console.log('');
  if (Beats.FX.delay_time[samp] > 0 && Beats.delay_on[samp]==false) {
    //check for crush
    if (Beats.crush_on[samp]==true) {
      Beats.crush_nodes[samp].connect(Beats.delay_nodes[samp]);
    }
    else {
      if (Beats.pan_on[samp]==true) {
          Beats.pan_nodes[samp].connect(Beats.delay_nodes[samp]);
      }
      else {
        Beats.gain_nodes[samp].connect(Beats.delay_nodes[samp]);
      }
    }
    //connect delay to master filter
    Beats.delay_nodes[samp].connect(Beats.filter_yo);
    Beats.delay_on[samp]=true;
    console.log('delay '+samp+' on');
    shuffleDelayFbNodes(samp);
  }
  else if (Beats.FX.delay_time[samp] > 0 && Beats.delay_on[samp]==true) {
    shuffleDelayFbNodes(samp);
  }
  else {
    if (Beats.delay_on[samp]==true) {
      //check for crush, disconnect any prior nodes from delay
      if (Beats.crush_on[samp]==true) {
        Beats.crush_nodes[samp].disconnect();
        Beats.crush_nodes[samp].connect(Beats.filter_yo);
      }
      else {
        if (Beats.pan_on[samp]==true) {
            Beats.pan_nodes[samp].disconnect();
            Beats.pan_nodes[samp].connect(Beats.filter_yo);
        }
        else {
          Beats.gain_nodes[samp].disconnect();
            Beats.gain_nodes[samp].connect(Beats.filter_yo);
        }
      }
      Beats.delay_on[samp]=false;
      console.log('delay '+samp+' off');
      shuffleDelayFbNodes(samp);
  }
  }
}

function shuffleDelayFbNodes(samp) {
  if (Math.abs(Beats.FX.delay_fb[samp]) != 0 && Beats.delay_fb_on[samp]==false && Beats.delay_on[samp]==true) {
    //feedback loop!
    Beats.delay_nodes[samp].connect(Beats.delay_fb_nodes[samp]);
    Beats.delay_fb_nodes[samp].connect(Beats.delay_nodes[samp]);
    Beats.delay_fb_on[samp]=true;
    console.log('delay feedback on');
  }
  else if (Math.abs(Beats.FX.delay_fb[samp]) != 0 && Beats.delay_fb_on[samp]==true && Beats.delay_on[samp]==true) {} 
  else {
    //no more feedback loop
    Beats.delay_nodes[samp].disconnect();
    Beats.delay_fb_nodes[samp].disconnect();
    Beats.delay_nodes[samp].connect(Beats.filter_yo);
    Beats.delay_fb_on[samp]=false;
    console.log('delay feedback off');
  }
}

function shuffleCrushNodes(samp) {
  if (Beats.FX.crush[samp]>30) {
    if (Beats.crush_on[samp]==false) {
      if (Beats.pan_on[samp]==false) {
        Beats.gain_nodes[samp].disconnect();
        Beats.gain_nodes[samp].connect(Beats.crush_nodes[samp]);
      }
      else {
          Beats.pan_nodes[samp].disconnect();
          Beats.pan_nodes[samp].connect(Beats.crush_nodes[samp]);
      }
      //distortion curve made here!
        Beats.crush_nodes[samp].curve = makeDistortionCurve(Beats.FX.crush[samp]*2-35);
        //check for delay node
        if (Beats.delay_on[samp]==true) {
          Beats.crush_nodes[samp].connect(Beats.delay_nodes[samp]);
        }
        Beats.crush_nodes[samp].connect(Beats.filter_yo);
        Beats.crush_on[samp]=true;
        console.log('crush '+samp+' connected');
    }
  }
  else {
      if (Beats.crush_on[samp]==true) {
        if (Beats.pan_on[samp]==true) {
          Beats.pan_nodes[samp].disconnect();
          Beats.pan_nodes[samp].connect(Beats.filter_yo);
      }
      else {
        Beats.gain_nodes[samp].disconnect();
          Beats.gain_nodes[samp].connect(Beats.filter_yo);
      }
        //check for delay node
        if (Beats.delay_on[samp]==true) {
          if (Beats.pan_on[samp]==true) {
              Beats.pan_nodes[samp].connect(Beats.delay_nodes[samp]);
          }
          else {Beats.gain_nodes[samp].connect(Beats.delay_nodes[samp]);}
        }
        Beats.crush_on[samp]=false;
        console.log('crush '+samp+' disconnected');
    }
  }
}

function shufflePanNodes(samp) {
  //check if pan is not 0
  if (Beats.FX.pan[samp] != 0) {
    //check if pan is already on
    if (Beats.pan_on[samp]==false) {
      Beats.gain_nodes[samp].disconnect();
      Beats.gain_nodes[samp].connect(Beats.pan_nodes[samp]);
      if (Beats.crush_on[samp]==false && Beats.delay_on[samp]==false) {
        Beats.pan_nodes[samp].connect(Beats.filter_yo);
      }
      else if (Beats.crush_on[samp]==false) {
        Beats.pan_nodes[samp].connect(Beats.delay_nodes[samp]);
        Beats.pan_nodes[samp].connect(Beats.filter_yo);
      }
      else {Beats.pan_nodes[samp].connect(Beats.crush_nodes[samp])}
      Beats.pan_on[samp]=true;
      console.log('pan '+samp+' connected')
    }
  }
  else {
    if (Beats.pan_on[samp]==true) {
      Beats.gain_nodes[samp].disconnect();
      if (Beats.crush_on[samp]==false && Beats.delay_on[samp]==false) {
        Beats.gain_nodes[samp].connect(Beats.filter_yo);
      }
      else if (Beats.crush_on[samp]==false) {
        Beats.gain_nodes[samp].connect(Beats.delay_nodes[samp]);
        Beats.gain_nodes[samp].connect(Beats.filter_yo);
      }
      else {Beats.gain_nodes[samp].connect(Beats.crush_nodes[samp])}
      Beats.pan_on[samp]=false;
      console.log('pan '+samp+' disconnected');
    }
  }
}


function toggleThingYellow(samp, index, thing) {
  if (index=='pf') {
     if (Beats.is_animating_pitch[samp]==false) {
          thing.style.backgroundColor='whitesmoke';
        }
        else {
          thing.style.backgroundColor='#ff0';
        }
  }
  else if (index=='pc') {
     if (Beats.is_animating_pan[samp]==false) {
          thing.style.backgroundColor='whitesmoke';
        }
        else {
          thing.style.backgroundColor='#ff0';
        }
  }
  if (index=='d') {
     if (Beats.is_animating_feedback[samp]==false) {
          thing.style.backgroundColor='whitesmoke';
        }
        else {
          thing.style.backgroundColor='#ff0';
        }
  }
}

function toggleToggle(samp, index, bc) {

  if (index=='pf') {
     if (Beats.is_animating_pitch[samp]==false) {
          bc.$.anim.checked=false;
        }
        else {
          bc.$.anim.checked=true;
        }
  }
  else if (index=='pc') {
     if (Beats.is_animating_pan[samp]==false) {
          bc.$.anim.checked=false;
        }
        else {
          bc.$.anim.checked=true;
        }
  }
  if (index=='d') {
     if (Beats.is_animating_feedback[samp]==false) {
          bc.$.anim.checked=false;
        }
        else {
          bc.$.anim.checked=true;
        }
  }
}
var div_array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
 'y', 'z', 'za', 'zb', 'zc', 'zd', 'ze', 'zf'];
var color_array = ['rgb(187, 187, 204)', 'rgb(92, 107, 192)', 'rgb(255, 152, 0)', 'rgb(76, 175, 80)', 'rgb(33, 150, 243)', 'rgb(158, 224, 3)', 'rgb(171, 71, 188)', 'rgb(239, 83, 80)', 'rgb(141, 110, 99)'];