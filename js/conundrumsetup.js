( function () {
	/* global conundrums */
	let conundrum,
		answerRow;

	function init() {
		const $tilePanel = $( '<div>' ).addClass( 'tile-panel tile-panel-letters' );

		for ( let i = 0; i < 9; i++ ) {
			$tilePanel.append(
				$( '<div>' ).addClass( 'gamepage-tile letter-' + i )
			);
		}
		answerRow = new Countdan.AnswerRow( $tilePanel.children() );
		$( '.game-content' ).append(
			$( '<div>' ).addClass( 'ingame-button gamepage-button conundrumgame-newgame' ).text( 'New conundrum' ),
			$tilePanel,
			answerRow.$element
		);

		$( '.gamepage-showsolutions' ).on( 'click', showSolution );
		$( '.conundrumgame-newgame' ).on( 'click', startGame );

		startGame();
	}

	function startGame() {
		Countdan.clock.start();
		$( '.gamepage-solutions' ).empty();

		// Generate a conundrum
		conundrum = conundrums[ Math.floor( conundrums.length * Math.random() ) ];
		// Shuffle the letters
		const letters = shuffle( conundrum.split( '' ) );
		// Place in the tiles
		answerRow.$selectionTiles.each( function ( j ) {
			$( this ).text( letters[ j ].toUpperCase() );
		} );
		answerRow.reset();
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
