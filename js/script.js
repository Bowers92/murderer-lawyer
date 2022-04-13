$(document).ready(function () {

  let playerCount = 0;
  let players = ["Phil", "Jim", "Tina"];
  $('#playerCountInput').on("change", processPlayerCount);
  $('#startNamingButton').on("click", loadNameInput);
  $('#startPlayButton').on("click", function() {processNames(playerCount, players), welcomePlayers});
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
  $('#nameForm').html(inputFieldString);
  $('#playerCountSection').hide();
  $('#playerNamingSection').show();
}

function welcomePlayers(){

  // $('#playerNamingSection').hide();
  // $('#welcomeSection').show();
  // let welcomeString = "";
  // for(let i = 0; i < players.length; i++){
  //       welcomeString += "welcome " + players[(i+1)];
  // }
  // $('#welcomeForm').html(welcomeString);
}

function processNames(){
  let count = arguments[0];
  console.log("count " + count);
  for(let i = 0; i < count; i++){
    //let playerName = $('#player'+(i+1)+'Name').val();
    //players.push(arguments[i]);
    console.log(arguments[1][i]);
  }
}