import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import { sync } from "vuex-router-sync";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

export default function createApp() {
  // 创建router、store实例
  const router = createRouter()
  const store = createStore()
  
  // 同步路由状态到store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
