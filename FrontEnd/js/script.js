const gallery = document.getElementById("gallery");
const URL = "http://localhost:5678/api/works";

// Récupération des données de l'API
fetch(URL)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      alert("La requete a échoué !");
    }
  })
  .then(function (data) {
    for (let projets of data) {
      gallery.innerHTML += `
                <figure class="item" category="${projets.category.name}">
                    <img src="${projets.imageUrl}" alt="${projets.title}">
                     <figcaption>${projets.title}</figcaption>
                </figure>`;
    }
  })
  .then(function () {
    const filtreBtn = document.querySelectorAll("#theFiltre li");
    const works = document.querySelectorAll("#gallery figure");

    filtreBtn.forEach((li) => {
      li.onclick = function () {
        //Filter
        const value = li.textContent;
        works.forEach((figure) => {
          figure.style.display = "none";
          if (figure.getAttribute("category") == value || value == "Tous") {
            figure.style.display = "block";
          }
        });
      };
    });
  });

// ********** */
let btnFiltre = document.querySelectorAll(".filtre");
let items = document.querySelectorAll(".item");

console.log(items);
for (let i = 0; i < btnFiltre.length; i++) {
  btnFiltre[i].addEventListener("click", function () {
    for (let j = 0; j < btnFiltre.length; j++) {
      btnFiltre[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}
