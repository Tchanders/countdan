window.Countdan = {};

$( () => {
	const games = {
		'': { title: 'Letters game', rules: 'lettersgamerules.html', init: 'lettersGame' },
		numbers: { title: 'Numbers game', rules: 'numbersgamerules.html', init: 'numbersGame' },
		conundrum: { title: 'Conundrum', rules: 'conundrumrules.html', init: 'conundrum' }
	};

	Countdan.clock = new Countdan.Clock();
	$( '.clock-panel' ).append( Countdan.clock.$element );

	function loadGame() {
		// The game is chosen by the hash fragment, e.g. #numbers
		const game = games[ location.hash.slice( 1 ) ];

		// Tear down the previous game
		Countdan.clock.reset();
		$( '.game-content, .gamepage-solutions, .rules-list' ).empty();
		$( '.gamepage-showsolutions' ).off( 'click' ).addClass( 'button-disabled' );

		if ( !game ) {
			document.title = 'Countdan';
			$( '.game-title' ).text( 'Page not found' );
			return;
		}

		document.title = game.title + ' - Countdan';
		$( '.game-title' ).text( game.title );
		$( '.rules-list' ).load( game.rules );

		Countdan[ game.init ]();
	}

	$( window ).on( 'hashchange', loadGame );
	loadGame();
} );
