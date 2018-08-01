<template>
  <div class="channel tile is-vertical is-parent card">
    <div>
      name: {{channel.name}}
    </div>
    <div @click='addJob' class="button">
      add job
    </div>
    <div class="button">
      channel stuff
    </div>
    <div @click="removeChannel" class="button is-danger">
      remove channel
    </div>
    <section>
      <job v-for="job_id in jobs" :job-id="job_id" :key="job_id"></job>
    </section>
  </div>
</template>

<script>
import Job from '../Jobs/Job';

export default {
  name: "Channel",
  props: ["channel"],
  components: {
    Job
  },
  computed: {
    jobs(){
      return this.$store.state.Jobs.allIds;
    }
  },
  methods: {
    removeChannel() {
      this.$store
        .dispatch("Channels/remove", this.channel.name)
        .then(response => {
          console.log(response);
        });
    },
    addJob() {
      this.$store
        .dispatch('Jobs/add', {name: 'testJob'})
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
</style>


