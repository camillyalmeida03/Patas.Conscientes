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
            mainsobrenos: "Sobre nós",
            mainsomosapaixonados: "Somos apaixonados por animais e acreditamos que cada animalzinho merece amor, cuidado e um lar aconchegante. No Patas Conscientes, nossa missão é conectar tutores dedicados com produtos de qualidade que proporcionem bem-estar e felicidade aos seus pets.",
            maindesdebrinquedos: "Desde brinquedos interativos até alimentos saudáveis, selecionamos cuidadosamente cada item para garantir que seu animalzinho receba o melhor. Além disso, compartilhamos dicas valiosas e informações úteis para ajudar você a cuidar do seu pet com carinho e responsabilidade.",
            mainnossaequipe: "Nossa equipe é composta por amantes de animais que entendem a importância de tratar cada bichinho com o respeito e a atenção que eles merecem. Junte-se a nós nesta jornada de amor e cuidado pelos nossos amigos de quatro patas!",
            mainadotarumanimal: "Adotar um animal de estimação é um ato de amor que transforma vidas, tanto a sua quanto a do animal. No Patas Conscientes, incentivamos a adoção consciente, garantindo que cada animalzinho encontre um lar cheio de carinho e responsabilidade. Aqui estão os passos para adotar:",
            mainescolhaoseuamigo: "Escolha o Seu Novo Amigo: Explore nosso catálogo de animais disponíveis para adoção. Cada um tem uma ficha completa com informações sobre personalidade, necessidades especiais e histórico.",
            mainpreenchaoform: "Preencha o Formulário de Adoção: Após encontrar o animalzinho ideal, preencha nosso formulário de adoção. Esse passo é fundamental para entender melhor suas expectativas e garantir que o animal se adapte bem ao seu estilo de vida.",
            mainassinaturadotermotradutor: "Assinatura do Termo de Adoção: Se tudo correr bem, você assinará um termo de adoção que formaliza o compromisso de cuidar do novo membro da família.",
            mainajusteeacompanhamento: "Ajuste e Acompanhamento: Nos primeiros dias, faremos um acompanhamento para garantir que a adaptação esteja ocorrendo de maneira tranquila. Estamos aqui para oferecer suporte e responder a qualquer dúvida.",
            mainadotarumanimaltradutor: "Adotar é um gesto de amor e responsabilidade. Estamos aqui para ajudar em cada passo dessa jornada. Venha fazer parte da nossa comunidade e transforme a vida de um animalzinho!",
            mainacomovoceajjuda: "Como você pode ajudar a causa animal?",
            mainajudacausaanimal: "No Patas Conscientes, acreditamos que todos podem contribuir para o bem-estar dos animais de várias maneiras. Aqui estão algumas formas de você se envolver e fazer a diferença:",
            mainadoteumanimalaforma: "Adote um Animal: A forma mais direta de ajudar é adotando um dos nossos animalzinhos. Ofereça um lar cheio de amor e carinho para um animal que precisa.",
            mainsejaumlartemporario: "Seja um Lar Temporário: Se não pode adotar permanentemente, considere ser um lar temporário. Hospedar um animal até que ele encontre um lar definitivo é uma ajuda imensurável.",
            mainfacadoacaotributortradutor: "Faça Doações: Sua contribuição financeira ajuda a cobrir custos de alimentação, cuidados veterinários, castrações e outras necessidades dos nossos animalzinhos. Toda doação faz a diferença!",
            mainvoluntariesetradutor: "Voluntarie-se: Doar seu tempo é uma excelente maneira de ajudar. Precisamos de voluntários para cuidar dos animais, participar de eventos e ajudar em campanhas de adoção.",
            maindivulgueacaotrabalhoajuda: "Divulgue Nossas Ações: Compartilhe nossas postagens nas redes sociais, fale sobre nosso trabalho com amigos e familiares. Aumentar a visibilidade ajuda a encontrar mais adotantes e apoiadores.",
            mainparticepedenossascampanhas: "Participe de Nossas Campanhas: Engaje-se em campanhas de conscientização e eventos de arrecadação de fundos. Sua participação ativa é essencial para o sucesso dessas iniciativas.",
            maincadagestocontatradutor: "Cada gesto conta e faz a diferença na vida dos animais. Junte-se a nós no Patas Conscientes e ajude a promover a adoção consciente e o bem-estar animal. Sua ajuda é fundamental!",
            mainintegrantetradutor: "Integrante",
            mainintegrante1tradutor: "Camilly",
            mainintegrante1bio: "Oi Oi, tudo bem? Sou a Camilly! Sou apaixonada por programação e fico fascinada com o que podemos desenvolver com ela. Além disso, sou apaixonada pelo mundo pet, o que me motivou a entrar neste projeto. Meu objetivo é fazer a diferença, especialmente quando se trata de melhorar a vida dos animais e das pessoas que os amam. Estou super animada com o que podemos conquistar!",
            mainintegrante2tradutor: "Lucas",
            mainintegrante2bio: `"Olá, meu nome é Lucas Leonardo, tenho 22 anos e sou apaixonado pelo mundo do design gráfico. Amo
      animais e acredito que a criatividade pode transformar o mundo ao nosso redor.
      Para saber mais me siga em minha redes sociais!
      <a href="https://www.instagram.com/lucasalvesdesing?igsh=bndoZHY3ZWFjZnRi" class="link"
        title="Link que direciona para o Instagram do Lucas"><b>@lucasalvesdesing"</b></a>`,
            mainintegrante3tradutor: "Bárbara",
            mainintegrante3bio: "Oi! Eu sou a Bárbara, apaixonada por animais e dedicada a proteger nossos amigos de quatro patas. No Patas Conscientes, trabalhamos com muita alegria e dedicação para promover o bem-estar e a conscientização sobre os direitos dos animais. Junte-se a nós nessa causa tão importante!",
            mainintegrante4tradutor: "Fernanda",
            mainintegrante4bio: `"Olá! Tenho 18 anos e sou apaixonada por animais, então participar deste projeto é realmente especial
      para mim! Segue o link do meu LinkedIn: <a
        href="https://www.linkedin.com/in/maria-fernanda-da-silva-92a521214/" title="Linkedin da Maria Fernanda"
        class="link">www.linkedin.com</a>"`,


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
            mainsobrenos: "About us",
            mainsomosapaixonados: "We are passionate about animals and believe that every little animal deserves love, care, and a cozy home. At Conscious Paws, our mission is to connect dedicated guardians with quality products that provide well-being and happiness to their pets.",
            maindesdebrinquedos: "From interactive toys to healthy food, we carefully select each item to ensure that your little animal receives the best. In addition, we share valuable tips and useful information to help you care for your pet with love and responsibility.",
            mainnossaequipe: "Our team is made up of animal lovers who understand the importance of treating each little one with the respect and attention they deserve. Join us on this journey of love and care for our four-legged friends!",
            mainadotarumanimal: "Adopting a pet is an act of love that transforms lives, both yours and the animal's. At Conscious Paws, we encourage conscious adoption, ensuring that each little animal finds a home full of love and responsibility. Here are the steps to adopt:",
            mainescolhaoseuamigo: "Choose Your New Friend: Explore our catalog of animals available for adoption. Each one has a complete profile with information about personality, special needs, and history.",
            mainpreenchaoform: "Fill out the Adoption Form: After finding the ideal little animal, fill out our adoption form. This step is essential to better understand your expectations and ensure that the animal adapts well to your lifestyle.",
            mainassinaturadotermotradutor: "Signature of the Adoption Term: If everything goes well, you will sign an adoption term that formalizes the commitment to care for the new family member.",
            mainajusteeacompanhamento: "Adjustment and Monitoring: In the first few days, we will monitor to ensure that the adaptation is occurring smoothly. We are here to offer support and answer any questions.",
            mainadotarumanimaltradutor: "Adopting is a gesture of love and responsibility. We are here to help at every step of this journey. Come be part of our community and transform the life of a little animal!",
            mainacomovoceajjuda: "How can you help the animal cause?",
            mainajudacausaanimal: "At Conscious Paws, we believe that everyone can contribute to the well-being of animals in various ways. Here are some ways you can get involved and make a difference:",
            mainadoteumanimalaforma: "Adopt an Animal: The most direct way to help is by adopting one of our little animals. Offer a home full of love and care to an animal in need.",
            mainsejaumlartemporario: "Be a Temporary Home: If you can't adopt permanently, consider being a temporary home. Hosting an animal until it finds a permanent home is immeasurable help.",
            mainfacadoacaotributortradutor: "Make Donations: Your financial contribution helps cover costs of food, veterinary care, neutering, and other needs of our little animals. Every donation makes a difference!",
            mainvoluntariesetradutor: "Volunteer: Donating your time is an excellent way to help. We need volunteers to care for the animals, participate in events, and assist in adoption campaigns.",
            maindivulgueacaotrabalhoajuda: "Spread the Word: Share our posts on social media, talk about our work with friends and family. Increasing visibility helps find more adopters and supporters.",
            mainparticepedenossascampanhas: "Participate in Our Campaigns: Engage in awareness campaigns and fundraising events. Your active participation is essential for the success of these initiatives.",
            maincadagestocontatradutor: "Every gesture counts and makes a difference in the lives of animals. Join us at Conscious Paws and help promote conscious adoption and animal welfare. Your help is essential!",
            mainintegrantetradutor: "Member",
            mainintegrante1tradutor: "Camilly",
            mainintegrante1bio: "Hi there, how are you? I'm Camilly! I'm passionate about programming and fascinated by what we can develop with it. Besides that, I'm passionate about the pet world, which motivated me to join this project. My goal is to make a difference, especially when it comes to improving the lives of animals and the people who love them. I'm super excited about what we can achieve!",
            mainintegrante2tradutor: "Lucas",
            mainintegrante2bio: `"Hello, my name is Lucas Leonardo, I'm 22 years old and I'm passionate about graphic design. I love animals and believe that creativity can transform the world around us.
        To know more, follow me on my social media!
        <a href="https://www.instagram.com/lucasalvesdesing?igsh=bndoZHY3ZWFjZnRi" class="link"
          title="Link that directs to Lucas's Instagram"><b>@lucasalvesdesing"</b></a>`,
            mainintegrante3tradutor: "Bárbara",
            mainintegrante3bio: "Hi! I'm Bárbara, passionate about animals and dedicated to protecting our four-legged friends. At Conscious Paws, we work with great joy and dedication to promote the well-being and awareness of animal rights. Join us in this important cause!",
            mainintegrante4tradutor: "Fernanda",
            mainintegrante4bio: `"Hello! I'm 18 years old and I'm passionate about animals, so being part of this project is really special for me! Here's the link to my LinkedIn: <a
        href="https://www.linkedin.com/in/maria-fernanda-da-silva-92a521214/" title="Linkedin da Maria Fernanda"
        class="link">www.linkedin.com</a>"`
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
    traduzirClasse("sobrenostradutor", idioma[idiomaselect].mainsobrenos);
    traduzirClasse("somosapaixonadostradutor", idioma[idiomaselect].mainsomosapaixonados);
    traduzirClasse("desdebrinquedostradutor", idioma[idiomaselect].maindesdebrinquedos);
    traduzirClasse("nossaequipetradutor", idioma[idiomaselect].mainnossaequipe);
    traduzirClasse("adotarumanimaltradutor", idioma[idiomaselect].mainadotarumanimal);
    traduzirClasse("escolhaoseuamigotradutor", idioma[idiomaselect].mainescolhaoseuamigo);
    traduzirClasse("preenchaoformtradutor", idioma[idiomaselect].mainpreenchaoform);
    traduzirClasse("assinaturadotermotradutor", idioma[idiomaselect].mainassinaturadotermotradutor);
    traduzirClasse("ajusteeacompanhamentotradutor", idioma[idiomaselect].mainajusteeacompanhamento);
    traduzirClasse("adotareumgestotradutor", idioma[idiomaselect].mainadotarumanimaltradutor);
    traduzirClasse("comovoceajudatradutor", idioma[idiomaselect].mainacomovoceajjuda);
    traduzirClasse("ajudacausaanimaltradutor", idioma[idiomaselect].mainajudacausaanimal);
    traduzirClasse("adoteumanimaltradutor", idioma[idiomaselect].mainadoteumanimalaforma);
    traduzirClasse("lartemporariotradutor", idioma[idiomaselect].mainsejaumlartemporario);
    traduzirClasse("facadoacaotributortradutor", idioma[idiomaselect].mainfacadoacaotributortradutor);
    traduzirClasse("voluntariesetradutor", idioma[idiomaselect].mainvoluntariesetradutor);
    traduzirClasse("divulgueacaotrabalhoajuda", idioma[idiomaselect].maindivulgueacaotrabalhoajuda);
    traduzirClasse("campanhasparticipetradutor", idioma[idiomaselect].mainparticepedenossascampanhas);
    traduzirClasse("cadagestocontatradutor", idioma[idiomaselect].maincadagestocontatradutor);
    traduzirClasse("integrantetradutor", idioma[idiomaselect].mainintegrantetradutor);

    traduzirClasse("nomecamillytradutor", idioma[idiomaselect].mainintegrante1tradutor);
    traduzirClasse("biocamillytradutor", idioma[idiomaselect].mainintegrante1bio);
    traduzirClasse("nomelucastradutor", idioma[idiomaselect].mainintegrante2tradutor);
    traduzirClasse("biolucastradutor", idioma[idiomaselect].mainintegrante2bio);
    traduzirClasse("nomebarbaratradutor", idioma[idiomaselect].mainintegrante3tradutor);
    traduzirClasse("biobarbaratradutor", idioma[idiomaselect].mainintegrante3bio);
    traduzirClasse("nomefernandatradutor", idioma[idiomaselect].mainintegrante4tradutor);
    traduzirClasse("biofernandatradutor", idioma[idiomaselect].mainintegrante4bio);



    document.getElementById('trocarlingua').value = idiomaselect;
}

function trocaridioma(lang) {
    localStorage.setItem('idiomaselect', lang);
    traduzir();
}

window.addEventListener('DOMContentLoaded', traduzir);
