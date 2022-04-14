let players = [];
let [murdererIndex, lawyerIndex] = [];

$(document).ready(function () {
  $('#playerCountInput').on("change", processPlayerCount);
  $('#startNamingButton').on("click", loadNameInput);
  $('#continueButton').on("click", function() {processNames(players); [murdererIndex, lawyerIndex] = determineRoles(players); welcomePlayers(players)});
  $('#playButton').on("click", function(){ determineRoles(players)});
});

function processPlayerCount() {
  playerCount = $('#playerCountInput').val();
  playerCount = document.getElementById("playerCountInput").value;
  $('#outputSection').html("You have selected " + playerCount + " players. Press 'Go!' to start");
  $('#startNamingButton').show();
}

function loadNameInput() {
  $("#outputSection").html("Please ensure all names are entered and press 'Play' to begin >> " + playerCount);
  let inputFieldString = "";
  for(let i = 0; i < playerCount; i++){
    inputFieldString += "<input type=\"text\" class=\"nameInput\" id=\"player"+(i+1)+"Name\" placeholder=\"Player "+(i+1)+"'s name..\" />";
  }
  $('#nameForm').html(inputFieldString);
  $('#playerCountSection').hide();
  $('#playerNamingSection').show();
}

function welcomePlayers(){
  $('#playerNamingSection').hide();
  $('#welcomeSection').show();
  let welcomeString = "";
  for(let i = 0; i < players.length; i++){
        welcomeString += "welcome " + players[(i+1)];
  }
  $('#welcomeForm').html(welcomeString);
}

function processNames(){
  $('#playerNamingSection').hide();
  $('#welcomeSection').show();

  for(let i = 0; i < playerCount; i++){
    let playerName = $('#player'+(i+1)+'Name').val();
    arguments[0].push(playerName);
    console.log("pushing " + playerName);
  }
  console.log("Array after push: " + arguments[0] + ". Length: " + arguments[0].length);
}

function welcomePlayers(){
  let welcomeString = "Welcome to the game ";
  for(let i = 0; i < players.length; i++){
    if(i === (players.length-1)){
      welcomeString += " and " + players[i];
    }
    else{
      welcomeString += players[i] + ", ";
    }
  }
  $('#welcomeForm').html(welcomeString);
  $('#outputSection').html("Press 'play' to begin! **Murderer = " + players[murdererIndex] + " lawyer = " + players[lawyerIndex]+"**")
}

 function determineRoles(arr){
   let randomNumber = Math.floor(Math.random() * arr.length); 
   let secondRandomNumber = Math.floor(Math.random() * arr.length);
    while(randomNumber === secondRandomNumber){
      secondRandomNumber = Math.floor(Math.random() * arr.length);
    }
    console.log("array: " + arr);
    console.log("first random number: " + randomNumber + " Second random: " + secondRandomNumber + " arraypeople: " + arr[randomNumber] + " and " + arr[secondRandomNumber]); 

    return [randomNumber, secondRandomNumber];
}

function printRoles(){
  console.log("M : " + players[murdererIndex]);
  console.log("L : " +players[lawyerIndex]);
}