const WORDS = [
  "Umbrella",
  "Volcano",
  "Library",
  "Octopus",
  "Lighthouse",
  "Honey",
  "Subway",
  "Telescope",
  "Cactus",
  "Violin",
  "Iceberg",
  "Keyhole",
  "Balloon",
  "Compass",
  "Typewriter",
  "Coral",
  "Ladder",
  "Moonlight",
  "Anchor",
  "Mushroom",
  "Feather",
  "Origami",
  "Canyon",
  "Whistle",
  "Mirror",
  "Glacier",
  "Lantern",
  "Spiderweb",
  "Pearl",
  "Cathedral",
  "Foghorn",
  "Dandelion",
  "Suitcase",
  "Magnet",
  "Waterfall",
  "Fireplace",
  "Satellite",
  "Cinnamon",
  "Bridge",
  "Kite",
  "Obsidian",
  "Microphone",
  "Staircase",
  "Comet",
  "Quilt",
  "Oasis",
  "Bicycle",
  "Fossil",
  "Chandelier",
  "Harbor",
  "Labyrinth",
  "Hourglass",
  "Reef",
  "Hammer",
  "Avalanche",
  "Postcard",
  "Candle",
  "Orchid",
  "Anvil",
  "Carousel",
  "Passport",
  "Needle",
  "Galaxy",
  "Teacup",
  "Cliff",
  "Drum",
  "Frost",
  "Crow",
  "Silk",
  "Ember",
  "Mask",
  "River",
  "Wolf",
  "Ink",
  "Tide",
  "Puzzle",
  "Thunder",
  "Sneaker",
  "Clocktower",
  "Dynamite",
  "Chessboard",
  "Spark",
  "Moss",
  "Train",
  "Shadow",
  "Garden",
];

const DIFFICULTY = {
  easy: 2,
  medium: 3,
  chaos: 4,
};

const STARTER = ["Umbrella", "Volcano"];

const state = {
  difficulty: "easy",
  words: [],
  usedStarter: false,
};

const views = {
  home: document.getElementById("home"),
  exercise: document.getElementById("exercise"),
  complete: document.getElementById("complete"),
};

const wordStage = document.getElementById("word-stage");
const form = document.getElementById("answers-form");
const bloomList = document.getElementById("bloom-list");
const completeWords = document.getElementById("complete-words");

function show(name) {
  Object.entries(views).forEach(([key, el]) => {
    const active = key === name;
    el.classList.toggle("is-active", active);
    el.hidden = !active;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pickWords(count) {
  const pool = [...new Set(WORDS)];
  const picked = [];
  while (picked.length < count && pool.length) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

function renderWords() {
  wordStage.replaceChildren();
  state.words.forEach((word, i) => {
    if (i > 0) {
      const plus = document.createElement("span");
      plus.className = "plus";
      plus.textContent = "+";
      plus.style.animationDelay = `${i * 0.08 - 0.04}s`;
      wordStage.append(plus);
    }
    const el = document.createElement("p");
    el.className = "word";
    el.textContent = word;
    el.style.animationDelay = `${i * 0.08}s`;
    wordStage.append(el);
  });
}

function dealWords() {
  const count = DIFFICULTY[state.difficulty];
  if (!state.usedStarter && count === 2) {
    state.words = [...STARTER];
    state.usedStarter = true;
  } else {
    state.words = pickWords(count);
    state.usedStarter = true;
  }
  renderWords();
  form.reset();
}

function setDifficulty(next) {
  state.difficulty = next;
  document.querySelectorAll(".diff-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.difficulty === next);
  });
  dealWords();
}

function startExercise() {
  setDifficulty(state.difficulty);
  show("exercise");
}

function finishExercise(answers) {
  completeWords.textContent = state.words.join(" + ");
  bloomList.replaceChildren(
    ...answers.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    })
  );
  show("complete");
}

document.getElementById("start-btn").addEventListener("click", startExercise);
document.getElementById("back-btn").addEventListener("click", () => show("home"));
document.getElementById("home-btn").addEventListener("click", () => show("home"));
document.getElementById("reshuffle-btn").addEventListener("click", dealWords);
document.getElementById("again-btn").addEventListener("click", startExercise);

document.querySelectorAll(".diff-btn").forEach((btn) => {
  btn.addEventListener("click", () => setDifficulty(btn.dataset.difficulty));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const answers = ["a1", "a2", "a3"].map((key) => String(data.get(key) || "").trim());
  if (answers.some((answer) => !answer)) return;
  finishExercise(answers);
});
