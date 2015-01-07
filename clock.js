var loader = document.getElementById( 'loader' ),
	border = document.getElementById( 'border' ),
	hand = document.getElementById( 'hand' ),
	startTime,
	duration = 30 * 1000;

function startTimer() {
	startTime = new Date().getTime();
	draw();
}

function draw() {
	var time = new Date().getTime() - startTime,
		angle = 180 * time / duration,
		r = ( angle * Math.PI / 180 ),
		x = Math.sin( r ) * 125,
		y = Math.cos( r ) * - 125,
		mid = ( angle > 180 ) ? 1 : 0,
		anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' +  x  + ' ' +  y  + ' z';

	loader.setAttribute( 'd', anim );
	border.setAttribute( 'd', anim );
	hand.setAttribute( 'transform', 'rotate( ' + angle +  ' 125 125)');

	if ( time < duration ) {
		setTimeout( draw, 30 ); // Redraw
	}
}