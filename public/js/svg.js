var HARMONS = HARMONS || {};

HARMONS.corpse = HARMONS.corpse || ( function () {
  var $canvas = $("#svg"),
      paper = Snap("#svg"),
      clicking = false,
      line,
      mousedownHandler = function (e) {
        clicking = true;
        if ( e.type === 'touchstart' ) {
          e.preventDefault();
          e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        }
        drawFreeLineBegin(e);
      },
      mousemoveHandler = function (e) {
        if ( e.type === 'touchmove' ) {
          e.preventDefault();
          e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        }
        drawFreeLineMove(e);
      },
      mouseupHandler = function () {
        clicking = false;
      },
      enableEvents = function () {
        $canvas.bind('mousemove.mmu', mousemoveHandler);
        $canvas.one('mouseup.mmu', mouseupHandler);
        $canvas.bind('touchmove.mmu', mousemoveHandler);
        $canvas.one('touchend.mmu', mouseupHandler);
      },
      drawFreeLineBegin = function (e) {
        clicking = true;
        line = paper.path( 'M' + (e.pageX) + ',' + (e.pageY) ).attr( { 'stroke': '#808080', 'stroke-width': 3, 'fill': 'none' } );
        enableEvents();
      },
      drawFreeLineMove = function (e) {
        if ( !clicking ) return;

        line.attr( 'path', line.attr('path') + 'L' + (e.pageX) + ',' + (event.pageY) );
      }

  return {
    '$canvas': $canvas,
    'mousedownHandler': mousedownHandler,
    'mousedownHandler': mousedownHandler
  };
}());

HARMONS.corpse.$canvas.on( 'mousedown', HARMONS.corpse.mousedownHandler );
HARMONS.corpse.$canvas.on( 'touchstart', HARMONS.corpse.mousedownHandler );
