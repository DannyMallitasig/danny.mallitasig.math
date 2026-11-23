/**
 * Main Application Logic for Danny Mallitasig's Academic Homepage
 * Manages: Multilingual Rendering (ES, EN, FR), Formal Themes,
 * Publications Filtering, BibTeX Modal, KaTeX Typography, and Verified Links.
 */

class AcademicApp {
  constructor() {
    this.currentLang = localStorage.getItem('dm_academic_lang') || 'es';
    this.activeFilter = 'all';
    this.visualizer = null;
    
    this.initTheme();
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindEvents();
      this.setLanguage(this.currentLang);
      this.updateThemeIcons(document.documentElement.classList.contains('dark'));
      
      // Initialize formal visualizer
      if (window.MultifractalVisualizer) {
        this.visualizer = new window.MultifractalVisualizer();
      }

      this.renderMath();
    });
  }

  /* -------------------------------------------------------------
     Formal Theme Management
  ------------------------------------------------------------- */
  initTheme() {
    const savedTheme = localStorage.getItem('dm_academic_theme');
    // Default to clean formal light theme as requested
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('dm_academic_theme', isDark ? 'dark' : 'light');
    
    this.updateThemeIcons(isDark);

    if (this.visualizer) {
      this.visualizer.render();
    }
  }

  updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    sunIcons.forEach(el => el.classList.toggle('hidden', !isDark));
    moonIcons.forEach(el => el.classList.toggle('hidden', isDark));
  }

  /* -------------------------------------------------------------
     Internationalization & Dynamic Rendering
  ------------------------------------------------------------- */
  setLanguage(lang) {
    if (!translations[lang]) lang = 'es';
    this.currentLang = lang;
    localStorage.setItem('dm_academic_lang', lang);

    const t = translations[lang];

    // Static text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const path = el.getAttribute('data-i18n').split('.');
      let val = t;
      for (const p of path) {
        if (val) val = val[p];
      }
      if (val !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.setAttribute('placeholder', val);
        } else {
          el.innerHTML = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-aria-label], [data-i18n-title]').forEach(el => {
      const attribute = el.hasAttribute('data-i18n-aria-label') ? 'aria-label' : 'title';
      const key = el.getAttribute(`data-i18n-${attribute}`);
      const path = key.split('.');
      let val = t;
      for (const p of path) {
        if (val) val = val[p];
      }
      if (val !== undefined) el.setAttribute(attribute, val);
    });

    // Update language buttons styling
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('bg-white', 'text-slate-900', 'font-bold', 'shadow-sm');
        btn.classList.remove('text-slate-300', 'hover:text-white');
      } else {
        btn.classList.remove('bg-white', 'text-slate-900', 'font-bold', 'shadow-sm');
        btn.classList.add('text-slate-300', 'hover:text-white');
      }
    });

    // Re-render dynamic sections
    this.renderPublications();
    this.renderTalks();
    this.renderTeaching();
    this.renderTimeline();
    this.renderQuickFacts();
    this.sanitizeStaticAffiliations();

    // KaTeX formula rendering
    this.renderMath();
  }

  renderQuickFacts() {
    const container = document.getElementById('factsList');
    if (!container) return;
    const t = translations[this.currentLang].about;

    container.innerHTML = t.facts.map(fact => `
      <li class="flex items-start justify-between py-2 border-b border-slate-200 dark:border-slate-800 text-xs">
        <span class="text-slate-600 dark:text-slate-400 font-semibold">${fact.label}</span>
        <span class="text-slate-900 dark:text-slate-100 font-medium text-right max-w-[65%]">${fact.val}</span>
      </li>
    `).join('');
  }

  sanitizeStaticAffiliations() {
    const idpLink = document.querySelector('a[href="https://www.idpoisson.fr/"]');
    if (!idpLink) return;
    const row = idpLink.closest('p');
    if (!row) return;
    const label = translations[this.currentLang].hero.institutionLabel || 'Institution:';
    row.innerHTML = `<span class="font-bold text-slate-800 dark:text-slate-200 min-w-[90px]">${label}</span><span><a href="https://www.u-pec.fr/" target="_blank" rel="noopener noreferrer" class="text-blue-900 dark:text-blue-400 hover:underline">Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)</a></span>`;
  }

  renderPublications() {
    const container = document.getElementById('publicationsList');
    if (!container) return;
    const t = translations[this.currentLang].publications;
    
    const filtered = this.activeFilter === 'all' 
      ? t.items 
      : t.items.filter(item => item.type === this.activeFilter);

    document.querySelectorAll('.pub-filter-btn').forEach(btn => {
      const filter = btn.getAttribute('data-filter');
      const available = filter === 'all' || t.items.some(item => item.type === filter);
      btn.classList.toggle('hidden', !available);
    });

    const badgeLabels = t.badges || { thesis: 'Academic thesis', preprint: 'Preprint / research', pedagogy: 'AMARUN teaching monograph' };
    const typeBadges = {
      thesis: { label: badgeLabels.thesis, class: 'border-amber-600/40 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40' },
      preprint: { label: badgeLabels.preprint, class: 'border-blue-700/40 text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40' },
      pedagogy: { label: badgeLabels.pedagogy, class: 'border-red-700/40 text-red-900 dark:text-red-300 bg-red-50 dark:bg-red-950/40' }
    };

    container.innerHTML = filtered.map(pub => {
      const badge = typeBadges[pub.type] || { label: pub.type, class: 'border-slate-300 text-slate-700' };
      const citation = pub.citation || `${pub.authors}. ${pub.title}. ${pub.venue}, ${pub.year}.`;

      return `
        <article class="academic-card p-5 md:p-6" data-type="${pub.type}">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                ${pub.type !== 'preprint' ? `<span class="academic-badge ${badge.class}">
                  <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
                  ${badge.label}
                </span>` : ''}
              </div>
              <p class="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                ${citation}
              </p>
              ${pub.awardNote ? `<p class="mt-2 text-xs text-amber-800 dark:text-amber-300"><strong>${pub.awardNote.label}</strong> <a href="${pub.awardNote.url}" target="_blank" rel="noopener noreferrer" class="font-semibold italic underline hover:no-underline">${pub.awardNote.linkText}</a>.</p>` : ''}
            </div>
            ${pub.officialUrl ? `
              <a href="${pub.officialUrl}" target="_blank" rel="noopener noreferrer" class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                <span>${t.viewOfficial}</span>
              </a>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  localizeEnglishTalk(talk) {
    const replacements = [
      ['B&eacute;lgica', 'Belgium'],
      ['Hungr&iacute;a', 'Hungary'],
      ['Francia', 'France'],
      ['Polonia', 'Poland'],
      ['Reino Unido', 'United Kingdom'],
      ['Par&iacute;s', 'Paris'],
      ['Varsovia', 'Warsaw'],
      ['Isla de Porquerolles', 'Porquerolles Island'],
      ['Cada seis semanas', 'Every six weeks'],
      ['Mensual', 'Monthly']
    ];
    const localize = value => replacements.reduce((result, [from, to]) => result.replaceAll(from, to), value);
    return { ...talk, place: localize(talk.place), date: localize(talk.date) };
  }

  renderTalks() {
    const container = document.getElementById('talksList');
    if (!container) return;
    const t = translations[this.currentLang].talks;

    const talkItems = t.items.map(talk => this.currentLang === 'en' ? this.localizeEnglishTalk(talk) : talk);
    container.innerHTML = talkItems.map(talk => `
      <div class="academic-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="academic-badge bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              ${talk.role}
            </span>
            <span class="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">${talk.date}</span>
          </div>
          <h4 class="text-base md:text-lg font-bold font-serif text-slate-900 dark:text-white">
            ${talk.title}
          </h4>
          <p class="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-red-700"></i> ${talk.place}
          </p>
        </div>
        ${talk.link ? `<div class="shrink-0">
          <a href="${talk.link}" target="_blank" rel="noopener noreferrer" class="w-full md:w-auto px-3.5 py-2 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors">
            <i data-lucide="external-link" class="w-3.5 h-3.5 text-blue-700"></i>
            <span>${translations[this.currentLang].ui.officialSite}</span>
          </a>
        </div>` : ''}
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderTeaching() {
    const coursesContainer = document.getElementById('coursesList');
    const outreachContainer = document.getElementById('outreachList');
    if (!coursesContainer || !outreachContainer) return;
    const t = translations[this.currentLang].teaching;

    coursesContainer.innerHTML = t.courses.map(c => `
      <div class="academic-card p-5 space-y-1.5">
        <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span class="font-semibold text-blue-900 dark:text-blue-400">${c.institution}</span>
          <span class="font-mono">${c.period}</span>
        </div>
        <h4 class="text-base font-bold font-serif text-slate-900 dark:text-slate-100">${c.name}</h4>
      </div>
    `).join('');

    outreachContainer.innerHTML = t.outreach.map(o => `
      <div class="academic-card p-5 space-y-2">
        <div class="flex items-center justify-between">
          <span class="academic-badge bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800">
            ${o.role}
          </span>
          ${o.link ? `
            <a href="${o.link}" target="_blank" rel="noopener noreferrer" class="text-xs text-blue-800 dark:text-blue-400 hover:underline flex items-center gap-1">
              <span>${translations[this.currentLang].ui.website}</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          ` : ''}
        </div>
        <h4 class="text-base font-bold font-serif text-slate-900 dark:text-slate-100">${o.name}</h4>
      </div>
    `).join('');
  }

  renderTimeline() {
    const container = document.getElementById('timelineList');
    if (!container) return;
    const t = translations[this.currentLang].cvSection;

    container.innerHTML = t.timeline.map((item, idx) => `
      <div class="relative pl-7 pb-7 ${idx === t.timeline.length - 1 ? '' : 'border-l-2 border-slate-300 dark:border-slate-700'}">
        <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-blue-900 dark:bg-blue-400 ring-4 ring-white dark:ring-slate-900"></div>
        <div class="text-xs font-mono font-bold text-blue-900 dark:text-blue-400 mb-1">${item.year}</div>
        <h4 class="text-base font-bold font-serif text-slate-900 dark:text-slate-100">${item.title}</h4>
        <div class="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">${item.institution}</div>
        <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${item.detail}</p>
      </div>
    `).join('');
  }

  /* -------------------------------------------------------------
     KaTeX Math Renderer
  ------------------------------------------------------------- */
  renderMath() {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }
  }

  /* -------------------------------------------------------------
     Interactivity: BibTeX, Abstracts, Toasts
  ------------------------------------------------------------- */
  toggleAbstract(id) {
    const el = document.getElementById(`abstract-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    if (!el) return;
    const isHidden = el.classList.toggle('hidden');
    if (arrow) {
      arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(90deg)';
    }
    if (!isHidden) this.renderMath();
  }

  filterPublications(type) {
    this.activeFilter = type;
    document.querySelectorAll('.pub-filter-btn').forEach(btn => {
      const f = btn.getAttribute('data-filter');
      if (f === type) {
        btn.classList.add('bg-blue-950', 'text-white', 'dark:bg-white', 'dark:text-blue-950', 'font-bold');
        btn.classList.remove('bg-white', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
      } else {
        btn.classList.remove('bg-blue-950', 'text-white', 'dark:bg-white', 'dark:text-blue-950', 'font-bold');
        btn.classList.add('bg-white', 'text-slate-700', 'dark:bg-slate-800', 'dark:text-slate-300');
      }
    });
    this.renderPublications();
    this.renderMath();
  }

  openBibtex(id) {
    const t = translations[this.currentLang].publications;
    const pub = t.items.find(item => item.id === id);
    if (!pub) return;

    const modal = document.getElementById('bibtexModal');
    const content = document.getElementById('bibtexCode');
    if (!modal || !content) return;

    content.textContent = pub.bibtex;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  closeBibtex() {
    const modal = document.getElementById('bibtexModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  copyCurrentBibtex() {
    const content = document.getElementById('bibtexCode');
    if (!content) return;
    this.copyToClipboard(content.textContent, translations[this.currentLang].ui.bibtexCopied);
  }

  copyEmail() {
    const email = "danny.mallitasig@u-pec.fr";
    const msg = translations[this.currentLang].hero.emailCopied || translations[this.currentLang].ui.emailCopied;
    this.copyToClipboard(email, msg);
  }

  copyToClipboard(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(msg);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      this.showToast(msg);
    });
  }

  showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const t = translations[this.currentLang].contact;
    const subject = form.subject.value || t.defaultSubject;
    const message = form.message.value;

    const mailtoUrl = `mailto:danny.mallitasig@u-pec.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(t.mailFrom + ": " + name + " <" + email + ">\n\n" + message)}`;
    window.location.href = mailtoUrl;

    this.showToast(t.successMsg || t.draftFallback);
    form.reset();
  }

  bindEvents() {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.getAttribute('data-lang'));
      });
    });

    document.querySelectorAll('.pub-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterPublications(btn.getAttribute('data-filter'));
      });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }

    const modal = document.getElementById('bibtexModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeBibtex();
      });
    }
  }
}

const app = new AcademicApp();
window.app = app;
