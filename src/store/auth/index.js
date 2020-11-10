import firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
        state.user = payload
    }
  },
  actions: {
    signUp (ctx, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              email: user.email,
            }
            ctx.commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signIn (ctx, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              email: user.email,
            }
            ctx.commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )

    },
    autoSignIn (ctx, payload) {
      ctx.commit('setUser', {
        id: payload.uid,
        email: payload.email,
      })
    },
    logout (ctx) {
      firebase.auth().signOut()
      ctx.commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}