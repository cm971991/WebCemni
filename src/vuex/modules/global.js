// 该模块的初始状态
const state = {
  isLoading: false,
  direction: 'forward',
  showTopSpace: true,
  showFoot: false
}

// 相关的 mutations
const mutations = {
  UPDATE_LOADING (state, status) {
    state.isLoading = status
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  SHOWTOPSPACE (state, showTopSpace) {
    state.showTopSpace = showTopSpace
  },
  SHOWFOOT (state, showFoot) {
    state.showFoot = showFoot
  }
}

export default {
  state,
  mutations
}
