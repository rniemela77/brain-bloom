<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  words: { type: Array, required: true },
  difficulty: { type: String, required: true },
});

const emit = defineEmits(["home", "difficulty", "reshuffle", "submit"]);

const answers = ref(["", "", ""]);
const placeholders = [
  "A story, a product, a joke, a scene…",
  "Another way — different angle.",
  "One more. Weirder is better.",
];

watch(
  () => props.words,
  () => {
    answers.value = ["", "", ""];
  }
);

function onSubmit() {
  const trimmed = answers.value.map((answer) => answer.trim());
  if (trimmed.some((answer) => !answer)) return;
  emit("submit", trimmed);
}
</script>

<template>
  <section class="view is-active" aria-label="Random Connection">
    <header class="exercise-top">
      <button class="text-btn" type="button" @click="emit('home')">← Home</button>
      <p class="exercise-kicker">Exercise 01</p>
    </header>

    <h2 class="exercise-title">Random Connection</h2>
    <p class="exercise-lead">
      Generate new ideas by connecting ones that don’t usually go together.
    </p>

    <div class="difficulty" role="group" aria-label="Difficulty">
      <button
        class="diff-btn"
        :class="{ 'is-active': difficulty === 'easy' }"
        type="button"
        @click="emit('difficulty', 'easy')"
      >
        Easy
        <span>2 words</span>
      </button>
      <button
        class="diff-btn"
        :class="{ 'is-active': difficulty === 'medium' }"
        type="button"
        @click="emit('difficulty', 'medium')"
      >
        Medium
        <span>3 words</span>
      </button>
      <button
        class="diff-btn"
        :class="{ 'is-active': difficulty === 'chaos' }"
        type="button"
        @click="emit('difficulty', 'chaos')"
      >
        Chaos
        <span>4 words</span>
      </button>
    </div>

    <div class="word-stage" aria-live="polite">
      <template v-for="(word, i) in words" :key="word">
        <span
          v-if="i > 0"
          class="plus"
          :style="{ animationDelay: `${i * 0.08 - 0.04}s` }"
        >+</span>
        <p class="word" :style="{ animationDelay: `${i * 0.08}s` }">{{ word }}</p>
      </template>
    </div>

    <p class="challenge">
      Come up with <strong>3 ways</strong> these could be connected.
    </p>

    <form class="answers" @submit.prevent="onSubmit">
      <label v-for="(answer, i) in answers" :key="i">
        <span class="answer-n">{{ i + 1 }}</span>
        <textarea
          v-model="answers[i]"
          rows="3"
          required
          maxlength="400"
          :placeholder="placeholders[i]"
        ></textarea>
      </label>

      <div class="actions">
        <button class="btn btn-primary" type="submit">Trace it</button>
        <button class="btn btn-ghost" type="button" @click="emit('reshuffle')">
          New words
        </button>
      </div>
    </form>

    <aside class="why">
      <h3>Why it works</h3>
      <p>
        It trains the brain to make unusual associations — the basic
        building block of a lot of creative thinking.
      </p>
    </aside>
  </section>
</template>
