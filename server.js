var express = require('express')
var app = express()
var _ = require("lodash")

app.use(express.static('public'))
app.use(express.bodyParser())


var games = {}

app.get("/test", function(req, res) {
    res.send("Hello World")
})

// returns a "shared object" for the game
app.get("/game/:id", function(req, res) {
    var game = getGame(req.params.id)
    res.send(game.value)
})

app.put("/game/:id", function(req, res) {
    var game = getGame(req.params.id)
    game.update(req.body)
    res.send(game.value)
})

function SharedObject() {

    var sharedObject = {
        value: {},
        update: function(data) {
            _.extend(sharedObject.value, data)
        }
    }

    return sharedObject
}

function getGame(id) {
    if (!games[id])
        games[id] = newGame(id)
    return games[id]
}

function newGame(id) {
    var game = SharedObject()
    game.value.id = id
    game.value.created = new Date()
    return game
}

var PORT = process.env.PORT || 3004
app.listen(PORT)
console.log("Started Server on " + 3004)