import { InformacoesPets } from "../../../public/js/Pets/informacoesPets.js"; 
import { CardsPets } from "../../../public/js/Pets/cardsPet.js"; 

const urlParams = new URLSearchParams(window.location.search);
const idUrl = parseInt(urlParams.get("id"));

async function buscarOngPorId(id) {
  try {
    const res = await fetch(`http://localhost:6789/ongs/${id}`);
    if (!res.ok) throw new Error("Erro ao buscar ONG");
    
    const dados = await res.json();
    
    return Array.isArray(dados) ? dados[0] : dados; 
  } catch (error) {
    console.error("Erro ao buscar ONG:", error);
    return null;
  }
}

async function preencherPagina() {
  if (!idUrl) {
      console.log("Nenhum ID fornecido na URL");
      return;
  }

  const ong = await buscarOngPorId(idUrl);

  if (!ong) {
    document.getElementById("nomeOng").textContent = "ONG não encontrada";
    return;
  }

  const enderecoCompleto = `${ong.rua || ""}, ${ong.numero || ""} - ${ong.bairro || ""}, ${ong.cidade || ""} - ${ong.sigla || ""}`;
  
  document.getElementById("titleOng").textContent = `${ong.nome} - Patas Conscientes`;
  document.getElementById("nomeOng").textContent = ong.nome;
  document.getElementById("enderecoOng").textContent = enderecoCompleto;
  document.getElementById("descricaoOng").textContent = ong.descricao || "Sem descrição.";
  document.getElementById("caminhoPerfilOng").textContent = ong.nome;

  const fotoUrl = ong.foto || "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg";
  const bannerUrl = ong.banner || "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg";

  const fotoEl = document.getElementById("fotoOng");
  if(fotoEl) {
      fotoEl.style.backgroundImage = `url('${fotoUrl}')`;
      fotoEl.style.backgroundSize = "cover";
      fotoEl.style.backgroundPosition = "center";
  }

  const bannerEl = document.getElementById("bannerOng");
  if(bannerEl) {
      bannerEl.style.backgroundImage = `url('${bannerUrl}')`;
      bannerEl.style.backgroundSize = "cover";
      bannerEl.style.backgroundPosition = "center";
  }

  carregarPetsDaOng(idUrl, ong.nome);
}

async function carregarPetsDaOng(idOng, nomeOng) {
    try {
        const res = await fetch("http://localhost:6789/pets"); 
        if(!res.ok) return;
        
        const todosPets = await res.json();
        
        const petsDaOng = todosPets.filter(p => p.fk_idong === idOng || p.id_ong_fk === idOng);

        const container = document.querySelector(".adotarSec");
        if(container) container.innerHTML = "";

        if(petsDaOng.length === 0) {
            document.getElementById("petsDisponiveis").textContent = "Nenhum pet disponível no momento";
            return;
        }

        document.getElementById("petsDisponiveis").textContent = `${petsDaOng.length} pets disponíveis`;

        petsDaOng.forEach(pet => {
             // Se tiver a classe CardsPets importada corretamente:
             /* const petObj = new InformacoesPets(...);
             const card = new CardsPets(petObj).card;
             container.appendChild(card);
             */
        });

    } catch (e) {
        console.error("Erro ao carregar pets:", e);
    }
}

document.addEventListener("DOMContentLoaded", preencherPagina);