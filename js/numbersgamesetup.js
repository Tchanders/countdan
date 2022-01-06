( function () {
	/* global Clock, solveNumbersGame */
	var highNumbers = [ 100, 75, 50, 25 ],
		lowNumbers = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10 ],
		offeredNumbers,
		target,
		solutions,
		clock = new Clock();

	$( '.clock-panel' ).append( clock.$element );

	function startGame() {
		clock.reset();
		$( '.gamepage-solutions' ).empty();
		$( '.numbersgame-target' ).text( '\u00a0' );
		for ( var i = 0; i < 6; i++ ) {
			$( '.number-' + i ).text( '\u00a0' );
		}
		$( '.setup-button' ).removeClass( 'button-disabled' );
		$( '.ingame-button' ).addClass( 'button-disabled' );
		offeredNumbers = [];
		target = null;
		solutions = [];
	}

	$( '.numbersgame-setnumbers' ).on( 'click', function () {
		if ( $( this ).hasClass( 'button-disabled' ) ) {
			return;
		}
		$( '.setup-button' ).addClass( 'button-disabled' );
		$( '.ingame-button' ).removeClass( 'button-disabled' );
		var i, x,
			highNumbersCopy = highNumbers.slice(),
			lowNumbersCopy = lowNumbers.slice(),
			numberOfHighs = +$( this ).data( 'value' ),
			numberOfLows = 6 - numberOfHighs;
		offeredNumbers = [];
		for ( i = 0; i < numberOfHighs; i++ ) {
			x = Math.floor( Math.random() * highNumbersCopy.length );
			offeredNumbers.push( highNumbersCopy[ x ] );
			highNumbersCopy.splice( x, 1 );
		}
		for ( i = 0; i < numberOfLows; i++ ) {
			x = Math.floor( Math.random() * lowNumbersCopy.length );
			offeredNumbers.push( lowNumbersCopy[ x ] );
			lowNumbersCopy.splice( x, 1 );
		}
		for ( i = 0; i < 6; i++ ) {
			$( '.number-' + i ).text( offeredNumbers[ i ] );
		}
		target = Math.floor( Math.random() * 899 ) + 101;
		$( '.numbersgame-target' ).text( target );
		setTimeout( function () {
			clock.start();
		}, 1000 );
	} );

	$( '.numbersgame-newgame' ).on( 'click', startGame );

	$( '.gamepage-showsolutions' ).on( 'click', function () {
		$( '.gamepage-solutions' ).empty();
		solutions = solveNumbersGame( offeredNumbers, target );
		if ( solutions.length === 0 ) {
			$( '.gamepage-solutions' ).append( $( '<p>' ).text( 'No solutions found' ) );
		} else {
			for ( var i = 0; i < solutions.length; i++ ) {
				$( '.gamepage-solutions' ).append( $( '<div>' ).text( solutions[ i ] ) );
			}
		}
	} );

	startGame();
}() );
