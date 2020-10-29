<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import FrontLayout from '@/layouts/front-layout'
import BlankLayout from '@/layouts/blank-layout'
import AccountLayout from '@/layouts/account-layout'
import Axios from 'axios'
import router from './router'
import store from './store'

export default {
  name: 'App',
  components: {
    FrontLayout, BlankLayout, AccountLayout
  },
  data: () => ({

  }),
  created: function () {
    Axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (error.toString().includes('Network Error')) {
        //store.dispatch('updateLoadingStatus', true, {root: true})
        return Promise.reject(error)
      }

      if (error.response.status === 401) {
        store.dispatch('auth/sign-out')
        router.push('/')
      }

      return Promise.reject(error)
    })
    /*
    this.$http.interceptors.response.use(undefined, function (err, tmp) {
      // https://webdevblog.ru/autentifikacii-v-vue-s-ispolzovaniem-vuex/
      return new Promise(function (resolve, reject) {
        //if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        if (err.includes('Error: Request failed with status code 401')) {
          this.$store.dispatch("logout")
        }

        throw err;
      });
    });
    */
  },
  computed: {
    layout: function(){
      return (this.$route.meta.layout || 'front') + '-layout'
    }
  }
}
</script>
