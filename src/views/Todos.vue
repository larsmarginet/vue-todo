<template>
  <div class="todos">
    <transition-group tag='ul' class="todos__list" name="todo-list">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo.todo" :id="todo.id"></TodoItem>
    </transition-group>
    <AddTodo></AddTodo>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
import TodoItem from '../components/TodoItem';
import AddTodo from '../components/AddTodo';

export default {
  name: 'Home',
  components: {
    TodoItem,
    AddTodo
  },
  setup() {
    const store = useStore();
    const todos = computed(() => store.getters.todos);

    return {
      todos,
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
    transition: all 300ms ease-out;
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
    transition: all 300ms ease-in;
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
