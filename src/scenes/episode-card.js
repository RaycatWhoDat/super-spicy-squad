export const episodeCardScene = () => scene('episode-card', (options = {}) => {
  const episodeNumbers = [1, 5, 15, 37, 38, 49];
  const episodeTitles = [
    "Amazing! A New Spicy Squad Is Born!",
    "Spiciness of Our Bonds",
    "Spicy! Habanero Orange Appears!",
    "To Share a Spicy Dream",
    "The True Meaning of Spice",
    "Forever Spiced! So Long, Super Spicy Squad"
  ];

  SCRIPT_INDEX = options?.scriptIndex || SCRIPT_INDEX;
  
  add([
    pos(0, 0),
    rect(width(), height()),
    color(BLACK)
  ]);

  const topText = add([
    text(`Episode ${episodeNumbers[SCRIPT_INDEX]}`),
    origin("center"),
    pos(center().x, center().y - 18),
    color(WHITE),
    scale(3)
  ]);

  const bottomText = add([
    text(episodeTitles[SCRIPT_INDEX]),
    origin("center"),
    pos(center().x, center().y + 18),
    color(WHITE),
    scale(2)
  ]);

  add([
    pos(0, 0),
    rect(width(), height()),
    color(BLACK),
    opacity(),
    z(10),
    fadeIn({ duration: 2, delay: 2 })
  ]);

  wait(1, () => onClick(() => go("dialogue", options)));
  wait(4.25, () => go("dialogue", options));
});
