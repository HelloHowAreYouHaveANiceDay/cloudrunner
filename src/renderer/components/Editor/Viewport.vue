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
      <line v-for="(row, index) in gridLines.rows" 
        :key="index"
        :x1="row" 
        :x2="row" 
        y1="0" 
        :y2="height"></line>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Viewport",
  mounted() {
    this.initialize();
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      width: 0,
      height: 0,
      blocks: [],
      grid: {
        rows: 4,
        cols: 0
      },
      gridLines:{
        rows:[],
        cols:[]
      }
      edges: [],
      scale: {
        x: null,
        y: null
      }
    };
  },
  computed: {
    gridLines() {
      // rows
      const rows = [];
      for (let i = 1; i < this.grid.rows; i++) {
        const x = 1 / (this.grid.rows + 1) * i;
        rows.push(this.scale.x(x));
      }
    }
  },
  methods: {
    calcRow
    onResize() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
    },
    update() {
      this.scale.x.range([0, this.width]);
      this.scale.x.range([this.height, 0]);
    },
    initialize() {
      this.scale.x = d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, this.width]);
      this.scale.y = d3
        .scaleLinear()
        .domain([0, 1])
        .range([this.height, 0]);
    },
    addRow() {}
  }
};
</script>

<style scoped>
</style>
