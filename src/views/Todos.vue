<template>
  <article class="todos">
    <section v-if="loading">
      <TodoLoader v-for="i in 3" :key="i"></TodoLoader>
    </section>
    <draggable tag="ul" class="todos__list" :list="todos" v-else>
      <transition-group name="todo-list">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo.todo" :id="todo.id" :done="todo.done"></TodoItem>
      </transition-group>
    </draggable>
    <AddTodo></AddTodo>
  </article>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from 'vuex';
import { VueDraggableNext } from 'vue-draggable-next'
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    AddTodo,
    draggable: VueDraggableNext
  },
  setup() {
    const store = useStore();

    const loading = ref(false);
    const loadCoaches = async () => {
        loading.value = true;
        try {
            await store.dispatch('fetchTodos');
        } catch (error) {
          this.error = error.message || 'something went wrong';
        }
        loading.value = false;
    }
    loadCoaches();
    const todos = computed(() => store.getters.todos);
    console.log(todos.value)

    return {
      todos,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  max-width: 74rem;
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
