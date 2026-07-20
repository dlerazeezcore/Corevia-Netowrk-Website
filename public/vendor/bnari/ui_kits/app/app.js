/* Bnari Kodo — app shell logic */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* nav config: [view, ku, en, icon, count] */
  const NAV = [
    { group: ['', ''], items: [
      ['dashboard', 'داشبۆرد', 'Dashboard', 'layout-dashboard', ''],
    ]},
    { group: ['موڵک و بەردەستی', 'Property & availability'], items: [
      ['properties', 'موڵکەکان', 'Properties', 'building-2', '1284'],
      ['contacts', 'پەیوەندییەکان', 'Contacts', 'contact', ''],
      ['areas', 'ناوچەکان', 'Areas', 'map', ''],
    ]},
    { group: ['مامەڵە و گرێبەست', 'Deals & contracts'], items: [
      ['contracts', 'گرێبەستەکان', 'Contracts', 'file-signature', ''],
      ['agreements', 'ڕێککەوتنە دەرەکییەکان', 'External Agreements', 'file-clock', '12'],
    ]},
    { group: ['دارایی', 'Finance'], items: [
      ['payments', 'پارەدانەکان', 'Payments', 'wallet', ''],
      ['expenses', 'خەرجییەکان', 'Expenses', 'receipt', ''],
      ['reports', 'ڕاپۆرتەکان', 'Reports', 'bar-chart-3', ''],
    ]},
    { group: ['سیستەم', 'System'], items: [
      ['settings', 'ڕێکخستنەکان', 'Settings', 'settings', ''],
    ]},
  ];
  const TITLES = {}; // view -> [ku,en]
  NAV.forEach((g) => g.items.forEach(([v, ku, en]) => { TITLES[v] = [ku, en]; }));
  const ICONS = {}; NAV.forEach((g) => g.items.forEach(([v, , , ic]) => { ICONS[v] = ic; }));
  TITLES.home = ['بناری کۆدۆ', 'Bnari Kodo']; ICONS.home = 'home';
  TITLES.transactions = TITLES.transactions || ['مامەڵەکان', 'Transactions']; ICONS.transactions = ICONS.transactions || 'repeat';

  let lang = 'ku';

  /* render sidebar */
  const navScroll = $('#navScroll');
  navScroll.innerHTML = NAV.map((g) =>
    (g.group[0] ? `<div class="nav-group-label" data-en="${g.group[1]}">${g.group[0]}</div>` : '') +
    g.items.map(([v, ku, en, ic, c]) =>
      `<div class="nav-item" data-view="${v}"><i data-lucide="${ic}"></i><span data-en="${en}">${ku}</span>${c ? `<span class="count">${c}</span>` : ''}</div>`
    ).join('')
  ).join('');

  /* bottom nav (mobile) — Properties · Contracts · More */
  const BN = [['properties','موڵک','Properties','building-2'],['contracts','گرێبەست','Contracts','file-signature']];
  $('#bottomNav').innerHTML = `<div class="bn-row">${BN.map(([v,ku,en,ic])=>`<button class="bn" data-view="${v}"><i data-lucide="${ic}"></i><span class="bl" data-en="${en}">${ku}</span></button>`).join('')}<button class="bn" id="bnMore"><i data-lucide="grip"></i><span class="bl" data-en="More">زیاتر</span></button></div>`;

  /* "More" sheet — every module */
  const MORE = [
    ['dashboard','داشبۆرد','Dashboard','layout-dashboard'],['properties','موڵک','Properties','building-2'],
    ['contacts','پەیوەندییەکان','Contacts','contact'],['areas','ناوچەکان','Areas','map'],
    ['contracts','گرێبەستەکان','Contracts','file-signature'],['agreements','ڕێککەوتنە دەرەکییەکان','External Agreements','file-clock'],
    ['payments','پارەدانەکان','Payments','wallet'],['expenses','خەرجییەکان','Expenses','receipt'],
    ['reports','ڕاپۆرتەکان','Reports','bar-chart-3'],['settings','ڕێکخستنەکان','Settings','settings'],
  ];
  const moreSheet = document.createElement('div');
  moreSheet.className = 'more-scrim'; moreSheet.id = 'moreSheet';
  moreSheet.innerHTML = `<div class="more-sheet"><div class="more-grab"></div><div class="more-title" data-en="All modules">هەموو بەشەکان</div><div class="more-grid">${MORE.map(([v,ku,en,ic])=>`<button class="more-item" data-view="${v}"><span class="mi-ic"><i data-lucide="${ic}"></i></span><span class="mi-l" data-en="${en}">${ku}</span></button>`).join('')}</div></div>`;
  document.body.appendChild(moreSheet);
  function openMore(){ moreSheet.classList.add('show'); if(window.lucide) lucide.createIcons(); }
  function closeMore(){ moreSheet.classList.remove('show'); }
  $('#bnMore').addEventListener('click', openMore);
  document.addEventListener('click', (e) => { if (e.target.closest('[data-open-more]')) openMore(); });
  moreSheet.addEventListener('click', (e) => { if (e.target === moreSheet) closeMore(); else if (e.target.closest('[data-view]')) closeMore(); });
  window.bkCloseMore = closeMore;

  /* view rendering */
  const content = $('#content');
  function renderView(view) {
    window.bkCurrentView = view;
    let html;
    if (window.VIEWS[view]) html = window.VIEWS[view]();
    else html = window.VIEWS.placeholder(TITLES[view][0], TITLES[view][1], ICONS[view] || 'circle');
    content.innerHTML = html;
    var fab = $('#fab'); if (fab) fab.style.display = view === 'home' ? 'none' : '';
    // page title
    $('#pageTitle').textContent = lang === 'en' ? TITLES[view][1] : TITLES[view][0];
    // active states
    $$('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.view === view));
    $$('.bottom-nav .bn').forEach((n) => n.classList.toggle('active', n.dataset.view === view));
    cacheKu();
    applyLang();
    if (window.lucide) lucide.createIcons();
    content.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  /* language */
  function cacheKu() { $$('[data-en]').forEach((el) => { if (el.dataset.ku === undefined) el.dataset.ku = el.innerHTML; }); }
  function applyLang() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ku';
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    $$('[data-en]').forEach((el) => { el.innerHTML = lang === 'en' ? el.dataset.en : (el.dataset.ku ?? el.innerHTML); });
    $$('[data-en-ph]').forEach((el) => { el.placeholder = lang === 'en' ? el.dataset.enPh : (el.dataset.kuPh ?? el.placeholder); });
    $$('[data-langswitch] button').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
    if ($('#pageTitle') && current) $('#pageTitle').textContent = lang === 'en' ? TITLES[current][1] : TITLES[current][0];
    if (window.lucide) lucide.createIcons();
  }
  // cache placeholder-ph kurdish
  $$('[data-en-ph]').forEach((el) => { el.dataset.kuPh = el.placeholder; });
  function setLang(next) { lang = next; applyLang(); }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-langswitch] button');
    if (b) setLang(b.dataset.lang);
  });

  /* navigation */
  let current = 'home';
  window.bkRerender = () => renderView(current);
  window.bkApplyLang = () => applyLang();
  window.bkLang = () => lang;
  window.bkNav = (v) => { current = v; renderView(v); }; // navigate keeping sub-state
  function go(view) {
    if (window.APP) { window.APP.state.detail = {}; window.APP.state.expForm = null; }
    current = view; renderView(view); closeDrawer();
  }
  document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-view]');
    if (item) go(item.dataset.view);
  });

  /* mobile drawer */
  const sidebar = $('#sidebar'), scrim = $('#scrim');
  function openDrawer() { sidebar.classList.add('open'); scrim.classList.add('show'); }
  function closeDrawer() { sidebar.classList.remove('open'); scrim.classList.remove('show'); }
  $('#menuBtn').addEventListener('click', openDrawer);
  scrim.addEventListener('click', closeDrawer);
  $('#fab').addEventListener('click', () => {
    const v = current; const A = window.APP || {};
    if (v === 'expenses') { go('expenses'); A.state.expForm = { mode: 'new', id: null }; window.bkRerender(); return; }
    if (v === 'transactions' || v === 'payments') { if (A.openDeal) A.openDeal(); return; }
    const map = { properties: 'property', contracts: 'contract', agreements: 'agreement', contacts: 'contact', areas: 'area' };
    if (map[v] && A.openForm) { A.openForm(map[v]); return; }
    if (A.openDeal) A.openDeal(); // home / dashboard / reports / settings → create deal
  });

  /* login */
  cacheKu();
  $('#rememberMe').addEventListener('click', function () { this.classList.toggle('on'); });
  const pw = $('#pwToggle');
  pw.addEventListener('click', () => {
    const inp = pw.previousElementSibling;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    pw.setAttribute('data-lucide', inp.type === 'password' ? 'eye' : 'eye-off');
    lucide.createIcons();
  });
  const loginBtn = $('#loginBtn');
  loginBtn.addEventListener('click', () => {
    if (loginBtn.dataset.busy) return;
    loginBtn.dataset.busy = '1';
    loginBtn.innerHTML = '<span style="width:18px;height:18px;border:2px solid rgba(255,255,255,.5);border-top-color:#fff;border-radius:50%;display:inline-block;animation:bk-spin .7s linear infinite"></span>';
    setTimeout(() => {
      $('#loginScreen').classList.add('hidden');
      $('#app').classList.add('ready');
      setTimeout(() => { $('#loginScreen').style.display = 'none'; }, 600);
    }, 1000);
  });
  $('#logoutBtn').addEventListener('click', () => {
    $('#loginScreen').style.display = '';
    requestAnimationFrame(() => $('#loginScreen').classList.remove('hidden'));
    $('#app').classList.remove('ready');
    loginBtn.dataset.busy = '';
    loginBtn.innerHTML = '<span data-en="Login">چوونەژوورەوە</span>';
    cacheKu(); applyLang();
  });

  /* spinner keyframes */
  const st = document.createElement('style');
  st.textContent = '@keyframes bk-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(st);

  /* init */
  renderView('home');
  applyLang();
  if (window.lucide) lucide.createIcons();

  /* showcase auto-login: ?demo skips the login screen straight to the dashboard */
  if (location.search.indexOf('demo') >= 0) {
    const ls = document.getElementById('loginScreen');
    const ap = document.getElementById('app');
    if (ls && ap) { ls.classList.add('hidden'); ap.classList.add('ready'); ls.style.display = 'none'; }
  }
})();
