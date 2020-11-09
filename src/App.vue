<template>
  <nav class="nav">
    <router-link to="/">Todos</router-link>
  </nav>
  <router-view v-slot="slotProps">
     <transition name="route" mode="out-in">
       <component :is="slotProps.Component"></component>
     </transition>
  </router-view>
</template>

<style lang="scss">
@import './styles/tokens.scss';
.nav {
  background-color: $green;
  padding: 1rem;
}

.nav a {
  color: $dark;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  display: block;
  width: 100%;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 300ms ease-out;
}

.route-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-active {
  transition: all 300ms ease-out reverse;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
