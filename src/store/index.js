import { createStore } from 'vuex';
import todos from './todos/index';
import auth from './auth/index';


export default createStore({
  state() {
    return {}
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    todos,
    auth
  }
})
