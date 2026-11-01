( function () {

	/**
	 * Row of tiles for building an answer from a selection of letter tiles
	 *
	 * Tapping a tile in the selection row adds it to the end of the answer.
	 * Tapping it again, in either row, removes it.
	 *
	 * @param {jQuery} $selectionTiles Tiles to pick letters from
	 */
	const AnswerRow = function ( $selectionTiles ) {
		this.$selectionTiles = $selectionTiles;
		// Indexes into $selectionTiles, in answer order
		this.selection = [];

		this.$answerTiles = $( [] );
		for ( let i = 0; i < $selectionTiles.length; i++ ) {
			this.$answerTiles = this.$answerTiles.add(
				$( '<div>' ).addClass( 'gamepage-tile answer-tile' )
			);
		}
		this.$clear = $( '<div>' )
			.addClass( 'ingame-button gamepage-button answer-clear' )
			.text( 'Clear' );
		this.$element = $( '<div>' ).append(
			$( '<div>' ).addClass( 'tile-panel tile-panel-letters answer-panel' ).append( this.$answerTiles ),
			this.$clear
		);

		this.$selectionTiles.on( 'click', ( e ) => {
			this.toggle( this.$selectionTiles.index( e.currentTarget ) );
		} );
		this.$answerTiles.on( 'click', ( e ) => {
			const index = this.selection[ this.$answerTiles.index( e.currentTarget ) ];
			if ( index !== undefined ) {
				this.toggle( index );
			}
		} );
		this.$clear.on( 'click', () => this.reset() );

		this.render();
	};

	/**
	 * Add or remove a selection tile from the answer
	 *
	 * @param {number} index Index of the selection tile
	 */
	AnswerRow.prototype.toggle = function ( index ) {
		const position = this.selection.indexOf( index );
		if ( position !== -1 ) {
			this.selection.splice( position, 1 );
		} else if ( this.$selectionTiles.eq( index ).text().trim() ) {
			// Ignore blank tiles, e.g. before letters are chosen
			this.selection.push( index );
		}
		this.render();
	};

	/**
	 * Remove all tiles from the answer
	 */
	AnswerRow.prototype.reset = function () {
		this.selection = [];
		this.render();
	};

	AnswerRow.prototype.render = function () {
		this.$selectionTiles.each( ( i, tile ) => {
			$( tile ).toggleClass( 'tile-used', this.selection.includes( i ) );
		} );
		this.$answerTiles.each( ( i, tile ) => {
			const index = this.selection[ i ];
			$( tile )
				.toggleClass( 'answer-tile-empty', index === undefined )
				.text( index === undefined ? ' ' : this.$selectionTiles.eq( index ).text() );
		} );
	};

	Countdan.AnswerRow = AnswerRow;

}() );
