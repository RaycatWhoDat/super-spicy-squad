const NUMBER_OFFSET = 20;
const X_OFFSET = 475;
const Y_OFFSET = 120;
const IMAGE_WIDTH = 16;
const IMAGE_HEIGHT = 16;
const IMAGE_SCALE = 20;
const OUTLINE_WIDTH = 2;

const TAGS = {
  ROW_CONSTRAINT: "rowConstraint",
  COLUMN_CONSTRAINT: "columnConstraint",
  GRID_SQUARE: "gridSquare",
  IS_REQUIRED: "isRequired",
  ZERO_COLUMN: "zeroColumn",
  BACKGROUND: "background",
  PEPPER: "pepper"
};

export const puzzleScene = () => scene('puzzle', (options = {}) => {
  add([
    pos(0, 0),
    rect(width(), height()),
    color(COLORS[options.pepperName] || BLACK),
    area(),
    z(10),
    lifespan(1, { fade: 1 })
  ]);
  
  add([
    pos(0, 0),
    rect(width(), height()),
    color(COLORS[options.pepperName] || BLACK),
    z(-1),
    area(),
    TAGS.BACKGROUND
  ]);

  const ORIGINAL_POSITION = vec2(215, 245);
  const PEPPER_OFFSET = 10;

  const maxChancesRemaining = {
    "cayenne": 4,
    "habanero": 5,
    "chilaca": 1,
    "jalapeno": 2,
    "serrano": 3,
    "ghost": 9
  }
  
  let chancesRemaining = maxChancesRemaining[options.pepperName] || 0;
  
  const pepper = add([
    pos(ORIGINAL_POSITION),
    sprite(`${options.pepperName}-image`),
    color(WHITE),
    origin("center"),
    TAGS.PEPPER
  ]);

  if (options.pepperName === "habanero") {
    pepper.pos.x += 30;
  }

  if (options.pepperName === "serrano") {
    pepper.pos.x += 10;
    pepper.pos.y -= 10;
    pepper.use(rotate(75));
  }

  if (options.pepperName === "chilaca") {
    pepper.pos.x += 30;
    pepper.pos.y -= 10;
    pepper.use(rotate(90));
  }

  if (options.pepperName === "ghost") {
    pepper.unuse("sprite");
    pepper.use(sprite("cayenne-image"));
  }

  const chancesRemainingText = add([
    text(chancesRemaining),
    pos(ORIGINAL_POSITION),
    scale(7),
    color(WHITE)
  ]);

  onUpdate(TAGS.PEPPER, pepper => {
    pepper.pos.y = wave(ORIGINAL_POSITION.y - PEPPER_OFFSET, ORIGINAL_POSITION.y + PEPPER_OFFSET, time() * 3);
  });

  const { rows, columns, data } = PUZZLES[options.pepperName] || {};
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
          
          play("hit", { volume: 0.5 });
          shake(1);
        }
        
        numberOfRequiredSquares--;
        if (numberOfRequiredSquares === 0) {
          win({ cancelSquareHover, cancelLeftClick, cancelRightClick, isForfeit: DEV_MODE });
        }
      });

      gridSquare.onStateEnter("marked", () => {
        gridSquare.color = GRAY;
      });

      gridSquare.onStateEnter("none", () => {
        gridSquare.color = WHITE;
      });
    }
  }

  const allGridSquares = get(TAGS.GRID_SQUARE);

  const cancelSquareHover = onHover(TAGS.GRID_SQUARE, square => {
    if (currentSquare?.gridId === square.gridId) return;
    currentSquare = square;
  });

  const cancelLeftClick = onMousePress("left", position => {
    if (!currentSquare || currentSquare?.state !== "none") return;

    if (!currentSquare.hasPoint(position)) {
      currentSquare = null;
      return;
    }
    
    if (data[currentSquare.yIndex][currentSquare.xIndex] === 0) {
      play("miss", { volume: 0.5 });
      chancesRemaining--;
      chancesRemainingText.text = chancesRemaining;
      pepper.color = pepper.color.darken(Math.ceil(255 / maxChancesRemaining[options.pepperName]));
      shake(10);

      if (chancesRemaining === 0) {
        lose({ cancelSquareHover, cancelLeftClick, cancelRightClick });
      }
      
      return;
    }
    
    currentSquare.enterState("pressed", position);
  });

  const cancelRightClick = onMousePress("right", position => {
    if (!currentSquare || currentSquare.state === "pressed") return;
    currentSquare.enterState(currentSquare.state === "none" ? "marked" : "none");
  });
  
  const win = ({ cancelSquareHover, cancelLeftClick, cancelRightClick, isForfeit }) => {
    if (cancelSquareHover) cancelSquareHover();
    if (cancelLeftClick) cancelLeftClick();
    if (cancelRightClick) cancelRightClick();

    const colorImage = add([
      sprite(`${options.pepperName}-color`),
      pos(X_OFFSET, Y_OFFSET),
      scale(20),
      z(2),
      opacity(0),
      fadeIn({
        duration: 2,
        delay: 0.5
      })
    ]);

    // if (isForfeit) colorImage.hidden = true;

    add([
      pos(0, 0),
      rect(width(), height()),
      color(BLACK),
      area(),
      z(10),
      opacity(0),
      fadeIn({
        duration: 2,
        delay: 2.5
      })
    ]);

    wait(5, () => go(SCRIPT_INDEX + 1 < SCRIPTS.length ? "episode-card" : "credits", { scriptIndex: SCRIPT_INDEX + 1 }));
  }

  const lose = ({ cancelSquareHover, cancelLeftClick, cancelRightClick }) => {
    const outlineWidth = 4;

    if (cancelSquareHover) cancelSquareHover();
    if (cancelLeftClick) cancelLeftClick();
    if (cancelRightClick) cancelRightClick();

    add([
      rect(width() + (outlineWidth * 2), Math.floor(height() / 3)),
      color(CRIMSON),
      outline(outlineWidth, BLACK),
      pos(-outlineWidth, center().y - Math.floor(height() / 6)),
      z(11),
      "game-over"
    ]);

    add([
      text("SPICE IS DEAD"),
      color(WHITE),
      pos(165, center().y - 50),
      scale(5),
      z(11),
      "game-over"
    ]);

    add([
      text("Left-click to restart"),
      color(WHITE),
      pos(90, center().y + 15),
      scale(4),
      z(11),
      "game-over"
    ]);

    wait(0.25, () => {
      onClick(() => {
        go("puzzle", options);
      });
    });
  };
                                       
  // Dev mode keys
  if (options.DEV_MODE) {
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
