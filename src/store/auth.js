import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("auth-token") || "",
    status: "",
    hasLoadedOnce: false,
    user: {}
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    async sign_in({dispatch, commit}, {email, password}) {
      commit('auth_request')
      try {
        const response = await axios.post('http://localhost:8084/sign-in', {email, password})
        localStorage.setItem("auth-token", response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        console.log(response)
        console.log(this.$http)
        commit('auth_success', response.data.token, response.data.user)
      } catch (e) {
        commit('auth_error', e)
        localStorage.removeItem('auth-token')
        throw e
      }
    },
    async sign_out({dispatch, commit}) {
      commit('sign_out')
      localStorage.removeItem('auth-token')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    sign_out(state){
      state.status = ''
      state.token = ''
    },
  }
}
