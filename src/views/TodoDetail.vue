<template>
  <section class="wrapper">
    <form @submit.prevent="handleUpdateTodo">
      <label class="form__label" for="todo">
        <span class="form__label__text">What do you need to do?</span>
        <input class="form__label__input" type="text" name="todo" id="todo" v-model.trim="todo">
      </label>      
      <button class="form__button" type="submit">Opslaan</button>
    </form>
  </section>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const selectedTodo = store.getters.todos.find(todo => todo.id == props.id);
    let todo = [];
    if (selectedTodo) {
      todo = ref(selectedTodo.todo);
    } else {
      router.replace('/')
    }

    const handleUpdateTodo = () => {
      if (selectedTodo.todo !== todo.value && todo.value !== null) {
        store.dispatch('updateTodo', {id: props.id, todo: todo.value});
        router.push('/')
      }
    }


    return {
      todo,
      handleUpdateTodo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/tokens.scss';
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 2rem;
    padding: 2rem 5rem 5rem 5rem;
    max-width: 74rem;
    margin: 5rem auto;
}
.form__label {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.form__label__text {
    font-weight: bold;
    margin-bottom: 1rem;
    display: block;
    text-align: center;
}
.form__label__input {
    border: .2rem solid $green;
    padding: 1rem;
    border-radius: .5rem;
    background: none;
    width: 100%;
}
.form__button {
    border: none;
    color: white;
    background-color: $green;
    border-radius: .5rem;
    padding: 1rem 3rem;
    display: block;
    margin: 2rem auto 0 auto;
}
</style>