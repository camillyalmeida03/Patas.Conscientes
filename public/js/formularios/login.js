  // Lógica para mostrar/ocultar senha (se já não estiver implementada em outro lugar)
    const togglePassword = document.getElementById("togglePassword");
    const senhaInput = document.getElementById("senhaLoginUsuario");
    const olhoIcon = document.getElementById("olho"); // Assumindo que o ID da tag <img> é "olho"

    if (togglePassword && senhaInput && olhoIcon) {
        togglePassword.addEventListener("click", function () {
            const type = senhaInput.getAttribute("type") === "password" ? "text" : "password";
            senhaInput.setAttribute("type", type);

            // Altera o ícone do olho
            if (type === "password") {
                olhoIcon.src = "/public/img/icons/olhofechado.svg";
                olhoIcon.title = "Mostrar senha";
            } else {
                olhoIcon.src = "/public/img/icons/olhoaberto.svg"; // Certifique-se que este ícone existe
                olhoIcon.title = "Ocultar senha";
            }
        });
    };