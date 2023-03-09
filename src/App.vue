<script>
import Lessons from './components/Lessons.vue'
import Checkout from './components/Checkout.vue'

export default {
  name: "Lessons App",
  data() {
    return {
      currentView: Lessons
    }
  },
  methods: {
    showView() {
      if(this.currentView === Lessons){
        this.currentView = Checkout
      }else{
        this.currentView = Lessons
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <button @click="showView" class="c-btn">{itemsCount} Cart</button>
      </div>
    </header>

    <main>
      <component :is="currentView"></component>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin: 2rem 0;
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
