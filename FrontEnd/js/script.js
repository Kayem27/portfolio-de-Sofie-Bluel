const gallery = document.getElementById("gallery");
const URL = "http://localhost:5678/api/works";

const template = function (projets) {
  gallery.innerHTML += `
                <figure class="item" category="${projets.category.id}">
                    <img src="${projets.imageUrl}" alt="${projets.title}">
                     <figcaption>${projets.title}</figcaption>
                </figure>`;
};

// Récupération et affichage des projets
fetch(URL)
  .then((res) => res.json())
  .then(function (data) {
    // console.log(data);

    // Affichage des projets
    for (let projets of data) {
      template(projets);
    }
  })

  .then(function () {
    const filtreBtn = document.querySelectorAll("#theFiltre li");
    const works = document.querySelectorAll("#gallery figure");

    filtreBtn.forEach((li) => {
      li.onclick = function () {
        //Filter
        const value = li.getAttribute("categoryID");
        console.log(value);
        works.forEach((figure) => {
          figure.style.display = "none";
          if (figure.getAttribute("category") === value || value === "0") {
            figure.style.display = "block";
          }
        });
      };
    });
  });

// ********** */
let btnFiltre = document.querySelectorAll(".filtre");
let items = document.querySelectorAll(".item");

// console.log(items);
for (let i = 0; i < btnFiltre.length; i++) {
  btnFiltre[i].addEventListener("click", function () {
    for (let j = 0; j < btnFiltre.length; j++) {
      btnFiltre[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}
