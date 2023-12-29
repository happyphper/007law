import * as serviceApi from '../../apis/service'

export default {
	state: {
    data: [],
  },
	getters: {
		
	},
	mutations: {
		SET_DATA(state, val) {
      state.data = val
    },
	},
	actions: { 
		fetchServices({commit}, code) {
      return new Promise((resolve, reject) => {
        serviceApi.index().then(res => {
          commit('SET_DATA', res.data) 
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
	}
}
