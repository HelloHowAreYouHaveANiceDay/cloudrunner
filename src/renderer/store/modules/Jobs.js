import Vue from 'vue';
import UUID from 'uuid/v4';

const R = require('ramda');

const state = {
  byId: {},
  allIds: [],
};

const mutations = {
  add(state, job) {
    Vue.set(state.byId, job.id, job);
    state.allIds.push(job.id);
  },
  remove(state, id) {
    if (state.allIds.length === 0) {
      return false;
    }
    Vue.delete(state.byId, id);
    const index = R.findIndex(R.equals(id), state.allIds);
    if (index === 0 && state.allIds.length === 1) {
      state.allIds = [];
    } else {
      state.allIds = state.channels.splice(index - 1, 1);
    }
    return true;
  },
};

const actions = {
  add: (context, job) =>
    new Promise((resolve, reject) => {
      const newJob = {
        id: UUID(),
        ...job,
      };
      context.commit('add', newJob);
      resolve(newJob.id);
    }),
  remove: (context, id) =>
    new Promise((resolve, reject) => {
      const result = context.commit('remove', id);
      if (result) {
        resolve();
      } else {
        reject(new Error('cannot remove from empty list'));
      }
    }),
  run: (context, id) =>
    new Promise((resolve, reject) => {

    }),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
