var HARMONS = HARMONS || {};

HARMONS.corpse = HARMONS.corpse || (function () {

  function drawer($canvas, scaleFactor, drawDisabled) {
    var $document = $(document)
    var paths = [],
        paper = Snap($canvas.get(0)),
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
          paths.push(line.attr('d'))
          $canvas.trigger('paths', [paths])
          line = null
        },
        enableEvents = function () {
          $canvas.bind('mousemove.mmu', mousemoveHandler);
          $document.one('mouseup.mmu', mouseupHandler);
          $canvas.bind('touchmove.mmu', mousemoveHandler);
          $document.one('touchend.mmu', mouseupHandler);
        },
        drawFreeLineBegin = function (e) {
          clicking = true;
          var offset = $canvas.offset()
          line = newPath('M' + (e.pageX-offset.left) + ',' + (e.pageY-offset.top) )
          enableEvents();
        },
        drawFreeLineMove = function (e) {
          if ( !clicking ) return;
          var offset = $canvas.offset()
          line.attr( 'path', line.attr('path') + 'L' + (e.pageX-offset.left) + ',' + (e.pageY-offset.top) );
        },
        setPaths = function(newPaths) {
          paths = newPaths || []
          renderPaths(paths)
        },
        renderPaths = function(paths) {
          paper.selectAll("path").forEach(function(path) {
            if (path != line)
              path.remove()
          })
          var newPaths = paths.map(function(pathData) {
            return newPath(pathData)
          })
        },
        newPath = function(data) {
          return paper
            .path(data)
            .attr( { 'stroke': '#808080', 'stroke-width': 3, 'fill': 'none' } )
            .attr( 'transform', 'scale('+scaleFactor+', '+scaleFactor+')')
        };

    if (!drawDisabled) {
      $canvas.on( 'mousedown', mousedownHandler );
      $('.modal-body').on( 'touchstart', mousedownHandler );
    }

    return {
      'setPaths': setPaths
    };
  }

  return { drawer:drawer }
}());

