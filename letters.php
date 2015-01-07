<?php

$file = fopen( 'brit-a-z.txt', 'r' );

$wordlist = array();

while( $line = fgets( $file ) ) {
	if( preg_match( '/^([a-z]{4,9})\n?\r?$/', $line, $matches ) ) {
		$word = $matches[1];
		$letters = str_split( $word );
		sort( $letters );
		$sortedletters = implode( '', $letters );
		if( !isset( $wordlist[$sortedletters] ) ) {
			$wordlist[$sortedletters] = array();
		}
		array_push( $wordlist[$sortedletters], $word );
	}
}

fclose( $file );

echo 'var wordlist = ' . json_encode( $wordlist, JSON_PRETTY_PRINT ) . ';';