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
  log(state, payload) {
    state.byId[payload.id].log.push(payload.message);
  },
  markComplete(state, id) {
    state.byId[id].complete = true;
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
        log: [],
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
  log: (context, payload) => {
    context.commit('log', payload);
  },
  complete: (context, id) => {
    context.commit('markComplete', id);
  },
  run: (context, id) =>
    new Promise((resolve, reject) => {
      const payload = {
        job: context.state.byId[id],
      };
      ipcRenderer.send('job', payload);
      const pl = {
        id,
      };

      ipcRenderer.on(id, (event, arg) => {
        if (arg === 'CLOSE') {
          console.log('task completed');
          ipcRenderer.removeAllListeners(id);
          context.dispatch('complete', id);
        } else {
          pl.message = arg;
          context.dispatch('log', pl);
        }
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
