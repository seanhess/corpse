console.log("APP LOADED", $)

// goal: demonstrate simple data sharing

var game = null
var svg = null

$(function() {
    init()
})

function init() {
    // connect to shared object at url
    game = SharedObject("/game/test")
    game.startPoll()
    game.onUpdate(function(value) {
        svg.setPaths(value.paths)
        renderDebugGame(value) // value should work too
	chicken()
    })

    var $canvas = $("#svg")
    svg = HARMONS.corpse.drawer($canvas)

    $canvas.on("paths", function(e, paths) {
        game.paths = paths
        game.commit()
    })

    return game
}


function clearPaths() {
    game.paths = []
    svg.setPaths(game.paths)
    game.commit()
}

function testClick() {
    game.asdf = Math.random()
    game.commit()
}


function renderDebugGame(game) {
    // $("#test").text(JSON.stringify(game))
}
