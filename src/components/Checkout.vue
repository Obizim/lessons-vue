<script>
export default {
  name: "Checkout",
  props: ["cart"],
  data() {
    return {
      name: "",
      number: "",
      disabled: [true, true]
    }
  },
  watch: {
    name(value) {
      this.nameValidation(value);
    },
    number(value) {
      this.numberValidation(value);
    },
  },
  methods: {
    removeFromCart(product) {
      this.$emit("remove-from-cart", product);
    },
    nameValidation(name) {
      let nameRegex = /\d/
      if (!nameRegex.test(name)) {
        this.disabled = [false, this.disabled[1]]
      } else {
        this.disabled = [true, this.disabled[1]]
      }
    },
    numberValidation(number) {
      const validationNumber = /^((\+44)|(0)) ?\d{4} ?\d{6}$/;
      if (!number) {
        this.disabled = [this.disabled[0], true]
      }else if (!validationNumber.test(number)) {
        this.disabled = [this.disabled[0], true]
      } else {
        this.disabled = [this.disabled[0], false]
      }
    },
    formSubmit(e){ 
      e.preventDefault()
      alert("Submitted Successfully")
      window.location.reload()
    }
  },
};
</script>

<template>
  <main>
    <h5 class="h5-title">Cart Items</h5>
    <section class="items">
      <div v-for="item in cart" :key="item.id">
        <div class="item">
          <i><span name="icon"></span></i>
          <div class="details">
            <h3>Subject: {{ item.subject }}</h3>
            <p>Location: {{ item.location }}</p>
            <p>Price: £{{ item.price }}</p>
            <p>Spaces: X{{ item.count }}</p>
          </div>
          <button class="add-btn" @click="removeFromCart(item.id)">
            Remove from cart
          </button>
        </div>
      </div>
    </section>

    <form @submit="formSubmit">
      <div class="form-group">
          <label for="exampleInputName">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputName"
            placeholder="Enter Name"
            v-model="name"
          />
        </div>
      <div class="form-group">
          <label for="exampleInputNumber">Number</label>
          <input
            type="tel"
            class="form-control"
            id="exampleInputNumber"
            placeholder="Enter a valid number"
            v-model="number"
          />
      </div>
      <button type="submit" class="btn" :disabled="!disabled.every(i => i === false)">Checkout</button>
    </form>
  </main>
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
.h5-title {
  font-size: 1.2rem;
  margin: 1rem 0;
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

form{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  border-top: 1px solid gray;
  padding: 1rem 0;
}

form input {
  border: 1px solid gray;
  padding: .7rem;
  border-radius: 2px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.btn {
  background-color: #00bd7e;
  color: #fff;
  width: max-content;
  padding: 1rem;
  border: transparent;
  cursor: pointer;
}

.btn:disabled {
  background-color: gray;
  text-decoration: line-through;
}
</style>
