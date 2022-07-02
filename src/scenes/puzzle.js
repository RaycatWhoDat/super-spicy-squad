const TAGS = {
  ROW_CONSTRAINT: "rowConstraint",
  COLUMN_CONSTRAINT: "columnConstraint",
  GRID_SQUARE: "gridSquare",
  IS_REQUIRED: "isRequired",
  ZERO_COLUMN: "zeroColumn",
  BACKGROUND: "background"
};

export const puzzleScene = () => scene('puzzle', options => {
  add([
    pos(0, 0),
    rect(width(), height()),
    color(options.backgroundColor || CRIMSON),
    z(-1),
    area(),
    TAGS.BACKGROUND
  ]);
  
  const { rows, columns, data } = PUZZLES[options.puzzleName] || {};
  let currentSquare = null;

  rows.forEach((row, rowIndex) => {
    row.reverse();
    row.forEach((number, numberIndex) => add([
      text(number),
      pos(42 - (numberIndex * NUMBER_OFFSET) + X_OFFSET - (Y_OFFSET / 2), (2 + (rowIndex * NUMBER_OFFSET)) + Y_OFFSET),
      scale(2),
      z(0),
      TAGS.ROW_CONSTRAINT
    ]))
  });

  columns.forEach((column, columnIndex) => {
    column.reverse();
    column.forEach((number, numberIndex) => add([
      text(number),
      pos((3 + (columnIndex * NUMBER_OFFSET)) + X_OFFSET, (78 - (numberIndex * NUMBER_OFFSET)) + NUMBER_OFFSET),
      scale(2),
      z(0),
      TAGS.COLUMN_CONSTRAINT
    ]));
  });

  let numberOfRequiredSquares = 256;
  
  for (let xIndex = 0; xIndex < 16; xIndex++) {
    for (let yIndex = 0; yIndex < 16; yIndex++) {
      const gridSquare = add([
        rect(IMAGE_WIDTH, IMAGE_HEIGHT),
        color(WHITE),
        pos(X_OFFSET + 2 + (NUMBER_OFFSET * xIndex), Y_OFFSET + 2 + (NUMBER_OFFSET * yIndex)),
        outline(OUTLINE_WIDTH, BLACK),
        area(),
        state("none", ["none", "pressed", "marked"]),
        z(0),
        TAGS.GRID_SQUARE,
        { xIndex, yIndex, gridId: (yIndex * 16) + xIndex }
      ]);
     
      numberOfRequiredSquares -= data[yIndex][xIndex] === 0;

      gridSquare.onStateEnter("pressed", (position, DEV_MODE = false) => {
        gridSquare.color = BLACK;

        if (!DEV_MODE) {
          add([
            pos(position.x, position.y),
            circle(16),
            opacity(0.4),
            color(rgb(192, 128, 0)),
            lifespan(0.25, { fade: 0.25 })
          ]);
          
          play("hit", { volume: 0.6 });
          shake(1);
        }
        
        numberOfRequiredSquares--;
        if (numberOfRequiredSquares === 0) win({ cancelSquareHover, cancelLeftClick, cancelRightClick });
      });

      gridSquare.onStateEnter("marked", () => {
        gridSquare.color = GRAY;
      });

      gridSquare.onStateEnter("none", () => {
        gridSquare.color = WHITE;
      });
    }
  }

  const cancelSquareHover = onHover(TAGS.GRID_SQUARE, square => {
    if (currentSquare?.gridId === square.gridId) return;
    currentSquare = square;
  });

  const cancelLeftClick = onMousePress("left", position => {
    if (!currentSquare || currentSquare.state === "marked") return;

    if (!currentSquare.hasPoint(position)) {
      currentSquare = null;
      return;
    }
    
    if (data[currentSquare.yIndex][currentSquare.xIndex] === 0) {
      shake(10);
      return;
    }
    
    currentSquare.enterState("pressed", position);
  });

  const cancelRightClick = onMousePress("right", position => {
    if (!currentSquare || currentSquare.state === "pressed") return;
    currentSquare.enterState(currentSquare.state === "none" ? "marked" : "none");
  });
  
  const win = ({ cancelSquareHover, cancelLeftClick, cancelRightClick }) => {
    if (cancelSquareHover) cancelSquareHover();
    if (cancelLeftClick) cancelLeftClick();
    if (cancelRightClick) cancelRightClick();

    add([
      sprite(`${options.puzzleName}-color`),
      pos(X_OFFSET, Y_OFFSET),
      scale(20),
      z(2),
      opacity(0),
      fadeIn({
        duration: 2,
        delay: 0.5
      })
    ]);
  }

  // Dev mode keys
  if (options.DEV_MODE) {
    const allGridSquares = get(TAGS.GRID_SQUARE);

    // Reset
    onKeyPress("r", () => {
      allGridSquares.forEach(square => square.enterState("none"));
    });
    
    // All empty squares
    onKeyPress("1", () => {
      allGridSquares.forEach(square => {
        if (data[square.yIndex][square.xIndex] === 1) return;
        square.enterState("marked");
      });
    });
    
    // All required squares
    onKeyPress("2", () => {
      allGridSquares.forEach(square => {
        if (data[square.yIndex][square.xIndex] === 0) return;
        square.enterState("pressed", { x: 0, y: 0 }, true);
      });
    });
  }
});
