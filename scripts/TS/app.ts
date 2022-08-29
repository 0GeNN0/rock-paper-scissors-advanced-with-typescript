// Variables
const rulesButton = document.getElementById("rules-btn") as HTMLButtonElement;

const rulesCard = document.querySelector(".rules-card") as HTMLDivElement;

const popupDialog = document.querySelector(".pop-up") as HTMLDialogElement;

const closeIcon = document.querySelector("#close") as HTMLSpanElement;

const picksNode = document.querySelectorAll(
  "[data-picker]"
) as NodeListOf<HTMLDivElement>;

const competitionSection = document.querySelector(
  "[data-competition]"
) as HTMLElement;

const picksContainer = document.querySelector(
  "[data-picksContainer]"
) as HTMLDivElement;

const userPickElement = document.querySelector(
  "[data-userPick]"
) as HTMLDivElement;

const resultElement = document.querySelector("[data-result]") as HTMLDivElement;

const housePickElement = document.querySelector(
  "[data-housePick]"
) as HTMLDivElement;

const announceTitle = document.querySelector(
  "[data-announceTitle]"
) as HTMLHeadingElement;

const playAgainButton = document.getElementById(
  "play-again"
) as HTMLButtonElement;

const scoreElement = document.querySelector("[data-score]") as HTMLSpanElement;

let score = 0;
scoreElement.textContent = score.toString();

// picks

type storePicksType = {
  userPick: string | null;
  housePick: string | null;
};

const storePicks: storePicksType = {
  userPick: "",
  housePick: "",
};
// Functions

// Show Set Of Rules
function showSetOfRules(): void {
  rulesCard.classList.remove("close");
  popupDialog.style.display = "flex";
}

// Close Rules When Click Outside The Card
function closeRulesByClickingOutsideCard(e: MouseEvent): void {
  let element = e.target as HTMLElement;

  if (element.className === "pop-up") {
    rulesCard.classList.add("close");
    // Delay For Closing Animation
    setTimeout(() => {
      element.style.display = "none";
    }, 500);
  }
}

// Close Rules When Click The Icon
function closeRulesWithCloseIcon(): void {
  rulesCard.classList.add("close");
  setTimeout(() => {
    popupDialog.style.display = "none";
  }, 500);
}

// Get The Computer Pick
function getTheHousePick(): void {
  let randomNum = Math.floor(Math.random() * 5);
  const housePick = picksNode[randomNum];
  // The Clone To Keep The Element Itslef Because If The Picks Are The Same It Will Render Only One
  const cloneHousePick = housePick.cloneNode(true);

  storePicks.housePick = housePick.getAttribute("data-picker");

  housePickElement.appendChild(cloneHousePick);
}

function updateUI(result?: string): void {
  if (result === "draw") {
    announceTitle.textContent = "DRAW";
  } else if (result === "win") {
    score++;
    announceTitle.textContent = "YOU WIN";
    userPickElement.classList.add("winner");
  } else {
    score--;
    announceTitle.textContent = "YOU LOSE";
    housePickElement.classList.add("winner");
  }

  scoreElement.textContent = score.toString();
  resultElement.classList.remove("hidden");
}

function getTheWinner() {
  const { userPick, housePick } = storePicks;
  if (userPick === housePick) {
    updateUI("draw");
  } else {
    switch (userPick) {
      // CASE ONE
      case "scissors":
        if (housePick === "paper" || housePick === "lizard") {
          updateUI("win");
          break;
        } else {
          updateUI();
          break;
        }

      // CASE TWO
      case "paper":
        if (housePick === "rock" || housePick === "spock") {
          updateUI("win");
          break;
        } else {
          updateUI();
          break;
        }

      // CASE THREE
      case "rock":
        if (housePick === "scissors" || housePick === "lizard") {
          updateUI("win");
          break;
        } else {
          updateUI();
          break;
        }

      // CASE FOUR
      case "lizard":
        if (housePick === "spock" || housePick === "paper") {
          updateUI("win");
          break;
        } else {
          updateUI();
          break;
        }

      // CASE FIVE
      case "spock":
        if (housePick === "scissors" || housePick === "rock") {
          updateUI("win");
          break;
        } else {
          updateUI();
          break;
        }
      default:
        return undefined;
    }
  }
}

function playAgain(): void {
  picksContainer.classList.remove("hide");
  competitionSection.classList.add("hide");
  userPickElement.innerHTML = "";
  userPickElement.classList.remove("winner");
  resultElement.classList.add("hidden");
  housePickElement.innerHTML = "";
  housePickElement.classList.remove("winner");
}
// Events

// Show Rules Set
rulesButton.addEventListener("click", showSetOfRules);

// Close The Pop-up By Clicking On The Empty Area
window.addEventListener("click", closeRulesByClickingOutsideCard);

// Close The Pop-up By Clicking On The Close Icon
closeIcon?.addEventListener("click", closeRulesWithCloseIcon);

// LOOP On The Picks To Get The Choosed One
picksNode.forEach((pick) => {
  pick.addEventListener("click", () => {
    picksContainer.classList.add("hide");
    competitionSection.classList.remove("hide");

    const cloneUserPick = pick.cloneNode(true);
    storePicks.userPick = pick.getAttribute("data-picker");

    userPickElement.appendChild(cloneUserPick);
    setTimeout(() => {
      getTheHousePick();
      getTheWinner();
    }, 2500);
  });
});

// Start New Game
playAgainButton.addEventListener("click", playAgain);
