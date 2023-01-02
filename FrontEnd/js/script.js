const gallery = document.getElementById("gallery");
const editGallery = document.getElementById("editGallery");
const categorySelect = document.getElementById("category");
let myUser = JSON.parse(localStorage.getItem("myUser"));
let items = document.querySelectorAll(".item");
const theFiltre = document.getElementById("theFiltre");


// reseinitialiser les templates
function resetTemplate() {
  gallery.innerHTML = "";
  editGallery.innerHTML = "";
}
// Template pour l'affichages des données
const template = function (projets) {
  gallery.innerHTML += `
                <figure class="item" category="${projets.category.id}">
                    <img crossorigin="anonymous" src="${projets.imageUrl}" alt="${projets.title}">
                     <figcaption>${projets.title}</figcaption>
                </figure>`;
};
const categoryTemplate = function (categorie) {
  theFiltre.innerHTML += `<li class="filtre" categoryID="${categorie.id}">${categorie.name}</li>`;
};
const editGalleryTemplate = function (projets) {
  editGallery.innerHTML += `
      <figure>
        <span data-id ="${projets.id}" class="deleteBtn"><i class="fa-solid fa-trash-can"></i></span>
  <!--  <span><i class="fa-solid fa-arrows-up-down-left-right"></i></span> -->
        <img crossorigin="anonymous" src="${projets.imageUrl}" alt="${projets.title}">
        <figcaption id ="editBtn">éditer</figcaption>
      </figure>`;
};

// Récupération et affichage des catégories
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then(function (categories) {
    theFiltre.innerHTML += `<li class="filtre active" categoryID="0">Tous</li>`;
    for (let myCategory of categories) {
      categoryTemplate(myCategory);
      // Les catégories dans le formulaire d'ajout de projet
      categorySelect.innerHTML += `<option value="${myCategory.id}">${myCategory.name}</option>`;
    }
  })
  // Changement de couleur des boutons ( btn active )
  .then(function () {
    let btnFiltre = document.querySelectorAll(".filtre");
    for (let i = 0; i < btnFiltre.length; i++) {
      btnFiltre[i].addEventListener("click", function () {
        for (let j = 0; j < btnFiltre.length; j++) {
          btnFiltre[j].classList.remove("active");
        }
        this.classList.add("active");
      });
    }
  })
  .catch((err) => console.error(error));

//--------------------------------------------
// Render pour le
function render() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then(function (data) {
      // Affichage des projets
      for (let projets of data) {
        template(projets);
        editGalleryTemplate(projets);
      }
    })
    // Filtrage des projets
    .then(function () {
      const filtreBtn = document.querySelectorAll("#theFiltre li");
      const works = document.querySelectorAll("#gallery figure");

      filtreBtn.forEach((li) => {
        li.onclick = function () {
          const value = li.getAttribute("categoryID");
          works.forEach((figure) => {
            figure.style.display = "none";
            if (figure.getAttribute("category") === value || value === "0") {
              figure.style.display = "block";
            }
          });
        };
      });
    })
    // Suppression d'un projet
    .then(function () {
      let deleteBtn = document.querySelectorAll(".deleteBtn");
      deleteBtn.forEach((e) => {
        e.onclick = function () {
          if (confirm("êtes-vous sûr de vouloir supprimer ce projet ?")) {
            let id = e.getAttribute("data-id");
            fetch("http://localhost:5678/api/works/" + id, {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + myUser.token,
              },
            })
              .then(function(response){
                if(response.ok){
                  resetTemplate();
                  render();
                }
              })
              .catch((err) => console.error(err))
          }
        };
      });
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur est survenue, veuillez réessayer ultérieurement !");
    });
}
render();

// Ajout de nouveaux projets
const addWorkForm = document.getElementById("addWorkForm");
const modal = document.querySelector(".modal");

addWorkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let newWork = new FormData();
  newWork.append("image", document.getElementById("image").files[0]);
  newWork.append("title", document.getElementById("title").value);
  newWork.append(
    "category",
    categorySelect.options[categorySelect.selectedIndex].value
  );

  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + myUser.token,
    },
    body: newWork,
  })
    .then(function (response) {
      if(response.ok){
        addWorkForm.reset(); // réinitialise le formulaire
        modal.classList.remove("show-modal"); // Fait disparaitre la modale
        resetTemplate();
        render();
      }
    })
    .catch((err) => console.log(err));
});

// ---------------------------------------
let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector(".loginNav");
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
  console.log("Vous n'etes pas connectés");
}

// Déconnexion
logoutBtn.addEventListener("click", function () {
  if (confirm("êtes-vous sûr de vouloir vous déconnecter ?")) {
    window.localStorage.removeItem("myUser");
    location.reload(); 
  }
});
