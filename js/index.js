const minhaLista = document.querySelector("#minhaLI");
const inputTask = document.querySelector("#input_task");
const btnSalvar = document.getElementById("salvarTarefa");
const inputDescricao = document.getElementById("inputDescricao");
const btnAdd = document.querySelector("#btn_add");
let arrayLista = [];
let idTarefa = 0;
let tarefaEditando = null;

btnAdd.addEventListener("click", () => {
  if (inputTask.value !== "") {
    erroInputVazio();
    criarTarefa();
    criarItemLista();
  } else {
    erroInputVazio();
  }
});

inputTask.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    if (inputTask.value !== "") {
      erroInputVazio();
      criarTarefa();
      criarItemLista();
    } else {
      erroInputVazio();
    }
  }
});

inputDescricao.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    if (inputTask.value !== "") {
      erroInputVazio();
      criarTarefa();
      criarItemLista();
    } else {
      erroInputVazio();
    }
  }
});

function criarTarefa(checkBox = false) {
  const checkDescricao = document.getElementById("checkDescricao");

  const tarefa = {
    id: ++idTarefa,
    task: inputTask.value,
    check: checkBox,
    descricao: checkDescricao.checked ? inputDescricao.value : ""
  };

  arrayLista.push(tarefa);
}

function criarItemLista() {
  minhaLista.innerHTML = "";
  btnAdd.classList.remove("btnAddComErroSpan");

  arrayLista.forEach((tarefa) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const divCheckSpan = document.createElement("div");
    const divBtns = document.createElement("div");
    const checkBox = document.createElement("input");
    const btnEditar = document.createElement("button");
    const btnExcluir = document.createElement("button");

    divCheckSpan.classList.add("div_checkSpan");
    divBtns.classList.add("div_btns");
    li.dataset.id = tarefa.id;
    li.classList.add("item_lista");

    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("form-check-input");
    checkBox.checked = tarefa.check;
    if (checkBox.checked) {
      span.classList.add("concluido");
    }

    span.textContent = `${tarefa.task} - ${tarefa.descricao}`;

    btnEditar.classList.add("btn_editar");
    btnEditar.addEventListener("click", () => {
      const modalEditar = new bootstrap.Modal(document.getElementById("editarTarefaModal"));
      modalEditar.show();

      tarefaEditando = tarefa;

      const tituloEdit = document.getElementById("titulo-tarefa");
      const descricaoEdit = document.getElementById("descricao-tarefa");

      tituloEdit.value = tarefa.task;
      descricaoEdit.value = tarefa.descricao;
    });

    btnExcluir.classList.add("btn_excluir");
    btnExcluir.addEventListener("click", () => {
      if (tarefa.check === false) {
        const modalExcluir = new bootstrap.Modal(document.getElementById("modalExcluir"));
        modalExcluir.show();
      } else {
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
    divBtns.appendChild(btnEditar);
    divBtns.appendChild(btnExcluir);
    li.appendChild(divCheckSpan);
    li.appendChild(divBtns);

    minhaLista.appendChild(li);
  });

  inputTask.value = "";
  inputDescricao.value = "";
  inputTask.focus();
}

btnSalvar.addEventListener("click", () => {
  if (tarefaEditando) {
    const tituloEdit = document.getElementById("titulo-tarefa");
    const descricaoEdit = document.getElementById("descricao-tarefa");

    tarefaEditando.task = tituloEdit.value;
    tarefaEditando.descricao = descricaoEdit.value;

    criarItemLista();

    const modalEditar = bootstrap.Modal.getInstance(document.getElementById("editarTarefaModal"));
    modalEditar.hide();

    tarefaEditando = null;
  }
});

function excluirTarefa(id) {
  for (let i = 0; i < arrayLista.length; i++) {
    if (arrayLista[i].id == id) {
      const modalConfirmarExcluir = new bootstrap.Modal(document.getElementById("modalConfirmarExcluir"));
      modalConfirmarExcluir.show();

      document.getElementById("btnConfirmarExcluir").onclick = function () {
        arrayLista.splice(i, 1);
        criarItemLista();
        modalConfirmarExcluir.hide();
      };
      break;
    }
  }
}

function erroInputVazio() {
  const inputs = document.querySelectorAll(".inputErro > input");

  inputs.forEach((input) => {
    const divPai = input.parentNode;
    const spanExistente = divPai.querySelector(".span_erro");

    if (spanExistente) {
      spanExistente.remove();
    }

    if (input.value === "") {
      let spanMensagem = document.createElement("span");

      if (input.placeholder === "") {
        btnAdd.classList.add("btnAddComErroSpan");
        spanMensagem.textContent = "O campo é obrigatório";
      } else {
        btnAdd.classList.add("btnAddComErroSpan");
        spanMensagem.textContent = `Preencha o campo ${input.placeholder}`;
      }

      spanMensagem.classList.add("span_erro");
      divPai.appendChild(spanMensagem);
    }
  });

  inputTask.focus();
}

// function gerenciarInputDescricao() {
//   const divPai = document.getElementById("div_input_btn").parentNode;

//   if (!inputDescricao) {
//     inputDescricao = document.createElement("input");
//     divInpDesc = document.createElement("div");
//     divInpDesc.classList.add("inputErro");
//     inputDescricao.setAttribute("placeholder", "Descrição");
//     inputDescricao.setAttribute("type", "text");
//     inputDescricao.id = "inputDescricao";
//     inputDescricao.classList.add("form-control");
//     inputDescricao.style.display = "none";
//     divInpDesc.appendChild(inputDescricao);
//     divPai.appendChild(divInpDesc);
//   }

//   document
//     .getElementById("checkDescricao")
//     .addEventListener("change", function () {
//       if (this.checked) {
//         inputDescricao.style.display = "block";
//         inputTask.focus();
//       } else {
//         inputDescricao.style.display = "none";
//         inputDescricao.value = "";
//       }
//     });
// }
// document.addEventListener("DOMContentLoaded", gerenciarInputDescricao);
