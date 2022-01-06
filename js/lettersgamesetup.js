( function () {
	/* global solveLettersGame */
	// Based on Scrabble distributions (Wikipedia):
	// E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
	// D ×4, G ×3
	// B ×2, C ×2, M ×2, P ×2
	// F ×2, H ×2, V ×2, W ×2, Y ×2
	// K ×1
	// J ×1, X ×1
	// Q ×1, Z ×1
	var MIN_LETTERS = 5,
		MAX_LETTERS = 9,
		vowels = [
			'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
			'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
			'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
			'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
			'U', 'U', 'U', 'U'
		],
		consonants = [
			'N', 'N', 'N', 'N', 'N', 'N',
			'R', 'R', 'R', 'R', 'R', 'R',
			'T', 'T', 'T', 'T', 'T', 'T',
			'L', 'L', 'L', 'L',
			'S', 'S', 'S', 'S',
			'D', 'D', 'D', 'D',
			'G', 'G', 'G',
			'B', 'B',
			'C', 'C',
			'M', 'M',
			'P', 'P',
			'F', 'F',
			'H', 'H',
			'V', 'V',
			'W', 'W',
			'Y', 'Y',
			'K',
			'J',
			'X',
			'Q',
			'Z'
		],
		vowelsCopy,
		consonantsCopy,
		tileCounter,
		offeredLetters;

	function init() {
		var i,
			$tilePanel = $( '<div>' ).addClass( 'tile-panel' );

		for ( i = 0; i < MAX_LETTERS; i++ ) {
			// Split the tiles over two rows
			if ( i === Math.ceil( MAX_LETTERS / 2 ) ) {
				$tilePanel.append( $( '<br>' ) );
			}
			$tilePanel.append(
				$( '<div>' ).addClass( 'gamepage-tile letter-' + i )
			);
		}
		$( '.game-content' ).append(
			$tilePanel,
			'To start the game, choose nine letters:',
			$( '<br>' ),
			$( '<div>' ).addClass( 'setup-button gamepage-button lettersgame-choosevowel' ).text( 'Vowel' ),
			$( '<div>' ).addClass( 'setup-button gamepage-button lettersgame-chooseconsonant' ).text( 'Consonant' ),
			$( '<div>' ).addClass( 'ingame-button gamepage-button lettersgame-newgame button-disabled' ).text( 'Start again' )
		);

		$( '.lettersgame-choosevowel, .lettersgame-chooseconsonant' ).on( 'click', chooseLetter );
		$( '.gamepage-showsolutions' ).on( 'click', showSolutions );
		$( '.lettersgame-newgame' ).on( 'click', startGame );

		startGame();
	}

	function startGame() {
		Countdan.clock.reset();
		$( '.gamepage-tile' ).text( '\u00a0' );
		$( '.gamepage-solutions' ).empty();
		// During setup:
		// make setup buttons look enabled
		// make inplay buttons look disabled
		// NB inplay buttons are not actually disabled, but they don't do anything
		$( '.setup-button' ).removeClass( 'button-disabled' );
		$( '.ingame-button' ).addClass( 'button-disabled' );
		// vowelsCopy is a shallow copy of vowels
		vowelsCopy = vowels.slice();
		consonantsCopy = consonants.slice();
		tileCounter = 0;
		offeredLetters = [];
	}

	function chooseLetter() {
		if ( tileCounter < MAX_LETTERS ) {
			var letters;
			if ( $( this ).hasClass( 'lettersgame-choosevowel' ) ) {
				// letters now refers to vowelsCopy
				letters = vowelsCopy;
			} else {
				letters = consonantsCopy;
			}
			var x = Math.floor( Math.random() * letters.length );
			$( '.letter-' + tileCounter ).text( letters[ x ] );
			offeredLetters.push( letters[ x ] );
			letters.splice( x, 1 );
			tileCounter++;
		}
		// Start the game automatically when all the tiles are full
		if ( tileCounter === MAX_LETTERS ) {
			// During play:
			// make setup buttons look disabled
			// make inplay buttons look enabled
			// NB setup buttons are not actually disabled, but they don't do anything
			$( '.setup-button' ).addClass( 'button-disabled' );
			$( '.ingame-button' ).removeClass( 'button-disabled' );
			setTimeout( function () {
				Countdan.clock.start();
			}, 1000 );
		}
	}

	function showSolutions() {
		$( '.gamepage-solutions' ).empty();
		var solutions = solveLettersGame( offeredLetters.join( '' ) );
		if ( solutions.length === 0 ) {
			$( '.gamepage-solutions' ).append( $( '<p>' ).text( 'No solutions found' ) );
		} else {
			for ( var i = MAX_LETTERS; i >= MIN_LETTERS; i-- ) {
				if ( solutions[ i ] ) {
					var subSolutions = solutions[ i ];
					$( '.gamepage-solutions' ).append( $( '<h2>' ).text( i + ' letters' ) );
					for ( var j = 0; j < subSolutions.length; j++ ) {
						$( '.gamepage-solutions' ).append(
							$( '<div>' ).append(
								$( '<a>' )
									.attr( 'href', 'https://en.wiktionary.org/wiki/' + subSolutions[ j ] + '#English' )
									.attr( 'target', '_blank' )
									.text( subSolutions[ j ] )
							)
						);
					}
				}
			}
		}
	}

	Countdan.lettersGame = init;
}() );
