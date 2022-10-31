let rootContainer = document.getElementById("app");
import { lessons } from "./lessons.js";

let app = new Vue({
  el: rootContainer,
  data: function () {
    return {
      lessons,
      cart: [],
      search: "",
      name: "",
      number: "",
      category: null,
      order: null,
      show: false,
      modalOpen: false,
      errors: {
        name: "",
        number: "",
      },
    };
  },
  watch: {
    name(value) {
      this.name = value;
      this.nameValidation(value);
    },
    number(value) {
      this.number = value;
      this.numberValidation(value);
    },
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
    toggleModal() {
      this.modalOpen = !this.modalOpen;
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
    nameValidation() {
      let namePattern = /\d/;
      if (namePattern.test(this.name)) {
        this.errors.name = "Valid name required";
      } else {
        this.errors.name = "";
      }
    },
    numberValidation() {
      const validationRegex = /^[0-9+\(\)#\.\s\/ext-]+$/;
      if (validationRegex.test(this.number) === false) {
        this.errors.number = "Valid number required";
      } else if (this.number.length > 0 && this.number.length < 11) {
        this.errors.number = "Minimum of 11 numbers";
      } else {
        this.errors.number = "";
      }
    },
  },
  computed: {
    searchLessons() {
     const lessons = this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(this.search.toLowerCase()) ||
          lesson.location.toLowerCase().includes(this.search.toLowerCase())
      );

      if (this.order === "ascending") {
        switch (this.category) {
          case "subject":
            return lessons.sort((a, b) => {
              if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1;
              return 1;
            });
          case "location":
            return lessons.sort((a, b) => {
              if (a.location.toLowerCase() < b.location.toLowerCase())
                return -1;
              return 1;
            });
          case "price":
            return lessons.sort((a, b) => a.price - b.price);
          case "availability":
            return lessons.sort(
              (a, b) => a.spaces - a.count - (b.spaces - b.count)
            );
        }
      }else if(this.order === "descending"){
        switch (this.category) {
          case "subject":
            return lessons.sort((a, b) => {
              if (a.subject.toLowerCase() < b.subject.toLowerCase()) return 1;
              return -1;
            });
          case "location":
            return lessons.sort((a, b) => {
              if (a.location.toLowerCase() < b.location.toLowerCase()) return 1;
              return -1;
            });
          case "price":
            return lessons.sort((a, b) => b.price - a.price);
          case "availability":
            return lessons.sort(
              (a, b) => (b.spaces - b.count )- (a.spaces - a.count)
            );
        }
      }
      return lessons
    },
    cartCount() {
      return this.lessons.reduce(function (acc, obj) {
        return acc + obj.count;
      }, 0);
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
