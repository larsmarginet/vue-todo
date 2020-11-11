<template>
    <div class="todos">
        <draggable tag="ul" class="todos__list" :list="todos" v-if="!loading && todos.length > 0" @change="updateList">
            <transition-group name="todo-list">
                <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo.todo" :id="todo.id" :done="todo.done"></TodoItem>
            </transition-group>
        </draggable>
        <h2 v-else-if="!loading && todos.length == 0">No Todos Yet...</h2>
        <section v-else-if="loading">
            <TodoLoader v-for="i in 3" :key="i"></TodoLoader>
        </section>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { VueDraggableNext } from 'vue-draggable-next'
import TodoLoader from './TodoLoader'
import TodoItem from './TodoItem'

export default {
    components: {
        TodoLoader,
        TodoItem,
        draggable: VueDraggableNext
    },
    setup() {
        const store = useStore();
        const loading = ref(store.getters.loadingTodos);
        const todos = computed(() => store.getters.todos);

        const updateList = () => {
            todos.value.forEach((todo, i) => {
                if (todo.pos != i + 1) {
                    console.log('pos changed')
                    store.dispatch('updateTodo', {id: todo.id, pos: i+1})
                }
            });
        }
    
        return {
            loading,
            todos,
            updateList
        }
    }
}
</script>

<style lang="scss" scoped>
.todos {
  max-width: 76rem;
  margin: 0 auto;
}

.todos__list {
  padding: 0;
}

.todo-list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.todo-list-enter-active {
    transition: all 500ms ease-out;
}

.todo-list-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.todo-list-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.todo-list-leave-active {
    transition: all 500ms ease-in;
    position: absolute;
}

.todo-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.todo-list-move {
    transition: transform .3s ease-in-out;
}
</style>