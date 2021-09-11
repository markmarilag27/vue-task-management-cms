import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import auth from './modules/auth'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    ui,
    auth,
    task
  }
})
