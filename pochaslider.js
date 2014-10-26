// Pocha Slider : where things are beyond simple
(function($){$.fn.extend({
	pochaSlider : function(params){
		if(!params)
			params = {};
		var elements = $(this);
		var idle = params.idleClass || 'pochaslider-idle';
		elements.addClass(idle);
		if(elements.length>1){
			params.activeClass || (params.activeClass = 'pochaslider-active');
			params.nextClass || (params.nextClass = 'pochaslider-next');
			params.passedClass || (params.passedClass = 'pochaslider-passed');
			var active = "."+params.activeClass;
			var next = "." + params.nextClass;
			var passed = "." + params.passedClass;
			$(elements[0]).addClass(params.activeClass).removeClass(idle);
			$(elements[1]).addClass(params.nextClass).removeClass(idle);
			var gotoNextSlide = function(state){
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
				var delay = $(elements.filter(active)[0]).data('stay') || params.delay || 1000; //default 1s
				state || setTimeout(gotoNextSlide,delay);
			}
			var delay = $(elements.filter(active)[0]).data('stay') || params.delay || 1000;
			setTimeout(gotoNextSlide,delay);
		}
		var slideControl = {
			next : function(){gotoNextSlide(1)}
		};
		return slideControl;
	}
})})(jQuery);
 