// coordinates ipc pings between main and render processes
const R = require('ramda');

class Channel {
  constructor(name) {
    this.name = name;
  }

  static isOn(context, channel) {
    return R.not(R.isEmpty(R.find(R.propEq('name', channel))(context.state.channels)));
  }

  static add(context, channel) {
    context.commit('addChannel', channel);
  }
}

const state = {
  channels: [],
};

const mutations = {
  addChannel(state, channelName) {
    const newChannel = new Channel(channelName);
    state.channels.push(newChannel);
  },
  removeChannel(state) {
    state.main += 1;
  },
};

const actions = {
  isOn(context, channel) {
    return R.not(R.isEmpty(R.find(R.propEq('name', channel))(context.state.channels)));
  },
  isOff(context, channel) {
    return R.isEmpty(R.find(R.propEq('name', channel))(context.state.channels));
  },
  addChannel(context, channel) {
    if (Channel.isOn(context, channel)) {
      Channel.add(context, channel);
    }
  },
  removeChannel(context, channel) {

  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
