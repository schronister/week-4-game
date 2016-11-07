var jarjar = {
	id: "jarjar",
	name:"Jar-Jar Binks",
	image: "assets/images/jar-jar.jpg",
	basehp: 150,
	hp: 150,
	ap: 10,
	baseap:10,
	cap: 20
}
var quigon = {
	id: "quigon",
	name:"Qui-gon Jinn",
	image: "assets/images/qui-gon.jpeg",
	basehp: 200,
	hp: 200,
	ap: 15,
	baseap:15,
	cap: 10
}
var darth = {
	id: "darth",
	name:"Darth Vader",
	image: "assets/images/darth-vader.jpeg",
	basehp: 180,
	hp: 180,
	ap: 10,
	baseap:10,
	cap: 25
}
var boba = {
	id:"boba",
	name:"Boba Fett",
	image: "assets/images/boba-fett.jpeg",
	basehp: 120,
	hp: 120,
	ap: 15,
	baseap:15,
	cap: 22
}

var charArray = [jarjar, quigon, darth, boba];
var enemyArray = [jarjar, quigon, darth, boba];

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
var battleStart = false;
var gameOver = false;
var enemyChar;

//function for updating the HP of each character on the screen
function updateHP(){
	for (var i = 0; i < charArray.length; i++){
		$("."+charArray[i].id+ " > .HP").html(charArray[i].hp);
	}
}

$(document).ready(function(){
	updateHP();
	//select player character
	$("div.pickCharacter > .character").on("click",function(){
		//save player's choice as an object
		for (var i = 0; i < charArray.length; i++){
			if ( $(this).attr("class").includes(charArray[i].id)){
				playerChar = charArray[i];
			}
		}
/*		playerChar = $(this).attr("id");*/
		enemyArray.splice(enemyArray.indexOf(playerChar),1);
		//hide all other portraits at the top
		$("div.pickCharacter > .character").addClass("hide");
		//move player character to the your character area
		$("div.yourCharacter > ." +playerChar.id).removeClass("hide");
		//show enemies
		for (var i = 0; i < charArray.length; i++){
			if (playerChar != charArray[i]){
				$("div.enemies > ." +charArray[i].id).removeClass("hide");
			}
		}
	});
	//picking an enemy
	$("div.enemies > .character").on("click",function(){
		if (battleStart===false){
			//set enemyChar = object from chararray
			for (var i = 0; i < charArray.length; i++){
				if ($(this).attr("class").includes(charArray[i].id)){
				enemyChar = charArray[i];
				}
			}
			//remove selected enemy from enemy array
			enemyArray.splice(enemyArray.indexOf(enemyChar),1);
			$("div.enemies > ." + enemyChar.id).addClass("hide");
			//show enemy in the defender section
			$("div.defender > ." + enemyChar.id).removeClass("hide");
			//start battle so that enemies can't be selected
			battleStart = true;
			//clear the win/loss message in between enemies.
			$(".winLoseMessage").empty();
		}
	});

	$("#attack").on("click",function(){
		if (gameOver === false && battleStart === true){
			//remove hp on both sides
			enemyChar.hp -= playerChar.ap;
			playerChar.hp -= enemyChar.cap;
			//adjust player ap - add ap.
			playerChar.ap += playerChar.baseap;


			//update the HP for each character
			updateHP();
			$(".attackMessage").html("You attacked "+ enemyChar.name + " for "+playerChar.ap+" damage.")
			$(".defendMessage").html(enemyChar.name + " attacked you back for " + enemyChar.cap + " damage.")
			//if enemy hp is at 0 or under, end battle and prepare to select a new character
			if(enemyChar.hp <= 0){
				//if there are no enemies left to fight, game over - player wins
				if (enemyArray.length === 0){
					battleStart = false;
					$(".attackMessage").empty();
					$(".defendMessage").empty();
					$(".winLoseMessage").html("You Win! The Force is strong with you.")
					$("#restart").removeClass("hide");
				} else{
				battleStart=false;
				$("div.defender > ." + enemyChar.id).addClass("hide");
				$(".attackMessage").empty();
				$(".defendMessage").empty();
				$(".winLoseMessage").html("You have defeated "+ enemyChar.name + ". You can choose to fight another enemy");
				}
			} 
			//if player char hp is at or under 0, game over and display the message and restart button
			if (playerChar.hp <= 0){
				battleStart=false;
				gameOver=true;
				$(".attackMessage").empty();
				$(".defendMessage").empty();
				$(".winLoseMessage").html("You have been defeated! Game over.")
				$("#restart").removeClass("hide");
			}
		}



	})

	//restarting the game
	$("#restart").on("click", function(){
		gameOver = false;
		//reset the enemy array 
		enemyArray = [jarjar, quigon, darth, boba];
		//reset the hp and ap for each character
		for (var i = 0; i < charArray.length; i++){
			charArray[i].hp = charArray[i].basehp;
			charArray[i].ap = charArray[i].baseap;
		}
		//remove char selections
		playerChar = "";
		enemyChar = "";
		//update hp display
		updateHP();
		//hide all the characters in use, display the ones at the top under pick char.
		$("div.pickCharacter > .character").removeClass("hide");
		$("div.yourCharacter > .character").addClass("hide");
		$("div.enemies > .character").addClass("hide");
		$("div.defender > .character").addClass("hide");
		$(".winLoseMessage").empty();
		$("#restart").addClass("hide");


	})






});