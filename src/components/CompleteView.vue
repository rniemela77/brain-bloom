<script setup>
import pinkPaper from "../assets/home/pink-paper.png";
import yellowPaper from "../assets/home/yellow-paper.png";
import bluePaper from "../assets/unstuck/blue-paper.png";

defineProps({
  prompt: { type: String, required: true },
  answers: { type: Array, required: true },
});

defineEmits(["again", "home"]);

const papers = [pinkPaper, yellowPaper, bluePaper];
</script>

<template>
  <section class="view is-active connection-screen" aria-label="Your trace">
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

    <button class="connection-submit" type="button" @click="$emit('again')">
      <span class="unstuck-ready-label">Another round →</span>
    </button>
    <button class="connection-reshuffle" type="button" @click="$emit('home')">
      <span class="unstuck-ready-label">Back home</span>
    </button>
  </section>
</template>
