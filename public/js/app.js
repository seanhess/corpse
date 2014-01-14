console.log("APP LOADED", $)

// goal: demonstrate simple data sharing

var game = init()

function init() {
    console.log("-init", game)
    // connect to shared object at url
    var game = SharedObject("/game/test")
    game.startPoll()
    game.onUpdate(function(value) {
        console.log("UPDATED", value)
        renderDebugGame(game) // value should work too
    })
    return game
}


function test() {
    console.log("TEST")
    game.asdf = Math.random()
    game.commit()
}


function renderDebugGame(game) {
    console.log(game)
    $("#test").text(JSON.stringify(game))
}


