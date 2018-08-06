// coordinates ipc pings between main and render processes
import Vue from 'vue';
import UUID from 'uuid/v4';
import Channel from './Channels/Channel';


const state = {
  byId: {},
  allIds: [],
  channels: [],
};

const mutations = {
  addChannel(state, channel) {
    // const newChannel = new Channel(channelName);
    // state.channels.push(newChannel);
    Vue.set(state.byId, channel.id, channel);
    state.allIds.push(channel.id);
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
    // const index = Channel.findIndex(state.channels)(channelName);
    // if (index === 0 && state.channels.length === 1) {
    //   state.channels = [];
    // } else {
    //   state.channels = state.channels.splice(index - 1, 1);
    // }
  },
};

const actions = {
  addChannel(context, channel) {
    return new Promise((resolve, reject) => {
      const newChannel = {
        id: UUID(),
        name: channel || 'unamed channel',
      };
      context.commit('addChannel', newChannel);
      resolve(newChannel.id);
      // if (!channel) {
      //   reject(new Error('channel has no name'));
      // } else if (Channel.findIndex(context.state.channels)(channel) === -1) {
      //   Channel.add(context, channel);
      //   resolve(`${channel} successfully added`);
      // } else {
      //   reject(new Error('channel already exists'));
      // }
    });
  },
  remove(context, id) {
    return new Promise((resolve, reject) => {
      const result = context.commit('remove', id);
      if (result) {
        resolve();
      } else {
        reject(new Error('cannot remove from empty list'));
      }
      // if (Channel.findIndex(context.state.channels)(channel) > -1) {
      //   Channel.remove(context, channel);
      //   resolve(`${channel} removed successfully`);
      // } else {
      //   reject(new Error('cannot remove a non-existant channel'));
      // }
    });
  },
  // remove task from que
};

const getters = {
  // get task status
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
