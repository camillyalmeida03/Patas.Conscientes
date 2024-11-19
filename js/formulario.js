window.addEventListener("load", paginacarregada);

function paginacarregada() {

    // Seleciona todos os elementos com a classe 'cpf'
    const cpf = document.querySelectorAll(".cpf");

    // Para cada elemento, adiciona um ouvinte de evento de clique
    cpf.forEach(cpf => {
        cpf.addEventListener('keydown', function () {

            if (cpf.value.length === 3) {
                cpf.value += ".";
            } else if (cpf.value.length === 7) {
                cpf.value += ".";
            } else if (cpf.value.length === 11) {
                cpf.value += "-";
            }
        });
    });

    // Seleciona todos os elementos com a classe 'cnpj'
    const cnpj = document.querySelectorAll(".cnpj");

    // Para cada elemento, adiciona um ouvinte de evento de clique
    cnpj.forEach(cnpj => {
        cnpj.addEventListener('keydown', function () {
            if (cnpj.value.length === 2) {
                cnpj.value += ".";
            } else if (cnpj.value.length === 6) {
                cnpj.value += ".";
            } else if (cnpj.value.length === 10) {
                cnpj.value += "/";
            } else if (cnpj.value.length === 15) {
                cnpj.value += "-";
            }
        })
    });

    // Seleciona todos os elementos com a classe 'cep'
    const cep = document.querySelectorAll(".cep");

    cep.forEach(cep => {
        cep.addEventListener('keydown', function(){
                if (cep.value.length === 5)
                cep.value += "-";
        })
    });

        // Seleciona todos os elementos com a classe 'cel'
        const cel = document.querySelectorAll(".cel");

        // Para cada elemento, adiciona um ouvinte de evento de clique
        cel.forEach(cel => {
            cel.addEventListener('keydown', function () {
                if (cel.value.length === 0) {
                    cel.value += "(";
                } else if (cel.value.length === 3) {
                    cel.value += ")";
                } else if (cel.value.length === 9) {
                    cel.value += "-";
                }
            })
        });

        // Seleciona todos os elementos com a classe 'cel'
        const tel = document.querySelectorAll(".tel");

        // Para cada elemento, adiciona um ouvinte de evento de clique
        tel.forEach(tel => {
            tel.addEventListener('keydown', function () {
                if (tel.value.length === 0) {
                    tel.value += "(";
                } else if (tel.value.length === 3) {
                    tel.value += ")";
                } else if (tel.value.length === 9) {
                    tel.value += "-";
                }
            })
        });
}
