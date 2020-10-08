<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'
import AccountLayout from '@/layouts/AccountLayout'
import Axios from 'axios'
import router from './router'
import store from './store'

export default {
  name: 'App',
  components: {
    MainLayout, EmptyLayout, AccountLayout
  },
  data: () => ({

  }),
  created: function () {
    //console.log(this.$http)
    Axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      //console.log(error.response)
      if (error.response.status === 401) {
        store.dispatch('auth/sign-out')
        router.push('/sign-in')
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
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  }
}
</script>
