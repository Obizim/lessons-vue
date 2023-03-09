<script setup>
import Lessons from './components/Lessons.vue'
</script>

<template>
  <div id="app">
    <header>
      <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
      <div class="wrapper">
        <button class="c-btn">{itemsCount} Cart</button>
      </div>
    </header>

    <main>
      <Lessons />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin: 2rem 0;
}
.logo {
  /* display: block; */
  margin: 0 auto 2rem;
}
.c-btn {
  background-color: #00BD7E;
  color: #fff;
  border: transparent;
  padding: 1rem;
  border-radius: 2px;
  margin: 1rem 0;
  cursor: pointer;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    flex-direction: column;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
