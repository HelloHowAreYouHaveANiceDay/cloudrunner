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
  computed: {
    job(){
      return this.$store.state.Jobs.byId[this.jobId];
    }
  }
};
</script>

<style scoped>
</style>
