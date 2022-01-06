( function () {

	var Clock = function ( config ) {
		config = config || {};

		this.startTime = null;
		this.updateTimeout = null;
		// Number of times per second to redraw
		this.framerate = config.framerate || 60;
		this.duration = ( config.duration || 30 ) * 1000;
		this.angle = config.angle || 180;

		// eslint-disable-next-line no-jquery/no-parse-html-literal
		this.$element = $(
			'<svg class="clock-image" viewbox="0 0 250 250">' +
				'<circle cx="125" cy="125" r="120" stroke="blue" stroke-width="10" fill="#ccc"/>' +
				'<path class="border" transform="translate(125, 125) scale(.92)" fill="#fff"/>' +
				'<path class="loader" transform="translate(125, 125) scale(.5)" fill="#ccc"/>' +
				'<path d="M 125 10 L 125 240" stroke="#999" stroke-width="2"/>' +
				'<path d="M 10 125 L 240 125" stroke="#999" stroke-width="2"/>' +
				'<path class="hand" d="M 120 125 L 125 10 L 130 125" fill="#666"/>' +
				'<circle cx="125" cy="125" r="10" fill="#666"/>' +
			'</svg>'
		);

		this.$hand = this.$element.find( '.hand' );
		this.$border = this.$element.find( '.border' );
		this.$loader = this.$element.find( '.loader' );

	};

	Clock.prototype.start = function () {
		if ( this.updateTimeout ) {
			clearTimeout( this.updateTimeout );
		}
		this.startTime = Date.now();
		this.update();
	};

	Clock.prototype.reset = function () {
		if ( this.updateTimeout ) {
			clearTimeout( this.updateTimeout );
		}
		this.draw( 0 );
	};

	Clock.prototype.update = function () {
		var time = Date.now() - this.startTime;

		this.draw( time );

		// Provided we haven't passed duration, set a timeout
		// to update the clock again after 1000/framerate milliseconds
		if ( time < this.duration ) {
			this.updateTimeout = setTimeout( this.update.bind( this ), 1000 / this.framerate );
		}
	};

	/**
	 * Draw the clock with a given number of milliseconds
	 *
	 * @param {number} time Milliseconds elapsed
	 */
	Clock.prototype.draw = function ( time ) {
		time = Math.min( time, this.duration );

		// Calculate the angle, and the SVG path
		var angle = this.angle * time / this.duration,
			r = ( angle * Math.PI / 180 ),
			x = Math.sin( r ) * 125,
			y = Math.cos( r ) * -125,
			mid = ( angle > 180 ) ? 1 : 0,
			anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

		// Update the SVG via the DOM
		this.$loader.attr( 'd', anim );
		this.$border.attr( 'd', anim );
		this.$hand.attr( 'transform', 'rotate( ' + angle + ' 125 125)' );
	};

	// Make 'Clock' global
	window.Clock = Clock;

}() );
