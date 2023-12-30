import * as serviceApi from '../../apis/service'

export default {
	state: {
    services: [],
  },
	getters: {
		
	},
	mutations: {
		SET_SERVICE_DATA(state, val) {
      state.services = val
    },
	},
	actions: { 
		fetchServices({commit}, code) {
      return new Promise((resolve, reject) => {
        serviceApi.index().then(res => {
          commit('SET_SERVICE_DATA', res.data) 
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
	}
}
