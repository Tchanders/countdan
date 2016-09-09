( function () {
	/* global Clock, wordlist */
	var i, conundrum,
		nines = [],
		clock = new Clock();

	for ( i in wordlist ) {
		if ( i.length === 9 && wordlist[ i ].length === 1 ) {
			nines.push( wordlist[ i ][ 0 ] );
		}
	}

	$( '.clock-panel' ).append( clock.$element );

	function startGame() {
		clock.start();
		$( '.gamepage-solutions' ).empty();

		// Generate a conundrum
		conundrum = nines[ Math.floor( nines.length * Math.random() ) ];
		// Shuffle the letters
		var letters = shuffle( conundrum.split( '' ) );
		// Place in the tiles
		$( '.gamepage-tile' ).each( function ( i ) {
			$( this ).text( letters[ i ].toUpperCase() );
		} );
		$( '.ingame-button' ).removeClass( 'button-disabled' );
	}

	function shuffle( array ) {
		var counter = array.length, temp, index;

		// While there are elements in the array
		while ( counter > 0 ) {
			// Pick a random index
			index = Math.floor( Math.random() * counter );

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			temp = array[ counter ];
			array[ counter ] = array[ index ];
			array[ index ] = temp;
		}

		return array;
	}

	$( '.gamepage-showsolutions' ).on( 'click', function() {
		$( '.gamepage-solutions' ).append(
			$( '<p>' ).append(
				$( '<a>' )
					.attr( 'href', 'https://en.wiktionary.org/wiki/' + conundrum + '#English' )
					.attr( 'target', '_blank' )
					.text( conundrum )
		) );
	} );

	$( '.conundrumgame-newgame' ).on( 'click', startGame );

} )();
