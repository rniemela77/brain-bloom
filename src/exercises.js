export const WORDS = [
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

export const OBJECTS = [
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

export const DIFFICULTY = {
  easy: 2,
  medium: 3,
  chaos: 4,
};

export const ROUND_SECONDS = 60;

export function pickFrom(list, avoid) {
  const pool = list.filter((item) => item !== avoid);
  const source = pool.length ? pool : list;
  return source[Math.floor(Math.random() * source.length)];
}

export function pickWords(count) {
  const pool = [...new Set(WORDS)];
  const picked = [];
  while (picked.length < count && pool.length) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

export function parseUses(text) {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);
}
