import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const isProd = process.env.NODE_ENV === 'production'

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: !isProd, // 严格模式
  plugins: !isProd ? [createLogger()] : [] // 插件
})

export default store
