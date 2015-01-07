/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          //'minFontSize' : Number.NEGATIVE_INFINITY,
          'minFontSize' : 24,
          'maxFontSize' : 458
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this),
        numChars = $this.text().length;

      // Resizer() resizes items based on the object width divided by the compressor * the number of characters
      var resizer = function () {
        var fontSize = Math.max(Math.min($this.width() / (compressor*numChars), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize));
        $this.css('font-size', fontSize+'px');
        fontSize += 5;
        $this.css('line-height', fontSize+'px');
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
