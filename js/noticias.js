const apiKey = 'ff20f0bde89d4296957084f73f411511'; // Sua chave de API
let noticiasArmazenadas = [];

// Lista de palavras-chave relacionadas a pets
const palavrasChave = ['cão', 'gato', 'pet', 'animal de estimação', 'veterinário', 'cachorro', 'felino', 'adoção', 'treinamento', 'alimentação'];

// Lista de palavras proibidas
const palavrasProibidas = ['acidente', 'morte', 'violência', 'crime', 'assassinato', 'tragédia', 'bombardeará', 'vegana', 'veganos', 'incêndio'];

// Lista de palavras proibidas relacionadas a jogos ou esportes
const palavrasProibidasJogos = ['jogo', 'esporte', 'futebol', 'videogame', 'partida', 'campeonato', 'zelda'];

// Função para definir um tema do dia
function temaPorDia() {
    const temas = ['pets', 'adoção', 'cuidados veterinários', 'alimentação de animais', 'treinamento de cães', 'felinos', 'resgates de animais'];
    const dia = new Date().getDay(); // Retorna o número do dia da semana (0 = domingo, 1 = segunda, etc.)
    return temas[dia % temas.length]; // Usa o dia da semana para rotacionar os temas
}

// Função para filtrar notícias com base em palavras-chave, palavras proibidas e palavras relacionadas a jogos
function filtrarNoticias(noticias) {
    return noticias.filter(noticia => {
        const texto = (noticia.title + noticia.description).toLowerCase();

        // Verifica se contém alguma das palavras-chave
        const contemPalavraChave = palavrasChave.some(palavra => texto.includes(palavra));

        // Verifica se contém alguma das palavras proibidas ou relacionadas a jogos
        const contemPalavraProibida = palavrasProibidas.some(palavra => texto.includes(palavra));
        const contemPalavraProibidaJogos = palavrasProibidasJogos.some(palavra => texto.includes(palavra));

        // Só retorna a notícia se ela contiver palavras-chave, mas não contiver palavras proibidas ou de jogos
        return contemPalavraChave && !contemPalavraProibida && !contemPalavraProibidaJogos;
    });
}

// Função para exibir as notícias na página
function exibirNoticias(noticias) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    // Filtrar notícias que tenham título, descrição e link
    const noticiasFiltradas = noticias.filter(noticia => noticia.title && noticia.description && noticia.url);

    if (noticiasFiltradas.length === 0) {
        container.innerHTML = '<p>Nenhuma notícia disponível.</p>';
        return;
    }

    noticiasFiltradas.forEach(noticia => {
        // Cria o link que vai envolver toda a notícia
        const link = document.createElement('a');
        link.href = noticia.url;
        link.target = '_blank';
        link.classList.add('news-item'); // Pode continuar usando a mesma classe
        link.style.textDecoration = 'none'; // Remove sublinhado padrão, se quiser
    
        // Título da notícia
        const titulo = document.createElement('h3');
        titulo.textContent = noticia.title;
        titulo.classList.add('news-title');
    
        // Descrição da notícia
        const descricao = document.createElement('p');
        descricao.textContent = noticia.description;
    
        // Adiciona o título e descrição dentro do link
        link.appendChild(titulo);
        link.appendChild(descricao);
    
        // Adiciona ao container principal
        container.appendChild(link);
    });
    
}


// Função para buscar notícias da API
async function buscarNoticias(query = '') {
    // Se não houver uma pesquisa do usuário, usa o tema do dia
    const pet = query || temaPorDia(); // Usa a função temaPorDia para gerar um tema automaticamente
    const apiURL = `https://sample-express-server.vercel.app/news?q=${pet}`;

    try {
        const resposta = await fetch(apiURL);
        const dados = await resposta.json();

        if (dados.articles && dados.articles.length > 0) {
            const noticiasFiltradas = filtrarNoticias(dados.articles).slice(0, 25);

            // Verificar se já temos notícias armazenadas
            if (noticiasArmazenadas.length === 0) {
                // Se não houver notícias armazenadas, exibe as novas
                noticiasArmazenadas = noticiasFiltradas;  // Armazena as novas notícias
                exibirNoticias(noticiasArmazenadas);
            } else {
                // Atualizar o array com as notícias mais recentes, mantendo até 25 notícias
                noticiasArmazenadas = noticiasFiltradas.concat(noticiasArmazenadas.slice(0, 25 - noticiasFiltradas.length));
                exibirNoticias(noticiasArmazenadas.slice(0, 25));
            }
        } else {
            console.log("Nenhuma notícia encontrada.");
            document.getElementById('news-container').innerHTML = '<p>Nenhuma notícia encontrada sobre o tema pesquisado.</p>';
        }
    } catch (erro) {
        console.error('Erro ao buscar notícias:', erro);
    }
}

// Função para pesquisar notícias com base no que o usuário digitar
function pesquisarNoticias(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        buscarNoticias(query); // Chama a função com o termo pesquisado
    }
}

// Função para pesquisar notícias ao clicar no botão
function pesquisarNoticiasPorClique() {
    const query = document.getElementById('search-input').value;
    buscarNoticias(query); // Chama a função com o termo pesquisado
}

// Evento de clique no botão searchNoticias
document.getElementById('searchNoticias').addEventListener('click', pesquisarNoticiasPorClique);

// Evento de tecla "Enter" no campo de input para realizar a pesquisa
document.getElementById('search-input').addEventListener('keydown', pesquisarNoticias);

// Carregar notícias com o tema do dia quando a página carregar
window.onload = () => {
    buscarNoticias(); // Busca notícias com o tema do dia automaticamente
};

// Atualizar as notícias a cada 1 hora (3600000 ms)
setInterval(buscarNoticias, 3600000);
    