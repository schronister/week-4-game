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

//was exploring another way to create the panels
/*var jarjarpanel = $("<div><p>"+ jarjar.name +"</p><img src="+jarjar.image+">");
jarjarpanel.addClass("character");*/

var jarjarpanel = $("<div>", {"class":"character"});
jarjarpanel.append("<p>"+ jarjar.name +"</p>")
jarjarpanel.append("<img src="+jarjar.image+">");
var quigonpanel = $("<div>", {"class":"character"});
quigonpanel.append("<img src="+quigon.image+">");
var darthpanel = $("<div>", {"class":"character"});
darthpanel.append("<img src="+darth.image+">");
var bobapanel = $("<div>", {"class":"character"})
bobapanel.append("<img src="+boba.image+">");

$(document).ready(function(){
	$(".pickCharacter").append(jarjarpanel);
	$(".pickCharacter").append(quigonpanel);
	$(".pickCharacter").append(darthpanel);
	$(".pickCharacter").append(bobapanel);




	});