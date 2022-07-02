export const prologueScene = () => scene('prologue', () => {
  const prologueText = [
    "The world is under attack!",
    "Spicy things are losing their spiceness!",
    "But five peppers were immune to this phenomenon!",
    "Five peppers that would become..."
  ];

  const allTextLines = prologueText.map((line, index) => add([
    text(line),
    pos(30, 120 + (60 * index)),
    scale(2),
    opacity(0),
    fadeIn({
      duration: 2
    })
  ]));

  onClick(() => wait(0.5, () => go('dialogue')));
});
