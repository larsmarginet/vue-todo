<template>
    <li class="todos__list__item" :class="{'todos__list__item--done': done}">
        <form @submit.prevent>
            <label for="done" @input="handleDoneInput">
                <input id="done" name="done" type="checkbox" :checked="done" >
            </label>
        </form>
        <router-link :to="`/todos/${id}`" class="todos__list__item__link">
            <p class="todos__list__item__text">{{todo}}</p>
        </router-link>
        <button class="todos__list__item__delete" @click="removeTodo"><img alt="delete" src="../assets/delete.svg" width="15" height="15"></button>
    </li>
</template>

<script>
import { useStore } from 'vuex';

export default {
    props: ['id', 'todo', 'done'],
    setup(props) {
        const store = useStore();
        
        const removeTodo = () => {
            store.dispatch('removeTodo', {id: props.id})
        }

        const handleDoneInput = () => {
            const done = !props.done
            store.dispatch('updateTodo', {id: props.id, done})
        }

        return {
            removeTodo,
            handleDoneInput
        }
    }
}
</script>

<style lang="scss" scoped>
.todos__list__item {
    display: flex;
    align-items: center;
    list-style: none;
    background-color: $green;
    padding: 2rem;
    border-radius: 1rem;
    margin: 1rem 0;
    cursor: pointer;
}

.todos__list__item__link {
    width: 100%;
    margin-left: 2rem;
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

.todos__list__item--done {
    opacity: .5;
}
</style>