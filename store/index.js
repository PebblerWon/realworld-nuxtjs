const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  user: null,
  session:null,
})

export const mutations = {
  setUser(state,user) {
    state.user = user
  },
  setSession(state, session) {
    state.session = session
  },
}

export const actions = {

  nuxtServerInit({ commit }, { req }) {
    commit('setSession', req.session)
    if (req.headers.cookie) {
      const cookie = cookieparser.parse(req.headers.cookie);

      try {
        let user = JSON.parse(cookie.user);
        commit('setUser',user)
      } catch (e) {
        
      }
    }
  }
}