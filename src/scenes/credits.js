export const creditsScene = () => scene('credits', (options = {}) => {
  add([
    text("Thanks for playing!"),
    origin("center"),
    pos(center().x, center().y - 48),
    scale(3),
    opacity(),
    fadeIn({ duration: 1, delay: 0 })
  ]);

  add([
    text("Made in four days for KaJam 2022."),
    origin("center"),
    pos(center().x, center().y + 48),
    scale(2),
    opacity(),
    fadeIn({ duration: 1, delay: 1 })
  ]);

  add([
    text("Click to return to the title screen."),
    origin("center"),
    pos(center().x, center().y + 72),
    scale(2),
    opacity(),
    fadeIn({ duration: 1, delay: 2 })
  ]);

  wait(2, () => onClick(() => go("title")));
});
