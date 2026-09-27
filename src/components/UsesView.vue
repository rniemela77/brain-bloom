<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { ROUND_SECONDS, formatTime, parseUses } from "../exercises.js";

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
  <section class="view is-active" aria-label="What Else Could It Be?">
    <header class="exercise-top">
      <button class="text-btn" type="button" @click="emit('home')">← Home</button>
      <p class="exercise-kicker">Exercise 02</p>
    </header>

    <h2 class="exercise-title">What Else Could It Be?</h2>
    <p class="exercise-lead">
      Generate more options by inventing uses beyond the obvious.
    </p>

    <div class="word-stage" aria-live="polite">
      <p class="word">{{ object.name }}</p>
    </div>

    <div class="round-meta">
      <p class="timer" :class="timerClass">
        <span class="timer-label">Time</span>
        <span>{{ formatTime(remaining) }}</span>
      </p>
      <p class="challenge">
        Come up with <strong>5 things</strong> you could use it for that aren't
        {{ object.usual }}.
      </p>
    </div>

    <form class="answers" @submit.prevent="onSubmit">
      <label class="uses-label">
        <span class="visually-hidden">Your other uses</span>
        <textarea
          ref="input"
          v-model="usesText"
          class="uses-box"
          rows="10"
          maxlength="1200"
          placeholder="List 5 other uses. Fast is fine. Weird is better."
        ></textarea>
      </label>

      <p class="uses-status" aria-live="polite">{{ status }}</p>

      <div class="actions">
        <button class="btn btn-primary" type="submit">Trace it</button>
        <button class="btn btn-ghost" type="button" @click="emit('weirder')">
          Give me a weirder object
        </button>
      </div>
    </form>

    <aside class="why">
      <h3>Why it works</h3>
      <p>
        It’s practice at seeing more than the obvious use — a basic move
        in coming up with ideas.
      </p>
    </aside>
  </section>
</template>
