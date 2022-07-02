export const dialogueScene = () => scene('dialogue', options => {
  const POSITION = vec2(20, 360);
  const NAME_BOX_SIZE = 32;
  const OFFSET = 0;
  const DIALOGUE_X_OFFSET = 8;
  const DIALOGUE_Y_OFFSET = 9;

  const script = [
    ["jalapeno", "left", "It will be a cold day in Hell before I let you \nwalk away, Red Ghost. I'll chase you to the ends\nof the Earth!"],
    ["jalapeno", "left", "SHOCKKKKKEEERRRRRRR!"],
    ["ghost", "right", "...aight"]
  ]
  
  const speaker1Image = add([
    sprite("jalapeno-image"),
    pos(POSITION.x - 180, POSITION.y - NAME_BOX_SIZE + OFFSET - 290)
  ]);

  const speaker2Image = add([
    sprite("ghost-image", { flipX: false }),
    pos(width() - 150, POSITION.y - NAME_BOX_SIZE + OFFSET - 100),
    origin("center"),
    rotate(45),
    scale(1.6)
  ]);

  const nameBox = add([
    pos(POSITION.x, POSITION.y - NAME_BOX_SIZE + OFFSET),
    rect(240, NAME_BOX_SIZE),
    color(SLATE),
    outline(4, GRAY),
    z(3),
    "name"
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
    z(3),
    "name"
  ]);

  const FULL_NAMES = {
    "cayenne": "Cayenne Red",
    "jalapeno": "Jalapeno Green",
    "habanero": "Habanero Orange",
    "serrano": "Serrano Yellow",
    "chilaca": "Chilaca Black",
    "ghost": "Red Ghost"
  };
  
  const speakerName = add([
    text(""),
    pos(nameBox.pos.x + DIALOGUE_X_OFFSET, nameBox.pos.y + DIALOGUE_Y_OFFSET),
    scale(2),
    z(4),
    "name"
  ]);

  const dialogue = add([
    text(""),
    pos(textBox.pos.x + DIALOGUE_X_OFFSET, textBox.pos.y + DIALOGUE_Y_OFFSET),
    scale(2),
    z(4),
    { scriptIndex: 0 }
  ]);

  const nextSpeaker = ({ pepperName, side = "left" }) => {
    if (dialogue?.isDone === false) return;
    dialogue.text = "";
    speakerName.text = FULL_NAMES[pepperName] || "";
    every("name", entity => {
      entity.hidden = pepperName == null;
      entity.pos.x += side === "right" ? 800 - 240 : 0;
    });
  };

  const advanceScript = () => dialogue.scriptIndex += dialogue.scriptIndex + 1 !== script.length;

  const setNewDialogue = () => {
    dialogue.unuse("typeText");
    const [pepperName, side, text] = script[dialogue.scriptIndex] || [];
    nextSpeaker({ pepperName, side });
    dialogue.use(typeText({ text, pepperName }));
  };

  setNewDialogue();

  onClick(() => {
    if (dialogue?.isDone === false) return;
    if (dialogue.scriptIndex + 1 !== script.length) {
      advanceScript();
      setNewDialogue();
      return;
    } else {
      if (!get("transition").length) {
        circleTransition("puzzle", { DEV_MODE: true, pepperName: "jalapeno" });
      }
    }
  });
});
