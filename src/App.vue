<script setup>
import { ref } from "vue";
import HomeView from "./components/HomeView.vue";
import UnstuckView from "./components/UnstuckView.vue";
import ConnectionView from "./components/ConnectionView.vue";
import UsesView from "./components/UsesView.vue";
import CompleteView from "./components/CompleteView.vue";
import { DIFFICULTY, OBJECTS, pickFrom, pickWords } from "./exercises.js";

const view = ref("home");
const exercise = ref("connection");
const difficulty = ref("easy");
const words = ref([]);
const object = ref(null);
const completePrompt = ref("");
const completeAnswers = ref([]);

function show(name) {
  view.value = name;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function dealWords() {
  words.value = pickWords(DIFFICULTY[difficulty.value]);
}

function setDifficulty(next) {
  difficulty.value = next;
  dealWords();
}

function dealObject() {
  object.value = pickFrom(OBJECTS, object.value);
}

function openConnection() {
  exercise.value = "connection";
  setDifficulty("easy");
  show("connection");
}

function openUses() {
  exercise.value = "uses";
  dealObject();
  show("uses");
}

function openExercise(name) {
  if (name === "uses") openUses();
  else if (name === "unstuck") show("unstuck");
  else openConnection();
}

function continueExercise() {
  if (exercise.value === "uses") openUses();
  else {
    dealWords();
    show("connection");
  }
}

function finishConnection(answers) {
  completePrompt.value = words.value.join(" + ");
  completeAnswers.value = answers;
  show("complete");
}

function finishUses(answers) {
  completePrompt.value = object.value.name;
  completeAnswers.value = answers;
  show("complete");
}
</script>

<template>
  <div
    class="atmosphere"
    :class="{ 'is-quiet': view === 'home' || view === 'unstuck' }"
    aria-hidden="true"
  ></div>

  <main
    :class="{
      'is-home': view === 'home' || view === 'unstuck',
      'is-unstuck': view === 'unstuck',
    }"
  >
    <HomeView v-if="view === 'home'" @open="openExercise" />
    <UnstuckView v-else-if="view === 'unstuck'" @home="show('home')" />
    <ConnectionView
      v-else-if="view === 'connection'"
      :words="words"
      :difficulty="difficulty"
      @home="show('home')"
      @difficulty="setDifficulty"
      @reshuffle="dealWords"
      @submit="finishConnection"
    />
    <UsesView
      v-else-if="view === 'uses'"
      :object="object"
      @home="show('home')"
      @weirder="dealObject"
      @submit="finishUses"
    />
    <CompleteView
      v-else
      :prompt="completePrompt"
      :answers="completeAnswers"
      @again="continueExercise"
      @home="show('home')"
    />
  </main>

  <footer v-if="view !== 'home' && view !== 'unstuck'" class="site-footer">
    <p>© 2026 Robert Niemela</p>
    <a href="https://www.rvniemela.com/">rvniemela.com</a>
  </footer>
</template>
