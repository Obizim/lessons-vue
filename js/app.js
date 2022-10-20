let rootContainer = document.getElementById("app");
import { lessons } from "./lessons.js";

let app = new Vue({
  el: rootContainer,
  data: function () {
    return {
      lessons,
      cart: [],
      search: "",
      cartOpen: false,
    };
  },
  methods: {
    addToCart(lesson) {
      let selectedCartItem = this.cart.findIndex(
        (cart) => cart.id === lesson.id
      );
      if (selectedCartItem > -1) {
        this.cart[selectedCartItem].count++;
      } else {
        this.cart.push({ id: lesson.id, count: 1 });
      }
      let selectedLesson = this.lessons.find((item) => item.id === lesson.id);
      return selectedLesson.count++;
    },
    toggle() {
      this.cartOpen = !this.cartOpen;
    },
    removeFromCart(lesson) {
      let selectedCartItem = this.cart.findIndex((item) => item.id === lesson);
      let selectedLesson = this.lessons.findIndex((item) => item.id === lesson);
      this.lessons[selectedLesson].count--;
      this.cart[selectedCartItem].count--;
      if (this.cart[selectedCartItem].count === 0) {
        this.cart.splice(selectedCartItem, 1);
      }
    },
  },
  computed: {
    filteredLessons() {
      return this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(this.search.toLowerCase()) ||
          lesson.location.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    itemsInCart() {
      const item = this.cart.map((i) => {
        let selectedLesson = this.lessons.find((item) => item.id === i.id);
        return { ...selectedLesson, ...i };
      });
      return item;
    },
  },
});
