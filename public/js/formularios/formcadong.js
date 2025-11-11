let formCadOng = document.querySelector("#formCadOng");
let formDocs = document.querySelector("#formDocs");
let bttEtapa1 = document.querySelector("#bttEtapa1");
let bttEtapa2 = document.querySelector("#bttEtapa2");

if (formCadOng && formDocs) {
    // console.log("oiii")
    const displayDocs = window.getComputedStyle(formDocs).display;

    if (displayDocs === "flex") {
        bttEtapa2.classList.add("bolinhaAtiva");
    }
}
