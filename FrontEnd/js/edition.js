let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector(".loginNav");
let token = window.localStorage.getItem("token");
let userId = window.localStorage.getItem("userId");
const logoutBtn = document.getElementById("logout");
const editionMode = document.getElementById("editionMode");


if (token != undefined && token != "" && token != null) {
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

  let newImage = document.getElementById("image").value;
  let newTitle = document.getElementById("title").value;
  let newCategory = document.getElementById("category").value;

  let newWork = new FormData(addWorkForm);
  newWork.append("image", JSON.stringify(newImage));
  newWork.append("title", newTitle);
  newWork.append("category", newCategory);
  
  // const newProjets = {
  //   image: newImage,
  //   title: newTitle,
  //   category: newCategory,
  // };
  console.log(newWork.get("image"));
  console.log(newWork.get("title"));
  console.log(newWork.get("category"));
  console.log(`Bearer ${token}`);

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
    body: newWork,
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});
