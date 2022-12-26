let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector(".loginNav");
let categorySelect = document.getElementById("category");
let myUser = JSON.parse(localStorage.getItem("myUser"));

const logoutBtn = document.getElementById("logout");
const editionMode = document.getElementById("editionMode");

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
  window.localStorage.removeItem("myUser");
  location.reload();
});

// -----------------------------------------------
// Ajout de nouveaux projets
const addWorkForm = document.getElementById("addWorkForm");

addWorkForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let newImage = document.getElementById("image").files[0];
  let newTitle = document.getElementById("title").value;
  let newCategory = categorySelect.options[categorySelect.selectedIndex].value;

  let newWork = new FormData(addWorkForm);
  newWork.append("image", newImage);
  newWork.append("title", newTitle);
  newWork.append("category", newCategory);

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${myUser.token}`,
    },
    body: newWork,
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});

// Delete
// let deleteBtn = document.querySelectorAll(".deleteBtn");

// deleteBtn.forEach((e) => {
//   e.onclick = function() {
//     console.log("click !");
//     fetch("http://localhost:5678/api/works/" + id)
//     .then((response) => console.log(response))
//   }
// })