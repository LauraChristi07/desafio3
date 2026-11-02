# 📝 Minha Lista de Tarefas

Aplicação web simples e didática de lista de afazeres (To-Do List), desenvolvida com foco no aprendizado dos fundamentos da web.

---

## 🚀 Como Executar

Não é necessário instalar nenhum programa adicional, compilador ou servidor:

1. Abra a pasta do projeto no explorador de arquivos:
   `lista-de-tarefas`
2. Dê um duplo clique no arquivo **`index.html`** (ele abrirá diretamente no seu navegador padrão, como Chrome, Edge ou Firefox).
3. Pronto! Você já pode adicionar, marcar como concluídas e remover tarefas.

---

## 📂 Estrutura e Principais Componentes

O projeto segue a separação clássica de responsabilidades da web em 3 pilares:

```
lista-de-tarefas/
├── index.html   # Estrutura (o "esqueleto" da aplicação)
├── style.css    # Apresentação e estilo (as cores, espaçamentos e visual)
├── script.js    # Comportamento e lógica (a inteligência e reatividade)
└── README.md    # Instruções e documentação
```

### 1. `index.html` (HTML5)
- Define quais elementos aparecem na tela:
  - O campo de texto `<input>` e o botão `<button>` para nova tarefa.
  - O contador de tarefas e botão de limpeza.
  - A lista `<ul>` onde os itens são inseridos.
  - A importação do estilo (`<link rel="stylesheet">`) e do script (`<script src="...">`).

### 2. `style.css` (CSS3)
- Cuida de todo o design moderno da interface:
  - Uso de **CSS Variables** (`:root`) para cores padronizadas.
  - **Flexbox** para alinhar botões, textos e caixas de seleção.
  - Efeitos visuais como `:hover`, foco nos campos e o risco nos textos de itens concluídos (`text-decoration: line-through`).

### 3. `script.js` (JavaScript Moderno)
- Implementa as funcionalidades principais:
  - **Captura de eventos**: escuta quando você envia o formulário ou clica para marcar/remover.
  - **Manipulação do DOM**: cria e remove elementos da página sem precisar recarregá-la.
  - **Persistência com LocalStorage**: salva suas tarefas na memória do próprio navegador para não sumirem quando a página for fechada ou atualizada.
