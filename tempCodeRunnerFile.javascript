let start = 9 * 60;
let end = 18 * 60;
let timeSlots = [];

function pad2(n) {
    return (n < 10) ? "0" + String(n) : String(n);
}

for (let slot = start; slot < end; slot += 30) {
  let time = "";
  let HH = Math.floor(slot / 60);
  let MM = slot % 60;
  HHstr = pad2(HH);
  MMstr = pad2(MM)
  time = HHstr + ":" + MMstr;
  timeSlots.push(time);
}
console.log(timeSlots);
