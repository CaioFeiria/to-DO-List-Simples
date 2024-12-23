const minhaLista = document.querySelector("#minhaLI");
const inputTask = document.querySelector("#input_task");
let idTarefa = 0;

document.querySelector("#btn_add").addEventListener("click", () => {
    if(inputTask.value !== ""){
        criarItemLista();
        erroInputVazio();
    } else{
        erroInputVazio();
    }
});

inputTask.addEventListener("keydown", evento => {
    if(evento.key === "Enter"){
        if(inputTask.value !== ""){
            criarItemLista();
            erroInputVazio();
        } else{
            erroInputVazio();
        }
    }
});

function criarItemLista(){
    var itemLista = document.createElement("li");
    const checkBox = document.createElement("input");
    const span = document.createElement("span");
    const divCheckSpan = document.createElement("div");
    const divBtnExcluir = document.createElement("div");
    const btnExcluir = document.createElement("button");

    divCheckSpan.classList.add("div_checkSpan");

    divBtnExcluir.classList.add("div_btnExcluir");

    itemLista.dataset.id = ++idTarefa;
    itemLista.classList.add("item_lista");

    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("form-check-input");
    checkBox.addEventListener("click", () => {
        itemListaConcluido(span, checkBox);
    });

    span.textContent = inputTask.value;

    btnExcluir.addEventListener("click", () => {
        excluirItemLista(minhaLista, itemLista);
    });

    divCheckSpan.appendChild(checkBox);
    divCheckSpan.appendChild(span);
    divBtnExcluir.appendChild(btnExcluir);
    itemLista.appendChild(divCheckSpan);
    itemLista.appendChild(divBtnExcluir);
    minhaLista.appendChild(itemLista);

    inputTask.value = "";
    inputTask.focus();
}

function excluirItemLista(minhaLista, itemLista){
    minhaLista.removeChild(itemLista);
}

function itemListaConcluido(span, checkBox){
    if(checkBox.checked){
        span.classList.add("concluido");
    }else{
        span.classList.remove("concluido");
    }
}

function erroInputVazio(){
    const inputs = document.querySelectorAll("#container_form input");

    inputs.forEach(input => {
      const divPai = document.querySelector("#div_input_btn").parentNode;
      const spanExistente = divPai.querySelector(".span_erro");
  
      if (spanExistente){
        spanExistente.remove();
      }
  
      if (input.value === ""){
        const spanMensagem = document.createElement("span");
  
        if (input.placeholder === ""){
          spanMensagem.textContent = "O campo é obrigatório";
        } else{
          spanMensagem.textContent = `Preencha o campo ${input.placeholder}`;
        }
  
        spanMensagem.classList.add("span_erro");
        divPai.appendChild(spanMensagem);
      }
    });

    inputTask.focus();
}