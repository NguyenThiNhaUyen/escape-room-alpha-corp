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
            <i data-lucide="play" class="icon-inline"></i> ${d.buttonText}
          </button>
        </div>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── Render: Room ───────────────────────────────────────────
  function renderRoom() {
    const room = ROOMS[state.currentRoomIndex];
    const roomNum = state.currentRoomIndex + 1;

    // Header with minimap
    roomHeader().innerHTML = `
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-room-label"><i data-lucide="unlock" class="icon-inline"></i> Phòng ${roomNum}</span>
          <span class="progress-count">${roomNum} / ${ROOMS.length}</span>
        </div>
        ${buildMinimap()}
      </div>
      <div class="room-title-section">
        <h2 class="room-title">${room.title}</h2>
        <p class="room-objective">${room.objective}</p>
      </div>
    `;

    // Content cards
    let html = '';

    // Formula timeline — always visible
    html += buildFormulaTimeline(state.currentRoomIndex);

    // Theory card
    html += buildCollapsibleCard(
      'theory',
      'card-theory',
      'book-open',
      room.theoryTitle,
      room.theoryContent,
      state.collapsedCards.theory
    );

    // Case card
    html += buildCollapsibleCard(
      'case',
      'card-case',
      'building-2',
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
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── Build collapsible card ─────────────────────────────────
  function buildCollapsibleCard(type, cssClass, icon, title, content, isCollapsed) {
    const collapsedClass = isCollapsed ? 'collapsed' : '';
    const btnText = isCollapsed 
      ? '<i data-lucide="chevron-down" class="icon-inline"></i> Mở rộng' 
      : '<i data-lucide="chevron-up" class="icon-inline"></i> Thu gọn';
    const dossierLabel = (type === 'case') ? '<span class="dossier-label">Dossier</span>' : '';
    return `
      <div class="card ${cssClass} ${collapsedClass}" id="card-${type}">
        <div class="card-header">
          <div class="card-header-title">
            <span class="card-header-icon"><i data-lucide="${icon}"></i></span>
            ${title}${dossierLabel}
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
          <i data-lucide="alert-circle" class="icon-inline"></i> Chưa đúng! Hãy đọc lại lý thuyết và thử lại.
        </div>
      `;
    }

    // Check button
    const checkDisabled = state.selectedAnswer === null || state.isCorrect ? 'disabled' : '';

    return `
      <div class="card card-question">
        <div class="card-header">
          <div class="card-header-title">
            <span class="card-header-icon"><i data-lucide="key"></i></span>
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
                <i data-lucide="check-square" class="icon-inline"></i> Kiểm tra đáp án
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
    const nextBtnText = isLast 
      ? '<i data-lucide="trophy" class="icon-inline"></i> Xem kết quả' 
      : '<i data-lucide="unlock" class="icon-inline"></i> Mở khóa phòng tiếp theo';
    const roomLabel = 'Phòng ' + (state.currentRoomIndex + 1);
    return `
      <div class="card card-result correct">
        <div class="card-header">
          <div class="card-header-title">
            <span class="card-header-icon"><i data-lucide="check-circle-2"></i></span>
            Chính xác!
          </div>
        </div>
        <div class="card-body">
          <div class="key-acquired"><i data-lucide="key" class="icon-inline"></i> Key Acquired — ${roomLabel}</div>
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

  // ── Build minimap ─────────────────────────────────────────
  function buildMinimap() {
    var html = '<div class="minimap">';
    for (var i = 0; i < ROOMS.length; i++) {
      if (i > 0) {
        var connClass = (i <= state.currentRoomIndex) ? ' completed' : '';
        html += '<div class="minimap-connector' + connClass + '"></div>';
      }
      var nodeClass = 'minimap-node';
      if (i < state.currentRoomIndex) nodeClass += ' completed';
      else if (i === state.currentRoomIndex) nodeClass += ' current';
      else nodeClass += ' locked';
      html += '<div class="' + nodeClass + '">' + (i + 1) + '</div>';
    }
    html += '</div>';
    return html;
  }

  // ── Build formula timeline ────────────────────────────────
  function buildFormulaTimeline(roomIndex) {
    var segments = [
      { label: 'T',  type: 'step' },
      { label: '→',  type: 'arrow' },
      { label: 'H',  type: 'step' },
      { label: '…',  type: 'arrow' },
      { label: 'SX', type: 'step' },
      { label: '…',  type: 'arrow' },
      { label: "H'", type: 'step' },
      { label: '→',  type: 'arrow' },
      { label: "T'", type: 'step' }
    ];

    // Which indices are highlighted per room
    var activeMap = [
      [0,1,2],         // Room 1: T → H
      [0,1,2],         // Room 2: T → H
      [0,1,2,3,4],     // Room 3: T → H … SX
      [4],             // Room 4: SX
      [4],             // Room 5: SX
      [4,5,6],         // Room 6: SX … H'
      [6],             // Room 7: H'
      [6],             // Room 8: H'
      [6],             // Room 9: H'
      [6,7,8]          // Room 10: H' → T' (danger)
    ];

    var isDanger = (roomIndex === 9);
    var active = activeMap[roomIndex] || [];

    var html = '<div class="formula-timeline">';
    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      var isActive = active.indexOf(i) !== -1;
      if (seg.type === 'arrow') {
        var arrowCls = 'formula-timeline-arrow';
        if (isActive) arrowCls += isDanger ? ' danger' : ' active';
        html += '<span class="' + arrowCls + '">' + seg.label + '</span>';
      } else {
        var stepCls = 'formula-timeline-step';
        if (isActive) {
          stepCls += isDanger ? ' danger' : ' active';
        } else {
          stepCls += ' dim';
        }
        html += '<span class="' + stepCls + '">' + seg.label + '</span>';
      }
    }
    html += '</div>';
    return html;
  }

  // ── Play door transition (GSAP) ───────────────────────────
  function playDoorTransition(onDone) {
    var overlay = document.getElementById('door-transition');
    if (!overlay || typeof gsap === 'undefined') {
      onDone();
      return;
    }

    var isPres = state.isPresentationMode;
    var totalDur = isPres ? 0.65 : 1.1;

    overlay.classList.remove('hidden');

    var tl = gsap.timeline({
      onComplete: function () {
        overlay.classList.add('hidden');
        gsap.set([overlay, '.door-left', '.door-right', '.door-lock', '.lock-ring', '.lock-text'], { clearProps: 'all' });
        onDone();
      }
    });

    tl.set('.door-left', { xPercent: 0 })
      .set('.door-right', { xPercent: 0 })
      .set('.door-lock', { opacity: 0, scale: 0.6 })
      .set('.lock-text', { opacity: 0 })
      .to('.door-lock', {
        opacity: 1, scale: 1,
        duration: 0.2,
        ease: 'back.out(1.7)'
      }, 0.1)
      .to('.lock-ring', {
        rotation: 360,
        duration: isPres ? 0.3 : 0.5,
        ease: 'power2.inOut'
      }, 0.15)
      .to('.lock-text', {
        opacity: 1,
        duration: 0.15
      }, isPres ? 0.3 : 0.4)
      .to('.door-lock', {
        opacity: 0,
        duration: 0.12
      }, totalDur - 0.4)
      .to('.door-left', {
        xPercent: -100,
        duration: 0.4,
        ease: 'power3.in'
      }, totalDur - 0.4)
      .to('.door-right', {
        xPercent: 100,
        duration: 0.4,
        ease: 'power3.in'
      }, totalDur - 0.4);
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
    var isLast = state.currentRoomIndex >= ROOMS.length - 1;
    playDoorTransition(function () {
      if (isLast) {
        goToEnding();
        return;
      }
      state.currentRoomIndex++;
      resetRoomState();
      render();
      scrollToTop();
    });
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
        <div class="ending-trophy"><i data-lucide="trophy" style="width:64px;height:64px;color:var(--color-gold);"></i></div>
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
        <div class="diagnosis-panel">
          <div class="diagnosis-header"><i data-lucide="activity" class="icon-inline"></i> Diagnosis Report</div>
          <div class="diagnosis-row">
            <div class="diagnosis-label">Điểm mắc kẹt</div>
            <div class="diagnosis-value danger">H' → T'</div>
          </div>
          <div class="diagnosis-row">
            <div class="diagnosis-label">Nguyên nhân</div>
            <div class="diagnosis-value">Không bán được hàng hóa bất động sản</div>
          </div>
          <div class="diagnosis-row">
            <div class="diagnosis-label">Kết luận</div>
            <div class="diagnosis-value">Giá trị thặng dư chưa hiện thực hóa thành tiền</div>
          </div>
        </div>
        <div class="ending-conclusion">
          ${d.conclusion}
        </div>
        <div class="btn-center">
          <button class="btn btn-restart btn-large" data-action="restart">
            <i data-lucide="refresh-cw" class="icon-inline"></i> Chơi lại
          </button>
        </div>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
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
      ctx.fillStyle = `rgba(196, 154, 60, ${p.opacity})`;
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
