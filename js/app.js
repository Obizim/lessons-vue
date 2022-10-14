let rootContainer = document.getElementById('app')
import { lessons } from './lessons.js'

let app = new Vue({
    el: rootContainer,
    data: function() {
        return {
            lessons
        }
    },
    methods: {
        
    }
})