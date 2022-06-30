// TODO: Generate JSON
// TODO: Split out the files properly
// TODO: Write the story
// TODO: Make the art assets for the VN
'use strict';

import kaboom from "kaboom";
import { puzzles } from "./puzzles.json";
import { getPuzzleDataFromPath } from "./mapper";

const gameOptions = {
  width: 840,
  height: 480,
  font: "sinko",
  canvas: document.getElementById("game-area"),
  background: [110, 0, 0]
};

kaboom(gameOptions);

let puzzleData = {};

load(new Promise(resolve => {
  getPuzzleDataFromPath("assets/sprites/serrano.png").then(puzzleData => {
    resolve("ok");
    go('puzzle01', { DEV_MODE: true, puzzleData });
  });
}));

scene('puzzle01', options => {
  const DEV_MODE = options.DEV_MODE || false;

  const NUMBER_OFFSET = 20;
  const X_OFFSET = 475;
  const Y_OFFSET = 120;
  const IMAGE_WIDTH = 16;
  const IMAGE_HEIGHT = 16;
  const IMAGE_SCALE = 20;
  const OUTLINE_WIDTH = 2;

  const GRAY = rgb(96, 96, 96);

  const tags = {
    ROW_CONSTRAINT: "rowConstraint",
    COLUMN_CONSTRAINT: "columnConstraint",
    GRID_SQUARE: "gridSquare",
    IS_REQUIRED: "isRequired",
    ZERO_COLUMN: "zeroColumn"
  };
  
  const { rows, columns, data } = options.puzzleData || {};

  onLoad(() => {
    rows.forEach((row, rowIndex) => {
      row.reverse();
      row.forEach((number, numberIndex) => add([
        text(number),
        pos(45 - (numberIndex * NUMBER_OFFSET) + X_OFFSET - (Y_OFFSET / 2), (2 + (rowIndex * NUMBER_OFFSET)) + Y_OFFSET),
        scale(2),
        tags.ROW_CONSTRAINT
      ]))
    });

    columns.forEach((column, columnIndex) => {
      column.reverse();
      column.forEach((number, numberIndex) => add([
        text(number),
        pos((3 + (columnIndex * NUMBER_OFFSET)) + X_OFFSET, (80 - (numberIndex * NUMBER_OFFSET)) + NUMBER_OFFSET),
        scale(2),
        tags.COLUMN_CONSTRAINT
      ]));
    });

    for (let xIndex = 0; xIndex < 16; xIndex++) {
      for (let yIndex = 0; yIndex < 16; yIndex++) {
        const gridSquare = add([
          rect(IMAGE_WIDTH, IMAGE_HEIGHT),
          color(WHITE),
          pos(X_OFFSET + 2 + (NUMBER_OFFSET * xIndex), Y_OFFSET + 2 + (NUMBER_OFFSET * yIndex)),
          outline(OUTLINE_WIDTH, BLACK),
          area(),
          state("none", ["none", "pressed", "marked"]),
          tags.GRID_SQUARE
        ]);

        gridSquare.xIndex = xIndex;
        gridSquare.yIndex = yIndex;

        if (data[yIndex][xIndex] === 1) gridSquare.use(tags.IS_REQUIRED);
        
        gridSquare.onStateEnter("pressed", () => {
          gridSquare.color = RED;
        });

        gridSquare.onStateEnter("marked", () => {
          gridSquare.color = GRAY;
        });

        gridSquare.onStateEnter("none", () => {
          gridSquare.color = WHITE;
        });
      }
    }

    const allGridSquares = get(tags.GRID_SQUARE);
    const allRequiredSquares = get(tags.IS_REQUIRED);

    const checkForWin = () => {
      const isLastRequiredSquare = allRequiredSquares.every(square => square.state === "pressed");
      if (!isLastRequiredSquare) return;
      console.log("YOU WIN!");
    }

    onMousePress("left", position => {
      const gridSquare = allGridSquares.find(square => square.hasPoint(position));
      if (!gridSquare || gridSquare.state === "marked") return;
      
      if (data[gridSquare.yIndex][gridSquare.xIndex] === 0) {
        shake(10);
        return;
      }
      
      gridSquare.enterState("pressed");
      checkForWin();
    });

    onMousePress("right", position => {
      const gridSquare = allGridSquares.find(square => square.hasPoint(position));
      if (!gridSquare || gridSquare.state === "pressed") return;
      gridSquare.enterState(gridSquare.state === "none" ? "marked" : "none");
    });

    // Dev mode keys
    if (DEV_MODE) {
      // Reset
      onKeyPress("r", () => {
        allGridSquares.forEach(square => square.enterState("none"));
      });
      
      // All empty squares
      onKeyPress("1", () => {
        allGridSquares.forEach(square => {
          if (square.is(tags.IS_REQUIRED)) return;
          square.enterState("marked");
        });
      });
      
      // All required squares
      onKeyPress("2", () => {
        allRequiredSquares.forEach(square => square.enterState("pressed"));
        checkForWin();
      });
    }
  });
});

