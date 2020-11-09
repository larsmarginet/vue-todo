<template>
  <div class="todos">
    <ul class="todos__list">
      <li class="todos__list__item" v-for="todo in todos" :key="todo.id">
        <p class="todos__list__item__text">{{todo.todo}}</p>
        <button class="todos__list__item__delete"><img alt="delete" src="../assets/delete.svg" width="15" height="15"></button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: 'Home',
  setup() {
    const todos = ref([
      {id: 1, todo: 'Boodschappen doen', done: false},
      {id: 2, todo: 'Todo app maken', done: false},
      {id: 3, todo: 'SUTR meeting voorbereiden', done: false},
      {id: 4, todo: 'COSA vergadering', done: false},
      {id: 5, todo: 'BG voorbereiden', done: false},
      {id: 6, todo: 'Meeting Duchi', done: false},
      {id: 7, todo: 'Eten', done: false},
    ])
    return {
      todos
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/tokens.scss';
.todos {
  max-width: 74rem;
  margin: 0 auto;
}
.todos__list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  background-color: $green;
  padding: 2rem;
  border-radius: 1rem;
  margin: 1rem;
  cursor: pointer;
}

.todos__list__item__text {
  margin: 0;
}

.todos__list__item__delete {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
