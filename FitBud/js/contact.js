document.addEventListener("DOMContentLoaded", function() {
    var contactMessage = document.querySelector(".contact-message");
    var contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var nameInput = document.getElementById("name-input");
        var emailInput = document.getElementById("email-input");
        var messageInput = document.getElementById("message-input");

        if (nameInput.value !== "" && emailInput.value !== "" && messageInput.value !== "") {
            contactMessage.style.display = "block";
        }
    });
});