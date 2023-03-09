<script setup>
</script>

<template>
  <div class="items">
    <div class="item">
      <i><span name="icon"></span></i>
      <div class="details">
        <h3>Subject: Chemistry</h3>
        <p>Location: London</p>
        <p>Price: 300</p>
        <p>Spaces: 2</p>
      </div>
      <button class="add-btn">Add to cart</button>
    </div>
  </div>
</template>

<style scoped>
  .items {
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    gap: 1rem;
  }
  .item {
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 10px;
  }

  .add-btn {
    border: transparent;
    padding: .5rem 1rem;
    margin: 1rem 0;
    background-color: #00BD7E;
    cursor: pointer;
    color: #fff;
    border-radius: 2px;
  }
</style>
