// eslint-disable-next-line no-unused-vars
function solveLettersGame( text ) {
	/* global wordlist */
	function uniq( a ) {
		return a.reduce( ( p, c ) => {
			if ( !p.includes( c ) ) {
				p.push( c );
			}
			return p;
		}, [] );
	}

	function solve() {
		const results = [];

		findAnagram( text.toLowerCase().split( '' ).sort().join( '' ) );

		function findAnagram( key ) {
			const l = key.length;
			if ( wordlist[ key ] ) {
				results[ l ] = ( results[ l ] || [] ).concat( wordlist[ key ] );
			}
			if ( l > 5 ) {
				for ( let j = 0; j < l; j++ ) {
					const letters = key.split( '' );
					letters.splice( j, 1 );
					findAnagram( letters.join( '' ) );
				}
			}
		}

		for ( let i = 0; i < results.length; i++ ) {
			if ( results[ i ] ) {
				results[ i ] = uniq( results[ i ] ).sort();
			}
		}

		return results;
	}

	return solve();
}
