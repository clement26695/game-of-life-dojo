export const getCellIdFromIndex = function(cellIndex, columnsCount) {
  const row = Math.floor((cellIndex - 1) / columnsCount)
  const column = (cellIndex - 1) % columnsCount

  return getCellId(row, column)
}

export const getCellId = function(row, column) {
  return `R${row}C${column}`
}

export const getRandomizedMap = function (rowsCount, columnsCount) {
    const aliveCellsMap = {};

    for(let i = 0; i < rowsCount; i++){
        for (let j = 0; j < columnsCount; j++) {
            if (Math.random() > 0.7) {
                aliveCellsMap[`R${i}C${j}`] = true;
            }
        }
    }

    return aliveCellsMap;
}
