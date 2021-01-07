import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase'
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
    async setUser({ commit }, user) {
      try {
        const doc = await db.collection('users').doc(user.uid).get()
        if (doc.exists) {
          commit('setUser', doc.data())
        } else {
          await db.collection("users").doc(user.uid).set(user);
          commit('setUser', user)
        }
      } catch (error) {
        console.error(error)
      }
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
