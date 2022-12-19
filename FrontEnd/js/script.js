const gallery = document.getElementById("gallery");
const editGallery = document.getElementById("editGallery");
const WorksURL = "http://localhost:5678/api/works";
const CategoryURL = "http://localhost:5678/api/categories";

let items = document.querySelectorAll(".item");
const theFiltre = document.getElementById("theFiltre");

const template = function (projets) {
  gallery.innerHTML += `
                <figure class="item" category="${projets.category.id}">
                    <img src="${projets.imageUrl}" alt="${projets.title}">
                     <figcaption>${projets.title}</figcaption>
                </figure>`;
};
const categoryTemplate = function (categorie) {
  theFiltre.innerHTML += `<li class="filtre" categoryID="${categorie.id}">${categorie.name}</li>`;
};
const editGalleryTemplate = function (projets) {
  editGallery.innerHTML += `
      <figure>
        <span class="deleteBtn"><i class="fa-solid fa-trash-can"></i></span>
  <!--  <span><i class="fa-solid fa-arrows-up-down-left-right"></i></span> -->
        <img src="${projets.imageUrl}" alt="${projets.title}">
        <figcaption id ="editBtn">éditer</figcaption>
      </figure>`;
};
// Les catégories
fetch(CategoryURL)
  .then((response) => response.json())
  .then(function (categories) {
    theFiltre.innerHTML += `<li class="filtre active" categoryID="0">Tous</li>`;
    for (let myCategory of categories) {
      categoryTemplate(myCategory);
    }
  })
  // Changement de couleur ( btn active )
  .then(function () {
    let btnFiltre = document.querySelectorAll(".filtre");
    // console.log(items);
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

// Récupération et affichage des projets
fetch(WorksURL)
  .then((res) => res.json())
  .then(function (data) {
    // Affichage des projets
    for (let projets of data) {
      template(projets);
      editGalleryTemplate(projets);
    }
  })

  // Le fonction de filtres
  .then(function () {
    const filtreBtn = document.querySelectorAll("#theFiltre li");
    const works = document.querySelectorAll("#gallery figure");

    filtreBtn.forEach((li) => {
      li.onclick = function () {
        //Filter
        const value = li.getAttribute("categoryID");
        // console.log(value);
        works.forEach((figure) => {
          figure.style.display = "none";
          if (figure.getAttribute("category") === value || value === "0") {
            figure.style.display = "block";
          }
        });
      };
    });
  })
  .catch((error) => {
    console.log(error);
    alert("Une erreur est survenue, veuillez réessayer ultérieurement !");
  });

