<template>
  <div>
    <div class="field has-addons">
  <p class="control">
    <input class="input" type="text" v-model="channelName" placeholder="channel name">
  </p>
  <p class="control">
    <a @click="addChannel" class="button">
      addChannel
    </a>
  </p>
</div>
<div class='tile'>
    <channel v-for='channel in channels' :channel-id='channel' :key='channel.name'></channel>
</div>
  </div> 
</template>

<script>
import Channel from "./Channel";

export default {
  name: "channels",
  data() {
    return {
      channelName: ""
    };
  },
  components: {
    Channel
  },
  computed: {
    channels() {
      return this.$store.state.Channels.allIds;
    },
  },
  methods: {
    addChannel() {
      this.$store
        .dispatch("Channels/addChannel", this.channelName)
        .then(response => {
          console.log(response);
          this.channelName = "";
        });
    }
  }
};
</script>

<style>
</style>


