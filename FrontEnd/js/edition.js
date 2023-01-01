let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector(".loginNav");
const categorySelect = document.getElementById("category");
let myUser = JSON.parse(localStorage.getItem("myUser"));
const logoutBtn = document.getElementById("logout");
const editionMode = document.getElementById("editionMode");

// Affichage des éléments d'édition
if (myUser.token) {
  editionElements.forEach(function (elements) {
    elements.style.visibility = "visible";
  });
  loginNav.style.display = "none";
  editionMode.style.display = "flex";
} else {
  console.log("");
}
// ---------------------------------------
// Déconnexion
logoutBtn.addEventListener("click", function () {
  if (confirm("êtes-vous sûr de vouloir vous déconnecter ?")) {
    window.localStorage.removeItem("myUser");
    location.reload(); 
  }
});
