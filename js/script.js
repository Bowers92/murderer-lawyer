let players = [];
let [murdererIndex, lawyerIndex] = [];
let currentPlayerIndex = -1; 
let currentPlayer = "";  

$(document).ready(function () {
  $('#playerCountInput').on("change", showPlayerCount);
  $('#playerCountButton').on("click", loadNameInput);
  $('#playerNamingButton').on("click", function () {
    processNames(players);
    [murdererIndex, lawyerIndex] = determineRoles(players);
    welcomePlayers(players)
  });
  $('.continuePlayButton').on("click", function () {
    determinePlayer(currentPlayer);
    $('.continuePlayButton').html("continue");
    $('#outputSection').html("");
  }); 
  $('#revealButton').on("click", function () {
    showRole();
  });
  $('.questionButton').on("click", askQuestion);
});

//Shows the players how many players have been selected, shows hidden button to continue
function showPlayerCount() {
  playerCount = $('#playerCountInput').val();
  playerCount = document.getElementById("playerCountInput").value;
  $('#outputSection').html("You have selected " + playerCount + " players. Press 'Go!' to start");
  $('#playerCountButton').show();
}

//Determies how many input fields are required (based on player count), inserts as html
//hides 'playerCountingSection, shows playerNaming section
function loadNameInput() {
  $("#outputSection").html("Please ensure all names are entered and press 'start' when ready >> <br />  " + playerCount);
  let inputFieldString = "";
  for (let i = 0; i < playerCount; i++) {
    inputFieldString += "<input type=\"text\" class=\"nameInput\" id=\"player" + (i + 1) + "Name\" placeholder=\"Player " + (i + 1) + "'s name..\" />";
  }
  $('#playerNamingArea').html(inputFieldString);
  $('#playerCountSection').hide();
  $('#playerNamingSection').show();
}

//Saves user-supplied names into 'players' array
function processNames(arr) {
  for (let i = 0; i < playerCount; i++) {
    let playerName = $('#player' + (i + 1) + 'Name').val(); //temp player name as needed
    console.log("pushing " + playerName);
    arr.push(playerName);
  }
}

//Generates two different random numbers based on the amount of players. 
//Return used to supply indexing of murderer and lawyer
function determineRoles(arr) {
  let randomNumber = Math.floor(Math.random() * arr.length);
  let secondRandomNumber = Math.floor(Math.random() * arr.length);
  //while loop to ensure different random numbers -- murderer cannot be lawyer
  while (randomNumber === secondRandomNumber) {
    secondRandomNumber = Math.floor(Math.random() * arr.length);
  }
  console.log("random1 : " + randomNumber + " random 2: " + secondRandomNumber);
  return [randomNumber, secondRandomNumber];
}

//Hides naming section, shows welcome section. 
//Welcomes players based on names supplied - initially used for testing purposes
function welcomePlayers() {
  $('#playerNamingSection').hide();
  $('#welcomeSection').show();

  let welcomeString = "Welcome to the game ";
  for (let i = 0; i < players.length; i++) {
    if (i === (players.length - 1)) {
      welcomeString += " and " + players[i];
    } else {
      welcomeString += players[i] + ", ";
    }
  }
  $('#welcomeArea').html(welcomeString);
  $('#outputSection').html("Press 'play' to begin! **Murderer = " + players[murdererIndex] + " lawyer = " + players[lawyerIndex] + "**")
  $('.continuePlayButton').show(); 

}

function determinePlayer() {
  $('#welcomeSection').hide(); 
  $('#playSection').show();
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 
  currentPlayer = players[currentPlayerIndex]; 
  $('#playArea').html(currentPlayer + ", it's your turn! Make sure only you can see the screen and press the button."); 
  $('.continuePlayButton').hide();
  $('#revealButton').html("I'm " + currentPlayer);
  $('#revealButton').show();
}

function showRole() {
  console.log(currentPlayerIndex + "<-- current player Index");

  if(currentPlayerIndex === murdererIndex){
    $('#playArea').html("You are the murderer! Try to guess your way through the questions and avoid detection"); 
    $('#revealButton').html("continue");
  } else if(currentPlayerIndex === lawyerIndex){
      $('#playArea').html("You are the lawyer! Try to guess who the murderer is and protect them! Hint: the word is 'fish'"); 
      $('#revealButton').html("continue");
  } else { 
    $('#playArea').html("The word is fish."); 
    $('#revealButton').html("continue");
  }
  $('#revealButton').hide();
  if (currentPlayerIndex === (players.length-1)){
    $('.questionButton').show();
  } else { 
    $('.continuePlayButton').show();
  }
}

function askQuestion(){
  $('#playSection').hide(); 
  $('#questionSection').show(); 
  $('.questionButton').hide();
}

// ** For use if needed - used for debugging **
// function printRoles() {
//   console.log("M : " + players[murdererIndex]);
//   console.log("L : " + players[lawyerIndex]);
// }