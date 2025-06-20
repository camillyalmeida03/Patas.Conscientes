function traduzir() {
    var idiomaselect = localStorage.getItem('idiomaselect') || 'pt';

    var idioma = {
        pt: {
            headerinstitucional: "Institucional",
            headerongstradutor: "ONG's",
            headernoticia: "Notícias",
            headeradoteme: "Adote-me",
            headertorneceumparceiro: "Torne-se um parceiro",
            headersobre: "Sobre",
            headercomoadotar: "Como posso adotar?",
            headercomoajudar: "Como posso ajudar",
            headerintegrantes: "Integrantes",
            headerfavoritos: "Favoritos",
            headerconfiguracoes: "Configurações",
            headertema: "Tema",
            headerconta: "Conta",
            headerminhaconta: "Minha conta",
            headerentrar: "Entrar",
            headerentrarouCadastrar: "Entrar ou Cadastrar",
            mainconhecaopatas: "Conheça o Patas Conscientes",
            mainsitededicado: `Site dedicado a <strong>adoção</strong> de pets provindos de ONG's e abrigos da região de <strong>Araraquara -
          SP</strong>. Temos o comprimisso de reforçar está aliança de cuidado e amor entre nós, amantes de pets e
        nossos queridos animais!`,
            mainquerfazerparte: "Quer fazer parte? Entenda como funciona:",
            mainmantemosconexoes: `Mantemos conexões estreitas com <strong>ONG's</strong> e <strong>abrigos</strong> locais. Partilhamos aqui mais
        sobre suas rotinas, notícias, carências e claro seus respectivos pets, dessa forma os ajudamos a aumentar sua
        visibilidade em prol dessa corrente do bem!`,
            mainoquefalao: "O que falam sobre nós",
            mainvejanossofeedback: `Veja o nosso feedback! Torne-se nosso parceiro ao apoiar a causa animal. Para mais informações,
          sinta-se a vontade para entrar em contato conosco por meio de nossas redes sociais. Com a sua
          ajuda vamos longe nessa jornada a procura de lares carinhos para os pets da nosso região.
          Contamos com você!`,
            footeracesseaqui: "Acesse aqui e fique por dentro das notícias do mundo pet!",
            footercriarconta: "Criar conta",
            footercriarcontaong: "Criar conta de ONG",
        },
        eng: {
            headerinstitucional: "Institutional",
            headerongstradutor: "ONG's",
            headernoticia: "News",
            headeradoteme: "Adopt me",
            headertorneceumparceiro: "Become a partner",
            headersobre: "About",
            headercomoadotar: "How can I to adopt?",
            headercomoajudar: "How can I help?",
            headerintegrantes: "Members",
            headerfavoritos: "Favorites",
            headerconfiguracoes: "Settings",
            headertema: "Theme",
            headerconta: "Account",
            headerminhaconta: "My account",
            headerentrar: "Login",
            headerentrarouCadastrar: "Login or Register",
            mainconhecaopatas: "Meet the Conscious Paws",
            mainsitededicado: `Dedicated site for <strong>pet adoption</strong> from NGO's and shelters in the <strong>Araraquara - SP</strong> region. We are committed to strengthening this alliance of care and love between us, pet lovers, and our beloved animals!`,
            mainquerfazerparte: "Want to be part of it? Understand how it works:",
            mainmantemosconexoes: `We maintain close connections with local <strong>NGO's</strong> and <strong>shelters</strong>. We share here more about their routines, news, needs, and of course their respective pets, thus helping them increase their visibility in favor of this good cause!`,
            mainoquefalao: "What they say about us",
            mainvejanossofeedback: `See our feedback! Become our partner by supporting the animal cause. For more information, feel free to contact us through our social media. With your help, we will go far in this journey to find loving homes for the pets in our region. We count on you!`,
            footeracesseaqui: "Access here and stay updated with the news from the pet world!",
            footercriarconta: "Create account",
            footercriarcontaong: "Create ong account",
        }
    };

function traduzirClasse(classe, texto) {
    var elementos = document.getElementsByClassName(classe);
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].innerHTML = texto;
    }
}
    traduzirClasse("instu", idioma[idiomaselect].headerinstitucional);
    traduzirClasse("ongstradutor", idioma[idiomaselect].headerongstradutor);
    traduzirClasse("noticia", idioma[idiomaselect].headernoticia);
    traduzirClasse("adotemetradu", idioma[idiomaselect].headeradoteme);
    traduzirClasse("parceirotradutor", idioma[idiomaselect].headertorneceumparceiro);
    traduzirClasse("sobretradutor", idioma[idiomaselect].headersobre);
    traduzirClasse("comoadotartradutor", idioma[idiomaselect].headercomoadotar);
    traduzirClasse("comoajudartradutor", idioma[idiomaselect].headercomoajudar);
    traduzirClasse("integrantestradutor", idioma[idiomaselect].headerintegrantes);
    traduzirClasse("favoritostradutor", idioma[idiomaselect].headerfavoritos);
    traduzirClasse("configtradutor", idioma[idiomaselect].headerconfiguracoes);
    traduzirClasse("tematradutor", idioma[idiomaselect].headertema);
    traduzirClasse("contatradutor", idioma[idiomaselect].headerconta);
    traduzirClasse("minhacontatradutor", idioma[idiomaselect].headerminhaconta);
    traduzirClasse("entrartradutor", idioma[idiomaselect].headerentrar);
    traduzirClasse("entraroucadastrartradutor", idioma[idiomaselect].headerentrarouCadastrar);
    traduzirClasse("conhecatradutor", idioma[idiomaselect].mainconhecaopatas);
    traduzirClasse("sitededicadotradutor", idioma[idiomaselect].mainsitededicado);
    traduzirClasse("querfazerpartetradutor", idioma[idiomaselect].mainquerfazerparte);
    traduzirClasse("mantemosconexoestradutor", idioma[idiomaselect].mainmantemosconexoes);
    traduzirClasse("oquefalaotradutor", idioma[idiomaselect].mainoquefalao);
    traduzirClasse("vejanossofeedbacktradutor", idioma[idiomaselect].mainvejanossofeedback);
    traduzirClasse("acesseaquitradutor", idioma[idiomaselect].footeracesseaqui);
    traduzirClasse("criarcontatradutor", idioma[idiomaselect].footercriarconta);
    traduzirClasse("criarcontaongtradutor", idioma[idiomaselect].footercriarcontaong);



    document.getElementById('trocarlingua').value = idiomaselect;
}

function trocaridioma(lang) {
    localStorage.setItem('idiomaselect', lang);
    traduzir();
}

window.addEventListener('DOMContentLoaded', traduzir);
