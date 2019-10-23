import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ws: null,
    ws2: null
  },
  mutations: {
    conn(state, ws) {
      state.ws = ws
    },
    conn2(state, ws) {
      state.ws2 = ws
    }
  },
  actions: {
    
  }
})
