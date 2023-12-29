import * as authApi from '../../apis/auth'
import * as userApi from '../../apis/user'

export default {
	state: {
    token: '',
    hasLogin: false,
    name: '',
    phone: '',
    avatar: '/static/avatars/user.png',
    openid: '',
    unionid: '',
    user: {},
  },
	getters: {
		
	},
	mutations: {
		SET_OPENID(state, val) {
      state.openid = val
    },
    SET_UNIONID(state, val) {
      state.unionid = val
    },
    SET_TOKEN(state, val) {
      state.token = val
      state.hasLogin = true
    },
    SET_USER(state, val) {
      state.name = val.name
      state.phone = val.phone
      state.avatar = val.avatar
      state.user = val
    },
    SET_AVATAR(state, val) {
      state.avatar = val
      state.user.avatar = val
    },
    LOGOUT(state) {
      state.token = ''
      state.hasLogin = false
      state.name = ''
      state.phone = ''
      state.avatar = '/static/avatars/user.png'
    },
    DECREMENT_CHAT_COUNT(state) {
      if (state.user.chat_count <= 0) {
        state.user.chat_count = 0
      } else {
        state.user.chat_count--
      }
    }
	},
	actions: { 
		code2info({commit}, code) {
      return new Promise((resolve, reject) => {
        authApi.code(code).then(res => {
          commit('SET_OPENID', res.data['openid']) 
          commit('SET_UNIONID', res.data['unionid']) 
          if (res.meta['user'] && res.meta['token']) {
            commit('SET_TOKEN', res.meta['token'])
            commit('SET_USER', res.meta['user'])
            uni.setStorageSync('TOKEN', res.meta['token']);
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    register({state, commit}, data) {
      return new Promise((resolve, reject) => {
        authApi.register({...data, openid: state.openid, unionid: state.unionid}).then(res => {
          commit('SET_TOKEN', res.data['token']) 
          commit('SET_USER', res.meta['user'])
          uni.setStorageSync('TOKEN', res.meta['token']);
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout({state, commit}) {
      uni.clearStorage();
      commit('LOGOUT') 
    },
    decrementChatCount({state, commit}) {
      commit('DECREMENT_CHAT_COUNT')
    },
    updateUserAvatar({state, commit}, filePath) {
      userApi.upload(filePath, 'avatar').then(res => {
          commit('SET_AVATAR', res.data.url)
      })
    },
    updateUser({state, commit}, data) {
      userApi.update(data).then(res => {
        commit('SET_USER', res.data.user)
    })
    }
	}
}
