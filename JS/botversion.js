/*
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
            alert('Вы выиграли!');
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
});
Пока что не робит, доделать потом как вторую страницу, а первую вернуть как одиночная игра или наоборот
*/ 