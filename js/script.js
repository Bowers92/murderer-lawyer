let players = [];

$(document).ready(function () {
  $('#playerCountInput').on("change", processPlayerCount);
  $('#startNamingButton').on("click", loadNameInput);
  $('#continueButton').on("click", function() {processNames(players)});
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
  $('#outputSection').html("Press 'play' to begin!")
}