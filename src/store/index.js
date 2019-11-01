import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    rights: null
  },
  getters: {
   rights(state) {
     return state.rights
   }
  },
  mutations: {
    SET_RIGHTS(state,payload) {
      state.rights = payload
    }
  },
  actions: {
    setRights({ commit },payload) {
      console.log(payload)
      commit('SET_RIGHTS',payload)
    }
  }

})

export default store
