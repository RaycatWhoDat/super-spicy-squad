import kaboom from 'kaboom';

const gameOptions = {
  width: 640,
  height: 480,
  font: "sinko",
  canvas: document.getElementById("game-area"),
  background: [0, 0, 0]
};

kaboom(gameOptions);

add([
  text("Super Spicy Squad! Let's sauce 'em!"),
  pos(40, 400),
  scale(2)
]);
