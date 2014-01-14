// gets the beginning value, and goes from there
function SharedObject(endpoint) {

    // Object.create it, so that it is on the prototype and doesn't get called

    // you can't name any properties these things :)
    var prototype = {
        onUpdate: onUpdate,
        commit: commit,
        endpoint: endpoint,
        load: load,
        startPoll: startPoll,
        stopPoll: stopPoll,
        _updateHandler: null,
        _poll: null,
    }

    // you can set properties driectly on this object
    var sharedObject = Object.create(prototype)

    load()

    function onUpdate(f) {
        prototype._updateHandler = f
    }

    function commit() {
        // clone strips off the prototyp methods and stuff so it's just the data
        var clone = _.clone(sharedObject)
        $.ajax({
            url: endpoint,
            type: "PUT",
            data: JSON.stringify(clone),
            contentType: "application/json",
            success: function(data) {
                sharedObjectDidUpdate(sharedObject, data)
            },
        })
    }

    function load() {
        sharedObjectLoad(sharedObject)
    }

    function startPoll() {
        prototype._poll = setInterval(function() {
            load()
        }, 1000)
    }

    function stopPoll() {
        clearInterval(prototype._poll)
        prototype._poll = null
    }

    // get the initial value, the fire the update
    return sharedObject
}

function sharedObjectLoad(object) {
    $.get(object.endpoint, function(data) {
        sharedObjectDidUpdate(object, data)
    })
}

function sharedObjectDidUpdate(object, data) {
    _.extend(object, data)
    if (object._updateHandler)
        object._updateHandler(object)
}

/*
DATA MODEL
game:
    pieces: {
        head:  Piece,
        torso: Piece,
        hips: Piece,
        rightArm: Piece,
        leftArm: Piece,
        leftLeg: Piece,
        rightLeg: Piece,
        leftFoot: Piece,
        rightFoot: Piece,
    }

Piece = {
    name: string;
    started: Date;
    posts: [Post]
    data: ....:
    orientation: vertical|horizontal
}

Post = {
    connectionId: number: 1,2,3,4
    x: 0-1 
    y: 0-1
}

function isComplete(game)

var game = SharedObject("asdf", {})

game.on("update", function(game) {
    // re-render everything 
})

*/