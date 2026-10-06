<script setup>
import pinkPaper from "../assets/home/pink-paper.png";
import yellowPaper from "../assets/home/yellow-paper.png";
import bluePaper from "../assets/unstuck/blue-paper.png";
import standsMountains from "../assets/unstuck/stands-mountains.png";

defineProps({
  prompt: { type: String, required: true },
  answers: { type: Array, required: true },
});

defineEmits(["again", "home"]);

const papers = [pinkPaper, yellowPaper, bluePaper];
</script>

<template>
  <section class="view is-active connection-screen complete-screen" aria-label="Your trace">
    <img class="complete-mountain" :src="standsMountains" alt="" />
    <header class="unstuck-bar">
      <button class="unstuck-back" type="button" aria-label="Back" @click="$emit('home')">
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
      Your brain just<br />
      did something<br />
      <span class="connection-title-em">unusual.</span>
    </h1>
    <p class="prompt-intro">{{ prompt }}</p>

    <ol class="connection-results">
      <li v-for="(answer, i) in answers" :key="i">
        <span
          class="prompt-n"
          :style="{ backgroundImage: `url(${papers[i % papers.length]})` }"
        >{{ i + 1 }}</span>
        <p>{{ answer }}</p>
      </li>
    </ol>

    <button class="connection-submit complete-again" type="button" @click="$emit('again')">
      <span class="unstuck-ready-label">Do it again</span>
    </button>
    <button class="connection-reshuffle" type="button" @click="$emit('home')">
      <span class="unstuck-ready-label">Back home</span>
    </button>
  </section>
</template>
