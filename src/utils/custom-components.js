const baseFadeComp = (isFadingOut = false) => ({ duration = 1, delay = 0 }) => {
  let delayTimer = delay;
  let maxTimer = duration;
  let currentTimer = 0;
  const step = 1 / duration;
  
  return {
    id: `fade${isFadingOut ? 'Out' : 'In'}`,
    require: ["opacity"],
    add() {
      this.opacity = isFadingOut ? 1 : 0;
    },
    update() {
      if (delayTimer > 0) delayTimer -= dt();
      if (currentTimer > maxTimer || delayTimer > 0) return;
      this.opacity += (step * dt()) * (isFadingOut ? -1 : 1);
      currentTimer += dt();
    }
  };
};

const fadeIn = baseFadeComp();
const fadeOut = baseFadeComp(true);

const typeText = ({ text, speed = 0.05, pepperName }) => {
  const fullMessage = text.split("");

  let delayTimer = 0.5;
  
  let cancelLoop;
  
  return {
    id: "typeText",
    require: ["text"],
    isDone: false,
    add() {
      this.text = "";
      
      cancelLoop = loop(speed, () => {
        this.text += fullMessage.shift();
        if (pepperName) play(`${pepperName}-speak`, { volume: 0.1 });
        if (fullMessage.length < 1) this.isDone = true;
      });
    },
    update() {
      if (isMousePressed() && delayTimer <= 0 && !this.isDone) this.isDone = true;
      if (delayTimer > 0) delayTimer -= dt();
      if (!this.isDone) return;
      this.text = text;
      cancelLoop();
    }
  }
};


const embiggen = () => ({
    id: "embiggen",
    require: ["circle"],
    update() {
      this.radius += width() * 1.5 * dt();
    }
});

const allCustomComponents = {
  fadeIn,
  fadeOut,
  typeText,
  embiggen
};

export const registerCustomComponents = () => Object.keys(allCustomComponents).forEach(componentName => window[componentName] = allCustomComponents[componentName]);

export default allCustomComponents;
  
