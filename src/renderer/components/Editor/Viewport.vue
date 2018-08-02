<template>
  <div>
    <p>
    look at me. I'm a viewport
    </p>
    <svg>

    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Viewport',
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  data(){
    return {
      width: 0,
      height: 0,
      blocks: [],
      edges: [],
    }
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
    }
  }
}
</script>

<style scoped>

</style>
