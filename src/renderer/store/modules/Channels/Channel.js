const R = require('ramda');
import { ipcRenderer } from 'electron';

export default class Channel {
  constructor(name) {
    this.name = name;
    this.que = [];
  }

  // findIndex :: [Channel] -> String -> Int
  static findIndex =
    channels =>
      channelName =>
        R.findIndex(R.propEq('name', channelName), channels);

  static add(context, channel) {
    context.commit('addChannel', channel);
  }

  static remove(context, channel) {
    context.commit('removeChannel', channel);
  }
}
