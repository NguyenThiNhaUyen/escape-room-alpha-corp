// ============================================================
// app.js - Escape Room: Giai cuu Alpha Corp
// Bootstrap only. Feature logic lives in app-state/render/effects/game.
// ============================================================

'use strict';

function init() {
  loadPresentationMode();
  bindEvents();
  initParticles();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
