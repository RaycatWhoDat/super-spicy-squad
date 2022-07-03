//   ["serrano", "left", "It will be a cold day in Hell before I let you \nwalk away, Red Ghost! I'll chase you to the ends\nof the Earth!"],
//   ["jalapeno", "left", "Bro, I don't think he did it this time.", true],
//   [null, null, "(He didn't do it this time.)"],
//   ["chilaca", "left", "It will be a cold day in Hell before I let you \nwalk away, Red Ghost! I'll chase you to the ends\nof the Earth!", false],
//   ["habanero", "left", "Bro, I don't think he did it this time.", true],
//   ["cayenne", "left", "SHOCKKKKKEEERRRRRRR!"],
// ["ghost", "right", "...aight"]

const episode1Script = [
  [null, null, "A city in peril!"],
  [null, null, "Peppers are getting drained of their spiciness!\nOur story begins at the scene of the crime..."],
  ["jalapeno", "left", "...Another one."],
  ["jalapeno", "left", "Just a bland husk now."],
  ["serrano", "left", "It's awful."],
  ["jalapeno", "left", "Don't dawdle. He should be in this area."],
  ["ghost", "right", "Just a few more and I will be the spiciest in the\nland...", true],
  ["jalapeno", "left", "YOU!"],
  ["ghost", "right", "Who dares address me so casually?"],
  ["jalapeno", "left", "Salsa and sauce! Jalapeno Green!"],
  ["ghost", "right", "Ah, yes. The misguided \"Super Squad\"."],
  ["serrano", "left", "That's \"Super Spicy Squad\" to you!"],
  ["ghost", "right", "Yes, yes, I'm sure. Now, run along. I'm busy."],
  ["jalapeno", "left", "I'm here to put an end to your sick plans!"],
  ["ghost", "right", "..."],
  ["ghost", "right", "You're joking."],
  ["jalapeno", "left", "Come closer and you'll find out how funny it is."],
  ["ghost", "right", "*sigh*"],
  [null, null, "Moments later..."],
  ["jalapeno", "left", "Ugh... he's just too spicy..."],
  ["ghost", "right", "You don't have the Scovilles to fight me. Run\nback to whatever patch you grew from."],
  ["jalapeno", "left", "...Am I just not enough?"],
  ["cayenne", "left", "DO NOT LOSE HEART!", false],
  ["jalapeno", "left", "...Who?", true],
  ["cayenne", "left", "Tex-Mex Power! Cayenne Red!"],
  ["ghost", "right", "Crush one and another grows out of the ground.\nThe work is never done."],
  ["cayenne", "left", "Come on, guys! We can take him! Together!\nWith the power of Picross!"],
  ["serrano", "left", "Roger!"],
  ["jalapeno", "left", "..."]
];

const episode5Script = [
  ["jalapeno", "left", "Why do you get to be the leader?! It should have\nbeen me!"],
  ["cayenne", "left", "Because I'm red?"],
  ["jalapeno", "left", "That makes no sense! Defend yourself!"],
  ["cayenne", "left", "Listen, Jalapeno! We don't *have* to fight!\nTogether, there's nothing we can't do!"],
  ["jalapeno", "left", "Why wasn't I born red?!"],
  // [null, null, "A loud impact filled the room as the two\nhit each other simultaneously and collapsed."],
  // ["cayenne", "left", "You're already strong, Jalapeno."],
  // ["jalapeno", "left", "You aren't too bad yourself."],
  // [null, null, "*traditional anime laughter*"]
];

const episode15Script = [
  ["cayenne", "left", "Ugh... so spicy...", true],
  ["ghost", "right", "Give it a rest already. Try as you may,\nyou three will not defeat me."],
  ["habanero", "left", "HOW ABOUT FOUR?!", false],
  ["ghost", "right", "There's no way there's anoth...", true],
  ["habanero", "left", "The King of Jerk! Habanero Orange!"],
  ["ghost", "right", "Surely, this is hell."],
  ["habanero", "left", "The only hell that awaits you is a 16x16 grid!"]
];

const episode37Script = [
  ["serrano", "left", "Habanero! Speak to me!"],
  ["habanero", "left", "bruh"],
  ["serrano", "left", "Yes, brother! I'm here."],
  ["habanero", "left", "The... spice..."],
  ["serrano", "left", "The spice...?"],
  ["habanero", "left", "The... spice... makes... you... meta..."],
  ["serrano", "left", "Meta?"],
  ["habanero", "left", "It's up... to you... now..."],
  ["habanero", "left", "..."],
  ["habanero", "left", "..."],
  ["habanero", "left", "lol"],
  ["serrano", "left", "No! Brother? Brotherrrrrrrr!"],
  ["ghost", "right", "Y'all done?", true],
  ["serrano", "left", "I'LL NEVER FORGIVE YOU!"],
  ["ghost", "right", "Oh, no~ I have to do another puzzle..."],
  ["serrano", "left", "I'LL SHOW YOU WHAT A PROFESSIONAL CAN DO!"],
];

const episode38Script = [
  ["ghost", "right", "Old man, you're like 2500 Scovilles on a good\nday. Give it a rest.", true],
  ["chilaca", "left", "Damn, lay off me, cuh."]
];

const episode49Script = [
  ["serrano", "left", "It will be a cold day in Hell before I let you \nwalk away, Red Ghost! I'll chase you to the ends\nof the Earth!", true],
  ["jalapeno", "left", "Oh, wow. Serrano's almost full spice."],
  ["ghost", "right", "Where does that leave us?"],
  ["cayenne", "left", "At the point where we rise up in our\ndarkest hour and body you."],
  ["ghost", "right", "I think not."],
  ["cayenne", "left", "Nani?"],
  ["ghost", "right", "I didn't take all that spice for nothing.\nYou 'bout to hold this L."],
  ["cayenne", "left", "lol, lmao"]
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
