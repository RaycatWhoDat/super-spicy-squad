'use strict';

const convertRgbToTilemaps = ({ data }) => {
  const rows = [];
  const columns = [];
  let row = [];
  for (let index = 0; index < data.length; index += 4) {
    const square = Number((data[index] + data[index + 1] + data[index + 2]) === 0);
    row.push(square);
    const columnIndex = Math.floor(index / 4) % 16;
    Array.isArray(columns[columnIndex]) ? columns[columnIndex].push(square) : columns.push([square]);
    if (!index || (index + 4) % 64) continue;
    rows.push(row);
    row = [];
  }
  return { rows, columns };
};

const getTilemapsFromCanvas = async imagePath => {
  const rawImageCanvas = document.getElementById("raw-image");
  if (!rawImageCanvas) return;

  const canvasContext = rawImageCanvas.getContext("2d");
  let tilemaps = {};

  await Promise.all([new Promise(resolve => {
    const imageElem = new Image(16, 16);
    
    imageElem.onload = () => {
      rawImageCanvas.width = imageElem.width;
      rawImageCanvas.height = imageElem.height;
      
      canvasContext.drawImage(imageElem, 0, 0);
      
      const imageData = canvasContext.getImageData(0, 0, rawImageCanvas.width, rawImageCanvas.height);
      tilemaps = convertRgbToTilemaps(imageData);
      console.log(tilemaps);
      resolve();
    };

    imageElem.src = imagePath;
    return imageElem;
  })]);

  return tilemaps;
};

const countLine = line => {
  const totals = [];
  let count = 0;
  line.forEach((number, index) => {
    count += Number(number === 1);

    if ((number === 0 || index + 1 === line.length) && count) {
      totals.push(count);
      count = 0;
    }
  });

  return totals.length < 1 ? [0] : totals;
};

export const getPuzzleDataFromPath = async imagePath => {
  const tilemaps = await getTilemapsFromCanvas(imagePath);
  return {
    data: tilemaps.rows,
    rows: tilemaps.rows.map(countLine),
    columns: tilemaps.columns.map(countLine)
  };
}
