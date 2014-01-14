

// function generateCard(x, y) {

// }

function generateConnectingPoints(edgeLength, numPoints){
	var points = [];
	for (var i = 0; i < numPoints; i++){
		points.push(Math.random()*edgeLength)
	}
	return points.sort()
}