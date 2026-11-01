( function () {
	/* global solveNumbersGame */
	const highNumbers = [ 100, 75, 50, 25 ],
		lowNumbers = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10 ];
	let offeredNumbers,
		target,
		solutions;

	function init() {
		const $tilePanel = $( '<div>' ).addClass( 'tile-panel' );
		let i,
			$setNumbers = $( [] );

		for ( i = 0; i < 6; i++ ) {
			$tilePanel.append(
				$( '<div>' ).addClass( 'gamepage-tile number-' + i )
			);
		}
		for ( i = 0; i <= highNumbers.length; i++ ) {
			$setNumbers = $setNumbers.add(
				$( '<div>' )
					.addClass( 'setup-button gamepage-button numbersgame-setnumbers' )
					.attr( 'data-value', i )
					.text( i )
			);
		}
		$( '.game-content' ).append(
			$( '<div>' ).addClass( 'numbersgame-target' ),
			$tilePanel,
			'To start the game, choose how many big numbers you want:',
			$( '<br>' ),
			$setNumbers,
			$( '<div>' ).addClass( 'ingame-button gamepage-button numbersgame-newgame button-disabled' ).text( 'Start again' )
		);

		$( '.numbersgame-setnumbers' ).on( 'click', setNumbers );
		$( '.numbersgame-newgame' ).on( 'click', startGame );
		$( '.gamepage-showsolutions' ).on( 'click', showSolutions );

		startGame();
	}

	function startGame() {
		Countdan.clock.reset();
		$( '.gamepage-solutions' ).empty();
		$( '.numbersgame-target' ).text( '\u00a0' );
		for ( let i = 0; i < 6; i++ ) {
			$( '.number-' + i ).text( '\u00a0' );
		}
		$( '.setup-button' ).removeClass( 'button-disabled' );
		$( '.ingame-button' ).addClass( 'button-disabled' );
		offeredNumbers = [];
		target = null;
		solutions = [];
	}

	function setNumbers() {
		if ( $( this ).hasClass( 'button-disabled' ) ) {
			return;
		}
		$( '.setup-button' ).addClass( 'button-disabled' );
		$( '.ingame-button' ).removeClass( 'button-disabled' );
		const highNumbersCopy = highNumbers.slice(),
			lowNumbersCopy = lowNumbers.slice(),
			numberOfHighs = +$( this ).data( 'value' ),
			numberOfLows = 6 - numberOfHighs;
		let i, x;
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
		setTimeout( () => {
			Countdan.clock.start();
		}, 1000 );
	}

	function showSolutions() {
		$( '.gamepage-solutions' ).empty();
		solutions = solveNumbersGame( offeredNumbers, target );
		if ( solutions.length === 0 ) {
			$( '.gamepage-solutions' ).append( $( '<p>' ).text( 'No solutions found' ) );
		} else {
			for ( let i = 0; i < solutions.length; i++ ) {
				$( '.gamepage-solutions' ).append( $( '<div>' ).text( solutions[ i ] ) );
			}
		}
	}

	Countdan.numbersGame = init;
}() );
