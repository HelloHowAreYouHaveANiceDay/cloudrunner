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
    return {};
  },
  computed: {
    job() {
      return this.$store.state.Jobs.byId[this.jobId];
    }
  },
  methods: {
    run() {
      this.$store.dispatch("Jobs/run", this.jobId);

      ipcRenderer.on(this.jobId, (event, arg) => {
        if (arg === 'CLOSE') {
          ipcRenderer.removeAllListeners(this.jobId);
        } else {
          console.log(arg);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
