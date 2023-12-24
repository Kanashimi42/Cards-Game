
/*
!!!!

НЕ РАБОТАЕТ!!!!

!!!!
*/










// var bgText = document.getElementById("backgroundText");
// var lifeTxt = document.getElementById("livesText");
// var botHealth = 3;
// var playerHealth = 3;
// var totalScore = 0;
// var botMatches = 0;
// var currentPlayer = 'bot';

// $(document).ready(function () {
//     beginGame();
// });
// function botPlay() {
//     var unflippedCards = $('.card:not(.flipped)');
//     if (unflippedCards.length > 0) {
//         var randomIndex = Math.floor(Math.random() * unflippedCards.length);
//         var cardToClick = unflippedCards[randomIndex];
//         $(cardToClick).addClass('flipped');
//         setTimeout(checkMatches, 1000);
//     }
// }

// function beginGame() {
//     $('#game').empty();
//     updateDisplay();

//     var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     var cards = alpha.substring(0, totalScore + 2).split('').map(char => [char, char]).flat();
//     var shuffledCards = shuffleCards(cards);

//     shuffledCards.forEach(function (card) {
//         var cardEl = $('<div class="card"><div class="back">' + card + '</div><div class="front">?</div></div>');
//         cardEl.data('value', card);
//         $('#game').append(cardEl);
//     });

//     if (currentPlayer === 'bot') {
//         botPlay();
//     }

//     $('.card').addClass('flipped');
//     setTimeout(function () {
//         $('.card').removeClass('flipped');
//     }, 2000);
// }


// function checkMatches() {
//     var flippedCards = $('.flipped');
//     if (flippedCards.length === 2) {
//         if ($(flippedCards[0]).data('value') === $(flippedCards[1]).data('value')) {
//             botMatches++;
//             totalScore++;
//             if (botMatches === $('.card').length / 2) {
//                 moveToNext();
//             }
//         } else {
//             reduceLife();
//         }
//         flippedCards.removeClass('flipped');
//     }
// }

// function moveToNext() {
//     currentPlayer = currentPlayer === 'bot' ? 'player' : 'bot';
//     beginGame();
// }

// function reduceLife() {
//     if (currentPlayer === 'bot') {
//         botHealth--;
//         if (botHealth === 0) {
//             endGame();
//         } else {
//             currentPlayer = 'player';
//             beginGame();
//         }
//     } else {
//         playerHealth--;
//         if (playerHealth === 0) {
//             endGame();
//         } else {
//             currentPlayer = 'bot';
//             beginGame();
//         }
//     }
// }

// function updateDisplay() {
//     lifeTxt.innerText = currentPlayer === 'bot' ? "Bot Lives: " + botHealth : "Player Lives: " + playerHealth;
//     bgText.innerText = "Score: " + totalScore;
// }

// function endGame() {
//     alert('Game Over!');
//     totalScore = 0;
//     botHealth = 3;
//     playerHealth = 3;
//     currentPlayer = 'bot';
//     beginGame();
// }

// function shuffleCards(arr) {
//     var len = arr.length, rand;
//     while (len) {
//         rand = Math.floor(Math.random() * len--);
//         [arr[len], arr[rand]] = [arr[rand], arr[len]];
//     }
//     return arr;
// }

// setInterval(function () {
//     updateDisplay();
// }, 1000);


