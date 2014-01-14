var express = require('express')
var app = express()
var _ = require("lodash")

app.use(express.static('public'))
app.use(express.bodyParser())


var games = {}

// returns a "shared object" for the game
app.get("/game/:id", function(req, res) {
    var id = req.params.id
    if (!games[id])
        games[id] = newGame()
    res.send(games[id])
})

app.put("/game/:id", function(req, res) {
    // does it just copy it in?
    var game = games[req.params.id]
    if (!game) game = newGame()
    _.merge(game, req.body)
    res.send(game)
})

function SharedObject() {
    var value = {}
    return value
}

function newGame() {
    var game = {created: new Date()}
    return game
}

var PORT = process.env.PORT || 3004
app.listen(PORT)
console.log("Started Server on " + 3004)