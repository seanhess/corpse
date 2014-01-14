// gets the beginning value, and goes from there
function SharedObject(endpoint) {

    // you can't name any properties these things :)
    var sharedObject = {
        onUpdate: onUpdate,
        commit: commit,
        endpoint: endpoint,
        load: load,
        startPoll: startPoll,
        stopPoll: stopPoll,
        _updateHandler: null,
        _poll: null,
        value: {},
    }

    load()

    function onUpdate(f) {
        sharedObject._updateHandler = f
    }

    function commit() {
        // need to take off our custom methods
        $.ajax({
            url: endpoint,
            type: "PUT",
            data: sharedObject.value,
            success: function(data) {
                sharedObjectDidUpdate(sharedObject, data)
            },
        })
    }

    function load() {
        sharedObjectLoad(sharedObject)
    }

    function startPoll() {
        sharedObject._poll = setInterval(function() {
            load()
        }, 1000)
    }

    function stopPoll() {
        clearInterval(sharedObject._poll)
        sharedObject._poll = null
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
    _.merge(object.value, data)
    if (object._updateHandler)
        object._updateHandler(object.value)
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