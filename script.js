const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  navLinks.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navLinks.classList.toggle('is-open', !isOpen);
});

navItems.forEach((item) => item.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav')) closeMenu();
});

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navItems.forEach((item) => {
      const isCurrent = item.getAttribute('href') === `#${entry.target.id}`;
      if (isCurrent) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelector('#year').textContent = new Date().getFullYear();

const skillInfo = {
  html: ['HTML5', 'HTML é a linguagem que organiza o conteúdo de uma página, como títulos, textos, imagens, links e formulários. As tags semânticas também ajudam leitores de tela e mecanismos de busca a entender cada parte do site.'],
  css: ['CSS3', 'CSS define a aparência das páginas: cores, fontes, espaçamentos e animações. Com recursos responsivos, o layout se adapta a celulares, tablets e computadores.'],
  javascript: ['JavaScript', 'JavaScript é uma linguagem de programação que dá comportamento às páginas. Ela pode responder a cliques, validar formulários, atualizar conteúdo sem recarregar a página e se comunicar com serviços na internet.'],
  git: ['Git & GitHub', 'Git registra as mudanças feitas nos arquivos de um projeto e permite voltar a versões anteriores. GitHub guarda repositórios na internet e facilita compartilhar código e colaborar com outras pessoas.'],
  figma: ['Figma', 'Figma é uma ferramenta online para criar telas e protótipos de sites e aplicativos. Ela ajuda a planejar a aparência e testar a navegação antes de começar a programar.'],
  sql: ['SQL', 'SQL é uma linguagem usada para consultar e organizar informações em bancos de dados. Com ela, é possível buscar, adicionar, alterar e remover registros, como usuários ou produtos.'],
  ia: ['Inteligência Artificial', 'Uso ferramentas de inteligência artificial como apoio para estudar tecnologia, explorar ideias, entender conceitos e auxiliar na programação. A IA é um recurso de apoio: reviso as respostas e procuro compreender o que estou usando.']
};

const skillDetail = document.querySelector('#skill-detail');
document.querySelectorAll('[data-skill]').forEach((button) => {
  button.addEventListener('click', () => {
    const [title, description] = skillInfo[button.dataset.skill];
    skillDetail.querySelector('h3').textContent = title;
    skillDetail.querySelector('p:last-child').textContent = description;
    skillDetail.hidden = false;
    document.querySelectorAll('[data-skill]').forEach((item) => item.setAttribute('aria-expanded', String(item === button)));
  });
});
skillDetail.querySelector('.skill-detail-close').addEventListener('click', () => {
  skillDetail.hidden = true;
  document.querySelectorAll('[data-skill]').forEach((item) => item.removeAttribute('aria-expanded'));
});

const projectDialog = document.querySelector('.project-dialog');
const projectExamples = {
  jemg: {
    title: '3º lugar no JEMG',
    type: 'CONQUISTA · 2026',
    description: 'Conquistei o 3º lugar nos Jogos Escolares de Minas Gerais (JEMG), em 2026.',
    content: '<div class="steam-detail"><span class="jemg-detail-mark">3º</span><p>Uma conquista importante da minha trajetória em 2026.</p></div>',
    note: 'JEMG · Jogos Escolares de Minas Gerais · 2026.'
  },
  steam: {
    title: 'Liga STEAM',
    type: 'MINHA PARTICIPAÇÃO',
    description: 'Participo da Liga STEAM como parte da minha trajetória de aprendizado.',
    content: '<div class="steam-detail"><span class="steam-detail-mark">STEAM</span><p>Esta participação também faz parte do meu portfólio.</p></div>',
    note: 'Mais detalhes sobre atividades e projetos da Liga STEAM podem ser acrescentados quando você quiser.'
  },
  memoria: {
    title: 'Jogo da Memória',
    type: 'PROJETO FEITO POR MIM',
    description: 'Vire as cartas e encontre os pares iguais. Tente completar com o menor número de jogadas.',
    content: '<div class="memory-game" aria-label="Jogo da memória"><p>Jogadas: <strong class="memory-moves">0</strong></p><div class="memory-board"><button type="button" data-card="⭐" aria-label="Carta fechada">?</button><button type="button" data-card="🍀" aria-label="Carta fechada">?</button><button type="button" data-card="🍀" aria-label="Carta fechada">?</button><button type="button" data-card="⭐" aria-label="Carta fechada">?</button></div><p class="memory-status" aria-live="polite">Encontre os dois pares.</p><button class="demo-secondary" type="button" data-reset-memory>Recomeçar</button></div>',
    note: 'Demonstração interativa do jogo da memória.'
  },
  quizzes: {
    title: 'Meus Quizzes',
    type: 'PROJETO FEITO POR MIM',
    description: 'Criei vários quizzes. Experimente esta pequena rodada de perguntas e veja sua pontuação.',
    content: '<div class="quiz-demo" data-question="0"><p class="quiz-progress">Pergunta 1 de 2</p><p class="quiz-question">Qual linguagem dá interatividade às páginas web?</p><div class="quiz-answers"><button type="button" data-answer="errada">HTML</button><button type="button" data-answer="certa">JavaScript</button><button type="button" data-answer="errada">CSS</button></div><p class="quiz-feedback" aria-live="polite">Escolha uma resposta.</p><p>Pontuação: <strong class="quiz-score">0</strong> / 2</p><button class="demo-secondary" type="button" data-next-question hidden>Próxima pergunta</button></div>',
    note: 'Perguntas de exemplo para demonstrar a interação.'
  },
  taskflow: {
    title: 'Taskflow',
    description: 'Um organizador simples para anotar tarefas e acompanhar o que já foi concluído.',
    content: '<div class="task-demo"><label for="demo-task">Experimente adicionar uma tarefa:</label><div class="task-entry"><input id="demo-task" maxlength="60" placeholder="Ex.: estudar JavaScript"><button type="button" data-add-task>Adicionar</button></div><ul class="demo-task-list"><li><label><input type="checkbox"> Planejar a semana</label></li></ul></div>',
    note: 'Demonstração local: as tarefas ficam apenas nesta página.'
  },
  clima: {
    title: 'Clima Agora',
    description: 'Uma interface de clima com leitura rápida da temperatura e das condições da cidade.',
    content: '<div class="weather-demo"><label for="demo-city">Escolha uma cidade:</label><select id="demo-city"><option value="São Paulo: 24° · céu aberto">São Paulo</option><option value="Curitiba: 18° · parcialmente nublado">Curitiba</option><option value="Salvador: 29° · ensolarado">Salvador</option></select><p class="weather-result" aria-live="polite">São Paulo: 24° · céu aberto</p></div>',
    note: 'Demonstração com valores ilustrativos, sem consulta meteorológica em tempo real.'
  },
  verde: {
    title: 'Verde Perto',
    description: 'Uma página conceitual para descobrir maneiras simples de apoiar iniciativas locais e reduzir desperdício.',
    content: '<div class="green-demo"><p>Escolha uma ideia para ver uma sugestão:</p><div class="green-actions"><button type="button" data-tip="Procure uma feira ou produtor do seu bairro e priorize alimentos da estação.">Comprar local</button><button type="button" data-tip="Leve uma sacola reutilizável e planeje as compras para evitar desperdício.">Reduzir desperdício</button><button type="button" data-tip="Compartilhe ferramentas, livros ou objetos que você usa pouco com a comunidade.">Compartilhar mais</button></div><p class="green-result" aria-live="polite">As sugestões aparecem aqui.</p></div>',
    note: 'Ideias gerais para esta demonstração conceitual.'
  }
};

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectExamples[button.dataset.project];
    projectDialog.querySelector('#project-dialog-title').textContent = project.title;
    projectDialog.querySelector('.eyebrow').textContent = project.type || 'PROJETO CONCEITUAL';
    projectDialog.querySelector('.dialog-description').textContent = project.description;
    projectDialog.querySelector('.dialog-extra').innerHTML = project.content;
    projectDialog.querySelector('.dialog-note').textContent = project.note;
    projectDialog.dataset.project = button.dataset.project;
    projectDialog.showModal();
  });
});

projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
  if (event.target.matches('[data-add-task]')) {
    const input = projectDialog.querySelector('#demo-task');
    const task = input.value.trim();
    if (!task) { input.focus(); return; }
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.append(checkbox, document.createTextNode(` ${task}`));
    item.append(label);
    projectDialog.querySelector('.demo-task-list').append(item);
    input.value = '';
    input.focus();
  }
  if (event.target.matches('[data-tip]')) projectDialog.querySelector('.green-result').textContent = event.target.dataset.tip;
  if (event.target.matches('.memory-board button')) {
    const card = event.target;
    if (card.disabled || card.dataset.matched === 'true' || projectDialog.querySelectorAll('.memory-board button.is-open').length >= 2) return;
    card.textContent = card.dataset.card;
    card.classList.add('is-open');
    card.setAttribute('aria-label', `Carta ${card.dataset.card}`);
    const openCards = projectDialog.querySelectorAll('.memory-board button.is-open');
    if (openCards.length === 2) {
      const moves = projectDialog.querySelector('.memory-moves');
      moves.textContent = String(Number(moves.textContent) + 1);
      if (openCards[0].dataset.card === openCards[1].dataset.card) {
        openCards.forEach((openCard) => { openCard.dataset.matched = 'true'; openCard.classList.remove('is-open'); });
        if (projectDialog.querySelectorAll('.memory-board button[data-matched="true"]').length === 4) projectDialog.querySelector('.memory-status').textContent = `Você encontrou todos os pares em ${moves.textContent} jogadas!`;
      } else {
        projectDialog.querySelector('.memory-status').textContent = 'Não formou par. Tente novamente!';
        window.setTimeout(() => openCards.forEach((openCard) => {
          if (!openCard.isConnected || openCard.dataset.matched === 'true') return;
          openCard.textContent = '?'; openCard.classList.remove('is-open'); openCard.setAttribute('aria-label', 'Carta fechada');
        }), 750);
      }
    }
  }
  if (event.target.matches('[data-reset-memory]')) {
    const cards = [...projectDialog.querySelectorAll('.memory-board button')];
    cards.forEach((card) => { card.dataset.matched = 'false'; card.textContent = '?'; card.classList.remove('is-open'); card.setAttribute('aria-label', 'Carta fechada'); });
    projectDialog.querySelector('.memory-moves').textContent = '0';
    projectDialog.querySelector('.memory-status').textContent = 'Encontre os dois pares.';
  }
  if (event.target.matches('[data-answer]')) {
    const isCorrect = event.target.dataset.answer === 'certa';
    projectDialog.querySelector('.quiz-feedback').textContent = isCorrect ? 'Isso mesmo! JavaScript adiciona interatividade.' : 'Não é essa. Tente novamente!';
    if (isCorrect) projectDialog.querySelector('.quiz-score').textContent = String(Number(projectDialog.querySelector('.quiz-score').textContent) + 1);
    projectDialog.querySelectorAll('[data-answer]').forEach((answer) => { answer.disabled = true; });
    projectDialog.querySelector('[data-next-question]').hidden = false;
  }
  if (event.target.matches('[data-next-question]')) {
    const quiz = projectDialog.querySelector('.quiz-demo');
    if (quiz.dataset.question === '0') {
      quiz.dataset.question = '1';
      quiz.querySelector('.quiz-progress').textContent = 'Pergunta 2 de 2';
      quiz.querySelector('.quiz-question').textContent = 'Qual tag HTML cria um link?';
      quiz.querySelector('.quiz-answers').innerHTML = '<button type="button" data-answer="certa">&lt;a&gt;</button><button type="button" data-answer="errada">&lt;p&gt;</button><button type="button" data-answer="errada">&lt;img&gt;</button>';
      quiz.querySelector('.quiz-feedback').textContent = 'Escolha uma resposta.';
      event.target.hidden = true;
    } else {
      quiz.querySelector('.quiz-question').textContent = `Quiz concluído! Você fez ${quiz.querySelector('.quiz-score').textContent} de 2 pontos.`;
      quiz.querySelector('.quiz-answers').replaceChildren();
      quiz.querySelector('.quiz-feedback').textContent = 'Obrigado por jogar!';
      event.target.hidden = true;
    }
  }
});
projectDialog.addEventListener('change', (event) => {
  if (event.target.matches('#demo-city')) projectDialog.querySelector('.weather-result').textContent = event.target.value;
});
