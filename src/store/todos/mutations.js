export default {
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
            console.log(payload.todo)
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
}