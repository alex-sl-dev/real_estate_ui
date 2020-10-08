<template>
  <v-app>

    <v-app-bar
      app
      color="dark"
      white
    >
      <div class="d-flex align-center">

        <v-icon
          large
          color="black"
        >
          mdi-home
        </v-icon>


      </div>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>


      <v-toolbar-items v-if="!isAuthenticated">
        <v-btn
          text
          depressed
          v-for="item in guestMenuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-if="isAuthenticated">
        <v-btn
          text
          depressed
          v-on:click="sign_out"
          v-for="item in userMenuItems"
          :key="item.title"
          :id="item.id"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'main-layout',
  components: {
  },
  computed : {
    isAuthenticated: function(){ return this.$store.getters['auth/isAuthenticated'] }
  },
  data: () => ({
    appTitle: "ROOM ROOM",
    userMenuItems: [
      {
        icon: 'mdi-face', title: 'Профайл', path: '/profile', id: 'profileBtn'
      }, {
        icon: 'mdi-lock-open', title: 'Выйти', path: '/sign-out', id: 'signOutBtn'
      }
    ],
    guestMenuItems: [
      {
        icon: 'mdi-face', title: 'Авторизация', path: 'sign-in'
      }, {
        icon: 'mdi-lock-open', title: 'Регистрация', path: 'sign-up'
      }
    ]
  }),
  methods: {
    async sign_out (event) {
      if (event.target.id === 'signOutBtn') {
        await this.$store.dispatch('auth/sign_out')
      }
    }
  }
}
</script>
