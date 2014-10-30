#jQuery Pocha Slider : A highly customizable miltipurpose Slider

****

#####yet another slider? Check out [This demo](http://demo.anam.co/pochaslider) to find out why.

###Features:

* pure css3 transition based effects
* Per element timing
* Per element effect
* Easily customizable
* keyboard navigation
* Presentation mode (can be used as presentation)
* Responsive as you like
* takes five minute to learn and start working
* Small codebase, easily customizable
* Lets you use your Existing CSS skills.

###How it works

**pocha slider** is a one file slider. there's only one file : `pochaslider.js` or you can use `pochaslider.min.js` , as It's a jQuery plugin, you must have jQuery included as well. 

PochaSlider works with a simple principle, every element in pocha slider has four states:

* idle state (when the element is not anywhere in the context)
* active state (when the element is in focus)
* next state (when the element will be in active state in the next iteration)
* passed state (when the element just passsed active state in the last iteration)

so, so every element goes through the following cycle:

__*idle - next - active - passed - idle*__

if you take a look at the list **below**, you'll understand how it works in the list:

if we assume active element is 'A', next element is 'N' and passed element is 'P' and idle elements are 'I' then the first iteration is, 
####`ANIIP`
the second iteration would be :
####`PANII`
so, the P became I and N became A, the A became P
and the third iteration would be:
####`IPANI`
and so on...
okay not if you still don't get it, you'll understand from the sample code below.

###Sample Implementation

Our objective is to *create a simple text effect, every single item will zoom in hold for one second, and then burst out (zoom in and vanish). we also want the __fourth__ item to stay a little bit longer, 2 seconds instead of 1.* Let's create it.

So, we need to create the markup first:
````html
	<div class="slidercontainer">
		<div class="slide">Pocha</div>
		<div class="slide">Slider</div>
		<div class="slide">Is</div>
		<div class="slide" data-stay="2000">Really</div>
		<div class="slide">Awesome</div>
	</div>
````
so, the first thing you learned about Pocha slider is, you can specify per element staying time by passing the element a data attribute `data-stay`, this takes value in milleseconds. so 2000 = 2 seconds. and the second thing to notice that, you need to have the same class (or something you can use to select them all with jQuery).

okay, now you need to add some magic to it with CSS3, that's where all the effects would be. Write the CSS below:
 
````css
	.slidercontainer{
		position:relative; /*because elements inside would be position:absolute*/
	}
	.slide{
		position:absolute; /*stack all the slides one over another*/
		transition:all 1s; /*this makes things animated, note the 1s, it's the animation duration*/
		font-size:100px; /*you know you can ignore it*/
	}


	.pochaslider-active{ /*style for the active state*/
		opacity:1;
		transform:scale(1);
	}
	.pochaslider-next{ 
		/*style before the active state, more like getting ready for transition to active state*/
		transform:scale(0);
		opacity:0;
	}
	.pochaslider-passed{
		/*style after the active state has passed passed, or simply the end point of exit animation*/
		transform:scale(3);
		opacity:0;
	}
	.pochaslider-idle{ 
		/*style for the idle state, something that won't interrupt the overall look, may be different as well*/
		opacity:0;
	}
````

Now that the stylesheet is ready, you need to add **jQuery** and **pochaslider.min.js** in your document. Let's do it.
````html
	<script src = "jquery.min.js"></script>
	<script src = "pochaslider.min.js"></script>
````
now there's only one step left, initializing the slider, that's also simple:
````html
	<script>
	var options = {
					delay:1000 //slider options
				}
		$('.slides').pochaSlider(options);
	</script>
````
yay! you have done it! if you've successfully followed all the instructions, you'll get something like [this](http://demo.anam.co/pochaslider1)

####Options :

Options are passed using a **JSON** object, that may include these following properties. 

##### delay (number) :
Specifies the time each element will stay (in milleseconds). default : `1000` (1 Second)
##### activeClass (String) : 
the CSS class added to the element at active state. default : `pochaslider-active`
##### nextClass (String) :
the CSS class added to the element to be active in the next sequence (the next slide).useful for determining the initial state of animation before coming in. default : `pochaslider-next`
##### passedClass (String) :
the CSS class added to the element that was active in the last iteration. useful to determinte behavior how elements will go away. default : `pochaslider-passed`
##### idleClass (String) : 
The CSS class added to any other element that's not active, passed or next. can be useful to hide the rest of the slides. default : `pochaslider-idle`
##### autoPlay (boolean) : 
if set true, the slides will change automatically. default : `true`
##### keyboardNavigation (boolean) :
if set true, the slides can be changed using the keyboard, button <kbd>&larr;</kbd> <kbd>&rarr;</kbd> and <kbd>spacebar</kbd> . default : `false`
##### pauseOnHover (boolean) : 
if set true, autoplay will pause if the user has autoplay enabled. default : `false`

####Controlling the behavior at runtime :
One thing to notice that pochaSlider doesn't return the same jQuery object. It returns a control object instead. So, you can't do something like `$('.slide').pochaSlider().hide();` but yeah, who wants to hide a brand new initialized slider (lol) . but the control object that it retuens, is useful to control the overall behavior of the slider. to get the control object, assign it to a variable like this : 

````js
	var slider = $('.slide').pochaSlider();
	//do something with the slider object, for example: pause it.
	slider.pause() // pause the animation 
````
control functions are : 

##### play() :
plays a stopped or paused slideshow.
##### pause() :
pauses a slideshow. (Immediately stops the animations).
##### stop() :
stops the animation after the last animation is complete.
##### next() :
go to the next Slide
##### previous() : 
go to the previous Slide
##### goTo(index) :
go to the slide with given index (starting from 0)
###Footnote

* The name came from a Bangla word 'pocha' that means rotten/bad .
* pocha slider is still under active development, contributors welcome.
* This project is released under the [MIT License](http://opensource.org/licenses/MIT)
* You can share your creations with pocha slider by tweeting [@mranam](http://twitter.com/mranam) and I'll include them here.
* You can request features with the issue tracker of this repository.
* Pocha Slider is developed and maintained by [Anam Ahmed](http://anam.co)


















