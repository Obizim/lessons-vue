<script>
import Lessons from "./components/Lessons.vue";
import Checkout from "./components/Checkout.vue";
import products from "./components/lessons.json";

export default {
  name: "App",
  data() {
    return {
      currentView: Lessons,
      products: products,
      cart: [],
    };
  },
  components: { Lessons, Checkout },
  methods: {
    showView() {
      if (this.currentView === Lessons) {
        this.currentView = Checkout;
      } else {
        this.currentView = Lessons;
      }
    },
    addToCart(product) {
      let selectedCartItem = this.cart.findIndex(
        (cart) => cart.id === product.id
      );
      if (selectedCartItem > -1) {
        this.cart[selectedCartItem].count++;
      } else {
        this.cart.push({ id: product.id, count: 1 });
      }
      let selectedLesson = this.products.find((item) => item.id === product.id);
      return selectedLesson.count++;
    },
  },
  computed: {
    cartCount() {
      return this.products.reduce(function (acc, obj) {
        return acc + obj.count;
      }, 0);
    },
    itemsInCart() {
      const item = this.cart.map((i) => {
        let selectedLesson = this.products.find((item) => item.id === i.id);
        return { ...selectedLesson, ...i };
      });
      return item;
    },
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <button @click="showView" class="c-btn">
          {{ cartCount }} item(s) in Cart
        </button>
      </div>
    </header>

    <main>
      <component
        :is="currentView"
        :products="products"
        :cart="itemsInCart"
        @add-to-cart="addToCart"
      ></component>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin: 2rem 0;
}
.c-btn {
  background-color: #00bd7e;
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
