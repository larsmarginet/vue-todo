<template>
   <div class="todo">
       <div class="todo__done"></div>
       <div class="todo__text"></div>
       <div class="todo__delete"></div>
   </div>
</template>

<style scoped>

.todo {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    height: 6rem;
    align-items: center;
    background-color: white;
    border-radius: 1rem;
    margin: 1rem 0;
}

.todo__done {
    width: 2rem;
    height: 2rem;
    border-radius: .2rem;
    animation: pulse-bg 1s infinite;
}

.todo__text {
    width: 100%;
    animation: pulse-bg 1s infinite;
    border-radius: .2rem;
    height: 2rem;
    margin: 0 2rem;
}

.todo__delete {
    width: 2rem;
    height: 2rem;
    border-radius: .1rem;
    animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% { background-color: #ddd; }
  50% { background-color: #d0d0d0; }
  100% { background-color: #ddd; }
}

</style>