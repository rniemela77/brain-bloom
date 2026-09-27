<script setup>
const emit = defineEmits(["open"]);

function jumpToAbout() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("about")?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
  });
}
</script>

<template>
  <section id="home" class="view is-active" aria-label="Welcome">
    <div class="home-hero">
      <div class="home-mark" aria-hidden="true">
        <svg viewBox="0 0 72 72" fill="none">
          <path
            d="M34 54C22 50 14 38 12 18"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
          />
          <path
            d="M34 54C36 38 42 22 46 10"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
          />
          <path
            d="M34 54C48 52 60 46 64 30"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
          />
          <circle cx="34" cy="54" r="3.4" fill="currentColor" />
          <circle cx="12" cy="18" r="3" fill="currentColor" />
          <circle cx="46" cy="10" r="4.3" fill="currentColor" />
          <circle cx="64" cy="30" r="3.2" fill="currentColor" />
        </svg>
      </div>
      <h1 class="wordmark">Ether Trace</h1>
      <p class="tagline">A tiny workout for your imagination.</p>
      <div class="exercise-picks">
        <button class="pick" type="button" @click="emit('open', 'connection')">
          <span class="pick-n">01</span>
          <span class="pick-title">Random Connection</span>
          <span class="pick-lead">Unrelated words. Make them belong together.</span>
        </button>
        <button class="pick" type="button" @click="emit('open', 'uses')">
          <span class="pick-n">02</span>
          <span class="pick-title">What Else Could It Be?</span>
          <span class="pick-lead">An ordinary object. Five other uses. 60 seconds.</span>
        </button>
      </div>
      <button class="text-btn about-jump" type="button" @click="jumpToAbout">
        What’s this?
      </button>
    </div>

    <article id="about" class="about">
      <p class="exercise-kicker">About</p>
      <h2 class="about-title">Short exercises for your imagination.</h2>

      <div class="about-prose">
        <p>
          Ether Trace helps you practice coming up with ideas. Each
          exercise takes a few minutes.
        </p>
        <p>
          Right now there are two. Random Connection gives you unrelated
          words and asks how they could be connected. What Else Could It
          Be? gives you an ordinary object and asks what else you could
          use it for.
        </p>
        <p>
          Linking things that don’t usually go together is a basic part of
          creative thinking. The more you do it, the easier it gets.
        </p>
        <p>No account. No score. More exercises later.</p>
      </div>
    </article>
  </section>
</template>
