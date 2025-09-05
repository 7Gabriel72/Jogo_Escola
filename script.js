// ----------------------
// Dados das Fases e Perguntas
// ----------------------
const fases = [
  {
    nome: "1ª Fase – Biologia",
    tema: "bg-green-100",
    perguntas: [
      {
        pergunta: "Qual é a principal função do sistema excretor humano?",
        opcoes: [
          "Produzir hormônios",
          "Eliminar resíduos do metabolismo",
          "Transportar oxigênio",
          "Controlar movimentos voluntários"
        ],
        correta: 1,
        dica: "O sistema excretor remove substâncias tóxicas do corpo."
      },
      {
        pergunta: "Qual dessas doenças está relacionada ao sistema imunológico?",
        opcoes: [
          "Diabetes",
          "Gripe",
          "AIDS",
          "Cálculo renal"
        ],
        correta: 2,
        dica: "A AIDS afeta diretamente as células de defesa do corpo."
      },
      {
        pergunta: "Qual é o papel fisiológico dos rins?",
        opcoes: [
          "Produzir insulina",
          "Filtrar o sangue",
          "Armazenar glicose",
          "Produzir bile"
        ],
        correta: 1,
        dica: "Os rins filtram o sangue, removendo resíduos."
      }
    ]
  },
  {
    nome: "2ª Fase – Química",
    tema: "bg-blue-100",
    perguntas: [
      {
        pergunta: "Qual destes é um material sólido?",
        opcoes: [
          "Água",
          "Oxigênio",
          "Gelo",
          "Vapor"
        ],
        correta: 2,
        dica: "O gelo é a forma sólida da água."
      },
      {
        pergunta: "O que são ligações químicas?",
        opcoes: [
          "Movimentos dos planetas",
          "Forças que unem átomos",
          "Reações nucleares",
          "Mudanças de estado físico"
        ],
        correta: 1,
        dica: "Ligações químicas mantêm os átomos juntos em moléculas."
      },
      {
        pergunta: "Qual é a fórmula do cloreto de sódio?",
        opcoes: [
          "NaCl",
          "H2O",
          "CO2",
          "KCl"
        ],
        correta: 0,
        dica: "O sal de cozinha é NaCl."
      }
    ]
  },
  {
    nome: "3ª Fase – Biologia/Fotossíntese",
    tema: "bg-yellow-100",
    perguntas: [
      {
        pergunta: "Qual é o processo responsável pela produção de glicose nas plantas?",
        opcoes: [
          "Respiração celular",
          "Fotossíntese",
          "Fermentação",
          "Digestão"
        ],
        correta: 1,
        dica: "A fotossíntese ocorre nos cloroplastos."
      },
      {
        pergunta: "Qual é a unidade básica dos seres vivos?",
        opcoes: [
          "Célula",
          "Órgão",
          "Tecido",
          "Sistema"
        ],
        correta: 0,
        dica: "Todos os seres vivos são formados por células."
      },
      {
        pergunta: "Qual órgão é responsável pela distribuição do sangue no corpo humano?",
        opcoes: [
          "Pulmão",
          "Estômago",
          "Coração",
          "Rim"
        ],
        correta: 2,
        dica: "O coração bombeia sangue para todo o corpo."
      }
    ]
  },
  {
    nome: "Fase Extra – Física e Química",
    tema: "bg-purple-100",
    perguntas: [
      {
        pergunta: "O que é energia cinética?",
        opcoes: [
          "Energia armazenada",
          "Energia do movimento",
          "Energia térmica",
          "Energia elétrica"
        ],
        correta: 1,
        dica: "Corpos em movimento possuem energia cinética."
      },
      {
        pergunta: "O que são ligações iônicas?",
        opcoes: [
          "Compartilhamento de elétrons",
          "Transferência de elétrons",
          "Forças nucleares",
          "Mudança de estado físico"
        ],
        correta: 1,
        dica: "Ligações iônicas envolvem transferência de elétrons entre átomos."
      },
      {
        pergunta: "Qual lei de Kepler fala das áreas varridas pelo raio vetor?",
        opcoes: [
          "Primeira lei",
          "Segunda lei",
          "Terceira lei",
          "Quarta lei"
        ],
        correta: 1,
        dica: "A segunda lei de Kepler trata das áreas iguais em tempos iguais."
      }
    ]
  }
];

let faseAtual = 0;
let perguntaAtual = 0;
let pontos = 0;
let dicasColetadas = [];
let usuario = "";

const mainBg = document.getElementById('main-bg');
const faseLabel = document.getElementById('fase-label');
const scoreEl = document.getElementById('score');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');
const notebookBtn = document.getElementById('notebook-btn');
const notebook = document.getElementById('notebook');
const notebookList = document.getElementById('notebook-list');
const closeNotebook = document.getElementById('close-notebook');
const userDisplay = document.getElementById('user-display');
const loginArea = document.getElementById('login-area');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const gameContainer = document.getElementById('game-container');
const endArea = document.getElementById('end-area');
const endTitle = document.getElementById('end-title');
const endScore = document.getElementById('end-score');
const endNotebookList = document.getElementById('end-notebook-list');

function atualizarTema() {
  // Remove fundos anteriores
  mainBg.classList.remove('bg-bio', 'bg-quim', 'bg-fis', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-purple-100');
  const fase = fases[faseAtual];
  // Define fundo por área
  if (fase.nome.toLowerCase().includes('biologia')) {
    mainBg.classList.add('bg-bio');
  } else if (fase.nome.toLowerCase().includes('química')) {
    mainBg.classList.add('bg-quim');
  } else if (fase.nome.toLowerCase().includes('física')) {
    mainBg.classList.add('bg-fis');
  }
  // Cor de fallback
  mainBg.classList.add(fase.tema);
}

function mostrarPergunta() {
  atualizarTema();
  const fase = fases[faseAtual];
  const perguntaObj = fase.perguntas[perguntaAtual];

  faseLabel.textContent = fase.nome;
  scoreEl.textContent = `Pontos: ${pontos}`;
  questionEl.textContent = perguntaObj.pergunta;
  feedbackEl.textContent = '';
  nextBtn.classList.add('hidden');

  // Atualiza barra de progresso
  const progresso = ((perguntaAtual) / fase.perguntas.length) * 100;
  progressBar.style.width = `${progresso}%`;

  // Mostra opções
  optionsEl.innerHTML = '';
  perguntaObj.opcoes.forEach((opcao, idx) => {
    const btn = document.createElement('button');
    btn.className = "option-btn w-full bg-white border border-gray-300 rounded px-4 py-2 text-left transition";
    btn.textContent = opcao;
    btn.setAttribute('tabindex', 0);
    btn.onclick = () => checarResposta(idx, btn);
    btn.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') checarResposta(idx, btn);
    };
    optionsEl.appendChild(btn);
  });
}

// Função para checar resposta
function checarResposta(idx, btnClicado) {
  const fase = fases[faseAtual];
  const perguntaObj = fase.perguntas[perguntaAtual];

  // Desabilita todas as opções
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

  // Remove animações anteriores
  Array.from(optionsEl.children).forEach(btn => {
    btn.classList.remove('animate-correct', 'animate-wrong');
  });

  if (idx === perguntaObj.correta) {
    pontos += 10;
    btnClicado.classList.add('animate-correct');
    feedbackEl.textContent = "Correto! 🎉";
    feedbackEl.style.color = "#22c55e";
    if (!dicasColetadas.includes(perguntaObj.dica)) {
      dicasColetadas.push(perguntaObj.dica);
    }
    nextBtn.classList.remove('hidden');
  } else {
    pontos = Math.max(0, pontos - 2);
    btnClicado.classList.add('animate-wrong');
    feedbackEl.textContent = "Ops! Tente novamente.";
    feedbackEl.style.color = "#ef4444";
    if (!dicasColetadas.includes(perguntaObj.dica)) {
      dicasColetadas.push(perguntaObj.dica);
    }
    // Reabilita opções para tentar de novo
    Array.from(optionsEl.children).forEach(btn => btn.disabled = false);
  }
  scoreEl.textContent = `Pontos: ${pontos}`;
}

// Próxima pergunta ou fase
nextBtn.onclick = () => {
  const fase = fases[faseAtual];
  perguntaAtual++;
  if (perguntaAtual < fase.perguntas.length) {
    mostrarPergunta();
  } else if (faseAtual < fases.length - 1) {
    faseAtual++;
    perguntaAtual = 0;
    mostrarPergunta();
  } else {
    mostrarFim();
  }
};

// Tela final do jogo
function mostrarFim() {
  atualizarTema();
  gameContainer.classList.add('hidden');
  endArea.classList.remove('hidden');
  notebook.classList.add('hidden'); // Garante que o notebook feche ao finalizar
  // Calcula pontuação máxima
  let pontosMaximos = fases.reduce((acc, fase) => acc + fase.perguntas.length * 10, 0);
  endTitle.textContent = `Parabéns, ${usuario}! Você concluiu o quiz! 🎉`;
  endScore.textContent = `Sua pontuação foi de: ${pontos}/${pontosMaximos}`;
  // Mostra as dicas coletadas
  endNotebookList.innerHTML = '';
  dicasColetadas.forEach(dica => {
    const li = document.createElement('li');
    li.textContent = dica;
    endNotebookList.appendChild(li);
  });
}

// Caderno virtual
notebookBtn.onclick = () => {
  notebook.classList.remove('hidden');
  notebookList.innerHTML = '';
  if (dicasColetadas.length === 0) {
    const li = document.createElement('li');
    li.textContent = "Nenhuma dica coletada ainda!";
    notebookList.appendChild(li);
  } else {
    dicasColetadas.forEach(dica => {
      const li = document.createElement('li');
      li.textContent = dica;
      notebookList.appendChild(li);
    });
  }
};

closeNotebook.onclick = () => {
  notebook.classList.add('hidden');
};

// Login
loginBtn.onclick = () => {
  const nome = usernameInput.value.trim();
  if (nome.length < 2) {
    usernameInput.classList.add('ring-2', 'ring-red-400');
    usernameInput.placeholder = "Digite um nome válido!";
    usernameInput.focus();
    return;
  }
  usuario = nome;
  userDisplay.textContent = usuario;
  loginArea.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  mostrarPergunta();
  usernameInput.classList.remove('ring-2', 'ring-red-400');
};

// Permite Enter para login
usernameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loginBtn.click();
});

// Função para embaralhar um array (Fisher-Yates)
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Embaralha as perguntas de cada fase ao iniciar o jogo
fases.forEach(fase => {
  embaralharArray(fase.perguntas);
});

// Inicialização do Jogo
window.addEventListener('DOMContentLoaded', function() {
  // Foca no campo de nome ao carregar
  usernameInput.focus();
});
