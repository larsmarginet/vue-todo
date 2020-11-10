import * as firebase from 'firebase'

let timer;

export default {
    async login(ctx, payload) {
       ctx.dispatch('auth', {
           ...payload,
           mode: 'login'
       })
    },
    async signup(ctx, payload) {
        ctx.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(ctx, payload) {
        const mode = payload.mode;
        let result;

        console.log(payload)
        
        if (mode === 'login') {
            try {
                result = await firebase.auth().signInWithEmailAndPassword(
                  payload.email,
                  payload.password
                );
            } catch (err) {
                console.log(err)
            }
        } else if (mode === 'signup') {
            try {
                result = await firebase.auth().createUserWithEmailAndPassword(
                  payload.email,
                  payload.password
                );
                result;
            } catch (err) {
                console.log(err)
            }
        } else {
            return;
        }

        console.log(result)

        const experiseIn = +result.expiresIn * 1000;
        const experiationDate = new Date().getTime + experiseIn;

        localStorage.setItem('token', result.idToken);
        localStorage.setItem('userId', result.localId);
        localStorage.setItem('tokenExperatio,', experiationDate);

        timer = setTimeout(() => {
            ctx.dispatch('setAutoLogout')
        }, experiseIn)

        ctx.commit('setUser', {
            token: result.idToken,
            userId: result.localId
        }); 
    },
    tryLogin(ctx) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExperation = localStorage.getItem('tokenExperation');

        const expiresIn = +tokenExperation - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            ctx.dispatch('setAutoLogout')
        }, expiresIn)

        if (token && userId) {
            ctx.commit('setUser', {
                token: token,
                userId: userId
            })
        }
    },
    logout(ctx) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExperation')

        clearTimeout(timer);

        ctx.commit('setUser', {
            token: null,
            userId: null
        })
    },
    autoLogout(ctx) {
        ctx.dispatch('logout');
        ctx.commit('setAutoLogout');
    }
}