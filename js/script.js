let players = [];
let [murdererIndex, lawyerIndex] = [];
let currentPlayerIndex = -1; 
let currentPlayer = "";
let roundCount = 0; 
let isRoundLimit = false;

let words = ["Llama", "Fish"]; 
let questions = ["Would you put this in your mouth", "How many of these could you carry?"];

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
    roundLimit = players.length * 2;
    $('#playerNamingSection').hide();
    $('#welcomeSection').show();
  });
//Determining next player, asking for ready check. 
  $('.continueRoleButton').on("click", function () {
    $('#welcomeSection').hide(); 
    $('#roleSection').show();
    $('.continueRoleButton').html("OK");
    $('.outputArea').html("");
    determinePlayer(currentPlayer);
    roleReadyCheck();
  }); 
//Showing role to player.
  $('#revealRoleButton').on("click", function () {
    showRole();
  });
//Determining who is next, 
  $('.continueQuestionButton').on("click", function(){
    determinePlayer();
    if(isRoundLimit === false){
      questionReadyCheck();
      $('#roleSection').hide();
      $('#questionSection').show();
      $('#questionButton').show();
      $('.questionTime').hide()
    } else{
      $('votingButton').show();
    }
  });
//Question players in turns. Increment round count
  $('#questionButton').on("click", function(){
    roundCount++;
    if(roundCount > (players.length) * 2){
      isRoundLimit = true;
    }
    askQuestion(isRoundLimit);
  });
  $('.votingButton').on('click', function(){
    var buttonString = "";
    $('#votingHeader').html("Pick who you think is the killer:");
    for(var i = 0; i < players.length; i++){
      buttonString += "<button type='button' class='playerVoteButton'>"+players[i]+"</button>";
      console.log(buttonString);
    }
    $('#votingArea').html(buttonString);
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
  $('.continueRoleButton').show(); 
}
//Determines who is next in the player queue and asks them to click the button when ready
function determinePlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length; 
  currentPlayer = players[currentPlayerIndex]; 
}
//Ready screen for role revealing 
function roleReadyCheck(){
  $('#roleArea').html(currentPlayer + ", it's your turn! Make sure only you can see the screen and press the button."); 
  $('.continueRoleButton').hide();
  $('#revealRoleButton').html("I'm " + currentPlayer);
  $('#revealRoleButton').show();
}
//Ready screen for question asking
function questionReadyCheck(){
  $('#questionArea').html(currentPlayer + ", time for a question. Gain control and press the button."); 
  $('.continueQuestionButton').hide();
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
    $('.continueQuestionButton').show();
  } else { 
    $('.continueRoleButton').show();
  }
}
//Asks question --- *** need to create list of questions relevant to category - find out how to read from XML file ***
//Should read from XML file. 
function askQuestion(isRoundLimit){
  $('#roleSection').hide(); 
  $('#questionSection').show(); 
  $('#questionButton').hide();
  $('.continueQuestionButton').show()
  if(isRoundLimit == false){
    let question = "Would you put this in your mouth?";
    $('#questionArea').html(question);
  } else{
    $('.continueQuestionButton').html("Time to vote!");
    $('#questionSection').hide();
    $('#votingSection').show();
    $('.votingButton').show();
  }
}
// ** For use if needed - used for debugging **
// function printRoles() {
//   console.log("M : " + players[murdererIndex]);
//   console.log("L : " + players[lawyerIndex]);
// }