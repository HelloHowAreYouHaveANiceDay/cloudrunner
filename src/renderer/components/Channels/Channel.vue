<template>
  <div class="channel tile is-vertical is-parent card">
    <div>
      name: {{channel.name}}
    </div>
    <div class="button">
      channel stuff
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  props: ['channel'],
};
</script>

<style scoped>

</style>


