import Vue from 'vue'
import Vuex from 'vuex'
import auth  from './auth'
import profile  from './profile'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    loading: true
  },

  getters: {
    LOADING: state => {
      return state.loading
    }
  },

  mutations: {
    SET_DRAWER (state, payload) {
      console.log('some set_drawer')
      console.log(payload)
      state.drawer = payload
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    }
  },

  actions: {
    LOADING (context, payload) {
      context.commit('SET_LOADING', payload)
    }
  },

  modules: {
    auth,
    profile
  }
})
