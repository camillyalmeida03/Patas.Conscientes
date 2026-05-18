export function aplicarCorStatus(elemento) {
    const status = elemento.textContent.trim().toLowerCase();

    switch (status) {
        case "disponível":
        case "disponivel":
            elemento.style.backgroundColor = "#228825ff";
            break;

        case "indisponível":
        case "indisponivel":
            elemento.style.backgroundColor = "#a81b11ff";
            break;

        case "em processo":
            elemento.style.backgroundColor = "#f0b913ff";
            break;

        case "adotado":
            elemento.style.backgroundColor = "#0363a3ff";
            break;

        default:
            elemento.style.backgroundColor = "#BDBDBD";
    }
}