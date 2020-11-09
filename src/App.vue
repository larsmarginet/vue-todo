<template>
  <nav class="nav">
    <router-link to="/">Todos</router-link>
  </nav>
  <router-view/>
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
}
</style>
