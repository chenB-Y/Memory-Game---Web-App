$(document).ready(function() {
  var timeInSeconds = 14 * 60 + 59; // 15 minutes
  var countdownInterval;
  var startTime;
  var endTime;
  var images=["images/cat.jpg","images/dog.jpg","images/cherries.png","images/chili.png",
              "images/grapes.png","images/lemon.png","images/orange.png","images/pineapple.png",
              "images/strawberry.png","images/tomato.png","images/watermelon.png","images/cow.jpg",
              "images/donkey.jpg","images/giraffe.jpg","images/hedgehog.jpg","images/levitan.jpg",
              "images/lion.jpg","images/monkey.jpg","images/pig.jpg","images/seaTurtle.jpg",
              "images/squirrel.jpg","images/wolf.jpg","images/bear.jpg","images/bird.jpg",
              "images/leopard.jpg","images/dragon.jpg","images/kiwi.jpg","images/banana.jpg",
              "images/carambula.jpg","images/mango.jpg"];
  var fName; 
  var lName; 

  $("#cards").on('input', function() {
    var value = $(this).val();
    if (value > 30) {
      $("#cards").css("background-color", "red");
    }
    if (value <= 30) {
      $("#cards").css("background-color", "white");
    }
  });

  function startCountdown() {
      startTime = Date.now();
      countdownInterval = setInterval(function() {
          if (timeInSeconds === 0) {
              clearInterval(countdownInterval);
              var newDiv = document.createElement("div");
              newDiv.className = "outOfTime";
              newDiv.innerHTML = 
              `
              <h2 id="ido">Out Of Time:</h2>
              <h2 id="ido">${fName } ${lName}</h2>
              <h4 id="ido">You did not complited the game in time.</h4>
              <button id="restart">Restart</button>
              `;
              $("OutOfTime").css({backgroundColor:"red"});
              $("#elapsed-time").css({backgroundColor:"red"});
              $("#elapsed-time").show();
              $("#elapsed-time").append(newDiv);
              var restartButton = $("#restart");
              restartButton.css({backgroundColor:"red"});
              restartButton.click(function() {
                // Clear the game page
                $(".content").empty();
              
                $("#cards").val("");
                $("#firstName").val("");
                $("#LastName").val("");
              
                $("#elapsed-time").hide();
                $("#elapsed-time").empty();
                $("#elapsed-time").css({backgroundColor:"none"});
              
                $("#enterPage").show();
              
                $("#gamePage").hide();
              
                $("#digit1").text(1);
                $("#digit2").text(5);
                $("#digit3").text(0);
                $("#digit4").text(0);
                clearInterval(countdownInterval);
                timeInSeconds = 14 * 60 + 59;
              });
              
          }

          var minutes = Math.floor(timeInSeconds / 60);
          var seconds = timeInSeconds % 60;

          // Update the card digits
          $("#digit1").text(Math.floor(minutes / 10));
          $("#digit2").text(minutes % 10);
          $("#digit3").text(Math.floor(seconds / 10));
          $("#digit4").text(seconds % 10);

          timeInSeconds--;
      }, 1000);
  }

  // Shuffle an array using Fisher-Yates algorithm
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

  // Add an event listener to the start game button
  var startButton = $("#startButton");
  startButton.click(function(event) {
    var numOfCards = parseInt($("#cards").val());
    fName= $('#firstName').val();
    lName= $('#LastName').val();
    if(numOfCards <= 30 && lName != "" && fName !=""){
    event.preventDefault();

    startCountdown();

    // Hide the enter page
    $('#enterPage').hide();

    // Show the game page
    $("#gamePage").show();
  
    var cards = [];
    var img = []
    img = images.slice(0, Math.min(numOfCards, 30));
    cards = img.concat(img);
    cards = shuffle(cards);

    if(numOfCards > 20 && numOfCards <26 ){
      $("#gamePage").css({height:"780px"})
      }
      if(numOfCards > 25){
        $("#gamePage").css({height:"900px"})
        }
      

    var flippedCards = [];
    var lock = false;

  for(let i =0; i<numOfCards * 2;i++){
      var photo = cards[i];
        var div = document.createElement("div");
        div.className = "flip-card";
        div.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h3>Memory Game</h3>
                </div>
                <div class="flip-card-back" style="background-image: url('${photo}');background-size: 100% 100%;">
                </div>
            </div>
        `;
        $(".content").append(div);
        

        
        $(div).click(function() {
          if (lock){
            return;
          }
      
          var card = $(this);
          if (!card.hasClass("flip") && flippedCards.length < 2) {
            card.addClass("flip");
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          lock = true;
          var firstCardImage = flippedCards[0].find(".flip-card-back").css("background-image");
          var secondCardImage = flippedCards[1].find(".flip-card-back").css("background-image");
  
          if (firstCardImage === secondCardImage) {
            flippedCards = [];
            lock = false;
            if ($(".flip-card:not(.flip)").length === 0) {
              stopCountdown();
            }
          } else {
            setTimeout(function() {
              flippedCards.forEach(function(flippedCard) {
                flippedCard.removeClass("flip");
              });
              flippedCards = [];
              lock = false;
            }, 1000);
          }
        }
          }
        });
    }
  }
  });

  function stopCountdown() {
    clearInterval(countdownInterval);
    endTime = Date.now();
    var elapsedSeconds = Math.floor((endTime - startTime) / 1000);
    var elapsedMinutes = Math.floor(elapsedSeconds / 60);
    var elapsedSecondsRemainder = elapsedSeconds % 60;
    if(elapsedMinutes === 0){
    var newDiv = document.createElement("div");
    newDiv.innerHTML = 
    `
    <h2 id="ido">Congratulations!</h2>
    <h2 id="ido">${fName } ${lName}</h2>
    <h4 id="ido">You completed the game in ${elapsedSecondsRemainder} seconds.</h4>
    <button id="restart" class="bg-primary">Restart</button>
    `;
    $("#elapsed-time").show();
    $("#elapsed-time").append(newDiv);
    }
    else{
      var newDiv = document.createElement("div");
      newDiv.innerHTML = 
      `
      <h2 id="ido">Congratulations!</h2>
      <h2 id="ido">${fName } ${lName}</h2>
      <h4 id="ido">You completed the game in ${elapsedMinutes} minutes and  ${elapsedSecondsRemainder} seconds.</h4>
      <button id="restart" class="bg-primary">Restart</button>
      `;
      $("#elapsed-time").show();
      $("#elapsed-time").append(newDiv);
    }
    var restartButton = $("#restart");
restartButton.click(function() {
  // Clear the game page
  $(".content").empty();

  $("#cards").val("");
  $("#firstName").val("");
  $("#LastName").val("");

  $("#elapsed-time").hide();
  $("#elapsed-time").empty();

  $("#enterPage").show();

  $("#gamePage").hide();

  $("#digit1").text(1);
  $("#digit2").text(5);
  $("#digit3").text(0);
  $("#digit4").text(0);
  clearInterval(countdownInterval);
  timeInSeconds = 14 * 60 + 59;
});
}

});
