document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    contactForm.addEventListener("submit", function (e) {
        let valid = true;

        if (nameInput.value === "") {
            nameError.textContent = "Por favor, ingrese su nombre.";
            valid = false;
        } else {
            nameError.textContent = "";
        }

        if (emailInput.value === "") {
            emailError.textContent = "Por favor, ingrese su correo electrónico.";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        if (messageInput.value === "") {
            messageError.textContent = "Por favor, ingrese un mensaje.";
            valid = false;
        } else {
            messageError.textContent = "";
        }

        if (!valid) {
            e.preventDefault(); // Evitar que se envíe el formulario si hay errores
        }
    });
});