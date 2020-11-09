<template>
    <li class="todos__list__item">
        <router-link :to="`/todos/${id}`" class="todos__list__item__link">
            <p class="todos__list__item__text">{{todo}}</p>
            <button class="todos__list__item__delete" @click="removeTodo"><img alt="delete" src="../assets/delete.svg" width="15" height="15"></button>
        </router-link>
    </li>
</template>

<script>
import { useStore } from 'vuex';

export default {
    props: ['id', 'todo'],
    setup(props) {
        const store = useStore();
        
        const removeTodo = () => {
            store.dispatch('removeTodo', {id: props.id})
        }

        return {
            removeTodo
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/tokens.scss';

.todos__list__item {
    list-style: none;
    background-color: $green;
    padding: 2rem;
    border-radius: 1rem;
    margin: 1rem 0;
    cursor: pointer;
}

.todos__list__item__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
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