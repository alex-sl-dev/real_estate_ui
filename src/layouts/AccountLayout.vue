<template>
  <v-app>
      <v-navigation-drawer
        v-model="drawer"
        app
        v-bind="$attrs"
        stateless
      >
        <v-divider class="mb-1" />

        <v-list
          dense
          nav
        >
          <v-list-item>
            <v-list-item-avatar
              class="align-self-center"
              color="white"
              contain
            >
            <v-icon
              large
              color="black"
            >
              mdi-home
            </v-icon>

            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="title"
                v-text="title"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider class="mb-2" />

        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item
            v-for="item in drawerMenuItems"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
     </v-navigation-drawer>

    <v-app-bar
      app
      absolute

      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>


      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="isAuthenticated">
        <v-btn
          text
          depressed
          v-for="item in userMenuItems"
          :key="item.title"
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

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'main-layout',
  components: {
  },
  computed: {
    isAuthenticated: function(){ return this.$store.getters['isAuthenticated'] },
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('updateDrawerState', val)
      },
    },
  },
  methods: {
  },
  data: () => ({
    title: 'ROOM ROOM',
    userMenuItems: [
      {
        icon: 'mdi-home', title: 'Объявления', path: '/'
      }, {
        icon: 'mdi-lock-open', title: 'Выйти', path: 'sign-out'
      }
    ],
    drawerMenuItems: [
      {
        icon: 'mdi-view-dashboard', title: 'Обзор', path: '/dashboard'
      }, {
        icon: 'mdi-face', title: 'Профиль', path: '/profile'
      }
    ]
  })
}
</script>
