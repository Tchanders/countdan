window.Countdan = {};

$( () => {
	const games = {
			'': { title: 'Letters game', rules: 'lettersgamerules.html', init: 'lettersGame' },
			numbers: { title: 'Numbers game', rules: 'numbersgamerules.html', init: 'numbersGame' },
			conundrum: { title: 'Conundrum', rules: 'conundrumrules.html', init: 'conundrum' }
		},
		// The game is chosen by the last path segment, e.g. /numbers
		game = games[ location.pathname.split( '/' ).pop() ];

	if ( !game ) {
		$( '.game-title' ).text( 'Page not found' );
		return;
	}

	Countdan.clock = new Countdan.Clock();
	$( '.clock-panel' ).append( Countdan.clock.$element );

	document.title = game.title + ' - Countdan';
	$( '.game-title' ).text( game.title );
	$( '.rules-list' ).load( game.rules );

	Countdan[ game.init ]();
} );
