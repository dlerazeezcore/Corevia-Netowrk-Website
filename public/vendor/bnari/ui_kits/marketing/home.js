/* Bnari Kodo — company home page interactions */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---- Services ---- */
  const SERVICES = [
    ['home', 'کڕینی موڵک', 'Buy property', 'زەوی، خانوو و شوقەی پشتڕاستکراو بە ژمارەی فەرمی و نەخشە.', 'Verified land, houses and apartments with official numbers and maps.'],
    ['tag', 'فرۆشتنی موڵک', 'Sell property', 'موڵکەکەت بە باشترین نرخ بفرۆشە بە بازاڕکردنی پڕیمیۆم.', 'Sell your property at the best price with premium marketing.'],
    ['key', 'کرێ', 'Rent', 'شوقە و موڵک بۆ کرێ، بە ڕێککەوتنی خێرا و ڕوون.', 'Apartments and properties for rent, with quick clear agreements.'],
    ['building-2', 'بەڕێوەبردنی موڵک', 'Property management', 'بەڕێوەبردنی موڵکی کۆمپانیا و هاوبەش بە تۆماری وردی دارایی.', 'Manage company and partner properties with detailed financial records.'],
    ['trending-up', 'وەبەرهێنان', 'Investment', 'دۆزینەوەی هەلی وەبەرهێنانی خانووبەرە بە قازانجی بەرز.', 'Find high-return real estate investment opportunities.'],
    ['scroll-text', 'گرێبەستی فەرمی', 'Official contracts', 'گرێبەستی کوردیی سۆرانی بە واژۆ و دەرهێنانی PDF.', 'Kurdish Sorani contracts with signature and PDF export.'],
  ];
  $('#svcGrid').innerHTML = SERVICES.map(([ic, ku, en, dku, den], i) => `
    <div class="svc" data-reveal data-delay="${i % 3}">
      <div class="ic"><i data-lucide="${ic}"></i></div>
      <h3 data-en="${en}">${ku}</h3>
      <p data-en="${den}">${dku}</p>
      <span class="link" data-en="Learn more">زیاتر بزانە <i data-lucide="arrow-left"></i></span>
    </div>`).join('');

  /* ---- Featured properties ---- */
  const PROPS = [
    { ribbon: ['تایبەت', 'Featured'], status: ['بەردەست', 'Available', '#1F8A5B'], price: '$420,000', priceUnit: '', t: ['ڤێلای پڕیمیۆم', 'Premium Villa'], loc: ['ئیتالی ڤیلەج، هەولێر', 'Italian Village, Erbil'], sky: [50, 78, 62, 92, 70, 84, 58], feats: [['bed-double', '4', 'ژوور', 'beds'], ['bath', '3', 'حەمام', 'bath'], ['ruler', '360 م²', '360 m²', '']] },
    { ribbon: ['نوێ', 'New'], status: ['ڕیزێرڤ', 'Reserved', '#B7892F'], price: '$250,000', priceUnit: '', t: ['زەوی گۆشە', 'Corner Land'], loc: ['کەسنەزان، هەولێر', 'Kasnazan, Erbil'], sky: [40, 60, 48, 70, 55], feats: [['ruler', '500 م²', '500 m²', ''], ['compass', 'دوو ڕوو', '2 frontage', ''], ['hash', 'No. 245', 'No. 245', '']] },
    { ribbon: ['کرێ', 'For rent'], status: ['بەردەست', 'Available', '#1F8A5B'], price: '$900', priceUnit: ['/مانگ', '/mo'], t: ['شوقەی مۆدێرن', 'Modern Apartment'], loc: ['ئیمپایەر، هەولێر', 'Empire, Erbil'], sky: [60, 40, 80, 55, 70, 48], feats: [['bed-double', '2', 'ژوور', 'beds'], ['bath', '2', 'حەمام', 'bath'], ['ruler', '140 م²', '140 m²', '']] },
  ];
  $('#propGrid').innerHTML = PROPS.map((p, i) => `
    <div class="prop" data-reveal data-delay="${i % 3}">
      <div class="prop-photo">
        <span class="ribbon" data-en="${p.ribbon[1]}">${p.ribbon[0]}</span>
        <span class="status" style="background:${p.status[2]}e6" data-en="${p.status[1]}">${p.status[0]}</span>
        <div class="sky">${p.sky.map(h => `<i style="height:${h}%"></i>`).join('')}</div>
        <span class="fav"><i data-lucide="heart"></i></span>
      </div>
      <div class="prop-body">
        <div class="price">${p.price}${p.priceUnit ? `<small data-en="${p.priceUnit[1]}">${p.priceUnit[0]}</small>` : ''}</div>
        <div class="t" data-en="${p.t[1]}">${p.t[0]}</div>
        <div class="loc"><i data-lucide="map-pin"></i><span data-en="${p.loc[1]}">${p.loc[0]}</span></div>
        <div class="feats">${p.feats.map(([ic, v, kul, enl]) => `<span><i data-lucide="${ic}"></i><span data-en="${v}${enl ? ' ' + enl : ''}">${v}${kul && !/^[\d]/.test(v) ? '' : (kul ? ' ' + kul : '')}</span></span>`).join('')}</div>
      </div>
    </div>`).join('');

  /* ---- Areas ---- */
  const AREAS = [
    ['ئیتالی ڤیلەج', 'Italian Village', 48], ['ئیمپایەر', 'Empire', 36], ['دریم سیتی', 'Dream City', 52], ['ئەندازیاران', 'Engineers City', 29],
    ['کەسنەزان', 'Kasnazan', 41], ['ناوەندی شار', 'Downtown', 33], ['ئاشتی', 'Ashti', 27], ['زانیاری', 'Zanyari', 38],
  ];
  $('#areaGrid').innerHTML = AREAS.map(([ku, en, n], i) => `
    <div class="area" data-reveal data-delay="${i % 4}">
      <div class="area-bg"></div>
      <span class="go"><i data-lucide="arrow-up-left"></i></span>
      <div class="area-body"><div class="nm" data-en="${en}">${ku}</div><div class="ct"><i data-lucide="building-2" style="font-size:13px"></i><span data-en="${n} properties">${n} موڵک</span></div></div>
    </div>`).join('');

  /* ---- Marquee ---- */
  const MQ = ['ئیتالی ڤیلەج', 'ئیمپایەر', 'دریم سیتی', 'ئەندازیاران', 'کەسنەزان', 'ناوەندی شار', 'ئاشتی', 'زانیاری', 'نیو هاوسێن', 'بنەسڵاوە'];
  $('#marquee').innerHTML = [...MQ, ...MQ].map(a => `<span>${a}</span>`).join('');

  if (window.lucide) lucide.createIcons();

  /* ---- Nav scroll ---- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const mm = $('#mobileMenu');
  $('#navToggle').addEventListener('click', () => mm.classList.toggle('open'));
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

  /* ---- Reveal + counters (scroll-driven) ---- */
  document.documentElement.classList.add('anim');
  const counted = new WeakSet();
  function animateCounter(el) {
    if (counted.has(el)) return; counted.add(el);
    const to = +el.dataset.to, dur = 1700, start = performance.now();
    if (window.self !== window.top) { el.textContent = to.toLocaleString('en-US'); return; }
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function scan() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    $$('[data-reveal]:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 50 && r.bottom > 0) { el.classList.add('in'); el.querySelectorAll('.counter').forEach(animateCounter); }
    });
  }
  let q = false;
  const queue = () => { if (q) return; q = true; requestAnimationFrame(() => { q = false; scan(); }); };
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  scan(); setTimeout(scan, 250);
  window.addEventListener('load', () => setTimeout(scan, 100));
  setTimeout(() => { $$('[data-reveal]').forEach(el => el.classList.add('in')); $$('.counter').forEach(animateCounter); }, 2800);

  /* ---- Language switch ---- */
  let lang = 'ku';
  $$('[data-en]').forEach(el => { el.dataset.ku = el.innerHTML; });
  function setLang(next) {
    lang = next;
    document.documentElement.lang = next === 'en' ? 'en' : 'ku';
    document.documentElement.dir = next === 'en' ? 'ltr' : 'rtl';
    $$('[data-en]').forEach(el => { el.innerHTML = next === 'en' ? el.dataset.en : el.dataset.ku; });
    $$('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === next));
    if (window.lucide) lucide.createIcons();
  }
  document.addEventListener('click', e => { const b = e.target.closest('.lang-switch button'); if (b) setLang(b.dataset.lang); });

  /* ---- Hero mouse parallax (premium movement) ---- */
  const hero = $('.hero');
  const layers = $$('[data-parallax]');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(l => {
        const f = parseFloat(l.dataset.parallax) * 100;
        l.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
      });
    });
    hero.addEventListener('mouseleave', () => layers.forEach(l => { l.style.transform = ''; }));
  }
})();
