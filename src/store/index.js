import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      todos: [
        {id: 1, todo: 'Boodschappen doen', done: false},
        {id: 2, todo: 'Todo app maken', done: false},
        {id: 3, todo: 'SUTR meeting voorbereiden', done: false},
        {id: 4, todo: 'COSA vergadering', done: false},
        {id: 5, todo: 'BG voorbereiden', done: false},
        {id: 6, todo: 'Meeting Duchi', done: false},
        {id: 7, todo: 'Eten', done: false},
      ]
    }
  },
  mutations: {
    removeTodo(state, payload) {
      const id = payload.id;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      state.todos.splice(todoIndex, 1);
    }
  },
  actions: {
    removeTodo(ctx, payload) {
      ctx.commit('removeTodo', payload)
    }
  },
  getters: {
    todos(state) {
      return state.todos;
    }
  },
  modules: {}
})
