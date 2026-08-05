document.addEventListener('DOMContentLoaded', function(){
  const openBtn = document.getElementById('openModal');
  const openForumBtn = document.getElementById('openModal2');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const overlay = document.getElementById('modalOverlay');
  const sendBtn = document.getElementById('sendBtn');
  const commentsList = document.getElementById('commentsList');
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  const anonymousProfiles = [
    '🦊 Zorro Azul',
    '🐼 Panda Feliz',
    '🦉 Búho Nocturno',
    '🐢 Tortuga Serena',
    '🦋 Mariposa Libre',
    '🐧 Pingüino Tranquilo',
    '🦄 Unicornio Suave',
    '🦁 León Amable',
    '🐝 Abeja Creativa',
    '🐢 Tortuga Serena'
  ];

  function getAnonymousIdentity(){
    const stored = localStorage.getItem('entrenosotros-identity');
    if(stored){
      return stored;
    }
    const identity = anonymousProfiles[Math.floor(Math.random() * anonymousProfiles.length)];
    localStorage.setItem('entrenosotros-identity', identity);
    return identity;
  }

  function openModal(){
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    const ta = document.getElementById('anonText');
    if(ta) ta.focus();
  }
  function closeModal(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
  }

  function getStoredComments(){
    const stored = localStorage.getItem('entrenosotros-comments');
    return stored ? JSON.parse(stored) : [];
  }

  function saveComments(comments){
    localStorage.setItem('entrenosotros-comments', JSON.stringify(comments));
  }

  function renderComments(){
    const comments = getStoredComments();
    commentsList.innerHTML = '';
    if(!comments.length){
      const empty = document.createElement('p');
      empty.className = 'comment-empty';
      empty.textContent = 'Sé el primero en dejar un comentario anónimo.';
      commentsList.appendChild(empty);
      return;
    }
    comments.forEach(comment => {
      const card = document.createElement('article');
      card.className = 'comment-card';

      const meta = document.createElement('div');
      meta.className = 'comment-meta';
      const user = document.createElement('span');
      user.textContent = comment.user;
      const date = document.createElement('span');
      date.textContent = comment.date;
      meta.appendChild(user);
      meta.appendChild(date);

      const text = document.createElement('p');
      text.className = 'comment-text';
      text.textContent = comment.text;

      const actions = document.createElement('div');
      actions.className = 'comment-actions';
      const likeBtn = document.createElement('button');
      likeBtn.type = 'button';
      likeBtn.textContent = `❤️ ${comment.likes}`;
      likeBtn.addEventListener('click', function(){
        comment.likes += 1;
        saveComments(comments);
        renderComments();
      });
      actions.appendChild(likeBtn);

      card.appendChild(meta);
      card.appendChild(text);
      card.appendChild(actions);
      commentsList.appendChild(card);
    });
  }

  function addComment(text){
    const comments = getStoredComments();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' });
    const user = getAnonymousIdentity();
    comments.unshift({ user, text, date: formattedDate, likes: 0 });
    saveComments(comments);
    renderComments();
  }

  const artFilesInput = document.getElementById('artFiles');
  const artCaption = document.getElementById('artCaption');
  const saveArtBtn = document.getElementById('saveArtBtn');
  const artGallery = document.getElementById('artGallery');
  const letterText = document.getElementById('letterText');
  const saveLetterBtn = document.getElementById('saveLetterBtn');
  const letterList = document.getElementById('letterList');
  const diaryText = document.getElementById('diaryText');
  const saveDiaryBtn = document.getElementById('saveDiaryBtn');
  const gardenScore = document.getElementById('gardenScore');
  const gardenLevel = document.getElementById('gardenLevel');
  const waterGardenBtn = document.getElementById('waterGardenBtn');

  function getStoredArt(){
    const stored = localStorage.getItem('entrenosotros-art');
    return stored ? JSON.parse(stored) : [];
  }
  function saveArt(items){
    localStorage.setItem('entrenosotros-art', JSON.stringify(items));
  }
  function renderArt(){
    const items = getStoredArt();
    artGallery.innerHTML = '';
    if(!items.length){
      const empty = document.createElement('p');
      empty.className = 'comment-empty';
      empty.textContent = 'Comparte tu primer arte para inspirar a otros.';
      artGallery.appendChild(empty);
      return;
    }
    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'art-card';
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption || 'Arte comunitario';
      const caption = document.createElement('p');
      caption.textContent = item.caption || 'Expresión anónima';
      const date = document.createElement('small');
      date.textContent = item.date;
      card.appendChild(img);
      card.appendChild(caption);
      card.appendChild(date);
      artGallery.appendChild(card);
    });
  }

  function getStoredLetters(){
    const stored = localStorage.getItem('entrenosotros-letters');
    return stored ? JSON.parse(stored) : [];
  }
  function saveLetters(items){
    localStorage.setItem('entrenosotros-letters', JSON.stringify(items));
  }
  function renderLetters(){
    const letters = getStoredLetters();
    letterList.innerHTML = '';
    if(!letters.length){
      const empty = document.createElement('p');
      empty.className = 'comment-empty';
      empty.textContent = 'Aún no hay cartas compartidas.';
      letterList.appendChild(empty);
      return;
    }
    letters.forEach(letter => {
      const item = document.createElement('div');
      item.className = 'letter-item';
      item.textContent = `${letter.date} — ${letter.text}`;
      letterList.appendChild(item);
    });
  }

  function loadDiary(){
    const stored = localStorage.getItem('entrenosotros-diary');
    if(stored && diaryText){
      diaryText.value = stored;
    }
  }
  function saveDiary(){
    if(!diaryText) return;
    localStorage.setItem('entrenosotros-diary', diaryText.value.trim());
    alert('Diario guardado en tu navegador.');
  }

  function getGardenState(){
    const stored = localStorage.getItem('entrenosotros-garden');
    return stored ? JSON.parse(stored) : { score: 0 };
  }
  function saveGardenState(state){
    localStorage.setItem('entrenosotros-garden', JSON.stringify(state));
  }
  function updateGarden(){
    const state = getGardenState();
    const level = state.score >= 12 ? 'Bosque' : state.score >= 6 ? 'Árbol' : state.score >= 3 ? 'Brote' : 'Semilla';
    if(gardenScore) gardenScore.textContent = state.score;
    if(gardenLevel) gardenLevel.textContent = level;
    saveGardenState(state);
  }

  function updateThemeButton(){
    if(!themeToggle) return;
    const theme = document.body.dataset.theme === 'dark' ? 'dark' : 'light';
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  function setTheme(theme){
    document.body.dataset.theme = theme;
    localStorage.setItem('entrenosotros-theme', theme);
    updateThemeButton();
  }
  function toggleTheme(){
    const current = document.body.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  const storedTheme = localStorage.getItem('entrenosotros-theme') || 'dark';
  setTheme(storedTheme);

  if(saveArtBtn){
    saveArtBtn.addEventListener('click', function(){
      const files = artFilesInput.files;
      if(!files || !files.length){
        alert('Selecciona al menos una imagen para compartir.');
        return;
      }
      const existing = getStoredArt();
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e){
          const now = new Date();
          const date = now.toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' });
          existing.unshift({
            src: e.target.result,
            caption: artCaption.value.trim(),
            date
          });
          saveArt(existing);
          renderArt();
        };
        reader.readAsDataURL(file);
      });
      artCaption.value = '';
      artFilesInput.value = '';
    });
  }

  if(saveLetterBtn){
    saveLetterBtn.addEventListener('click', function(){
      const text = letterText.value.trim();
      if(!text){
        alert('Escribe una carta antes de guardar.');
        return;
      }
      const letters = getStoredLetters();
      const now = new Date();
      const date = now.toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' });
      letters.unshift({ text, date });
      saveLetters(letters);
      renderLetters();
      letterText.value = '';
    });
  }

  if(saveDiaryBtn){
    saveDiaryBtn.addEventListener('click', saveDiary);
  }

  if(waterGardenBtn){
    waterGardenBtn.addEventListener('click', function(){
      const state = getGardenState();
      state.score += 1;
      saveGardenState(state);
      updateGarden();
    });
  }

  if(themeToggle){
    themeToggle.addEventListener('click', toggleTheme);
  }

  function closeModal(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
  }

  if(openBtn) openBtn.addEventListener('click', openModal);
  if(openForumBtn) openForumBtn.addEventListener('click', openModal);
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if(overlay) overlay.addEventListener('click', closeModal);

  if(sendBtn){
    sendBtn.addEventListener('click', function(){
      const textarea = document.getElementById('anonText');
      const text = textarea.value.trim();
      if(!text){
        alert('Escribe algo antes de enviar.');
        return;
      }
      addComment(text);
      textarea.value = '';
      closeModal();
    });
  }

  if(navToggle){
    navToggle.addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
  }

  function loadGarden(){
    updateGarden();
  }

  renderComments();
  renderArt();
  renderLetters();
  loadDiary();
  loadGarden();

});
