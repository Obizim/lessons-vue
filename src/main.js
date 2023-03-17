import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCalculator, faBook, faDna, faFlaskVial, faComputer, faMap, faBus, faBarChart, faAtom, faMusic, faPen, faBiohazard} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCalculator, faBook, faDna, faFlaskVial, faComputer, faMap, faBus, faBarChart, faAtom, faMusic, faPen, faBiohazard)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
