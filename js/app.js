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
      this.cart.push(lesson);
      let selectedCartItem = this.cart.find(cart => cart.id === lesson.id)
      if(selectedCartItem) {
        let  selectedLesson = this.lessons.find(item => item.id === lesson.id)
        return selectedLesson.spaces--
      }
    },
    toggle() {
        this.cartOpen = !this.cartOpen
    }
  },
  computed: {
    filteredLessons() {
      return this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(this.search.toLowerCase()) ||
          lesson.location.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
});
