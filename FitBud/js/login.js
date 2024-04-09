document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var usernameInput = document.getElementById("rusername-input");
        var passwordInput = document.getElementById("rpassword-input");
        var emailInput = document.getElementById("remail-input");

        if (usernameInput.value !== "" && passwordInput.value !== "" && emailInput.value !== "") {
            document.querySelector(".register-message").style.display = "block";
        }
    });


    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var usernameInput = document.getElementById("lusername-input");
        var passwordInput = document.getElementById("lpassword-input");

        let userFound = false;
        users.forEach(function(user) {
            if (user.username === usernameInput.value && user.password === passwordInput.value) {
                userFound = true
            }
        });
        if (!userFound) {
            document.querySelector(".login-error-message").style.display = "block";
        } else {
            window.location.href = "userPage.html";
        }
    });
});