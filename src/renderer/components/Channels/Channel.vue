<template>
  <div class="">
<nav class="panel">
  <div class="panel-block">
      name: {{channel.name}}
  </div>
  <div class="panel-block">

    <div class="field has-addons">

      <div class="control">

        <div class="select">
          <select name="" id="" v-model="selectedPreset">
            <option value="null">select a preset</option>
            <option v-for="preset in presets" :value="preset" :key="preset.name">{{preset.name}}</option>
          </select>
        </div>

      </div>

      <div class="control">

        <div @click='addJob' class="button">
          add job
        </div>

      </div>

    </div>

  </div>

  <job v-for="job_id in jobs" :job-id="job_id" :key="job_id"></job>
  <div class="panel-block">
    <div @click="runChannel" class="button is-info is-fullwidth">
      run jobs
    </div>
  </div>

  <div class="panel-block">
    <div @click="removeChannel" class="button is-danger is-fullwidth">
      remove channel
    </div>
  </div>
</nav>


  </div>
</template>

<script>
import Job from "../Jobs/Job";

export default {
  name: "Channel",
  props: ["channelId"],
  data() {
    return {
      selectedPreset: null
    };
  },
  components: {
    Job
  },
  computed: {
    jobs() {
      return this.$store.state.Jobs.allIds;
    },
    presets() {
      return this.$store.state.Jobs.presets;
    },
    channel() {
      return this.$store.state.Channels.byId[this.channelId];
    }
  },
  mounted() {
    if (this.$store.state.Jobs.presets.length === 0) {
      this.$store.dispatch("Jobs/loadPresets");
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
      this.$store.dispatch("Jobs/add", this.selectedPreset).then(response => {
        console.log(response);
      });
    },
    runChannel() {
      // how to get everything to run in sequence?
      // const promiseArr = this.jobs.map((job)=>this.$store.dispatch('Jobs/run', job));
      console.log(promiseArr);
    },
  }
};
</script>

<style scoped>
</style>


