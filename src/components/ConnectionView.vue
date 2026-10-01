<script setup>
import { ref, watch } from "vue";
import pinkPaper from "../assets/home/pink-paper.png";
import yellowPaper from "../assets/home/yellow-paper.png";
import bluePaper from "../assets/unstuck/blue-paper.png";
import spark from "../assets/home/spark.png";

const props = defineProps({
  words: { type: Array, required: true },
  difficulty: { type: String, required: true },
});

const emit = defineEmits(["home", "difficulty", "reshuffle", "submit"]);

const answers = ref(["", "", ""]);
const papers = [pinkPaper, yellowPaper, bluePaper];
const levels = [
  { id: "easy", label: "Easy", hint: "2 words" },
  { id: "medium", label: "Medium", hint: "3 words" },
  { id: "chaos", label: "Chaos", hint: "4 words" },
];
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
  <section class="view is-active connection-screen" aria-label="Random Connection">
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
      Random<br />
      <span class="connection-title-em">connection.</span>
    </h1>
    <p class="prompt-intro">
      Unrelated words.<br />
      Make them belong together.
    </p>

    <div class="connection-diff" role="group" aria-label="Difficulty">
      <button
        v-for="level in levels"
        :key="level.id"
        class="connection-level"
        :class="{ 'is-on': difficulty === level.id }"
        type="button"
        @click="emit('difficulty', level.id)"
      >
        {{ level.label }}
        <span>{{ level.hint }}</span>
      </button>
    </div>

    <div class="connection-stage" aria-live="polite">
      <img class="connection-spark" :src="spark" alt="" />
      <p v-for="(word, i) in words" :key="word" class="connection-word">
        <span v-if="i > 0" class="connection-plus">+</span>{{ word }}
      </p>
    </div>

    <p class="unstuck-lead connection-ask">
      Come up with 3 ways these could be connected.
    </p>

    <form class="connection-form" @submit.prevent="onSubmit">
      <label v-for="(answer, i) in answers" :key="i" class="connection-field">
        <span
          class="prompt-n connection-n"
          :style="{ backgroundImage: `url(${papers[i]})` }"
        >{{ i + 1 }}</span>
        <textarea
          v-model="answers[i]"
          rows="3"
          required
          maxlength="400"
          :placeholder="placeholders[i]"
        ></textarea>
      </label>

      <button class="connection-submit" type="submit">
        <span class="unstuck-ready-label">Trace it →</span>
      </button>
      <button class="connection-reshuffle" type="button" @click="emit('reshuffle')">
        <span class="unstuck-ready-label">New words</span>
      </button>
    </form>
  </section>
</template>
