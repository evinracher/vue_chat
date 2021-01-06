import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    logOut({ commit }) {
      auth.signOut()
      commit('setUser', null)
      router.push({ name: 'Login' })
    }
  },
  modules: {
  }
})
