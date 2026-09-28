<script setup>
import yellowPaper from "../assets/home/yellow-paper.png";
import pinkPaper from "../assets/home/pink-paper.png";
import spark from "../assets/home/spark.png";

const emit = defineEmits(["open"]);

const paths = [
  {
    id: "unstuck",
    title: "Get Unstuck",
    lead: ["A quick shift in perspective", "(5 min)"],
    featured: true,
    exercise: "unstuck",
  },
  {
    id: "connection",
    title: "Random Connection",
    lead: ["Unrelated words.", "Make them belong together."],
    exercise: "connection",
  },
  {
    id: "uses",
    title: "What Else Could It Be?",
    lead: ["An ordinary object. Five other uses.", "60 seconds."],
    exercise: "uses",
  },
];
</script>

<template>
  <section id="home" class="view is-active home-screen" aria-label="Welcome">
    <header class="home-bar">
      <p class="home-logo"><span class="home-logo-off">Off</span>script</p>
      <button class="home-account" type="button" aria-label="Account">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="3.15" stroke="currentColor" stroke-width="1.7" />
          <path
            d="M5.2 19.4c1.35-2.7 3.55-4 6.8-4s5.45 1.3 6.8 4"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </header>

    <h1 class="home-question">
      <span class="home-question-line">Where do you want</span>
      to go today?
    </h1>

    <div class="home-paths">
      <div
        v-for="path in paths"
        :key="path.id"
        class="path-slot"
        :class="`path-slot-${path.id}`"
      >
        <img
          v-if="path.featured"
          class="path-spark"
          :src="spark"
          alt=""
        />
        <img
          v-if="path.id === 'uses'"
          class="path-pink"
          :src="pinkPaper"
          alt=""
        />
        <button
          class="path"
          :class="{ 'path-unstuck': path.featured }"
          :style="path.featured ? { backgroundImage: `url(${yellowPaper})` } : undefined"
          type="button"
          @click="path.exercise && emit('open', path.exercise)"
        >
          <span class="path-copy">
            <span class="path-title">{{ path.title }}</span>
            <span class="path-lead">
              <template v-for="(line, index) in path.lead" :key="line">
                <br v-if="index" />
                {{ line }}
              </template>
            </span>
          </span>
          <span class="path-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h13M13.5 6.5 19 12l-5.5 5.5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
