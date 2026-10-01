<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { ROUND_SECONDS, formatTime, parseUses } from "../exercises.js";
import pinkPaper from "../assets/home/pink-paper.png";

const props = defineProps({
  object: { type: Object, required: true },
});

const emit = defineEmits(["home", "weirder", "submit"]);

const usesText = ref("");
const status = ref("");
const remaining = ref(ROUND_SECONDS);
const input = ref(null);
let timerId = null;

const timerClass = computed(() => ({
  "is-low": remaining.value <= 10 && remaining.value > 0,
  "is-up": remaining.value <= 0,
}));

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function onTimeUp() {
  stopTimer();
  remaining.value = 0;
  status.value = "Time. Trace what you have.";
  input.value?.focus();
}

function startTimer() {
  stopTimer();
  remaining.value = ROUND_SECONDS;
  status.value = "";
  timerId = setInterval(() => {
    remaining.value -= 1;
    if (remaining.value <= 0) onTimeUp();
  }, 1000);
}

function resetRound() {
  usesText.value = "";
  startTimer();
}

function onSubmit() {
  const answers = parseUses(usesText.value);
  if (!answers.length) {
    input.value?.focus();
    return;
  }
  emit("submit", answers);
}

watch(() => props.object, resetRound);

onMounted(startTimer);
onUnmounted(stopTimer);
</script>

<template>
  <section class="view is-active connection-screen uses-screen" aria-label="What Else Could It Be?">
    <header class="unstuck-bar">
      <button class="unstuck-back" type="button" aria-label="Back" @click="emit('home')">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 5 8 12l7 7"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </header>

    <h1 class="unstuck-title connection-title">
      What else<br />
      <span class="connection-title-em">could it be?</span>
    </h1>
    <p class="prompt-intro">
      An ordinary object. Five other uses.<br />
      60 seconds.
    </p>

    <div class="uses-stage">
      <p class="connection-word">{{ object.name }}</p>
      <p class="uses-time" :class="timerClass">
        <img class="uses-pink" :src="pinkPaper" alt="" />
        <span class="visually-hidden">Time remaining</span>
        <span class="uses-time-value">{{ formatTime(remaining) }}</span>
      </p>
    </div>

    <p class="unstuck-lead connection-ask">
      Come up with 5 things you could use it for that aren’t {{ object.usual }}.
    </p>

    <form class="connection-form" @submit.prevent="onSubmit">
      <label class="uses-label">
        <span class="visually-hidden">Your other uses</span>
        <textarea
          ref="input"
          v-model="usesText"
          rows="8"
          maxlength="1200"
          placeholder="List 5 other uses. Fast is fine. Weird is better."
        ></textarea>
      </label>

      <p class="uses-status" aria-live="polite">{{ status }}</p>

      <button class="connection-submit" type="submit">
        <span class="unstuck-ready-label">Trace it →</span>
      </button>
      <button class="connection-reshuffle" type="button" @click="emit('weirder')">
        <span class="unstuck-ready-label">Give me a weirder object</span>
      </button>
    </form>
  </section>
</template>
