const container = d3.select('#scroll');
const graphic = container.select('.graphic');
const text = container.select('.scroll_text');
const step = text.selectAll('.step');

// initialize the scrollama
const scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
	// 1. update height of graphic element
	const bodyWidth = d3.select('body').node().offsetWidth;
	graphic.style('height', window.innerHeight + 'px');

	// 2. tell scrollama to update new element dimensions
	scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
	// response = { element, direction, index }

	// fade in current step
	step.classed('is-active', function (d, i) {
		return i === response.index;
	});

	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);

	// Update the image based on the current step
	updateImage(response.index);
}

function handleContainerExit(response) {
	// response = { direction }
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function updateImage(stepIndex) {
	const images = document.querySelectorAll('.scroll-image');
	images.forEach((img, index) => {
		img.classList.remove('active');
		if (index === stepIndex) {
			img.classList.add('active');
		}
	});
}

// kick-off code to run once on load
function init() {
	// 1. call a resize on load to update width/height/position of elements
	handleResize();

	// 2. setup the scrollama instance
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller
		.setup({
			container: '#scroll', // our outermost scrollytelling element
			graphic: '.graphic', // the graphic
			text: '.scroll_text', // the step container
			step: '.scroll_text .step', // the step elements
			offset: 0.65, // set the trigger to be 4/5 way down screen (higher number = earlier trigger)
			debug: false, // display the trigger offset for testing
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleContainerExit);

	// setup resize event
	window.addEventListener('resize', handleResize);
}

// start it up
init();
