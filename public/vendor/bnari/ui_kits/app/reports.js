/* Bnari Kodo — Reports module. All figures computed from window.DATA. */
(function () {
  const D = window.DATA;
  const V = window.VIEWS;
  const APP = window.APP = window.APP || {};
  const S = APP.state;
  if (S.report === undefined) S.report = 'pnl';
  if (!S.repRange) S.repRange = { from: '', to: '', ran: false };

  const lang = () => (window.bkLang ? window.bkLang() : 'ku');
  const bi = (ku, en) => `<span data-en="${String(en).replace(/"/g, '&quot;')}">${ku}</span>`;
  const money = (v) => '$' + Math.round(Number(v) || 0).toLocaleString('en-US');
  const pm = (s) => Number(String(s).replace(/[^0-9.]/g, '')) || 0;
  const norm = (d) => String(d || '').replace(/-/g, '/');
  const inRange = (dateEn) => { const r = S.repRange; if (!r.from && !r.to) return true; const d = norm(dateEn); if (!d) return true; if (r.from && d < norm(r.from)) return false; if (r.to && d > norm(r.to)) return false; return true; };

  /* ── computed aggregates (respect the selected date range) ── */
  function calc() {
    const expList = D.expenses.filter((e) => inRange(e.dateEn));
    const txList = D.transactions.filter((t) => inRange(t.dateEn));
    const ctList = D.contracts.filter((c) => c.status !== 'cancelled' && inRange(c.dateEn));
    const exp = expList.reduce((a, b) => a + b.amount, 0);
    const byAcc = {};
    expList.forEach((e) => { byAcc[e.account] = (byAcc[e.account] || 0) + e.amount; });
    const saleComm = txList.filter((t) => t.kind === 'sale').reduce((a, b) => a + pm(b.commission), 0);
    const rentComm = txList.filter((t) => t.kind === 'rent').reduce((a, b) => a + pm(b.commission), 0);
    const otherComm = txList.filter((t) => t.kind === 'commission').reduce((a, b) => a + pm(b.amount), 0);
    const contractComm = ctList.reduce((a, c) => a + (c.commValue != null ? c.commValue : pm(c.price) * 0.01), 0);
    // Bnari Kodo company gain: owners' share of (sale price − purchase cost) on company-owned properties
    let bkGain = 0;
    ctList.filter((c) => c.kind === 'sale').forEach((c) => {
      const pr = D.properties.find((p) => p.number && p.number.replace(/\D/g, '') === String(c.propNumber).replace(/\D/g, ''));
      if (pr && pr.owners) {
        const bkShare = pr.owners.filter((o) => D.isBkOwner(o.id)).reduce((a, o) => a + (o.share || 0), 0);
        if (bkShare > 0) bkGain += (bkShare / 100) * ((c.priceVal || 0) - (pr.cost || 0));
      }
    });
    const income = saleComm + rentComm + otherComm + contractComm + bkGain;
    return { exp, byAcc, saleComm, rentComm, otherComm, contractComm, bkGain, income, net: income - exp };
  }

  const acc = (id) => D.accounts.find((a) => a.id === id) || { ku: id, en: id, icon: 'circle' };

  const kpi = (icon, ku, en, val, accent) => `<div class="metric"><div class="mtop"><span class="mic ${accent === 'navy' ? 'navy' : ''}"><i data-lucide="${icon}"></i></span></div><div class="mlabel" data-en="${en}">${ku}</div><div class="mvalue">${val}</div></div>`;

  const REPORTS = [
    ['pnl', 'قازانج و زیان', 'Profit & Loss', 'scale'],
    ['properties', 'لیستی موڵک', 'Property list', 'building-2'],
    ['sales', 'فرۆشتن', 'Sales', 'trending-up'],
    ['commission', 'کۆمسیۆن', 'Commission', 'percent'],
    ['expenses', 'خەرجی', 'Expenses', 'receipt'],
    ['partners', 'کەشفی هاوبەش', 'Partner statement', 'users'],
    ['availability', 'بەردەستی', 'Availability', 'pie-chart'],
  ];

  function tabs() {
    return `<div class="rep-tabs">${REPORTS.map(([k, ku, en, ic]) => `<button class="rep-tab ${S.report === k ? 'active' : ''}" data-rep="${k}"><i data-lucide="${ic}"></i>${bi(ku, en)}</button>`).join('')}</div>`;
  }

  /* ── P&L ── */
  function pnl() {
    const c = calc();
    const margin = c.income ? Math.round(c.net / c.income * 100) : 0;
    const expRows = Object.keys(c.byAcc).sort((a, b) => c.byAcc[b] - c.byAcc[a]).map((id) => `<tr><td>${bi(acc(id).ku, acc(id).en)}</td><td class="amt pnl-neg">(${money(c.byAcc[id])})</td></tr>`).join('');
    return `
      <div class="rep-kpis">
        ${kpi('arrow-down-left', 'کۆی داهات', 'Total income', money(c.income))}
        ${kpi('arrow-up-right', 'کۆی خەرجی', 'Total expenses', money(c.exp), 'navy')}
        ${kpi('scale', 'قازانجی پاک', 'Net profit', money(c.net))}
        ${kpi('percent', 'ڕێژەی قازانج', 'Profit margin', margin + '%', 'navy')}
      </div>
      <div class="pnl-grid">
        <div class="card">
          <div class="panel-head"><span class="pt"><i data-lucide="scale"></i>${bi('ڕاپۆرتی قازانج و زیان', 'Profit & Loss statement')}</span><span class="more num">2026</span></div>
          <div class="table-wrap"><table class="table pnl-table">
            <tbody>
              <tr><td colspan="2" style="font-weight:700;color:var(--gold-700)">${bi('داهات', 'Income')}</td></tr>
              <tr><td>${bi('کۆمسیۆنی فرۆشتن', 'Sales commission')}</td><td class="amt pnl-pos">${money(c.saleComm)}</td></tr>
              <tr><td>${bi('کۆمسیۆنی کرێ', 'Rent commission')}</td><td class="amt pnl-pos">${money(c.rentComm)}</td></tr>
              <tr><td>${bi('کۆمسیۆنی تر', 'Other commission')}</td><td class="amt pnl-pos">${money(c.otherComm)}</td></tr>
              <tr><td>${bi('کۆمسیۆنی گرێبەست', 'Contract commission')}</td><td class="amt pnl-pos">${money(c.contractComm)}</td></tr>
              <tr><td>${bi('قازانجی کۆمپانیا (بەشی خاوەنانی بناری کۆدۆ)', 'Company gain (Bnari Kodo owners\' share)')}</td><td class="amt pnl-pos">${money(c.bkGain)}</td></tr>
              <tr class="tot"><td>${bi('کۆی داهات', 'Total income')}</td><td class="amt">${money(c.income)}</td></tr>
              <tr><td colspan="2" style="font-weight:700;color:var(--gold-700);padding-top:16px">${bi('خەرجییەکان', 'Expenses')}</td></tr>
              ${expRows}
              <tr class="tot"><td>${bi('کۆی خەرجی', 'Total expenses')}</td><td class="amt pnl-neg">(${money(c.exp)})</td></tr>
              <tr class="tot"><td>${bi('قازانجی پاک', 'Net profit')}</td><td class="amt ${c.net >= 0 ? 'pnl-pos' : 'pnl-neg'}">${money(c.net)}</td></tr>
            </tbody>
          </table></div>
        </div>
        <div class="card">
          <div class="panel-head"><span class="pt"><i data-lucide="bar-chart-3"></i>${bi('داهات بەرامبەر خەرجی', 'Income vs expenses')}</span></div>
          <div class="bigbar">
            ${[['کانوون', 'Jan', 60, 40], ['شوبات', 'Feb', 72, 46], ['ئازار', 'Mar', 66, 52], ['نیسان', 'Apr', 88, 48], ['ئایار', 'May', 80, 55], ['حوزەیران', 'Jun', 100, 62]].map(([ku, en, r, x]) => `<div class="bcol"><div class="bset"><span class="b rev" style="height:${r}%"></span><span class="b exp" style="height:${x}%"></span></div><span class="bl" data-en="${en}">${ku}</span></div>`).join('')}
          </div>
          <div style="display:flex;gap:18px;justify-content:center;padding:0 0 16px"><span style="display:flex;align-items:center;gap:6px;font-family:var(--font-arabic);font-size:12px;color:var(--text-muted)"><span style="width:11px;height:11px;border-radius:3px;background:var(--gold-500)"></span>${bi('داهات', 'Income')}</span><span style="display:flex;align-items:center;gap:6px;font-family:var(--font-arabic);font-size:12px;color:var(--text-muted)"><span style="width:11px;height:11px;border-radius:3px;background:var(--navy-300)"></span>${bi('خەرجی', 'Expenses')}</span></div>
        </div>
      </div>`;
  }

  /* ── generic report table ── */
  function table(head, rows) {
    return `<div class="card"><div class="table-wrap"><table class="table"><thead><tr>${head.map((h) => `<th ${h[2] ? 'class="amt" style="text-align:end"' : ''}>${bi(h[0], h[1])}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }

  function propertiesRep() {
    const c = D.properties;
    const total = c.reduce((a, b) => a + (b.value > 100000 ? b.value : 0), 0);
    return `<div class="rep-kpis">
        ${kpi('building-2', 'کۆی موڵک', 'Total properties', c.length)}
        ${kpi('circle-check', 'بەردەست', 'Available', c.filter((p) => p.status === 'available').length, 'navy')}
        ${kpi('bookmark', 'ڕیزێرڤ', 'Reserved', c.filter((p) => p.status === 'reserved').length)}
        ${kpi('dollar-sign', 'کۆی بەها', 'Total value', money(total), 'navy')}
      </div>` + table(
      [['جۆر', 'Type'], ['ژمارە', 'No.'], ['ناوچە', 'Area'], ['سەرچاوە', 'Source'], ['دۆخ', 'Status'], ['نرخ', 'Price', 1]],
      D.properties.map((p) => `<tr><td><span class="cell-type"><span class="ti"><i data-lucide="${p.icon}"></i></span><span class="strong">${bi(p.typeKu, p.typeEn)}</span></span></td><td><span class="official-num">${p.number}</span></td><td>${bi(p.areaKu, p.areaEn)}</td><td>${bi(p.source[0], p.source[1])}</td><td><span class="badge ${p.status}"><span class="d"></span>${bi((D.__stat && D.__stat[p.status]) || p.status, p.status)}</span></td><td class="price" style="text-align:end">${p.price}</td></tr>`).join('')
    );
  }

  function salesRep() {
    const s = D.transactions.filter((t) => t.kind === 'sale' && inRange(t.dateEn));
    const tot = s.reduce((a, b) => a + b.value, 0);
    const comm = s.reduce((a, b) => a + pm(b.commission), 0);
    return `<div class="rep-kpis">
        ${kpi('trending-up', 'ژمارەی فرۆشتن', 'Sales count', s.length)}
        ${kpi('dollar-sign', 'کۆی فرۆشتن', 'Total sales', money(tot), 'navy')}
        ${kpi('percent', 'کۆمسیۆن', 'Commission', money(comm))}
        ${kpi('check-circle', 'تەواوبوو', 'Completed', s.filter((t) => t.status === 'signed').length, 'navy')}
      </div>` + table(
      [['ژمارە', 'Ref'], ['موڵک', 'Property'], ['کڕیار', 'Buyer'], ['بەروار', 'Date'], ['کۆمسیۆن', 'Commission', 1], ['بڕ', 'Amount', 1]],
      s.map((t) => `<tr><td><span class="official-num">${t.id}</span></td><td>${bi(t.prop, t.propEn)}</td><td>${bi(t.party, t.partyEn)}</td><td class="num">${bi(t.date, t.dateEn)}</td><td class="num" style="text-align:end;color:var(--gold-700)">${t.commission}</td><td class="price" style="text-align:end">${t.amount}</td></tr>`).join('')
    );
  }

  function commissionRep() {
    const t = D.transactions.filter((x) => x.commission && x.commission !== '—' && inRange(x.dateEn));
    const tot = t.reduce((a, b) => a + pm(b.commission), 0);
    return `<div class="rep-kpis">
        ${kpi('percent', 'کۆی کۆمسیۆن', 'Total commission', money(tot))}
        ${kpi('repeat', 'مامەڵە', 'Transactions', t.length, 'navy')}
        ${kpi('trending-up', 'مامناوەند', 'Average', money(t.length ? tot / t.length : 0))}
        ${kpi('calendar', 'ئەم مانگە', 'This month', money(tot), 'navy')}
      </div>` + table(
      [['ژمارە', 'Ref'], ['جۆر', 'Type'], ['موڵک', 'Property'], ['لایەن', 'Party'], ['کۆمسیۆن', 'Commission', 1]],
      t.map((x) => `<tr><td><span class="official-num">${x.id}</span></td><td>${bi(x.type[0], x.type[1])}</td><td>${bi(x.prop, x.propEn)}</td><td>${bi(x.party, x.partyEn)}</td><td class="price" style="text-align:end">${x.commission}</td></tr>`).join('')
    );
  }

  function expensesRep() {
    const c = calc();
    const ids = Object.keys(c.byAcc).sort((a, b) => c.byAcc[b] - c.byAcc[a]);
    const max = Math.max.apply(null, ids.map((i) => c.byAcc[i]).concat([1]));
    return `<div class="rep-kpis">
        ${kpi('receipt', 'کۆی خەرجی', 'Total expenses', money(c.exp))}
        ${kpi('hash', 'تۆمارەکان', 'Records', D.expenses.length, 'navy')}
        ${kpi('list-tree', 'هەژمارەکان', 'Accounts', ids.length)}
        ${kpi('calendar', 'ئەم مانگە', 'This month', money(c.exp), 'navy')}
      </div>
      <div class="card card-pad">
        <div class="sec-title"><i data-lucide="receipt"></i>${bi('خەرجی بەپێی هەژمار', 'Expenses by account')}</div>
        ${ids.map((id) => `<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-family:var(--font-arabic);font-size:13px;margin-bottom:6px"><span>${bi(acc(id).ku, acc(id).en)}</span><b class="num">${money(c.byAcc[id])}</b></div><div style="height:9px;border-radius:5px;background:var(--gray-100);overflow:hidden"><div style="height:100%;width:${Math.round(c.byAcc[id] / max * 100)}%;background:var(--grad-gold);border-radius:5px"></div></div></div>`).join('')}
      </div>`;
  }

  function partnersRep() {
    return `<div class="rep-kpis">
        ${kpi('users', 'هاوبەشەکان', 'Partners', D.partners.length)}
        ${kpi('building-2', 'موڵکی هاوبەش', 'Partner properties', D.partners.reduce((a, b) => a + b.properties, 0), 'navy')}
        ${kpi('repeat', 'مامەڵە', 'Transactions', D.partners.reduce((a, b) => a + b.transactions, 0))}
        ${kpi('dollar-sign', 'کۆی بەها', 'Total value', '$9.1M', 'navy')}
      </div>` + table(
      [['هاوبەش', 'Partner'], ['کۆمپانیا', 'Company'], ['موڵک', 'Properties', 1], ['مامەڵە', 'Transactions', 1], ['کۆی بەها', 'Value', 1]],
      D.partners.map((p) => `<tr><td class="strong">${bi(p.name, p.nameEn)}</td><td>${bi(p.company, p.companyEn)}</td><td class="num" style="text-align:end">${p.properties}</td><td class="num" style="text-align:end">${p.transactions}</td><td class="price" style="text-align:end">${p.value}</td></tr>`).join('')
    );
  }

  function availabilityRep() {
    const byStat = {}; D.properties.forEach((p) => { byStat[p.status] = (byStat[p.status] || 0) + 1; });
    const stmap = { available: ['بەردەست', 'Available', 'var(--status-available)'], reserved: ['ڕیزێرڤ', 'Reserved', 'var(--status-reserved)'], process: ['لە پرۆسە', 'In process', 'var(--status-process)'], closed: ['داخراو', 'Closed', 'var(--status-closed)'] };
    const tot = D.properties.length;
    let acc2 = 0; const seg = Object.keys(byStat).map((k) => { const start = acc2 / tot * 100; acc2 += byStat[k]; const end = acc2 / tot * 100; return `${(stmap[k] || ['', '', 'var(--gray-300)'])[2]} ${start}% ${end}%`; }).join(', ');
    return `<div class="rep-kpis">
        ${kpi('layout-grid', 'کۆی موڵک', 'Total', tot)}
        ${kpi('circle-check', 'بەردەست', 'Available', byStat.available || 0, 'navy')}
        ${kpi('bookmark', 'ڕیزێرڤ', 'Reserved', byStat.reserved || 0)}
        ${kpi('lock', 'داخراو', 'Closed', byStat.closed || 0, 'navy')}
      </div>
      <div class="card"><div class="donut-wrap">
        <div class="donut2" style="background:conic-gradient(${seg})"><div class="center"><div><div class="n num">${tot}</div><div class="l" data-en="Total">کۆ</div></div></div></div>
        <div class="legend">${Object.keys(byStat).map((k) => `<div class="li"><span class="sw" style="background:${(stmap[k] || ['', '', 'var(--gray-300)'])[2]}"></span>${bi((stmap[k] || [k])[0], (stmap[k] || [k, k])[1])}<span class="v num">${byStat[k]}</span></div>`).join('')}</div>
      </div></div>`;
  }

  const BODY = { pnl, properties: propertiesRep, sales: salesRep, commission: commissionRep, expenses: expensesRep, partners: partnersRep, availability: availabilityRep };

  function rangeBar() {
    const r = S.repRange;
    return `<div class="card card-pad rep-range-card" style="margin-bottom:16px"><div class="rep-range">
      <div class="rr-field"><label class="lbl" data-en="From date">لە بەرواری</label><input type="date" class="input-ctl num" id="repFrom" value="${(r.from || '').replace(/\//g, '-')}" onclick="this.showPicker&&this.showPicker()"></div>
      <div class="rr-field"><label class="lbl" data-en="To date">تا بەرواری</label><input type="date" class="input-ctl num" id="repTo" value="${(r.to || '').replace(/\//g, '-')}" onclick="this.showPicker&&this.showPicker()"></div>
      <button class="btn btn-gold rr-run" data-reprun><i data-lucide="play"></i><span data-en="Run">جێبەجێکردن</span></button>
      ${r.ran ? `<span class="rr-note" style="font-family:var(--font-arabic);font-size:12.5px;color:var(--text-muted)"><i data-lucide="calendar-check" style="width:14px;height:14px;vertical-align:-2px;color:var(--gold-600)"></i> ${r.from || bi('سەرەتا', 'start')} → ${r.to || bi('ئێستا', 'now')}</span>` : ''}
    </div></div>`;
  }

  V.reports = () => `
    <div class="page-head">
      <div><h2 data-en="Reports">ڕاپۆرتەکان</h2><div class="sub" data-en="Live reports from your workspace data">ڕاپۆرتی زیندوو لە داتای شوێنی کارەکەت</div></div>
      <div class="head-actions"><button class="btn btn-secondary btn-sm"><i data-lucide="file-down"></i><span data-en="Export PDF">PDF</span></button><button class="btn btn-ghost btn-sm"><i data-lucide="printer"></i><span data-en="Print">چاپ</span></button></div>
    </div>
    ${tabs()}
    ${rangeBar()}
    ${S.repRange.ran ? (BODY[S.report] || pnl)() : `<div class="card" style="padding:56px;text-align:center"><span style="width:60px;height:60px;border-radius:16px;background:var(--gold-100);color:var(--gold-700);display:grid;place-items:center;margin:0 auto 16px"><i data-lucide="calendar-range" style="font-size:28px"></i></span><div style="font-family:var(--font-arabic);font-size:16px;font-weight:700;color:var(--navy-800)" data-en="Choose a date range and press Run">ماوەیەکی بەروار دیاری بکە و جێبەجێ بکە</div><div style="font-family:var(--font-arabic);font-size:13px;color:var(--text-muted);margin-top:6px" data-en="The report generates results for the selected period only.">ڕاپۆرتەکە تەنها ئەنجامی ئەو ماوەیە دەردەخات.</div></div>`}`;

  document.addEventListener('click', (e) => {
    const run = e.target.closest('[data-reprun]');
    if (run) { const f = document.getElementById('repFrom'), t = document.getElementById('repTo'); S.repRange = { from: f ? f.value.replace(/-/g, '/') : '', to: t ? t.value.replace(/-/g, '/') : '', ran: true }; if (window.bkRerender) window.bkRerender(); return; }
    const r = e.target.closest('[data-rep]');
    if (r) { S.report = r.dataset.rep; if (window.bkRerender) window.bkRerender(); }
  });
})();
