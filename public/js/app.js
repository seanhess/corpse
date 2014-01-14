console.log("APP LOADED", $)

var DRAWING_SCALE_FACTOR = 2
var PIXELS_PER_UNIT = 100

// goal: demonstrate simple data sharing

var game = null
var svg = null
var currentCard = null
var $svg = null
var $modal = null
var $partName = null


$(function() {
    init()
})

function init() {
    // connect to shared object at url
    game = SharedObject("/game/test4")
    // game.startPoll()
    game.onUpdate(function(value) {
    	chicken()
        renderBodyParts(value)
    })

    // There is only one drawing layer in the game
    $modal = $("#modal-drawing")
    $svg = $modal.find("svg")
    $partName = $modal.find(".partName")
    svg = HARMONS.corpse.drawer($svg, 1)
    $svg.on("paths", function(e, paths) {
        if (currentCard) {
            currentCard.paths = paths
            game.corpse[currentCard.name] = currentCard
        }
        // wait for button
    })

    return game
}

function drawCard() {
    // set current card
    currentCard = findEmptyCard(game)
    currentCard.started = new Date()
    svg.setPaths(currentCard.paths)
    game.commit()
    renderCurrentCardModal(currentCard)
}

function saveCurrentCard() {
    currentCard.complete = true
    game.corpse[currentCard.name] = currentCard
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


function renderCurrentCardModal(card) {
    $svg.width(card.dimensions.x * PIXELS_PER_UNIT * DRAWING_SCALE_FACTOR)
    $svg.height(card.dimensions.y * PIXELS_PER_UNIT * DRAWING_SCALE_FACTOR)
    $partName.text(card.name)
}

function renderBodyParts(game) {
    for (var bodyPartName in game.corpse) {
        renderBodyPart(game.corpse[bodyPartName])
    }
}

function renderBodyPart(bodyPart) {
    var $svg = $("#"+bodyPart.name).find('svg')
    var svg = HARMONS.corpse.drawer($svg, 1/DRAWING_SCALE_FACTOR)
    if (bodyPart.complete) {
        // show it
        svg.setPaths(bodyPart.paths)
    }

    else {
        svg.setPaths([])
    }
}
