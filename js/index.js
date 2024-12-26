const minhaLista = document.querySelector("#minhaLI");
const inputTask = document.querySelector("#input_task");
let arrayLista = [];
let idTarefa = 0;

document.querySelector("#btn_add").addEventListener("click", () => {
    if(inputTask.value !== ""){
        criarTarefa();
        criarItemLista();
        erroInputVazio();
    } else{
        erroInputVazio();
    }
});

inputTask.addEventListener("keydown", evento => {
    if(evento.key === "Enter"){
        if(inputTask.value !== ""){
            criarTarefa();
            criarItemLista();
            erroInputVazio();
        } else{
            erroInputVazio();
        }
    }
});

function criarTarefa(checkBox = false){
    const tarefa = {
        id: ++idTarefa,
        task: inputTask.value,
        check: checkBox
    }

    arrayLista.push(tarefa);
}

function criarItemLista() {
    minhaLista.innerHTML = "";

    arrayLista.forEach((tarefa) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const divCheckSpan = document.createElement("div");
        const divBtnExcluir = document.createElement("div");
        const checkBox = document.createElement("input");
        const btnExcluir = document.createElement("button");

        divCheckSpan.classList.add("div_checkSpan");
        divBtnExcluir.classList.add("div_btnExcluir");
        li.dataset.id = tarefa.id;
        li.classList.add("item_lista");

        checkBox.setAttribute("type", "checkbox");
        checkBox.classList.add("form-check-input");
        checkBox.checked = tarefa.check;
        if (checkBox.checked) {
            span.classList.add("concluido");
        }

        span.textContent = tarefa.task;

        btnExcluir.addEventListener("click", () => {
            if (tarefa.check === false){
                alert("Para excluir tem que concluir a tarefa!");
            } else{
                excluirTarefa(tarefa.id);
            }
        });

        checkBox.addEventListener("click", () => {
            tarefa.check = checkBox.checked;
            if (checkBox.checked) {
                span.classList.add("concluido");
            } else {
                span.classList.remove("concluido");
            }
        });

        divCheckSpan.appendChild(checkBox);
        divCheckSpan.appendChild(span);
        divBtnExcluir.appendChild(btnExcluir);
        li.appendChild(divCheckSpan);
        li.appendChild(divBtnExcluir);

        minhaLista.appendChild(li);
    });

    inputTask.value = "";
    inputTask.focus();
}

function excluirTarefa(id) {
    for (let i = 0; i < arrayLista.length; i++) {
      if (arrayLista[i].id == id) {
        if (confirm("Deseja realmente excluir essa tarefa?")) {
        arrayLista.splice(i, 1);
        alert("Tarefa excluída com sucesso!");
        criarItemLista();
        break;
        }
      }
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