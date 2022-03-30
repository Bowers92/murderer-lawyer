$(document).ready(function(){

  var playerCount=0;

  $('#playerCount').on("change", showPlayerCount);
  $('#playButton').on("click", loadNameInput)

  function showPlayerCount(){
    playerCount = document.getElementById('playerCount').value;
    var outputMessage = "You have selected " + playerCount + " players. Press play to start";
    document.getElementById('playerOutput').innerHTML = outputMessage;
    $('#playButton').show();
  }

  function loadNameInput(){
    var mainSection = document.getElementById("mainSection");
    mainSection.innerHTML ="<h2> Please enter player names</h2>";
    for (let i = 0; i<playerCount; i++) {
      mainSection.innerHTML += "<p> Player " + (i+1) + "'s name:</p>";
      mainSection.innerHTML += ("<input type='text' name='Player " + (i+1) + "' placeholder='Player " + (i+1) + " name..' name id='player"+ (i+1) +"name'>");
      mainSection.innerHTML += "<br>"
    }
  };

});
