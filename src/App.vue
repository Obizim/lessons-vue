<script>
import ProductsList from "./components/Lessons.vue";
import Checkout from "./components/Checkout.vue";

export default {
  name: "App",
  data() {
    return {
      currentView: ProductsList,
      products: [],
      cart: [],
      search: "",
      category: null,
      order: null,
      baseUrl:
        "https://restfulapp-env.eba-ymtiuw3d.eu-west-2.elasticbeanstalk.com/lessons",
    };
  },
  components: { ProductsList, Checkout },
  created() {
    fetch(this.baseUrl)
      .then((res) => res.json())
      .then((res) => (this.products = res));

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
  },
  methods: {
    showView() {
      if (this.currentView === ProductsList) {
        this.currentView = Checkout;
      } else {
        this.currentView = ProductsList;
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
    removeFromCart(product) {
      let selectedCartItem = this.cart.findIndex((item) => item.id === product);
      let selectedLesson = this.products.findIndex(
        (item) => item.id === product
      );
      this.products[selectedLesson].count--;
      this.cart[selectedCartItem].count--;
      if (this.cart[selectedCartItem].count === 0) {
        this.cart.splice(selectedCartItem, 1);
      }
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
    searchProducts() {
      const products = this.products.filter(
        (product) =>
          product.subject.toLowerCase().includes(this.search.toLowerCase()) ||
          product.location.toLowerCase().includes(this.search.toLowerCase())
      );
      if (this.order === "ascending") {
        switch (this.category) {
          case "subject":
            return products.sort((a, b) => {
              if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
              return 1;
            });
          case "location":
            return products.sort((a, b) => {
              if (a.location.toLowerCase() < b.location.toLowerCase())
                return -1;
              return 1;
            });
          case "price":
            return products.sort((a, b) => a.price - b.price);
          case "availability":
            return products.sort(
              (a, b) => a.spaces - a.count - (b.spaces - b.count)
            );
        }
      } else if (this.order === "descending") {
        switch (this.category) {
          case "subject":
            return products.sort((a, b) => {
              if (a.subject.toLowerCase() < b.subject.toLowerCase()) return 1;
              return -1;
            });
          case "location":
            return products.sort((a, b) => {
              if (a.location.toLowerCase() < b.location.toLowerCase()) return 1;
              return -1;
            });
          case "price":
            return products.sort((a, b) => b.price - a.price);
          case "availability":
            return products.sort(
              (a, b) => b.spaces - b.count - (a.spaces - a.count)
            );
        }
      }
      return products;
    },
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <button @click="showView" class="c-btn" :disabled="cart.length === 0">
          {{ cartCount }} item(s) in Cart
        </button>
      </div>

      <div class="container mt-4">
        <div class="row">
          <!-- SEARCH & FILTERS  -->
          <div class="col mt-4">
            <input
              type="text"
              placeholder="Search for a lesson"
              v-model="search"
              class="form_input"
            />

            <h5 class="filter-h5">Filters</h5>
            <form>
              <fieldset id="group1" class="border-bottom">
                <div>
                  <input
                    id="subject"
                    type="radio"
                    value="subject"
                    v-model="category"
                    name="group1"
                  />
                  <label for="subject">Subject</label>
                </div>
                <div>
                  <input
                    id="location"
                    type="radio"
                    value="location"
                    v-model="category"
                    name="group1"
                  />
                  <label for="location">Location</label>
                </div>
                <div>
                  <input
                    id="price"
                    type="radio"
                    value="price"
                    v-model="category"
                    name="group1"
                  />
                  <label for="price">Price</label>
                </div>
                <div>
                  <input
                    id="availability"
                    type="radio"
                    value="availability"
                    v-model="category"
                    name="group1"
                  />
                  <label for="availability">Availability</label>
                </div>
              </fieldset>

              <fieldset id="group2" class="mt-4">
                <div>
                  <input
                    id="ascending"
                    type="radio"
                    value="ascending"
                    v-model="order"
                    name="group2"
                  />
                  <label for="ascending">Ascending</label>
                </div>
                <div>
                  <input
                    id="descending"
                    type="radio"
                    value="descending"
                    v-model="order"
                    name="group2"
                  />
                  <label for="descending">Descending</label>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </header>

    <main>
      <component
        :is="currentView"
        :products="searchProducts"
        :cart="itemsInCart"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
      ></component>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.c-btn {
  background-color: #00bd7e;
  color: #fff;
  border: transparent;
  padding: 1rem;
  border-radius: 2px;
  cursor: pointer;
}

fieldset {
  border: 1px solid gray;
  border-radius: 3px;
}
.filter-h5 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.form_input {
  margin: 1rem 0;
  width: 100%;
  padding: 0.5rem;
  border-radius: 2px;
  border: 1px solid gray;
}

input {
  cursor: pointer;
}
.c-btn:disabled {
  background-color: gray;
  text-decoration: line-through;
}
</style>
