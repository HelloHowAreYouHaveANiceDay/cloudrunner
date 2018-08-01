<template>
  <div class="channel tile is-vertical is-parent card">
    <div>
      name: {{channel.name}}
    </div>
    <div class="button">
      channel stuff
    </div>
    <div @click="removeChannel" class="button is-danger">
      remove channel
    </div>
  </div>
</template>

<script>
export default {
  name: "Channel",
  props: ["channel"],
  methods: {
    removeChannel() {
      this.$store
        .dispatch("Channels/remove", this.channel.name)
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
</style>


