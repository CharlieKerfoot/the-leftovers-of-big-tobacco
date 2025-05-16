const container = d3.select('#scroll');
const graphic = container.select('.graphic');
const chart = graphic.select('.chart');
const text = container.select('.scroll_text');
const step = text.selectAll('.step');

// initialize the scrollama
const scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
	// 1. update height of step elements for breathing room between steps
	const stepHeight = Math.floor(window.innerHeight * 0.75);
	step.style('height', stepHeight + 'px');

	// 2. update height of graphic element
	const bodyWidth = d3.select('body').node().offsetWidth;

	graphic.style('height', window.innerHeight + 'px');

	// 3. update width of chart by subtracting from text width
	const chartMargin = 32;
	const textWidth = text.node().offsetWidth;
	const chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
	// make the height 1/2 of viewport
	const chartHeight = Math.floor(window.innerHeight / 2);

	chart.style('width', chartWidth + 'px').style('height', chartHeight + 'px');

	// 4. tell scrollama to update new element dimensions
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
	// update graphic based on step here
	const stepData = response.element.getAttribute('data-step');
}

function handleContainerExit(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	// graphic.classed('is-fixed', false);
	// graphic.classed('is-bottom', response.direction === 'down');
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
			offset: .5, // set the trigger to be 1/2 way down screen
			debug: true, // display the trigger offset for testing
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleContainerExit);

	// setup resize event
	window.addEventListener('resize', handleResize);
}

// start it up
init();
