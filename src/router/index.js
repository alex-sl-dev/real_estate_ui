import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    meta: { layout: 'empty' },
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    meta: { layout: 'empty' },
    component: () => import('../views/sign-up.vue')
  },
  {
    path: '/sign-out',
    name: 'Sign Out',
    meta: { layout: 'empty' },
    component: () => import('../views/SignOut.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { layout: 'account', requiresAuth: true },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'account', requiresAuth: true },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    meta: { layout: 'empty' },
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['isAuthenticated']) {
      next()
      return
    }
    next('/sign-in')
  } else {
    next()
  }
})

export default router
