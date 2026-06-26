// ============================================================
// Split module for Escape Room: Giai cuu Alpha Corp.
// Loaded by index.html in order; no build step required.
// ============================================================

'use strict';

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


// ── Select answer ──────────────────────────────────────────
function selectAnswer(index) {
  if (state.isCorrect) return;
  if (state.disabledOptions.indexOf(index) !== -1) return;

  state.selectedAnswer = index;
  state.isAnswered = false;

  // Direct DOM update instead of full renderRoom() to prevent screen jittering
  const options = document.querySelectorAll('.options-list .option-item');
  options.forEach(function (opt, i) {
    if (i === index) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });

  // Enable the Check Answer button
  const checkBtn = document.querySelector('button[data-action="check"]');
  if (checkBtn) {
    checkBtn.removeAttribute('disabled');
  }

  // Remove the previous hint message if present
  const hintEl = document.querySelector('.hint-message');
  if (hintEl) {
    hintEl.remove();
  }
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
  const selectedIdx = state.selectedAnswer;
  if (selectedIdx === null) return;

  // Disable the wrong option in state
  if (state.disabledOptions.indexOf(selectedIdx) === -1) {
    state.disabledOptions.push(selectedIdx);
  }
  state.selectedAnswer = null;

  // Update selected option in DOM
  const selectedOpt = document.querySelector(`.options-list .option-item[data-option="${selectedIdx}"]`);
  if (selectedOpt) {
    selectedOpt.classList.remove('selected');
    selectedOpt.classList.add('disabled', 'incorrect');
    selectedOpt.removeAttribute('data-option');
  }

  // Disable the Check Answer button
  const checkBtn = document.querySelector('button[data-action="check"]');
  if (checkBtn) {
    checkBtn.setAttribute('disabled', 'true');
  }

  // Create and append the hint message in DOM
  let hintEl = document.querySelector('.hint-message');
  if (!hintEl) {
    const listEl = document.querySelector('.options-list');
    if (listEl) {
      hintEl = document.createElement('div');
      hintEl.className = 'hint-message incorrect';
      hintEl.innerHTML = '<i data-lucide="alert-circle" class="icon-inline"></i> Chưa đúng! Hãy đọc lại lý thuyết và thử lại.';
      listEl.parentNode.insertBefore(hintEl, listEl.nextSibling);
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }
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


// ── Scroll ─────────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
