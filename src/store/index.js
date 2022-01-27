import { createStore } from 'vuex'
import app from './modules/app'
import getters from './getters.js'
export default createStore({
  modules: {
    app
  },
    getters
  
})
