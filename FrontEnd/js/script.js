const gallery = document.getElementById("gallery");
const URL = "http://localhost:5678/api/works";

// Récupération des données de l'API
 fetch(URL)
    .then(function(res){
        if(res.ok){
            return res.json();
        } else {
            alert('La requete a échoué !');
        }
    })
    .then(function(data){
        for(let projets of data){
            gallery.innerHTML += `
                <figure class="item" data-item="${projets.category.name}">
                    <img src="${projets.imageUrl}" alt="${projets.title}">
                     <figcaption>${projets.title}</figcaption>
                </figure>`
        }
    })


//** */ Le filtrage des projets par catégories$
let btnFiltre = document.querySelectorAll('.filtre');
let items = document.querySelectorAll('.item');

console.log(items);
for(let i = 0; i < btnFiltre.length; i++){
    btnFiltre[i].addEventListener('click', function(){
        for (let j = 0; j < btnFiltre.length; j++) {
            btnFiltre[j].classList.remove('active');
        }
        this.classList.add('active');

        console.log(items.textContent);
    })
}

