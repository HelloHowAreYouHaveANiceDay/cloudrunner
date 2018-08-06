<template>
  <div id="wrapper" class="container">
    <div class="content">
        <channels></channels>
    </div>
    <div>
        <!-- <viewport></viewport> -->
    </div>
  </div>
</template>

<script>
// import SystemInformation from './LandingPage/SystemInformation';
import Channels from './Channels/Channels';
import Viewport from './Editor/Viewport';

export default {
  name: 'runner',
  components: {
    Channels,
    Viewport,
    // SystemInformation
  },
  methods: {},
};
</script>

<style>
</style>
