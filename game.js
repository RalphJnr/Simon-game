var buttonColors = ["red", "blue", "green", "yellow"];
var randomColorArray = [];
var userChosenColour = [];
var level = 0;
var gameStarted = false;


$("body").keypress(function(){

  if (!gameStarted){
    randomColor();
    gameStarted = true;
  }

})

// for smaller screen without no keypad...

$(".icon").click(function(){

  if (!gameStarted){
    randomColor()
    gameStarted = true;
  }

})

$(".btn").click(function(){
  var userButton = $(this).attr("id");
  userChosenColour.push(userButton);

  animatePress("." + userButton);
  playSound(userButton);

  checkResult(userChosenColour.length - 1);

})


function checkResult(gameLevel){
  if (userChosenColour[gameLevel] === randomColorArray[gameLevel]){

    console.log("success");
    if (userChosenColour.length === randomColorArray.length){

      setTimeout(function(){
        randomColor();
      }, 1000)
    }

  } else {
    gameOver();
  }
}

function randomColor(){
  userChosenColour = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNum = Math.floor((Math.random() * buttonColors.length));
  var pickedColor = buttonColors[randomNum];
  randomColorArray.push(pickedColor); //adding random colors to the array

  $("#" + pickedColor).attr("class", "btn " + pickedColor + "-opacity");
  playSound(pickedColor);

  setTimeout(function() {
    $("#" + pickedColor).attr("class", "btn " + pickedColor);
  }, 300)
}


function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}


function animatePress(button) {
    $(button).addClass("pressed");

    setTimeout(function() {
      $(button).removeClass("pressed");
    }, 250)
}



function gameOver() {
  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
    startAgain();
  }, 500)
}


function startAgain(){
  randomColorArray = [];
  userChosenColour = [];
  level = 0;
  gameStarted = false;
}
