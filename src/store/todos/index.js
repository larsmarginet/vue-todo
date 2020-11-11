import * as firebase from '../../firebase'
import router from '../../router';

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
        async loadTodos(ctx) {
            ctx.commit('setLoadingTodos', true);
            await firebase.todosCollection.where("userId", "==", firebase.auth.currentUser.uid).orderBy('pos', 'asc').onSnapshot(snapshot => {
                let todos = [];
                snapshot.forEach(doc => {
                    let todo = doc.data()
                    todo.id = doc.id
                    todos.push(todo)
                })
                ctx.commit('setTodos', todos);
            })            
            ctx.commit('setLoadingTodos', false);
        },
        async addTodo(_, payload) {
            await firebase.todosCollection.add({
                userId: firebase.auth.currentUser.uid,
                todo: payload.todo,
                done: false,
                pos: 0
            })
        }, 
        async updateTodo(_, payload) {
            if ('done' in payload) {
                await firebase.todosCollection.doc(payload.id).update({
                    done: payload.done
                });
            } else if ('todo' in payload) {
                await firebase.todosCollection.doc(payload.id).update({
                    todo: payload.todo
                });
                router.replace('/')
            }
        },
        async deleteTodo(_, payload) {
            await firebase.todosCollection.doc(payload.id).delete();
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