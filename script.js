/**
 * ====================================================================
 * APLICAÇÃO: LISTA DE TAREFAS (TO-DO LIST)
 * ====================================================================
 * 
 * Este arquivo contém toda a lógica da nossa aplicação dividida em:
 * 1. Seleção dos elementos do HTML (DOM)
 * 2. Estado da aplicação (dados na memória)
 * 3. Persistência (Salvar e carregar do LocalStorage)
 * 4. Funções de manipulação das tarefas (adicionar, alternar, remover)
 * 5. Função de renderização (desenhar na tela)
 * 6. Ouvintes de eventos (escutar cliques e envios)
 */

// --------------------------------------------------------------------
// 1. SELEÇÃO DE ELEMENTOS HTML
// --------------------------------------------------------------------
// Pegamos referências dos elementos da página para interagir com eles
const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");
const btnLimparConcluidas = document.getElementById("btn-limpar-concluidas");

// Chave utilizada para salvar os dados no navegador
const STORAGE_KEY = "minhas_tarefas_app";

// --------------------------------------------------------------------
// 2. ESTADO DA APLICAÇÃO
// --------------------------------------------------------------------
// Uma lista (Array) de objetos representando cada tarefa.
// Exemplo de tarefa: { id: 1712345678, texto: "Estudar JavaScript", concluida: false }
let tarefas = carregarTarefasDoStorage();

// --------------------------------------------------------------------
// 3. PERSISTÊNCIA (LOCALSTORAGE)
// --------------------------------------------------------------------

/**
 * Salva a lista de tarefas no armazenamento local do navegador.
 * O navegador guarda como texto puro (JSON).
 */
function salvarTarefasNoStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

/**
 * Lê as tarefas salvas anteriormente no navegador.
 * Se não houver nada salvo, retorna um array vazio [].
 */
function carregarTarefasDoStorage() {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);
  if (dadosSalvos) {
    return JSON.parse(dadosSalvos);
  }
  return [];
}

// --------------------------------------------------------------------
// 4. FUNÇÕES DE MANIPULAÇÃO
// --------------------------------------------------------------------

/**
 * Adiciona uma nova tarefa ao array
 * @param {string} texto - O texto digitado pelo usuário
 */
function adicionarTarefa(texto) {
  // Cria um objeto com id único baseado na data/hora atual
  const novaTarefa = {
    id: Date.now(),
    texto: texto.trim(),
    concluida: false
  };

  // Adiciona a nova tarefa no início da lista
  tarefas.unshift(novaTarefa);

  // Salva e atualiza a interface
  salvarTarefasNoStorage();
  renderizar();
}

/**
 * Alterna o estado de uma tarefa entre concluída e pendente
 * @param {number} id - O identificador único da tarefa
 */
function alternarConcluida(id) {
  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      return { ...tarefa, concluida: !tarefa.concluida };
    }
    return tarefa;
  });

  salvarTarefasNoStorage();
  renderizar();
}

/**
 * Remove uma tarefa da lista pelo seu ID
 * @param {number} id - O identificador único da tarefa
 */
function removerTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);

  salvarTarefasNoStorage();
  renderizar();
}

/**
 * Remove todas as tarefas que já foram marcadas como concluídas
 */
function limparConcluidas() {
  tarefas = tarefas.filter((tarefa) => !tarefa.concluida);

  salvarTarefasNoStorage();
  renderizar();
}

// --------------------------------------------------------------------
// 5. FUNÇÃO DE RENDERIZAÇÃO (DESENHAR NA TELA)
// --------------------------------------------------------------------

/**
 * Atualiza o conteúdo visual do HTML com base no array 'tarefas'
 */
function renderizar() {
  // Limpa o conteúdo atual da lista
  listaTarefas.innerHTML = "";

  // Se a lista estiver vazia, exibe mensagem informativa
  if (tarefas.length === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }

  // Cria um elemento <li> para cada tarefa existente
  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

    // Monta a estrutura interna do item com indicador de status
    li.innerHTML = `
      <label class="conteudo-tarefa">
        <input 
          type="checkbox" 
          class="checkbox-concluir" 
          ${tarefa.concluida ? "checked" : ""}
          data-id="${tarefa.id}"
        />
        <div class="info-tarefa">
          <span class="texto-tarefa">${escaparHTML(tarefa.texto)}</span>
          <span class="tag-status ${tarefa.concluida ? "tag-concluida" : "tag-pendente"}">
            ${tarefa.concluida ? "✓ Concluída" : "⏳ Pendente"}
          </span>
        </div>
      </label>
      <button 
        type="button" 
        class="btn-remover" 
        title="Remover tarefa" 
        data-id="${tarefa.id}"
      >
        🗑️
      </button>
    `;

    listaTarefas.appendChild(li);
  });

  // Atualiza as estatísticas no topo da lista
  atualizarResumo();
}

/**
 * Atualiza o contador de tarefas e visibilidade do botão de limpar concluídas
 */
function atualizarResumo() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluida).length;

  if (total === 0) {
    contadorTarefas.textContent = "0 tarefas cadastradas";
    btnLimparConcluidas.style.display = "none";
  } else {
    contadorTarefas.textContent = `${concluidas} de ${total} concluída${total > 1 ? "s" : ""}`;
    btnLimparConcluidas.style.display = concluidas > 0 ? "inline-block" : "none";
  }
}

/**
 * Medida de segurança básica para evitar inserção indevida de HTML
 */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.innerText = texto;
  return div.innerHTML;
}

// --------------------------------------------------------------------
// 6. OUVINTES DE EVENTOS (INTERAÇÕES DO USUÁRIO)
// --------------------------------------------------------------------

// Evento: Usuário submete o formulário (pressiona Enter ou clica em "Adicionar")
formTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Impede a página de recarregar

  const valor = inputTarefa.value.trim();
  if (valor !== "") {
    adicionarTarefa(valor);
    inputTarefa.value = ""; // Limpa o campo de texto
    inputTarefa.focus();    // Mantém o cursor pronto para digitar outra
  }
});

// Evento: Cliques dentro da lista de tarefas (Delegação de Eventos)
listaTarefas.addEventListener("click", (evento) => {
  const elementoClicado = evento.target;

  // Se clicou no botão de lixeira (remover)
  const btnRemover = elementoClicado.closest(".btn-remover");
  if (btnRemover) {
    const id = Number(btnRemover.dataset.id);
    removerTarefa(id);
    return;
  }

  // Se clicou na caixa de seleção (checkbox)
  if (elementoClicado.classList.contains("checkbox-concluir")) {
    const id = Number(elementoClicado.dataset.id);
    alternarConcluida(id);
  }
});

// Evento: Botão de limpar todas as tarefas concluídas
btnLimparConcluidas.addEventListener("click", () => {
  limparConcluidas();
});

// --------------------------------------------------------------------
// INICIALIZAÇÃO
// --------------------------------------------------------------------
// Desenha as tarefas salvas assim que a página carregar
renderizar();
