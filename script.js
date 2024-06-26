const DEBUG = 0;

function log(x) {
  if (DEBUG) {
    console.log(x);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("press-button");
  const totalPressesDisplay = document.getElementById("total-presses");
  const maxPressesDisplay = document.getElementById("max-presses");
  const resetCountDisplay = document.getElementById("reset-count");
  const messageDisplay = document.getElementById("message");
  const resetButton = document.getElementById("reset-button");

  const default_fontsize = parseInt(
    window.getComputedStyle(messageDisplay).fontSize
  );

  function I(x) {
    return Math.max(1, x + Math.floor(Math.random() * (3 - -3 + 1)) + -3);
  }

  const session_reset_sequence = [
    10,53,5,5,5,5,5,5,5,5,5,5,20,19,18,17,16,15,14,13,3,3,3,3,3,3,1,1,85,50,
  ].map(I);

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
    "broo synergyyyyyy!!!!!!!!!!!! ",
  ];

  let state = "NO_MESSAGE";
  let presses = parseInt(localStorage.getItem("presses")) || 0;
  let maxPresses = parseInt(localStorage.getItem("maxPresses")) || 0;
  let totalPresses = parseInt(localStorage.getItem("totalPresses")) || 0;
  let resetCount = parseInt(localStorage.getItem("resetCount")) || 0;
  let remainingPresses = getRandomPressCount(state);

  let SESSION_SEQUENCE_STARTS_AT = 2; //Math.floor(Math.random() * 10) + 5
  let session_resets = 0;

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
    /*
    Rigged press system
    */

    let update_text = true;
    if (
      session_resets >= SESSION_SEQUENCE_STARTS_AT &&
      session_resets < session_reset_sequence.length
    ) {
      if (session_resets == SESSION_SEQUENCE_STARTS_AT) {
        messageDisplay.style.opacity = 0;
      }
      update_text = false;
      log("rigged press");

      let rigged_reset_num = session_reset_sequence[session_resets];

      log(`sesh resets = ${session_resets} (numindex)`);
      log(`going to ${rigged_reset_num}`);

      if (rigged_reset_num < presses) {
        log(`reset!`);
        remainingPresses++; // to prevent reset on message later without screwing the system

        /* show text and increase fontsize for last 3 messages of sequence
         */
        if (
          session_resets > session_reset_sequence.length - 10 &&
          session_resets < session_reset_sequence.length - 2
        ) {
          messageDisplay.innerText = "Kijk onderin je drop";
          messageDisplay.style.opacity = 1; // Fade in;

          curr_size = parseInt(
            window.getComputedStyle(messageDisplay).fontSize
          );
          messageDisplay.style.fontSize = curr_size + 5 + "px";
        } else {
          if (session_resets == session_reset_sequence.length - 1) {
            messageDisplay.style.opacity = 0; // Fade Out?
          }
        }

        presses = 0;
        resetCount++;
        session_resets++;
      } else {
        presses++;
      }
    } else {
      log("normal press");
      /*
      Normal press system
      */
      if (Math.random() * 100 < presses) {
        presses = 0;
        resetCount++;
        session_resets++;
      } else {
        presses++;
      }
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

    if (remainingPresses <= 0 && update_text) {
      messageDisplay.style.fontSize = default_fontsize + "px";

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

  /*
  reset-everything button
  */

  resetButton.addEventListener("click", () => {
    presses = 0;
    maxPresses = 0;
    totalPresses = 0;
    resetCount = 0;
    session_resets = 0;

    button.innerText = presses;
    totalPressesDisplay.innerText = `Total: ${totalPresses}`;
    maxPressesDisplay.innerText = `Max: ${maxPresses}`;
    resetCountDisplay.innerText = `Resets: ${resetCount}`;

    localStorage.setItem("presses", presses);
    localStorage.setItem("maxPresses", maxPresses);
    localStorage.setItem("totalPresses", totalPresses);
    localStorage.setItem("resetCount", resetCount);
  });

  messageDisplay.innerText = "broo synergyyyyyy!!!!!!!!!!!! ";
});
