<template>
  <div class="todos">
    <ul class="todos__list">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo.todo" :id="todo.id"></TodoItem>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
import TodoItem from '../components/TodoItem';

export default {
  name: 'Home',
  components: {
    TodoItem
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
</style>
