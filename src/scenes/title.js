export const titleScene = () => scene('title', () => {
  // add([
  //   pos(0, 0),
  //   sprite("fire", {
  //     width: width(),
  //     height: height()
  //   }),
  //   z(-1)
  // ]);
  
  add([
    pos(0, 0),
    rect(width(), height()),
    color(WHITE),
    z(9),
    opacity(),
    lifespan(0.5, { fade: 0.5 })
    // fadeOut(0.5)
  ]);

  // TODO: Title splash card
  // TODO: Sine wave background
  // TODO: Fire background
});
