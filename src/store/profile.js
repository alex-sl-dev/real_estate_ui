import Vue from 'vue'
import Axios from 'axios'
import {API_URL} from '../config'

export default {
  namespaced: true,

  state: {
    user: {
      company: ''
    }
  },

  getters: {
    PROFILE: state => {
      return state.user
    }
  },

  mutations: {
    SET_PROFILE: (state, payload) => {
      state.user = payload
    }
  },

  actions: {
    async GET_PROFILE (context, payload) {
      context.commit('SET_LOADING', true, { root: true })
      try {
        let {data} = await Axios.get(`/profile`)
        console.log(data)
        context.commit('SET_PROFILE', data.user)
        context.commit('SET_LOADING', false, { root: true })
      } catch (e) {
        throw e
      }
    },
    async SAVE_PROFILE (context, payload) {
      context.commit('SET_LOADING', true, { root: true })
      try {
        let formData = new FormData()
        for (const [key, value] of Object.entries(context.state.user)) {
          console.log(`${key}: ${value}`);
          formData.append(key, value)
        }
        let {data} = await Axios.post(`/profile`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(data)
        context.commit('SET_PROFILE', data.user)
        context.commit('SET_LOADING', false, { root: true })
      } catch (e) {
        throw e
      }
    }
  }

}
