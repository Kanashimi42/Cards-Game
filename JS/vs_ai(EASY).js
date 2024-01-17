const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let score_2 = 0;
let health = 30;
let health_2 = 30;
console.log("Updating healt:", health_2);
let listenscore = 0;
let player = true;
document.querySelector(".scor").textContent = score_2;

document.querySelector(".healt").textContent = health_2;
document.querySelector(".score").textContent = score;
document.querySelector(".health").textContent = health;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  listenscore = 0;
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}
function show() {
  document.querySelector(".score_end").textContent = score;
  document.querySelector(".score_end2").textContent = score_2;
  var ends = document.querySelector('.hide');
  ends.classList.remove('hide');
}
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}
function AIClick() {
  if (listenscore == 9) return;
  const unflippedCards = document.querySelectorAll('.card:not(.matched):not(.flipped)');
  const randomIndex = Math.floor(Math.random() * unflippedCards.length);
  const aiCard = unflippedCards[randomIndex];
  console.log(aiCard);
  aiCard.click();
}
function AI(){
if(!player) {
  setTimeout(() => {
    AIClick();
    setTimeout(() => {
      AIClick();
    }, 500);
  }, 500); }
}
function flipCard() {
  if (health <= 0) show();
  if (health_2 <= 0) show();
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  lockBoard = true;

  checkForMatch();
  
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}
function enablebutton() {
  var button = document.querySelector('.gray');
  if (button) {
    button.classList.remove('gray');
  }
}
function disablebutton() {
  var button = document.querySelector('.disable');
  if (button) {
    button.classList.add('gray');
  }
}
function disableCards() {
  if (player) { score++; player = false; AI(); } else { score_2++; player = true; }
  listenscore++;
  if (listenscore == 9) {
    enablebutton();
  }
  document.querySelector(".score").textContent = score;
  document.querySelector(".scor").textContent = score_2;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.remove("flipped");
  firstCard.classList.add("matched");
  secondCard.classList.remove("flipped");
  secondCard.classList.add("matched");
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    if (player) {
      health--;
      player = false;
      AI();
    } else {
      health_2--;
      player = true;
    }

    document.querySelector(".health").textContent = health;
    document.querySelector(".healt").textContent = health_2;
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  location.reload();
}

function next() {
  if (listenscore == 9) {
    resetBoard();
    shuffleCards();
    gridContainer.innerHTML = "";
    generateCards();
    player = true;
    health = 30;
    health_2 = 30;
    disablebutton();
  }

}
function flipall() {
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    card.classList.add('flipped_a');
  });
  setTimeout(() => {
    cards.forEach(function (card) {
      card.classList.remove('flipped_a');
    });
  }, 1000)
}
