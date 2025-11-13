import { tipo } from "../header.js";

const modalCadOng = document.querySelector("#modalCadOng");
const modalCadOngPOngs = document.querySelector("#modalCadOngPOngs")
const aviso = document.querySelector(".aviso");

document.addEventListener("DOMContentLoaded", () => {
    if (tipo === "naoLogado") {
        // usuário não logado
        modalCadOng.classList.remove("escondido");
        document.body.style.overflow = "hidden";
        aviso.classList.add("escondido");
    } else if (tipo === "usuario") {

    }
    else if (tipo === "ong") {
        modalCadOngPOngs.classList.remove("escondido");
        document.body.style.overflow = "hidden";
        aviso.classList.add("escondido");
    }
});
