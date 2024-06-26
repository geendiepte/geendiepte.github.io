document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("press-button");
  const totalPressesDisplay = document.getElementById("total-presses");
  const maxPressesDisplay = document.getElementById("max-presses");
  const resetCountDisplay = document.getElementById("reset-count");
  const messageDisplay = document.getElementById("message");
  const resetButton = document.getElementById("reset-button");

  const messages = [
    "geen diepte???",
    "OP DIE DJALLA die was raak",
    "potje fortnite? Das echt vet!!!!",
    "waar is mijn bril???",
    "HEY!! wie heeft het ligt uit gedaan?",
    "IK ZWEER DAT IS EEN NINJA",
    "ja hij is een beetje slecht horend. ah ja ik heb soms ook poep in mn hoofd",
    "9.06 single pb",
    "zin in een potje clock??",
    "future team bld champion",
  ];

  let state = "NO_MESSAGE";
  let presses = parseInt(localStorage.getItem("presses")) || 0;
  let maxPresses = parseInt(localStorage.getItem("maxPresses")) || 0;
  let totalPresses = parseInt(localStorage.getItem("totalPresses")) || 0;
  let resetCount = parseInt(localStorage.getItem("resetCount")) || 0;
  let remainingPresses = getRandomPressCount(state);

  button.innerText = presses;
  totalPressesDisplay.innerText = `Total: ${totalPresses}`;
  maxPressesDisplay.innerText = `Max: ${maxPresses}`;
  resetCountDisplay.innerText = `Resets: ${resetCount}`;

  function getRandomPressCount(state) {
    switch (state) {
      case "NO_MESSAGE":
        return Math.floor(Math.random() * 10) + 1;
      case "SHOWING":
        return Math.floor(Math.random() * 20) + 10;
      case "HIDING":
        return Math.floor(Math.random() * 20) + 1;
      default:
        return 0;
    }
  }

  button.addEventListener("click", () => {
    if (Math.random() * 100 < presses) {
      presses = 0;
      resetCount++;
    } else {
      presses++;
    }

    totalPresses++;
    if (presses > maxPresses) {
      maxPresses = presses;
    }

    button.innerText = presses;
    totalPressesDisplay.innerText = `Total: ${totalPresses}`;
    maxPressesDisplay.innerText = `Max: ${maxPresses}`;
    resetCountDisplay.innerText = `Resets: ${resetCount}`;

    localStorage.setItem("presses", presses);
    localStorage.setItem("maxPresses", maxPresses);
    localStorage.setItem("totalPresses", totalPresses);
    localStorage.setItem("resetCount", resetCount);

    remainingPresses--;

    if (remainingPresses <= 0) {
      switch (state) {
        case "NO_MESSAGE":
          state = "SHOWING";
          messageDisplay.innerText =
            messages[Math.floor(Math.random() * messages.length)];
          messageDisplay.style.opacity = 1; // Fade in
          remainingPresses = getRandomPressCount(state);
          break;
        case "SHOWING":
          state = "HIDING";
          messageDisplay.style.opacity = 0; // Fade out
          remainingPresses = getRandomPressCount(state);
          break;
        case "HIDING":
          state = "NO_MESSAGE";
          messageDisplay.innerText = ""; // Clear message
          remainingPresses = getRandomPressCount(state);
          break;
      }
    }
  });

  resetButton.addEventListener("click", () => {
    presses = 0;
    maxPresses = 0;
    totalPresses = 0;
    resetCount = 0;

    button.innerText = presses;
    totalPressesDisplay.innerText = `Total: ${totalPresses}`;
    maxPressesDisplay.innerText = `Max: ${maxPresses}`;
    resetCountDisplay.innerText = `Resets: ${resetCount}`;

    localStorage.setItem("presses", presses);
    localStorage.setItem("maxPresses", maxPresses);
    localStorage.setItem("totalPresses", totalPresses);
    localStorage.setItem("resetCount", resetCount);
  });

  messageDisplay.innerText = "Hey, good job, but AFAK has 34 points.";
});
