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
		$game = 'conundrum';
		$scripts = array(
			'js/clock.js',
			'js/letters.js',
			'js/conundrumsetup.js',
		);
		include 'header.php';
		include 'gamepage.php';
		include 'footer.php';
		break;
	default:
		header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
		echo 'Page not found';
		break;
}