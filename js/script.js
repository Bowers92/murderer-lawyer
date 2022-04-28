let players = [];
let [murdererIndex, lawyerIndex] = [];
let currentPlayerIndex = -1; 
let currentPlayer = "";  

$(document).ready(function () {
  //Starting screen 
  $('#playerCountInput').on("change", showPlayerCount);
  $('#playerCountButton').on("click", function(){
    loadNameInput();
    $('#playerCountSection').hide();
    $('#playerNamingSection').show();
  });
//Saving names, determining roles and welcoming players. 
  $('#playerNamingButton').on("click", function () {
    processNames(players);
    [murdererIndex, lawyerIndex] = determineRoles(players);
    welcomePlayers(players);
    $('#playerNamingSection').hide();
    $('#welcomeSection').show();
  });
//Determining next player, asking for ready check. 
  $('.continuePlayButton').on("click", function () {
    $('#welcomeSection').hide(); 
    $('#roleSection').show();
    $('.continuePlayButton').html("OK");
    $('.outputArea').html("");
    determinePlayer(currentPlayer);
    roleReadyCheck();
  }); 
//Showing role to player.
  $('#revealRoleButton').on("click", function () {
    showRole();
  });
//Determining who is next, 
  $('#completeRolesButton').on("click", function(){
    determinePlayer();
    questionReadyCheck();
    $('#questionSection').show();
    $('#roleSection').hide();
  });
  $('#questionButton').on("click", function(){
    askQuestion();
  });
});

//Shows the players how many players have been selected, shows hidden button to continue
function showPlayerCount() {
  playerCount = $('#playerCountInput').val();
  playerCount = document.getElementById("playerCountInput").value;
  $('#outputSection').html("You have selected " + playerCount + " players. Press 'Go!' to start");
  $('#playerCountButton').show();
}

//Determies how many input fields are required (based on player count), inserts as html to playerNamingArea
function loadNameInput() {
  $("#outputSection").html("Please ensure all names are entered and press 'start' when ready >> <br />  " + playerCount);
  let inputFieldString = "";
  for (let i = 0; i < playerCount; i++) {
    inputFieldString += "<input type=\"text\" class=\"nameInput\" id=\"player" + (i + 1) + "Name\" placeholder=\"Player " + (i + 1) + "'s name..\" />";
  }
  $('#playerNamingArea').html(inputFieldString);
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

//Welcomes players based on names supplied - initially used for testing purposes
function welcomePlayers() {
  let welcomeString = "";
  for (let i = 0; i < players.length; i++) {
    if (i === (players.length - 1)) {
      welcomeString += " and " + players[i];
    } else {
      welcomeString += players[i] + ", ";
    }
  }
  $('#welcomeArea').html(welcomeString);
  $('.outputArea').html("Press 'Start' to begin! **Murderer = " + players[murdererIndex] + " lawyer = " + players[lawyerIndex] + "**")
  $('.continuePlayButton').show(); 

}

//Determines who is next in the player queue and asks them to click the button when ready
function determinePlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 
  currentPlayer = players[currentPlayerIndex]; 
}

//Ready screen for role revealing 
function roleReadyCheck(){
  $('#roleArea').html(currentPlayer + ", it's your turn! Make sure only you can see the screen and press the button."); 
  $('.continuePlayButton').hide();
  $('#revealRoleButton').html("I'm " + currentPlayer);
  $('#revealRoleButton').show();
}

//Ready screen for question asking
function questionReadyCheck(){
  $('#questionArea').html(currentPlayer + ", time for a question. Gain control and press the button."); 
  $('#completeRolesButton').hide();
  $('#questionButton').html("I'm " + currentPlayer);
  $('#questionButton').show();
}

//Reveals whether player is the lawyer, the killer, or a regular player
function showRole() {
  console.log(currentPlayerIndex + "<-- current player Index");

  if(currentPlayerIndex === murdererIndex){
    $('#roleArea').html("You are the murderer! Try to guess your way through the questions and avoid detection"); 
  } 
  else if(currentPlayerIndex === lawyerIndex){
      $('#roleArea').html("You are the lawyer! Try to guess who the murderer is and protect them! Hint: the word is 'fish'"); 
  } 
  else { 
    $('#roleArea').html("The word is fish."); 
  }
  $('#revealRoleButton').hide();
  if (currentPlayerIndex === (players.length-1)){
    $('#completeRolesButton').show();
  } else { 
    $('.continuePlayButton').show();
  }
}

//Asks question --- *** need to create list of questions relevant to category - find out how to read from XML file ***
//Should read from XML file. 
function askQuestion(){
  $('#roleSection').hide(); 
  $('#questionSection').show(); 
  $('.questionButton').hide();

  let question = "What is the meaning of life?";
}

// ** For use if needed - used for debugging **
// function printRoles() {
//   console.log("M : " + players[murdererIndex]);
//   console.log("L : " + players[lawyerIndex]);
// }