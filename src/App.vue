<template>
  <nav class="nav">
    <router-link class="nav__home" to="/">Todos</router-link>
    <div class="nav__login__wrapper" v-if="!user">
      <router-link class="nav__login nav__login--primary" to="/login">Login</router-link>
      <router-link class="nav__login" to="/signup">Sign up</router-link>
    </div>
    <button class="nav__user" @click="handleLogout" v-else>{{letter}}</button>
  </nav>
  <router-view v-slot="slotProps">
     <transition name="route" mode="out-in">
       <component :is="slotProps.Component"></component>
     </transition>
  </router-view>
</template>

<script>
import firebase from 'firebase'
export default {
  computed: {
    user () {
      return this.$store.getters.user;
    },
    letter () {
      return this.user.email.charAt(0).toUpperCase();
    },
    store() {
      return this.$store;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout');
    }
  }, 
  created() {
    let config = {
      apiKey: process.env.VUE_APP_apiKey,
      authDomain: process.env.VUE_APP_authDomain,
      databaseURL: process.env.VUE_APP_databaseURL,
      projectId: process.env.VUE_APP_projectId,
      storageBucket: process.env.VUE_APP_storageBucket,
      messagingSenderId: process.env.VUE_APP_messagingSenderId,
      appId: process.env.VUE_APP_appId
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}
</script>

<style lang="scss">
@import './styles/tokens.scss';
.nav {
  background-color: $green;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav a {
  font-weight: bold;
  display: block;
}

.nav__home {
  font-size: 4rem;
  font-weight: bold;
}

.nav__login {
   color: $dark;
  border: .1rem solid $dark;
  padding: 1rem 2rem;
  border-radius: .5rem;
}

.nav__login--primary {
  background-color: $dark;
  color: $green;
  margin-right: 1rem;
}

.nav__login__wrapper {
  display: flex;
}

.nav__user {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $green;
  font-size: 2rem;
  background-color: $dark;
  border: none;
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
