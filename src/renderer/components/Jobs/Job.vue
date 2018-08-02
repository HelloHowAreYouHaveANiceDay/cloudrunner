<template>
  <div>
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>job name : {{job.name}}</p>
          <p>complete : {{job.complete}} </p>
        </div>
        <nav class="level">
          <div class="level-right">
            <div class="level-item"> 
              <a class="button" @click="run">run</a>
            </div>
          </div>
        </nav>
        <div @click="toggle" class="button is-fullwidth">
          logs ({{job.log.length}})
        </div>
        <div v-show="showLog" class="content is-small">
          <blockquote v-for="(log, index) in job.log" :key="index"> {{log}} </blockquote>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "Job",
  props: ["jobId"],
  data() {
    return {
      showLog: false,
    };
  },
  computed: {
    job() {
      return this.$store.state.Jobs.byId[this.jobId];
    }
  },
  methods: {
    run() {
      this.$store.dispatch("Jobs/run", this.jobId);

    },
    toggle(){
      this.showLog = !this.showLog;
    }
  }
};
</script>

<style scoped>
</style>
