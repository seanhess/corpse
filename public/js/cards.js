

// function generateCard(x, y) {

// }

function newBody(){
	//generate
	var edges = {
		neck : newEdgeConnectors(1, 2),
		leftShoulder : newEdgeConnectors(1, 2),
		rightShoulder : newEdgeConnectors(1, 2),
		waist : newEdgeConnectors(1, 2),
		leftThigh : newEdgeConnectors(1, 2),
		rightThigh : newEdgeConnectors(1, 2),
		leftAnkle : newEdgeConnectors(1, 2),
		rightAnkle: newEdgeConnectors(1, 2)
	}
	console.log("edges", edges)


	//newHead
	//newTorso
	//newHips



}

function newEdgeConnectors(edgeLength, numPoints){
	var points = [];
	for (var i = 0; i < numPoints; i++){
		points.push(Math.random()*edgeLength)
	}
	return points.sort()
}

function placeConnectors(side, connectorsArray){


}