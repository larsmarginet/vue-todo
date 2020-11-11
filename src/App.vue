<template>
  <div id="app">
    <TheHeader></TheHeader>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch('loadTodos')
  }
}
</script>

<style lang="scss">
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
