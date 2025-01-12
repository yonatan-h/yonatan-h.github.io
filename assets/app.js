let bankValue = 1000;
let currentBet = 0;
let wager = 5;

let info = document.createElement("div");
info.setAttribute("id", "info");
info.onclick = function () {
  showMulti();
};
let info_in = document.createElement("div");
info_in.setAttribute("id", "info_in");
info_in.innerText = "i";
info.append(info_in);
const container = document.getElementById("container");
container.append(info);
const multipliers = {};
const colors = {};
for (let i = 0; i < 40; i++) {
  if ([1, 7, 13, 19, 25, 31, 37].includes(i)) {
    multipliers[i] = 1.5;
    colors[i] = "white";
  } else if ([5, 17, 29].includes(i)) {
    multipliers[i] = 2;
    colors[i] = "red";
  } else if ([11, 35].includes(i)) {
    multipliers[i] = 3;
    colors[i] = "purple";
  } else if (i % 2 === 0) {
    multipliers[i] = 0;
    colors[i] = "grey";
  } else if (i % 3 === 0) {
    multipliers[i] = 1;
    colors[i] = "green";
  } else {
    multipliers[i] = 7;
    colors[i] = "gold";
  }
}
function generateWheelSegments() {
  const segments = [];
  const colors = [
    "#eae56f",
    "#89f26e",
    "#7de6ef",
    "#e7706f",
    "#eae56f",
    "#89f26e",
    "#7de6ef",
    "#e7706f",
    "#eae56f",
    "#89f26e",
    "#7de6ef",
    "#e7706f",
    "#eae56f",
    "#89f26e",
    "#7de6ef",
    "#e7706f",
  ];
  for (let i = 0; i < 40; i++) {
    segments.push({ fillStyle: colors[i % colors.length], text: `${i + 1}` });
  }
  console.log(segments.length, "number of segments");
  return segments;
}

const theWheel = new Winwheel({
  responsive: true,
  textAlignment: "outer",
  textOrientation: "curved",
  numSegments: 40, // Specify number of segments.
  innerRadius: 5 * 16, // Set inner radius to make wheel hollow.
  textFontSize: 12, // Set font size accordingly.
  textMargin: 16, // Take out default margin.

  segments: generateWheelSegments(),
  animation: {
    type: "spinToStop",
    duration: 5,
    spins: 3,
    callbackFinished: alertPrize,
  },
});
container.append(theWheel);
//Integrate to the rest of the game
function spinTheWheel() {
  theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0;
  theWheel.startAnimation();
}
let spinner = document.createElement("div");
spinner.textContent = "spin";
spinner.setAttribute("class", "btn");
spinner.addEventListener("click", spinTheWheel);
container.append(spinner);
let bankContainer = document.createElement("div");
bankContainer.setAttribute("class", "bankContainer");
let bank = document.createElement("div");
bank.setAttribute("class", "bank");
let bankSpan = document.createElement("span");
bankSpan.setAttribute("id", "bankSpan");
bankSpan.innerText = "bank: " + bankValue.toLocaleString("en-GB") + "";
bank.append(bankSpan);
bankContainer.append(bank);

let bet = document.createElement("div");
bet.setAttribute("class", "bet");
let betSpan = document.createElement("span");
betSpan.setAttribute("id", "betSpan");
betSpan.innerText = "bet: " + currentBet.toLocaleString("en-GB") + "";
bet.append(betSpan);
bankContainer.append(bet);
container.append(bankContainer);
let placeBet = document.createElement("div");
placeBet.setAttribute("id", "betContainer");
let add = document.createElement("div");
let subtract = document.createElement("div");
add.setAttribute("class", "change");
subtract.setAttribute("class", "change");
let choice = document.createElement("div");
buildWheel();
function spinwheel() {}
function showMulti() {
  let notification = document.createElement("div");
  notification.setAttribute("id", "notification");
  let nSpan = document.createElement("div");
  nSpan.setAttribute("class", "nSpan");

  let nsTxt = document.createElement("span");
  nsTxt.innerText = "Multipliers : ";
  nSpan.append(nsTxt);
  notification.append(nSpan);
  let nsWinBlock = document.createElement("div");
  nsWinBlock.setAttribute("class", "nsWinBlock");
  nsWinBlock.innerText = "single-Num: 30X";
  nSpan.append(nsWinBlock);
  nsWinBlock = document.createElement("div");
  nsWinBlock.setAttribute("class", "nsWinBlock");
  nsWinBlock.innerText = "Neighbours: 15X";
  nSpan.append(nsWinBlock);
  nsWinBlock = document.createElement("div");
  nsWinBlock.setAttribute("class", "nsWinBlock");
  nsWinBlock.innerText = "row: 2X";
  nSpan.append(nsWinBlock);
  nsWinBlock = document.createElement("div");
  nsWinBlock.setAttribute("class", "nsWinBlock");
  nsWinBlock.innerText = "others: 1.5X";
  nSpan.append(nsWinBlock);
  notification.append(nSpan);
  container.prepend(notification);
  setTimeout(function () {
    notification.style.cssText = "opacity:0";
  }, 5000);
  setTimeout(function () {
    notification.remove();
  }, 6000);
}
