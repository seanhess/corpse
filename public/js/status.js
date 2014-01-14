// $(".corpse-part").each( function(){ 
// 	if corpse.started == null (
// 		$(this).addClass("highlighted")
// 	)
	
// });

	var corpse;
	
	$.get(
	"/game/test",
	function(data) {
		corpse = data.corpse;
		return data.corpse;
	}
	)

	function chicken(){
	for (var bodyPart in corpse){
		var started = corpse[bodyPart].started
		var completed = true
		if (completed) $("#" + bodyPart).addClass("completed")
		else if (started) $("#" + bodyPart).addClass("started")
		else $("." + bodyPart).addClass("not")
		}
	}