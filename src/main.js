import { createApp } from 'vue'
import { auth } from './firebase.js'
import App from './App.vue'
import store from './store'
import router from './router'

let app;

auth.onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App);
        app.use(router);
        app.use(store);
        app.mount('#app');
    }
    if (user) {
        store.dispatch('fetchUserProfile', user)
    }
})

