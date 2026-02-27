// ===================================================
// STATE
// ===================================================
const state = {
  thumbnails:[],
  currentColors: { c1: '#7c3aed', c2: '#db2777' },
  selectedTemplate: 0,
  selectedAspect: '16:9',
  selectedBgType: 'gradient',
  selectedDir: 'to right',
  selectedPattern: 'dots',
  selectedEffect: 'shadow',
  selectedBadge: 'NEW',
  selectedAlign: 'center',
  selectedFormat: 'image/jpeg',
  selectedIconCat: 'general',
  watermarkPos: 'bottom-right',
  stats: { generated: 0, downloaded: 0, session: 0 },
  liveDebounce: null
};

const CANVAS_SIZES = {
  '16:9':[1280, 720],
  '4:3': [1024, 768],
  '1:1': [720, 720],
  '9:16':[720, 1280],
  '21:9':[1260, 540]
};

// ===================================================
// COLOR PALETTES
// ===================================================
const PALETTES =[
  { name: 'Cosmic', c1: '#6e0dad', c2: '#2b0a4a' },
  { name: 'Ocean', c1: '#0077b6', c2: '#023e8a' },
  { name: 'Sunset', c1: '#e63946', c2: '#b5179e' },
  { name: 'Forest', c1: '#2d6a4f', c2: '#074f37' },
  { name: 'Gold', c1: '#b7791f', c2: '#744210' },
  { name: 'Cherry', c1: '#c62a47', c2: '#6b0f1a' },
  { name: 'Slate', c1: '#334155', c2: '#0f172a' },
  { name: 'Mint', c1: '#059669', c2: '#064e3b' },
  { name: 'Rose', c1: '#be185d', c2: '#831843' },
  { name: 'Ice', c1: '#0284c7', c2: '#164e63' },
  { name: 'Grape', c1: '#7c3aed', c2: '#4c1d95' },
  { name: 'Ember', c1: '#c2410c', c2: '#7c2d12' }
];

// ===================================================
// EDUCATIONAL & JOB ICONS — Full Subject Coverage
// ===================================================
const ICONS = {
  // Core Education
  general:['📚','✏️','🎓','📖','📝','💡','🔍','⭐','🌟','💫','📌','🔖','🏫','📋'],
  math:['∑','√','∞','π','∫','≈','≠','±','×','÷','∂','∇','∛','📐','📏','🔢','△'],
  science:['🔬','🧪','🔭','🧬','⚗️','🧲','⚛️','🌡️','💊','🧫','🌿','🔋','🌊'],
  physics:['⚡','🔋','💡','🌡️','🔭','⚛️','🧲','🎯','📡','🌊','🔩','⚙️','🔬'],
  chemistry:['🧪','⚗️','🔬','🧫','💊','🧴','🫧','🔥','💧','🌡️','⚗️','🧬','🧲'],
  biology:     ['🧬','🌿','🦠','🦋','🐝','🌱','🍃','🫀','🫁','🧠','🦴','🌺','🐢'],
  language:['🔤','✍️','🗣️','📖','✒️','🖋️','📓','📔','📕','💬','🗺️','🌐','📢'],
  history:['🏛️','📜','⚱️','🗿','🏺','⚔️','🛡️','📿','🔱','🏯','⛩️','🗡️','🏹','👑'],
  geography:['🌍','🗺️','🧭','⛰️','🌋','🏔️','🌊','🏝️','🌐','🧱','🌾','🌡️','🏙️'],
  tech:['💻','🖥️','⌨️','🖱️','📱','🔋','⚙️','🔌','📡','🤖','🖨️','💾','🛜'],
  engineering:['⚙️','🔧','🔩','🏗️','🔨','🛠️','🏭','⚡','📐','🔬','🌡️','🤖','🏎️'],
  arts:['🎨','🖌️','🖼️','✏️','🎭','🖍️','🎬','📷','🌈','💎','🪄','🎪','🎠'],
  music:['🎵','🎶','🎸','🎹','🎺','🎻','🥁','🎤','🎧','🎼','🎷','🪗','🎙️'],
  sports:['⚽','🏀','🏏','🏆','🥇','🏋️','🎯','🤸','🏊','⛹️','🥊','🚴','🏃'],
  religious:   ['📿','🕌','⛪','🕍','🛕','☪️','✝️','✡️','🙏','🕊️','📖','🌙','⭐'],
  // Higher Education
  medical:['🏥','💊','🩺','🩻','🩹','💉','🫀','🫁','🧬','🔬','🧪','🏨','⚕️'],
  dental:['🦷','🦴','😁','🩺','💊','🔬','🏥','🪥','😷','💉','🧴','🫧','✨'],
  nursing:['💉','🩺','🩹','🏥','💊','🫀','🩻','👩‍⚕️','🧤','🌡️','🩸','💧','❤️'],
  pharmacy:['💊','⚗️','🧪','🔬','🏥','💉','🧫','🌿','📋','🧴','⚕️','🫧','🌡️'],
  law:['⚖️','🏛️','📜','🔨','🪬','⚔️','🕊️','📋','🗂️','👨‍⚖️','📝','🔍','🏷️'],
  business:    ['📊','💼','📈','🤝','💰','🏢','📋','🎯','💹','🗂️','📌','📣','🏆'],
  economics:['💹','📊','📈','💰','🏦','🌐','⚖️','🏭','💼','🔄','📉','🤝','💡'],
  finance:['💰','🏦','💳','📈','💹','💼','🏛️','🤝','📊','🔐','💎','🪙','📉'],
  accounting:['🧾','💰','📊','🖩','💼','📋','📈','🏦','📌','✏️','🔍','📂','🗂️'],
  psychology:['🧠','💭','🪞','🛋️','❤️','🌀','👁️','🤝','🌈','💡','🔍','📖','🧩'],
  sociology:['👥','🌍','🤝','🏙️','📊','📚','🏛️','🗣️','💬','🌐','🔍','📋','👨‍👩‍👧'],
  journalism:['📰','📸','🎙️','📡','✏️','🖊️','📺','📻','🌐','🔍','📢','🗞️','🎬'],
  architecture:['🏗️','🏛️','📐','✏️','🔧','🏠','🌆','🏢','📋','🪟','🏰','🌉','🖼️'],
  agriculture:['🌾','🚜','🌱','🌿','🐄','🌽','🍅','🌻','💧','🌡️','🌍','🧪','🐝'],
  marine:['🚢','🌊','🐬','🦈','🐙','⚓','🔬','🌐','🧭','🪸','🐟','🗺️','🌡️'],
  textile:['🧵','👗','🧶','✂️','👔','🪡','🎨','💎','👒','🪢','🛍️','🌺','✨'],
  // Job Preparation
  bcs:['🏛️','📋','⚖️','🇧🇩','📝','💡','🎖️','🤝','🏆','📚','🔍','🗂️','👨‍💼'],
  'bank-job':['🏦','💰','💳','📊','🖩','💼','📋','🤝','💹','📈','🔐','📌','⚖️'],
  'govt-job':['🏛️','📋','📝','🇧🇩','💼','🎖️','⚖️','🏆','🤝','📌','🔍','📚','🗂️'],
  police:['🚔','🛡️','⚖️','🚨','👮','🔍','🏅','🦺','🔦','📋','🤝','🏛️','🚁'],
  teacher:['👨‍🏫','📚','✏️','🏫','📋','💡','🎓','⭐','📝','🌟','🤝','📖','🔍'],
  ngo:['🌱','🤝','❤️','🌍','💡','📋','🎗️','🕊️','💪','🏥','🌊','🌿','🌈'],
  'it-job':['💻','🖥️','🤖','⚙️','📱','🌐','🔐','🛜','💡','📡','🔧','🖨️','🗃️'],
  freelance:['💻','💸','🌐','⭐','🤝','📱','💼','🎯','📊','🏆','💡','🔗','✨'],
  interview:['🤝','💼','🎯','⭐','💡','📋','👔','🏢','📝','😊','🗣️','👁️','🏆'],
  cv:['📄','✏️','💼','🎯','⭐','📋','🔍','📌','🏆','💡','🤝','📊','🌟'],
  ielts:['🌐','📝','🎧','✏️','📚','🗣️','⏱️','🏆','⭐','📖','💡','🔍','✅'],
  gre:['📝','📚','🔢','💡','⏱️','🎯','🏆','⭐','🔍','✏️','🧠','📊','✅'],
  scholarship:['🎖️','🏆','⭐','🎓','💡','🌟','📋','✈️','🌍','💰','📝','🔍','🏅'],
  startup:['🚀','💡','📈','💰','🤝','⭐','🔥','💻','🎯','🌍','💪','🏆','🌟'],
  // Exam Types
  admission:['🎓','📝','🏫','✏️','📚','🔍','⭐','🏆','📋','💡','🌟','🎯','📖'],
  ssc:['📘','✏️','📝','🎓','🏫','📚','⭐','🏆','📋','💡','🌟','📐','✅'],
  hsc:['📗','✏️','📝','🎓','🏫','📚','⭐','🏆','📋','💡','🌟','📐','✅'],
  university:['🏛️','🎓','📚','✏️','📝','🔬','💡','⭐','🏆','📋','🌟','🔍','📖'],
  question:['❓','📝','✏️','📚','🔍','💡','📖','📋','⭐','🎯','🧩','💭','🔮'],
  suggestion:['💡','⭐','📝','✏️','📚','🔍','🎯','🏆','📋','🌟','💫','✅','🎖️'],
  routine:['📅','⏰','🗓️','📋','✅','🎯','⏱️','📝','💡','🔔','📌','🗂️','⚡'],
  result:['🏆','⭐','🥇','🎖️','🌟','💫','✅','🎓','🎉','📊','💯','🎊','🏅']
};

// ===================================================
// TEMPLATES
// ===================================================
const TEMPLATES =[
  { name: 'Classic', draw: drawClassic },
  { name: 'Split', draw: drawSplit },
  { name: 'Card', draw: drawCard },
  { name: 'Spotlight', draw: drawSpotlight },
  { name: 'Minimal', draw: drawMinimal },
  { name: 'Banner', draw: drawBanner }
];

// ===================================================
// INIT
// ===================================================
window.addEventListener('DOMContentLoaded', () => {
  buildPalettes();
  buildTemplates();
  initChips();
  initToggles();
  initLivePreview();
  updateLivePreview();
});

function initChips() {
  // Generic chip group handler
  document.querySelectorAll('.chip-group').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        handleChipChange(group.id, chip.dataset.val);
      });
    });
  });
}

function handleBadgeSelect(val) {
  state.selectedBadge = val;
  updateLivePreview();
}

function handleSelectChange(chipGroupId, val) {
  // Sync the hidden chip group state
  const group = document.getElementById(chipGroupId);
  if (group) {
    group.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('active', c.dataset.val === val);
    });
    // Update state directly
    if (chipGroupId === 'icon-cat-chips') {
      state.selectedIconCat = val;
      updateLivePreview();
    }
  }
}

function handleChipChange(groupId, val) {
  switch(groupId) {
    case 'aspect-chips': state.selectedAspect = val; updateLivePreview(); break;
    case 'bg-type-chips':
      state.selectedBgType = val;
      document.getElementById('gradient-dir-field').style.display = (val==='gradient'||val==='mesh') ? '' : 'none';
      document.getElementById('pattern-type-field').style.display = val==='pattern' ? '' : 'none';
      updateLivePreview(); break;
    case 'dir-chips': state.selectedDir = val; updateLivePreview(); break;
    case 'pattern-chips': state.selectedPattern = val; updateLivePreview(); break;
    case 'text-effect-chips': state.selectedEffect = val; updateLivePreview(); break;
    case 'badge-chips': state.selectedBadge = val; updateLivePreview(); break;
    case 'align-chips': state.selectedAlign = val; updateLivePreview(); break;
    case 'format-chips': state.selectedFormat = val; break;
    case 'icon-cat-chips': state.selectedIconCat = val; updateLivePreview(); break;
    case 'watermark-pos-chips': state.watermarkPos = val; updateLivePreview(); break;
  }
}

function initToggles() {
  const liveInputs =['font-size','text-color','color1','color2','quality','line-height','vignette','overlay-opacity'];
  liveInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', scheduleLiveUpdate);
  });

  const checkboxes =['noise-overlay','sparkles','show-icons','show-formulas','show-geo','show-progress','show-url','show-channel','random-each','uppercase-text'];
  checkboxes.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => {
      if (id === 'show-url') {
        document.getElementById('url-field').style.display = el.checked ? '' : 'none';
      }
      scheduleLiveUpdate();
    });
  });['font-family','text-input','subtitle-input','watermark-text','url-text','icon-cat-select','badge-select'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', scheduleLiveUpdate);
  });
}

function scheduleLiveUpdate() {
  clearTimeout(state.liveDebounce);
  state.liveDebounce = setTimeout(updateLivePreview, 150);
}

// ===================================================
// BUILD UI COMPONENTS
// ===================================================
function buildPalettes() {
  const grid = document.getElementById('palette-grid');
  PALETTES.forEach((p, i) => {
    const sw = document.createElement('div');
    sw.className = 'palette-swatch' + (i===0 ? ' active' : '');
    sw.style.background = `linear-gradient(135deg, ${p.c1}, ${p.c2})`;
    sw.innerHTML = `<span class="palette-name">${p.name}</span>`;
    sw.addEventListener('click', () => {
      document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      setColors(p.c1, p.c2);
    });
    grid.appendChild(sw);
  });
}

function buildTemplates() {
  const grid = document.getElementById('template-grid');
  TEMPLATES.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'template-card' + (i===0 ? ' active' : '');

    const miniCanvas = document.createElement('canvas');
    miniCanvas.width = 160; miniCanvas.height = 90;
    renderMiniTemplate(miniCanvas, i);
    card.appendChild(miniCanvas);

    const lbl = document.createElement('div');
    lbl.className = 'template-label';
    lbl.textContent = t.name;
    card.appendChild(lbl);

    card.addEventListener('click', () => {
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.selectedTemplate = i;
      updateLivePreview();
    });

    grid.appendChild(card);
  });
}

function renderMiniTemplate(canvas, idx) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const g = ctx.createLinearGradient(0,0,w,h);
  const colors = [
    ['#7c3aed','#db2777'],['#0077b6','#2d6a4f'],['#c62a47','#b7791f'], ['#334155','#0077b6'],['#059669','#7c3aed'],['#b5179e','#0077b6']
  ];
  const [c1,c2] = colors[idx % colors.length];
  g.addColorStop(0, c1); g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.fillRect(0,0,w,h);

  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = `bold ${h*0.18}px Poppins, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  switch(idx) {
    case 0: ctx.fillText('Title', w/2, h/2); break;
    case 1:
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(w*0.55,0,w*0.45,h);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Title', w*0.3, h/2); break;
    case 2:
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.roundRect(w*0.08, h*0.12, w*0.84, h*0.76, 8);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Title', w/2, h/2); break;
    case 3:
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.arc(w*0.75, h/2, h*0.55, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Title', w*0.35, h/2); break;
    case 4:
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = `bold ${h*0.14}px Poppins, sans-serif`;
      ctx.fillText('MINIMAL TITLE', w/2, h/2); break;
    case 5:
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(0, h*0.55, w, h*0.45);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Banner', w/2, h*0.32);
      ctx.font = `${h*0.12}px sans-serif`;
      ctx.fillText('Subtitle text here', w/2, h*0.75); break;
  }
}

// ===================================================
// COLOR HELPERS
// ===================================================
function setColors(c1, c2) {
  state.currentColors = { c1, c2 };
  document.getElementById('color1').value = c1;
  document.getElementById('color2').value = c2;
  document.getElementById('color1-hex').textContent = c1;
  document.getElementById('color2-hex').textContent = c2;
  updateLivePreview();
}

function updateColorHex(id) {
  const val = document.getElementById(id).value;
  document.getElementById(id + '-hex').textContent = val;
  if (id === 'color1') state.currentColors.c1 = val;
  if (id === 'color2') state.currentColors.c2 = val;
  scheduleLiveUpdate();
}

function randomizeGradient() {
  const h1 = Math.random()*360;
  const h2 = (h1 + 30 + Math.random()*80) % 360;
  const c1 = hslToHex(h1, 55, 30);
  const c2 = hslToHex(h2, 50, 15);
  setColors(c1, c2);
  toast('🎨 New gradient!', 'success');
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function updateRange(el, labelId, suffix) {
  const val = parseFloat(el.value).toFixed(suffix==='' ? 2 : 0);
  document.getElementById(labelId).textContent = val + suffix;
  const dispId = labelId.replace('-val','-disp');
  const disp = document.getElementById(dispId);
  if (disp) disp.textContent = val;
  scheduleLiveUpdate();
}

// ===================================================
// CANVAS RENDERING
// ===================================================
function getOpts() {
  const [w, h] = CANVAS_SIZES[state.selectedAspect] ||[1280,720];
  return {
    w, h,
    text: (document.getElementById('text-input').value.split('\n')[0] || 'Your Title').trim(),
    subtitle: document.getElementById('subtitle-input').value.trim(),
    badge: document.getElementById('badge-select')?.value ?? state.selectedBadge,
    font: document.getElementById('font-family').value,
    fontSize: parseInt(document.getElementById('font-size').value),
    textColor: document.getElementById('text-color').value,
    effect: state.selectedEffect,
    align: state.selectedAlign,
    lineHeight: parseFloat(document.getElementById('line-height').value),
    uppercase: document.getElementById('uppercase-text')?.checked,
    c1: document.getElementById('color1').value,
    c2: document.getElementById('color2').value,
    bgType: state.selectedBgType,
    direction: state.selectedDir,
    pattern: state.selectedPattern,
    noise: document.getElementById('noise-overlay')?.checked,
    sparkles: document.getElementById('sparkles')?.checked,
    showIcons: document.getElementById('show-icons')?.checked,
    showFormulas: document.getElementById('show-formulas')?.checked,
    showGeo: document.getElementById('show-geo')?.checked,
    showProgress: document.getElementById('show-progress')?.checked,
    vignette: parseInt(document.getElementById('vignette').value),
    overlayOpacity: parseInt(document.getElementById('overlay-opacity').value),
    iconCat: document.getElementById('icon-cat-select')?.value || state.selectedIconCat || 'general',
    watermark: document.getElementById('watermark-text').value.trim(),
    watermarkPos: state.watermarkPos,
    showUrl: document.getElementById('show-url')?.checked,
    urlText: document.getElementById('url-text').value.trim(),
    showChannel: document.getElementById('show-channel')?.checked,
    template: state.selectedTemplate,
    format: state.selectedFormat,
    quality: parseInt(document.getElementById('quality').value) / 100
  };
}

function renderToCanvas(canvas, opts) {
  const ctx = canvas.getContext('2d');
  const {w, h} = opts;
  canvas.width = w; canvas.height = h;

  // Background
  drawBackground(ctx, opts);

  // Template specific layout
  TEMPLATES[opts.template].draw(ctx, opts);
}

// ===================================================
// BACKGROUND DRAW
// ===================================================
function drawBackground(ctx, opts) {
  const { w, h, bgType, c1, c2, direction, pattern } = opts;
  ctx.save();

  if (bgType === 'solid') {
    ctx.fillStyle = c1;
    ctx.fillRect(0,0,w,h);
  } else if (bgType === 'gradient') {
    const grad = createLinearGradient(ctx, w, h, direction, c1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);
  } else if (bgType === 'mesh') {
    // Multi-color mesh gradient
    ctx.fillStyle = c2;
    ctx.fillRect(0,0,w,h);
    const g1 = ctx.createRadialGradient(w*0.2, h*0.3, 0, w*0.2, h*0.3, w*0.5);
    g1.addColorStop(0, hexAlpha(c1, 0.8));
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0,0,w,h);
    const g2 = ctx.createRadialGradient(w*0.8, h*0.7, 0, w*0.8, h*0.7, w*0.45);
    g2.addColorStop(0, hexAlpha(mixColors(c1, c2, 0.5), 0.7));
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0,0,w,h);
    const g3 = ctx.createRadialGradient(w*0.5, h*0.1, 0, w*0.5, h*0.1, w*0.35);
    g3.addColorStop(0, hexAlpha(c1, 0.5));
    g3.addColorStop(1, 'transparent');
    ctx.fillStyle = g3;
    ctx.fillRect(0,0,w,h);
  } else if (bgType === 'pattern') {
    ctx.fillStyle = c2;
    ctx.fillRect(0,0,w,h);
    drawPattern(ctx, w, h, pattern, c1, c2);
  }

  // Noise overlay
  if (opts.noise) {
    ctx.globalAlpha = 0.04;
    for (let i=0; i<500; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
      ctx.fillRect(Math.random()*w, Math.random()*h, 1+Math.random(), 1+Math.random());
    }
    ctx.globalAlpha = 1;
  }

  // Sparkles
  if (opts.sparkles) {
    drawSparkles(ctx, w, h);
  }

  // Vignette
  if (opts.vignette > 0) {
    const vig = ctx.createRadialGradient(w/2,h/2,h*0.2, w/2,h/2,w*0.75);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, `rgba(0,0,0,${opts.vignette/100})`);
    ctx.fillStyle = vig;
    ctx.fillRect(0,0,w,h);
  }

  // Overlay tint
  if (opts.overlayOpacity > 0) {
    ctx.fillStyle = `rgba(0,0,0,${opts.overlayOpacity/100})`;
    ctx.fillRect(0,0,w,h);
  }

  ctx.restore();
}

function drawPattern(ctx, w, h, type, c1, c2) {
  const offscreen = document.createElement('canvas');
  let pw = 40, ph = 40;
  offscreen.width = pw; offscreen.height = ph;
  const octx = offscreen.getContext('2d');

  octx.strokeStyle = hexAlpha(c1, 0.3);
  octx.lineWidth = 1.5;
  octx.fillStyle = hexAlpha(c1, 0.15);

  if (type === 'dots') {
    octx.beginPath();
    octx.arc(pw/2, ph/2, 3, 0, Math.PI*2);
    octx.fill();
  } else if (type === 'lines') {
    octx.beginPath();
    octx.moveTo(0, ph/2); octx.lineTo(pw, ph/2);
    octx.stroke();
  } else if (type === 'grid') {
    octx.beginPath();
    octx.moveTo(0, ph/2); octx.lineTo(pw, ph/2);
    octx.moveTo(pw/2, 0); octx.lineTo(pw/2, ph);
    octx.stroke();
  } else if (type === 'zigzag') {
    octx.beginPath();
    octx.moveTo(0, ph/2);
    octx.lineTo(pw/4, ph*0.1);
    octx.lineTo(pw*0.75, ph*0.9);
    octx.lineTo(pw, ph/2);
    octx.stroke();
  } else if (type === 'diamonds') {
    octx.beginPath();
    octx.moveTo(pw/2, 4); octx.lineTo(pw-4, ph/2);
    octx.lineTo(pw/2, ph-4); octx.lineTo(4, ph/2);
    octx.closePath();
    octx.stroke();
  }

  const pat = ctx.createPattern(offscreen, 'repeat');
  ctx.fillStyle = pat;
  ctx.fillRect(0,0,w,h);
}

function drawSparkles(ctx, w, h) {
  ctx.save();
  for (let i=0; i<30; i++) {
    const x = Math.random()*w, y = Math.random()*h;
    const size = 2 + Math.random()*4;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random()*Math.PI);
    ctx.globalAlpha = 0.2 + Math.random()*0.4;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-size,0); ctx.lineTo(size,0);
    ctx.moveTo(0,-size); ctx.lineTo(0,size);
    ctx.moveTo(-size*0.6,-size*0.6); ctx.lineTo(size*0.6,size*0.6);
    ctx.moveTo(size*0.6,-size*0.6); ctx.lineTo(-size*0.6,size*0.6);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// ===================================================
// TEMPLATE DRAW FUNCTIONS
// ===================================================
function drawClassic(ctx, opts) {
  const {w, h} = opts;
  drawDecorElements(ctx, opts);
  const textX = opts.align === 'left' ? w*0.08 : opts.align === 'right' ? w*0.92 : w/2;
  drawMainText(ctx, opts, textX, h/2 - (opts.subtitle ? h*0.05 : 0));
  if (opts.subtitle) drawSubtitle(ctx, opts, textX, h/2 + h*0.09);
  drawBadgeEl(ctx, opts);
  drawWatermark(ctx, opts);
  drawBranding(ctx, opts);
}

function drawSplit(ctx, opts) {
  const {w, h} = opts;
  // Right panel overlay
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(w*0.55, 0, w*0.45, h);
  ctx.restore();
  // Divider line
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.setLineDash([8,6]);
  ctx.beginPath();
  ctx.moveTo(w*0.55, 0); ctx.lineTo(w*0.55, h);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  drawDecorElements(ctx, opts);
  // Text on left panel
  const savedAlign = opts.align;
  opts.align = 'left';
  drawMainText(ctx, opts, w*0.07, h/2 - (opts.subtitle ? h*0.05 : 0));
  if (opts.subtitle) drawSubtitle(ctx, opts, w*0.07, h/2 + h*0.09);
  opts.align = savedAlign;
  // Icon area on right
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.font = `${h*0.45}px 'Segoe UI Emoji',sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const cat = ICONS[opts.iconCat] || ICONS.general;
  ctx.fillText(cat[0], w*0.77, h/2);
  ctx.restore();
  drawBadgeEl(ctx, opts);
  drawWatermark(ctx, opts);
  drawBranding(ctx, opts);
}

function drawCard(ctx, opts) {
  const {w, h} = opts;
  drawDecorElements(ctx, opts);
  // Card background
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  const cx = w*0.07, cy = h*0.12, cw = w*0.86, ch = h*0.76;
  roundRect(ctx, cx, cy, cw, ch, 20);
  ctx.fill();
  // Card border
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, cx, cy, cw, ch, 20);
  ctx.stroke();
  ctx.restore();

  const textX = opts.align === 'left' ? cx + cw*0.08 : opts.align === 'right' ? cx+cw*0.92 : w/2;
  drawMainText(ctx, opts, textX, h/2 - (opts.subtitle ? h*0.05 : 0));
  if (opts.subtitle) drawSubtitle(ctx, opts, textX, h/2 + h*0.09);
  drawBadgeEl(ctx, opts);
  drawWatermark(ctx, opts);
  drawBranding(ctx, opts);
}

function drawSpotlight(ctx, opts) {
  const {w, h} = opts;
  // Spotlight glow
  ctx.save();
  const spot = ctx.createRadialGradient(w/2, h/2, h*0.05, w/2, h/2, h*0.65);
  spot.addColorStop(0, 'rgba(255,255,255,0.15)');
  spot.addColorStop(1, 'transparent');
  ctx.fillStyle = spot;
  ctx.fillRect(0,0,w,h);
  ctx.restore();

  drawDecorElements(ctx, opts);
  const textX = opts.align === 'left' ? w*0.08 : opts.align === 'right' ? w*0.92 : w/2;
  drawMainText(ctx, opts, textX, h/2 - (opts.subtitle ? h*0.06 : 0));
  if (opts.subtitle) drawSubtitle(ctx, opts, textX, h/2 + h*0.1);
  drawBadgeEl(ctx, opts);
  drawWatermark(ctx, opts);
  drawBranding(ctx, opts);
}

function drawMinimal(ctx, opts) {
  const {w, h} = opts;
  // Top accent bar
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(w*0.08, h*0.15, w*0.06, h*0.06);
  // Bottom line
  ctx.fillRect(w*0.08, h*0.82, w*0.84, 2);
  ctx.restore();
  const textX = opts.align === 'left' ? w*0.08 : opts.align === 'right' ? w*0.92 : w/2;
  drawMainText(ctx, opts, textX, h/2 - (opts.subtitle ? h*0.05 : 0));
  if (opts.subtitle) drawSubtitle(ctx, opts, textX, h*0.72);
  drawBadgeEl(ctx, opts);
  drawWatermark(ctx, opts);
  drawBranding(ctx, opts);
}

function drawBanner(ctx, opts) {
  const {w, h} = opts;
  drawDecorElements(ctx, opts);
  // Bottom banner strip
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, h*0.6, w, h*0.4);
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h*0.6); ctx.lineTo(w, h*0.6);
  ctx.stroke();
  ctx.restore();

  // Big icon in upper area
  if (opts.showIcons) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    const cat = ICONS[opts.iconCat] || ICONS.general;
    ctx.font = `${h*0.35}px 'Segoe UI Emoji',sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cat[0], w/2, h*0.32);
    ctx.restore();
  }

  const textX = opts.align === 'left' ? w*0.07 : opts.align === 'right' ? w*0.93 : w/2;
  const saveFontSize = opts.fontSize;
  opts.fontSize = Math.round(opts.fontSize * 0.82);
  drawMainText(ctx, opts, textX, h*0.72 - (opts.subtitle ? h*0.05 : 0));
  opts.fontSize = saveFontSize;
  if (opts.subtitle) drawSubtitle(ctx, opts, textX, h*0.88);
  drawBadgeEl(ctx, opts);
  drawWatermark(ctx, opts);
  drawBranding(ctx, opts);
}

// ===================================================
// TEXT RENDERING
// ===================================================
function drawMainText(ctx, opts, x, y) {
  const { w, h, text, font, fontSize, textColor, effect, align, uppercase, lineHeight } = opts;
  let displayText = uppercase ? text.toUpperCase() : text;

  ctx.save();
  ctx.font = `bold ${fontSize}px ${font}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';

  const maxWidth = w * 0.84;
  const lines = wrapText(ctx, displayText, maxWidth, fontSize, font);
  const lh = fontSize * lineHeight;
  const totalH = lines.length * lh;
  const startY = y - totalH/2 + lh/2;

  lines.forEach((line, i) => {
    const ly = startY + i * lh;

    if (effect === 'shadow') {
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = textColor;
      ctx.fillText(line, x, ly);

    } else if (effect === 'glow') {
      ctx.shadowColor = textColor;
      ctx.shadowBlur = 30;
      ctx.fillStyle = textColor;
      ctx.fillText(line, x, ly);
      ctx.shadowBlur = 60;
      ctx.globalAlpha = 0.5;
      ctx.fillText(line, x, ly);
      ctx.globalAlpha = 1;

    } else if (effect === 'outline') {
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(0,0,0,0.7)';
      ctx.strokeText(line, x, ly);
      ctx.fillStyle = textColor;
      ctx.fillText(line, x, ly);

    } else if (effect === '3d') {
      // 3D shadow layers
      for (let s=6; s>0; s--) {
        ctx.fillStyle = `rgba(0,0,0,${0.08*s})`;
        ctx.fillText(line, x+s, ly+s);
      }
      ctx.fillStyle = textColor;
      ctx.fillText(line, x, ly);

    } else if (effect === 'gradient') {
      let gx1 = x - ctx.measureText(line).width/2;
      if (align === 'right') gx1 = x - ctx.measureText(line).width;
      if (align === 'center') gx1 = x - ctx.measureText(line).width/2;
      const grad = ctx.createLinearGradient(gx1, ly-fontSize/2, gx1+ctx.measureText(line).width, ly+fontSize/2);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.5, textColor);
      grad.addColorStop(1, '#ffffff');
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 10;
      ctx.fillText(line, x, ly);

    } else {
      ctx.fillStyle = textColor;
      ctx.fillText(line, x, ly);
    }
  });

  ctx.restore();
}

function drawSubtitle(ctx, opts, x, y) {
  const { subtitle, font, textColor, align, w } = opts;
  if (!subtitle) return;
  ctx.save();
  const fs = Math.round(opts.fontSize * 0.42);
  ctx.font = `${fs}px ${font}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = hexAlpha(textColor, 0.75);
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 8;
  ctx.fillText(subtitle, x, y);
  ctx.restore();
}

// ===================================================
// DECORATIVE ELEMENTS
// ===================================================
function drawDecorElements(ctx, opts) {
  const { w, h, showIcons, showFormulas, showGeo, showProgress, iconCat } = opts;

  if (showGeo) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    // Circles
    for (let i=0; i<4; i++) {
      ctx.beginPath();
      ctx.arc(Math.random()*w, Math.random()*h, 40+Math.random()*120, 0, Math.PI*2);
      ctx.stroke();
    }
    // Triangles
    for (let i=0; i<3; i++) {
      const cx=Math.random()*w, cy=Math.random()*h, r=40+Math.random()*80;
      ctx.beginPath();
      for (let j=0; j<3; j++) {
        const a = j/3*Math.PI*2 + Math.random();
        j===0 ? ctx.moveTo(cx+Math.cos(a)*r, cy+Math.sin(a)*r) : ctx.lineTo(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }

  if (showIcons) {
    ctx.save();
    const iconSet = ICONS[iconCat] || ICONS.general;
    for (let i=0; i<12; i++) {
      const icon = iconSet[Math.floor(Math.random()*iconSet.length)];
      const size = 36 + Math.random()*56;
      const x = Math.random()*w, y = Math.random()*h;
      ctx.save();
      ctx.translate(x,y);
      ctx.rotate(Math.random()*Math.PI*2);
      ctx.globalAlpha = 0.04 + Math.random()*0.1;
      ctx.font = `${size}px 'Segoe UI Emoji','Apple Color Emoji',sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  if (showFormulas) {
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${h*0.06}px 'Times New Roman', serif`;
    ctx.textAlign = 'left';
    const formulas =['E=mc²', '∑∞n=1', '∫f(x)dx', 'π≈3.14', 'a²+b²=c²', '√(-1)=i'];
    for (let i=0; i<5; i++) {
      ctx.fillText(formulas[Math.floor(Math.random()*formulas.length)], Math.random()*w*0.7, Math.random()*h);
    }
    ctx.restore();
  }

  if (showProgress) {
    const pbx = w*0.08, pby = h*0.88, pbw = w*0.84, pbh = 8;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    roundRect(ctx, pbx, pby, pbw, pbh, 4);
    ctx.fill();
    const pct = 0.4 + Math.random()*0.5;
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, pbx, pby, pbw*pct, pbh, 4);
    ctx.fill();
    ctx.restore();
  }
}

function drawBadgeEl(ctx, opts) {
  const { badge, w, h } = opts;
  if (!badge) return;

  const bx = w * 0.07, by = h * 0.08;
  const pad = 12, fsize = Math.round(h*0.047);
  ctx.save();
  ctx.font = `bold ${fsize}px 'Space Grotesk','Poppins',sans-serif`;
  const tw = ctx.measureText(badge).width;
  const bw = tw + pad*2, bh = fsize + pad;

  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  roundRect(ctx, bx, by - bh/2, bw, bh, 6);
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge, bx+pad, by);
  ctx.restore();
}

function drawWatermark(ctx, opts) {
  const { watermark, watermarkPos, w, h } = opts;
  if (!watermark) return;

  const fsize = Math.round(h * 0.038);
  const pad = 20;
  let tx, ty, align;

  switch(watermarkPos) {
    case 'top-left': tx=pad; ty=pad+fsize/2; align='left'; break;
    case 'top-right': tx=w-pad; ty=pad+fsize/2; align='right'; break;
    case 'bottom-right': tx=w-pad; ty=h-pad-fsize/2; align='right'; break;
    case 'bottom-left': tx=pad; ty=h-pad-fsize/2; align='left'; break;
    case 'center': tx=w/2; ty=h/2; align='center'; break;
    default: tx=w-pad; ty=h-pad; align='right';
  }

  ctx.save();
  ctx.font = `${fsize}px 'Space Grotesk',sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.6;
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillText(watermark, tx, ty);
  ctx.restore();
}

function drawBranding(ctx, opts) {
  const { showUrl, urlText, showChannel, w, h } = opts;
  const fsize = Math.round(h * 0.035);

  if (showUrl && urlText) {
    ctx.save();
    const bh = fsize * 1.8;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, h-bh, w, bh);
    ctx.font = `${fsize}px 'Space Grotesk',sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText('🌐 ' + urlText, w/2, h - bh/2);
    ctx.restore();
  }

  if (showChannel) {
    ctx.save();
    const r = h * 0.06;
    const cx = w - r - 20, cy = h*0.14;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.font = `${r}px 'Segoe UI Emoji',sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎓', cx, cy);
    ctx.restore();
  }
}

// ===================================================
// TEXT WRAP
// ===================================================
function wrapText(ctx, text, maxWidth, fontSize, font) {
  ctx.font = `bold ${fontSize}px ${font}`;
  const words = text.split(' ');
  const lines =[];
  let line = words[0] || '';
  for (let i=1; i<words.length; i++) {
    const test = line + ' ' + words[i];
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = words[i];
    } else {
      line = test;
    }
  }
  lines.push(line);
  return lines;
}

// ===================================================
// HELPERS
// ===================================================
function createLinearGradient(ctx, w, h, dir, c1, c2) {
  const map = {
    'to right': [0,0,w,0],
    'to bottom': [0,0,0,h],
    'to bottom right':[0,0,w,h],
    'to top right': [0,h,w,0],
    'circle': null
  };
  if (dir === 'circle') {
    const g = ctx.createRadialGradient(w/2,h/2,0, w/2,h/2,w*0.65);
    g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
  }
  const [x1,y1,x2,y2] = map[dir] || [0,0,w,0];
  const g = ctx.createLinearGradient(x1,y1,x2,y2);
  g.addColorStop(0, c1);
  g.addColorStop(0.5, mixColors(c1,c2,0.5));
  g.addColorStop(1, c2);
  return g;
}

function mixColors(c1, c2, ratio) {
  const r1=parseInt(c1.slice(1,3),16), g1=parseInt(c1.slice(3,5),16), b1=parseInt(c1.slice(5,7),16);
  const r2=parseInt(c2.slice(1,3),16), g2=parseInt(c2.slice(3,5),16), b2=parseInt(c2.slice(5,7),16);
  return '#' +[
    Math.round(r1*(1-ratio)+r2*ratio),
    Math.round(g1*(1-ratio)+g2*ratio),
    Math.round(b1*(1-ratio)+b2*ratio)
  ].map(c => c.toString(16).padStart(2,'0')).join('');
}

function hexAlpha(hex, alpha) {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.arcTo(x+w, y, x+w, y+h, r);
  ctx.arcTo(x+w, y+h, x, y+h, r);
  ctx.arcTo(x, y+h, x, y, r);
  ctx.arcTo(x, y, x+w, y, r);
  ctx.closePath();
}

// ===================================================
// LIVE PREVIEW
// ===================================================
function initLivePreview() {
  const canvas = document.getElementById('live-canvas');
  canvas.style.maxWidth = '100%';
}

function updateLivePreview() {
  const canvas = document.getElementById('live-canvas');
  const opts = getOpts();
  renderToCanvas(canvas, opts);
  canvas.style.maxWidth = '100%';
}

// ===================================================
// GENERATE THUMBNAILS
// ===================================================
async function generateThumbnails() {
  const textInput = document.getElementById('text-input');
  const texts = textInput.value.split('\n').filter(t => t.trim() !== '');
  if (texts.length === 0) { toast('Enter at least one text!', 'warning'); return; }

  const btn = document.getElementById('generate-btn');
  const progress = document.getElementById('gen-progress');
  const fill = document.getElementById('gen-progress-fill');

  btn.innerHTML = '<span class="spinner"></span> Generating...';
  btn.disabled = true;
  progress.style.display = '';

  state.thumbnails =[];

  for (let i=0; i<texts.length; i++) {
    const text = texts[i].trim();
    fill.style.width = ((i/texts.length)*100) + '%';

    const opts = getOpts();
    opts.text = text;

    // Random colors per thumbnail
    if (document.getElementById('random-each')?.checked && i > 0) {
      randomizeColorsQuiet(opts);
    }

    const canvas = document.createElement('canvas');
    renderToCanvas(canvas, opts);

    const blob = await optimizeBlob(canvas, opts.format, opts.quality);
    const url = URL.createObjectURL(blob);
    const filename = generateFilename(text, opts.format);

    state.thumbnails.push({ text, blob, url, size: blob.size, filename, opts });
    state.stats.generated++;
    state.stats.session++;
    updateStats();
  }

  fill.style.width = '100%';
  setTimeout(() => { progress.style.display = 'none'; fill.style.width = '0%'; }, 600);

  btn.innerHTML = '✨ Generate Thumbnails';
  btn.disabled = false;

  document.getElementById('dl-all-btn').disabled = false;
  const mobileDl = document.getElementById('mobile-dl-btn');
  if (mobileDl) mobileDl.disabled = false;
  document.getElementById('results-count').textContent = state.thumbnails.length;
  renderThumbnails();
  toast(`✅ Generated ${state.thumbnails.length} thumbnail(s)!`, 'success');
}

function randomizeColorsQuiet(opts) {
  const h1 = Math.random()*360, h2 = (h1+30+Math.random()*80)%360;
  opts.c1 = hslToHex(h1, 55, 30);
  opts.c2 = hslToHex(h2, 50, 15);
}

async function optimizeBlob(canvas, format, quality) {
  if (format === 'image/png') {
    return await canvasToBlob(canvas, format, 1);
  }

  let q = quality, blob, attempts = 0;
  const max = 120*1024, min = 50*1024;

  while (attempts < 12) {
    blob = await canvasToBlob(canvas, format, q);
    if (blob.size <= max) break;
    q *= 0.85; attempts++;
  }

  if (blob.size < min && q < 0.99) {
    for (let i=0; i<5 && blob.size < min; i++) {
      q = Math.min(0.99, q+0.1);
      blob = await canvasToBlob(canvas, format, q);
    }
  }

  return blob;
}

function canvasToBlob(canvas, format, quality) {
  return new Promise(res => canvas.toBlob(res, format, quality));
}

function generateFilename(text, format) {
  const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
  const UNI_MAP = {
    "ru":"rajshahi-university","ju":"jahangirnagar-university","du":"dhaka-university",
    "cu":"chittagong-university","bu":"barishal-university","ku":"khulna-university",
    "su":"sylhet-university","jnu":"jagannath-university","sust":"sust","cuet":"cuet",
    "ruet":"ruet","kuet":"kuet","buet":"buet","bau":"bau"
  };
  const lower = text.toLowerCase();
  for (const [code, full] of Object.entries(UNI_MAP)) {
    if (lower.includes(code) || lower.includes(full)) {
      const yr = text.match(/\d{4}(?:-\d{4})?/);
      const unit = lower.match(/([a-h])\s*unit/i);
      const parts = [code];
      if (unit) parts.push(unit[1].toLowerCase()+'-unit');
      if (yr) parts.push(yr[0]);
      return parts.join('-') + '.' + ext;
    }
  }
  let base = text.substring(0,50).toLowerCase().replace(/[^a-z0-9]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
  if (!base) base = 'thumbnail';
  return base + '.' + ext;
}

// ===================================================
// RENDER THUMBNAILS
// ===================================================
function renderThumbnails() {
  const grid = document.getElementById('thumbnails-grid');
  if (state.thumbnails.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🎨</div><div class="empty-text">No thumbnails yet</div><div class="empty-sub">Enter your texts and click Generate</div></div>`;
    return;
  }
  grid.innerHTML = '';
  state.thumbnails.forEach((t, i) => {
    const kb = (t.size/1024).toFixed(1);
    const sizeClass = t.size < 50*1024 ? 'size-small' : t.size > 120*1024 ? 'size-big' : 'size-ok';
    const sizeLabel = t.size < 50*1024 ? '⚠️ Small' : t.size > 120*1024 ? '❌ Large' : '✅ Good';

    const card = document.createElement('div');
    card.className = 'thumb-card';
    card.innerHTML = `
      <div class="thumb-img-wrap">
        <img src="${t.url}" alt="Thumbnail ${i+1}" loading="lazy">
        <div class="thumb-badges">
          <span class="thumb-num">#${i+1}</span>
          <span class="size-badge ${sizeClass}">${sizeLabel} ${kb}KB</span>
        </div>
      </div>
      <div class="thumb-info">
        <div class="thumb-text">${escHTML(t.text)}</div>
        <div class="thumb-filename">${escHTML(t.filename)}</div>
        <div class="thumb-actions">
          <button class="btn btn-secondary" onclick="regenerate(${i})">🔄 Regen</button>
          <button class="btn btn-primary" onclick="downloadOne(${i})">📥 Save</button>
          <button class="btn btn-danger btn-icon" onclick="removeThumb(${i})" title="Remove">🗑</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function escHTML(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ===================================================
// ACTIONS
// ===================================================
async function regenerate(index) {
  const t = state.thumbnails[index];
  if (!t) return;
  const opts = getOpts();
  opts.text = t.text;
  if (document.getElementById('random-each')?.checked) {
    randomizeColorsQuiet(opts);
  }
  const canvas = document.createElement('canvas');
  renderToCanvas(canvas, opts);
  const blob = await optimizeBlob(canvas, opts.format, opts.quality);
  URL.revokeObjectURL(t.url);
  state.thumbnails[index] = { ...t, blob, url: URL.createObjectURL(blob), size: blob.size, opts };
  state.stats.generated++;
  updateStats();
  renderThumbnails();
  toast(`🔄 Regenerated #${index+1}`, 'success');
}

function downloadOne(index) {
  const t = state.thumbnails[index];
  if (!t) return;
  const a = document.createElement('a');
  a.href = t.url; a.download = t.filename;
  a.click();
  state.stats.downloaded++;
  updateStats();
  toast(`📥 Saved: ${t.filename}`, 'success');
}

function removeThumb(index) {
  URL.revokeObjectURL(state.thumbnails[index].url);
  state.thumbnails.splice(index, 1);
  document.getElementById('results-count').textContent = state.thumbnails.length;
  if (state.thumbnails.length === 0) {
    document.getElementById('dl-all-btn').disabled = true;
    const mobileDl = document.getElementById('mobile-dl-btn');
    if (mobileDl) mobileDl.disabled = true;
  }
  renderThumbnails();
  toast('🗑 Removed', 'info');
}

async function downloadAllZip() {
  if (state.thumbnails.length === 0) { toast('Nothing to download', 'warning'); return; }
  if (typeof JSZip === 'undefined') { toast('JSZip not loaded — try individual downloads', 'error'); return; }

  const btn = document.getElementById('dl-all-btn');
  btn.innerHTML = '<span class="spinner"></span> Packing...';
  btn.disabled = true;

  const zip = new JSZip();
  const nameCounts = {};

  for (const t of state.thumbnails) {
    const ab = await t.blob.arrayBuffer();
    let name = t.filename;
    if (nameCounts[name]) {
        const parts = name.split('.');
        const ext = parts.pop();
        const base = parts.join('.');
        name = `${base}-${nameCounts[t.filename]}.${ext}`;
        nameCounts[t.filename]++;
    } else {
        nameCounts[name] = 1;
    }
    zip.file(name, new Uint8Array(ab), { binary:true });
  }

  const content = await zip.generateAsync({ type:'blob', compression:'DEFLATE', compressionOptions:{level:6} });
  const date = new Date().toISOString().slice(0,10);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], {type:'application/zip'}));
  a.download = `eduthumb-${date}.zip`;
  document.body.appendChild(a);
  await new Promise(r => setTimeout(r, 100));
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 2000);

  state.stats.downloaded += state.thumbnails.length;
  updateStats();
  toast(`📦 ZIP downloaded with ${state.thumbnails.length} files!`, 'success');

  btn.innerHTML = '📦 Download ZIP';
  btn.disabled = false;
}

function clearAll() {
  state.thumbnails.forEach(t => URL.revokeObjectURL(t.url));
  state.thumbnails =[];
  document.getElementById('results-count').textContent = 0;
  document.getElementById('dl-all-btn').disabled = true;
  const mobileDl = document.getElementById('mobile-dl-btn');
  if (mobileDl) mobileDl.disabled = true;
  renderThumbnails();
  toast('🗑 Cleared all', 'info');
}

function downloadPreview() {
  const canvas = document.getElementById('live-canvas');
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/jpeg', 0.9);
  a.download = 'preview.jpg';
  a.click();
  toast('📥 Preview saved', 'success');
}

// ===================================================
// UTILITY
// ===================================================
function loadSamples() {
  document.getElementById('text-input').value =[
    'Rajshahi University A Unit Question 2024',
    'Dhaka University C Unit Syllabus 2023-2024',
    'The Periodic Table Explained Simply',
    '10 Math Tricks Everyone Must Know',
    'English Grammar in 5 Minutes'
  ].join('\n');
  updateLivePreview();
  toast('📋 Sample texts loaded', 'success');
}

function clearText() {
  document.getElementById('text-input').value = '';
  document.getElementById('subtitle-input').value = '';
  updateLivePreview();
}

function scrollToResults() {
  document.getElementById('results-panel')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

function togglePanel(id) {
  const panel = document.getElementById(id);
  panel.classList.toggle('collapsed');
  panel.classList.toggle('open');
}

function updateStats() {
  document.getElementById('stat-generated').textContent = state.stats.generated;
  document.getElementById('stat-downloaded').textContent = state.stats.downloaded;
  document.getElementById('stat-session').textContent = state.stats.session;
}

// ===================================================
// TOAST
// ===================================================
function toast(msg, type='info') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  el.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(el);
  el.addEventListener('click', () => el.remove());
  setTimeout(() => el.remove(), 4000);
}
