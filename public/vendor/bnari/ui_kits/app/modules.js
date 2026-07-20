/* Bnari Kodo — app modules: row-list → detail views, + Expenses CRUD.
   Reassigns window.VIEWS entries (loaded after views.js). Reads window.DATA. */
(function () {
  const D = window.DATA;
  const V = window.VIEWS;
  window.APP = window.APP || {};
  const S = window.APP.state = { detail: {}, expForm: null, filter: {} };
  const chipBar = (mod, items) => { const cur = S.filter[mod] || ''; return `<div class="filters">${items.map(([v, ku, en]) => `<button class="chip ${cur === v ? 'active' : ''}" data-pf="${mod}:${v}">${bi(ku, en)}</button>`).join('')}</div>`; };
  const emptyRow = () => '<div style="padding:44px;text-align:center;font-family:var(--font-arabic);color:var(--text-muted)">هیچ تۆمارێک نییە / No records</div>';

  /* ── helpers ── */
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bi = (ku, en) => `<span data-en="${esc(en)}">${ku}</span>`;
  const money = (v) => '$' + Number(v).toLocaleString('en-US');
  const toSlashD = (s) => { if (!s) return '—'; const m = String(s).match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/); return m ? `${m[1]}/${m[2].padStart(2, '0')}/${m[3].padStart(2, '0')}` : String(s); };
  const accById = (id) => D.accounts.find((a) => a.id === id) || { ku: id, en: id, icon: 'circle' };

  const STAT = {
    available: ['بەردەست', 'Available'], reserved: ['ڕیزێرڤ', 'Reserved'], process: ['لە پرۆسەدا', 'In process'],
    closed: ['داخراو', 'Closed'], signed: ['واژۆکراو', 'Signed'], draft: ['ڕەشنووس', 'Draft'],
    converted: ['گۆڕدراو', 'Converted'], cancelled: ['هەڵوەشاوە', 'Cancelled'], unavailable: ['ناتوانرێت', 'Unavailable'],
    unbilled: ['تۆمارکراو', 'Unbilled'], billed: ['پسوڵەکراو', 'Billed'], reimbursable: ['گەڕاندنەوە', 'Reimbursable'], inactive: ['ناچالاک', 'Inactive'],
  };
  const EXP_BADGE = { unbilled: 'process', billed: 'available', reimbursable: 'reserved' };
  function badge(st, cls) {
    const s = STAT[st] || [st, st];
    return `<span class="badge ${cls || st}"><span class="d"></span>${bi(s[0], s[1])}</span>`;
  }

  const backBtn = (view, ku, en, sub, subEn, actions) => `
    <div class="detail-top">
      <button class="back-btn" data-back="${view}" title="گەڕانەوە"><i data-lucide="arrow-right"></i></button>
      <div class="dt-title"><h2>${bi(ku, en)}</h2>${sub ? `<div class="sub">${bi(sub, subEn)}</div>` : ''}</div>
      <div class="head-actions">${actions || ''}</div>
    </div>`;

  const kv = (ku, en, val, ic, imp) => `
    <div class="kv ${imp ? 'imp' : ''}"><div class="k">${ic ? `<i data-lucide="${ic}"></i>` : ''}${bi(ku, en)}</div><div class="v">${val}</div></div>`;

  const sectionTitle = (ku, en, ic) => `<div class="sec-title">${ic ? `<i data-lucide="${ic}"></i>` : ''}${bi(ku, en)}</div>`;

  /* avatar initials */
  const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

  /* ════════════════════ PROPERTIES ════════════════════ */
  function propRow(p) {
    return `<div class="lrow" data-open="properties:${p.id}">
      <span class="lrow-ic"><i data-lucide="${p.icon}"></i></span>
      <div class="lrow-main">
        <div class="lrow-t">${bi(p.typeKu, p.typeEn)} <span class="official-num">No. ${p.number}</span></div>
        <div class="lrow-sub"><i data-lucide="map-pin"></i>${bi(p.areaKu, p.areaEn)} · ${bi(p.purpose[0], p.purpose[1])} · ${bi(p.size, p.sizeEn)}</div>
      </div>
      <div class="lrow-col hide-sm"><div class="lc-k">${bi('هاوبەش', 'Partner')}</div><div class="lc-v">${bi(p.partner, p.partnerEn)}</div></div>
      <div class="lrow-col hide-sm"><div class="lc-k">${bi('گەیاندن', 'Delivery')}</div><div class="lc-v num">${bi(p.deliver, p.deliverEn)}</div></div>
      <div class="lrow-price" data-plabel="نرخ" data-plabel-en="Price">${p.price}</div>
      ${badge(p.status)}
      <i class="lrow-go" data-lucide="chevron-left"></i>
    </div>`;
  }
  function propList() {
    const counts = { all: D.properties.length };
    return `
      <div class="page-head">
        <div><h2 data-en="Properties">موڵکەکان</h2><div class="sub" data-en="${counts.all} properties · company, partner & owner sources">${D.properties.length} موڵک · سەرچاوەی کۆمپانیا، هاوبەش و خاوەن</div></div>
        <div class="head-actions">
          <button class="btn btn-secondary btn-sm"><i data-lucide="sliders-horizontal"></i><span data-en="Filter">فلتەر</span></button>
          <button class="btn btn-gold btn-sm" data-form="property"><i data-lucide="plus"></i><span data-en="Add property">زیادکردنی موڵک</span></button>
        </div>
      </div>
      <div class="toolbar" style="flex-direction:column;align-items:stretch;gap:10px">
        ${chipBar('properties', [['', 'هەموو', 'All'], ['land', 'زەوی', 'Land'], ['house', 'خانوو', 'House'], ['apartment', 'شوقە', 'Apartment'], ['building', 'بینا', 'Building'], ['shop', 'دوکان', 'Shop'], ['villa', 'ڤێلا', 'Villa']])}
        ${chipBar('pstatus', [['', 'هەموو', 'All'], ['available', 'بەردەست', 'Available'], ['reserved', 'ڕیزێرڤ', 'Reserved'], ['process', 'لە پرۆسە', 'In process'], ['closed', 'داخراو', 'Closed'], ['inactive', 'ناچالاک', 'Inactive']])}
      </div>
      <div class="card list">${D.properties.filter((p) => {
        if (S.filter.properties && p.type !== S.filter.properties) return false;
        const fs = S.filter.pstatus || '';
        if (fs === 'inactive') return p.status === 'inactive';
        if (!fs) return p.status !== 'inactive';
        return p.status === fs;
      }).map(propRow).join('') || emptyRow()}</div>`;
  }
  function propDetail(id) {
    const p = D.properties.find((x) => x.id === id) || D.properties[0];
    return `
      ${backBtn('properties', `${p.typeKu} — ژمارە ${p.number}`, `${p.typeEn} — No. ${p.number}`, `${p.areaKu} · ${p.purpose[0]}`, `${p.areaEn} · ${p.purpose[1]}`,
        `<button class="btn btn-secondary btn-sm" data-pedit="${p.id}"><i data-lucide="pencil"></i><span data-en="Edit">دەستکاری</span></button>
         <button class="btn btn-gold btn-sm" data-ccontract="${p.id}"><i data-lucide="file-signature"></i><span data-en="Create contract">دروستکردنی گرێبەست</span></button>
         <button class="btn btn-ghost btn-sm ${p.status === 'inactive' ? '' : 'danger'}" data-pinactive="${p.id}"><i data-lucide="${p.status === 'inactive' ? 'rotate-ccw' : 'archive'}"></i><span data-en="${p.status === 'inactive' ? 'Reactivate' : 'Set inactive'}">${p.status === 'inactive' ? 'چالاککردنەوە' : 'ناچالاککردن'}</span></button>`)}
      <div class="detail-grid">
        <div>
          <div class="card card-pad" style="margin-bottom:16px">
            ${sectionTitle('زانیاری بنەڕەتی', 'Basic info', 'info')}
            <div class="field-grid">
              ${kv('جۆری موڵک','Property type', bi(p.typeKu,p.typeEn), p.icon)}
              ${kv('ژمارەی فەرمی','Official number', `<span class="official-num">No. ${p.number}</span>`, 'hash', 1)}
              ${kv('ناوچە','Area', bi(p.areaKu,p.areaEn), 'map-pin')}
              ${kv('ڕووبەر','Size', bi(p.size,p.sizeEn), 'ruler')}
              ${kv('نرخی تێچوو','Cost price', `<span class="price">${p.price}</span>`, 'tag', 1)}
              ${kv('مەبەست','Purpose', bi(p.purpose[0],p.purpose[1]), 'target')}
              ${kv('سەرچاوە','Source', bi(p.source[0],p.source[1]), 'user-round')}
              ${kv('بەرواری گەیاندن','Delivering date', `<span class="num">${bi(p.deliver,p.deliverEn)}</span>`, 'calendar-clock', 1)}
              ${p.landDoc ? kv('جۆری سەنەد','Document type', bi(p.landDoc==='tapo'?'سند':'کارت', p.landDoc==='tapo'?'Tapo':'Kart'), 'file-badge', 1) : ''}
            </div>
            ${(p.owners && p.owners.length) ? `<div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border-subtle)">${sectionTitle('خاوەنەکان و بەش','Owners & shares','users')}<div class="mini-list">${p.owners.map((o) => { const ct = D.contacts.find((c) => c.id === o.id) || { name: o.id, nameEn: o.id }; return `<div class="mini-row" data-open="contacts:${o.id}"><span class="avatar" style="width:34px;height:34px;font-size:12px">${initials(ct.name)}</span><div class="mini-main"><div class="mini-t">${bi(ct.name, ct.nameEn)} ${D.isBkOwner(o.id) ? '<span class="tag gold">بناری کۆدۆ</span>' : ''}</div></div><span class="price num">${o.share}%</span><i data-lucide="chevron-left" class="lrow-go"></i></div>`; }).join('')}</div></div>` : ''}
            <div class="kv" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--border-subtle)"><div class="k"><i data-lucide="sticky-note"></i>${bi('تێبینی','Note')}</div><div class="v" style="font-weight:500;line-height:1.9">${bi(p.note,p.noteEn)}</div></div>
          </div>
          <div class="card card-pad">
            ${sectionTitle('مامەڵە و گرێبەست', 'Deals & contracts', 'repeat')}
            <div class="mini-list">
              <div class="mini-row" data-open="contracts:00035"><span class="mini-ic"><i data-lucide="file-signature"></i></span><div class="mini-main"><div class="mini-t">${bi('گرێبەستی فرۆشتن','Sale contract')} <span class="official-num">No. 00035</span></div><div class="mini-s">${bi(p.deliver,p.deliverEn)}</div></div>${badge('signed')}<i data-lucide="chevron-left" class="lrow-go"></i></div>
            </div>
          </div>
        </div>
        <div>
          <div class="card card-pad" style="margin-bottom:16px">
            ${sectionTitle('نەخشە', 'Map', 'map-pin')}
            <div class="kv imp" style="margin-bottom:12px"><div class="k"><i data-lucide="hash"></i>${bi('ژمارەی فەرمی','Official number')}</div><div class="v"><span class="official-num">No. ${p.number}</span></div></div>
            <div class="map-card"><div class="mp"><span class="pin"><span class="ring"></span><span class="core"></span></span></div><span class="mlabel">${p.lat}, ${p.lng}</span></div>
            <a class="btn btn-secondary btn-sm" style="width:100%;margin-top:12px" href="#"><i data-lucide="external-link"></i><span data-en="Open in Google Maps">کردنەوە لە Google Maps</span></a>
          </div>
          <div class="card card-pad">
            ${sectionTitle('هاوبەش / پەیوەندی', 'Partner / contact', 'users')}
            <div class="mini-row" data-open="partners:PT-01"><span class="avatar" style="width:38px;height:38px;font-size:13px">${initials(p.partner)}</span><div class="mini-main"><div class="mini-t">${bi(p.partner,p.partnerEn)}</div><div class="mini-s">${bi(p.source[0],p.source[1])}</div></div><i data-lucide="chevron-left" class="lrow-go"></i></div>
          </div>
        </div>
      </div>`;
  }
  V.properties = () => (S.detail.properties ? propDetail(S.detail.properties) : propList());

  /* ════════════════════ CONTACTS (Partners merged in) ════════════════════ */
  const contactSet = () => D.contacts.concat(D.partners.map((p) => Object.assign({ isPartner: true, _ext: true }, p)));
  function peopleList(view, set, titleKu, titleEn, addKu, addEn) {
    const active = set.filter((c) => c.active !== false);
    const shown = active.filter((c) => !S.filter[view] || (S.filter[view] === 'partner' ? c.isPartner : true));
    return `
      <div class="page-head">
        <div><h2 data-en="${titleEn}">${titleKu}</h2><div class="sub" data-en="${active.length} records">${active.length} تۆمار</div></div>
        <div class="head-actions"><button class="btn btn-gold btn-sm" data-form="contact"><i data-lucide="plus"></i><span data-en="${addEn}">${addKu}</span></button></div>
      </div>
      <div class="toolbar">${chipBar(view, [['', 'هەموو', 'All'], ['partner', 'هاوبەش', 'Partners']])}</div>
      <div class="card list">
        ${shown.map((c) => `<div class="lrow" data-open="${view}:${c.id}">
          <span class="avatar" style="width:42px;height:42px;font-size:14px">${initials(c.name)}</span>
          <div class="lrow-main">
            <div class="lrow-t">${bi(c.name, c.nameEn)} ${c.isPartner ? '<span class="tag gold">' + bi('هاوبەش', 'Partner') + '</span>' : ''}${c.bkOwner ? '<span class="tag navy">' + bi('بناری کۆدۆ', 'Bnari Kodo') + '</span>' : ''}</div>
            <div class="lrow-sub"><i data-lucide="briefcase"></i>${bi(c.company, c.companyEn)} · <i data-lucide="map-pin"></i>${bi(c.address, c.addressEn)}</div>
          </div>
          <div class="lrow-col hide-sm"><div class="lc-k">${bi('مامەڵە','Transactions')}</div><div class="lc-v num">${c.transactions}</div></div>
          <div class="lrow-col hide-sm"><div class="lc-k">${bi('کۆی بەها','Total value')}</div><div class="lc-v num">${c.value}</div></div>
          <i class="lrow-go" data-lucide="chevron-left"></i>
        </div>`).join('') || emptyRow()}
      </div>`;
  }
  function peopleDetail(view, set, id) {
    const c = set.find((x) => x.id === id) || set[0];
    return `
      ${backBtn(view, c.name, c.nameEn, c.company, c.companyEn,
        `<button class="btn btn-secondary btn-sm" data-cedit2="${c.id}"><i data-lucide="pencil"></i><span data-en="Edit">دەستکاری</span></button>
         ${c._ext ? '' : `<button class="btn btn-ghost btn-sm danger" data-cdel="${c.id}"><i data-lucide="${c.active === false ? 'rotate-ccw' : 'trash-2'}"></i><span data-en="${c.active === false ? 'Reactivate' : 'Delete'}">${c.active === false ? 'چالاککردنەوە' : 'سڕینەوە'}</span></button>`}`)}
      <div class="detail-grid">
        <div>
          <div class="card card-pad" style="margin-bottom:16px">
            ${sectionTitle('زانیاری پەیوەندی', 'Contact information', 'contact')}
            <div class="field-grid">
              ${kv('ناو','Name', bi(c.name,c.nameEn), 'user')}
              ${kv('کۆمپانیا','Company', bi(c.company,c.companyEn), 'briefcase')}
              ${kv('ناونیشان','Address', bi(c.address,c.addressEn), 'map-pin')}
              ${kv('تەلەفۆن','Phone', `<span class="num" dir="ltr">${c.phone}</span>`, 'phone')}
              ${kv('ئیمەیل','Email', `<span class="num" dir="ltr">${c.email}</span>`, 'mail')}
              ${c.nid ? kv('ژمارەی ناسنامە','National ID', `<span class="num" dir="ltr">${c.nid}</span>`, 'badge-check') : ''}
              ${kv('جۆر','Type', bi(c.type[0],c.type[1]), 'tag')}
              ${kv('ژمارەی مۆبایل', 'Member since', `<span class="num">${c.since}</span>`, 'calendar')}
            </div>
            ${view === 'contacts' ? `<div class="perm-row" style="margin-top:14px;border-top:1px solid var(--border-subtle);border-bottom:none;padding-top:16px"><span class="pr-ic"><i data-lucide="users"></i></span><div class="pr-main"><div class="pr-t">${bi('هاوبەشیشە', 'Also a partner')}</div><div style="font-family:var(--font-arabic);font-size:11.5px;color:var(--text-muted)">${bi('لە بەشی هاوبەشەکانیش پیشان بدرێت', 'Show this contact under Partners too')}</div></div><button class="bk-sw ${c.isPartner ? 'on' : ''}" data-cpartner="${c.id}"><i></i></button></div>` : ''}
          </div>
          <div class="card card-pad">
            ${sectionTitle('گرێبەستەکان', 'Contracts', 'file-signature')}
            <div class="mini-list">
              ${(() => {
                const nm = (c.name || '').trim(), nmEn = (c.nameEn || '').trim();
                const match = (s) => { s = (s || '').trim(); return s && (s === nm || s === nmEn); };
                const cts = D.contracts.concat(D.agreements).filter((ct) => match(ct.first) || match(ct.firstEn) || match(ct.second) || match(ct.secondEn))
                  .sort((a, b) => String(b.dateEn || '').localeCompare(String(a.dateEn || '')));
                const lim = S.contactCtLimit || 5;
                if (!cts.length) return `<div style="font-family:var(--font-arabic);font-size:12.5px;color:var(--text-muted);padding:8px 4px">${bi('هیچ گرێبەستێک نییە', 'No contracts')}</div>`;
                const rows = cts.slice(0, lim).map((ct) => `<div class="mini-row" data-open="${D.agreements.indexOf(ct) > -1 ? 'agreements' : 'contracts'}:${ct.id}"><span class="mini-ic"><i data-lucide="file-signature"></i></span><div class="mini-main"><div class="mini-t">${bi(ct.type[0],ct.type[1])} · No. ${ct.id}</div><div class="mini-s num">${bi(ct.date,ct.dateEn)} · ${bi(ct.propType[0],ct.propType[1])} ${ct.propNumber}</div></div><span class="price">${ct.price}</span><i data-lucide="chevron-left" class="lrow-go"></i></div>`).join('');
                const more = cts.length > lim ? `<button class="btn btn-secondary btn-sm" data-ctmore style="width:100%;margin-top:8px"><i data-lucide="chevron-down"></i><span data-en="Load more (${cts.length - lim})">زیاتر (${cts.length - lim})</span></button>` : '';
                return rows + more;
              })()}
            </div>
          </div>
        </div>
        <div>
          <div class="card card-pad stat-summary">
            ${sectionTitle('کورتە', 'Summary', 'bar-chart-3')}
            <div class="ss-grid">
              <div class="ss"><div class="ss-v num">${c.transactions}</div><div class="ss-l">${bi('مامەڵە','Transactions')}</div></div>
              <div class="ss"><div class="ss-v num">${c.properties}</div><div class="ss-l">${bi('موڵک','Properties')}</div></div>
              <div class="ss"><div class="ss-v num">${c.value}</div><div class="ss-l">${bi('کۆی بەها','Total value')}</div></div>
            </div>
          </div>
        </div>
      </div>`;
  }
  V.contacts = () => (S.detail.contacts ? peopleDetail('contacts', contactSet(), S.detail.contacts) : peopleList('contacts', contactSet(), 'پەیوەندییەکان', 'Contacts', 'زیادکردنی پەیوەندی', 'Add contact'));

  /* ════════════════════ TRANSACTIONS ════════════════════ */
  function txList() {
    return `
      <div class="page-head">
        <div><h2 data-en="Transactions">مامەڵەکان</h2><div class="sub" data-en="Sales, rents, commissions & advances">فرۆشتن، کرێ، کۆمسیۆن و پێشەکی</div></div>
        <div class="head-actions"><button class="btn btn-gold btn-sm" data-form="deal"><i data-lucide="plus"></i><span data-en="Create deal">دروستکردنی مامەڵە</span></button></div>
      </div>
      <div class="toolbar">${chipBar('transactions', [['', 'هەموو', 'All'], ['sale', 'فرۆشتن', 'Sale'], ['rent', 'کرێ', 'Rent'], ['commission', 'کۆمسیۆن', 'Commission'], ['advance', 'پێشەکی', 'Advance']])}</div>
      <div class="card list">
        ${D.transactions.filter((t) => !S.filter.transactions || t.kind === S.filter.transactions).map((t) => { const ct = D.contracts.find((x) => x.propNumber === (t.prop || '').replace(/\D/g, '') || x.first === t.party || x.second === t.party); return `<div class="lrow" data-open="transactions:${t.id}">
          <span class="lrow-ic"><i data-lucide="${t.icon}"></i></span>
          <div class="lrow-main"><div class="lrow-t">${bi(t.type[0],t.type[1])} <span class="official-num">${t.id}</span></div>
          <div class="lrow-sub"><i data-lucide="building-2"></i>${bi(t.prop,t.propEn)} · ${bi(t.party,t.partyEn)}</div></div>
          <div class="lrow-col hide-sm"><div class="lc-k">${bi('بەروار','Date')}</div><div class="lc-v num">${bi(t.date,t.dateEn)}</div></div>
          ${ct ? `<button class="btn btn-secondary btn-sm" data-vcontract="${ct.id}" style="padding:5px 10px"><i data-lucide="file-signature"></i><span data-en="Contract">گرێبەست</span></button>` : ''}
          <div class="lrow-price" data-plabel="بڕ" data-plabel-en="Amount">${t.amount}</div>
          ${badge(t.status, t.status)}
          <i class="lrow-go" data-lucide="chevron-left"></i>
        </div>`; }).join('')}
      </div>`;
  }
  function txDetail(id) {
    const t = D.transactions.find((x) => x.id === id) || D.transactions[0];
    return `
      ${backBtn('transactions', `${t.type[0]} · ${t.id}`, `${t.type[1]} · ${t.id}`, t.prop, t.propEn,
        `<button class="btn btn-secondary btn-sm" data-print="transaction:${t.id}"><i data-lucide="printer"></i><span data-en="Print">چاپ</span></button>
         <button class="btn btn-gold btn-sm" data-print="transaction:${t.id}"><i data-lucide="file-down"></i><span data-en="Receipt">پسوڵە</span></button>`)}
          <div class="field-grid">
            ${kv('جۆر','Type', bi(t.type[0],t.type[1]), t.icon)}
            ${kv('ژمارە','Reference', `<span class="official-num">${t.id}</span>`, 'hash')}
            ${kv('موڵک','Property', bi(t.prop,t.propEn), 'building-2')}
            ${kv('لایەن','Party', bi(t.party,t.partyEn), 'user')}
            ${kv('بڕ','Amount', `<span class="price">${t.amount}</span>`, 'tag', 1)}
            ${kv('کۆمسیۆن','Commission', `<span class="num">${t.commission}</span>`, 'percent')}
            ${kv('بەروار','Date', `<span class="num">${bi(t.date,t.dateEn)}</span>`, 'calendar')}
            ${kv('قۆناغ','Stage', bi(t.stage[0],t.stage[1]), 'git-commit-horizontal')}
          </div>
        </div>
        <div class="card card-pad">
          ${sectionTitle('قۆناغەکان', 'Timeline', 'git-commit-horizontal')}
          <div class="timeline">
            ${[['دروستکرا','Created',1],['پێشەکی وەرگیرا','Advance received',1],['گرێبەست واژۆکرا','Contract signed', t.status==='signed'?1:0],['تەواوبوو','Completed', t.stage[1]==='Completed'?1:0]].map(([ku,en,done])=>`<div class="tl-item ${done?'done':''}"><span class="tl-dot"></span><div class="tl-c"><div class="tl-t">${bi(ku,en)}</div></div></div>`).join('')}
          </div>
        </div>
      </div>`;
  }
  V.transactions = () => { S.view = 'contracts'; if (window.location) {} return V.contracts(); };

  /* ════════════════════ PAYMENTS ════════════════════ */
  function payList() {
    const inSum = D.payments.filter((p) => p.dir === 'in').reduce((a, b) => a + b.value, 0);
    const outSum = D.payments.filter((p) => p.dir === 'out').reduce((a, b) => a + b.value, 0);
    return `
      <div class="page-head">
        <div><h2 data-en="Payments">پارەدانەکان</h2><div class="sub" data-en="Overview — all payments are made inside contracts">پێشانگر — هەموو پارەدانەکان لەناو گرێبەستدا دەکرێن</div></div>
      </div>
      <div class="stat-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
        <div class="metric"><div class="mtop"><span class="mic"><i data-lucide="arrow-down-left"></i></span></div><div class="mlabel" data-en="Money in">پارەی هاتوو</div><div class="mvalue" style="color:var(--status-available)">${money(inSum)}</div></div>
        <div class="metric"><div class="mtop"><span class="mic navy"><i data-lucide="arrow-up-right"></i></span></div><div class="mlabel" data-en="Money out">پارەی دەرچوو</div><div class="mvalue" style="color:var(--status-unavailable)">${money(outSum)}</div></div>
        <div class="metric"><div class="mtop"><span class="mic"><i data-lucide="scale"></i></span></div><div class="mlabel" data-en="Net">پاکانە</div><div class="mvalue">${money(inSum - outSum)}</div></div>
      </div>
      <div class="card list">
        ${D.payments.map((p) => `<div class="lrow" data-open="payments:${p.id}">
          <span class="lrow-ic ${p.dir==='in'?'in':'out'}"><i data-lucide="${p.dir==='in'?'arrow-down-left':'arrow-up-right'}"></i></span>
          <div class="lrow-main"><div class="lrow-t">${bi(p.type[0],p.type[1])} <span class="official-num">${p.id}</span></div>
          <div class="lrow-sub"><i data-lucide="user"></i>${bi(p.party,p.partyEn)} · ${bi(p.ref,p.refEn)}</div></div>
          <div class="lrow-col hide-sm"><div class="lc-k">${bi('شێواز','Method')}</div><div class="lc-v">${bi(p.method[0],p.method[1])}</div></div>
          <div class="lrow-col hide-sm"><div class="lc-k">${bi('بەروار','Date')}</div><div class="lc-v num">${bi(p.date,p.dateEn)}</div></div>
          <div class="lrow-price" data-plabel="بڕ" data-plabel-en="Amount" style="color:${p.dir==='in'?'var(--status-available)':'var(--status-unavailable)'}">${p.dir==='in'?'+':'−'}${p.amount}</div>
          <span class="row-actions"><span class="ra" data-pydel="${p.id}" title="سڕینەوە"><i data-lucide="trash-2"></i></span></span>
          <i class="lrow-go" data-lucide="chevron-left"></i>
        </div>`).join('')}
      </div>`;
  }
  function payDetail(id) {
    const p = D.payments.find((x) => x.id === id) || D.payments[0];
    return `
      ${backBtn('payments', `${p.type[0]} · ${p.id}`, `${p.type[1]} · ${p.id}`, p.party, p.partyEn,
        `<button class="btn btn-secondary btn-sm" data-print="payment:${p.id}"><i data-lucide="printer"></i><span data-en="Print">چاپ</span></button>
         <button class="btn btn-gold btn-sm" data-print="payment:${p.id}"><i data-lucide="file-down"></i><span data-en="Receipt">پسوڵە</span></button>`)}
          <div class="field-grid">
            ${kv('جۆر','Type', bi(p.type[0],p.type[1]), p.dir==='in'?'arrow-down-left':'arrow-up-right')}
            ${kv('ژمارە','Reference', `<span class="official-num">${p.id}</span>`, 'hash')}
            ${kv('لایەن','Party', bi(p.party,p.partyEn), 'user')}
            ${kv('بڕ','Amount', `<span class="price" style="color:${p.dir==='in'?'var(--status-available)':'var(--status-unavailable)'}">${p.dir==='in'?'+':'−'}${p.amount}</span>`, 'tag', 1)}
            ${kv('شێوازی پارەدان','Method', bi(p.method[0],p.method[1]), 'credit-card')}
            ${kv('بەروار','Date', `<span class="num">${bi(p.date,p.dateEn)}</span>`, 'calendar')}
            ${kv('پەیوەست بە','Related to', bi(p.ref,p.refEn), 'link')}
            ${kv('دۆخ','Status', badge(p.status), 'circle-check')}
          </div>
        </div>
        <div class="card card-pad doc-mini">
          <div class="receipt">
            <div class="receipt-h"><img src="../../assets/logo-mark.svg" alt="" class="r-logo"><div class="r-title">${bi('پسوڵەی پارەدان','Payment Receipt')}<span class="num">${p.id}</span></div></div>
            <div class="receipt-amt">${p.dir==='in'?'+':'−'}${p.amount}</div>
            <div class="receipt-rows">
              <div><span>${bi('لایەن','Party')}</span><b>${bi(p.party,p.partyEn)}</b></div>
              <div><span>${bi('بەروار','Date')}</span><b class="num">${bi(p.date,p.dateEn)}</b></div>
              <div><span>${bi('شێواز','Method')}</span><b>${bi(p.method[0],p.method[1])}</b></div>
            </div>
          </div>
        </div>
      </div>`;
  }
  V.payments = () => (S.detail.payments ? payDetail(S.detail.payments) : payList());

  /* ════════════════════ EXPENSES (Zoho-style + CRUD) ════════════════════ */
  function expList() {
    const total = D.expenses.reduce((a, b) => a + b.amount, 0);
    const mtd = D.expenses.filter((e) => e.dateEn >= '2026/06/01').reduce((a, b) => a + b.amount, 0);
    return `
      <div class="page-head">
        <div><h2 data-en="Expenses">خەرجییەکان</h2><div class="sub" data-en="Track and categorize all office spending">بەدواداچوون و پۆلێنکردنی هەموو خەرجییەکانی نووسینگە</div></div>
        <div class="head-actions">
          <button class="btn btn-secondary btn-sm" data-coa><i data-lucide="list-tree"></i><span data-en="Chart of Accounts">پێرستی هەژمارەکان</span></button>
          <button class="btn btn-gold btn-sm" data-exp-new><i data-lucide="plus"></i><span data-en="New Expense">خەرجی نوێ</span></button>
        </div>
      </div>
      <div class="stat-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
        <div class="metric"><div class="mtop"><span class="mic"><i data-lucide="receipt"></i></span></div><div class="mlabel" data-en="Total expenses">کۆی خەرجی</div><div class="mvalue">${money(total)}</div></div>
        <div class="metric"><div class="mtop"><span class="mic navy"><i data-lucide="calendar"></i></span></div><div class="mlabel" data-en="This month">ئەم مانگە</div><div class="mvalue">${money(mtd)}</div></div>
        <div class="metric"><div class="mtop"><span class="mic"><i data-lucide="hash"></i></span></div><div class="mlabel" data-en="Records">تۆمارەکان</div><div class="mvalue num">${D.expenses.length}</div></div>
      </div>
      <div class="card">
        <div class="table-wrap"><table class="table exp-table">
          <thead><tr>
            <th data-en="Date">بەروار</th><th data-en="Expense Account">هەژماری خەرجی</th><th data-en="Vendor / Notes">فرۆشیار / تێبینی</th><th data-en="Ref#">ژمارە</th><th style="text-align:end" data-en="Amount">بڕ</th><th></th>
          </tr></thead>
          <tbody>
          ${D.expenses.map((e) => { const a = accById(e.account); return `
            <tr class="exp-row" data-expand="${e.id}">
              <td class="num" data-label="بەروار" data-label-en="Date">${bi(e.date, e.dateEn)}</td>
              <td data-label="هەژمار" data-label-en="Account"><span class="cell-type"><span class="ti"><i data-lucide="${a.icon}"></i></span><span class="strong">${bi(a.ku, a.en)}</span></span></td>
              <td data-label="فرۆشیار" data-label-en="Vendor">${bi(e.vendor, e.vendorEn)}</td>
              <td class="num" data-label="ژمارە" data-label-en="Ref#" style="color:var(--text-muted)">${e.ref}</td>
              <td class="price" data-label="بڕ" data-label-en="Amount" style="text-align:end">${money(e.amount)}</td>
              <td class="exp-caret-cell"><i data-lucide="chevron-down" class="exp-caret"></i></td>
            </tr>
            <tr class="exp-detail" id="expd-${e.id}"><td colspan="6"><div class="exp-detail-in">
              <div class="exp-dgrid">
                ${kv('بەرواری خەرجی','Expense date', `<span class="num">${bi(e.date,e.dateEn)}</span>`, 'calendar')}
                ${kv('هەژمار','Account', bi(a.ku,a.en), a.icon)}
                ${kv('فرۆشیار','Vendor', bi(e.vendor,e.vendorEn), 'store')}
                ${kv('ژمارەی پسوڵە','Reference#', `<span class="num">${e.ref}</span>`, 'hash')}
                ${kv('بڕ','Amount', `<span class="price">${money(e.amount)}</span>`, 'tag', 1)}
              </div>
              <div class="exp-note">${bi(e.noteKu, e.noteEn)}</div>
              <div class="exp-actions">
                <button class="btn btn-secondary btn-sm" data-exp-edit="${e.id}"><i data-lucide="pencil"></i><span data-en="Edit">دەستکاری</span></button>
                <button class="btn btn-ghost btn-sm danger" data-exp-del="${e.id}"><i data-lucide="trash-2"></i><span data-en="Delete">سڕینەوە</span></button>
              </div>
            </div></td></tr>`; }).join('')}
          </tbody>
        </table></div>
      </div>`;
  }
  function expForm(mode, id) {
    const e = mode === 'edit' ? D.expenses.find((x) => x.id === id) : { date: '٢٠٢٦/٠٦/٠٩', dateEn: '2026/06/09', account: 'rent', vendor: '', amount: '', ref: '', noteKu: '' };
    return `
      ${backBtn('expenses', mode === 'edit' ? 'دەستکاری خەرجی' : 'خەرجی نوێ', mode === 'edit' ? 'Edit Expense' : 'New Expense', mode === 'edit' ? e.id : 'تۆمارێکی نوێ زیادبکە', mode === 'edit' ? e.id : 'Add a new record', '')}
      <div class="card card-pad" style="max-width:760px">
        <div class="form-stack">
          <div class="field-grid" style="gap:16px">
            <div><label class="lbl" data-en="Date">بەروار</label><input id="exp-date" type="date" class="input-ctl num" value="${esc((e.dateEn || '2026-06-16').replace(/\//g, '-'))}" onclick="this.showPicker&&this.showPicker()"></div>
            <div><label class="lbl" data-en="Expense Account">هەژماری خەرجی</label><select id="exp-account" class="select-ctl">${D.accounts.map((a) => `<option value="${a.id}" ${a.id === e.account ? 'selected' : ''}>${a.ku} — ${a.en}</option>`).join('')}</select></div>
            <div><label class="lbl" data-en="Amount ($)">بڕ ($)</label><input id="exp-amount" class="input-ctl num" type="number" value="${e.amount}" placeholder="0"></div>
            <div><label class="lbl" data-en="Reference#">ژمارەی پسوڵە</label><input id="exp-ref" class="input-ctl num" value="${esc(e.ref)}" placeholder="INV-0000"></div>
            <div><label class="lbl" data-en="Vendor">فرۆشیار</label><input id="exp-vendor" class="input-ctl" value="${esc(e.vendor || '')}" placeholder="ناوی فرۆشیار" data-en-ph="Vendor name"></div>
          </div>
          <div><label class="lbl" data-en="Notes">تێبینی</label><textarea id="exp-note" class="input-ctl" placeholder="تێبینی..." data-en-ph="Notes...">${esc(e.noteKu || '')}</textarea></div>
          <div><label class="lbl" data-en="Attachment (receipt / invoice)">هاوپێچ (پسوڵە / پسوولە)</label>
            <div class="dropzone" id="expDz"><div class="dz-ic"><i data-lucide="upload-cloud"></i></div><div class="dz-t" data-en="Drop a receipt or click to upload">پسوڵە دابنێ یان کلیک بکە بۆ بارکردن</div><div class="dz-s">PDF · JPG · PNG</div><input type="file" id="exp-file" hidden multiple></div>
            <div class="dz-files" id="expDzFiles"></div>
          </div>
          <div style="display:flex;gap:10px;margin-top:4px">
            <button class="btn btn-gold" data-exp-save="${mode}:${id || ''}"><i data-lucide="check"></i><span data-en="Save expense">پاشەکەوتکردن</span></button>
            <button class="btn btn-ghost" data-back="expenses"><span data-en="Cancel">پاشگەزبوونەوە</span></button>
          </div>
        </div>
      </div>`;
  }
  function coaView() {
    return `
      ${backBtn('expenses', 'پێرستی هەژمارەکان', 'Chart of Accounts', 'هەژمارە بنەڕەتییەکانی خەرجی', 'Default expense accounts', `<button class="btn btn-gold btn-sm"><i data-lucide="plus"></i><span data-en="New account">هەژماری نوێ</span></button>`)}
      <div class="card list">
        ${D.accounts.map((a) => { const used = D.expenses.filter((e) => e.account === a.id); const sum = used.reduce((x, y) => x + y.amount, 0); return `
          <div class="lrow">
            <span class="lrow-ic"><i data-lucide="${a.icon}"></i></span>
            <div class="lrow-main"><div class="lrow-t">${bi(a.ku, a.en)}</div><div class="lrow-sub">${bi('جۆری خەرجی', 'Expense')} · ${used.length} ${bi('تۆمار', 'records')}</div></div>
            <div class="lrow-price" data-plabel="کۆی خەرجی" data-plabel-en="Total">${money(sum)}</div>
          </div>`; }).join('')}
      </div>`;
  }
  V.expenses = () => {
    if (S.expForm === 'coa') return coaView();
    if (S.expForm) return expForm(S.expForm.mode, S.expForm.id);
    return expList();
  };

  /* ════════════════════ CONTRACTS ════════════════════ */
  const cPaid = (c) => (c.payments || []).reduce((a, p) => a + (Number(p.amount) || 0), 0);
  const cRemaining = (c) => Math.max(0, (c.priceVal || 0) - cPaid(c));
  const ctById = (id) => D.contracts.find((x) => x.id === id) || D.agreements.find((x) => x.id === id);
  function ctRow(c, mod) {
    const rem = cRemaining(c);
    return `<div class="lrow" data-open="${mod}:${c.id}">
      <span class="lrow-ic"><i data-lucide="file-signature"></i></span>
      <div class="lrow-main"><div class="lrow-t">${bi(c.type[0],c.type[1])} <span class="official-num">No. ${c.id}</span></div>
      <div class="lrow-sub"><i data-lucide="building-2"></i>${bi(c.propType[0],c.propType[1])} ${c.propNumber} · ${bi(c.areaKu,c.areaEn)}</div></div>
      <div class="lrow-col hide-sm"><div class="lc-k">${bi('لایەنەکان','Parties')}</div><div class="lc-v">${bi(c.first,c.firstEn)} ← ${bi(c.second,c.secondEn)}</div></div>
      <div class="lrow-col hide-sm"><div class="lc-k">${bi('بەروار','Date')}</div><div class="lc-v num">${bi(c.date, c.dateEn)}</div></div>
      <div class="lrow-col hide-sm"><div class="lc-k">${bi('ماوە','Remaining')}</div><div class="lc-v num" style="color:${rem > 0 ? 'var(--status-process)' : 'var(--status-available)'}">${c.kind === 'rent' ? '—' : money(rem)}</div></div>
      <div class="lrow-price" data-plabel="نرخ" data-plabel-en="Price">${c.price}</div>
      ${badge(c.status)}
      <i class="lrow-go" data-lucide="chevron-left"></i>
    </div>`;
  }
  function ctList(mod, store, titleKu, titleEn, subKu, subEn, addKu, addEn, formKey) {
    return `
      <div class="page-head">
        <div><h2 data-en="${titleEn}">${titleKu}</h2><div class="sub" data-en="${subEn}">${subKu}</div></div>
        <div class="head-actions"><button class="btn btn-gold btn-sm" data-form="${formKey}"><i data-lucide="plus"></i><span data-en="${addEn}">${addKu}</span></button></div>
      </div>
      <div class="toolbar" style="flex-direction:column;align-items:stretch;gap:10px">
        ${chipBar(mod, [['', 'هەموو', 'All'], ['sale', 'فرۆشتن', 'Sale'], ['rent', 'کرێ', 'Rent']])}
        ${chipBar(mod + 'st', [['', 'هەموو', 'All'], ['draft', 'ڕەشنووس', 'Draft'], ['process', 'لە پرۆسە', 'In process'], ['signed', 'واژۆکراو', 'Signed'], ['cancelled', 'هەڵوەشاوە', 'Cancelled']])}
        ${chipBar(mod + 'paid', [['', 'هەموو', 'All'], ['unpaid', 'پارەی تەواو نەدراو', 'Not fully paid']])}
      </div>
      <div class="card list">${store.slice().sort((a, b) => String(b.dateEn || '').localeCompare(String(a.dateEn || ''))).filter((c) => (!S.filter[mod] || c.kind === S.filter[mod]) && (!S.filter[mod + 'st'] || c.status === S.filter[mod + 'st']) && (S.filter[mod + 'paid'] !== 'unpaid' || (c.kind !== 'rent' && cRemaining(c) > 0))).map((c) => ctRow(c, mod)).join('') || emptyRow()}</div>`;
  }
  function ctDetail(id, mod, store) {
    const c = store.find((x) => x.id === id) || store[0];
    const co = D.company;
    const isRent = c.kind === 'rent';
    const isAg = mod === 'agreements';
    return `
      ${backBtn(mod, `${isAg ? 'ڕێککەوتن' : 'گرێبەست'} No. ${c.id}`, `${isAg ? 'Agreement' : 'Contract'} No. ${c.id}`, c.type[0], c.type[1],
        `<button class="btn btn-secondary btn-sm" data-cedit="${c.id}"><i data-lucide="pencil"></i><span data-en="Edit">دەستکاری</span></button>
         ${c.status === 'cancelled' ? '' : `<button class="btn btn-ghost btn-sm danger" data-cvoid="${c.id}"><i data-lucide="ban"></i><span data-en="Void">هەڵوەشاندنەوە</span></button>`}
         <button class="btn btn-ghost btn-sm" data-print="contract:${c.id}"><i data-lucide="printer"></i><span data-en="Print">چاپ</span></button>
         <button class="btn btn-gold btn-sm" data-print="contract:${c.id}"><i data-lucide="file-down"></i><span data-en="Export PDF">PDF</span></button>`)}
      <div class="ct-wrap">
        <div class="doc" dir="rtl">
          <div class="doc-head">
            <div class="doc-brand">
              <img src="../../assets/logo-mark.svg" alt="Bnari Kodo" class="doc-logo">
              <div class="doc-co">
                <div class="doc-co-name">${co.nameKu}</div>
                <div class="doc-co-sub">${co.sub} · عقارات</div>
                <div class="doc-co-tag">${co.taglineKu}</div>
              </div>
            </div>
            <div class="doc-contacts">
              ${co.contacts.map((p) => `<div class="dc"><i data-lucide="phone"></i><span>${p.name}</span><b class="num" dir="ltr">${p.phone}${p.phone2 ? ' / ' + p.phone2 : ''}</b></div>`).join('')}
              ${(co.addresses || [co.addressKu]).map((ad) => `<div class="dc addr"><i data-lucide="map-pin"></i><span>${ad}</span></div>`).join('')}
            </div>
          </div>
          <div class="doc-title-row">
            <span class="doc-no num">No. ${c.id}</span>
            <h3 class="doc-title">ڕێکەوتننامەی ${isRent ? 'بەکرێدان' : 'کڕین و فرۆشتن'}</h3>
            <span class="doc-date num">بەروار: ${c.date}</span>
          </div>

          <div class="doc-parties">
            <div class="doc-party"><div class="dp-label">لایەنی یەکەم (${isRent ? 'خاوەن' : 'فرۆشیار'})</div><div class="dp-name">${c.first}</div><div class="dp-meta">دانیشتووی ${c.firstRes}${c.firstPhone ? ' · مۆبایل: <span dir="ltr">' + c.firstPhone + '</span>' : ''}${c.firstNid ? ' · ژ. ناسنامە: <span dir="ltr">' + c.firstNid + '</span>' : ''}</div></div>
            <div class="doc-party"><div class="dp-label">لایەنی دووەم (${isRent ? 'بەکرێگر' : 'کڕیار'})</div><div class="dp-name">${c.second}</div><div class="dp-meta">دانیشتووی ${c.secondRes}${c.secondPhone ? ' · مۆبایل: <span dir="ltr">' + c.secondPhone + '</span>' : ''}${c.secondNid ? ' · ژ. ناسنامە: <span dir="ltr">' + c.secondNid + '</span>' : ''}</div></div>
          </div>

          <div class="doc-prop">
            <div class="dpr"><span class="dpr-k">ناوچە</span><span class="dpr-v">${c.areaKu}</span></div>
            <div class="dpr"><span class="dpr-k">جۆری موڵک</span><span class="dpr-v">${c.propType[0]}${c.landDoc === 'tapo' ? ' / سند' : c.landDoc === 'kart' ? ' / کارت' : ''}</span></div>
            <div class="dpr"><span class="dpr-k">ژمارەی موڵک</span><span class="dpr-v num">${c.propNumber}</span></div>
            <div class="dpr"><span class="dpr-k">بەرواری گەیاندن</span><span class="dpr-v num">${c.deliver}</span></div>
          </div>

          <div class="doc-clauses">
            <div class="doc-sec-h">هەردوو لایەن لەسەر ئەم خاڵانەی خوارەوە ڕێککەوتن:</div>
            <ol>
              <li><b>یەکەم:</b> لایەنی یەکەم ${isRent ? 'بەکرێدانی' : 'فرۆشتنی'} موڵکی ئاماژەپێکراو بە لایەنی دووەم ڕازییە بەو مەرجانەی لەم گرێبەستەدا هاتووە.</li>
              <li><b>دووەم:</b> نرخی ${isRent ? 'کرێ' : 'فرۆشتن'}ی ڕێککەوتراو بریتییە لە <b class="num">${c.price}</b>، کە لایەنی دووەم پابەندە بە پێدانی.</li>
              <li><b>سێیەم:</b> بڕی پێشەکی <b class="num">${c.advance}</b> وەرگیراوە، بڕی ماوە بەپێی ڕێککەوتن دەدرێت.</li>
              <li><b>چوارەم:</b> لایەنی یەکەم پابەندە بە گەیاندنی موڵکەکە لە بەرواری <b class="num">${c.deliver}</b>.</li>
              <li><b>پێنجەم:</b> هەردوو لایەن پابەندن بە پێدانی ڕێژەی <b>${c.commission}</b> وەک کۆمسیۆن بە نووسینگەی (بناری کۆدۆ).</li>
              <li><b>شەشەم:</b> نووسینگە بەرپرسیار نییە لە هیچ کێشەیەکی یاسایی نێوان هەردوو لایەن دوای واژۆکردن.</li>
              <li><b>حەوتەم:</b> مەسروفاتی قانونی بۆ هەردوولایە.</li>
            </ol>
          </div>

          <div class="doc-signs-h">واژۆ و پەنجەمۆر</div>
          <div class="doc-sign-row">
            ${[['لایەنی یەکەم (' + (isRent ? 'خاوەن' : 'فرۆشیار') + ')', c.first], ['شاهیدی یەکەم', c.witness1], ['شاهیدی دووەم', c.witness2], ['لایەنی دووەم (' + (isRent ? 'بەکرێگر' : 'کڕیار') + ')', c.second]].map(([lbl, nm]) => `<div class="doc-sign-b"><div class="ds-label">${lbl}</div><div class="ds-name">${nm || ''}</div><div class="ds-slot"><span class="ds-ln"></span><span class="ds-sk">واژۆ</span></div><div class="ds-slot fp"><span class="ds-ln"></span><span class="ds-sk">پەنجەمۆر</span></div></div>`).join('')}
          </div>
          <div class="doc-stamp"><span>بناری کۆدۆ</span></div>
        </div>

        <div class="ct-side">
          <div class="card card-pad">
            ${sectionTitle('کورتەی گرێبەست', 'Contract summary', 'file-text')}
            <div class="ct-summary">
              ${kv('ژمارە','Number', `<span class="official-num">No. ${c.id}</span>`, 'hash')}
              ${kv('جۆر','Type', bi(c.type[0],c.type[1]), 'file-signature')}
              ${kv('نرخ','Price', `<span class="price">${c.price}</span>`, 'tag', 1)}
              ${kv('پێشەکی','Advance', `<span class="num">${c.advance}</span>`, 'wallet')}
              ${kv('کۆمسیۆن','Commission', `<span class="num">${c.commission}</span>`, 'percent')}
              <div class="kv"><div class="k"><i data-lucide="circle-check"></i>${bi('دۆخ','Status')}</div><div class="v"><select class="status-select" data-cstatus="${c.id}">
                ${[['draft','ڕەشنووس','Draft'],['process','لە پرۆسەدا','In process'],['signed','واژۆکراو','Signed'],['cancelled','هەڵوەشاوە','Cancelled']].map(([v,ku,en])=>`<option value="${v}" ${c.status===v?'selected':''}>${bi(ku,en)}</option>`).join('')}
              </select></div></div>
            </div>
          </div>
          <div class="card card-pad">
            ${sectionTitle('کورتەی پارەدان', 'Payment summary', 'wallet')}
            <div class="pay-sum">
              ${kv('کۆی نرخ', 'Total price', `<span class="num">${c.price}</span>`, 'tag')}
              ${kv('دراوە', 'Paid', `<span class="num" style="color:var(--status-available)">${money(cPaid(c))}</span>`, 'check')}
              ${kv('ماوە', 'Remaining', `<span class="num" style="color:${cRemaining(c) > 0 ? 'var(--status-process)' : 'var(--status-available)'}">${c.kind === 'rent' ? '—' : money(cRemaining(c))}</span>`, 'hourglass', 1)}
            </div>
            <div class="mini-list" style="margin-top:12px">
              ${(c.payments || []).map((p, i) => { const before = (c.payments || []).slice(0, i).reduce((a, x) => a + (Number(x.amount) || 0), 0); return `<div class="mini-row" data-cpay="${c.id}:${i}"><span class="mini-ic"><i data-lucide="receipt"></i></span><div class="mini-main"><div class="mini-t">${bi(p.note || 'پارەدان', p.noteEn || 'Payment')}</div><div class="mini-s num">${p.date}</div></div><span class="price">${money(p.amount)}</span><i data-lucide="printer" class="lrow-go"></i></div>`; }).join('') || `<div style="font-family:var(--font-arabic);font-size:12.5px;color:var(--text-muted);padding:6px 4px">${bi('هیچ پارەدانێک نییە', 'No payments yet')}</div>`}
            </div>
            ${(c.status !== 'cancelled' && c.kind !== 'rent') ? `<button class="btn btn-gold btn-sm" data-caddpay="${c.id}" style="width:100%;margin-top:12px"><i data-lucide="plus"></i><span data-en="Add payment">زیادکردنی پارەدان</span></button>` : ''}
          </div>
          <div class="card card-pad">
            ${sectionTitle('بەڵگەنامەکان', 'Documents', 'paperclip')}
            <div class="mini-list">
              ${[['گرێبەستی واژۆکراو','Signed contract'],['ناسنامەی لایەنەکان','Parties IDs'],['سەنەدی موڵک','Title deed']].map(([ku,en])=>`<div class="mini-row"><span class="mini-ic"><i data-lucide="file-text"></i></span><div class="mini-main"><div class="mini-t">${bi(ku,en)}</div></div><i data-lucide="download" class="lrow-go"></i></div>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
  }
  V.contracts = () => (S.detail.contracts ? ctDetail(S.detail.contracts, 'contracts', D.contracts) : ctList('contracts', D.contracts, 'گرێبەستەکان', 'Contracts', 'گرێبەستی فەرمیی کوردیی سۆرانی', 'Official Kurdish Sorani contracts', 'گرێبەستی نوێ', 'New contract', 'contract'));

  /* ════════════════════ AVAILABILITIES → merged into Properties ════════════════════ */
  V.availabilities = () => V.properties();

  /* ════════════════════ EXTERNAL AGREEMENTS — identical to Contracts ════════════════════ */
  V.agreements = () => (S.detail.agreements ? ctDetail(S.detail.agreements, 'agreements', D.agreements) : ctList('agreements', D.agreements, 'ڕێککەوتنە دەرەکییەکان', 'External Agreements', 'ڕێککەوتنی خێرا و ناوخۆیی', 'Quick internal agreements', 'ڕێککەوتنی نوێ', 'New agreement', 'agreement'));

  /* ════════════════════ AREAS ════════════════════ */
  function areaList() {
    return `
    <div class="page-head">
      <div><h2 data-en="Areas">ناوچەکان</h2><div class="sub" data-en="Areas your office works in — click to see its properties">ئەو ناوچانەی ئۆفیس کاری تێدا دەکات — کلیک بکە بۆ موڵکەکانی</div></div>
      <div class="head-actions"><button class="btn btn-gold btn-sm" data-form="area"><i data-lucide="plus"></i><span data-en="Add area">زیادکردنی ناوچە</span></button></div>
    </div>
    <div class="card list">${D.areas.map((a) => { const cnt = D.properties.filter((p) => p.areaEn === a.en || p.areaKu === a.ku).length; return `<div class="lrow" data-open="areas:${a.id}">
      <span class="lrow-ic"><i data-lucide="map-pin"></i></span>
      <div class="lrow-main"><div class="lrow-t">${bi(a.ku, a.en)}</div><div class="lrow-sub"><i data-lucide="building-2"></i>${cnt} ${bi('موڵک', 'properties')} · ${bi(a.city, a.cityEn)}</div></div>
      <div class="lrow-price num" data-plabel="موڵک" data-plabel-en="Properties">${cnt}</div>
      <span class="row-actions"><span class="ra" data-aremove="${a.id}" title="سڕینەوە"><i data-lucide="trash-2"></i></span></span>
      <i class="lrow-go" data-lucide="chevron-left"></i>
    </div>`; }).join('') || emptyRow()}</div>`;
  }
  function areaDetail(id) {
    const a = D.areas.find((x) => x.id === id) || D.areas[0];
    const inArea = (p) => p.areaEn === a.en || p.areaKu === a.ku;
    const props = D.properties.filter((p) => {
      if (!inArea(p)) return false;
      if (S.filter.areaType && p.type !== S.filter.areaType) return false;
      const fs = S.filter.areaStatus || '';
      if (fs === 'inactive') return p.status === 'inactive';
      if (!fs) return p.status !== 'inactive';
      return p.status === fs;
    });
    return `
      ${backBtn('areas', a.ku, a.en, `${a.city} · ${D.properties.filter(inArea).length} موڵک`, `${a.cityEn} · ${D.properties.filter(inArea).length} properties`, '')}
      <div class="toolbar" style="flex-direction:column;align-items:stretch;gap:10px">
        ${chipBar('areaType', [['', 'هەموو', 'All'], ['land', 'زەوی', 'Land'], ['house', 'خانوو', 'House'], ['apartment', 'شوقە', 'Apartment'], ['building', 'بینا', 'Building'], ['shop', 'دوکان', 'Shop'], ['villa', 'ڤێلا', 'Villa']])}
        ${chipBar('areaStatus', [['', 'هەموو', 'All'], ['available', 'بەردەست', 'Available'], ['reserved', 'ڕیزێرڤ', 'Reserved'], ['process', 'لە پرۆسە', 'In process'], ['closed', 'داخراو', 'Closed']])}
      </div>
      <div class="card list">${props.map(propRow).join('') || emptyRow()}</div>`;
  }
  V.areas = () => (S.detail.areas ? areaDetail(S.detail.areas) : areaList());

  /* ════════════════════ EVENT DELEGATION ════════════════════ */
  function rerender() { if (window.bkRerender) window.bkRerender(); }
  function txPreview(id) {
    const t = D.transactions.find((x) => x.id === id); if (!t) return;
    const ct = D.contracts.find((x) => x.propNumber === (t.prop || '').replace(/\D/g, '') || x.first === t.party || x.second === t.party);
    const scrim = document.createElement('div'); scrim.className = 'bk-modal-scrim';
    scrim.innerHTML = `<div class="bk-modal">
      <div class="bk-mhead"><span class="mh-ic"><i data-lucide="${t.icon}"></i></span><div class="mh-t"><h3>${bi(t.type[0], t.type[1])} · ${t.id}</h3><div class="mh-s">${bi(t.prop, t.propEn)}</div></div><button class="bk-mclose" data-mclose><i data-lucide="x"></i></button></div>
      <div class="bk-mbody"><div class="field-grid">
        ${kv('موڵک', 'Property', bi(t.prop, t.propEn), 'building-2')}
        ${kv('لایەن', 'Party', bi(t.party, t.partyEn), 'user')}
        ${kv('بڕ', 'Amount', `<span class="price">${t.amount}</span>`, 'tag', 1)}
        ${kv('کۆمسیۆن', 'Commission', `<span class="num">${t.commission}</span>`, 'percent')}
        ${kv('بەروار', 'Date', `<span class="num">${bi(t.date, t.dateEn)}</span>`, 'calendar')}
        ${kv('قۆناغ', 'Stage', bi(t.stage[0], t.stage[1]), 'git-commit-horizontal')}
      </div></div>
      <div class="bk-mfoot">
        ${ct ? `<button class="btn btn-secondary" data-vcontract="${ct.id}"><i data-lucide="file-signature"></i><span>${bi('گرێبەست', 'Contract')}</span></button>` : ''}
        <button class="btn btn-gold" data-txopen="${t.id}"><i data-lucide="external-link"></i><span>${bi('کردنەوە لە مامەڵەکان', 'Open in Transactions')}</span></button>
      </div></div>`;
    document.body.appendChild(scrim);
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => scrim.classList.add('show'));
    const close = () => { scrim.classList.remove('show'); setTimeout(() => scrim.remove(), 250); };
    scrim.addEventListener('click', (e) => {
      if (e.target === scrim || e.target.closest('[data-mclose]')) return close();
      const open = e.target.closest('[data-txopen]'); if (open) { close(); S.detail.transactions = open.dataset.txopen; S.expForm = null; if (window.bkNav) window.bkNav('transactions'); }
    });
    if (window.bkApplyLang) window.bkApplyLang();
  }
  function payReceipt(cid, idx) {
    const c = D.contracts.find((x) => x.id === cid); if (!c || !c.payments || !c.payments[idx]) return;
    const p = c.payments[idx];
    const before = c.payments.slice(0, idx).reduce((a, x) => a + (Number(x.amount) || 0), 0);
    const after = before + (Number(p.amount) || 0);
    const co = D.company;
    const scrim = document.createElement('div'); scrim.className = 'bk-modal-scrim';
    scrim.innerHTML = `<div class="bk-modal">
      <div class="bk-mhead"><span class="mh-ic"><i data-lucide="receipt"></i></span><div class="mh-t"><h3>${bi('پسوڵەی پارەدان', 'Payment receipt')}</h3><div class="mh-s">${bi('گرێبەست', 'Contract')} No. ${c.id}</div></div><button class="bk-mclose" data-mclose><i data-lucide="x"></i></button></div>
      <div class="bk-mbody"><div class="receipt" id="payReceiptDoc">
        <div class="receipt-h"><img src="../../assets/logo-mark.svg" alt="" class="r-logo"><div class="r-title">${co.nameKu} · ${bi('پسوڵەی پارەدان', 'Payment Receipt')}</div></div>
        <div class="receipt-amt">${money(p.amount)}</div>
        <div class="receipt-rows">
          <div><span>${bi('لایەن', 'Party')}</span><b>${bi(c.second, c.secondEn)}</b></div>
          <div><span>${bi('بەروار', 'Date')}</span><b class="num">${p.date}</b></div>
          <div><span>${bi('باڵانسی پێش', 'Balance before')}</span><b class="num">${money(Math.max(0, (c.priceVal || 0) - before))}</b></div>
          <div><span>${bi('ئەم پارەدانە', 'This payment')}</span><b class="num">${money(p.amount)}</b></div>
          <div><span>${bi('باڵانسی دوای', 'Balance after')}</span><b class="num">${money(Math.max(0, (c.priceVal || 0) - after))}</b></div>
          <div><span>${bi('شێواز', 'Method')}</span><b>${bi('کاش', 'Cash')}</b></div>
          ${p.note ? `<div><span>${bi('تێبینی', 'Note')}</span><b>${bi(p.note, p.noteEn || p.note)}</b></div>` : ''}
        </div>
      </div></div>
      <div class="bk-mfoot"><button class="btn btn-ghost" data-mclose><span>${bi('داخستن', 'Close')}</span></button><button class="btn btn-gold" data-payprint><i data-lucide="printer"></i><span>${bi('چاپی پسوڵە', 'Print receipt')}</span></button></div></div>`;
    document.body.appendChild(scrim);
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => scrim.classList.add('show'));
    const close = () => { scrim.classList.remove('show'); setTimeout(() => scrim.remove(), 250); };
    scrim.addEventListener('click', (e) => {
      if (e.target === scrim || e.target.closest('[data-mclose]')) return close();
      if (e.target.closest('[data-payprint]')) { if (window.APP && window.APP.printContractPayment) window.APP.printContractPayment(cid, idx); }
    });
    if (window.bkApplyLang) window.bkApplyLang();
  }
  document.addEventListener('change', (ev) => {
    const cstatus = ev.target.closest('[data-cstatus]');
    if (cstatus) { const c = ctById(cstatus.dataset.cstatus); if (c) c.status = cstatus.value; if (D.save) D.save(); rerender(); }
  });
  document.addEventListener('click', (ev) => {
    const vc = ev.target.closest('[data-vcontract]');
    if (vc) { ev.stopPropagation(); S.detail.contracts = vc.dataset.vcontract; S.expForm = null; if (window.bkNav) window.bkNav('contracts'); return; }
    const txp = ev.target.closest('[data-txprev]');
    if (txp) { ev.stopPropagation(); txPreview(txp.dataset.txprev); return; }
    const ce2 = ev.target.closest('[data-cedit2]');
    if (ce2) { const c = D.contacts.find((x) => x.id === ce2.dataset.cedit2); if (c && window.APP.editContact) window.APP.editContact(c.id); return; }
    const ctmore = ev.target.closest('[data-ctmore]');
    if (ctmore) { S.contactCtLimit = (S.contactCtLimit || 5) + 5; rerender(); return; }
    const cdel = ev.target.closest('[data-cdel]');
    if (cdel) {
      const c = D.contacts.find((x) => x.id === cdel.dataset.cdel); if (!c) return;
      if (c.active === false) { c.active = true; if (D.save) D.save(); rerender(); return; }
      const n = D.contactAssoc ? D.contactAssoc(c.id) : 0;
      if (n > 0) { if (confirm('ئەم پەیوەندییە ' + n + ' تۆماری پەیوەستی هەیە، ناتوانرێت بسڕێتەوە. ناچالاک بکرێت؟ / Has ' + n + ' linked records — cannot delete. Set inactive instead?')) { c.active = false; S.detail.contacts = null; if (D.save) D.save(); rerender(); } }
      else if (confirm('سڕینەوەی ئەم پەیوەندییە؟ / Delete this contact?')) { const i = D.contacts.findIndex((x) => x.id === c.id); if (i > -1) D.contacts.splice(i, 1); S.detail.contacts = null; if (D.save) D.save(); rerender(); }
      return;
    }
    const pydel = ev.target.closest('[data-pydel]');
    if (pydel) { ev.stopPropagation(); if (confirm('سڕینەوەی ئەم پارەدانە؟ / Delete this payment?')) { const i = D.payments.findIndex((x) => x.id === pydel.dataset.pydel); if (i > -1) D.payments.splice(i, 1); if (D.save) D.save(); rerender(); } return; }
    const arEarly = ev.target.closest('[data-aremove]');
    if (arEarly) { ev.stopPropagation(); const id = arEarly.dataset.aremove; const n = D.areaAssoc ? D.areaAssoc(id) : 0; if (n > 0) { alert('ئەم ناوچەیە ' + n + ' موڵکی پەیوەستی هەیە، ناتوانرێت بسڕێتەوە. / Has ' + n + ' linked properties — cannot delete.'); } else if (confirm('سڕینەوەی ئەم ناوچەیە؟ / Delete this area?')) { const i = D.areas.findIndex((x) => x.id === id); if (i > -1) D.areas.splice(i, 1); if (D.save) D.save(); rerender(); } return; }
    const open = ev.target.closest('[data-open]');
    if (open) { const [v, id] = open.dataset.open.split(':'); S.detail[v] = id; S.expForm = null; if (v === 'contacts') S.contactCtLimit = 5; if (window.bkNav) window.bkNav(v); else rerender(); return; }
    const back = ev.target.closest('[data-back]');
    if (back) { const v = back.dataset.back; S.detail[v] = null; S.expForm = null; rerender(); return; }
    const expNew = ev.target.closest('[data-exp-new]');
    if (expNew) { S.expForm = { mode: 'new', id: null }; rerender(); return; }
    const coa = ev.target.closest('[data-coa]');
    if (coa) { S.expForm = 'coa'; rerender(); return; }
    const edit = ev.target.closest('[data-exp-edit]');
    if (edit) { S.expForm = { mode: 'edit', id: edit.dataset.expEdit }; rerender(); return; }
    const del = ev.target.closest('[data-exp-del]');
    if (del) {
      const id = del.dataset.expDel;
      if (confirm('سڕینەوەی ئەم خەرجییە؟ / Delete this expense?')) {
        const i = D.expenses.findIndex((x) => x.id === id);
        if (i > -1) D.expenses.splice(i, 1);
        rerender();
      }
      return;
    }
    const save = ev.target.closest('[data-exp-save]');
    if (save) {
      const [mode, id] = save.dataset.expSave.split(':');
      const g = (s) => (document.getElementById(s) || {}).value || '';
      const amount = Number(g('exp-amount')) || 0;
      const rec = { date: toSlashD(g('exp-date')), dateEn: toSlashD(g('exp-date')), account: g('exp-account'), amount, vendor: g('exp-vendor'), vendorEn: g('exp-vendor'), ref: g('exp-ref') || '—', noteKu: g('exp-note'), noteEn: g('exp-note') };
      if (mode === 'edit') {
        const e = D.expenses.find((x) => x.id === id);
        if (e) Object.assign(e, rec);
      } else {
        const n = 143 + D.expenses.length; // simple incrementing id
        D.expenses.unshift(Object.assign({ id: 'EXP-' + String(n).padStart(4, '0') }, rec));
      }
      S.expForm = null; rerender();
      return;
    }
    const cp = ev.target.closest('[data-cpartner]');
    if (cp) { const c = D.contacts.find((x) => x.id === cp.dataset.cpartner); if (c) c.isPartner = !c.isPartner; if (D.save) D.save(); rerender(); return; }
    const pinact = ev.target.closest('[data-pinactive]');
    if (pinact) {
      const p = D.properties.find((x) => x.id === pinact.dataset.pinactive);
      if (p) { if (p.status === 'inactive') { p.status = 'available'; } else if (confirm('ناچالاککردنی ئەم موڵکە؟ (موڵک ناسڕێتەوە) / Set this property inactive?')) { p.status = 'inactive'; } if (D.save) D.save(); rerender(); }
      return;
    }
    const ar = ev.target.closest('[data-aremove]');
    if (ar) { return; }
    const pf = ev.target.closest('[data-pf]');
    if (pf) { const [m, val] = pf.dataset.pf.split(':'); S.filter[m] = val; rerender(); return; }
    const dz = ev.target.closest('#expDz');
    if (dz) {
      const inp = document.getElementById('exp-file');
      if (inp) {
        inp.onchange = () => {
          const list = document.getElementById('expDzFiles');
          if (list) { list.innerHTML = Array.from(inp.files).map((f) => `<div class="dz-file"><i data-lucide="file-text"></i><span>${f.name}</span><i data-lucide="check" style="margin-inline-start:auto;color:var(--status-available)"></i></div>`).join(''); if (window.lucide) lucide.createIcons(); }
        };
        inp.click();
      }
      return;
    }
    const cedit = ev.target.closest('[data-cedit]');
    if (cedit) { if (window.APP.editContract) window.APP.editContract(cedit.dataset.cedit); return; }
    const caddpay = ev.target.closest('[data-caddpay]');
    if (caddpay) {
      const c = D.contracts.find((x) => x.id === caddpay.dataset.caddpay) || D.agreements.find((x) => x.id === caddpay.dataset.caddpay); if (!c) return;
      window.APP.modal({
        icon: 'wallet', ku: 'زیادکردنی پارەدان', en: 'Add Payment', subKu: 'گرێبەست No. ' + c.id, subEn: 'Contract No. ' + c.id,
        saveKu: 'تۆمارکردن', saveEn: 'Record', doneKu: 'پارەدان تۆمارکرا', doneEn: 'Payment recorded',
        fields: [
          { id: 'amount', ku: 'بڕ ($)', en: 'Amount ($)', type: 'number', req: 1, ph: String(cRemaining(c)), max: cRemaining(c) },
          { id: 'date', ku: 'بەروار', en: 'Date', type: 'date', value: '2026/06/16' },
          { id: 'note', ku: 'تێبینی', en: 'Note', ph: 'قیستی پارەدان' },
        ],
        onSave: (v) => {
          const amt = Number(v.amount) || 0; if (!amt) return;
          const rem = cRemaining(c);
          if (amt > rem) { alert('بڕی پارەدان نابێت لە باڵانسی ماوە (' + money(rem) + ') زیاتر بێت. / Payment cannot exceed the remaining balance (' + money(rem) + ').'); return false; }
          c.payments = c.payments || [];
          c.payments.push({ id: 'CP-' + c.id + '-' + (c.payments.length + 1), date: v.date || '2026/06/09', amount: amt, note: v.note || 'پارەدان', noteEn: v.note || 'Payment' });
          D.payments.unshift({ id: 'PY-' + String(522 + D.payments.length).padStart(4, '0'), dir: 'in', type: ['پارەی گرێبەست', 'Contract payment'], party: c.second, partyEn: c.secondEn, amount: money(amt), value: amt, date: v.date || '٢٠٢٦/٠٦/٠٩', dateEn: v.date || '2026/06/09', method: ['کاش', 'Cash'], status: 'signed', ref: 'گرێبەست ' + c.id, refEn: 'Contract ' + c.id });
          if (D.save) D.save();
        },
      });
      return;
    }
    const cpay = ev.target.closest('[data-cpay]');
    if (cpay) { const [cid, idx] = cpay.dataset.cpay.split(':'); payReceipt(cid, Number(idx)); return; }
    const cvoid = ev.target.closest('[data-cvoid]');
    if (cvoid) { if (confirm('هەڵوەشاندنەوەی ئەمە؟ / Void this record?')) { const c = ctById(cvoid.dataset.cvoid); if (c) c.status = 'cancelled'; if (D.save) D.save(); rerender(); } return; }
    const cstatus = ev.target.closest('[data-cstatus]');
    if (cstatus && ev.type === 'change') { const c = ctById(cstatus.dataset.cstatus); if (c) c.status = cstatus.value; if (D.save) D.save(); rerender(); return; }
    const expand = ev.target.closest('[data-expand]');
    if (expand) {
      const row = document.getElementById('expd-' + expand.dataset.expand);
      if (row) {
        const open = row.classList.toggle('open');
        expand.classList.toggle('expanded', open);
      }
      return;
    }
  });
})();
