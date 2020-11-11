<template>
    <section class="wrapper">
        <h2>Add Todo</h2>
        <form @submit.prevent="handleSubmitTodo" class="form">
            <label class="form__label" for="todo">
                <span class="form__label__text">What do you need to do?</span>
                <input class="form__label__input" type="text" name="todo" id="todo" v-model.trim="todo">
            </label>
            <button class="form__button" type="submit">Opslaan</button>
        </form>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        
        const todo = ref('');

        const handleSubmitTodo = () => {
            store.dispatch('addTodo', {todo: todo.value, pos: store.getters.todos.length + 1});
            todo.value = '';
        }
        
        return {
            todo,
            handleSubmitTodo,
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 2rem;
    padding: 2rem 5rem 5rem 5rem;
    max-width: 76rem;
    margin: 0 auto;
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
    margin-top: 2rem;
}
</style>