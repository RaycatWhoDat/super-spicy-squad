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
import { registerTransitions } from "./utils/transitions";
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
  PUZZLES: {},
  COLORS: {},
  SLATE: rgb(32, 32, 32),
  GRAY: rgb(96, 96, 96),
  CRIMSON: rgb(110, 0, 0),
  ORANGE: rgb(192, 128, 0),
  GREEN: rgb(119, 170, 116)
};

Object.keys(constants).forEach(constantName => window[constantName] = constants[constantName]);

const PEPPERS = [
  "cayenne",
  "jalapeno",
  "habanero", 
  "serrano",
  "chilaca",
  "ghost",
];

const PEPPER_COLORS = [
  RED,
  GREEN,
  ORANGE,
  YELLOW,
  SLATE,
  CRIMSON
];

load(new Promise(resolve => {
  Promise.all(PEPPERS.map(async pepperName => {
    loadSprite(pepperName, `assets/sprites/${pepperName}.png`);
    loadSprite(`${pepperName}-color`, `assets/sprites/${pepperName}-color.png`);
    loadSprite(`${pepperName}-image`, `assets/sprites/${pepperName}-image.png`);
    loadSound(`${pepperName}-speak`, `assets/sounds/${pepperName}-speak.ogg`);
    return await getPuzzleDataFromPath(`assets/sprites/${pepperName}.png`);
  })).then(puzzles => {
    resolve("ok");
    (puzzles || []).forEach((puzzleData, index) => {
      PUZZLES[PEPPERS[index]] = puzzleData;
      COLORS[PEPPERS[index]] = PEPPER_COLORS[index];
    });

    registerCustomComponents();
    registerTransitions();
    registerScenes();

    loadSound("hit", "assets/sounds/jab.ogg");
    loadSound("miss", "assets/sounds/damage.ogg");
    go("prologue");
    // go("dialogue");
    // go("puzzle", { DEV_MODE: true, pepperName: "habanero" });
  });
}));
 
