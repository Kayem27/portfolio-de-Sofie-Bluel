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
  if (!(email === "sophie.bluel@test.tld" && password === "S0phie")) {
    // rest input value
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } else {
    fetch("http://localhost:5678/api/users/login", {
      method: "post",
      body: JSON.stringify(userLogs),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (user) {
        window.localStorage.setItem("token", user.token);
      })
      .then(function () {
        email = "";
        password = "";
        document.location.href = "http://127.0.0.1:5500/";
      });
  }
});
