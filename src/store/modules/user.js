import { login, logout, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  user: {},
  dept: {},
  roles: [],
  permissions: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_DEPT: (state, dept) => {
    state.dept = dept
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password, captcha, captcha_key } = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password, captcha, captcha_key).then(res => {
        commit('SET_TOKEN', res.access_token)
        setToken(res.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取登录用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const data = res.data
        if (!data) {
          reject('获取用户信息失败')
        }

        if (!data.roles || data.roles.length <= 0) {
          reject('没有查询到用户角色')
        }

        commit('SET_USER', data.user)
        commit('SET_DEPT', data.dept)
        commit('SET_ROLES', data.roles)
        commit('SET_PERMISSIONS', data.permissions)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 注销登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER', {})
        commit('SET_DEPT', {})
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 401请求清除Session信息
  logoutSession({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_USER', {})
      commit('SET_DEPT', {})
      commit('SET_ROLES', [])
      commit('SET_PERMISSIONS', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
