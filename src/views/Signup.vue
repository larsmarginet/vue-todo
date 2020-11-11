<template>
    <section class="wrapper">
        <h2 class="title">Sign up</h2>
        <form @submit.prevent="handleSignupUser" class="form">
            <label for="name" class="form__label"> 
                <span class="form__label__text">Enter a name</span>
                <input class="form__label__input" type="name" id="name" name="name" v-model="name">
            </label>
            <label for="email" class="form__label"> 
                <span class="form__label__text">Enter an email</span>
                <input class="form__label__input" type="email" id="email" name="email" v-model="email">
            </label>
            <label for="password" class="form__label"> 
                <span class="form__label__text">Enter a password</span>
                <input class="form__label__input" type="password" id="password" name="password" v-model="password"> 
            </label>
            <button class="form__button" type="submit">Submit</button>
        </form>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore();
        
        const name = ref('');
        const email = ref('');
        const password = ref('');
        
        const handleSignupUser = () => {
            try {
                store.dispatch('signup', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                });
                name.value = '';
                email.value = '';
                password.value = '';
            } catch(err) {
                console.log(err.code);
            }
        }
        
        return {
            name,
            email,
            password,
            handleSignupUser
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    max-width: 76rem;
    margin: 0 auto;
    border-radius: 2rem;
    background-color: white;
    padding: 5rem 2rem;
    margin-top: 5rem;
}

.title {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form__label {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
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