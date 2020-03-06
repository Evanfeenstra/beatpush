tourArray=[
	'Drag colors onto the outer ring of squares to build your beat. Then press play to hear what you have created!',
	'You can also record beats into the sequence',
	'Go to the "FX" section to change your effects. Reverb adds an echo, and Filter cuts out certain frequencies from the sound',
	'In the "MOD" section, you can set more effects on each individual sample. You can even animate effects!',
	'Click the "SYNTH" tab on the top of the page to access the BeatPush synthesizer. You can drag-and-drop or record notes here as well',
	'The "FX" section of the synthesizer is very similar to the "FX" section for the Drums',
	'The "MOD" section has lots of awesome effects. You can change the effect mode using the side tabs',
	'You can also search for sounds from the huge library at Freesound.org to add to your beat!',
	'Sign and start creating!'
];	

tourFunctions=[
	//drum drag-and-drop
	function(wWidth,wHeight) {
		Beats.speed_setting = 60000/290;
    	Beats.bpm=this.bpm_yo;
		var hand=app.$.handsvg
		hand.style.cssText="display:block;transition:transform 0s;-webkit-transition:-webkit-transform 0s;transform:translate("+wWidth+"px,"+wHeight+"px);-webkit-transform:translate("+wWidth+"px,"+wHeight+"px);";
		var box=bc.$.firstbox
		var rect=box.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 2s;-webkit-transition:-webkit-transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			var avatar=document.getElementsByTagName('drag-avatar')[0];
			avatar.style.cssText="display:block;border: 3px solid #5C6BC0; width: 15px; height: 15px; border-radius: 15px; background-color: whitesmoke; z-index: 9;transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);-webkit-transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);";
			box.getRipple().simulatedRipple()
			var square=bc.$.beat_container.querySelector('.s')
			rect=square.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
			avatar.style.cssText="display:block;border: 3px solid #5C6BC0; width: 15px; height: 15px; border-radius: 15px; background-color: whitesmoke; z-index: 9;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);-webkit-transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);";
			window.setTimeout(function() {
				var button=app.$.appcard.$.topbar.$.button
				rect=button.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
				avatar.style.cssText="display:none;";
				square.style.backgroundColor="#5C6BC0";
				Beats.beats_array[0]=1;
				window.setTimeout(function() {
					button.click();
					button.getRipple().simulatedRipple()
					app.$.tournext.classList.add('blinkred');
					app.$.tourexit.classList.add('blinkexit');
					app.$.tourfoot.classList.remove('borderblink')
				},1000);
			},1000);
		},2000);
	},

    //recording drum
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink');
		var hand=app.$.handsvg
		var recbutton=app.$.appcard.$.topbar.$.recbutton
		rect=recbutton.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//recbutton.click();
			document.getElementById('topbar').rec();
			recbutton.getRipple().simulatedRipple();
			var box=bc.$.firstbox 
			var rect=box.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 2s;-webkit-transition:-webkit-transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
			window.setTimeout(function() {
				document.addEventListener("go",recordTourKicks, false);
			},2000);
		},1000);
	},

	//drum FX
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink');
		var hand=app.$.handsvg
		/*var colorarray=["#5C6BC0","#9EE003","#EF5350","#9EE003"]
		for (var i=0; i<4; i++) {
			var row=template.find('#beat_row_'+(i+1));
			for(var j=0; j<4; j++) {
				row.childNodes[(j*4)+1].style.backgroundColor=colorarray[j];
			}
		}
		Beats.beats_array=[1,0,5,0,7,0,5,0,1,0,5,0,7,0,5,0,1,0,5,0,7,0,5,0,1,0,5,0,7,0,5,0];*/
		var fxtab=bc.$.fxtab
		var rect=fxtab.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//fxtab.click();
			bc.$.innertabs.selected=1;
			fxtab.getRipple().simulatedRipple()
			var verbslider=bc.$.verbslider
			rect=verbslider.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/1.5)+"px,"+(rect.top+rect.height/1.5)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/1.5)+"px,"+(rect.top+rect.height/1.5)+"px);";
			window.setTimeout(function() {
				for (var i=0; i<48; i++) {
					verbslider.increment();
				}
				var fslider=bc.$.filterslider
				rect=fslider.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/1.5)+"px,"+(rect.top+rect.height/1.8)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/1.5)+"px,"+(rect.top+rect.height/1.8)+"px);";
				window.setTimeout(function() {
					for (var i=0; i<24; i++) {
						fslider.decrement();
					}
					app.$.tournext.classList.add('blinkred');
					app.$.tourexit.classList.add('blinkexit');
					app.$.tourfoot.classList.remove('borderblink')
				},1000);
			}, 1000);
		},1000);
	},

	//drum MODS
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink')
		var hand=app.$.handsvg
		var modtab=bc.$.modtab
		var rect=modtab.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//modtab.click();
			bc.$.innertabs.selected=2;
			modtab.getRipple().simulatedRipple()
			var redtab=bc.$.t3
			rect = redtab.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
			window.setTimeout(function() {
				redtab.click();
				redtab.getRipple().simulatedRipple()
				var xypad=bc.$.xy
				rect = xypad.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/1.45)+"px,"+(rect.top+rect.height/1.2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/1.45)+"px,"+(rect.top+rect.height/1.2)+"px);";
				window.setTimeout(function() {
					var thing=bc.$.thing  
				    thing.style.transition='left .2s ease-in, top .2s ease-in';
				    thing.style.webkitTransition='left .2s ease-in, top .2s ease-in';
				    thing.style.left = (rect.width/1.45-12) + "px";
				    thing.style.top = (rect.height/1.2-10) + "px";
				    //var bc=template.find('#beat-card');
				    var samp = bc.sample_selected+1;
				    bc.x_pos = 42;
				    bc.y_pos = 17;
				    Beats.FX.pitch[samp]=42;
				    Beats.FX.gain[samp] =17;
				    Beats.gain_nodes[samp].gain.value=1.0-(Beats.FX.gain[samp]/100);
				    var anim=bc.$.anim
				    rect=anim.getBoundingClientRect();
				    hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
					window.setTimeout(function() {
						anim.click();
						anim.getRipple().simulatedRipple();
						app.$.tournext.classList.add('blinkred');
						app.$.tourexit.classList.add('blinkexit');
						app.$.tourfoot.classList.remove('borderblink')
					},2000);
				},1000);
			},1000);
		},2000);
	},

	//Synth drag-and-drop
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink')
		var hand=app.$.handsvg
		var synthtab=app.$.appcard.$.synthtab
		var rect=synthtab.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//synthtab.click();
			Main.tabs.selected=1;
			synthtab.getRipple().simulatedRipple()
			window.setTimeout(function() { //wait 501 ms for animation to finish
				var boxy=sc.$.firstboxS
				rect = boxy.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
				window.setTimeout(function() {
					boxy.getRipple().simulatedRipple()
					var avatar=document.getElementsByTagName('drag-avatar')[1];
					avatar.style.cssText="display:block;border: 3px solid #FB3F00; width: 15px; height: 15px; border-radius: 15px; background-color: whitesmoke; z-index: 9;transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);-webkit-transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);";
					var square=sc.$.synth_row_1.querySelector('.sS');
					rect=square.getBoundingClientRect();
					hand.style.cssText="display:block;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
					avatar.style.cssText="display:block;border: 3px solid #FB3F00; width: 15px; height: 15px; border-radius: 15px; background-color: whitesmoke; z-index: 9;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);-webkit-transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);";
					window.setTimeout(function() {
						avatar.style.cssText="display:none;";
						square.style.backgroundColor="#FB3F00";
						Synth.synth_array[0]=1;
						boxy=sc.$.fourthboxS
						rect = boxy.getBoundingClientRect();
						hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
						window.setTimeout(function() {
							avatar.style.cssText="display:block;border: 3px solid #669922; width: 15px; height: 15px; border-radius: 15px; background-color: whitesmoke; z-index: 9;transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);-webkit-transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);";
							boxy.getRipple().simulatedRipple()
							square=sc.$.synth_row_3.querySelector('.sS');
							rect=square.getBoundingClientRect();
							hand.style.cssText="display:block;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
							avatar.style.cssText="display:block;border: 3px solid #669922; width: 15px; height: 15px; border-radius: 15px; background-color: whitesmoke; z-index: 9;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);-webkit-transform:translate("+(rect.left+rect.width/2-5)+"px,"+(rect.top+rect.height/2-5)+"px);";
							window.setTimeout(function() {
								avatar.style.cssText="display:none;";
								square.style.backgroundColor="#669922";
								Synth.synth_array[16]=4;
								app.$.tournext.classList.add('blinkred');
								app.$.tourexit.classList.add('blinkexit');
								app.$.tourfoot.classList.remove('borderblink')
							},1000);
						},2000);
					},1000);
				},2000);
			},501);
		},2000);
	},

	//Synth FX
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink')
		var hand=app.$.handsvg
		var fxtab=sc.$.fxtabS
		var rect=fxtab.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//fxtab.click();
			sc.$.innertabsS.selected=1;
			fxtab.getRipple().simulatedRipple()
			var verbslider=sc.$.verbsliderS
			rect=verbslider.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/1.5)+"px,"+(rect.top+rect.height/1.5)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/1.5)+"px,"+(rect.top+rect.height/1.5)+"px);";
			window.setTimeout(function() {
				for (var i=0; i<48; i++) {
					verbslider.increment();
				}
				var fslider=sc.$.fsliderS
				rect=fslider.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/4)+"px,"+(rect.top+rect.height/1.5)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/4)+"px,"+(rect.top+rect.height/1.5)+"px);";
				window.setTimeout(function() {
					for (var i=0; i<24; i++) {
						fslider.decrement();
					}
					app.$.tournext.classList.add('blinkred');
					app.$.tourexit.classList.add('blinkexit');
					app.$.tourfoot.classList.remove('borderblink')
				},1000);
			}, 1000);
		},2000);
	},

	//Synth MODS
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink')
		var hand=app.$.handsvg
		var modtab=sc.$.modtabS
		var rect=modtab.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//modtab.click();
			sc.$.innertabsS.selected=2;
			modtab.getRipple().simulatedRipple()
			var xypad=sc.$.xyS
			rect = xypad.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
			window.setTimeout(function() {
				xypad.getRipple().simulatedRipple()
				var thing=sc.$.thingS   
			    thing.style.transition='left .2s ease-in, top .2s ease-in';
			    thing.style.webkitTransition='left .2s ease-in, top .2s ease-in';
			    thing.style.left = (rect.width/2-10) + "px";
			    thing.style.top = (rect.height/2-10) + "px";
			    //var sc=template.find('#synth-card');
			    sc.x_pos=50;
			    sc.y_pos=50;
			    sc.lfo_height = 50 * (sc.xyheight / 100);
    			sc.lfo_stretch = 50 * (sc.xywidth / 100);
    			Synth.FX.lfo1=50;
		  		Synth.FX.lfo2=50;
		        _S.onModFrequency( 52 );
		        _S.onFilterMod( 100 );
		        var dropdown=sc.$.sample_dropdwnS
		        rect=dropdown.getBoundingClientRect();
		        hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		        window.setTimeout(function() {
		        	dropdown.selectedIndex=1;
				    moddropChange('ah');
					rect = xypad.getBoundingClientRect();
					hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
					window.setTimeout(function() {
						xypad.getRipple().simulatedRipple()
						thing.style.transition='left .2s ease-in, top .2s ease-in';
					    thing.style.left = (rect.width/2-10) + "px";
					    thing.style.top = (rect.height/2-10) + "px";
					    sc.x_pos = 3;
						sc.y_pos = 1;
						sc.ah_x=2;
						sc.ah_y=1;
						sc.ahShuffle(3,1);
					    sc.ahColors(true);
					    Synth.FX.ah1=50;
					  	Synth.FX.ah2=50;
					  	rect = dropdown.getBoundingClientRect();
						hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
						window.setTimeout(function() {
				        	dropdown.selectedIndex=2;
				        	moddropChange('adsr');
							rect = xypad.getBoundingClientRect();
							hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
							window.setTimeout(function() {
								xypad.getRipple().simulatedRipple()
								thing.style.transition='left .2s ease-in, top .2s ease-in';
							    thing.style.left = (rect.width/2-10) + "px";
							    thing.style.top = (rect.height/2-10) + "px";
								sc.x_pos = 50;
								sc.y_pos = 50;
								sc.decay = 50;
								sc.attack = 50;
								sc.adsrupdate(sc);
								_S.onEnvA(5);
								_S.onEnvR(50);
								until_synth_noteoff_setting= -2;
								_S.onFilterEnvA(5);
								_S.onFilterEnvR(50);
								Synth.FX.adsr1=50;
								Synth.FX.adsr2=50;
				        		var tabby=sc.$.t2S
				        		rect=tabby.getBoundingClientRect();
				        		hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
				        		window.setTimeout(function() {
				        			tabby.click();
				        			sc.sustain=60;sc.blahblah=290;until_synth_on=true;
									tabby.getRipple().simulatedRipple()
									app.$.tournext.classList.add('blinkred');
									app.$.tourexit.classList.add('blinkexit');
									app.$.tourfoot.classList.remove('borderblink')
				        		},1000);
				        	},1000);
						},1000);
					},1000);
		        },1000);
			},2000);	
		},2000);
	},

	//Freesound.org
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink')
		var hand=app.$.handsvg
		var menu=app.$.appcard.$.topbar.$.menuicon
		var rect=menu.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//menu.click();
			app.$.appcard.$.paperDrawerPanel.openDrawer()
			menu.getRipple().simulatedRipple()
			window.setTimeout(function() {
				var sounds=app.$.appcard.$.menucard.$.sounds_item
				var rect=sounds.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
				window.setTimeout(function() {
					sounds.click();
					window.setTimeout(function() {
						var search=app.$.appcard.$.fc.$.searcher
						var rect=search.getBoundingClientRect();
						hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
						window.setTimeout(function() {
							search.focus();
							window.setTimeout(function() {
								search.updateValueAndPreserveCaret('s')
								window.setTimeout(function() {
									search.updateValueAndPreserveCaret('sn')
									window.setTimeout(function() {
										search.updateValueAndPreserveCaret('sna')
										window.setTimeout(function() {
											search.updateValueAndPreserveCaret('snar')
											window.setTimeout(function() {
												search.updateValueAndPreserveCaret('snare')
												window.setTimeout(function() {
													var button=app.$.appcard.$.fc.$.searchbutton
													var rect=button.getBoundingClientRect();
													hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";												
													window.setTimeout(function() {
														button.click();
														
														checkFlagOne();
														
													},1000)
												},200)
											},200)
										},200)
									},200)
								},200)
							},200)
						},1000)
					},501);
				},2000);
			},501);
		},2000);
	},

	//Login and END
	function() {
		app.$.tournext.classList.remove('blinkred');
		app.$.tourexit.classList.remove('blinkexit');
		app.$.tourfoot.classList.add('borderblink')
		var hand=app.$.handsvg
		var menu=app.$.appcard.$.topbar.$.menuicon
		var rect=menu.getBoundingClientRect();
		hand.style.cssText="display:block;transition:transform 1.5s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1.5s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			app.$.appcard.$.paperDrawerPanel.openDrawer()
			menu.getRipple().simulatedRipple()
			window.setTimeout(function() {
				var login=app.$.appcard.$.menucard.$.login_item
				var rect=login.getBoundingClientRect();
				hand.style.cssText="display:block;transition:transform 2s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 2s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
				window.setTimeout(function() {
					login.click();
					window.setTimeout(function() {
						var wWidth=window.innerWidth;
						var wHeight=window.innerHeight;
						hand.style.cssText="display:block;transition:transform 2s;-webkit-transition:-webkit-transform 2s;transform:translate("+wWidth+"px,"+wHeight+"px);-webkit-transform:translate("+wWidth+"px,"+wHeight+"px);";
						//Synth.gain_nodes[0].gain.linearRampToValueAtTime(0.0,Audiocontext.currentTime+2);
						//Beats.gain_nodes[0].gain.linearRampToValueAtTime(0.0,Audiocontext.currentTime+2);
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
						},1000)
					},501);
				},2000);
			},501);
		},1500);
	}

];

function checkFlagOne() {
	if(app.$.appcard.$.fc.$.repeater.querySelector('.searchli')) {
		checkFlagTwo();
	}
	else {
		window.setTimeout(checkFlagOne, 100);
	}
}

function checkFlagTwo() {

    if(app.$.appcard.$.fc.$.repeater.querySelector('.searchli').$.playfs.disabled) {
       window.setTimeout(checkFlagTwo, 100); /* this checks the flag every 100 milliseconds*/
    } else {
    	var li=app.$.appcard.$.fc.$.repeater.querySelector('.searchli')
		var icon=li.$.playfs
		var rect=icon.getBoundingClientRect();
		var hand=app.$.handsvg
		hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";												
		window.setTimeout(function() {
			icon.click();
			icon.getRipple().simulatedRipple();
			icon=li.$.loadfs
			var rect=icon.getBoundingClientRect();
			hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";												
			window.setTimeout(function() {
				icon.click();
				icon.getRipple().simulatedRipple()
				window.setTimeout(function() {
					var pad=app.$.appcard.$.fc.$.colorcard.$.cb_7
					var rect=pad.getBoundingClientRect();
					hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
					window.setTimeout(function() {
						pad.click();
						pad.getRipple().simulatedRipple()
						bc.$.kittab.click();
						app.$.tournext.classList.add('blinkred');
						app.$.tourexit.classList.add('blinkexit');
						app.$.tourfoot.classList.remove('borderblink')
					},1000);
				},501);
			},1000);
		},1000);
    };
}

tourkicks=1;
toursnares=0;
tourhihats=0;
recordTourKicks =function() {
	if(Beats.setting==7 || Beats.setting==11 || Beats.setting==17 || Beats.setting==23 || Beats.setting==29) {
		var box=bc.$.firstbox 
		box.click();
		box.getRipple().simulatedRipple(0)
		tourkicks++;
	}
	if(tourkicks==5) {
		document.removeEventListener("go",recordTourKicks, false);
		var boxy=bc.$.seventhbox
		var rect=boxy.getBoundingClientRect();
		var hand=app.$.handsvg
		hand.style.cssText="display:block;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			document.addEventListener("go",recordTourSnares, false);
		},1000);
	}
}

recordTourSnares = function() {
	if(Beats.setting==9 || Beats.setting==25 ) {
		var box=bc.$.seventhbox
		box.click();
		box.getRipple().simulatedRipple()
		toursnares++;
	}
	if(toursnares==2) {
		document.removeEventListener("go",recordTourSnares, false);
		var boxy=bc.$.thirdbox
		var rect=boxy.getBoundingClientRect();
		var hand=app.$.handsvg
		hand.style.cssText="display:block;transition:transform 1s;-webkit-transition:-webkit-transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			document.addEventListener("go",recordTourHihats, false);
		},1000);
	}
}

recordTourHihats = function() {
	if( Beats.setting==5 || Beats.setting==15 || Beats.setting==21 || Beats.setting==29 ) {
		var box=bc.$.thirdbox
		box.click();
		box.getRipple().simulatedRipple()
		tourhihats++;
	}
	if(tourhihats==4) {
		document.removeEventListener("go",recordTourHihats, false);
		var button=app.$.appcard.$.topbar.$.recbutton
		rect=button.getBoundingClientRect();
		var hand=app.$.handsvg
		hand.style.cssText="display:block;transition:transform 1s;transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);-webkit-transition:-webkit-transform 1s;-webkit-transform:translate("+(rect.left+rect.width/2)+"px,"+(rect.top+rect.height/2)+"px);";
		window.setTimeout(function() {
			//document.addEventListener("go",recordTourSnares, false);
			Beats.one=1;
			app.$.appcard.$.topbar.rec();
			//button.click();
			button.getRipple().simulatedRipple()
			app.$.tournext.classList.add('blinkred');
			app.$.tourexit.classList.add('blinkexit');
			app.$.tourfoot.classList.remove('borderblink')
		},1000);
	}
}