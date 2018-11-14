<template>
  <div class="grid__container" :style="`--rows:${rowsCount}; --columns:${columnsCount};`">
    <Cell :is-alive="isCellAlive(index)" v-for="index in cellsCount" :key="index" @click.native="toggleCellStateCallback(getCellIdFromIndex(index,columnsCount))">
    </Cell>
  </div>
</template>

<script>
import Cell from './Cell.vue'
import { getCellIdFromIndex } from '../services/grid-helper.js'

export default {
  name: 'Grid',
  components: {
    Cell
  },
  props: {
    rowsCount: {
        type: Number,
        required: true
    },
    columnsCount: {
        type: Number,
        required: true
    },
    aliveCellsMap: Object,
    toggleCellStateCallback: Function
  },
  computed: {
      cellsCount : function() {
          return this.rowsCount * this.columnsCount
      }
  },
  methods: {
    isCellAlive: function (index) {
      // console.log(index);
      const cellId = getCellIdFromIndex(index, this.columnsCount);

      // console.log(cellId);
      return this.aliveCellsMap[cellId] ? this.aliveCellsMap[cellId] : false;
    },
    getCellIdFromIndex: getCellIdFromIndex
  }
}


</script>

<style>
.grid__container {
  width: 90vw;
  height: 30vw;
  margin: auto;
  display: grid;
  border: solid 1px black;
  background-color: black;
  grid-gap: 1px;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
}
</style>
