const episode1Script = [
  ["serrano", "left", "It will be a cold day in Hell before I let you \nwalk away, Red Ghost! I'll chase you to the ends\nof the Earth!"],
  ["jalapeno", "left", "Bro, I don't think he did it this time.", true],
  [null, null, "(He didn't do it this time.)"],
  ["chilaca", "left", "It will be a cold day in Hell before I let you \nwalk away, Red Ghost! I'll chase you to the ends\nof the Earth!", false],
  ["habanero", "left", "Bro, I don't think he did it this time.", true],
  ["cayenne", "left", "SHOCKKKKKEEERRRRRRR!"],
  ["ghost", "right", "...aight"]
];

const episode5Script = [
  ["jalapeno", "left", "damn cuh", true]
];

const episode15Script = [
  ["habanero", "left", "DAMN CUH!", true]
];

const episode37Script = [
  ["serrano", "left", "damn cuh...", true]
];

const episode38Script = [
  ["chilaca", "left", "Damn, cuh.", true]
];

const episode49Script = [
  [null, null, "DAMN, CUH!", true]
];

const allScripts = [
  episode1Script,
  episode5Script,
  episode15Script,
  episode37Script,
  episode38Script,
  episode49Script
];

export const registerScripts = () => window.SCRIPTS = allScripts;

export default allScripts;
