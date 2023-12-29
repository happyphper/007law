import * as questionApi from '../../apis/question'

export default {
	state: {
    dataSource: [],
  },
	getters: {
		
	},
	mutations: {
		SET_DATA(state, val) {
      state.dataSource = val
    },
	},
	actions: { 
    fetchQuestions({commit}) {
      return new Promise((resolve, reject) => {
        questionApi.index().then(res => {
          commit('SET_DATA', res.data) 
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
	}
}
