import Vue from 'vue'
import Vuex from 'vuex'
import signIn  from './sign-in'
import signUp  from './sign-up'
import account from './account'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    loading: true,
    token: localStorage.getItem("auth-token") || "",
  },

  getters: {
    loadingFlag: state => state.loading,
    isAuthenticated: state => !!state.token,
  },

  mutations: {
    updateDrawerState: (state, payload) => state.drawer = payload,
    updateLoadingStatus: (state, value) => state.loading = value,
    updateAuthToken: (state, token) => state.token = token,
  },

  actions: {
    setLoadingStatus: (context, value) => context.commit('updateLoadingStatus', value),
  },

  modules: {
    signIn,
    signUp,
    account,
  }
})
