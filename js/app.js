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
      errors: [],
      disabled: [true, true]
    };
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
    nameValidation(name) {
      let nameRegex = /\d/
      if (!nameRegex.test(name)) {
        this.errors['name'] = '';
        this.disabled = [false, this.disabled[1]]
      } else {
        this.errors['name'] = 'Invalid Name';
        this.disabled = [true, this.disabled[1]]
      }
    },
    numberValidation(number) {
      const validationNumber = /^((\+44)|(0)) ?\d{4} ?\d{6}$/;
      if (!number) {  
        this.errors['number'] = 'Please enter your number';
        this.disabled = [this.disabled[0], true]
      }else if (!validationNumber.test(number)) {
        this.errors['number'] = 'Invalid Number';
        this.disabled = [this.disabled[0], true]
      } else {
        this.errors['number'] = '';
        this.disabled = [this.disabled[0], false]
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
