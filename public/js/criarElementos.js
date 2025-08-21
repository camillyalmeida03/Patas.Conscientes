// Este arquivo é responsável por uma class que gerencia métodos que otimizam a criação de elementos via JS

export class CriarElementos{
  
    //Cria elemento que você mesmo pode especificar
    // Ao usar, informe sua tag, classe, innertext, elemento pai e id
    // Deixe campo null, caso não deseje atribuir valor a algum desses
    createElement(tag, classes = [], innerText = "", parent = null, id = "") {
        const element = document.createElement(tag);
    
        if (id) element.id = id; // Adiciona o id se fornecido
    
        if (Array.isArray(classes)) {
          element.classList.add(...classes);
        } else if (classes) {
          element.classList.add(classes);
        }
    
        if (innerText) element.innerText = innerText;
        if (parent) parent.appendChild(element);
    
        return element;
      }
    
      // Método responsável por otimizar a linha de criação de cada elemento IMG
      // O método recebe as classes, src, alt, loading e seu pai
      createImg(classes = [], src = "", alt = "", loading = "lazy", parent = null) {
        const img = document.createElement("img");
    
        if (Array.isArray(classes)) {
          img.classList.add(...classes);
        } else if (classes) {
          img.classList.add(classes);
        }
    
        if (src) img.src = src;
        if (loading) img.loading = loading;
        if (alt) img.alt = alt;
        if (parent) parent.appendChild(img);
    
        return img;
      }
    
      // Método responsável por otimizar a linha de criação de cada botão no HTML
      // O método recebe o nome da as classes, texto interno do elemento, seu pai e seu title
      createButton(classes = [], innerText = "", parent = null, title = "") {
        const button = document.createElement("button");
        
    
        if (Array.isArray(classes)) {
          button.classList.add(...classes);
        } else if (classes) {
          button.classList.add(classes);
        }
    
        if (innerText) button.innerText = innerText;
        if (parent) parent.appendChild(button);
        if (title) button.title = title;
    
        return button;
      }
    
      // Método responsável por otimizar a linha de criação de cada elemento A
      // O método recebe o nome da as classes, href, title, texto interno do elemento e seu pai
      createA(classes = [], href = "", title = "", innerText = "", parent = null) {
        const a = document.createElement("a");
    
        if (Array.isArray(classes)) {
          a.classList.add(...classes);
        } else if (classes) {
          a.classList.add(classes);
        }
    
        if (href) a.href = href;
        if (title) a.title = title;
        if (innerText) a.innerText = innerText;
        if (parent) parent.appendChild(a);
    
        return a;
      }
}