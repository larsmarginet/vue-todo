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
    addTodo(state, payload) {
      const todo = {
        id: state.todos.length + 1,
        todo: payload.todo,
        done: false
      }
      state.todos.unshift(todo);
    },
    updateTodo(state, payload) {
      const id = payload.id;
      const todo = state.todos.find(todo => todo.id == id)
      if ('todo' in payload) {
        todo.todo = payload.todo;
      } else if('done' in payload) {
        todo.done = payload.done
      }
    },
    removeTodo(state, payload) {
      const id = payload.id;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      state.todos.splice(todoIndex, 1);
    }
  },
  actions: {
    addTodo(ctx, payload) {
      ctx.commit('addTodo', payload)
    },
    updateTodo(ctx, payload) {
      ctx.commit('updateTodo', payload)
    },
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
