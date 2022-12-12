let editionElements = document.querySelectorAll(".editionElements");
let loginNav = document.querySelector('.loginNav')
let token = window.localStorage.getItem("token");

// console.log(editionElements);

if(token != undefined && token != "" && token != null){
    editionElements.forEach(function(elements){
        elements.style.visibility = "visible";
    })
    loginNav.style.display="none";
}