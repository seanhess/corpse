
// just an object
function SharedObject() {

}

function SharedCollection() {

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