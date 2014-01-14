console.log("APP LOADED", $)

// goal: demonstrate simple data sharing

var game = init()

function init() {
    console.log("-init2", game)
    // connect to shared object at url
    var game = SharedObject("/game/test")
    game.startPoll()
    game.onUpdate(function(value) {
        renderDebugGame(value) // value should work too
    })
    return game
}


function testClick() {
    game.value.asdf = Math.random()
    game.commit()
}


function renderDebugGame(game) {
    $("#test").text(JSON.stringify(game))
}


