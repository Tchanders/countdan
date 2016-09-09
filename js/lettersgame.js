function solveLettersGame( text ) {
	/* global wordlist */
	function uniq( a ) {
		return a.reduce( function( p, c ) {
			if ( p.indexOf( c ) < 0 ) {
				p.push( c );
			}
			return p;
		}, [] );
	}

	function solve() {
		var i, results = [];

		findAnagram( text.toLowerCase().split( '' ).sort().join( '' ) );

		function findAnagram( key ) {
			var i, letters,
				l = key.length;
			if ( wordlist[ key ] ) {
				results[l] = ( results[l] || [] ).concat( wordlist[ key ] );
			}
			if ( l > 5 ) {
				for ( i = 0; i < l; i++ ) {
					letters = key.split( '' );
					letters.splice( i, 1 );
					findAnagram( letters.join( '' ) );
				}
			}
		}

		for ( i = 0; i < results.length; i++ ) {
			if ( results[i] ) {
				results[i] = uniq( results[i] ).sort();
			}
		}

		return results;
	}

	return solve();
}
