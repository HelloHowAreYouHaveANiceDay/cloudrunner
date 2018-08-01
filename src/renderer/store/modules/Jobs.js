import Vue from 'vue';
import UUID from 'uuid/v4';
import { ipcRenderer } from 'electron';

const R = require('ramda');
const jobConfig = require('./Jobs/jobs.json');

const state = {
  presets: [],
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
  markComplete(state, id) {
    state[id].complete = true;
  },
  setPresets(state, presets) {
    state.presets = presets;
  },
};

const actions = {
  add: (context, job) =>
    new Promise((resolve, reject) => {
      const newJob = {
        id: UUID(),
        complete: false,
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
      const payload = {
        job: context.state.byId[id]
      };
      ipcRenderer.send('job', payload);

      ipcRenderer.on(id, (event, arg) => {
        console.log(arg);
      });

      resolve();
    }),
  loadPresets: context => new Promise((resolve, reject) => {
    context.commit('setPresets', jobConfig.presets);
    resolve();
  }),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
