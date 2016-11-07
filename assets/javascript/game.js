var jarjar = {
	name:"Jar-Jar Binks",
	image: "assets/images/jar-jar.jpg",
	hp: 150,
	ap: 10,
	cap: 20
}
var quigon = {
	name:"Qui-gon Jinn",
	image: "assets/images/qui-gon.jpeg",
	hp: 200,
	ap: 15,
	cap: 10
}
var darth = {
	name:"Darth Vader",
	image: "assets/images/darth-vader.jpeg",
	hp: 180,
	ap: 10,
	cap: 25
}
var boba = {
	name:"Boba Fett",
	image: "assets/images/boba-fett.jpeg",
	hp: 120,
	ap: 15,
	cap: 22
}

var charArray = ["jarjar", "quigon", "darth", "boba"];

//was exploring another way to create the panels
/*var jarjarpanel = $("<div><p>"+ jarjar.name +"</p><img src="+jarjar.image+">");
jarjarpanel.addClass("character");*/
/*
var jarjarpanel = $("<div>", {"class":"character jarjar"});
jarjarpanel.append("<p>"+ jarjar.name +"</p>")
jarjarpanel.append("<img src="+jarjar.image+">");
var quigonpanel = $("<div>", {"class":"character quigon"});
quigonpanel.append("<img src="+quigon.image+">");
var darthpanel = $("<div>", {"class":"character"});
darthpanel.append("<img src="+darth.image+">");
var bobapanel = $("<div>", {"class":"character"})
bobapanel.append("<img src="+boba.image+">");*/

var playerChar;

$(document).ready(function(){
	//select player character
	$("div.character").on("click",function(){
		//save player's choice
		playerChar = $(this).attr("id");
		//hide all other portraits at the top
		$("div.pickCharacter > .character").addClass("hide");
		//move player character to the your character area
		$("div.yourCharacter > #" +playerChar).removeClass("hide");
		//show enemies
		for (var i = 0; i < charArray.length; i++){
			if (playerChar != charArray[i]){
				$("div.enemies > #" +charArray[i]).removeClass("hide");
			}
		}
	});




	});