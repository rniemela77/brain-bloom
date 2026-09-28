<script setup>
import { ref } from "vue";
import ridge from "../assets/unstuck/ridge.png";
import figure from "../assets/unstuck/figure.png";
import underline from "../assets/unstuck/underline.png";
import scribble from "../assets/unstuck/scribble.png";
import rock from "../assets/unstuck/rock.png";
import pinkPaper from "../assets/home/pink-paper.png";
import yellowPaper from "../assets/home/yellow-paper.png";
import bluePaper from "../assets/unstuck/blue-paper.png";
import blueScrap from "../assets/unstuck/blue-strip.png";
import spark from "../assets/home/spark.png";

const emit = defineEmits(["home"]);
const step = ref(1);

const prompts = [
  {
    n: "1",
    paper: pinkPaper,
    text: "What if the opposite were true?",
  },
  {
    n: "2",
    paper: yellowPaper,
    text: "What would a 5-year-old suggest?",
  },
  {
    n: "3",
    paper: bluePaper,
    text: "What would someone from a completely different field suggest?",
  },
];

const angles = [
  {
    n: "1",
    paper: pinkPaper,
    title: "Reverse it",
    text: "What if the goal wasn’t to solve it, but to make it worse on purpose? What might that reveal?",
  },
  {
    n: "2",
    paper: yellowPaper,
    title: "Shrink it",
    text: "What’s the smallest possible step you could take?",
    spark: true,
  },
  {
    n: "3",
    paper: bluePaper,
    title: "Borrow it",
    text: "How might someone from a completely different field approach this? Imagine a chef, a comedian, or an astronaut.",
  },
];

function back() {
  if (step.value > 1) {
    step.value -= 1;
    window.scrollTo({ top: 0 });
    return;
  }
  emit("home");
}

function ready() {
  step.value = 2;
  window.scrollTo({ top: 0 });
}

function takeAMoment() {
  step.value = 3;
  window.scrollTo({ top: 0 });
}

</script>

<template>
  <section class="view is-active unstuck" aria-label="Get Unstuck">
    <header class="unstuck-bar">
      <button class="unstuck-back" type="button" aria-label="Back" @click="back">
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
      <p class="unstuck-step">{{ step }} / 5</p>
    </header>

    <template v-if="step === 1">
      <h1 class="unstuck-title">
        Think of a<br />
        situation in your<br />
        <span class="unstuck-marked">
          life right now.
          <img class="unstuck-underline" :src="underline" alt="" />
        </span>
      </h1>

      <p class="unstuck-lead">A challenge. A question. Something that feels stuck.</p>
      <p class="unstuck-note">
        You don’t need to tell us anything.<br />
        Just bring it to mind.
      </p>

      <div class="unstuck-scene">
        <img class="scene-scribble" :src="scribble" alt="" />
        <img class="scene-ridge" :src="ridge" alt="" />
        <img class="scene-figure" :src="figure" alt="" />
      </div>
    </template>

    <template v-else-if="step === 2">
      <h1 class="unstuck-title prompt-title">
        Let’s find<br />
        three <span class="unusual">unusual</span><br />
        ways to look at it.
      </h1>

      <p class="prompt-intro">
        Here are some prompts to get<br />
        your mind moving.
      </p>

      <ol class="prompt-list">
        <li v-for="prompt in prompts" :key="prompt.n">
          <span
            class="prompt-n"
            :style="{ backgroundImage: `url(${prompt.paper})` }"
          >{{ prompt.n }}</span>
          <span class="prompt-text">{{ prompt.text }}</span>
        </li>
      </ol>

      <div class="prompt-scene">
        <img class="prompt-rock" :src="rock" alt="" />
      </div>
    </template>

    <template v-else>
      <h1 class="angles-title">
        Three<br />
        <span class="angles-marked">
          new angles.
          <img class="angles-stroke" :src="pinkPaper" alt="" />
        </span>
      </h1>

      <p class="prompt-intro">
        Here are a few unexpected perspectives<br />
        to consider.
      </p>

      <ol class="angle-list">
        <li v-for="angle in angles" :key="angle.n">
          <span class="prompt-n" :style="{ backgroundImage: `url(${angle.paper})` }">{{
            angle.n
          }}</span>
          <div class="angle-copy">
            <p class="angle-name">{{ angle.title }}</p>
            <p class="angle-text">{{ angle.text }}</p>
          </div>
          <img v-if="angle.spark" class="angle-spark" :src="spark" alt="" />
        </li>
      </ol>

      <div class="angles-foot">
        <img class="angles-scrap" :src="blueScrap" alt="" />
        <p class="angles-another">Try another set →</p>
      </div>
    </template>

    <button v-if="step === 1" class="unstuck-ready" type="button" @click="ready">
      <span class="unstuck-ready-label">I’m ready →</span>
    </button>
    <button v-else-if="step === 2" class="unstuck-ready" type="button" @click="takeAMoment">
      <span class="unstuck-ready-label">Take a moment →</span>
    </button>
  </section>
</template>
