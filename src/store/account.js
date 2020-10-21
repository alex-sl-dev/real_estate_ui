import Vue from 'vue'
import Axios from 'axios'
import {API_HOST} from '@/config'

export default {
  namespaced: true,

  state: {
    identity: {
      email: '',
      password: '',
      role: '1',
    },
    profile: {
      firstName: '',
      lastName: '',
      phone: '',
      avatar: '',
    },
  },

  setters: {

  },

  getters: {
    identity: (state) => state.identity,
    profile: (state) => state.profile,
  },

  mutations: {
    // identity
    updateIdentity: (state, value) => state.identity = value,
    updateEmail: (state, value) => state.identity.email = value,
    updateRole: (state, value) => state.identity.role = value,
    updatePassword: (state, value) => state.identity.password = value,
    // profile
    updateProfile: (state, value) => state.profile = value,
    updateFirstName: (state, value) => state.profile.firstName = value,
    updateLastName: (state, value) => state.profile.lastName = value,
    updatePhone: (state, value) => state.profile.phone = value,
  },

  actions: {
    async getAccountRequest (context) {
      try {
        await context.dispatch('setLoadingStatus', true, {root: true})
        let {data} = await Axios.get(`${API_HOST}/account/profile`)
        console.log(data)
        context.commit('updateIdentity', data.account.identity)
        context.commit('updateProfile', data.account.profile)
        await context.dispatch('setLoadingStatus', false, {root: true})
      } catch (e) {
        throw e
      }
    },
    async postAccountRequest (context, payload) {
      try {
        await context.dispatch('setLoadingStatus', true, {root: true})
        let formData = new FormData()
        for (const [key, value] of Object.entries(context.state.user)) {
          console.log(`${key}: ${value}`);
          formData.append(key, value)
        }
        let {data} = await Axios.post(`/profile`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(data)
        //context.commit('SET_PROFILE', data.user)
        await context.dispatch('setLoadingStatus', false, {root: true})
      } catch (e) {
        throw e
      }
    }
  }

}
