// $(".corpse-part").each( function(){ 
// 	if corpse.started == null (
// 		$(this).addClass("highlighted")
// 	)
	
// });
function chicken(corpse) {
	for (var bodyPart in corpse){
		var started = !!corpse[bodyPart].started
		var completed = corpse[bodyPart].complete
		console.log("CHECK", corpse[bodyPart])
		$("#" + bodyPart).toggleClass("completed", completed)
		$("#" + bodyPart).toggleClass("started", started)
		// else $("." + bodyPart).addClass("not")
	}
}
