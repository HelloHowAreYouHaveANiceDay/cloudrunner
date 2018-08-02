<template>
  <div>
    <p>
    look at me. I'm a viewport {{width}} x {{height}}
    </p>
    <button>
      addRow
    </button>
    <button>
      addColumn
    </button>
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
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  data(){
    return {
      width: 0,
      height: 0,
      blocks: [],
      grid:{
        rows:0,
        cols:0
      },
      edges: [],
      scale: {
        x: null,
        y: null,
      }
    }
  },
  methods: {
    onResize() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
    },
    update() {
      this.scale.x.range([0, this.width]);
      this.scale.x.range([this.height, 0]);
    },
    initialize(){
      this.scale.x = d3.scaleLinear()
        .domain([0,1])
        .range([0, this.width]);
      this.scale.y = d3.scaleLinear()
        .domain([0,1])
        .range([this.height, 0]);
    },
    addRow(){

    }
  }
}
</script>

<style scoped>

</style>
