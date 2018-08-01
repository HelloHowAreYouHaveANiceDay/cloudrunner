// coordinates ipc pings between main and render processes
import Channel from './Channels/Channel';


const state = {
  channels: [],
};

const mutations = {
  addChannel(state, channelName) {
    const newChannel = new Channel(channelName);
    state.channels.push(newChannel);
  },
  removeChannel(state, channelName) {
    const index = Channel.findIndex(state.channels)(channelName);
    if (index === 0 && state.channels.length === 1) {
      state.channels = [];
    } else {
      state.channels = state.channels.splice(index - 1, 1);
    }
  },
};

const actions = {
  addChannel(context, channel) {
    return new Promise((resolve, reject) => {
      if (!channel) {
        reject(new Error('channel has no name'));
      } else if (Channel.findIndex(context.state.channels)(channel) === -1) {
        Channel.add(context, channel);
        resolve(`${channel} successfully added`);
      } else {
        reject(new Error('channel already exists'));
      }
    });
  },
  remove(context, channel) {
    return new Promise((resolve, reject) => {
      if (Channel.findIndex(context.state.channels)(channel) > -1) {
        Channel.remove(context, channel);
        resolve(`${channel} removed successfully`);
      } else {
        reject(new Error('cannot remove a non-existant channel'));
      }
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
