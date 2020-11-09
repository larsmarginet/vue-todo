import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      todos: []
    }
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    },
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
    async fetchTodos(ctx) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      const todos = []
      for (let i = 0; i < 5; i++) {
        todos.push({
          id: data[i].id,
          todo: data[i].title,
          done: false
        })
      }
      console.log(todos)
      ctx.commit('setTodos', todos)
  
    },
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
