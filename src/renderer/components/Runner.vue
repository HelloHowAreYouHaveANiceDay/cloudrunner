<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">
          this is a vue project
        </span>
        <!-- <system-information></system-information> -->
        <channels></channels>
      </div>
    </main>
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
