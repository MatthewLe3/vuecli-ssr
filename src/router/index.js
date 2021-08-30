import Vue from 'vue'
import VueRouter,{RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: ()=>import(/* webpackChunkName: "home" */'../views/Home.vue'),
    meta:{
      title:'vue ssr Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      title:'vue ssr About'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue'),
    meta:{
      title:'vue ssr Test'
    }
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

export default function createRouter(){
  return new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
  })
}
