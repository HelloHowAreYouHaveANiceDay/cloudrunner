<template>
  <div class="channel tile is-vertical is-parent card">
    <div>
      name: {{channel.name}}
    </div>
    

    <div class="field has-addons">
  <p class="control">
    <div class="select">
      <select name="" id="" v-model="selectedPreset">
        <option value="null">select a preset</option>
        <option v-for="preset in presets" :value="preset" :key="preset.name">{{preset.name}}</option>
      </select>
    </div>
  </p>
  <p class="control">
    <div @click='addJob' class="button">
      add job
    </div>
  </p>
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
  data(){
    return {
      selectedPreset: null,
    }
  },
  components: {
    Job
  },
  computed: {
    jobs(){
      return this.$store.state.Jobs.allIds;
    },
    presets(){
      return this.$store.state.Jobs.presets;
    }
  },
  mounted(){
    if(this.$store.state.Jobs.presets.length === 0){
      this.$store.dispatch('Jobs/loadPresets');
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
        .dispatch('Jobs/add', this.selectedPreset)
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
</style>


