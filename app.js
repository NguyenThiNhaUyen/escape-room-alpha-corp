// ============================================================
// app.js — Escape Room: Giải cứu Alpha Corp
// Logic chính: state, render, events, particles
// ============================================================

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────
  const state = {
    currentScreen: 'intro',    // 'intro' | 'room' | 'ending'
    currentRoomIndex: 0,       // 0–9
    selectedAnswer: null,      // 0–3 or null
    isAnswered: false,
    isCorrect: false,
    score: 0,
    attempts: Array(10).fill(0),
    disabledOptions: [],
    completed: false,
    isPresentationMode: false,
    collapsedCards: { theory: false, case: false }
  };

  // ── DOM refs ───────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const introScreen = () => $('#intro-screen');
  const roomScreen = () => $('#room-screen');
  const endingScreen = () => $('#ending-screen');
  const roomHeader = () => $('#room-header');
  const roomContent = () => $('#room-content');
  const presToggle = () => $('#presentation-toggle');

  // ── Letters for options ────────────────────────────────────
  const LETTERS = ['A', 'B', 'C', 'D'];

  // ── Init ───────────────────────────────────────────────────
  function init() {
    loadPresentationMode();
    bindEvents();
    initParticles();
    render();
  }

  // ── Event binding (delegation) ─────────────────────────────
  function bindEvents() {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('[data-action]') || e.target.closest('[data-option]');
      if (!target) {
        // Check presentation toggle
        if (e.target.closest('#presentation-toggle')) {
          togglePresentationMode();
        }
        return;
      }

      const action = target.getAttribute('data-action');
      const optionIndex = target.getAttribute('data-option');

      if (action === 'start') {
        startGame();
      } else if (action === 'check') {
        checkAnswer();
      } else if (action === 'next') {
        nextRoom();
      } else if (action === 'restart') {
        resetGame();
      } else if (action === 'collapse') {
        const cardType = target.getAttribute('data-card');
        toggleCollapse(cardType);
      } else if (optionIndex !== null && optionIndex !== undefined) {
        selectAnswer(parseInt(optionIndex, 10));
      }
    });
  }

  // ── Render router ──────────────────────────────────────────
  function render() {
    switch (state.currentScreen) {
      case 'intro':
        renderIntro();
        showScreen('intro-screen');
        break;
      case 'room':
        renderRoom();
        showScreen('room-screen');
        break;
      case 'ending':
        renderEnding();
        showScreen('ending-screen');
        break;
    }
  }

  // ── Show screen ────────────────────────────────────────────
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.add('hidden');
      s.classList.remove('screen-enter');
    });
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('screen-enter');
    }
  }

  // ── Render: Intro ──────────────────────────────────────────
  function renderIntro() {
    const d = INTRO_DATA;
    introScreen().innerHTML = `
      <div class="container" style="max-width:700px;">
        <div class="intro-badge">Chương 3 · Kinh tế chính trị Mác-Lênin</div>
        <h1 class="intro-title">ESCAPE ROOM</h1>
        <p class="intro-subtitle">${d.subtitle}</p>
        <div class="intro-description">${d.description}</div>
        <div class="intro-formula-section">
          <h3>Công thức tuần hoàn tư bản</h3>
          <div class="formula-display">${d.formula}</div>
          <div class="formula-explanation">${d.formulaExplanation}</div>
        </div>
        <div class="btn-center">
          <button class="btn btn-primary btn-large" data-action="start">
            🚀 ${d.buttonText}
          </button>
        </div>
      </div>
    `;
  }

  // ── Render: Room ───────────────────────────────────────────
  function renderRoom() {
    const room = ROOMS[state.currentRoomIndex];
    const roomNum = state.currentRoomIndex + 1;
    const progress = (roomNum / ROOMS.length) * 100;

    // Header
    roomHeader().innerHTML = `
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-room-label">🔓 Phòng ${roomNum}</span>
          <span class="progress-count">${roomNum} / ${ROOMS.length}</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
      </div>
      <div class="room-title-section">
        <h2 class="room-title">${room.title}</h2>
        <p class="room-objective">${room.objective}</p>
      </div>
    `;

    // Content cards
    let html = '';

    // Formula section if applicable
    if (room.formula) {
      html += `
        <div class="formula-section" style="max-width:var(--card-max-width);margin:0 auto 24px;">
          <div class="formula-display">${room.formula}</div>
        </div>
      `;
    }

    // Theory card
    html += buildCollapsibleCard(
      'theory',
      'card-theory',
      '📖',
      room.theoryTitle,
      room.theoryContent,
      state.collapsedCards.theory
    );

    // Case card
    html += buildCollapsibleCard(
      'case',
      'card-case',
      '🏢',
      room.caseTitle,
      room.caseContent,
      state.collapsedCards.case
    );

    // Question card
    html += buildQuestionCard(room);

    // Result card (only if answered correctly)
    if (state.isCorrect) {
      html += buildResultCardCorrect(room);
    }

    roomContent().innerHTML = html;
  }

  // ── Build collapsible card ─────────────────────────────────
  function buildCollapsibleCard(type, cssClass, icon, title, content, isCollapsed) {
    const collapsedClass = isCollapsed ? 'collapsed' : '';
    const btnText = isCollapsed ? '▼ Mở rộng' : '▲ Thu gọn';
    return `
      <div class="card ${cssClass} ${collapsedClass}" id="card-${type}">
        <div class="card-header">
          <div class="card-header-title">
            <span class="card-header-icon">${icon}</span>
            ${title}
          </div>
          <button class="collapse-btn" data-action="collapse" data-card="${type}">${btnText}</button>
        </div>
        <div class="card-body">${content}</div>
      </div>
    `;
  }

  // ── Build question card ────────────────────────────────────
  function buildQuestionCard(room) {
    const optionsHTML = room.options.map(function (opt, i) {
      let classes = 'option-item';
      const isDisabled = state.disabledOptions.indexOf(i) !== -1;
      const isSelected = state.selectedAnswer === i;
      const isCorrectAnswer = i === room.correctAnswer;

      if (state.isCorrect) {
        // After correct answer
        classes += ' disabled';
        if (isCorrectAnswer) classes += ' correct';
      } else {
        if (isDisabled) {
          classes += ' disabled incorrect';
        } else if (isSelected) {
          classes += ' selected';
        }
      }

      const dataAttr = (state.isCorrect || isDisabled) ? '' : `data-option="${i}"`;
      return `
        <li class="${classes}" ${dataAttr}>
          <span class="option-letter">${LETTERS[i]}</span>
          <span class="option-text">${opt}</span>
        </li>
      `;
    }).join('');

    // Hint message
    let hintHTML = '';
    if (state.isAnswered && !state.isCorrect) {
      hintHTML = `
        <div class="hint-message incorrect">
          ❌ Chưa đúng! Hãy đọc lại lý thuyết và thử lại.
        </div>
      `;
    }

    // Check button
    const checkDisabled = state.selectedAnswer === null || state.isCorrect ? 'disabled' : '';

    return `
      <div class="card card-question">
        <div class="card-header">
          <div class="card-header-title">
            <span class="card-header-icon">🔑</span>
            Câu hỏi mở khóa
          </div>
        </div>
        <div class="card-body">
          <p class="question-text">${room.question}</p>
          <ul class="options-list">${optionsHTML}</ul>
          ${hintHTML}
          ${!state.isCorrect ? `
            <div class="btn-center">
              <button class="btn btn-check" data-action="check" ${checkDisabled}>
                🔍 Kiểm tra đáp án
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ── Build result card (correct) ────────────────────────────
  function buildResultCardCorrect(room) {
    const isLast = state.currentRoomIndex === ROOMS.length - 1;
    const nextBtnText = isLast ? '🏆 Xem kết quả' : '→ Sang phòng tiếp theo';
    return `
      <div class="card card-result correct">
        <div class="card-header">
          <div class="card-header-title">
            <span class="card-header-icon">✅</span>
            Chính xác!
          </div>
        </div>
        <div class="card-body">
          <p>${room.explanation}</p>
          <div class="btn-center mt-2">
            <button class="btn btn-success btn-large" data-action="next">
              ${nextBtnText}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ── Select answer ──────────────────────────────────────────
  function selectAnswer(index) {
    if (state.isCorrect) return;
    if (state.disabledOptions.indexOf(index) !== -1) return;

    state.selectedAnswer = index;
    state.isAnswered = false;
    renderRoom();
  }

  // ── Check answer ───────────────────────────────────────────
  function checkAnswer() {
    if (state.selectedAnswer === null) return;
    if (state.isCorrect) return;

    const room = ROOMS[state.currentRoomIndex];
    state.attempts[state.currentRoomIndex]++;
    state.isAnswered = true;

    if (state.selectedAnswer === room.correctAnswer) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  }

  function handleCorrect() {
    state.isCorrect = true;
    // Score only if first attempt
    if (state.attempts[state.currentRoomIndex] === 1) {
      state.score++;
    }
    renderRoom();
    // Scroll to result card
    setTimeout(function () {
      const resultCard = document.querySelector('.card-result');
      if (resultCard) {
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  function handleIncorrect() {
    // Disable the wrong option
    if (state.disabledOptions.indexOf(state.selectedAnswer) === -1) {
      state.disabledOptions.push(state.selectedAnswer);
    }
    state.selectedAnswer = null;
    renderRoom();
  }

  // ── Next room ──────────────────────────────────────────────
  function nextRoom() {
    if (state.currentRoomIndex >= ROOMS.length - 1) {
      goToEnding();
      return;
    }
    state.currentRoomIndex++;
    resetRoomState();
    render();
    scrollToTop();
  }

  // ── Go to ending ───────────────────────────────────────────
  function goToEnding() {
    state.currentScreen = 'ending';
    state.completed = true;
    render();
    scrollToTop();
  }

  // ── Start game ─────────────────────────────────────────────
  function startGame() {
    state.currentScreen = 'room';
    state.currentRoomIndex = 0;
    resetRoomState();
    render();
    scrollToTop();
  }

  // ── Reset game ─────────────────────────────────────────────
  function resetGame() {
    state.currentScreen = 'intro';
    state.currentRoomIndex = 0;
    state.score = 0;
    state.attempts = Array(10).fill(0);
    state.completed = false;
    resetRoomState();
    render();
    scrollToTop();
  }

  // ── Reset room-level state ─────────────────────────────────
  function resetRoomState() {
    state.selectedAnswer = null;
    state.isAnswered = false;
    state.isCorrect = false;
    state.disabledOptions = [];
    state.collapsedCards = { theory: false, case: false };
  }

  // ── Collapse / Expand ──────────────────────────────────────
  function toggleCollapse(cardType) {
    if (cardType === 'theory' || cardType === 'case') {
      state.collapsedCards[cardType] = !state.collapsedCards[cardType];
      const card = document.getElementById('card-' + cardType);
      if (card) {
        card.classList.toggle('collapsed');
        const btn = card.querySelector('.collapse-btn');
        if (btn) {
          btn.textContent = state.collapsedCards[cardType] ? '▼ Mở rộng' : '▲ Thu gọn';
        }
      }
    }
  }

  // ── Presentation Mode ──────────────────────────────────────
  function togglePresentationMode() {
    state.isPresentationMode = !state.isPresentationMode;
    document.body.classList.toggle('presentation-mode', state.isPresentationMode);
    const btn = presToggle();
    if (btn) {
      btn.classList.toggle('active', state.isPresentationMode);
      btn.title = state.isPresentationMode ? 'Tắt chế độ thuyết trình' : 'Chế độ thuyết trình';
    }
    try {
      localStorage.setItem('escaperoom-presentation', state.isPresentationMode ? '1' : '0');
    } catch (e) { /* ignore */ }

    // Adjust particle count
    adjustParticles();
  }

  function loadPresentationMode() {
    try {
      const saved = localStorage.getItem('escaperoom-presentation');
      if (saved === '1') {
        state.isPresentationMode = true;
        document.body.classList.add('presentation-mode');
        const btn = presToggle();
        if (btn) {
          btn.classList.add('active');
          btn.title = 'Tắt chế độ thuyết trình';
        }
      }
    } catch (e) { /* ignore */ }
  }

  // ── Render: Ending ─────────────────────────────────────────
  function renderEnding() {
    const d = ENDING_DATA;
    endingScreen().innerHTML = `
      <div class="container" style="max-width:700px;">
        <div class="ending-trophy">🏆</div>
        <h1 class="ending-title">${d.title}</h1>
        <div class="ending-score">
          <div class="ending-score-number">${state.score}/${ROOMS.length}</div>
          <div class="ending-score-label">câu đúng ngay lần đầu</div>
        </div>
        <div class="ending-content">
          ${d.description}
          <div class="formula-display">${d.formula}</div>
          ${d.analysis}
        </div>
        <div class="ending-conclusion">
          ${d.conclusion}
        </div>
        <div class="btn-center">
          <button class="btn btn-restart btn-large" data-action="restart">
            🔄 Chơi lại
          </button>
        </div>
      </div>
    `;
  }

  // ── Scroll ─────────────────────────────────────────────────
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Particles ──────────────────────────────────────────────
  let particles = [];
  let canvas, ctx;
  let animationId;
  const BASE_PARTICLE_COUNT = 50;
  const PRES_PARTICLE_COUNT = 20;

  function initParticles() {
    canvas = document.getElementById('particles');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    createParticles();
    animateParticles();
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getParticleCount() {
    return state.isPresentationMode ? PRES_PARTICLE_COUNT : BASE_PARTICLE_COUNT;
  }

  function createParticles() {
    const count = getParticleCount();
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * (canvas ? canvas.width : window.innerWidth),
        y: Math.random() * (canvas ? canvas.height : window.innerHeight),
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  function adjustParticles() {
    createParticles();
  }

  function animateParticles() {
    if (!ctx || !canvas) return;
    if (document.hidden) {
      animationId = requestAnimationFrame(animateParticles);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;

      // Bounce at edges
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
      ctx.fill();
    }

    animationId = requestAnimationFrame(animateParticles);
  }

  // ── Start ──────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
