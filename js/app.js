let rootContainer = document.getElementById("app");
import { lessons } from "./lessons.js";

let app = new Vue({
  el: rootContainer,
  data: function () {
    return {
      lessons,
      cart: [],
      search: "",
      name: '',
      number: '',
      radioBtn: {
        category: null,
        mode: null
      },
      show: false,
      modalOpen: false,
      errors: {
        name: '',
        number: ""
      },
    };
  },
  watch: {
    name(value) {
      this.name = value
      this.nameValidation(value)
    },
    number(value) {
      this.number = value
      this.numberValidation(value)
    }
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
      this.modalOpen = !this.modalOpen
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
      let namePattern = /\d/
      if(namePattern.test(this.name)){
        this.errors.name = "Valid name required"
      }else {
        this.errors.name = ""
      }
    },
    numberValidation() {
      const validationRegex = /^[0-9+\(\)#\.\s\/ext-]+$/;
      if (validationRegex.test(this.number) === false) {
        this.errors.number = "Valid number required"
      }else if(this.number.length > 0 && this.number.length < 11) {
        this.errors.number = "Minimum of 11 numbers"
      }else {
       this.errors.number = ""
      }
    }
  },
  computed: {
    searchLessons() {
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
    filterLessons() {
    }
  },
});
