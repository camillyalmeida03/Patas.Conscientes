// import { InformacoesPets } from "../pets/informacoesPets.js"; 
// import { CardsPets } from "../../../public/js/Pets/cardsPet.js";
import { CriarElementos } from "../../../public/js/criarElementos.js";

class Redes {
  constructor(ong) {
    this.criarElemento = new CriarElementos();
    this.ongSelecionada = ong;
  }

  redes() {
    this.infoCardOngPerfil = document.querySelector(".infoCardOngPerfil");

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

          this.imgA = this.criarElemento.createImg(
            null,
            `img/icons/${tipo}-icon.svg`,
            `Ícone do ${tipo}`,
            "lazy",
            this.redeA
          );

          this.redeA.append(` ${tipo}`);
        }
      });
    } else {
      console.log("Esta ONG não tem redes sociais cadastradas.");
    }
  }
}

class AdicionarBotao {
  constructor(isResponsavel) {
    this.criarElemento = new CriarElementos();
    this.isResponsavel = isResponsavel;
  }

  botaoAdicionar() {
    // SÓ CRIA O BOTÃO SE A PESSOA FOR RESPONSÁVEL
    if (!this.isResponsavel) {
      // Lógica opcional se não for responsável
    }

    this.bttAdicionar = document.querySelector(".bttAdicionar");

    this.botaoAdd = this.criarElemento.createElement(
      "button",
      "buttonRosa",
      "Adicionar",
      this.bttAdicionar,
      null
    );
    this.botaoAdd.id = "abrirModalAdicionar";
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
  // const ongSalva = JSON.parse(localStorage.getItem('ong')); // Não está sendo usado

  const idResponsavelOng = ong.fk_idresponsavel;

  const isResponsavel = usuarioLogado &&
    usuarioLogado.idusuario === idResponsavelOng;

  const redesOng = new Redes(ong);
  redesOng.redes();

  const botaoAdd = new AdicionarBotao(isResponsavel);
  botaoAdd.botaoAdicionar();

  // controlarBotoesDeUpload(isResponsavel);

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

  // carregarPetsDaOng(idUrl, ong.nome);
}

// function controlarBotoesDeUpload(isResponsavel) { ... }
// document.addEventListener("DOMContentLoaded", () => { ... Lógica dos modais ... });
// async function carregarPetsDaOng(idOng, nomeOng) { ... }


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
        const urlParams = new URLSearchParams(window.location.search);
        const idUrl = parseInt(urlParams.get("id"));

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

          if (chartInstance) {
            chartInstance.destroy();
          }

          const data = {
            labels: ['Cachorro', 'Gato'],
            datasets: [{
              label: 'Pets Disponíveis',
              data: [qtdCachorros, qtdGatos],
              backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'
              ],
              borderWidth: 1, // <--- Mude este valor (ex: 1 ou 0 para sem borda)
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
                legend: {
                  position: 'bottom',
                  labels: {
                    color: corTexto,
                    font: {
                      size: 14
                    }
                  }
                },
                title: {
                  display: true,
                  text: `Total: ${qtdCachorros + qtdGatos} pets disponíveis`,
                  color: corTexto,
                  font: {
                    size: 16
                  }
                }
              }
            }
          };

          chartInstance = new Chart(ctx, config);

        } catch (error) {
          console.error("Erro ao carregar estatísticas:", error);
        }

      } else {
        if (chartInstance) {
          chartInstance.destroy();
          chartInstance = null;
        }
      }
    });
  }
});