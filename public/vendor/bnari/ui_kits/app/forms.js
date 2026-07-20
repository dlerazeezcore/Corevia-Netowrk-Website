/* Bnari Kodo — modal engine + create/edit forms for every module. Wires to window.DATA. */
(function () {
  const D = window.DATA;
  const APP = window.APP = window.APP || {};
  const lang = () => (window.bkLang ? window.bkLang() : 'ku');
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const T = (ku, en) => (lang() === 'en' ? en : ku);
  const money = (v) => '$' + Number(v || 0).toLocaleString('en-US');
  /* date helpers: native picker uses ISO yyyy-mm-dd; we store yyyy/mm/dd */
  const toISO = (s) => { if (!s) return ''; const m = String(s).match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/); return m ? `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}` : ''; };
  const toSlash = (s) => { if (!s) return ''; const m = String(s).match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/); return m ? `${m[1]}/${m[2].padStart(2, '0')}/${m[3].padStart(2, '0')}` : String(s); };

  /* ── toast ── */
  function toast(ku, en) {
    let t = document.getElementById('bkToast');
    if (!t) { t = document.createElement('div'); t.id = 'bkToast'; t.className = 'bk-toast'; document.body.appendChild(t); }
    t.innerHTML = `<i data-lucide="check-circle"></i><span>${T(ku, en)}</span>`;
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove('show'), 2600);
  }
  APP.toast = toast;

  /* ── field renderer ── */
  function field(f) {
    const lbl = `<label class="lbl" for="f-${f.id}">${T(f.ku, f.en)}${f.req ? ' <span class="req">*</span>' : ''}</label>`;
    let ctl = '';
    const v = f.value != null ? esc(f.value) : '';
    if (f.type === 'select') {
      ctl = `<select class="select-ctl" id="f-${f.id}">${f.options.map((o) => `<option value="${esc(o.v)}" ${o.v === f.value ? 'selected' : ''}>${esc(T(o.ku, o.en || o.ku))}</option>`).join('')}</select>`;
    } else if (f.type === 'textarea') {
      ctl = `<textarea class="input-ctl" id="f-${f.id}" placeholder="${esc(f.ph || '')}">${v}</textarea>`;
    } else if (f.type === 'file') {
      ctl = `<div class="dropzone" data-dz="${f.id}"><div class="dz-ic"><i data-lucide="upload-cloud"></i></div><div class="dz-t">${T('پەڕگە دابنێ یان کلیک بکە', 'Drop a file or click')}</div><div class="dz-s">PDF · JPG · PNG</div><input type="file" id="f-${f.id}" multiple hidden></div><div class="dz-files" id="dzf-${f.id}"></div>`;
    } else {
      const isDate = f.type === 'date';
      const t = (f.type === 'number' || f.type === 'money') ? 'number' : (isDate ? 'date' : 'text');
      const cls = (f.type === 'number' || f.type === 'money' || isDate) ? 'input-ctl num' : 'input-ctl';
      const val = isDate ? (toISO(f.value) || '2026-06-16') : v;
      const extra = isDate ? ' onclick="this.showPicker&&this.showPicker()"' : (f.max != null ? ` max="${f.max}"` : '');
      ctl = `<input type="${t}" class="${cls}" id="f-${f.id}" value="${val}" placeholder="${esc(f.ph || '')}"${extra}>`;
    }
    return `<div class="ffield ${f.col2 ? 'col-2' : ''}" ${f.show === false ? 'style="display:none"' : ''} data-fwrap="${f.id}">${lbl}${ctl}${f.html || ''}</div>`;
  }

  /* ── open modal ── */
  function modal(cfg) {
    const scrim = document.createElement('div');
    scrim.className = 'bk-modal-scrim';
    scrim.innerHTML = `
      <div class="bk-modal ${cfg.wide ? 'wide' : ''}">
        <div class="bk-mhead">
          <span class="mh-ic"><i data-lucide="${cfg.icon || 'plus'}"></i></span>
          <div class="mh-t"><h3>${T(cfg.ku, cfg.en)}</h3>${cfg.subKu ? `<div class="mh-s">${T(cfg.subKu, cfg.subEn)}</div>` : ''}</div>
          <button class="bk-mclose" data-mclose><i data-lucide="x"></i></button>
        </div>
        <div class="bk-mbody"><div class="fgrid">${cfg.fields.map(field).join('')}</div>${cfg.extra || ''}</div>
        <div class="bk-mfoot">
          <button class="btn btn-ghost" data-mclose><span>${T('پاشگەزبوونەوە', 'Cancel')}</span></button>
          <button class="btn btn-gold" data-msave><i data-lucide="check"></i><span>${T(cfg.saveKu || 'پاشەکەوتکردن', cfg.saveEn || 'Save')}</span></button>
        </div>
      </div>`;
    document.body.appendChild(scrim);
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => scrim.classList.add('show'));
    const close = () => { scrim.classList.remove('show'); setTimeout(() => scrim.remove(), 250); };
    scrim.addEventListener('click', (e) => { if (e.target === scrim || e.target.closest('[data-mclose]')) close(); });
    // file inputs
    scrim.querySelectorAll('[data-dz]').forEach((dz) => {
      const id = dz.dataset.dz; const inp = dz.querySelector('input[type=file]'); const list = scrim.querySelector('#dzf-' + id);
      dz.addEventListener('click', () => inp.click());
      inp.addEventListener('change', () => {
        list.innerHTML = Array.from(inp.files).map((f) => `<div class="dz-file"><i data-lucide="file-text"></i><span>${esc(f.name)}</span><i data-lucide="x" class="rm"></i></div>`).join('');
        if (window.lucide) lucide.createIcons();
      });
    });
    const get = (id) => { const el = scrim.querySelector('#f-' + id); return el ? el.value : ''; };
    const setShow = (id, on) => { const w = scrim.querySelector(`[data-fwrap="${id}"]`); if (w) w.style.display = on ? '' : 'none'; };
    const ctxObj = { scrim, get, setShow, el: (id) => scrim.querySelector('#f-' + id) };
    if (cfg.setup) cfg.setup(ctxObj);
    scrim.querySelector('[data-msave]').addEventListener('click', () => {
      const vals = {}; cfg.fields.forEach((f) => { vals[f.id] = get(f.id); if (f.type === 'date') vals[f.id] = toSlash(vals[f.id]); });
      let extra = {};
      if (cfg.validate) { const r = cfg.validate(ctxObj); if (r === null || r === false) return; if (r && typeof r === 'object') extra.owners = r; }
      let rec = null;
      if (cfg.onSave) rec = cfg.onSave(vals, extra);
      if (rec === false) return;
      close();
      toast(cfg.doneKu || 'بە سەرکەوتوویی پاشەکەوتکرا', cfg.doneEn || 'Saved successfully');
      if (cfg.after) cfg.after(rec);
      else if (window.bkRerender) window.bkRerender();
    });
    if (window.bkApplyLang) window.bkApplyLang();
  }
  APP.modal = modal;
  function openForm(key, after) { const cfg = FORMS[key](); if (after) cfg.after = after; modal(cfg); }
  APP.openForm = openForm;
  /* wire a select whose '__add' option opens a create form, then re-selects the new record */
  function chain(scrim, selId, key, rebuild) {
    const sel = scrim.querySelector('#f-' + selId); if (!sel) return;
    sel.dataset.prev = sel.value;
    sel.addEventListener('change', () => {
      if (sel.value === '__add') { const prev = sel.dataset.prev || ''; sel.value = prev; openForm(key, (rec) => { if (rec) rebuild(sel, rec); }); return; }
      sel.dataset.prev = sel.value;
    });
  }
  const addFirst = (ku, en) => [{ v: '', ku: '— هەڵبژێرە —', en: '— Select —' }, { v: '__add', ku: ku, en: en }];
  const ownerSelOpts = () => addFirst('+ زیادکردنی خاوەن نوێ', '+ Add new owner').concat(D.contacts.map((c) => ({ v: c.id, ku: c.name, en: c.nameEn })));
  const ownerHTML = (sel, rec) => { sel.innerHTML = ownerSelOpts().map((o) => `<option value="${o.v}">${T(o.ku, o.en || o.ku)}</option>`).join(''); if (rec) sel.value = rec.id; sel.dataset.prev = sel.value; };
  const areaSelOpts = () => addFirst('+ زیادکردنی ناوچە', '+ Add new area').concat(D.areas.map((a) => ({ v: a.id, ku: a.ku, en: a.en })));
  const areaHTML = (sel, rec) => { sel.innerHTML = areaSelOpts().map((o) => `<option value="${o.v}">${T(o.ku, o.en || o.ku)}</option>`).join(''); if (rec) sel.value = rec.id; sel.dataset.prev = sel.value; };

  /* option helpers */
  const propOpts = (type) => D.properties.filter((p) => !type || p.type === type).map((p) => ({ v: p.id, ku: `${p.typeKu} ${p.number} — ${p.areaKu} (${p.price})`, en: `${p.typeEn} ${p.number} — ${p.areaEn} (${p.price})` }));
  const peopleOpts = () => D.contacts.concat(D.partners).map((c) => ({ v: c.id, ku: c.name, en: c.nameEn }));
  const PTYPES = [['land', 'زەوی', 'Land'], ['house', 'خانوو', 'House'], ['apartment', 'شوقە', 'Apartment'], ['building', 'بینا', 'Building'], ['shop', 'دوکان', 'Shop'], ['villa', 'ڤێلا', 'Villa']];

  /* ════════ FORM DEFINITIONS ════════ */
  const FORMS = {
    contact: (c = {}) => ({
      icon: 'contact', ku: c.id ? 'دەستکاری پەیوەندی' : 'زیادکردنی پەیوەندی', en: c.id ? 'Edit Contact' : 'Add Contact', subKu: c.id ? c.name : 'تۆمارێکی نوێی پەیوەندی', subEn: c.id ? c.nameEn : 'New contact record',
      saveKu: c.id ? 'نوێکردنەوە' : 'پاشەکەوتکردن', saveEn: c.id ? 'Update' : 'Save',
      fields: [
        { id: 'name', ku: 'ناو', en: 'Name', req: 1, value: c.name || '' }, { id: 'company', ku: 'کۆمپانیا', en: 'Company', value: (c.company && c.company !== 'تایبەت') ? c.company : '' },
        { id: 'phone', ku: 'تەلەفۆن', en: 'Phone', type: 'number', value: (c.phone && c.phone !== '—') ? c.phone : '' }, { id: 'email', ku: 'ئیمەیل', en: 'Email', value: (c.email && c.email !== '—') ? c.email : '' },
        { id: 'nid', ku: 'ژمارەی ناسنامە', en: 'National ID', ph: 'xxxxxxxxxx', value: c.nid || '' },
        { id: 'address', ku: 'ناونیشان', en: 'Address', value: (c.address && c.address !== 'هەولێر') ? c.address : '' },
      ],
      onSave: (v) => {
        if (c.id) { const ex = D.contacts.find((x) => x.id === c.id); if (ex) { Object.assign(ex, { name: v.name || ex.name, nameEn: v.name || ex.nameEn, company: v.company || 'تایبەت', companyEn: v.company || 'Individual', address: v.address || 'هەولێر', addressEn: v.address || 'Erbil', phone: v.phone || '—', email: v.email || '—', nid: v.nid || ex.nid || '' }); if (D.save) D.save(); window.APP.state.detail.contacts = ex.id; return ex; } }
        const rec = { id: 'C-' + String(D.contacts.length + 7).padStart(2, '0'), name: v.name || 'بێ ناو', nameEn: v.name || 'Unnamed', company: v.company || 'تایبەت', companyEn: v.company || 'Individual', address: v.address || 'هەولێر', addressEn: v.address || 'Erbil', phone: v.phone || '—', email: v.email || '—', nid: v.nid || '', transactions: 0, value: '$0', properties: 0, since: '٢٠٢٦', type: ['پەیوەندی', 'Contact'], isPartner: false, active: true };
        D.contacts.unshift(rec); if (D.save) D.save(); return rec;
      },
    }),
    partner: () => ({
      icon: 'users', ku: 'زیادکردنی هاوبەش', en: 'Add Partner', subKu: 'تۆمارێکی نوێی هاوبەش', subEn: 'New partner record',
      fields: [
        { id: 'name', ku: 'ناو', en: 'Name', req: 1 }, { id: 'company', ku: 'کۆمپانیا', en: 'Company' },
        { id: 'phone', ku: 'تەلەفۆن', en: 'Phone', type: 'number' }, { id: 'email', ku: 'ئیمەیل', en: 'Email' },
        { id: 'address', ku: 'ناونیشان', en: 'Address', col2: 1 },
        { id: 'type', ku: 'جۆر', en: 'Type', type: 'select', value: 'Partner', options: [{ v: 'Partner', ku: 'هاوبەش', en: 'Partner' }, { v: 'Investor', ku: 'وەبەرهێنەر', en: 'Investor' }] },
      ],
      onSave: (v) => {
        const tmap = { Partner: ['هاوبەش', 'Partner'], Investor: ['وەبەرهێنەر', 'Investor'] };
        const rec = { id: 'PT-' + String(D.partners.length + 7).padStart(2, '0'), name: v.name || 'بێ ناو', nameEn: v.name || 'Unnamed', company: v.company || '—', companyEn: v.company || '—', address: v.address || 'هەولێر', addressEn: v.address || 'Erbil', phone: v.phone || '—', email: v.email || '—', transactions: 0, value: '$0', properties: 0, since: '٢٠٢٦', type: tmap[v.type] };
        D.partners.unshift(rec); return rec;
      },
    }),
    area: () => ({
      icon: 'map', ku: 'زیادکردنی ناوچە', en: 'Add Area', subKu: 'ناوچەیەکی نوێ کە ئۆفیس کاری تێدا دەکات', subEn: 'A new area your office works in',
      fields: [
        { id: 'ku', ku: 'ناوی ناوچە (کوردی)', en: 'Area name (Kurdish)', req: 1 },
        { id: 'en', ku: 'ناوی ناوچە (ئینگلیزی)', en: 'Area name (English)' },
        { id: 'city', ku: 'شار', en: 'City', col2: 1, type: 'select', options: [{ v: 'هەولێر', ku: 'هەولێر', en: 'Erbil' }, { v: 'دهۆک', ku: 'دهۆک', en: 'Duhok' }, { v: 'سلێمانی', ku: 'سلێمانی', en: 'Sulaymaniyah' }] },
      ],
      onSave: (v) => { const rec = { id: 'AR-' + String(D.areas.length + 10), ku: v.ku || 'ناوچە', en: v.en || v.ku || 'Area', city: v.city || 'هەولێر', cityEn: v.city === 'دهۆک' ? 'Duhok' : (v.city === 'سلێمانی' ? 'Sulaymaniyah' : 'Erbil') }; D.areas.unshift(rec); return rec; },
    }),
    property: (p = {}) => ({
      icon: 'building-2', ku: p.id ? 'دەستکاری موڵک' : 'زیادکردنی موڵک', en: p.id ? 'Edit Property' : 'Add Property', subKu: p.id ? ('ژمارە ' + p.number) : 'موڵکێکی نوێ تۆمار بکە', subEn: p.id ? ('No. ' + p.number) : 'Register a new property', wide: 1,
      saveKu: p.id ? 'نوێکردنەوە' : 'پاشەکەوتکردن', saveEn: p.id ? 'Update' : 'Save', doneKu: p.id ? 'موڵک نوێکرایەوە' : 'موڵک زیادکرا', doneEn: p.id ? 'Property updated' : 'Property added',
      fields: [
        { id: 'ptype', ku: 'جۆری موڵک', en: 'Property type', type: 'select', value: p.type, options: PTYPES.map(([v, ku, en]) => ({ v, ku, en })) },
        { id: 'landdoc', ku: 'جۆری سەنەد (زەوی)', en: 'Document type (land)', type: 'select', value: p.landDoc || '', options: [{ v: '', ku: '— هەڵبژێرە —', en: '— Select —' }, { v: 'tapo', ku: 'سند', en: 'Tapo' }, { v: 'kart', ku: 'کارت', en: 'Kart' }] },
        { id: 'number', ku: 'ژمارەی فەرمی', en: 'Official number', type: 'text', req: 1, value: (p.number && p.number !== '—') ? p.number : '' },
        { id: 'area', ku: 'ناوچە', en: 'Area', type: 'select', value: (D.areas.find((a) => a.en === p.areaEn || a.ku === p.areaKu) || {}).id || '', options: [{ v: '', ku: '— هەڵبژێرە —', en: '— Select —' }, { v: '__add', ku: '+ زیادکردنی ناوچە', en: '+ Add new area' }].concat(D.areas.map((a) => ({ v: a.id, ku: a.ku, en: a.en }))) },
        { id: 'size', ku: 'ڕووبەر (م²)', en: 'Size (m²)', type: 'number', value: p.sizeEn ? (parseInt(p.sizeEn, 10) || '') : '' },
        { id: 'price', ku: 'نرخی تێچوو ($)', en: 'Cost price ($)', type: 'number', value: p.cost != null ? p.cost : (p.value || '') },
        { id: 'deliver', ku: 'بەرواری گەیاندن', en: 'Delivering date', type: 'date', ph: '2026/12/01', value: (p.deliverEn && p.deliverEn !== '—') ? p.deliverEn : '' },
        { id: 'note', ku: 'تێبینی', en: 'Note', type: 'textarea', col2: 1, value: p.note || '' },
      ],
      extra: `<div class="owners-block" style="margin-top:6px">
          <div class="lbl" style="display:flex;align-items:center;justify-content:space-between"><span data-en="Owners & shares">خاوەنەکان و بەش</span><span class="owners-total num" id="ownersTotal"></span></div>
          <div id="ownersWrap" style="display:flex;flex-direction:column;gap:8px;margin-top:8px"></div>
          <button type="button" class="btn btn-secondary btn-sm" id="addOwnerBtn" style="margin-top:10px"><i data-lucide="user-plus"></i><span data-en="Add owner">زیادکردنی خاوەن</span></button>
          <div class="owners-warn" id="ownersWarn" style="display:none;margin-top:8px;font-family:var(--font-arabic);font-size:12px;color:var(--status-unavailable)"><i data-lucide="alert-triangle" style="width:13px;height:13px;vertical-align:-2px"></i> <span data-en="Shares must add up to 100% before saving.">بەشەکان دەبێت کۆیان ١٠٠٪ بێت پێش پاشەکەوتکردن.</span></div>
        </div>`,
      setup: (ctx) => {
        chain(ctx.scrim, 'area', 'area', areaHTML);
        const pt = ctx.el('ptype'); const toggleDoc = () => ctx.setShow('landdoc', pt.value === 'land');
        pt.addEventListener('change', toggleDoc); toggleDoc();
        // ── multi-owner rows ──
        const wrap = ctx.scrim.querySelector('#ownersWrap');
        const totalEl = ctx.scrim.querySelector('#ownersTotal');
        const ownerOpts = () => [{ v: '', ku: '— هەڵبژێرە —', en: '— Select —' }, { v: '__add', ku: '+ زیادکردنی خاوەن نوێ', en: '+ Add new owner' }].concat(D.contacts.map((c) => ({ v: c.id, ku: c.name, en: c.nameEn })));
        function refreshTotal() {
          const shares = Array.from(wrap.querySelectorAll('.owner-share')).map((i) => Number(i.value) || 0);
          const sum = shares.reduce((a, b) => a + b, 0);
          totalEl.textContent = sum ? (T('کۆ', 'Total') + ': 100%') : '';
          totalEl.style.color = sum ? 'var(--status-available)' : 'var(--text-muted)';
          // live normalized hint per row
          wrap.querySelectorAll('.owner-row').forEach((row) => { const inp = row.querySelector('.owner-share'); const hint = row.querySelector('.owner-pct'); const v = Number(inp.value) || 0; hint.textContent = sum ? Math.round(v / sum * 1000) / 10 + '%' : ''; });
        }
        function addRow(ownerId, share) {
          const row = document.createElement('div'); row.className = 'owner-row'; row.style.cssText = 'display:flex;gap:8px;align-items:center';
          row.innerHTML = `<select class="select-ctl owner-sel" style="flex:1">${ownerOpts().map((o) => `<option value="${o.v}" ${o.v === ownerId ? 'selected' : ''}>${esc(T(o.ku, o.en || o.ku))}</option>`).join('')}</select>
            <input class="input-ctl num owner-share" type="number" min="0" placeholder="${T('بەش', 'Share')}" style="width:90px" value="${share != null ? share : ''}">
            <span class="owner-pct num" style="width:48px;font-size:12px;color:var(--gold-700);text-align:center"></span>
            <button type="button" class="owner-rm" title="${T('سڕینەوە', 'Remove')}" style="background:none;border:none;cursor:pointer;color:var(--status-unavailable);padding:4px"><i data-lucide="x"></i></button>`;
          wrap.appendChild(row);
          const sel = row.querySelector('.owner-sel'); sel.dataset.prev = sel.value;
          sel.addEventListener('change', () => {
            if (sel.value === '__add') { const prev = sel.dataset.prev || ''; sel.value = prev; openForm('contact', (rec) => { if (rec) { wrap.querySelectorAll('.owner-sel').forEach((s) => { const keep = s.value; s.innerHTML = ownerOpts().map((o) => `<option value="${o.v}">${esc(T(o.ku, o.en || o.ku))}</option>`).join(''); s.value = keep; }); sel.value = rec.id; sel.dataset.prev = rec.id; } }); return; }
            sel.dataset.prev = sel.value;
          });
          row.querySelector('.owner-share').addEventListener('input', refreshTotal);
          row.querySelector('.owner-rm').addEventListener('click', () => { row.remove(); refreshTotal(); });
          if (window.lucide) lucide.createIcons();
          refreshTotal();
        }
        ctx.scrim.querySelector('#addOwnerBtn').addEventListener('click', () => addRow('', ''));
        const init = (p.owners && p.owners.length) ? p.owners : (p.ownerId ? [{ id: p.ownerId, share: 100 }] : [{ id: '', share: 100 }]);
        init.forEach((o) => addRow(o.id, o.share));
        // validate on save
        ctx._validate = () => {
          const rows = Array.from(wrap.querySelectorAll('.owner-row'));
          const picked = rows.map((r) => ({ id: r.querySelector('.owner-sel').value, share: Number(r.querySelector('.owner-share').value) || 0 })).filter((o) => o.id && o.share > 0);
          const sum = picked.reduce((a, b) => a + b.share, 0);
          const ok = picked.length > 0 && sum > 0;
          ctx.scrim.querySelector('#ownersWarn').style.display = ok ? 'none' : 'block';
          return ok ? picked.map((o) => ({ id: o.id, share: Math.round(o.share / sum * 1000) / 10 })) : null;
        };
      },
      validate: (ctx) => ctx._validate && ctx._validate(),
      onSave: (v, extra) => {
        const owners = (extra && extra.owners) || [];
        const pt = PTYPES.find((x) => x[0] === v.ptype) || PTYPES[0];
        const icon = { land: 'trees', house: 'home', apartment: 'building-2', building: 'building', shop: 'store', villa: 'home' }[v.ptype];
        const ar = D.areas.find((a) => a.id === v.area);
        const owner = D.contacts.find((c) => c.id === (owners[0] && owners[0].id));
        const anyBk = owners.some((o) => D.isBkOwner(o.id));
        const source = anyBk ? ['کۆمپانیا', 'Company'] : ['کڕیار/خاوەن', 'Owner'];
        const rec = { id: p.id || ('P-' + (v.number || Date.now())), type: v.ptype, icon, typeKu: pt[1], typeEn: pt[2], number: v.number || '—', areaKu: ar ? ar.ku : (v.area || 'هەولێر'), areaEn: ar ? ar.en : 'Erbil', size: (v.size || '—') + ' م²', sizeEn: (v.size || '—') + ' m²', price: money(v.price), value: Number(v.price) || 0, cost: Number(v.price) || 0, status: p.status || 'available', purpose: p.purpose || ['فرۆشتن', 'Sale'], deliver: v.deliver || '—', deliverEn: v.deliver || '—', owners, partner: owner ? owner.name : '—', partnerEn: owner ? owner.nameEn : '—', ownerId: owners[0] ? owners[0].id : '', source, landDoc: v.ptype === 'land' ? v.landdoc : '', lat: p.lat || '36.19° N', lng: p.lng || '44.01° E', note: v.note || '', noteEn: v.note || '' };
        if (p.id) { const i = D.properties.findIndex((x) => x.id === p.id); if (i > -1) { D.properties[i] = Object.assign(D.properties[i], rec); if (D.save) D.save(); return D.properties[i]; } }
        D.properties.unshift(rec); if (D.save) D.save(); return rec;
      },
    }),
    payment: () => ({
      icon: 'wallet', ku: 'تۆمارکردنی پارەدان', en: 'Record Payment', subKu: 'پارەی هاتوو یان دەرچوو', subEn: 'Money in or out',
      fields: [
        { id: 'dir', ku: 'ئاراستە', en: 'Direction', type: 'select', options: [{ v: 'in', ku: 'هاتوو', en: 'Money in' }, { v: 'out', ku: 'دەرچوو', en: 'Money out' }] },
        { id: 'amount', ku: 'بڕ ($)', en: 'Amount ($)', type: 'number', req: 1 },
        { id: 'party', ku: 'لایەن', en: 'Party', type: 'select', options: peopleOpts(), col2: 1 },
        { id: 'method', ku: 'شێوازی پارەدان', en: 'Method', type: 'select', options: [{ v: 'Cash', ku: 'کاش', en: 'Cash' }, { v: 'Transfer', ku: 'حەواڵە', en: 'Transfer' }, { v: 'Cheque', ku: 'چەک', en: 'Cheque' }] },
        { id: 'date', ku: 'بەروار', en: 'Date', type: 'date', value: '2026/06/09' },
        { id: 'ref', ku: 'پەیوەست بە', en: 'Related to', col2: 1, ph: 'گرێبەست / موڵک' },
      ],
      onSave: (v) => {
        const dmap = { in: ['پارەی وەرگیراو', 'Received'], out: ['پارەدان', 'Payment'] };
        const mmap = { Cash: ['کاش', 'Cash'], Transfer: ['حەواڵە', 'Transfer'], Cheque: ['چەک', 'Cheque'] };
        const pp = D.contacts.concat(D.partners).find((x) => x.id === v.party) || { name: '—', nameEn: '—' };
        D.payments.unshift({ id: 'PY-' + String(522 + D.payments.length).padStart(4, '0'), dir: v.dir, type: dmap[v.dir], party: pp.name, partyEn: pp.nameEn, amount: money(v.amount), value: Number(v.amount) || 0, date: v.date || '٢٠٢٦/٠٦/٠٩', dateEn: v.date || '2026/06/09', method: mmap[v.method], status: 'signed', ref: v.ref || '—', refEn: v.ref || '—' });
      },
    }),
    contract: (p = {}, mod = 'contracts') => ({
      icon: 'file-signature', ku: mod === 'agreements' ? 'ڕێککەوتنی نوێ' : 'گرێبەستی نوێ', en: mod === 'agreements' ? 'New Agreement' : 'New Contract', subKu: p.id ? ('موڵک: ' + p.typeKu + ' ' + p.number) : (mod === 'agreements' ? 'ڕێککەوتنی خێرای ناوخۆیی' : 'گرێبەستی فەرمیی سۆرانی'), subEn: p.id ? ('Property: ' + p.typeEn + ' ' + p.number) : (mod === 'agreements' ? 'Quick internal agreement' : 'Official Sorani contract'), wide: 1,
      fields: [
        { id: 'kind', ku: 'جۆری گرێبەست', en: 'Contract type', type: 'select', value: p.purpose && p.purpose[1] === 'Rent' ? 'rent' : 'sale', options: [{ v: 'sale', ku: 'فرۆشتن', en: 'Sale' }, { v: 'rent', ku: 'کرێ', en: 'Rent' }] },
        { id: 'property', ku: 'موڵک', en: 'Property', type: 'select', col2: 1, value: p.id || '', options: [{ v: '', ku: '— موڵک هەڵبژێرە —', en: '— Select property —' }, { v: '__add', ku: '+ زیادکردنی موڵکی نوێ', en: '+ Add new property' }].concat(propOpts()) },
        { id: 'first', ku: 'لایەنی یەکەم (فرۆشیار/خاوەن)', en: 'First party (seller/owner)', type: 'select', value: p.ownerId || '', options: addFirst('+ زیادکردنی پەیوەندی', '+ Add new contact').concat(D.contacts.map((c) => ({ v: c.id, ku: c.name, en: c.nameEn }))) },
        { id: 'firstPhone', ku: 'مۆبایلی لایەنی یەکەم', en: 'First party phone', ph: '07xx xxx xxxx' },
        { id: 'firstNid', ku: 'ژمارەی ناسنامەی یەکەم', en: 'First party national ID', ph: 'xxxxxxxxxx' },
        { id: 'second', ku: 'لایەنی دووەم (کڕیار)', en: 'Second party (buyer)', type: 'select', value: '', options: addFirst('+ زیادکردنی پەیوەندی', '+ Add new contact').concat(D.contacts.map((c) => ({ v: c.id, ku: c.name, en: c.nameEn }))) },
        { id: 'secondPhone', ku: 'مۆبایلی لایەنی دووەم', en: 'Second party phone', ph: '07xx xxx xxxx' },
        { id: 'secondNid', ku: 'ژمارەی ناسنامەی دووەم', en: 'Second party national ID', ph: 'xxxxxxxxxx' },
        { id: 'price', ku: 'نرخی فرۆشتن ($)', en: 'Sale price ($)', type: 'number', ph: 'دابنێ' }, { id: 'advance', ku: 'پارەی پێشەکی ($)', en: 'Advance ($)', type: 'number' },
        { id: 'commission', ku: 'بڕی کۆمسیۆن ($)', en: 'Commission amount ($)', type: 'number', ph: 'دابنێ' },
        { id: 'cdate', ku: 'بەرواری گرێبەست', en: 'Contract date', type: 'date', value: '2026/06/16' },
        { id: 'deliver', ku: 'بەرواری گەیاندن', en: 'Delivering date', type: 'date', ph: '2026/12/01', value: (p.deliverEn && p.deliverEn !== '—') ? p.deliverEn : '' },
        { id: 'witness1', ku: 'شاهیدی یەکەم', en: 'First witness', ph: 'ناوی شاهید', value: 'محمد كەیفی ئەنوەر' },
        { id: 'witness2', ku: 'شاهیدی دووەم', en: 'Second witness', ph: 'ناوی شاهید', value: 'بالێن سێودین ئەحمەد' },
        { id: 'docs', ku: 'بەڵگەنامەکان', en: 'Attachments', type: 'file', col2: 1 },
      ],
      setup: (ctx) => {
        // property field: allow inline add
        const ps = ctx.el('property');
        if (ps) { ps.dataset.prev = ps.value; ps.addEventListener('change', () => { if (ps.value === '__add') { const prev = ps.dataset.prev || ''; ps.value = prev; openForm('property', (rec) => { if (rec) { const o = document.createElement('option'); o.value = rec.id; o.textContent = T(`${rec.typeKu} ${rec.number}`, `${rec.typeEn} ${rec.number}`); ps.appendChild(o); ps.value = rec.id; ps.dataset.prev = rec.id; } }); return; } ps.dataset.prev = ps.value; }); }
        const fillParty = (which) => {
          const id = ctx.get(which); const c = D.contacts.find((x) => x.id === id);
          if (c) { const ph = ctx.el(which + 'Phone'), nd = ctx.el(which + 'Nid'); if (ph && c.phone && c.phone !== '—') ph.value = c.phone; if (nd && c.nid) nd.value = c.nid; }
        };
        ['first', 'second'].forEach((w) => {
          const sel = ctx.el(w); if (!sel) return; sel.dataset.prev = sel.value;
          sel.addEventListener('change', () => {
            if (sel.value === '__add') { const prev = sel.dataset.prev || ''; sel.value = prev; openForm('contact', (rec) => { if (rec) { ownerLikeRefill(sel, rec); fillParty(w); } }); return; }
            sel.dataset.prev = sel.value; fillParty(w);
          });
          if (sel.value) fillParty(w);
        });
        function ownerLikeRefill(sel, rec) { const opts = addFirst('+ زیادکردنی پەیوەندی', '+ Add new contact').concat(D.contacts.map((c) => ({ v: c.id, ku: c.name, en: c.nameEn }))); sel.innerHTML = opts.map((o) => `<option value="${o.v}">${T(o.ku, o.en || o.ku)}</option>`).join(''); sel.value = rec.id; sel.dataset.prev = rec.id; }
      },
      onSave: (v) => {
        const prop = D.properties.find((pp) => pp.id === v.property) || D.properties[0];
        const isAg = mod === 'agreements';
        const store = isAg ? D.agreements : D.contracts;
        const id = isAg ? ('EA-' + String(419 + D.agreements.length)) : String(36 + D.contracts.length).padStart(5, '0');
        const c1 = D.contacts.find((x) => x.id === v.first), c2 = D.contacts.find((x) => x.id === v.second);
        // write national IDs back to the contacts if entered
        if (c1 && v.firstNid) c1.nid = v.firstNid;
        if (c2 && v.secondNid) c2.nid = v.secondNid;
        if (c1 && v.firstPhone && (!c1.phone || c1.phone === '—')) c1.phone = v.firstPhone;
        if (c2 && v.secondPhone && (!c2.phone || c2.phone === '—')) c2.phone = v.secondPhone;
        const n1 = c1 ? c1.name : (v.first || ''), n2 = c2 ? c2.name : (v.second || '');
        const adv = Number(v.advance) || 0;
        const cdate = v.cdate || '2026/06/16';
        store.unshift({ id, type: isAg ? (v.kind === 'rent' ? ['ڕێککەوتنی کرێ', 'Rent agreement'] : ['ڕێککەوتنی فرۆشتن', 'Sale agreement']) : (v.kind === 'rent' ? ['گرێبەستی کرێ', 'Rent contract'] : ['گرێبەستی فرۆشتن', 'Sale contract']), kind: v.kind, propType: [prop.typeKu, prop.typeEn], landDoc: prop.landDoc || '', propNumber: prop.number, areaKu: prop.areaKu, areaEn: prop.areaEn, deliver: v.deliver || prop.deliver, deliverEn: v.deliver || prop.deliverEn, date: cdate, dateEn: cdate, first: n1, firstEn: n1, firstRes: c1 ? c1.address : 'هەولێر', firstPhone: v.firstPhone || (c1 ? c1.phone : ''), firstNid: v.firstNid || (c1 ? c1.nid : ''), second: n2, secondEn: n2, secondRes: c2 ? c2.address : 'هەولێر', secondPhone: v.secondPhone || (c2 ? c2.phone : ''), secondNid: v.secondNid || (c2 ? c2.nid : ''), witness1: v.witness1 || 'محمد كەیفی ئەنوەر', witness2: v.witness2 || 'بالێن سێودین ئەحمەد', price: money(v.price), priceVal: Number(v.price) || 0, advance: money(v.advance), commission: '1%', commValue: Number(v.commission) || 0, status: 'draft', payments: adv ? [{ id: 'CP-' + id, date: '2026/06/09', amount: adv, note: 'پارەی پێشەکی', noteEn: 'Down payment' }] : [] });
        if (adv) D.payments.unshift({ id: 'PY-' + String(522 + D.payments.length).padStart(4, '0'), dir: 'in', type: ['پارەی پێشەکی', 'Down payment'], party: n2, partyEn: n2, amount: money(adv), value: adv, date: '٢٠٢٦/٠٦/٠٩', dateEn: '2026/06/09', method: ['کاش', 'Cash'], status: 'signed', ref: (isAg ? 'ڕێککەوتن ' : 'گرێبەست ') + id, refEn: (isAg ? 'Agreement ' : 'Contract ') + id });
        if (D.save) D.save();
        window.APP.state.detail[mod] = id; // open it
      },
    }),
    agreement: () => FORMS.contract({}, 'agreements'),
  };

  /* ════════ CREATE DEAL (dynamic: type → properties, own→profit / else→commission) ════════ */
  function openDeal() {
    modal({
      icon: 'handshake', ku: 'دروستکردنی مامەڵە', en: 'Create Deal', subKu: 'فرۆشتن یان کرێ — لەگەڵ کۆمسیۆن/قازانج', subEn: 'Sale or rent — with commission/profit', wide: 1,
      fields: [
        { id: 'dkind', ku: 'جۆری مامەڵە', en: 'Deal type', type: 'select', options: [{ v: 'sale', ku: 'فرۆشتن', en: 'Sale' }, { v: 'rent', ku: 'کرێ', en: 'Rent' }] },
        { id: 'ptype', ku: 'جۆری موڵک', en: 'Property type', type: 'select', options: PTYPES.map(([v, ku, en]) => ({ v, ku, en })) },
        { id: 'property', ku: 'موڵک (لە سیستەم)', en: 'Property (from system)', type: 'select', col2: 1, options: [{ v: '', ku: '— موڵک هەڵبژێرە —', en: '— Select property —' }] },
        { id: 'owninfo', ku: 'خاوەندارێتی', en: 'Ownership', type: 'text', col2: 1, value: '', show: false },
        { id: 'seller', ku: 'فرۆشیار (خاوەنی موڵک)', en: 'Seller (property owner)', type: 'text', col2: 1, value: '' },
        { id: 'buyer', ku: 'کڕیار / بەکرێگر', en: 'Buyer / Tenant', type: 'select', options: peopleOpts() },
        { id: 'price', ku: 'نرخی فرۆشتن/کرێ ($)', en: 'Sale/Rent price ($)', type: 'number', req: 1 },
        { id: 'cost', ku: 'تێچووی موڵک ($)', en: 'Property cost ($)', type: 'number' },
        { id: 'commission', ku: 'کۆمسیۆن ($)', en: 'Commission ($)', type: 'number', value: '' },
      ],
      extra: `<div style="margin-top:18px" id="dealCalcWrap"></div>`,
      saveKu: 'دروستکردنی مامەڵە', saveEn: 'Create deal', doneKu: 'مامەڵە دروستکرا', doneEn: 'Deal created',
      setup: (ctx) => {
        const { scrim, get, setShow, el } = ctx;
        const ptSel = el('ptype'), propSel = el('property');
        const wrap = scrim.querySelector('#dealCalcWrap');
        function ownerOf(pid) { const p = D.properties.find((x) => x.id === pid); return p && p.source && p.source[1] === 'Company'; }
        function repopProps(selId) {
          const t = get('ptype');
          const opts = D.properties.filter((p) => p.type === t);
          propSel.innerHTML = `<option value="">— ${T('موڵک هەڵبژێرە', 'Select property')} —</option><option value="__add">+ ${T('زیادکردنی موڵکی نوێ', 'Add new property')}</option>` + opts.map((p) => `<option value="${p.id}">${T(p.typeKu, p.typeEn)} ${p.number} — ${T(p.areaKu, p.areaEn)} (${p.price})</option>`).join('');
          if (selId) propSel.value = selId;
          recalc();
        }
        function recalc() {
          const pid = get('property');
          const ours = ownerOf(pid);
          setShow('cost', ours);
          const price = Number(get('price')) || 0;
          const cost = Number(get('cost')) || 0;
          const comm = Number(get('commission')) || 0;
          const owner = D.properties.find((x) => x.id === pid);
          const sf = el('seller');
          if (sf) { sf.setAttribute('readonly', 'readonly'); sf.value = owner ? (ours ? T('بناری کۆدۆ (موڵکی خۆمان)', 'Bnari Kodo (own property)') : (owner.partner && owner.partner !== '—' ? owner.partner : T('خاوەنی دەرەکی', 'External owner'))) : ''; }
          const ownLabel = ours ? T('موڵکی کۆمپانیا — قازانج دەژمێردرێت', 'Company-owned — profit is calculated') : T('موڵکی هاوبەش/کڕیار — تەنها کۆمسیۆن', 'Partner/owner — commission only');
          if (ours) {
            const profit = price - cost;
            wrap.innerHTML = `<div class="calc-box"><span class="cb-l">${T('قازانجی کۆمپانیا (نرخ − تێچوو)', 'Company profit (price − cost)')}</span><span class="cb-v green">${money(profit)}</span></div>
              <div class="calc-box commission" style="margin-top:8px"><span class="cb-l">${T('کۆمسیۆن', 'Commission')}</span><span class="cb-v">${money(comm)}</span></div>
              <div style="font-family:var(--font-arabic);font-size:11.5px;color:var(--text-muted);margin-top:8px"><i data-lucide="info" style="width:13px;height:13px;vertical-align:-2px"></i> ${ownLabel}</div>`;
          } else {
            wrap.innerHTML = `<div class="calc-box commission"><span class="cb-l">${T('کۆمسیۆنی کۆمپانیا', 'Company commission')}</span><span class="cb-v">${money(comm)}</span></div>
              <div style="font-family:var(--font-arabic);font-size:11.5px;color:var(--text-muted);margin-top:8px"><i data-lucide="info" style="width:13px;height:13px;vertical-align:-2px"></i> ${ownLabel}</div>`;
          }
          if (window.lucide) lucide.createIcons();
        }
        ptSel.addEventListener('change', () => repopProps());
        propSel.addEventListener('change', () => {
          if (propSel.value === '__add') {
            propSel.value = '';
            openForm('property', (rec) => { if (rec) { ptSel.value = rec.type; repopProps(rec.id); } });
            return;
          }
          recalc();
        });
        ['price', 'cost', 'commission'].forEach((id) => el(id).addEventListener('input', recalc));
        repopProps();
      },
      onSave: (v) => {
        const prop = D.properties.find((p) => p.id === v.property);
        const buyer = D.contacts.concat(D.partners).find((x) => x.id === v.buyer) || { name: '—', nameEn: '—' };
        const ours = prop && prop.source && prop.source[1] === 'Company';
        const price = Number(v.price) || 0, cost = Number(v.cost) || 0;
        const comm = Number(v.commission) || 0;
        D.transactions.unshift({
          id: 'TX-' + (1043 + D.transactions.length), kind: v.dkind, type: v.dkind === 'rent' ? ['کرێ', 'Rent'] : ['فرۆشتن', 'Sale'], icon: v.dkind === 'rent' ? 'key' : 'tag',
          prop: prop ? prop.typeKu + ' ' + prop.number : '—', propEn: prop ? prop.typeEn + ' ' + prop.number : '—', party: buyer.name, partyEn: buyer.nameEn,
          amount: money(price), value: price, date: '٢٠٢٦/٠٦/٠٩', dateEn: '2026/06/09', status: 'process', stage: ['لە پرۆسەدا', 'In process'],
          seller: v.seller || '—', sellerEn: v.seller || '—',
          commission: money(comm), profit: ours ? money(price - cost) : '—', owned: !!ours,
        });
      },
    });
  }
  APP.openDeal = openDeal;
  APP.editContact = function (id) { const c = D.contacts.find((x) => x.id === id); if (c) modal(FORMS.contact(c)); };

  /* ════════ EDIT CONTRACT (prefill from existing record, update in place) ════════ */
  APP.editContract = function (id) {
    const c = D.contracts.find((x) => x.id === id) || D.agreements.find((x) => x.id === id);
    if (!c) return;
    const mod = D.contracts.indexOf(c) > -1 ? 'contracts' : 'agreements';
    const numOf = (s) => String(s == null ? '' : s).replace(/[^0-9.]/g, '');
    modal({
      icon: 'file-signature', ku: 'دەستکاری گرێبەست', en: 'Edit Contract', subKu: 'No. ' + c.id, subEn: 'No. ' + c.id, wide: 1,
      saveKu: 'نوێکردنەوە', saveEn: 'Update', doneKu: 'گرێبەست نوێکرایەوە', doneEn: 'Contract updated',
      fields: [
        { id: 'kind', ku: 'جۆری گرێبەست', en: 'Contract type', type: 'select', value: c.kind, options: [{ v: 'sale', ku: 'فرۆشتن', en: 'Sale' }, { v: 'rent', ku: 'کرێ', en: 'Rent' }] },
        { id: 'status', ku: 'دۆخ', en: 'Status', type: 'select', value: c.status, options: [{ v: 'draft', ku: 'ڕەشنووس', en: 'Draft' }, { v: 'process', ku: 'لە پرۆسەدا', en: 'In process' }, { v: 'signed', ku: 'واژۆکراو', en: 'Signed' }, { v: 'cancelled', ku: 'هەڵوەشاوە', en: 'Cancelled' }] },
        { id: 'first', ku: 'لایەنی یەکەم', en: 'First party', value: c.first },
        { id: 'firstPhone', ku: 'مۆبایلی یەکەم', en: 'First phone', value: c.firstPhone || '' },
        { id: 'firstNid', ku: 'ناسنامەی یەکەم', en: 'First national ID', value: c.firstNid || '' },
        { id: 'second', ku: 'لایەنی دووەم', en: 'Second party', value: c.second },
        { id: 'secondPhone', ku: 'مۆبایلی دووەم', en: 'Second phone', value: c.secondPhone || '' },
        { id: 'secondNid', ku: 'ناسنامەی دووەم', en: 'Second national ID', value: c.secondNid || '' },
        { id: 'price', ku: 'نرخ ($)', en: 'Price ($)', type: 'number', value: numOf(c.price) },
        { id: 'advance', ku: 'پێشەکی ($)', en: 'Advance ($)', type: 'number', value: numOf(c.advance) },
        { id: 'commission', ku: 'بڕی کۆمسیۆن ($)', en: 'Commission amount ($)', type: 'number', value: c.commValue != null ? c.commValue : '' },
        { id: 'deliver', ku: 'بەرواری گەیاندن', en: 'Delivering date', type: 'date', value: c.deliverEn || '' },
        { id: 'witness1', ku: 'شاهیدی یەکەم', en: 'First witness', value: c.witness1 || '' },
        { id: 'witness2', ku: 'شاهیدی دووەم', en: 'Second witness', value: c.witness2 || '' },
      ],
      onSave: (v) => {
        Object.assign(c, {
          kind: v.kind, type: v.kind === 'rent' ? ['گرێبەستی کرێ', 'Rent contract'] : ['گرێبەستی فرۆشتن', 'Sale contract'],
          status: v.status, first: v.first, firstEn: v.first, firstPhone: v.firstPhone, firstNid: v.firstNid,
          second: v.second, secondEn: v.second, secondPhone: v.secondPhone, secondNid: v.secondNid,
          price: money(v.price), advance: money(v.advance), commission: '1%', commValue: Number(v.commission) || 0,
          deliver: v.deliver || c.deliver, deliverEn: v.deliver || c.deliverEn,
          witness1: v.witness1, witness2: v.witness2,
        });
        if (D.save) D.save();
        window.APP.state.detail[mod] = c.id;
      },
    });
  };

  /* ════════ click wiring ════════ */
  document.addEventListener('click', (e) => {
    const pe = e.target.closest('[data-pedit]');
    if (pe) { e.preventDefault(); const pr = D.properties.find((x) => x.id === pe.dataset.pedit); modal(FORMS.property(pr || {})); return; }
    const cc = e.target.closest('[data-ccontract]');
    if (cc) { e.preventDefault(); const pr = D.properties.find((x) => x.id === cc.dataset.ccontract); modal(FORMS.contract(pr || {})); return; }
    const b = e.target.closest('[data-form]');
    if (b) { e.preventDefault(); const key = b.dataset.form; if (key === 'deal') openDeal(); else if (FORMS[key]) modal(FORMS[key]()); return; }
  });
})();
