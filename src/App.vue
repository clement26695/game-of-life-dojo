<template>
  <div id="game-of-life">
    <div class="logos-container">
      <img class="theodo-logo" alt="Theodo logo" src="./assets/theodo-logo.png">
      <img class="vue-logo" alt="Vue logo" src="./assets/vue-logo.png">
    </div>
    <grid :rows-count="rowsCount" :columns-count="columnsCount" :alive-cells-map="aliveCellsMap" :toggle-cell-state-callback="toggleCellState"></grid>
    <div class="buttons-container">
      <button @click="randomizeMap()">Random</button>
      <button @click="updateAliveCellsMap()">Next Map</button>
      <button @click="clearMap()">Clear</button>
      <button v-if="pause" @click="launch()">Launch</button>
      <button v-if="!pause" @click="launch()">Pause</button>
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import { getRandomizedMap } from './services/grid-helper.js'
import { getNextMap } from './services/conway-rules.js'

const initialRowCount = 30;

export default {
  name: 'GameOfLife',
  components: {
		Grid
  },
  data: function () {
    return {
      rowsCount: initialRowCount,
      aliveCellsMap: {
        R24C55: true,
        R12C24: true,
        R22C18: true,
        R7C25: true,
        R11C76: true,
      },
      pause: true
    }
  },
  computed: {
    columnsCount : function() {
        return 3* this.rowsCount
    }
  },
  methods: {
    randomizeMap: function () {
      this.aliveCellsMap = getRandomizedMap(this.rowsCount, this.columnsCount)
    },
    toggleCellState: function (cellId) {
      const newAliveCellsMap = { ...this.aliveCellsMap }

      newAliveCellsMap[cellId] = !newAliveCellsMap[cellId]

      this.aliveCellsMap = newAliveCellsMap
    },
    updateAliveCellsMap: function (){
        this.aliveCellsMap = getNextMap(this.rowsCount, this.columnsCount, this.aliveCellsMap);
    },
    clearMap: function () {
        this.aliveCellsMap = {};
    },
    launch: function () {
        this.pause = !this.pause;
    }
  },
  created: function () {
    this.randomizeMap();
    setInterval(function() {
      if (!this.pause) {
          this.updateAliveCellsMap();
      }
    }.bind(this), 100);
  }
}
</script>

<style>
#game-of-life {
  padding: 60px 40px;
  position: relative;
}
.logos-container {
  position: absolute;
  top: 0;
  left: 0;
}
.logos-container img {
  height: 40px;
}
.logos-container img + img {
  margin-left: 5px;
}
.buttons-container {
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.5);
}
</style>
