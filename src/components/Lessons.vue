<script>
export default {
  name: "Lessons",
  props: ["products"],
  methods: {
    addToCart(product) {
      this.$emit("add-to-cart", product);
    },
  },
};
</script>

<template>
  <section class="items">
    <div v-for="product in products" :key="product.id">
      <div class="item">
        <i><span name="icon"></span></i>
        <div class="details">
          <h3>Subject: {{ product.subject }}</h3>
          <p>Location: {{ product.location }}</p>
          <p>Price: {{ product.price }}</p>
          <p>Spaces: {{ product.spaces - product.count }}</p>
        </div>
        <button
          class="add-btn"
          @click="addToCart(product)"
          :disabled="product.count === product.spaces">
          Add to cart
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
.item {
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 10px;
}
.add-btn {
  border: transparent;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background-color: #00bd7e;
  cursor: pointer;
  color: #fff;
  border-radius: 2px;
}

.add-btn:disabled {
  background-color: gray;
  text-decoration: line-through;
}
</style>
