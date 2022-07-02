export const titleScene = () => scene('title', () => {
  add([
    pos(0, 0),
    rect(width(), height()),
    color(WHITE),
    z(9),
    opacity(),
    lifespan(0.5, { fade: 0.5 })
  ]);

  const background = add([
    pos(0, 0),
    rect(width(), height()),
    color(CRIMSON),
    z(-1)
  ]);

  const peppers = [
    "chilaca",
    "serrano",
    "habanero",
    "jalapeno",
    "cayenne"
  ];

  const chilacaPepper = add([
    pos(155, 80),
    sprite(`chilaca-image`),
    rotate(90)
  ]);
  
  const serranoPepper = add([
    pos(240, 20),
    sprite(`serrano-image`),
    rotate(75)
  ]);

  const jalapenoPepper = add([
    pos(-100, 70),
    sprite(`jalapeno-image`)
  ]);
  
  const habaneroPepper = add([
    pos(-100, 30),
    sprite(`habanero-image`)
  ]);
  
  const cayennePepper = add([
    pos(-190, 100),
    sprite(`cayenne-image`)
  ]);

  const ghostPepper = add([
    pos(700, 50),
    sprite(`ghost-image`),
    color(BLACK),
    rotate(45),
    scale(1.5)
  ]);

  const titleText = add([
    text("SUPER SPICY SQUAD"),
    color(WHITE),
    pos(425, 70),
    scale(5),
    origin("center")
  ]);

  const clickToStartText = add([
    text("Click to start"),
    pos(width() - 375, height() - 48),
    color(WHITE),
    scale(3),
    opacity(1)
  ]);
  
  onUpdate(() => {
    titleText.scale = wave(5, 6, time() * 4);
    chilacaPepper.pos.y = wave(100, 60, time());
    serranoPepper.pos.y = wave(40, 0, time() + 1);
    jalapenoPepper.pos.y = wave(90, 50, time() + 2);
    habaneroPepper.pos.y = wave(120, 80, time() + 3);
    cayennePepper.pos.y = wave(120, 80, time() + 4);
    ghostPepper.pos.y = wave(60, 40, time()+ 5);
    clickToStartText.opacity = wave(1, 0, time() * 2);
  });

  onClick(() => circleTransition("episode-card", { multiplier: 1, scriptIndex: 0 }));  
});
