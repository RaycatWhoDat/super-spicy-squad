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

const typeText = ({ text, speed = 0.1 }) => {
  const fullMessage = text.split("");

  let cancelLoop;
  
  return {
    id: "typeText",
    require: ["text"],
    add() {
      this.text = "";
      
      cancelLoop = loop(speed, () => {
        this.text += fullMessage.shift();
        if (fullMessage.length < 1) {
          console.log(this.text);
          cancelLoop();
        }
      });
    }
  }
};


const allCustomComponents = {
  fadeIn,
  fadeOut,
  typeText
};

export const registerCustomComponents = () => Object.keys(allCustomComponents).forEach(componentName => window[componentName] = allCustomComponents[componentName]);

export default allCustomComponents;
  
