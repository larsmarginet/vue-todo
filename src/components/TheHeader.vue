<template>
    <header>
        <nav class="nav">
            <router-link class="nav__home" to="/">Todos</router-link>
            <div class="nav__login__wrapper" v-if="!user">
                <router-link class="nav__login nav__login--primary" to="/login">Login</router-link>
                <router-link class="nav__login" to="/signup">Sign up</router-link>
            </div>
            <button class="nav__user" @click="handleLogout" v-else>{{letter}}</button>
        </nav>
    </header>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.user.name
        },
        letter() {
            return this.user ? this.user.charAt(0) : 'A'
        }
    },
    methods: {
        handleLogout() {
             try {
                this.$store.dispatch('logout')
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>