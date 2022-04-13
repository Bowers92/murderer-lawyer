$(document).ready(function() {

  var playerCount = 0;
  $('#inputPlayerCount').on("change", processPlayerCount);
  $('#startNamingButton').on("click", loadNameInput)

});

function processPlayerCount() {
  playerCount = document.getElementById("inputPlayerCount").value;
  var outputMessage = "You have selected " + playerCount + " players. Press play to start";
  document.getElementById('outputSection').innerHTML = outputMessage;
  $('#startNamingButton').show();
}

function loadNameInput() {
  $("#playerNumberSection").hide();
  $("#playerNamingSection").show();
  playerCountSection.innerHTML = "<h2> Please enter player names</h2>";
}