import { CriarElementos } from "../../../public/js/criarElementos.js";

class Redes {
  constructor(ong) {
    this.criarElemento = new CriarElementos();
    this.ongSelecionada = ong;
  }

  redes() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");
    this.divbttRedes = document.createElement('div'); 
    this.divbttRedes.className = "bttRedes";
    
    const infoCard = document.querySelector(".infoCardOngPerfil");
    if(infoCard) {
        const linha = infoCard.querySelector(".linha");
        if(linha) infoCard.insertBefore(this.divbttRedes, linha.nextSibling);
        else infoCard.appendChild(this.divbttRedes);
    }

    const temRede = Object.values(this.ongSelecionada.redes || {}).some((url) => url);

    if (temRede) {
      Object.entries(this.ongSelecionada.redes).forEach(([tipo, url]) => {
        if (url) {
          this.redeA = this.criarElemento.createA(
            null,
            url,
            `${tipo} da ${this.ongSelecionada.nome}.`,
            null,
            this.divbttRedes
          );

          const imgIcon = document.createElement('img');
          imgIcon.src = `/public/img/icons/${tipo}-icon.svg`; 
          imgIcon.alt = `Ícone do ${tipo}`;
          imgIcon.loading = "lazy";
          
          this.redeA.prepend(imgIcon);
          this.redeA.append(` ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`); 
        }
      });
    }
  }
}

class AdicionarBotao {
  constructor(isResponsavel) {
    this.criarElemento = new CriarElementos();
    this.isResponsavel = isResponsavel;
  }

  botaoAdicionar() {
    if (!this.isResponsavel) return;

    this.bttAdicionar = document.querySelector(".bttAdicionar");
    if(!this.bttAdicionar) return;

    this.botaoAdd = this.criarElemento.createElement(
      "button",
      "buttonRosa",
      "Adicionar",
      this.bttAdicionar,
      null
    );
    this.botaoAdd.id = "abrirModalAdicionar";
    
    this.botaoAdd.addEventListener("click", () => {
        const fundoModal = document.getElementById("fundoAdicionarPet"); 
        if(fundoModal) fundoModal.classList.remove("escondido");
    });
  }
}

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

// --- FUNÇÃO DE UPLOAD (Apenas Lógica) ---
function controlarBotoesDeUpload(isResponsavel, idOng) {
  
  // 1. Lógica de Segurança: Se não for dono, remove os botões
  if (!isResponsavel) {
    const botoes = document.querySelectorAll('.bttEditarImg');
    botoes.forEach(btn => btn.remove());
    return;
  }

  // (Removi a parte que alterava o style.position aqui)

  // 2. LÓGICA DO BANNER (Upload)
  const inputBanner = document.getElementById("inputBannerOng");
  if (inputBanner) {
    inputBanner.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("banner", file);

      try {
        document.body.style.cursor = "wait";
        const res = await fetch(`http://localhost:6789/ongs/banner/${idOng}`, {
          method: "PATCH",
          body: formData,
        });

        if (!res.ok) throw new Error("Erro no upload");
        const data = await res.json();

        const bannerEl = document.getElementById("bannerOng");
        if (bannerEl) bannerEl.style.backgroundImage = `url('${data.path}')`;
        
        alert("Banner atualizado!");
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar banner.");
      } finally {
        document.body.style.cursor = "default";
      }
    });
  }

  // 3. LÓGICA DA FOTO DE PERFIL (Upload)
  const inputFoto = document.getElementById("fotoPerfilOng");
  if (inputFoto) {
    inputFoto.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("foto", file);

      try {
        document.body.style.cursor = "wait";
        const res = await fetch(`http://localhost:6789/ongs/foto/${idOng}`, {
          method: "PATCH",
          body: formData,
        });

        if (!res.ok) throw new Error("Erro no upload");
        const data = await res.json();

        const fotoEl = document.getElementById("fotoOng");
        if (fotoEl) fotoEl.style.backgroundImage = `url('${data.path}')`;
        
        alert("Foto atualizada!");
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar foto.");
      } finally {
        document.body.style.cursor = "default";
      }
    });
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

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  
  // --- LÓGICA DE VERIFICAÇÃO DE DONO (Corrigida) ---
  const idUserLogado = usuarioLogado ? (usuarioLogado.idusuario || usuarioLogado.id) : null;
  // Usa o campo novo 'id_dono' (se você atualizou o service) ou tenta o responsável direto
  const idDonoDaOng = ong.id_dono || ong.fk_idresponsavel; 

  const isResponsavel = idUserLogado && idDonoDaOng && (Number(idUserLogado) === Number(idDonoDaOng));
  // -------------------------------------------------

  const redesOng = new Redes(ong);
  redesOng.redes();

  const botaoAdd = new AdicionarBotao(isResponsavel);
  botaoAdd.botaoAdicionar();

  controlarBotoesDeUpload(isResponsavel, idUrl);

  const enderecoCompleto = `${ong.rua || ""}, ${ong.numero || ""} - ${ong.bairro || ""}, ${ong.cidade || ""} - ${ong.sigla || ""}`;

  document.getElementById("titleOng").textContent = `${ong.nome} - Patas Conscientes`;
  document.getElementById("nomeOng").textContent = ong.nome;
  document.getElementById("enderecoOng").textContent = enderecoCompleto;
  document.getElementById("descricaoOng").textContent = ong.descricao || "Sem descrição.";
  document.getElementById("caminhoPerfilOng").textContent = ong.nome;

  const fotoUrl = ong.foto || "/public/img/user_ong/user/gato_user_ONG.svg";
  const bannerUrl = ong.banner || "/public/img/user_ong/banners/Banner_misto_rosa_ONG.svg";

  const fotoEl = document.getElementById("fotoOng");
  if (fotoEl) {
    fotoEl.style.backgroundImage = `url('${fotoUrl}')`;
    fotoEl.style.backgroundSize = "cover";
    fotoEl.style.backgroundPosition = "center";
  }

  const bannerEl = document.getElementById("bannerOng");
  if (bannerEl) {
    bannerEl.style.backgroundImage = `url('${bannerUrl}')`;
    bannerEl.style.backgroundSize = "cover";
    bannerEl.style.backgroundPosition = "center";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  preencherPagina();

  const toggleButton = document.getElementById('toggleEstatisticas');
  const statisticsDiv = document.getElementById('divEstatisticas');
  let chartInstance = null;

  if (toggleButton && statisticsDiv) {
    toggleButton.addEventListener('click', async function () {
      statisticsDiv.classList.toggle('aberto');
      toggleButton.classList.toggle('aberto');
      const isExpanded = toggleButton.classList.contains('aberto');
      toggleButton.setAttribute('aria-expanded', isExpanded);

      if (isExpanded) {
        if (!idUrl) return;
        try {
          const response = await fetch("http://localhost:6789/pets");
          if (!response.ok) throw new Error("Erro ao buscar pets");
          const todosPets = await response.json();

          const petsDaOng = todosPets.filter(pet => {
            const pertenceOng = (pet.fk_idong === idUrl || pet.id_ong_fk === idUrl);
            const disponivel = pet.status && pet.status.toLowerCase() === 'disponível';
            return pertenceOng && disponivel;
          });

          const qtdCachorros = petsDaOng.filter(p => p.especie && p.especie.toLowerCase() === 'cachorro').length;
          const qtdGatos = petsDaOng.filter(p => p.especie && p.especie.toLowerCase() === 'gato').length;

          const isDarkMode = document.body.classList.contains('bodyME');
          const corTexto = isDarkMode ? '#ffffff' : '#555555';
          const ctx = document.getElementById('graficoDadosOng');

          if (chartInstance) chartInstance.destroy();

          const data = {
            labels: ['Cachorro', 'Gato'],
            datasets: [{
              label: 'Pets Disponíveis',
              data: [qtdCachorros, qtdGatos],
              backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
              borderWidth: 1,
              hoverOffset: 4
            }]
          };

          const config = {
            type: 'pie',
            data: data,
            options: {
              responsive: false,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { color: corTexto, font: { size: 14 } } },
                title: { display: true, text: `Total: ${qtdCachorros + qtdGatos} pets disponíveis`, color: corTexto, font: { size: 16 } }
              }
            }
          };
          chartInstance = new Chart(ctx, config);
        } catch (error) {
          console.error("Erro estatísticas:", error);
        }
      } else {
        if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
      }
    });
  }
});