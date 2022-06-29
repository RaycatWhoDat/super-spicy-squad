import kaboom from 'kaboom';

const { puzzles: { puzzle01 } } = require('./puzzles.json');

const gameOptions = {
  width: 640,
  height: 480,
  font: "sinko",
  canvas: document.getElementById("game-area"),
  background: [0, 0, 0]
};

kaboom(gameOptions);

loadSprite("serrano", "assets/sprites/serrano.png");

const { rows, columns } = puzzle01;

const NUMBER_OFFSET = 20;
const Y_OFFSET = 100;
const X_OFFSET = 160;

add([
  sprite("serrano"),
  pos(X_OFFSET, Y_OFFSET),
  scale(20)
]);

const allRowEntities = rows.map((row, rowIndex) => {
  row.reverse();
  return row.map((number, numberIndex) => add([
    text(number),
    pos(45 - (numberIndex * NUMBER_OFFSET) + X_OFFSET - 60, (rowIndex * NUMBER_OFFSET) + Y_OFFSET),
    scale(2)
  ]))
});

const allColumnEntities = columns.map((column, columnIndex) => {
  column.reverse();
  return column.map((number, numberIndex) => add([
    text(number),
    pos((columnIndex * NUMBER_OFFSET) + X_OFFSET, (60 - (numberIndex * NUMBER_OFFSET)) + NUMBER_OFFSET),
    scale(2)
  ]))
});  
