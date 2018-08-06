<template>
  <div>
    <svg :height="height" :width="width">
      <g class="grid">
      <line v-for="(row, index) in gridLines.rows" 
        :class="{
          'grid-line': true
        }"
        :key="row.key"
        :x1="row.x1" 
        :x2="row.x2" 
        :y1="row.y1" 
        :y2="row.y2"></line>

      <line v-for="(col, index) in gridLines.cols" 
        :class="{
          'grid-line': true
        }"
        :key="col.key"
        :x1="col.x1" 
        :x2="col.x2" 
        :y1="col.y1" 
        :y2="col.y2"></line>
        </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
const remote = require('electron').remote;

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
        cols: 4
      },
      gridLines:{
        rows:[],
        cols:[]
      },
      edges: [],
      scale: {
        x: null,
        y: null
      }
    };
  },
  computed: {
    // gridLines() {
    //   // rows
    //   const rows = [];
    //   for (let i = 1; i < this.grid.rows; i++) {
    //     const x = 1 / (this.grid.rows + 1) * i;
    //     rows.push(this.scale.x(x));
    //   }
    // }
  },
  methods: {
    onResize() {
      const window = remote.getCurrentWindow()
                            .webContents
                            .getOwnerBrowserWindow()
                            .getContentBounds()
      // console.log(window);
      // this.width = this.$el.offsetWidth;
      this.width = window.width
      // this.height = this.$el.offsetHeight - 6;
      this.height = window.height
      
      // console.log(this.$el.offsetHeight - 6);
      this.update();
    },
    update() {
      this.scale.x.range([0, this.width]);
      this.scale.y.range([this.height, 0]);
      this.updateGridlines();
    },
    initialize() {
      this.scale.x = d3
        .scaleLinear()
        .domain([0, 1])
      this.scale.y = d3
        .scaleLinear()
        .domain([0, 1])
      this.onResize();
    },
    addRow() {},
    updateGridlines(){
      const rows = this.grid.rows
      const rowSet = [];
      for (let i = 1; i <= rows; i++) {
        const row = {};
        const y = this.scale.y(i/rows);
        row.key = `row ${i}`
        row.x1 = 0;
        row.y1 = y;
        row.x2 = this.width;
        row.y2 = y;
        rowSet.push(row);
      }
      const cols = this.grid.cols
      const colSet = [];
      for (let j = 1; j <= cols; j++) {
        const col = {};
        const x = this.scale.x(j/cols);
        col.key = `col ${j}`
        col.y1 = 0;
        col.x1 = x;
        col.y2 = this.height;
        col.x2 = x;
        colSet.push(col);
      }
      this.gridLines.rows = rowSet;
      this.gridLines.cols = colSet;
    }
  }
};
</script>

<style scoped>
.grid-line {
  stroke: black;
  stroke-dasharray: .3em;
}
</style>
