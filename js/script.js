$(document).ready(function () {

  let playerCount = 0;
  let players = [];
  $('#playerCountInput').on("change", processPlayerCount);
  $('#startNamingButton').on("click", loadNameInput);
  $('#startPlayingButton').on("click", startPlaying);
});

function processPlayerCount() {
  playerCount = document.getElementById("playerCountInput").value;
  $('#outputSection').html("You have selected " + playerCount + " players. Press 'Go!' to start");
  $('#startNamingButton').show();
}

function loadNameInput() {
  $("#outputSection").html("Please ensure all names are entered and press 'Play' to begin >> " + playerCount);
  var inputFieldString = "";
  for(let i = 0; i < playerCount; i++){
    inputFieldString += "<input type=\"text\" class=\"nameInput\" id=\"player"+(i+1)+"Name\" placeholder=\"Player "+(i+1)+"'s name..\" />";
  }
  inputFieldString += "<button type=\"button\" id=\"startPlayingButton\">Play!</button>";
  $('#nameForm').html(inputFieldString);
  $('#playerCountSection').hide();
  $('#playerNamingSection').show();
}

function startPlaying(){
  //players.push($('#player1Name'));
  $('#playerNamingSection').hide();
  $
}