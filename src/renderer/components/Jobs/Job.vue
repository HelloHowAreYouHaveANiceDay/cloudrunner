<template>
  <div>
    {{job}}
  </div>
</template>

<script>
export default {
  name: "Job",
  props: ["jobId"],
  data() {
    return {};
  },
  mounted(){
    if(this.$store.state.Jobs.presets.length === 0){
      this.$store.dispatch('Jobs/loadPresets');
    }
  },
  computed: {
    job(){
      return this.$store.state.Jobs.byId[this.jobId];
    },
    presets(){
      return this.$store.state.Jobs.presets;
    }
  }
};
</script>

<style scoped>
</style>
