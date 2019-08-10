import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {state} from './state'
import {mutations} from './mutation'
import {getters} from './getter'
import {actions} from './action'

export const store = new Vuex.Store({
     state,
     mutations,
     getters,
     actions
  })