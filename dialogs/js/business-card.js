// easter egg
document.querySelector(".js-card").addEventListener("click", scare);
function scare() {
  document.querySelector(".js-audio").play();
  document.querySelector(".js-card").removeEventListener("click", scare);
}

