import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

export default function createStore() {
  return new Vuex.Store({
    state: {
      num: 0
    },
    getters: {
      num: state => state.num
    },
    mutations: {
      ADD_NUM(state, num) {
        state.num += num
      }
    },
    actions: {
      addNum({ commit },step) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('ADD_NUM', step)
            resolve()
          }, 1000)
        })
      }
    },
    modules: {

    }
  })
}
