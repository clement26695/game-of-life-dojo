<template>
  <div id="game-of-life">
    <!-- ... -->
    <div class="buttons-container">
      <button @click="randomizeMap()">Random</button>
    </div>
  </div>
</template>

<script>
import { getRandomizedMap } from '../services/grid-helper.js'

export default {
  //...
  methods: {
    randomizeMap: function () {
      this.aliveCellsMap = getRandomizedMap(this.rowsCount, this.columnsCount)
    }
  }
}
</script>

<style>
.buttons-container {
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.5);
}
</style>
