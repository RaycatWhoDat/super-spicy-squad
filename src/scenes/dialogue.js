export const dialogueScene = () => scene('dialogue', (options = {}) => {
  const POSITION = vec2(20, 360);
  const NAME_BOX_SIZE = 32;
  const OFFSET = 0;
  const DIALOGUE_X_OFFSET = 8;
  const DIALOGUE_Y_OFFSET = 9;

  const script = SCRIPTS[SCRIPT_INDEX] || [];

  add([
    pos(0, 0),
    rect(width(), height()),
    color(BLACK),
    lifespan(0.5, { fade: 0.5 }),
    z(10)
  ]);
  
  const speaker1Image = add([]);

  const speaker2Image = add([
    sprite("ghost-image"),
    pos(width() - 150, POSITION.y - NAME_BOX_SIZE + OFFSET - 90),
    origin("center"),
    rotate(45),
    scale(1.5)
  ]);

  speaker2Image.hidden = true;
  
  const nameBox = add([
    pos(POSITION.x, POSITION.y - NAME_BOX_SIZE + OFFSET),
    rect(260, NAME_BOX_SIZE),
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
    rect(256, 8),
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

  const additionalComps = {
    "cayenne": [pos(-140, 60)],
    "habanero": [pos(-80, -20)],
    "chilaca": [pos(220, 60), rotate(90)],
    "jalapeno": [pos(-160, 20)],
    "serrano": [pos(140, 20), rotate(75)],
    "ghost": [rotate(45), scale(1.5)]
  }
  
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
    if (pepperName && side === "left") {
      ["sprite", "rotate", "scale", "pos"].forEach(speaker1Image.unuse);
      speaker1Image.use(sprite(`${pepperName}-image`));
      (additionalComps[pepperName] || []).forEach(comp => speaker1Image.use(comp));
    }    
    every("name", entity => {
      entity.hidden = pepperName == null;
      entity.pos.x += side === "right" ? 800 - 260 : 0;
    });
  };

  const advanceScript = () => dialogue.scriptIndex += dialogue.scriptIndex + 1 !== script.length;

  const setNewDialogue = () => {
    dialogue.unuse("typeText");
    const [pepperName, side, text, showGhost] = script[dialogue.scriptIndex] || [];
    if (typeof showGhost === "boolean") speaker2Image.hidden = !showGhost;
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
        if (SCRIPT_INDEX < SCRIPTS.length) {
          circleTransition("puzzle", { DEV_MODE: true, pepperName: PEPPERS[SCRIPT_INDEX] });
        } else {
          circleTransition("credits");
        }
      }
    }
  });
});
