<?php

if ( isset( $_SERVER['REDIRECT_URL'] ) ) {
	$url = $_SERVER['REDIRECT_URL'];
} else {
	$url = '/';
}

switch ( true ) {
	case preg_match( '`/numbers$`', $url ):
		$game = 'numbersgame';
		include 'header.php';
		include 'gamepage.php';
		include 'footer.php';
		break;
	case preg_match( '`/$`', $url ):
		$game = 'lettersgame';
		include 'header.php';
		include 'gamepage.php';
		include 'footer.php';
		break;
	case preg_match( '`/conundrum$`', $url ):
		include 'header.php';
		include 'conundrum.php';
		include 'footer.php';
		break;
	default:
		header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
		echo 'Page not found';
		break;
}