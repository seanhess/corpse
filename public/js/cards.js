//call newCorpse() to get back blank pieces for the game
console.log(newCorpse())

function newCorpse(){
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
	
	return {
		head: newHead(200, 100, edges.neck),
		torso: newTorso(200, 100, edges.leftShoulder, edges.rightShoulder, edges.neck, edges.waist),
		rightArm: newRightArm(200, 100, edges.rightShoulder),
		leftArm: newLeftArm(200, 100, edges.leftShoulder),
		hips: newHips(200, 100, edges.leftThigh, edges.rightThigh, edges.waist),
		leftLeg: newLeftLeg(100, 200, edges.leftThigh, edges.leftAnkle),
		rightLeg: newRightLeg(100, 200, edges.rightThigh, edges.rightAnkle),
		leftFoot: newLeftFoot(200, 100, edges.leftAnkle),
		rightFoot: newRightFoot(200, 100, edges.rightAnkle)

	}
}


function newHead (width, height, neckConnectorsArray) {
	var posts = [
		generatePost(neckConnectorsArray[0], 0, "bottom", width, height),
		generatePost(neckConnectorsArray[1], 1, "bottom", width, height)
	]
	return {
		name: "head",
		started: new Date(),
		posts: posts
	} 
}

function newTorso (width, height, leftShoulderArray, rightShoulderArray, neckArray, waistArray) {
	var posts = [
		generatePost(neckArray[0], 0, "top", width, height),
		generatePost(neckArray[1], 1, "top", width, height),
		generatePost(leftShoulderArray[0], 0, "left", width, height),
		generatePost(leftShoulderArray[1], 2, "left", width, height),
		generatePost(rightShoulderArray[0], 1, "right", width, height),
		generatePost(rightShoulderArray[1], 3, "right", width, height),
		generatePost(waistArray[0], 1, "bottom", width, height),
		generatePost(waistArray[1], 1, "bottom", width, height),
	]
	return {
		name: "torso",
		started: new Date(),
		posts: posts
	} 
}
function newLeftArm (width, height, leftShoulderArray){
	var posts = [
		generatePost(leftShoulderArray[0], 0, "right", width, height),
		generatePost(leftShoulderArray[1], 1, "right", width, height),
	]
	return {
		name: "leftArm",
		started: new Date(),
		posts: posts
	} 
}
function newRightArm (width, height, rightShoulderArray) {
	var posts = [
		generatePost(rightShoulderArray[0], 0, "left", width, height),
		generatePost(rightShoulderArray[1], 1, "left", width, height),
	]
	return {
		name: "rightArm",
		started: new Date(),
		posts: posts
	} 
}
function newHips (width, height, leftThighArray, rightThighArray, waistArray) {
	var posts = [
		generatePost(waistArray[0], 1, "top", width, height),
		generatePost(waistArray[1], 1, "top", width, height),
		generatePost(leftThighArray[0], 1, "bottom", width, height, 0, width/2),
		generatePost(leftThighArray[1], 1, "bottom", width, height, 0, width/2),
		generatePost(rightThighArray[0], 1, "bottom", width, height, width/2, width),
		generatePost(rightThighArray[1], 1, "bottom", width, height, width/2, width)

	]
	return {
		name: "waist",
		started: new Date(),
		posts: posts
	} 
}
function newLeftLeg (width, height, leftThighArray, leftAnkleArray){
	var posts = [
		generatePost(leftThighArray[0], 0, "top", width, height),
		generatePost(leftThighArray[1], 1, "top", width, height),
		generatePost(leftAnkleArray[0], 0, "bottom", width, height),
		generatePost(leftAnkleArray[1], 1, "bottom", width, height)
	]
	return {
		name: "leftLeg",
		started: new Date(),
		posts: posts
	} 
}
function newRightLeg (width, height, rightThighArray, rightAnkleArray){
	var posts = [
		generatePost(rightThighArray[0], 0, "top", width, height),
		generatePost(rightThighArray[1], 1, "top", width, height),
		generatePost(rightAnkleArray[0], 0, "bottom", width, height),
		generatePost(rightAnkleArray[1], 1, "bottom", width, height)
	]
	return {
		name: "rightLeg",
		started: new Date(),
		posts: posts
	} 
}
function newLeftFoot (width, height, leftAnkleArray){
	var posts = [
		generatePost(leftAnkleArray[0], 0, "top", width, height),
		generatePost(leftAnkleArray[1], 1, "top", width, height)
	]
	return {
		name: "leftFoot",
		started: new Date(),
		posts: posts
	} 
}
function newRightFoot (width, height, rightAnkleArray){
	var posts = [
		generatePost(rightAnkleArray[0], 0, "top", width, height),
		generatePost(rightAnkleArray[1], 1, "top", width, height)
	]
	return {
		name: "rightFoot",
		started: new Date(),
		posts: posts
	} 
}





function generatePost(percent, connectionId, edge, pieceXLength, pieceYLength, restrictionStart, restrictionEnd){

	function getX(){
		if (edge == "left") return 0
		else if (edge == "right") return pieceXLength
		else if (edge == "top" || edge == "bottom"){
			if (!restrictionStart || !restrictionEnd) {
				return percent * pieceXLength
			} else return (restrictionStart + (restrictionEnd-restrictionStart) * percent)
		}  
	}
	function getY(){
		if (edge == "top") return 0
		else if (edge == "bottom") return pieceYLength
		else if (edge == "right" || edge == "left"){
			if (!restrictionStart || !restrictionEnd) {
				return percent * pieceYLength
			} else return (restrictionStart + (restrictionEnd-restrictionStart) * percent)
		}  
	}
	return {
		connectionId:connectionId,
		x: getX(),
		y: getY()
	}
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