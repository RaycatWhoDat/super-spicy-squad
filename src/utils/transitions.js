const circleTransition = (sceneName, options) => {
  add([
    pos(center()),
    circle(1),
    color(COLORS[options.pepperName] || BLACK),
    embiggen(options.multiplier),
    z(10),
    "transition"
  ]);

  wait(1, () => go(sceneName, options));
}

const allTransitions = {
  circleTransition
};

export const registerTransitions = () => Object.keys(allTransitions).forEach(componentName => window[componentName] = allTransitions[componentName]);

export default allTransitions;
