const { config } = require("dotenv");

function traduzir() {
    var idiomaselect = localStorage.getItem('idiomaselect') || 'pt';

    var idioma = {
        pt: {
            //header
            headerinstitucional: "Institucional",
            headerongstradutor: "ONG's",
            headernoticia: "Notícias",
            headeradoteme: "Adote-me",
            headercadastrarong: "Cadastrar ONG",
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
            headerpainelong: "Painel da ONG",
            headerentrar: "Entrar",
            headersair: "Sair",
            headerbemvindo: "Bem-vindo!",
            headeracesseoucrie: "Acesse sua conta ou crie uma para continuar",
            headerentrarouCadastrar: "Entrar ou Cadastrar",
            headercriarconta: "Criar conta",
            //main e footer
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
            mainintegrantetradutor: "Integrantes",
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
            //pag ongs
            ongstittle: "Páginas das ONG's",
            ongscity: "Cidade: ",
            //pag noticias
            pagnews: "Pesquise por temas do mundo pet..",
            //pag adotar 
            adotartittle: "Adotar",
            adotarfilter: "Filtros",
            adotarlimpar: "Limpar todos",
            adotarcidade: "Cidade",
            adotarong: "ONG's",
            adotarespecie: "Espécie",
            adotardog: "Cachorro",
            adotarcat: "Gato",
            adotarporte: "Porte",
            adotarpequeno: "Pequeno",
            adotarmedio: "Médio",
            adotargrande: "Grande",
            adotarsexo: "Sexo",
            adotarfemea: "Fêmea",
            adotarmacho: "Macho",
            adotarvermais: "Ver mais",
            adotar: "Adotar",
            // card adotar > aparece quando clica em ver mais 
            cardpeso: "Peso",
            cardidade: "Idade",
            cardespecie: "Espécie",
            cardporte: "Porte",
            cardraca: "Raça",
            cardlocal: "Local",
            cardsobre: "Sobre",
            // pag cadastrar ong - quando tem conta
            alertaconta: "Você já possui uma conta de ONG",
            alertacadong: `O sistema identificou que sua conta atual já está cadastrada como uma <span class="negrito">ONG parceira.</span>`,
            alertaongunica: `Cada conta pode representar apenas <span class="negrito">uma única ONG.</span> Se desejar atualizar informações ou gerenciar sua ONG, acesse o <span class="negrito">Painel da ONG.</span>`,
            alertapainelong: "Ir para o Painel da ONG",
            alertavoltar: "Voltar para a página inicial",
            // pag login 
            entrar: "Entrar",
            entraremail: "Digite seu E-mail",
            entrarsenha: "Digite sua senha",
            entraresqueceu: "Esqueceu sua senha?",
            entrarconfirmar: "Confirmar",
            entrarcadastre: "Não tem conta? Cadastre-se",
            entrarrecuperar: "Recuperar senha",
            entrarenviarcod: "Enviar código",
            entrardigitecod: "Digite o código",
            entrarconfircod: "Confirmar código",
            entrarcadastre2: "Cadastre-se",
            entrarcadastro: "Cadastro",
            entrarcadastroong: "Cadastro de ONG",
            entrarcomconta: "Já tem uma conta? Entrar",
            entraralterarsenha: "Alterar senha",
            entrardigiteemailrecuperar: "Digite um email",
            entrardigitecodrecuperar: "Digite o código",
            entrarerroaoverificar: "Erro ao verificar código",
            entrarcodvalido: "Código válido",
            entrarcodinvalido: "Código inválido ou expirado",
            entrarnovasenha: "Digite a nova senha",
            entrarcodverificacaocriado: "Código de verificação criado e email enviado",
            entraremailnaoencontrado: "Email não encontrado",
            entrarsenhaalterada: "Senha alterada com sucesso!",
            // pag configurações
            configuracoes: "Configurações",
            editarperfil: "Editar perfil",
            detalhesconta: "Conta",
            detalhesacessibilidade: "Acessibilidade",
            detalhespoliticasite: "Políticas do site",
            confignome: "Nome:",
            configgenero: "Gênero:",
            configinfoend: "Informações de endereço",
            configcep: "Cep:",
            configestado: "Estado:",
            configcidade: "Cidade:",
            configrua: "Rua:",
            configbairro: "Bairro:",
            confignum: "Número:",
            configcomplemento: "Complemento:",
            configsalvar: "Salvar edições",
            // painel ong
            painelendereço: "Endereço:",
            paineldisponiveis: "Pets disponíveis:",
            painelestatisticas: `Estatísticas <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="#FFFFFF">
                            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                        </svg>`,
            painelcadastrar: "Cadastrar Pet",
            painelconhecamais: "Conheça mais sobre nós",
            painelnossospets: "Nossos pets",
            // painelnenhumencontrado: "Nenhum pet encontrado vinculado a esta ONG ainda.",
            // form cadastrar usuario
            titulocadastro: "Cadastrar usuário",
            infousuario: "Informações do Usuário",
            nomeusuario: "Nome*",
            emailusuario: "E-mail*",
            telefoneusuario: "Telefone ou Celular*",
            cpfusuario: "CPF*",
            selectgenero: "Selecione seu gênero:*",
            generofem: "Feminino",
            generomasc: "Masculino",
            generonao: "Prefiro não dizer",
            datanascimento: "Data de Nascimento*",
            senhausuario: "Senha*",
            confirmarsenha: "Confirme sua senha*",
            infoendereco: "Informações de Endereço",
            cepusuario: "CEP*",
            selectestado: "Selecione seu estado:*",
            cidadeusuario: "Cidade*",
            ruausuario: "Rua*",
            bairrousuario: "Bairro*",
            numerousuario: "Número*",
            complementousuario: "Complemento",
            botaoConfirmar: "Confirmar",

        },
        eng: {
            headerinstitucional: "Institutional",
            headerongstradutor: "NGO's",
            headernoticia: "News",
            headeradoteme: "Adopt me",
            headercadastrarong: "Register NGO",
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
            headerpainelong: "NGO panel",
            headerentrar: "Login",
            headersair: "Exit",
            headerbemvindo: "Welcome!",
            headeracesseoucrie: "Access your account or create one to continue",
            headerentrarouCadastrar: "Login or Register",
            headercriarconta: "Create account",
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
            mainintegrantetradutor: "Members",
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
        class="link">www.linkedin.com</a>"`,
            //pag ongs
            ongstittle: "NGO Pages",
            ongscity: "City: ",
            //pag noticias
            pagnews: "Search for topics from the pet world..",
            //pag adotar
            adotartittle: "Adopt",
            adotarfilter: "Filters",
            adotarlimpar: "Clear all",
            adotarcidade: "City",
            adotarong: "NGO's",
            adotarespecie: "Species",
            adotardog: "Dog",
            adotarcat: "Cat",
            adotarporte: "Port",
            adotarpequeno: "Small",
            adotarmedio: "Medium",
            adotargrande: "Big",
            adotarsexo: "Sex",
            adotarfemea: "Female",
            adotarmacho: "Male",
            adotarvermais: "See more",
            adotar: "To adopt",
            // card adotar > aparece quando clica em ver mais 
            cardpeso: "Weight",
            cardidade: "Age",
            cardespecie: "Specie",
            cardporte: "Port",
            cardraca: "Race",
            cardlocal: "Location",
            cardsobre: "About",
            // pag cadastrar ong - quando tem conta
            alertaconta: "Do you already have an NGO account",
            alertcadong: `The system has identified that your current account is already registered as a <span class="negrito">partner NGO.</span>`,
            alertaongunica: `Each account can represent only <span class="negrito">a single NGO.</span> If you wish to update information or manage your NGO, go to the <span class="negrito">NGO Dashboard.</span>`,
            alertapainelong: "Go to the NGO Dashboard",
            alertavoltar: "Return to the homepage",
            // pag login 
            entrar: "Login",
            entraremail: "Enter your E-mail",
            entrarsenha: "Enter your passaword",
            entraresqueceu: "Forgot your password?",
            entrarconfirmar: "Confirm",
            entrarcadastre: "Don't have an account? Sign up",
            entrarrecuperar: "Recover password",
            entrarenviarcod: "Send code",
            entrardigitecod: "Enter the code",
            entrarconfircod: "Confirm code",
            entrarcadastre2: "Sign up",
            entrarcadastro: "Registration",
            entrarcadastroong: "NGO Registration",
            entrarcomconta: "Already have an account? Sign in",
            entraralterarsenha: "Change password",
            entrardigiteemailrecuperar: "Enter an email",
            entrardigitecodrecuperar: "Enter the code",
            entrarerroaoverificar: "Error verifying code",
            entrarcodvalido: "Valid code",
            entrarcodinvalido: "Invalid or expired code",
            entrarnovasenha: "Enter the new password",
            entrarcodverificacaocriado: "Verification code created and email sent",
            entraremailnaoencontrado: "Email not found",
            entrarsenhaalterada: "Password changed successfully!",
            // pag configurações
            configuracoes: "Settings",
            editarperfil: "Edit profile",
            detalhesconta: "Account",
            detalhesacessibilidade: "Accessibility",
            detalhespoliticasite: "Site policies",
            confignome: "Name:",
            configgenero: "Gender:",
            configinfoend: "Address information",
            configcep: "ZIP code:",
            configestado: "State:",
            configcidade: "City:",
            configrua: "Street:",
            configbairro: "Neighborhood:",
            confignum: "Number:",
            configcomplemento: "Additional info:",
            configsalvar: "Save changes",

            // painel ong
            painelendereço: "Adress:",
            paineldisponiveis: "Available pets:",
            painelestatisticas: `Statistics <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="#FFFFFF">
                            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                        </svg>`,
            painelcadastrar: "Register Pet",
            painelconhecamais: "Learn more about us",
            painelnossospets: "Our pets",
            painelnenhumencontrado: "No pets found linked to this NGO yet.",
            // form cadastrar usuario
            titulocadastro: "User Registration",
            infousuario: "User Information",
            nomeusuario: "Name*",
            emailusuario: "E-mail*",
            telefoneusuario: "Phone or Mobile*",
            cpfusuario: "CPF*",
            selectgenero: "Select your gender:*",
            generofem: "Female",
            generomasc: "Male",
            generonao: "Prefer not to say",
            datanascimento: "Birth Date*",
            senhausuario: "Password*",
            confirmarsenha: "Confirm your password*",
            infoendereco: "Address Information",
            cepusuario: "ZIP Code*",
            selectestado: "Select your state:*",
            cidadeusuario: "City*",
            ruausuario: "Street*",
            bairrousuario: "Neighborhood*",
            numerousuario: "Number*",
            complementousuario: "Complement",
            botaoConfirmar: "Confirm",
            labelcodigo: "Enter the code sent to your email:",
            codigoverificacao: "Ex: 123456",
            btnverificarcodigo: "Verify Code",


        }
    };

    function traduzirClasse(classe, texto) {
        var elementos = document.getElementsByClassName(classe);
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].innerHTML = texto;
        }
    }

    function traduzirPlaceholder(classe, texto) {
        var traduzirPlaceholder = document.getElementsByClassName(classe);
        for (var i = 0; i < traduzirPlaceholder.length; i++) {
            traduzirPlaceholder[i].placeholder = texto;
        }
    }


    traduzirClasse("instu", idioma[idiomaselect].headerinstitucional);
    traduzirClasse("ongstradutor", idioma[idiomaselect].headerongstradutor);
    traduzirClasse("noticia", idioma[idiomaselect].headernoticia);
    traduzirClasse("adotemetradu", idioma[idiomaselect].headeradoteme);
    traduzirClasse("headercadastrarong", idioma[idiomaselect].headercadastrarong);
    traduzirClasse("parceirotradutor", idioma[idiomaselect].headertorneceumparceiro);
    traduzirClasse("sobretradutor", idioma[idiomaselect].headersobre);
    traduzirClasse("comoadotartradutor", idioma[idiomaselect].headercomoadotar);
    traduzirClasse("comoajudartradutor", idioma[idiomaselect].headercomoajudar);
    traduzirClasse("integrantestradutor", idioma[idiomaselect].headerintegrantes);
    traduzirClasse("favoritostradutor", idioma[idiomaselect].headerfavoritos);
    traduzirClasse("configtradutor", idioma[idiomaselect].headerconfiguracoes);
    traduzirClasse("headertema", idioma[idiomaselect].headertema);
    traduzirClasse("titConfig", idioma[idiomaselect].headerconta);
    traduzirClasse("minhacontatradutor", idioma[idiomaselect].headerminhaconta);
    traduzirClasse("headerpainelong", idioma[idiomaselect].headerpainelong);
    traduzirClasse("headersair", idioma[idiomaselect].headersair);
    traduzirClasse("headerbemvindo", idioma[idiomaselect].headerbemvindo);
    traduzirClasse("headeracesseoucrie", idioma[idiomaselect].headeracesseoucrie);
    traduzirClasse("entrartradutor", idioma[idiomaselect].headerentrar);
    traduzirClasse("entraroucadastrartradutor", idioma[idiomaselect].headerentrarouCadastrar);
    traduzirClasse("headercriarconta", idioma[idiomaselect].headercriarconta);
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
    //pag ong
    traduzirClasse("ongstittle", idioma[idiomaselect].ongstittle);
    traduzirClasse("ongscity", idioma[idiomaselect].ongscity);
    //pag noticias 
    traduzirPlaceholder("pagnews", idioma[idiomaselect].pagnews);
    //pag adotar
    traduzirClasse("adotartittle", idioma[idiomaselect].adotartittle);
    traduzirClasse("adotarfilter", idioma[idiomaselect].adotarfilter);
    traduzirClasse("adotarlimpar", idioma[idiomaselect].adotarlimpar);
    traduzirClasse("adotarcidade", idioma[idiomaselect].adotarcidade);
    traduzirClasse("adotarong", idioma[idiomaselect].adotarong);
    traduzirClasse("adotarespecie", idioma[idiomaselect].adotarespecie);
    traduzirClasse("adotardog", idioma[idiomaselect].adotardog);
    traduzirClasse("adotarcat", idioma[idiomaselect].adotarcat);
    traduzirClasse("adotarporte", idioma[idiomaselect].adotarporte);
    traduzirClasse("adotarpequeno", idioma[idiomaselect].adotarpequeno);
    traduzirClasse("adotarmedio", idioma[idiomaselect].adotarmedio);
    traduzirClasse("adotargrande", idioma[idiomaselect].adotargrande);
    traduzirClasse("adotarsexo", idioma[idiomaselect].adotarsexo);
    traduzirClasse("adotarfemea", idioma[idiomaselect].adotarfemea);
    traduzirClasse("adotarmacho", idioma[idiomaselect].adotarmacho);
    traduzirClasse("adotarvermais", idioma[idiomaselect].adotarvermais);
    traduzirClasse("adotar", idioma[idiomaselect].adotar);
    // card adotar > aparece quando clica em ver mais 
    traduzirClasse("cardpeso", idioma[idiomaselect].cardpeso);
    traduzirClasse("cardidade", idioma[idiomaselect].cardidade);
    traduzirClasse("cardespecie", idioma[idiomaselect].cardespecie);
    traduzirClasse("cardporte", idioma[idiomaselect].cardporte);
    traduzirClasse("cardraca", idioma[idiomaselect].cardraca);
    traduzirClasse("cardsobre", idioma[idiomaselect].cardsobre);
    traduzirClasse("cardlocal", idioma[idiomaselect].cardlocal);
    // pag cadastrar ong - quando tem conta
    traduzirClasse("alertaconta", idioma[idiomaselect].alertaconta);
    traduzirClasse("alertacadong", idioma[idiomaselect].alertcadong);
    traduzirClasse("alertaongunica", idioma[idiomaselect].alertaongunica);
    traduzirClasse("alertapainelong", idioma[idiomaselect].alertapainelong);
    traduzirClasse("alertavoltar", idioma[idiomaselect].alertavoltar);
    // pag login 
    traduzirClasse("entrar", idioma[idiomaselect].entrar);
    traduzirPlaceholder("entraremail", idioma[idiomaselect].entraremail);
    traduzirPlaceholder("entrarsenha", idioma[idiomaselect].entrarsenha);
    traduzirClasse("entraresqueceu", idioma[idiomaselect].entraresqueceu);
    traduzirClasse("entrarconfirmar", idioma[idiomaselect].entrarconfirmar);
    traduzirClasse("entrarcadastre", idioma[idiomaselect].entrarcadastre);
    traduzirClasse("entrarrecuperar", idioma[idiomaselect].entrarrecuperar);
    traduzirClasse("entrarenviarcod", idioma[idiomaselect].entrarenviarcod);
    traduzirPlaceholder("entrardigitecod", idioma[idiomaselect].entrardigitecod);
    traduzirClasse("entrarconfircod", idioma[idiomaselect].entrarconfircod);
    traduzirClasse("entrarcadastre2", idioma[idiomaselect].entrarcadastre2);
    traduzirClasse("entrarcadastro", idioma[idiomaselect].entrarcadastro);
    traduzirClasse("entrarcadastroong", idioma[idiomaselect].entrarcadastroong);
    traduzirClasse("entrarcomconta", idioma[idiomaselect].entrarcomconta);
    traduzirClasse("entraralterarsenha", idioma[idiomaselect].entraralterarsenha);
    traduzirClasse("entrardigiteemailrecuperar", idioma[idiomaselect].entrardigiteemailrecuperar);
    traduzirClasse("entrardigitecodrecuperar", idioma[idiomaselect].entrardigitecodrecuperar);
    traduzirClasse("entrarerroaoverificar", idioma[idiomaselect].entrarerroaoverificar);
    traduzirClasse("entrarcodvalido", idioma[idiomaselect].entrarcodvalido);
    traduzirClasse("entrarcodinvalido", idioma[idiomaselect].entrarcodinvalido);
    traduzirClasse("entrarnovasenha", idioma[idiomaselect].entrarnovasenha);
    traduzirClasse("entrarcodverificacaocriado", idioma[idiomaselect].entrarcodverificacaocriado);
    traduzirClasse("entraremailnaoencontrado", idioma[idiomaselect].entraremailnaoencontrado);
    traduzirClasse("entrarsenhaalterada", idioma[idiomaselect].entrarsenhaalterada);
    // pag config
    traduzirClasse("configuracoes", idioma[idiomaselect].configuracoes);
    traduzirClasse("editarperfil", idioma[idiomaselect].editarperfil);
    traduzirClasse("detalhesconta", idioma[idiomaselect].detalhesconta);
    traduzirClasse("detalhesacessibilidade", idioma[idiomaselect].detalhesacessibilidade);
    traduzirClasse("detalhespoliticasite", idioma[idiomaselect].detalhespoliticasite);
    traduzirClasse("confignome", idioma[idiomaselect].confignome);
    traduzirClasse("configgenero", idioma[idiomaselect].configgenero);
    traduzirClasse("configinfoend", idioma[idiomaselect].configinfoend);
    traduzirClasse("configcep", idioma[idiomaselect].configcep);
    traduzirClasse("configestado", idioma[idiomaselect].configestado);
    traduzirClasse("configcidade", idioma[idiomaselect].configcidade);
    traduzirClasse("configrua", idioma[idiomaselect].configrua);
    traduzirClasse("configbairro", idioma[idiomaselect].configbairro);
    traduzirClasse("confignum", idioma[idiomaselect].confignum);
    traduzirClasse("configcomplemento", idioma[idiomaselect].configcomplemento);
    traduzirClasse("configsalvar", idioma[idiomaselect].configsalvar);
    // pag config > placeholder
    
      


    traduzirClasse("painelendereço", idioma[idiomaselect].painelendereço);
    traduzirClasse("paineldisponiveis", idioma[idiomaselect].paineldisponiveis);
    traduzirClasse("painelestatisticas", idioma[idiomaselect].painelestatisticas);
    traduzirClasse("buttonRosa", idioma[idiomaselect].painelcadastrar);
    traduzirClasse("painelconhecamais", idioma[idiomaselect].painelconhecamais);
    traduzirClasse("painelnossospets", idioma[idiomaselect].painelnossospets);
    traduzirClasse("painelnenhumencontrado", idioma[idiomaselect].painelnenhumencontrado);
    // form cadastrar usuario
    traduzirClasse("titulocadastro", idioma[idiomaselect].titulocadastro);
    traduzirClasse("infoUsuario", idioma[idiomaselect].infousuario);
    traduzirPlaceholder("nomeUsuario", idioma[idiomaselect].nomeusuario);
    traduzirPlaceholder("emailUsuario", idioma[idiomaselect].emailusuario);
    traduzirPlaceholder("telefoneUsuario", idioma[idiomaselect].telefoneusuario);
    traduzirPlaceholder("cpfUsuario", idioma[idiomaselect].cpfusuario);
    traduzirClasse("selectGenero", idioma[idiomaselect].selectgenero);
    traduzirClasse("generoFem", idioma[idiomaselect].generofem);
    traduzirClasse("generoMasc", idioma[idiomaselect].generomasc);
    traduzirClasse("generoNao", idioma[idiomaselect].generonao);
    traduzirPlaceholder("dataNascimento", idioma[idiomaselect].datanascimento);
    traduzirPlaceholder("senhaUsuario", idioma[idiomaselect].senhausuario);
    traduzirPlaceholder("confirmarSenha", idioma[idiomaselect].confirmarsenha);
    traduzirClasse("infoEndereco", idioma[idiomaselect].infoendereco);
    traduzirPlaceholder("cepUsuario", idioma[idiomaselect].cepusuario);
    traduzirClasse("selectEstado", idioma[idiomaselect].selectestado);
    traduzirPlaceholder("cidadeUsuario", idioma[idiomaselect].cidadeusuario);
    traduzirPlaceholder("ruaUsuario", idioma[idiomaselect].ruausuario);
    traduzirPlaceholder("bairroUsuario", idioma[idiomaselect].bairrousuario);
    traduzirPlaceholder("numeroUsuario", idioma[idiomaselect].numerousuario);
    traduzirPlaceholder("complementoUsuario", idioma[idiomaselect].complementousuario);
    traduzirClasse("botaoConfirmar", idioma[idiomaselect].botaoConfirmar);
    traduzirClasse("labelCodigo", idioma[idiomaselect].labelcodigo);
    traduzirPlaceholder("codigoVerificacao", idioma[idiomaselect].codigoverificacao);
    traduzirClasse("btnVerificarCodigo", idioma[idiomaselect].btnverificarcodigo);


    document.getElementById('trocarlingua').value = idiomaselect;
}

function trocaridioma(lang) {
    localStorage.setItem('idiomaselect', lang);
    traduzir();
}

window.addEventListener('DOMContentLoaded', traduzir);



