// ============================================================
// Split module for Escape Room: Giai cuu Alpha Corp.
// Loaded by index.html in order; no build step required.
// ============================================================

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
