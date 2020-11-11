import * as firebase from '../../firebase'
import router from '../../router/index'

export default {
    state: {
        userProfile: {}
    },
    mutations: {
        setUserProfile(state, val) {
          state.userProfile = val
        }
    },
    actions: {
        async login(ctx, payload) {
          const { user } = await firebase.auth.signInWithEmailAndPassword(payload.email, payload.password);
          ctx.dispatch('fetchUserProfile', user);
        },

        async signup({ dispatch }, form) {
            const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password);
            await firebase.usersCollection.doc(user.uid).set({
              name: form.name
            });
            dispatch('fetchUserProfile', user);
        },

        async fetchUserProfile(ctx, payload) {
          const userProfile = await firebase.usersCollection.doc(payload.uid).get();
          ctx.commit('setUserProfile', userProfile.data());
          if (router.currentRoute.value.path === '/login' || router.currentRoute.value.path === '/signup') {
            router.push('/')
          }
        },

        async logout(ctx) {
            await firebase.auth.signOut()
            ctx.commit('setUserProfile', {})
            router.push('/login')
        }
    },
    getters: {
        user(state) {
            return state.userProfile
        }
    }
}