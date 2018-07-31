<template>
  <div id="wrapper" class="section container">
    <div class="content">
        <channels></channels>
    </div>
  </div>
</template>

<script>
// import SystemInformation from './LandingPage/SystemInformation';
import Channels from './Channels/Channels';

export default {
  name: 'landing-page',
  components: {
    Channels,
    // SystemInformation
  },
  methods: {},
};
</script>

<style>
</style>
