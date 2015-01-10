( function() {

	var startTime,
		updateTimeout,
		Clock = {},
		loader = document.getElementById( 'loader' ),
		border = document.getElementById( 'border' ),
		hand = document.getElementById( 'hand' ),
		// Number of times per second to redraw
		framerate = 60,
		duration = 30 * 1000;

	Clock.start = function() {
		if ( updateTimeout ) {
			clearTimeout( updateTimeout );
		}
		startTime = new Date().getTime();
		update();
	};

	Clock.reset = function() {
		if ( updateTimeout ) {
			clearTimeout( updateTimeout );
		}
		draw( 0 );
	};

	function update() {
		var time = new Date().getTime() - startTime;

		draw( time );

		// Provided we haven't passed duration, set a timeout
		// to update the clock again after 1000/framerate milliseconds
		if ( time < duration ) {
			updateTimeout = setTimeout( update, 1000/framerate );
		}
	}

	/**
	 * Draw the clock with a given number of milliseconds
	 *
	 * @param {number} time Milliseconds elapsed
	 */
	function draw( time ) {
		time = Math.min( time, duration );

		// Calculate the angle, and the SVG path
		var angle = 180 * time / duration,
			r = ( angle * Math.PI / 180 ),
			x = Math.sin( r ) * 125,
			y = Math.cos( r ) * - 125,
			mid = ( angle > 180 ) ? 1 : 0,
			anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' +  x  + ' ' +  y  + ' z';

		// Update the SVG via the DOM
		loader.setAttribute( 'd', anim );
		border.setAttribute( 'd', anim );
		hand.setAttribute( 'transform', 'rotate( ' + angle +  ' 125 125)');
	}

	// Make 'Clock' global
	window.Clock = Clock;

} )();
