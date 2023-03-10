<script>
export default {
  name: "Checkout",
  props: ['cart']
}
</script>

<template>
  <section class="items">
    <div v-for="item in cart" :key="item.id">
      <div class="item">
        <i><span name="icon"></span></i>
        <div class="details">
          <h3>Subject: {{ item.subject }}</h3>
          <p>Location: {{ item.location }}</p>
          <p>Price: {{ item.price }}</p>
          <p>Spaces: X{{ item.count }}</p>
        </div>
        <button
          class="add-btn">
          Remove from cart
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
</style>
