const R = require('ramda');

import Vue from 'vue';
import UUID from 'uuid/v4';


const state = {
  byId: {},
  allIds: [],
};

const mutations = {
  add(state, job) {
    const id = UUID();
    job.id = id;
    Vue.set(state.byId, id, job);
    state.allIds.push(id);
  },
  remove(state, id) {
    Vue.delete(state.byId, id);
    const index = R.findIndex(R.equals(id), state.allIds);
    if (index === 0 && state.channels.length === 1) {
      state.allIds = [];
    } else {
      state.allIds = state.channels.splice(index - 1, 1);
    }
  },
};

const actions = {
  add: (context, job) => new Promise((resolve, reject) => {

  }),
  remove: (context, id) => new Promise((resolve, reject) => {

  }),
  run: (context, id) => new Promise((resolve, reject) => {

  }),
};

export default {
  state,
  mutations,
  actions,
};
