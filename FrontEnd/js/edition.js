let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector(".loginNav");
const categorySelect = document.getElementById("category");
let myUser = JSON.parse(localStorage.getItem("myUser"));
const logoutBtn = document.getElementById("logout");
const editionMode = document.getElementById("editionMode");

// Affichage des éléments d'édition
if (myUser.token != undefined && myUser.token != "" && myUser.token != null) {
  editionElements.forEach(function (elements) {
    elements.style.visibility = "visible";
  });
  loginNav.style.display = "none";
  editionMode.style.display = "flex";
}
// ---------------------------------------
// Déconnexion
logoutBtn.addEventListener("click", function () {
  if (confirm("êtes-vous sûr de vouloir vous déconnecter ?")) {
    window.localStorage.removeItem("myUser");
    location.reload(); 
  }
});

// -----------------------------------------------
// Ajout de nouveaux projets
const addWorkForm = document.getElementById("addWorkForm");

addWorkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let newWork = new FormData(addWorkForm);
  newWork.append("image", document.getElementById("image").files[0]);
  newWork.append("title", document.getElementById("title").value);
  newWork.append("category", categorySelect.options[categorySelect.selectedIndex].value);

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Authorization": "Bearer" + myUser.token,
    },
    body: newWork,
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});