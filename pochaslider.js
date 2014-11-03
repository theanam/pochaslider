// Pocha Slider : where things are beyond simple
(function($){$.fn.extend({
	pochaSlider : function(params){
		if(!params)
			params = {};
		var elements = $(this);
		params.autoPlay || (params.autoPlay==false) || (params.autoPlay = true);
		var stopped = !params.autoPlay;
		// console.log(stopped);
		var idle = params.idleClass || 'pochaslider-idle';
		params.pauseOnHover || (params.pauseOnHover == false) || (params.pauseOnHover = false);
		elements.addClass(idle);
		if(elements.length>1){
			params.activeClass || (params.activeClass = 'pochaslider-active');
			params.nextClass || (params.nextClass = 'pochaslider-next');
			params.passedClass || (params.passedClass = 'pochaslider-passed');
			var active = "."+params.activeClass;
			var next = "." + params.nextClass;
			var passed = "." + params.passedClass;
			var paused = false;
			$(elements[0]).addClass(params.activeClass).removeClass(idle);
			$(elements[1]).addClass(params.nextClass).removeClass(idle);
			$(elements[elements.length-1]).addClass(params.passedClass).removeClass(idle);
			var gotoNextSlide = function(state){
				if(!paused){
					//Step 0: set last passed item as idle
					elements.filter(passed).addClass(idle).removeClass(params.passedClass);
					//step 1: change active to passed
					elements.filter(active).removeClass(params.activeClass).addClass(params.passedClass);
					//Step 2: Set up what's gonna come next
					var nxtindex = elements.index($(next));
					if(nxtindex+1>elements.length-1){
						nxtindex = 0
					}
					else{
						nxtindex = nxtindex+1;
					}
					//Step 3: set the next item as active
					elements.filter(next).addClass(params.activeClass).removeClass(params.nextClass);
					//Step 4: set up the next item
					$(elements[nxtindex]).addClass(params.nextClass).removeClass(idle);
					//see if the element has custom delay
				}
				var delay = $(elements.filter(active)[0]).data('stay') || params.delay || 1000; //default 1s
				// console.log(delay);
				(delay == "-1") && (stopped = true); // if delay is -1, stop the slideshow
				state || stopped || setTimeout(gotoNextSlide,delay);

			}
			var gotoPreviousSlide = function(){
				var actv = elements.filter(active);
				var nextc = elements.filter(next);
				var passd = elements.filter(passed);
				var psdnxt = (elements.index(passd)-1>=0)?(elements.index(passd)-1):(elements.length-1);
				// console.log(actv);
				// console.log(nextc);
				// console.log(passd);
				// console.log(psdnxt);
				$(elements[psdnxt]).removeClass(idle).addClass(params.passedClass);
				actv.removeClass(params.activeClass).addClass(params.nextClass);
				nextc.removeClass(params.nextClass).addClass(idle);
				passd.addClass(params.activeClass).removeClass(params.passedClass);
			}
			var delay = $(elements.filter(active)[0]).data('stay') || params.delay || 1000;
			!stopped && setTimeout(gotoNextSlide,delay);
			//gotoSlide implimentation
			var gotoSlide = function(index){
				if(index<elements.length-1 && index>=0){ //valid index
					var actel = $(elements[index]);
					var nxtindx = ((index+1)<elements.length)?(index+1):0;
					var nxtel = $(elements[nxtindx]);
					var preindx = (index-1>=0)?(index-1):(elements.length-1);
					var prevel = $(elements[preindx]);
					//make everything idle
					$(active).removeClass(params.activeClass).addClass(idle);
					$(next).removeClass(params.nextClass).addClass(idle);
					$(passed).removeClass(params.passedClass).addClass(idle);
					actel.addClass(params.activeClass).removeClass(idle);
					nxtel.addClass(params.nextClass).removeClass(idle);
					prevel.addClass(params.passedClass).removeClass(idle);
				}
				else{
					return false;
				}
			}
		}
		
		//keyboard navigation
		$(document).keydown(function(e){
			if(params.keyboardNavigation && params.keyboardNavigation == true){
			if(e.keyCode == 39 || e.keyCode == 32){ // space or keyboardnext
				//next Slide
				e.preventDefault();
				gotoNextSlide(1);
			}
			else if(e.keyCode == 37){ // keyboardprevious
				//previous slide
				e.preventDefault();
				gotoPreviousSlide();
			}
			}
		});
		//Pause on hover
		elements.mouseenter(function(e){
			//stop the animation if necessary
			e.stopImmediatePropagation();
			params.pauseOnHover && (params.autoPlay ==true) && (paused = true); //get the stopped flag to true
		}).mouseleave(function(e){
			//replay the animation if required
			e.stopImmediatePropagation();
			params.pauseOnHover && (params.autoPlay ==true) && (paused = false);
		});
		var slideControl = {
			next : function(){gotoNextSlide(1)},
			previous : function(){gotoPreviousSlide()},
			stop : function(){stopped=true},
			pause : function(){paused=true},
			goTo : function(index){gotoSlide(index)},
			play : function(){if(stopped){stopped=false;gotoNextSlide()};if(paused){paused=false}}
		};
		return slideControl;
	}
})})(jQuery);
 