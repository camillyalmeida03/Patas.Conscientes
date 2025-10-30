function criar_footer() {
    const footer = document.getElementById("footer");
    footer.innerHTML = `    <section class="linksFooter">
      <a href="/src/views/index.html#headerIndex"><img class="logobranca" src="/public/img/icons/logobranca.svg"
          alt="Logo do Patas Conscientes"></a>
      <div class="divFooter">

        <div class="listasFooter">
          <a href="/src/views/institucional.html" title="Link que direciona para a página Institucional do site">
            <p class="tituloFooter instu">Institucional</p>
          </a>
          <div>
            <a href="/src/views/institucional.html#topico1" class="sobretradutor"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Sobre nós'">Sobre
              nós</a>
            <a href="/src/views/institucional.html#topico2" class="comoadotartradutor"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso adotar?'">Como
              posso adotar</a>
            <a href="/src/views/institucional.html#topico3" class="comoajudartradutor"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Como posso ajudar?'">Como
              posso ajudar</a>
            <a href="/src/views/institucional.html#topico4" class="integrantestradutor"
              title="Link que direciona para a página Institucional do site diretamente no tópico 'Integrantes'">Integrantes</a>
          </div>
        </div>

        <div class="listasFooter">
          <a href="/src/views/ongs.html" title="Link que direciona para a página de ONG's parceiras do site">
            <p class="tituloFooter ongstradutor">ONG's</p>
          </a>
          <div>
            <a href="/src/views/ongs.html" title="Link que direciona para a página da Patas Amigas Matão">Patas Amigas Matão</a>
            <a href="/src/views/ongs.html" title="Link que direciona para a página da Lar dos Peludos Matão">Lar dos Peludos
              Matão</a>
            <a href="/src/views/ongs.html" title="Link que direciona para a página da Cãopanheiros Taquaritinga">Cãopanheiros
              Taquaritinga</a>
            <a href="/src/views/ongs.html" title="Link que direciona para a página da Amor em Patas Taquaritinga">Amor em Patas
              Taquaritinga</a>
          </div>
        </div>

        <div class="listasFooter">
          <a href="/src/views/noticias.html" title="Link que direciona para a página de Notícias do site">
            <p class="tituloFooter noticia">Notícias</p>
          </a>
          <div>
            <a href="/src/views/noticias.html" title="Link para acessar a página de notícias" class="acesseaquitradutor">Acesse aqui e fique por dentro das
              notícias do mundo pet!</a>
          </div>
        </div>

        <div class="listasFooter">
          <a href="/src/views/login.html" title="Link que direciona para a página de Cadastro do site">
            <p class="tituloFooter entrartradutor">Entrar</p>
          </a>
          <div>
            <a href="/src/views/cadastroadotante.html"
            title="Link que direciona para a página de criar conta como adotante do site" class="criarcontatradutor">Criar conta</a>
            <a href="/src/views/cadastroong.html" title="Link que direciona para a página de criar conta como ONG do site" class="criarcontaongtradutor">Criar
              conta de ONG</a>
          </div>
        </div>
      </div>
    </section>

    <div class="linhaFooter"></div>

    <section class="fimFooter">


      <div class="insta"><a href="https://www.instagram.com/patas_conscientes?igsh=MXY0enptMWlveXQ4bQ==" target="_blank" rel="noopener noreferrer"
          title="Link que direciona para a página do Instagram do Patas Conscientes"><svg class="instagram"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="#ffffff"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
          </svg></a></div>
    </section>

    <select aria-label="Idioma" name="Idioma" id="trocarlingua" onchange="trocaridioma(this.value)">
          <option value="pt">Português</option>
          <option value="eng">English</option>
        </select>`;
}

criar_footer();
