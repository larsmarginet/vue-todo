export default {
    async fetchTodos(ctx) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        const todos = [];
        for (let i = 0; i < 5; i++) {
            todos.push({
            id: data[i].id,
            todo: data[i].title,
            done: false
            })
        }
        ctx.commit('setTodos', todos);
    },
    addTodo(ctx, payload) {
        ctx.commit('addTodo', payload);
    },
    updateTodo(ctx, payload) {
        ctx.commit('updateTodo', payload);
    },
    removeTodo(ctx, payload) {
        ctx.commit('removeTodo', payload);
    }
}