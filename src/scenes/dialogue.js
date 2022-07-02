export const dialogueScene = () => scene('dialogue', options => {
  const POSITION = vec2(20, 360);
  const NAME_BOX_SIZE = 32;
  const OFFSET = 0;
  const DIALOGUE_X_OFFSET = 8;
  const DIALOGUE_Y_OFFSET = 9;

  const nameBox = add([
    pos(POSITION.x, POSITION.y - NAME_BOX_SIZE + OFFSET),
    rect(240, NAME_BOX_SIZE),
    color(SLATE),
    outline(4, GRAY),
    z(3)
  ]);

  const speaker1Image = add([
    sprite("jalapeno"),
    pos(nameBox.pos.x - 180, nameBox.pos.y - 290)
  ]);

  const speaker2Image = add([
    sprite("ghost", { flipX: false }),
    pos(width() - 150, nameBox.pos.y - 100),
    origin("center"),
    rotate(45),
    scale(1.6)
  ]);
  
  const textBox = add([
    pos(POSITION.x, POSITION.y + OFFSET),
    rect(800, 160),
    color(SLATE),
    outline(4, GRAY),
    z(3)
  ]);

  const nameBoxLine = add([
    pos(POSITION.x + 2, POSITION.y - 4 + OFFSET),
    rect(236, 8),
    color(SLATE),
    z(3)
  ]);

  const speakerName = add([
    text("Jalapeno Green"),
    pos(nameBox.pos.x + DIALOGUE_X_OFFSET, nameBox.pos.y + DIALOGUE_Y_OFFSET),
    scale(2),
    z(4)
  ]);

  const dialogue = add([
    text(),
    typeText({
      text: "It will be a cold day in Hell before I let you \nwalk away, Red Ghost. I'll chase you to the ends\nof the Earth!",
      speed: 0.025
    }),
    pos(textBox.pos.x + DIALOGUE_X_OFFSET, textBox.pos.y + DIALOGUE_Y_OFFSET),
    scale(2),
    z(4)
  ]);
});
