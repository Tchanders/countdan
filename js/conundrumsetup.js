( function () {
	/* global wordlist */
	const nines = [];
	let conundrum;

	function init() {
		const $tilePanel = $( '<div>' ).addClass( 'tile-panel tile-panel-letters' );
		let i;

		// Conundrums are nine-letter words with only one anagram
		if ( !nines.length ) {
			for ( i in wordlist ) {
				if ( i.length === 9 && wordlist[ i ].length === 1 ) {
					nines.push( wordlist[ i ][ 0 ] );
				}
			}
		}

		for ( i = 0; i < 9; i++ ) {
			$tilePanel.append(
				$( '<div>' ).addClass( 'gamepage-tile letter-' + i )
			);
		}
		$( '.game-content' ).append(
			$tilePanel,
			$( '<div>' ).addClass( 'ingame-button gamepage-button conundrumgame-newgame' ).text( 'New conundrum' )
		);

		$( '.gamepage-showsolutions' ).on( 'click', showSolution );
		$( '.conundrumgame-newgame' ).on( 'click', startGame );

		startGame();
	}

	function startGame() {
		Countdan.clock.start();
		$( '.gamepage-solutions' ).empty();

		// Generate a conundrum
		conundrum = nines[ Math.floor( nines.length * Math.random() ) ];
		// Shuffle the letters
		const letters = shuffle( conundrum.split( '' ) );
		// Place in the tiles
		$( '.gamepage-tile' ).each( function ( j ) {
			$( this ).text( letters[ j ].toUpperCase() );
		} );
		$( '.ingame-button' ).removeClass( 'button-disabled' );
	}

	function shuffle( array ) {
		let counter = array.length;

		// While there are elements in the array
		while ( counter > 0 ) {
			// Pick a random index
			const index = Math.floor( Math.random() * counter );

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			const temp = array[ counter ];
			array[ counter ] = array[ index ];
			array[ index ] = temp;
		}

		return array;
	}

	function showSolution() {
		$( '.gamepage-solutions' ).empty();
		$( '.gamepage-solutions' ).append(
			$( '<p>' ).append(
				$( '<a>' )
					.attr( 'href', 'https://en.wiktionary.org/wiki/' + conundrum + '#English' )
					.attr( 'target', '_blank' )
					.text( conundrum )
			)
		);
	}

	Countdan.conundrum = init;

}() );
