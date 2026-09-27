<script setup>
defineProps({
  prompt: { type: String, required: true },
  answers: { type: Array, required: true },
});

defineEmits(["again", "home"]);
</script>

<template>
  <section class="view is-active" aria-label="Your trace">
    <p class="exercise-kicker">Nice work</p>
    <h2 class="exercise-title">Your brain just did something unusual.</h2>
    <p class="exercise-lead">{{ prompt }}</p>
    <ol class="trace-list">
      <li v-for="(answer, i) in answers" :key="i">{{ answer }}</li>
    </ol>
    <div class="actions">
      <button class="btn btn-primary" type="button" @click="$emit('again')">
        Another round
      </button>
      <button class="btn btn-ghost" type="button" @click="$emit('home')">
        Back home
      </button>
    </div>
  </section>
</template>
