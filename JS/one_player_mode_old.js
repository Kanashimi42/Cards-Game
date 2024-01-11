var bgText = document.getElementById("backgroundText");
var lifeTxt = document.getElementById("livesText");
var health = 3;
var totalScore = 0;
var pairMatches = 0;

$(document).ready(function () {
    beginGame();
});

var hasErrors = false;

function beginGame() {
    $('#game').empty();
    showLives();
    
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var cards = alpha.substring(0, totalScore + 2).split('').map(function(char) {
        return [char, char];
    }).flat();
    
    var shuffled = shuffleCards(cards);

    shuffled.forEach(function (c) {
        var ele = $('<div class="card"><div class="back">' + c + '</div><div class="front">?</div></div>');
        ele.data('dataVal', c);
        $('#game').append(ele);
    });

    $('.card').addClass('flipped');
    setTimeout(function () {
        $('.card').removeClass('flipped');
    }, 2000);

    var flippedSet = [];

    $('.card').on('click', function () {
        if (flippedSet.length < 2 && !$(this).hasClass('flipped')) {
            $(this).addClass('flipped');
            flippedSet.push($(this));

            if (flippedSet.length === 2) {
                setTimeout(function () {
                    if (flippedSet[0].data('dataVal') === flippedSet[1].data('dataVal')) {
                        pairMatches++;
                        totalScore++;

                        flippedSet = [];

                        if (pairMatches === cards.length / 2) {
                            moveToNext();
                        }
                    } else {
                        hasErrors = true;
                        flippedSet[0].removeClass('flipped');
                        flippedSet[1].removeClass('flipped');
                        flippedSet = [];
                    }
                }, 1000);
            }
        }
    });
}

function moveToNext() {
    if (hasErrors) {
        reduceLife();
        hasErrors = false;
    }
    beginGame();
    pairMatches = 0;
}

function reduceLife() {
    health--;
    showLives();
    if (health === 0) {
        endGame();
        totalScore = 0;
        health = 3;
        pairMatches = 0;
    }
}

function showLives() {
    lifeTxt.innerText = "Lives: " + health;
    bgText.innerText = "Score: " + totalScore;
}

function endGame() {
    alert('Game Over!');
    beginGame();
}

function shuffleCards(arr) {
    var len = arr.length, rand;
    while (len) {
        rand = Math.floor(Math.random() * len--);
        [arr[len], arr[rand]] = [arr[rand], arr[len]];
    }
    return arr;
}

function refreshScore() {
    var scoreUpdate = "Score: " + totalScore;
    bgText.innerText = scoreUpdate;
}

setInterval(function () {
    refreshScore();
}, 1000);
