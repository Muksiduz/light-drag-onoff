//fpr the bulb
const bulb = document.getElementById("bulb");
const onbulb = document.getElementById("onbulb");
const offbulb = document.getElementById("offbulb");

const onDiv = document.getElementById("onDiv");
const offDiv = document.getElementById("offDiv");

const path = document.getElementById("path");

let isBulbOff = true;

let isDragging = false;
let cords = {
  y: 0,
  x: 0,
};
let width = 0;
path.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onRelease);
});
function onDrag(e) {
  if (!isDragging) return;
  cords.y = e.clientY;
  cords.x = e.clientX;
  height = cords.y / window.innerHeight;
  width = cords.x / window.innerWidth;
  updateCords(cords);
}
function onRelease(e) {
  isDragging = false;
  gsap.to("path", {
    ease: "bounce.inOut",
    duration: 2,
    ease: "elastic.out(5,0.1)", // Bouncy easing effect 🎢

    attr: { d: "M250,0 Q250,250 250,200" }, // Revert to original path
  });

  //for bulb
  if (isBulbOff) {
    turnOnBulb();
  } else {
    turnOffBulb();
  }

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", onRelease);
}
function updateCords(cords) {
  cords.y = height * 500;
  cords.x = width * 500;
  path.setAttribute("d", `M250,0 Q250,250 ${cords.x},${cords.y}`);
}
function turnOffBulb() {
  isBulbOff = true;
  offbulb.classList.remove("display-hidden");
  onbulb.classList.add("display-hidden");

  offDiv.classList.remove("display-hidden");
  onDiv.classList.add("display-hidden");

  bulb.style.backgroundColor = "#1c1c1c";
  bulb.classList.remove("glow-effect");
  path.style.stroke = "white";
  document.body.style.backgroundColor = "#1c1c1c";
}
function turnOnBulb() {
  isBulbOff = false;
  onDiv.classList.remove("display-hidden");
  offDiv.classList.add("display-hidden");

  onbulb.classList.remove("display-hidden");
  offbulb.classList.add("display-hidden");

  onbulb.classList.add("glow-effect");
  bulb.style.backgroundColor = "yellow";
  path.style.stroke = "black";
  document.body.style.backgroundColor = "white";
}
