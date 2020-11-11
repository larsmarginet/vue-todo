import * as firebase from '../../firebase'

export default {
    state: {
        loadingTodos: false,
        todos: []
    },
    mutations: {
        setLoadingTodos(state, payload) {
            state.loadingTodos = payload;
        },
        setTodos(state, payload) {
            state.todos = payload
        }
    },
    actions: {
        async addTodo(_, payload) {
            await firebase.todosCollection.add({
                userId: firebase.auth.currentUser.uid,
                todo: payload.todo,
                done: false,
                pos: 0
            })
        }, 
        async loadTodos(ctx) {
            ctx.commit('setLoadingTodos', true);
            await firebase.todosCollection.orderBy('pos', 'asc').onSnapshot(snapshot => {
                let todos = [];
                snapshot.forEach(doc => {
                    let todo = doc.data()
                    todo.id = doc.id
                    todos.push(todo)
                })
                ctx.commit('setTodos', todos);
            })            
            ctx.commit('setLoadingTodos', false);
        }
    },
    getters: {
        loadingTodos(state) {
            return state.loadingTodos;
        },
        todos(state) {
            return state.todos;
        },
        selectedTodo: (state) => (id) => {
            return state.todos.find(todo => todo.id == id)
        }
    }
}