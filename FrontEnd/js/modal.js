// -------------------------------------------
//  Modal
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelectorAll(".close-button");
const addImg = document.getElementById("addImg");
const bigConteneur = document.querySelector(".bigConteneur");
const editArrow = document.querySelector(".editArrow");

// Flip
addImg.addEventListener('click', function(){
  bigConteneur.classList.toggle('flip')
})
 editArrow.addEventListener("click", function(){
  bigConteneur.classList.toggle("flip")
 })

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.forEach((close) =>{
  close.addEventListener("click", toggleModal);
});
window.addEventListener("click", windowOnClick);
