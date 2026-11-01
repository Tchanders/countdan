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
	const MIN_LETTERS = 5,
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
		vowelOptions = [ 3, 4, 5 ];
	let offeredLetters,
		answerRow;

	function init() {
		const $tilePanel = $( '<div>' ).addClass( 'tile-panel tile-panel-letters' );
		let i,
			$setVowels = $( [] );

		for ( i = 0; i < MAX_LETTERS; i++ ) {
			$tilePanel.append(
				$( '<div>' ).addClass( 'gamepage-tile letter-' + i )
			);
		}
		for ( i = 0; i < vowelOptions.length; i++ ) {
			$setVowels = $setVowels.add(
				$( '<div>' )
					.addClass( 'setup-button gamepage-button lettersgame-setvowels' )
					.attr( 'data-value', vowelOptions[ i ] )
					.text( vowelOptions[ i ] )
			);
		}
		answerRow = new Countdan.AnswerRow( $tilePanel.children() );
		$( '.game-content' ).append(
			'To start the game, choose how many vowels you want:',
			$( '<br>' ),
			$setVowels,
			$( '<div>' ).addClass( 'ingame-button gamepage-button lettersgame-newgame button-disabled' ).text( 'Start again' ),
			$tilePanel,
			answerRow.$element
		);

		$( '.lettersgame-setvowels' ).on( 'click', setVowels );
		$( '.gamepage-showsolutions' ).on( 'click', showSolutions );
		$( '.lettersgame-newgame' ).on( 'click', startGame );

		startGame();
	}

	function startGame() {
		Countdan.clock.reset();
		$( '.tile-panel-letters:not( .answer-panel ) .gamepage-tile' ).text( '\u00a0' );
		answerRow.reset();
		$( '.gamepage-solutions' ).empty();
		// During setup:
		// make setup buttons look enabled
		// make inplay buttons look disabled
		// NB inplay buttons are not actually disabled, but they don't do anything
		$( '.setup-button' ).removeClass( 'button-disabled' );
		$( '.ingame-button' ).addClass( 'button-disabled' );
		offeredLetters = [];
	}

	function setVowels() {
		if ( $( this ).hasClass( 'button-disabled' ) ) {
			return;
		}
		// During play:
		// make setup buttons look disabled
		// make inplay buttons look enabled
		$( '.setup-button' ).addClass( 'button-disabled' );
		$( '.ingame-button' ).removeClass( 'button-disabled' );
		const vowelsCopy = vowels.slice(),
			consonantsCopy = consonants.slice(),
			numberOfVowels = +$( this ).data( 'value' ),
			vowelPositions = [];
		let i, letters, x;
		// Spread the vowels evenly among the consonants
		for ( i = 0; i < numberOfVowels; i++ ) {
			vowelPositions.push( Math.floor( ( 2 * i + 1 ) * MAX_LETTERS / ( 2 * numberOfVowels ) ) );
		}
		offeredLetters = [];
		for ( i = 0; i < MAX_LETTERS; i++ ) {
			letters = vowelPositions.includes( i ) ? vowelsCopy : consonantsCopy;
			x = Math.floor( Math.random() * letters.length );
			$( '.letter-' + i ).text( letters[ x ] );
			offeredLetters.push( letters[ x ] );
			letters.splice( x, 1 );
		}
		answerRow.reset();
		Countdan.clock.start( 1000 );
	}

	function showSolutions() {
		$( '.gamepage-solutions' ).empty();
		const solutions = solveLettersGame( offeredLetters.join( '' ) );
		if ( solutions.length === 0 ) {
			$( '.gamepage-solutions' ).append( $( '<p>' ).text( 'No solutions found' ) );
		} else {
			for ( let i = MAX_LETTERS; i >= MIN_LETTERS; i-- ) {
				if ( solutions[ i ] ) {
					const subSolutions = solutions[ i ];
					$( '.gamepage-solutions' ).append( $( '<h2>' ).text( i + ' letters' ) );
					for ( let j = 0; j < subSolutions.length; j++ ) {
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
