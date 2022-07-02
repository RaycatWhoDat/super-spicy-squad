// TODO: Write the story
// TODO: Create dialogue system
// TODO: Automatic word wrapping
// TODO: Letter-by-letter speaking
// TODO: Create the rest of the puzzles
// TODO: Generate JSON
// TODO: Make the art assets for the VN
// TODO: Title screen, Transition screen, VN screen

"use strict";

import kaboom from "kaboom";
import { getPuzzleDataFromPath } from "./utils/puzzle-mapper";
import { registerCustomComponents } from "./utils/custom-components";
import { registerScenes } from "./scenes";

const gameOptions = {
  width: 840,
  height: 480,
  font: "sinko",
  canvas: document.getElementById("game-area"),
  background: [0, 0, 0]
};

kaboom(gameOptions);

const constants = {
  NUMBER_OFFSET: 20,
  X_OFFSET: 475,
  Y_OFFSET: 120,
  IMAGE_WIDTH: 16,
  IMAGE_HEIGHT: 16,
  IMAGE_SCALE: 20,
  OUTLINE_WIDTH: 2,
  SLATE: rgb(32, 32, 32),
  GRAY: rgb(96, 96, 96),
  CRIMSON: rgb(110, 0, 0),
  ORANGE: rgb(192, 128, 0),
};

Object.keys(constants).forEach(constantName => window[constantName] = constants[constantName]);

// window.PUZZLES = {};

// load(new Promise(resolve => {
//   const puzzleNames = ["serrano", "habanero"];
  
//   Promise.all(puzzleNames.map(async puzzleName => {
//     loadSprite(puzzleName, `assets/sprites/${puzzleName}.png`);
//     loadSprite(`${puzzleName}-color`, `assets/sprites/${puzzleName}-color.png`);
//     return await getPuzzleDataFromPath(`assets/sprites/${puzzleName}.png`);
//   })).then(puzzles => {
//     resolve("ok");
//     (puzzles || []).forEach((puzzleData, index) => {
//       PUZZLES[puzzleNames[index]] = puzzleData;
//     });
loadSprite("ghost", "assets/images/ghost.png");
loadSprite("jalapeno", "assets/images/jalapeno.png");
  

    registerCustomComponents();
    registerScenes();

//     loadSound("hit", "assets/sounds/hit.ogg");
//     // go("prologue");
//     // go("puzzle", { DEV_MODE: true, puzzleName: "habanero", backgroundColor: ORANGE });
//   });
// }));
 
go("dialogue");
