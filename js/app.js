import { toastData } from './toastData.js';
import { audioEngine } from './audio.js';

const state = {
  currentToastIndex: 0,
  activeTab: 'canon',
  savedToasts: JSON.parse(localStorage.getItem('tamada_saved_toasts') || '[]'),
  isPanduriActive: false
};

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

function renderApp() {
  const app = document.getElementById('app');
  const toast = toastData.canonicalToasts[state.currentToastIndex];

  app.innerHTML = `
    <!-- Header -->
    <header class="navbar">
      <div class="container navbar-inner">
        <div class="brand">
          <div class="brand-icon">🍷</div>
          <div>
            <div class="brand-title">${toastData.info.title}</div>
            <div class="brand-subtitle">${toastData.info.titleGe}</div>
          </div>
        </div>

        <div class="nav-buttons">
          <button class="btn btn-gold" id="btn-open-generator">
            ✨ Speech Generator
          </button>
          <button class="btn btn-primary" id="btn-open-custom">
            ✍️ Add Custom Toast
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <!-- Hero -->
      <section class="hero">
        <h1 class="hero-title">Master the Art of the <span>"Supra"</span></h1>
        <p class="hero-desc">${toastData.info.intro}</p>

        <!-- Interactive Soundboard -->
        <div class="soundboard">
          <button class="sound-btn" id="btn-clink">🥂 Glass Clink</button>
          <button class="sound-btn" id="btn-fanfare">📯 Horn Fanfare</button>
          <button class="sound-btn" id="btn-cheer">🍷 "Gaumarjos!" Chord</button>
          <button class="sound-btn ${state.isPanduriActive ? 'active' : ''}" id="btn-panduri">
            🎶 ${state.isPanduriActive ? 'Stop Panduri Melody' : 'Play Panduri Melody'}
          </button>
        </div>
      </section>

      <!-- Navigation Tabs -->
      <div class="tabs-header">
        <button class="tab-link ${state.activeTab === 'canon' ? 'active' : ''}" data-tab="canon">
          📜 Canonical Toasts (${toastData.canonicalToasts.length})
        </button>
        <button class="tab-link ${state.activeTab === 'etiquette' ? 'active' : ''}" data-tab="etiquette">
          📖 Etiquette & Rules
        </button>
        <button class="tab-link ${state.activeTab === 'saved' ? 'active' : ''}" data-tab="saved">
          ⭐ Saved Vault (${state.savedToasts.length})
        </button>
      </div>

      <!-- Tab Content: Canonical Toasts -->
      ${state.activeTab === 'canon' ? `
        <div class="toast-navigator">
          <div class="toast-nav-header">
            <div>
              <span class="toast-number-badge">Toast ${state.currentToastIndex + 1} of ${toastData.canonicalToasts.length}</span>
              <h2 class="toast-card-title">${toast.title}</h2>
              <div style="font-family: var(--font-georgian); color: var(--color-gold); font-size: 1.1rem; margin-top: 0.2rem;">${toast.titleGe}</div>
            </div>

            <div class="toast-nav-controls">
              <button class="nav-arrow" id="btn-prev-toast" title="Previous Toast">←</button>
              <button class="nav-arrow" id="btn-next-toast" title="Next Toast">→</button>
            </div>
          </div>

          <div class="toast-nav-body">
            <div class="georgian-text-box">
              <div class="georgian-script">"${toast.georgianText}"</div>
              <div class="phonetic-guide">🗣️ Pronunciation: ${toast.phoneticGuide}</div>
            </div>

            <div class="english-translation">
              <strong>English Translation:</strong><br>
              "${toast.englishText}"
            </div>

            <div class="cultural-note">
              <div style="font-size: 1.5rem;">📜</div>
              <div>
                <strong style="color: var(--color-wine);">Cultural Meaning & Protocol:</strong><br>
                ${toast.culturalMeaning}
              </div>
            </div>

            <div class="toast-footer-meta">
              <div class="meta-box">
                <h5>Traditional Table Response</h5>
                <p>${toast.traditionalResponse}</p>
              </div>
              <div class="meta-box">
                <h5>Recommended Choral Song</h5>
                <p>🎵 ${toast.suggestedSong}</p>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
              <button class="btn btn-primary" onclick="window.appPlayToastAudio()">
                🔊 Speak Toast & Toast Response
              </button>
              <button class="btn btn-secondary" onclick="window.appCopyToast('${toast.id}')">
                📋 Copy Toast Text
              </button>
              <button class="btn btn-secondary" onclick="window.appSaveToast('${toast.id}')">
                ⭐ Save to Vault
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Tab Content: Etiquette & Rules -->
      ${state.activeTab === 'etiquette' ? `
        <div class="etiquette-grid">
          ${toastData.etiquetteRules.map(rule => `
            <div class="rule-card">
              <div class="rule-number">${rule.titleGe}</div>
              <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--color-wine);">${rule.title}</h3>
              <p style="color: var(--color-text-muted);">${rule.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Tab Content: Saved Toasts Vault -->
      ${state.activeTab === 'saved' ? `
        <div>
          ${state.savedToasts.length === 0 ? `
            <div style="text-align: center; padding: 4rem 1rem; background: var(--color-surface); border-radius: var(--radius-lg);">
              <div style="font-size: 3rem; margin-bottom: 1rem;">📜</div>
              <h3>Your Saved Vault is Empty</h3>
              <p style="color: var(--color-text-muted); margin-top: 0.5rem;">Save your favorite canonical toasts or generated speeches here for quick access at the Supra!</p>
            </div>
          ` : `
            <div class="etiquette-grid">
              ${state.savedToasts.map(saved => `
                <div class="rule-card">
                  <h3 style="font-size: 1.2rem; color: var(--color-wine); margin-bottom: 0.4rem;">${saved.title}</h3>
                  <div style="font-family: var(--font-georgian); color: var(--color-terracotta); font-size: 1rem; margin-bottom: 1rem;">${saved.georgianText}</div>
                  <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1rem;">${saved.englishText}</p>
                  <button class="btn btn-secondary" onclick="window.appRemoveSavedToast('${saved.id}')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                    🗑️ Remove
                  </button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      ` : ''}
    </main>

    <!-- Modal Container -->
    <div id="modal-container"></div>
    <div id="toast-container"></div>
  `;

  attachEventListeners();
}

function attachEventListeners() {
  // Navigation controls
  document.getElementById('btn-prev-toast')?.addEventListener('click', () => {
    state.currentToastIndex = (state.currentToastIndex - 1 + toastData.canonicalToasts.length) % toastData.canonicalToasts.length;
    renderApp();
  });

  document.getElementById('btn-next-toast')?.addEventListener('click', () => {
    state.currentToastIndex = (state.currentToastIndex + 1) % toastData.canonicalToasts.length;
    renderApp();
  });

  // Soundboard events
  document.getElementById('btn-clink')?.addEventListener('click', () => {
    audioEngine.playGlassClink();
  });

  document.getElementById('btn-fanfare')?.addEventListener('click', () => {
    audioEngine.playHornFanfare();
  });

  document.getElementById('btn-cheer')?.addEventListener('click', () => {
    audioEngine.playGaumarjosChord();
  });

  document.getElementById('btn-panduri')?.addEventListener('click', () => {
    audioEngine.togglePanduriAmbiance((active) => {
      state.isPanduriActive = active;
      renderApp();
    });
  });

  // Tabs switching
  document.querySelectorAll('.tab-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.activeTab = e.target.dataset.tab;
      renderApp();
    });
  });

  // Open Toast Generator
  document.getElementById('btn-open-generator')?.addEventListener('click', () => {
    window.appOpenGeneratorModal();
  });

  // Open Custom Toast Creator
  document.getElementById('btn-open-custom')?.addEventListener('click', () => {
    window.appOpenCustomToastModal();
  });
}

/* Global Expose Actions */
window.appPlayToastAudio = function() {
  audioEngine.playGlassClink();
  setTimeout(() => audioEngine.playGaumarjosChord(), 500);
  showToast("🍷 Gaumarjos! Toast sound effects triggered.");
};

window.appCopyToast = function(toastId) {
  const toast = toastData.canonicalToasts.find(t => t.id === Number(toastId));
  if (!toast) return;

  const textToCopy = `${toast.titleGe}\n${toast.georgianText}\n\nEnglish: ${toast.englishText}`;
  navigator.clipboard.writeText(textToCopy);
  showToast("📋 Toast copied to clipboard!");
};

window.appSaveToast = function(toastId) {
  const toast = toastData.canonicalToasts.find(t => t.id === Number(toastId));
  if (!toast) return;

  if (!state.savedToasts.some(s => s.id === toast.id)) {
    state.savedToasts.push(toast);
    localStorage.setItem('tamada_saved_toasts', JSON.stringify(state.savedToasts));
    showToast("⭐ Toast saved to your vault!");
    renderApp();
  } else {
    showToast("ℹ️ Toast is already in your vault.");
  }
};

window.appRemoveSavedToast = function(toastId) {
  state.savedToasts = state.savedToasts.filter(s => String(s.id) !== String(toastId));
  localStorage.setItem('tamada_saved_toasts', JSON.stringify(state.savedToasts));
  renderApp();
  showToast("🗑️ Toast removed from vault.");
};

window.appOpenGeneratorModal = function() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-overlay active" id="gen-modal">
      <div class="modal-content">
        <button style="position: absolute; top: 1rem; right: 1rem; font-size: 1.2rem;" onclick="window.appCloseModal('gen-modal')">✕</button>
        <h2 style="margin-bottom: 1rem; color: var(--color-wine);">✨ Smart Toast Speech Generator</h2>
        
        <form onsubmit="window.appGenerateToastSpeech(event)">
          <div class="form-group">
            <label class="form-label">Occasion / Theme</label>
            <select class="form-control" id="gen-occasion">
              ${toastData.occasions.map(o => `<option value="${o.id}">${o.name}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Guest of Honor / Name (Optional)</label>
            <input type="text" class="form-control" id="gen-name" placeholder="e.g. Giorgi or Alex">
          </div>

          <button type="submit" class="btn btn-gold" style="width: 100%;">
            🍷 Generate Personalized Speech
          </button>
        </form>

        <div id="gen-result" style="margin-top: 1.5rem;"></div>
      </div>
    </div>
  `;
};

window.appGenerateToastSpeech = function(e) {
  e.preventDefault();
  const occasion = document.getElementById('gen-occasion').value;
  const name = document.getElementById('gen-name').value || "our honored guest";

  let speechGe = "";
  let speechEn = "";

  if (occasion === 'wedding') {
    speechGe = `დღევანდელი დღე არის სიყვარულისა და ახალი ოჯახის დაბადების ზეიმი! გაუმარჯოს ${name}-ს და მის რჩეულს. იარეთ სიყვარულით, ერთგულებითა და სიხარულით სავსე გზაზე!`;
    speechEn = `Today is a celebration of love and the birth of a new home! To ${name} and their partner. May your journey ahead be filled with eternal affection, fidelity, and joy!`;
  } else if (occasion === 'birthday') {
    speechGe = `დღეს ჩვენ შევიკრიბეთ, რათა მივულოცოთ დაბადების დღე ჩვენს ძვირფას ${name}-ს! ჯანმრთელობა, დიდხანს სიცოცხლე და ყოველი ჩანაფიქრის ასრულება. გაუმარჯოს!`;
    speechEn = `Today we gather to celebrate the birthday of our dear ${name}! May you enjoy abundant health, long life, and the fulfillment of every dream. To your day!`;
  } else {
    speechGe = `ეს სადღეგრძელო ეძღვნება ${name}-ს! გმადლობთ ამ თბილი შეხვედრისთვის, მეგობრობისთვის და იმ დაუვიწყარი წუთებისთვის, რასაც ერთად ვატარებთ. გაუმარჯოს!`;
    speechEn = `This toast is dedicated to ${name}! Thank you for your warmth, friendship, and the unforgettable moments we share together around this table. To you!`;
  }

  document.getElementById('gen-result').innerHTML = `
    <div class="georgian-text-box">
      <div class="georgian-script" style="font-size: 1.15rem;">"${speechGe}"</div>
      <p style="font-size: 0.95rem; color: var(--color-dark); margin-top: 0.75rem;">"${speechEn}"</p>
    </div>
    <button class="btn btn-primary" style="width: 100%;" onclick="navigator.clipboard.writeText('${speechGe} \\n ${speechEn}'); window.appShowToastMsg('Copied generated toast!');">
      📋 Copy Generated Speech
    </button>
  `;
};

window.appCloseModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.remove();
};

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.innerHTML = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

window.appShowToastMsg = showToast;
