export const prologueScene = () => scene('prologue', (options = {}) => {
  const prologueText = [
    "The world is under attack!",
    "Spicy things are losing their spiciness!",
    "But five peppers were immune to this phenomenon!",
    "Five peppers that would become..."
  ];

  const allTextLines = prologueText.map((line, index) => add([
    text(line),
    pos(30, 120 + (60 * index)),
    scale(2),
    opacity(0),
    fadeIn({
      duration: 2,
      delay: 2 * index
    })
  ]));

  wait(8, () => add([
    text("Click to continue"),
    color(WHITE),
    scale(2),
    pos(width() - 300, height() - 32)
  ]));
  
  wait(1, () => onClick(() => go('title')));
});
