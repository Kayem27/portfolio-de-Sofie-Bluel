let formulaire = document.getElementById("loginForm");

// Soumission du formualre de connexion
formulaire.addEventListener("submit", function (event) {
  event.preventDefault(); // no refresh page after submit

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const userLogs = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify(userLogs),
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(function (res) {
      if (res.token) {
        window.localStorage.setItem("myUser", JSON.stringify(res));
        document.location.href = "/";
      } else if (res.message) {
        alert("Cet utilisateur n'existe pas !");
      } else {
        alert("Mot de passe Incorrecte !");
      }
    })
    .catch(function (err) {
      email = "";
      password = "";
      console.log(err);
      alert("Une erreur est survenue, veuillez réessayer ultérieurement !");
    });
});
