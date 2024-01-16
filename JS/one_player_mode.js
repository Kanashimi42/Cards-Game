const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let health = 1;
let listenscore = 0;

var end = document.querySelectorAll('.hide');
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

function flipCard() {
  if (health <= 0) show();
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
function show() {
  end.classList.remove('hide');
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
  score++;
  listenscore++;
  if (listenscore == 9) {
    enablebutton();
  }
  document.querySelector(".score").textContent = score;
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
    health--;
    document.querySelector(".health").textContent = health;
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  health = 5;
  document.querySelector(".health").textContent = health;
  listenscore = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}

function next() {
  if (listenscore == 9) {
    resetBoard();
    shuffleCards();
    gridContainer.innerHTML = "";
    generateCards();
    listenscore = 0;
    health = 5;
    disablebutton();
  }

}
function flipall() {
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    card.classList.add('flipped');
  });
  setTimeout(() => {
    cards.forEach(function (card) {
      card.classList.remove('flipped');
    });
  }, 1000)
}
