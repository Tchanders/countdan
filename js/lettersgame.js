// eslint-disable-next-line no-unused-vars
function solveLettersGame( text ) {
	/* global wordlist */
	function uniq( a ) {
		return a.reduce( function ( p, c ) {
			if ( p.indexOf( c ) < 0 ) {
				p.push( c );
			}
			return p;
		}, [] );
	}

	function solve() {
		var results = [];

		findAnagram( text.toLowerCase().split( '' ).sort().join( '' ) );

		function findAnagram( key ) {
			var l = key.length;
			if ( wordlist[ key ] ) {
				results[ l ] = ( results[ l ] || [] ).concat( wordlist[ key ] );
			}
			if ( l > 5 ) {
				for ( var j = 0; j < l; j++ ) {
					var letters = key.split( '' );
					letters.splice( j, 1 );
					findAnagram( letters.join( '' ) );
				}
			}
		}

		for ( var i = 0; i < results.length; i++ ) {
			if ( results[ i ] ) {
				results[ i ] = uniq( results[ i ] ).sort();
			}
		}

		return results;
	}

	return solve();
}
