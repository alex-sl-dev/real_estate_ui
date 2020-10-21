import axios from 'axios'
import {API_HOST} from '@/config'

export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  actions: {
    async postSignInRequest(context) {
      try {
        await context.dispatch('setLoadingStatus', true, {root: true})
        let payload = {
          'email': context.rootGetters["account/identity"].email,
          'password': context.rootGetters["account/identity"].password,
        }
        const response = await axios.post(`${API_HOST}/account/sign-in`, payload)
        await context.dispatch('setLoadingStatus', false, {root: true})
        localStorage.setItem("auth-token", response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        context.commit('setAuthToken', response.data.token, {root: true})
      } catch (e) {
        context.commit('setAuthToken', '', {root: true})
        localStorage.removeItem('auth-token')
        throw e
      }
    },
    async postSignOutRequest(context) {
      context.commit('setAuthToken', "", {root: true})
      localStorage.removeItem('auth-token')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  mutations: {
    // todo rename
  }
}
