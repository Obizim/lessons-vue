let rootContainer = document.getElementById("app");
import { lessons } from "./lessons.js";

let app = new Vue({
  el: rootContainer,
  data: function () {
    return {
      lessons,
      cart: [],
      search: "",
    };
  },
  methods: {
    addToCart(lesson) {
      this.cart.push(lesson);
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
  },
});
