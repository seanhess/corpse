console.log("APP LOADED", $)

// goal: demonstrate simple data sharing

var game = null
var svg = null
var currentCard = null

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

function drawCard() {
    currentCard = findEmptyCard(game)
    currentCard.started = new Date()
    console.log("CARD", currentCard)
    game.commit()
}

function findEmptyCard(game) {
    for (var bodyPartName in game.corpse) {
        if (game.corpse[bodyPartName].started == null)
            return game.corpse[bodyPartName]
    }
    return null
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
