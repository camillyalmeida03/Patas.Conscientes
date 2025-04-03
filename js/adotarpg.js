function limparRadioButtons() {
    // Grupos de radio buttons para limpar
    const radioGroups = ['filter1', 'filter2', 'filter3'];

    // Desmarca todos os radios em cada grupo
    radioGroups.forEach(group => {
        const radios = document.getElementsByName(group);
        radios.forEach(radio => radio.checked = false);
    });

    // IDs de checkboxes para desmarcar
    const todasOngs = ["ong1F", "ong2F", "ong3F", "ong4F", "ong5F"];
    todasOngs.forEach(id => document.getElementById(id).checked = false);

    const sexos = ["femeaF", "machoF"];
    sexos.forEach(id => document.getElementById(id).checked = false);

    // Criação do elemento de imagem para "removido"
    const feedback = document.createElement('img');
    feedback.src = '/img/feedback/filtro_limpo.svg';
    feedback.style.position = 'fixed';
    feedback.style.top = '5rem';
    feedback.style.right = '2rem';
    feedback.style.zIndex = '4000';
    feedback.style.height = '6rem';

    // Adiciona a imagem ao body
    document.body.appendChild(feedback);

    // Remove a imagem após 3 segundos
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}



function abrirFiltros() {
    const botFiltros = document.getElementById("botFiltros");
    const filtro = document.getElementById("filtro");

    filtro.style.display = 'flex';
}

function fecharFiltros() {
    const filtro = document.getElementById("filtro");
    const fecharFiltros = document.getElementById("fecharFiltros");

    filtro.style.display = 'none';

}

const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach(radio => {
    radio.addEventListener('click', function () {
        if (this.checked) {
            const wasChecked = this.dataset.checked === "true";
            if (wasChecked) {
                this.checked = false;
                this.dataset.checked = "false";
            } else {
                radios.forEach(r => r.dataset.checked = "false");
                this.dataset.checked = "true";
            }
        }
    });
});

// Classe representando os dados de um Pet
class Pet {
    constructor(id, nome, sexo, peso, idade, especie, porte, raca, sobre, ongNome, ongLink) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
        this.peso = peso;
        this.idade = idade;
        this.especie = especie;
        this.raca = raca;
        this.sobre = sobre;
        this.porte = porte;
        this.ongNome = ongNome;
        this.ongLink = ongLink;
    }
}

// Classe responsável pela interface da aba "Mais Sobre o Pet"
class UIAbaMaisSobrePet {
    constructor(pet) {
        this.pet = pet;
        this.fundoAba = document.createElement("div");
        this.fundoAba.classList.add("fundoAba");
        document.body.appendChild(this.fundoAba);

        this.maisInfoPet = document.createElement("div");
        this.maisInfoPet.classList.add("maisInfoPet");
        this.fundoAba.appendChild(this.maisInfoPet);

        this.fotoPet = document.createElement("div");
        this.fotoPet.classList.add("fotoPet");
        this.maisInfoPet.appendChild(this.fotoPet);

        this.infoBotaoCardPet = document.createElement("div");
        this.infoBotaoCardPet.classList.add("infoBotaoCardPet");
        this.maisInfoPet.appendChild(this.infoBotaoCardPet);

        this.conjOngBotFechar = document.createElement("div");
        this.conjOngBotFechar.classList.add("conjOngBotFechar");
        this.infoBotaoCardPet.appendChild(this.conjOngBotFechar);

        this.linkOng = document.createElement("a");
        this.linkOng.classList.add("linkDesc");
        this.linkOng.href = pet.ongLink;
        this.linkOng.innerText = `ONG - ${pet.ongNome}`;
        this.conjOngBotFechar.appendChild(this.linkOng);

        this.fecharAba = document.createElement("button");
        this.fecharAba.innerHTML = `<svg viewBox="0 -960 960 960" fill="#5f6368" class="iconFechar"><path d="m287-216-69-71 192-193-192-195 69-71 194 195 192-195 69 71-192 195 192 193-69 71-192-195-194 195Z" /></svg>`;
        this.fecharAba.addEventListener("click", () => this.esconderFundoDaAba());
        this.conjOngBotFechar.appendChild(this.fecharAba);

        this.conjNomeSexo = document.createElement("div");
        this.conjNomeSexo.classList.add("conjNomeSexo");
        this.infoBotaoCardPet.appendChild(this.conjNomeSexo);

        this.nomePet = document.createElement("h2");
        this.nomePet.innerText = pet.nome;
        this.conjNomeSexo.appendChild(this.nomePet);

        this.sexoPet = document.createElement("div");
        this.sexoPet.classList.add("sexoPet");
        if (pet.sexo === 1) {
            this.sexoPet.classList.add("femea");
        } else if (pet.sexo === 2) {
            this.sexoPet.classList.add("macho");
        } else {
            console.log("Erro ao carregar o sexo.");
        }
        this.conjNomeSexo.appendChild(this.sexoPet);

        this.conjInfoPetBtt = document.createElement("div");
        this.conjInfoPetBtt.classList.add("conjInfoPetBtt");
        this.infoBotaoCardPet.appendChild(this.conjInfoPetBtt);

        this.infoPet = document.createElement("div");
        this.infoPet.classList.add("infoPet");
        this.conjInfoPetBtt.appendChild(this.infoPet);

        // 
        this.pesoIdade = document.createElement("div");
        this.pesoIdade.id = "pesoIdade";
        this.infoPet.appendChild(this.pesoIdade);

        this.conjTituloPeso = document.createElement("div");
        this.pesoIdade.appendChild(this.conjTituloPeso);

        this.tituloPeso = document.createElement("h3");
        this.tituloPeso.classList.add("tituloInfoPet");
        this.tituloPeso.innerText = "Peso";
        this.conjTituloPeso.appendChild(this.tituloPeso);

        this.pesoPet = document.createElement("p");
        this.pesoPet.innerText = pet.peso;
        this.pesoPet.id = "pesoPet";
        this.conjTituloPeso.appendChild(this.pesoPet);

        this.conjTituloIdade = document.createElement("div");
        this.pesoIdade.appendChild(this.conjTituloIdade);

        this.tituloIdade = document.createElement("h3");
        this.tituloIdade.classList.add("tituloInfoPet");
        this.tituloIdade.innerText = "Idade";
        this.conjTituloIdade.appendChild(this.tituloIdade);

        this.idadePet = document.createElement("p");
        this.idadePet.innerText = pet.idade;
        this.idadePet.id = "idadePet";
        this.conjTituloIdade.appendChild(this.idadePet);

        // 
        this.especPorte = document.createElement("div");
        this.especPorte.id = "especPorte";
        this.infoPet.appendChild(this.especPorte);

        this.conjTituloEspecie = document.createElement("div");
        this.especPorte.appendChild(this.conjTituloEspecie);

        this.tituloEspecie = document.createElement("h3");
        this.tituloEspecie.classList.add("tituloInfoPet");
        this.tituloEspecie.innerText = "Espécie";
        this.conjTituloEspecie.appendChild(this.tituloEspecie);

        this.especiePet = document.createElement("p");
        this.especiePet.innerText = pet.especie;
        this.especiePet.id = "especiePet";
        this.conjTituloEspecie.appendChild(this.especiePet);

        this.conjTituloPorte = document.createElement("div");
        this.especPorte.appendChild(this.conjTituloPorte);

        this.tituloPorte = document.createElement("h3");
        this.tituloPorte.classList.add("tituloInfoPet");
        this.tituloPorte.innerText = "Porte";
        this.conjTituloPorte.appendChild(this.tituloPorte);

        this.portePet = document.createElement("p");
        this.portePet.innerText = pet.porte;
        this.portePet.id = "portePet";
        this.conjTituloPorte.appendChild(this.portePet);

        // 
        this.triploInfo = document.createElement("div");
        this.triploInfo.id = "triploInfo";
        this.infoPet.appendChild(this.triploInfo);

        this.conjTituloRaca = document.createElement("div");
        this.triploInfo.appendChild(this.conjTituloRaca);

        this.tituloRaca = document.createElement("h3");
        this.tituloRaca.classList.add("tituloInfoPet");
        this.tituloRaca.innerText = "Raça";
        this.conjTituloRaca.appendChild(this.tituloRaca);

        this.racaPet = document.createElement("p");
        this.racaPet.innerText = pet.raca;
        this.racaPet.id = "racaPet";
        this.conjTituloRaca.appendChild(this.racaPet);

        this.conjTituloOng = document.createElement("div");
        this.triploInfo.appendChild(this.conjTituloOng);

        this.tituloOng = document.createElement("h3");
        this.tituloOng.classList.add("tituloInfoPet");
        this.tituloOng.innerText = "Local";
        this.conjTituloOng.appendChild(this.tituloOng);

        this.ongPet = document.createElement("p");
        this.ongPet.innerText = pet.ongNome;
        this.ongPet.id = "ongPet";
        this.conjTituloOng.appendChild(this.ongPet);

        this.conjTituloSobre = document.createElement("div");
        this.triploInfo.appendChild(this.conjTituloSobre);

        this.tituloSobre = document.createElement("h3");
        this.tituloSobre.classList.add("tituloInfoPet");
        this.tituloSobre.innerText = "Sobre";
        this.conjTituloSobre.appendChild(this.tituloSobre);

        this.sobrePet = document.createElement("p");
        this.sobrePet.innerText = pet.sobre;
        this.sobrePet.id = "sobrePet";
        this.conjTituloSobre.appendChild(this.sobrePet);

        // 
        this.bttcard = document.createElement("div");
        this.bttcard.classList.add("bttcard");
        this.conjInfoPetBtt.appendChild(this.bttcard);

        this.botaoAdotar = document.createElement("button");
        this.botaoAdotar.innerText = "Adotar";
        this.botaoAdotar.classList.add("buttonRosa");
        this.botaoAdotar.title = "Botão para levar a página de adoção deste animal";
        this.bttcard.appendChild(this.botaoAdotar);

        this.conjFavoritarCompartilhar = document.createElement("div");
        this.conjFavoritarCompartilhar.classList.add("conjFavoritarCompartilhar");
        this.bttcard.appendChild(this.conjFavoritarCompartilhar);

        this.adicionarFavorito = document.createElement("button");
        this.adicionarFavorito.classList.add("favoritar", "adicionarFav")
        this.adicionarFavorito.title = "Favoritar";
        this.conjFavoritarCompartilhar.appendChild(this.adicionarFavorito);

        this.apagarFavorito = document.createElement("button");
        this.apagarFavorito.classList.add("favoritar", "apagarFav");
        this.apagarFavorito.title = "Desfavoritar";
        this.conjFavoritarCompartilhar.appendChild(this.apagarFavorito);

        this.compartilharPet = document.createElement("button");
        this.compartilharPet.innerHTML = `<svg viewBox="0 -960 960 960" fill="#000000"><path d="M640.22-116q-44.91 0-76.26-31.41-31.34-31.41-31.34-76.28 0-9 5.15-30.16L297.31-402.31q-14.46 14-33.41 22-18.94 8-40.59 8-44.71 0-76.01-31.54Q116-435.39 116-480q0-44.61 31.3-76.15 31.3-31.54 76.01-31.54 21.74 0 40.64 8 18.9 8 33.36 22l240.46-148.08q-2.38-7.38-3.77-14.77-1.38-7.39-1.38-15.77 0-44.87 31.43-76.28Q595.49-844 640.4-844t76.25 31.44Q748-781.13 748-736.22q0 44.91-31.41 76.26-31.41 31.34-76.28 31.34-21.85 0-40.5-8.19Q581.15-645 566.69-659L326.23-510.54q2.38 7.39 3.77 14.77 1.38 7.39 1.38 15.77 0 8.38-1.38 15.77-1.39 7.38-3.77 14.77L566.69-301q14.46-14 33.16-22.19 18.7-8.19 40.46-8.19 44.87 0 76.28 31.43Q748-268.51 748-223.6t-31.44 76.25Q685.13-116 640.22-116Zm.09-52q23.67 0 39.68-16.01Q696-200.02 696-223.69q0-23.67-16.01-39.68-16.01-16.02-39.68-16.02-23.67 0-39.68 16.02-16.02 16.01-16.02 39.68 0 23.67 16.02 39.68Q616.64-168 640.31-168Zm-417-256.31q23.83 0 39.95-16.01 16.13-16.01 16.13-39.68 0-23.67-16.13-39.68-16.12-16.01-39.95-16.01-23.51 0-39.41 16.01Q168-503.67 168-480q0 23.67 15.9 39.68 15.9 16.01 39.41 16.01Zm417-256.3q23.67 0 39.68-16.02Q696-712.64 696-736.31q0-23.67-16.01-39.68Q663.98-792 640.31-792q-23.67 0-39.68 16.01-16.02 16.01-16.02 39.68 0 23.67 16.02 39.68 16.01 16.02 39.68 16.02Zm0 456.92ZM223.69-480Zm416.62-256.31Z" /></svg>`;
        this.compartilharPet.title = "Compartilhar este Pet"
        this.compartilharPet.classList.add("compartilharPet");
        this.conjFavoritarCompartilhar.appendChild(this.compartilharPet);
    }

    mostrarFundoDaAba() {   
        if (window.innerWidth > 650) { // Só exibe se a largura for maior que 650px
            this.fundoAba.style.display = "flex";
            document.body.style.overflow = "hidden";
        } else {
            this.fundoAba.style.display = "none";
            document.body.style.overflow = "auto";
        }
    
        // Verifica se a largura da tela mudar para 650px ou menos
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 650) {
                this.esconderFundoDaAba();
            }
        });
    }
    
    
    esconderFundoDaAba() {
        this.fundoAba.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Simulação de carregamento de dados
async function carregarPets() {
    const response = await fetch("/api/pets"); // No futuro, API do banco de dados
    const petsData = await response.json();

    petsData.forEach((pet) => {
        const petObj = new Pet(pet.id, pet.nome, pet.sexo, pet.peso, pet.idade, pet.especie, pet.porte, pet.raca, pet.sobre, pet.ongNome, pet.ongLink);
        const abaPet = new UIAbaMaisSobrePet(petObj);
            abaPet.mostrarFundoDaAba();
    });
}

// Exemplo de uso com dados estáticos
const petExemplo = new Pet(1, "Mia", 1, 3.5, 4, "Gato", "Pequeno", "Vira-Lata", "Mia é uma gatinha elegante e graciosa. Com 4 anos, ela já desenvolveu uma personalidade calma e independente, mas não dispensa momentos de carinho, especialmente nas manhãs ensolaradas quando gosta de deitar ao sol. Ela é curiosa e adora observar tudo ao seu redor, especialmente do alto de prateleiras ou janelas, onde se sente como a rainha da casa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum maxime laborum sit rerum! Tempore commodi dolorem id velit nulla soluta quam at sapiente excepturi laudantium earum, possimus fuga fugit voluptas.", "Patas Amigas", "/ongs.html");
const abaPetExemplo = new UIAbaMaisSobrePet(petExemplo);

let verMais = document.querySelectorAll(".verMais");

// Correção no EventListener
for (let i = 0; i < verMais.length; i++) {
    verMais[i].addEventListener("click", () => abaPetExemplo.mostrarFundoDaAba());
}