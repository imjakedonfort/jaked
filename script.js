// Datele pentru conversație: 6 runde
const conversation = [
  {
    npc: "Hello👋🏻",
    options: [
      "Hi",
      "Um...hello, I guess?",
      "Hey🙂"
    ]
  },
  {
    npc: "How are you?",
    options: [
      "I'm good",
      "I am alright...",
      "It could be better."
    ]
  },
  {
    npc: "Listen, I'm not supposed to tell you this but...",
    options: [
      "But?",
      "Well? What is it?",
      "Why not "
    ]
  },
  {
    npc: "Message cannot be send",
    options: [
      "Uh what? Are you trying something or...",
      "Tell me already🙄",
      "What the hell even?"
    ]
  },
  {
    npc: "Sorry, I have bad connection just. Wait, I'll have to send you a video then",
    options: [
      "But what's happening?",
      "What video?",
      "I'm not sure if I should be worried or..."
    ]
  },
  {
    npc: "Great! It's not sending... WAIT! I have to go, Alan is coming.",
    options: [
      "Wait! Don't go just yet!",
      "But...",
      "Stop playing around, I don't even know you!"
    ]
  }
];

let currentRound = 0;
const chatBox = document.getElementById("chat-box");
const optionsDiv = document.getElementById("options");
const typingDiv = document.getElementById("typing");
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlay-text");
const gameContainer = document.getElementById("game-container");
const finishGameBtn = document.getElementById("finish-game-btn");
const videoContainer = document.getElementById("video-container");

function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "Unknown" ? "npc-message" : "player-message");
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions(options) {
  optionsDiv.innerHTML = "";
  options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = opt;
    btn.onclick = () => playerResponse(index);
    optionsDiv.appendChild(btn);
  });
}

function npcSendMessage(text, callback) {
  typingDiv.style.display = "block";
  // Simulează timpul de tastare
  setTimeout(() => {
    typingDiv.style.display = "none";
    addMessage(text, "npc");
    if (callback) callback();
  }, 1500);
}

function playerResponse(optionIndex) {
  // Preia opțiunea selectată
  const chosenText = conversation[currentRound].options[optionIndex];
  addMessage(chosenText, "player");
  optionsDiv.innerHTML = "";
  // Trecem la următoarea rundă după o scurtă întârziere
  setTimeout(() => {
    currentRound++;
    if (currentRound < conversation.length) {
      npcSendMessage(conversation[currentRound].npc, () => {
        showOptions(conversation[currentRound].options);
      });
    } else {
      // Conversația s-a terminat
      endConversation();
    }
  }, 800);
}

function endConversation() {
  // Ascunde chat-ul
  document.getElementById("chat-container").style.display = "none";
  // Afișează overlay-ul cu Loading... apoi Error! și efect de glitch
  overlay.style.visibility = "visible";
  overlay.style.opacity = "1";
  overlayText.textContent = "Loading...";
  setTimeout(() => {
    overlayText.textContent = "Error!";
    overlay.classList.add("glitch");
    // După câteva secunde de glitch, treci la joc
    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.visibility = "hidden";
        overlay.classList.remove("glitch");
                        // Arată containerul de joc
        gameContainer.style.display = "block";
      }, 500);
    }, 3000);
  }, 2000);
}

// Eveniment pentru finalizarea jocului
finishGameBtn.addEventListener("click", () => {
  // Redirecționează direct la pagina de vizualizare a videoclipului pe Google Drive
  window.location.href = "https://drive.google.com/file/d/1u_eAneiysYW0RQqg_saNTvblARixtzdU/view?usp=sharing";
});

// Inițierea primei runde
window.onload = () => {
  npcSendMessage(conversation[currentRound].npc, () => {
    showOptions(conversation[currentRound].options);
  });
}
