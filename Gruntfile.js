/*!
 * Grunt file
 */

module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-eslint' );

	grunt.initConfig( {
		eslint: {
			dev: [
				'js/*.js',
				'!js/letters.js'
			]
		}
	} );


	grunt.registerTask( 'lint', [ 'eslint' ] );

	grunt.registerTask( 'default', 'lint' );
};
