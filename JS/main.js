$(document).ready(function() {
    var cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    var shuffledCards = shuffle(cards);

    shuffledCards.forEach(function(card) {
        var cardElement = $('<div class="card"><div class="back">' + card + '</div><div class="front">?</div></div>');
        cardElement.data('value', card);
        $('#game').append(cardElement);
    });

    var flippedCards = [];
    var matchedCards = [];

    $('.card').on('click', function() {
        var card = $(this);
        if (flippedCards.length < 2 && !card.hasClass('flipped')) {
            card.addClass('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
                    matchedCards.push(flippedCards[0], flippedCards[1]);
                    flippedCards = [];
                } else {
                    setTimeout(function() {
                        flippedCards[0].removeClass('flipped');
                        flippedCards[1].removeClass('flipped');
                        flippedCards = [];
                    }, 1000);
                }
            }
        }

        if (matchedCards.length === cards.length) {
        alert('Вы выиграли! Ну или бот  ¯\\_(ツ)_/¯ ');
        }
    });

    function shuffle(array) {
        var currentIndex = array.length, randomIndex;
        
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }
    //!!!!!!!AIAIAIAIAI!!!!!!
    var isAIPlaying = false; // Флаг активен ли ИИ

    $('#startAI').on('click', function() {
        isAIPlaying = !isAIPlaying;
        if (isAIPlaying) {
            startAIPlaying();
        } else {
            clearInterval(aiInterval);
        }
    });
    var aiInterval;
    function startAIPlaying() {
        aiInterval = setInterval(function() {
            if (flippedCards.length < 2) {
                var unflippedCards = $('.card:not(.flipped)');
                var firstCard = unflippedCards.eq(Math.floor(Math.random() * unflippedCards.length));
                var secondCard = unflippedCards.eq(Math.floor(Math.random() * unflippedCards.length));
                
                firstCard.click();
                setTimeout(function() {
                    secondCard.click();
                }, 1000);
            }
        }, 2000);
    }
});

