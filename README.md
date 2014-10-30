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

Other options that you can specify are : `activeClass` , `nextClass` , `passedClass` and `idleClass` , all these options take a string that represents the class added by **pocha Slider** for animations, I've used all the default values in the sample code, Look at the [**CSS**](##the-css-) we've just created, youl'll find the defaults.


###Footnote

* The name came from a Bangla word 'pocha' that means rotten/bad .
* pocha slider is still under active development, contributors welcome.
* This project is released under the [MIT License](http://opensource.org/licenses/MIT)
* You can share your creations with pocha slider by tweeting [@mranam](http://twitter.com/mranam) and I'll include them here.
* You can request features with the issue tracker of this repository.
* Pocha Slider is developed and maintained by [Anam Ahmed](http://anam.co)


















