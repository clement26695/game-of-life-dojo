import { getCellId } from './grid-helper'

/**
 * This function returns the Ids of the directly nearby cells
 *
 * @param {integer} row
 * @param {integer} column
 */
const getNeighbours = (row, column) => {
  return [
    getCellId(row - 1, column - 1),
    getCellId(row - 1, column),
    getCellId(row - 1, column + 1),
    getCellId(row, column - 1),
    getCellId(row, column + 1),
    getCellId(row + 1, column - 1),
    getCellId(row + 1, column),
    getCellId(row + 1, column + 1)
  ]
}

/**
 * This function returns the count of a position nearby alive cells
 *
 * @param {integer} row
 * @param {integer} column
 * @param {Object}  aliveCellsMap
 */
const getAliveNeighboursCount = (row, column, aliveCellsMap) => {
    let count = 0;
    let ids = getNeighbours(row, column);

    ids.forEach(id => {
        if (aliveCellsMap[id]) {
            count += 1;
        }
    });

    return count;
}

/**
 * This function returns the next state of the cell according to Conway's rules
 *
 * @param {boolean} isAliveCell
 * @param {Object}  aliveNeighboursCount
 */
const getCellNextState = (isAliveCell, aliveNeighboursCount) => {
  if (isAliveCell) {
      if (aliveNeighboursCount < 2) {
        return false;
      } else if (aliveNeighboursCount > 3){
        return false;
      }
  } else {
      if (aliveNeighboursCount === 3) {
          return true;
      }
  }

  return isAliveCell;
}

/**
 * This function returns the new map of alive cells, after 1 iteration
 *
 * @param {integer} rowsCount
 * @param {integer} columnsCount
 * @param {Object}  aliveCellsMap
 */
export const getNextMap = (rowsCount, columnsCount, aliveCellsMap) => {
    // console.log(aliveCellsMap);
    // console.log("test");
    const newAliveCellsMap = {}

    for (var row = 0; row < rowsCount; row++) {
        for (var column = 0; column < columnsCount; column++) {
            let cellId = getCellId(row, column);

            let isAliveCell = aliveCellsMap[cellId];

            let aliveNeighboursCount = getAliveNeighboursCount(row, column, aliveCellsMap);

            let nextState = getCellNextState(isAliveCell, aliveNeighboursCount);

            newAliveCellsMap[cellId] = nextState;
        }
    }

    return newAliveCellsMap
}
