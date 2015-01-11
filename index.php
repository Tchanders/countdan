<?php

if ( isset( $_SERVER['REDIRECT_URL'] ) ) {
	$url = $_SERVER['REDIRECT_URL'];
} else {
	$url = '/';
}

switch ( true ) {
	case preg_match( '`/numbers$`', $url ):
		$game = 'numbersgame';
		$scripts = array(
			'js/clock.js',
			'js/numbersgame.js',
			'js/numbersgamesetup.js'
		);
		include 'header.php';
		include 'gamepage.php';
		include 'footer.php';
		break;
	case preg_match( '`/$`', $url ):
		$game = 'lettersgame';
		$scripts = array(
			'js/clock.js',
			'js/letters.js',
			'js/lettersgame.js',
			'js/lettersgamesetup.js'
		);
		include 'header.php';
		include 'gamepage.php';
		include 'footer.php';
		break;
	case preg_match( '`/conundrum$`', $url ):
		include 'header.php';
		include 'conundrum.php';
		include 'footer.php';
		break;
	case preg_match( '`/timestables$`', $url ):
		include 'header.php';
		include 'timestables.php';
		include 'footer.php';
		break;
}