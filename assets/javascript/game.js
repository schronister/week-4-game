//objects to hold character properties
var jarjar = {
	id: "jarjar",
	name:"Jar-Jar Binks",
	image: "assets/images/jar-jar.jpg",
	basehp: 155,
	hp: 155,
	ap: 10,
	baseap:10,
	cap: 20
}
var quigon = {
	id: "quigon",
	name:"Qui-gon Jinn",
	image: "assets/images/Qui-Gon.jpeg",
	basehp: 200,
	hp: 200,
	ap: 15,
	baseap:15,
	cap: 10
}
var darth = {
	id: "darth",
	name:"Darth Vader",
	image: "assets/images/Darth-Vader.jpeg",
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
	basehp: 135,
	hp: 135,
	ap: 20,
	baseap:20,
	cap: 22
}

//initializing a few variables
var charArray = [jarjar, quigon, darth, boba];
var enemyArray = [jarjar, quigon, darth, boba];
var playerChar;
var charSelected = false;
var battleStart = false;
var gameOver = false;
var enemyChar;
var loseAudio = new Audio("http://www.thesoundarchive.com/starwars/empire/laughfuzzball.mp3");
var winAudio = new Audio("http://www.thesoundarchive.com/starwars/force.mp3");

//function to initialize the html with characters from objects
function init(){
	$("div.pickCharacter").empty();
	$("div.yourCharacter").empty();
	$("div.enemies").empty();
	$("div.defender").empty();
	for (var k = 0; k < charArray.length; k++){
			charArray[k].hp = charArray[k].basehp;
			charArray[k].ap = charArray[k].baseap;
	}
	for (var i = 0; i < charArray.length; i++){
		$("div.pickCharacter").append("<div class='character " +  charArray[i].id + "'>")
	}
	for (var j = 0; j <charArray.length; j++){
		$("."+charArray[j].id).append("<p class='name'>"+charArray[j].name+"</p>")
		$("."+charArray[j].id).append("<img src='"+charArray[j].image+"'>")
		$("."+charArray[j].id).append("<p class='HP'>"+charArray[j].hp+"</p>")
	}

	charSelected=false;
	battleStart=false;
	//kick off the game
	updateHP();
	game();

	
}


//function for updating the HP of each character on the screen
function updateHP(){
	for (var i = 0; i < charArray.length; i++){
		$("."+charArray[i].id+ " > .HP").html(charArray[i].hp);
	}
}


//function for handling attacks
function attack(){
	$("#attack").on("click",function(){
		if (gameOver === false && battleStart === true){
			//remove hp on both sides
			enemyChar.hp -= playerChar.ap;
			playerChar.hp -= enemyChar.cap;
			//update the HP display for each character
			updateHP();
			$(".attackMessage").html("You attacked "+ enemyChar.name + " for "+playerChar.ap+" damage.")
			$(".defendMessage").html(enemyChar.name + " attacked you back for " + enemyChar.cap + " damage.")
			//adjust player ap - add ap.
			playerChar.ap += playerChar.baseap;
			//if enemy hp is at 0 or under, end battle and prepare to select a new character
			if(enemyChar.hp <= 0){
				//if there are no enemies left to fight, game over - player wins
				if (enemyArray.length === 0){
					battleStart = false;
					$(".attackMessage").empty();
					$(".defendMessage").empty();
					$(".winLoseMessage").html("You Win! The Force is strong with you.")
					winAudio.play();
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
				loseAudio.play();
				$(".attackMessage").empty();
				$(".defendMessage").empty();
				$(".winLoseMessage").html("You have been defeated! Game over.")
				$("#restart").removeClass("hide");
			}
		}

	});
}

//function for restarting the game
function restart(){
		$("#restart").on("click", function(){
		gameOver = false;
		//reset the enemy array 
		enemyArray = [jarjar, quigon, darth, boba];
		//reset the hp and ap for each character
		//remove char selections
		playerChar = "";
		enemyChar = "";
		//update hp display
		updateHP();
		//call init again to restart the game
		init();
		//hide all the characters in use, display the ones at the top under pick char.
		$(".winLoseMessage").empty();
		$("#restart").addClass("hide");
	});
}


//function for processing of character selection.
function game(){
	//select player character
	$(".character").on("click",function(){
		if (charSelected === false){
			charSelected = true;
			//save player's choice as an object
			for (var i = 0; i < charArray.length; i++){
				if ( $(this).attr("class").includes(charArray[i].id)){
					playerChar = charArray[i];
				}
			}
			//remove player char from enemy array
			enemyArray.splice(enemyArray.indexOf(playerChar),1);
			//hide all other portraits at the top
			//move player character to the your character area
			$("div.yourCharacter").append($("."+playerChar.id));
			//show enemies
			for (var i = 0; i < charArray.length; i++){
				if (playerChar != charArray[i]){
					$("div.enemies").append($("."+charArray[i].id));
				}
			}
			return;
		}

		if (battleStart===false){
			
			//set enemyChar = object from chararray
			for (var i = 0; i < charArray.length; i++){
				if ($(this).attr("class").includes(charArray[i].id)){
				enemyChar = charArray[i];
				}
			}
			//remove selected enemy from enemy array
			enemyArray.splice(enemyArray.indexOf(enemyChar),1);
			//show enemy in the defender section
			$("div.defender").append($("."+enemyChar.id));
			//start battle so that enemies can't be selected
			battleStart = true;
			//clear the win/loss message in between enemies.
			$(".winLoseMessage").empty();
		}
	});

}

//program execution begins here after page load.
$(document).ready(function(){
	attack();
	restart();
	init();
	
});