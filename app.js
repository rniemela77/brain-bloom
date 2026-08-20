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

const OBJECTS = [
  { name: "A paperclip", usual: "holding paper together" },
  { name: "A shoelace", usual: "tying shoes" },
  { name: "A cardboard box", usual: "storing things" },
  { name: "A spoon", usual: "eating" },
  { name: "A brick", usual: "building walls" },
  { name: "A rubber band", usual: "holding a bundle together" },
  { name: "A pencil", usual: "writing" },
  { name: "A sock", usual: "wearing on a foot" },
  { name: "A coin", usual: "paying for things" },
  { name: "A key", usual: "opening locks" },
  { name: "A mug", usual: "drinking" },
  { name: "A comb", usual: "fixing hair" },
  { name: "A towel", usual: "drying off" },
  { name: "A belt", usual: "holding up pants" },
  { name: "A chair", usual: "sitting" },
  { name: "A book", usual: "reading" },
  { name: "A coat hanger", usual: "hanging clothes" },
  { name: "A straw", usual: "sipping a drink" },
  { name: "A toothbrush", usual: "cleaning teeth" },
  { name: "A napkin", usual: "wiping your mouth" },
  { name: "A tennis ball", usual: "playing tennis" },
  { name: "A clothespin", usual: "hanging laundry" },
  { name: "A ruler", usual: "measuring" },
  { name: "A stapler", usual: "fastening paper" },
  { name: "A wine cork", usual: "sealing a bottle" },
  { name: "A rolling pin", usual: "flattening dough" },
  { name: "A frisbee", usual: "throwing" },
  { name: "A funnel", usual: "pouring" },
  { name: "A doormat", usual: "wiping shoes" },
  { name: "A lampshade", usual: "covering a bulb" },
];

const DIFFICULTY = {
  easy: 2,
  medium: 3,
  chaos: 4,
};

const ROUND_SECONDS = 60;

const state = {
  exercise: "connection",
  difficulty: "easy",
  words: [],
  object: null,
  remaining: ROUND_SECONDS,
};

let timerId = null;

const views = {
  home: document.getElementById("home"),
  connection: document.getElementById("connection"),
  uses: document.getElementById("uses"),
  complete: document.getElementById("complete"),
};

const wordStage = document.getElementById("word-stage");
const objectStage = document.getElementById("object-stage");
const form = document.getElementById("answers-form");
const usesForm = document.getElementById("uses-form");
const usesInput = document.getElementById("uses-input");
const usesChallenge = document.getElementById("uses-challenge");
const usesStatus = document.getElementById("uses-status");
const usesTimer = document.getElementById("uses-timer");
const timerDisplay = document.getElementById("timer-display");
const traceList = document.getElementById("trace-list");
const completeWords = document.getElementById("complete-words");

function show(name) {
  Object.entries(views).forEach(([key, el]) => {
    const active = key === name;
    el.classList.toggle("is-active", active);
    el.hidden = !active;
  });
  if (name !== "uses") stopTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pickFrom(list, avoid) {
  const pool = list.filter((item) => item !== avoid);
  const source = pool.length ? pool : list;
  return source[Math.floor(Math.random() * source.length)];
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
  state.words = pickWords(DIFFICULTY[state.difficulty]);
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

function renderObject() {
  const word = document.createElement("p");
  word.className = "word";
  word.textContent = state.object.name;
  objectStage.replaceChildren(word);

  const strong = document.createElement("strong");
  strong.textContent = "5 things";
  usesChallenge.replaceChildren(
    "Come up with ",
    strong,
    ` you could use it for that aren't ${state.object.usual}.`
  );
}

function dealObject() {
  state.object = pickFrom(OBJECTS, state.object);
  usesInput.value = "";
  usesStatus.textContent = "";
  renderObject();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(state.remaining);
  usesTimer.classList.toggle("is-low", state.remaining <= 10 && state.remaining > 0);
  usesTimer.classList.toggle("is-up", state.remaining <= 0);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function onTimeUp() {
  stopTimer();
  state.remaining = 0;
  renderTimer();
  usesStatus.textContent = "Time. Trace what you have.";
  usesInput.focus();
}

function startTimer() {
  stopTimer();
  state.remaining = ROUND_SECONDS;
  renderTimer();
  usesStatus.textContent = "";
  timerId = setInterval(() => {
    state.remaining -= 1;
    renderTimer();
    if (state.remaining <= 0) onTimeUp();
  }, 1000);
}

function openConnection() {
  state.exercise = "connection";
  setDifficulty("easy");
  show("connection");
}

function openUses() {
  state.exercise = "uses";
  dealObject();
  show("uses");
  startTimer();
}

function continueExercise() {
  if (state.exercise === "uses") openUses();
  else {
    dealWords();
    show("connection");
  }
}

function finishExercise(answers, prompt) {
  completeWords.textContent = prompt;
  traceList.replaceChildren(
    ...answers.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    })
  );
  show("complete");
}

function parseUses(text) {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);
}

document.getElementById("about-jump").addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("about").scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
  });
});

document.querySelectorAll("[data-exercise]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.exercise === "uses") openUses();
    else openConnection();
  });
});
document.querySelectorAll(".js-home").forEach((btn) => {
  btn.addEventListener("click", () => show("home"));
});
document.getElementById("reshuffle-btn").addEventListener("click", dealWords);
document.getElementById("weirder-btn").addEventListener("click", () => {
  dealObject();
  startTimer();
});
document.getElementById("again-btn").addEventListener("click", continueExercise);

document.querySelectorAll(".diff-btn").forEach((btn) => {
  btn.addEventListener("click", () => setDifficulty(btn.dataset.difficulty));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const answers = ["a1", "a2", "a3"].map((key) => String(data.get(key) || "").trim());
  if (answers.some((answer) => !answer)) return;
  finishExercise(answers, state.words.join(" + "));
});

usesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = parseUses(usesInput.value);
  if (!answers.length) {
    usesInput.focus();
    return;
  }
  finishExercise(answers, state.object.name);
});
