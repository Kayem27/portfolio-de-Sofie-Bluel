let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector('.loginNav');
let myUser = window.localStorage.getItem("myUser");
const logoutBtn = document.getElementById("logout");
const editionMode = document.getElementById("editionMode");

// console.log(editionElements);

if(myUser != undefined && myUser != "" && myUser != null){
    console.log(myUser);
    editionElements.forEach(function(elements){
        elements.style.visibility = "visible";
    })
    loginNav.style.display="none";
    editionMode.style.display = "flex";
};
// ---------------------------------------

// Déconnexion
logoutBtn.addEventListener('click', function(){
    window.localStorage.removeItem("myUser");
    location.reload();
})