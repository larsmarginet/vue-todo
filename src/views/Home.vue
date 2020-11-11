<template>
  <div class="home">
    <h1 class="title">Todos</h1>
    <TodosList></TodosList>
    <AddTodo></AddTodo>
  </div>
</template>

<script>
import AddTodo from '../components/AddTodo'
import TodosList from '../components/TodosList'

export default {
  name: 'Home',
  components: {
    AddTodo,
    TodosList
  }
}
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
  }
</style>
