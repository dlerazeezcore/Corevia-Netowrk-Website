/* Bnari Kodo — print/PDF engine. Opens a clean print window for receipts & contracts. */
(function () {
  const D = window.DATA;
  const APP = window.APP = window.APP || {};
  const lang = () => (window.bkLang ? window.bkLang() : 'ku');
  const money = (v) => '$' + Number(v || 0).toLocaleString('en-US');
  const co = D.company;

  /* shared print stylesheet (self-contained — no external CSS) */
  const docMap = { tapo: 'سند', kart: 'کارت' };
  const CSS = `
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin: 0; padding: 0; }
    body { font-family: 'IBM Plex Sans Arabic', 'Segoe UI', sans-serif; color: #1E2733; background: #fff; }
    .sheet { width: 210mm; min-height: 297mm; max-height: 297mm; margin: 0 auto; padding: 12mm 15mm; display: flex; flex-direction: column; overflow: hidden; }
    .doc-head { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding-bottom: 10px; border-bottom: 3px double #C8A45D; }
    .brand { display: flex; align-items: center; gap: 14px; }
    .brand img { width: 74px; height: auto; }
    .co-name { font-size: 26px; font-weight: 700; color: #0B1F3A; line-height: 1.1; }
    .co-sub { font-size: 12px; font-weight: 700; letter-spacing: .12em; color: #A8843F; margin-top: 3px; }
    .co-tag { font-size: 11px; color: #6C7585; margin-top: 5px; max-width: 300px; line-height: 1.5; }
    .contacts { text-align: right; font-size: 11px; color: #353D4A; line-height: 1.6; }
    .contacts .ct-row { margin-bottom: 2px; white-space: nowrap; }
    .contacts .ct-ph { white-space: nowrap; color: #0B1F3A; font-weight: 700; unicode-bidi: plaintext; }
    .contacts b { color: #0B1F3A; white-space: nowrap; }
    .contacts .addr { display: block; max-width: 300px; margin-inline-start: auto; margin-top: 2px; color: #6C7585; line-height: 1.4; text-align: right; }
    .title-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 11px 0; }
    .title { font-size: 22px; font-weight: 700; color: #0B1F3A; text-align: center; flex: 1; }
    .no, .date { font-size: 12px; color: #A8843F; font-weight: 600; white-space: nowrap; }
    .date { color: #6C7585; }
    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 10px; }
    .party { background: #F8F7F3; border: 1px solid #DEE2E8; border-radius: 10px; padding: 11px 14px; }
    .p-label { font-size: 12px; color: #A8843F; font-weight: 700; }
    .p-name { font-size: 16px; font-weight: 700; color: #0B1F3A; margin-top: 4px; }
    .p-meta { font-size: 12px; color: #6C7585; margin-top: 4px; line-height: 1.7; }
    .p-meta b { color: #353D4A; }
    .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #DEE2E8; border: 1px solid #DEE2E8; border-radius: 10px; overflow: hidden; margin-bottom: 12px; }
    .cell { background: #fff; padding: 10px 13px; }
    .cell .k { font-size: 11px; color: #6C7585; }
    .cell .v { font-size: 15px; font-weight: 700; color: #0B1F3A; margin-top: 4px; }
    .sec-h { font-size: 14px; font-weight: 700; color: #0B1F3A; background: #FBF7EE; border: 1px solid #EEDFBF; border-radius: 8px; padding: 8px 14px; margin-bottom: 10px; text-align: center; }
    ol.clauses { margin: 0 0 8px; padding: 0; list-style: none; }
    ol.clauses li { font-size: 13px; line-height: 1.55; padding: 4px 0; border-bottom: 1px dotted #DEE2E8; }
    ol.clauses li b { color: #0B1F3A; }
    .signs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 8px; }
    .sign { text-align: center; }
    .sign .lbl { font-size: 12px; font-weight: 700; color: #0B1F3A; }
    .sign .nm { font-size: 11px; color: #6C7585; margin-top: 2px; min-height: 14px; }
    .sign .slot { margin-top: 16px; }
    .sign .slot .sk { font-size: 10px; color: #9BA3B0; text-align: center; margin-top: 5px; }
    .sign .slot .ln { height: 0; border-bottom: 1px solid #6A8AB4; }
    .sign .slot.fp .ln { border-bottom-style: dashed; }    .signs-h { font-size: 12.5px; font-weight: 700; color: #0B1F3A; margin-bottom: 7px; text-align: center; }
    .spacer { flex: 1 1 auto; min-height: 6px; }
    .signs-wrap { margin-bottom: 30px; }
    /* receipt */
    .receipt { max-width: 460px; margin: 0 auto; border: 1.5px dashed #C7CDD6; border-radius: 14px; padding: 26px; }
    .r-head { display: flex; align-items: center; gap: 12px; justify-content: center; padding-bottom: 16px; border-bottom: 1px dashed #DEE2E8; }
    .r-head img { width: 56px; height: auto; }
    .r-title { font-size: 15px; font-weight: 700; color: #0B1F3A; text-align: center; }
    .r-title .num { display: block; font-size: 12px; color: #A8843F; margin-top: 3px; }
    .r-amt { font-size: 36px; font-weight: 800; color: #0B1F3A; text-align: center; margin: 18px 0; }
    .r-rows { display: flex; flex-direction: column; gap: 11px; }
    .r-rows > div { display: flex; justify-content: space-between; font-size: 13px; border-bottom: 1px solid #ECEEF2; padding-bottom: 9px; }
    .r-rows span { color: #6C7585; } .r-rows b { color: #0B1F3A; }
    .r-foot { margin-top: 20px; text-align: center; font-size: 11px; color: #9BA3B0; line-height: 1.8; }
    .r-sign { display: flex; justify-content: space-around; margin-top: 26px; }
    .r-sign .s { text-align: center; width: 45%; }
    .r-sign .line { height: 34px; border-bottom: 1px solid #6A8AB4; }
    .r-sign .lbl { font-size: 11px; color: #6C7585; margin-top: 5px; }
    .stamp { width: 86px; height: 86px; margin: 22px auto 0; border: 2px solid #C8A45D; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #A8843F; font-weight: 700; font-size: 13px; text-align: center; transform: rotate(-8deg); opacity: .55; }
  `;

  function brandHead() {
    return `<div class="doc-head">
      <div class="brand"><img src="${location.origin}${location.pathname.replace(/[^/]*$/, '')}../../assets/logo-mark.svg">
        <div><div class="co-name">${co.nameKu}</div><div class="co-sub">${co.sub} · عقارات</div><div class="co-tag">${co.taglineKu}</div></div></div>
      <div class="contacts">${co.contacts.map((p) => `<div>${p.name} — <b dir="ltr">${p.phone}</b></div>`).join('')}<div style="max-width:230px;margin-top:4px;color:#6C7585">${co.addressKu}</div></div>
    </div>`;
  }

  function openPrint(inner) {
    const logo = location.href.replace(/[^/]*$/, '') + '../../assets/logo-mark.svg';
    const html = `<!doctype html><html dir="rtl" lang="ku"><head><meta charset="utf-8"><title> </title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">
      <style>${CSS}</style></head><body><div class="sheet">${inner.replace(/__LOGO__/g, logo)}</div></body></html>`;
    // Print via a hidden same-document iframe so the browser's header shows no URL/title.
    const old = document.getElementById('bkPrintFrame'); if (old) old.remove();
    const frame = document.createElement('iframe');
    frame.id = 'bkPrintFrame';
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;';
    document.body.appendChild(frame);
    const fd = frame.contentWindow.document;
    fd.open(); fd.write(html); fd.close();
    const go = () => { try { frame.contentWindow.focus(); frame.contentWindow.print(); } catch (e) { /* ignore */ } };
    // wait for the logo + font to load inside the frame
    const img = fd.querySelector('img');
    let done = false; const fire = () => { if (done) return; done = true; setTimeout(go, 250); };
    if (img && !img.complete) { img.onload = fire; img.onerror = fire; setTimeout(fire, 1200); }
    else setTimeout(fire, 500);
  }

  function brandHeadInner() {
    const ph = co.contacts.map((p) => `<div class="ct-row"><span>${p.name}</span> — <span class="ct-ph" dir="ltr">${p.phone}${p.phone2 ? ' / ' + p.phone2 : ''}</span></div>`).join('');
    const addrs = (co.addresses || [co.addressKu]).map((a) => `<span class="addr">${a}</span>`).join('');
    return `<div class="doc-head">
      <div class="brand"><img src="__LOGO__">
        <div><div class="co-name">${co.nameKu}</div><div class="co-sub">${co.sub} · عقارات</div><div class="co-tag">${co.taglineKu}</div></div></div>
      <div class="contacts">${ph}${addrs}</div>
    </div>`;
  }

  /* ── RECEIPT (transactions / payments / agreements) ── */
  APP.printReceipt = function (kind, id) {
    let title, num, amt, rows = [], extraSign = '';
    if (kind === 'transaction') {
      const t = D.transactions.find((x) => x.id === id); if (!t) return;
      title = 'پسوڵەی مامەڵە'; num = t.id; amt = t.amount;
      rows = [['جۆری مامەڵە', t.type[0]], ['موڵک', t.prop], ['لایەن', t.party], ['کۆمسیۆن', t.commission || '—'], ['بەروار', t.date], ['قۆناغ', t.stage[0]]];
      if (t.seller && t.seller !== '—') rows.splice(3, 0, ['فرۆشیار', t.seller]);
    } else if (kind === 'payment') {
      const p = D.payments.find((x) => x.id === id); if (!p) return;
      title = 'پسوڵەی پارەدان'; num = p.id; amt = (p.dir === 'in' ? '+' : '−') + p.amount;
      rows = [['جۆر', p.type[0]], ['لایەن', p.party], ['شێوازی پارەدان', p.method[0]], ['بەروار', p.date], ['پەیوەست بە', p.ref]];
    } else { // agreement
      const a = D.agreements.find((x) => x.id === id); if (!a) return;
      title = 'پسوڵەی ڕێککەوتن'; num = a.id; amt = a.amount;
      rows = [['جۆر', a.type[0]], ['موڵک', a.prop], ['لایەن', a.party], ['بەروار', a.date]];
    }
    const inner = `
      <div class="receipt">
        <div class="r-head"><img src="__LOGO__"><div class="r-title">${co.nameKu} — ${co.sub}<span class="num">${title} · ${num}</span></div></div>
        <div class="r-amt">${amt}</div>
        <div class="r-rows">${rows.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div>
        <div class="r-sign"><div class="s"><div class="line"></div><div class="lbl">واژۆی وەرگر</div></div><div class="s"><div class="line"></div><div class="lbl">واژۆی نووسینگە</div></div></div>
        <div class="stamp">بناری<br>کۆدۆ</div>
        <div class="r-foot">${co.addressKu}<br>${co.contacts.map((p) => p.phone).join(' · ')}</div>
      </div>`;
    openPrint(inner);
  };

  /* ── contract-payment receipt (balance before / after) ── */
  APP.printContractPayment = function (cid, idx) {
    const c = D.contracts.find((x) => x.id === cid); if (!c || !c.payments || !c.payments[idx]) return;
    const p = c.payments[idx];
    const before = c.payments.slice(0, idx).reduce((a, x) => a + (Number(x.amount) || 0), 0);
    const after = before + (Number(p.amount) || 0);
    const total = c.priceVal || 0;
    const rows = [['گرێبەست', 'No. ' + c.id], ['لایەن', c.second], ['بەروار', p.date], ['باڵانسی پێش', '$' + Math.max(0, total - before).toLocaleString('en-US')], ['ئەم پارەدانە', '$' + Number(p.amount).toLocaleString('en-US')], ['باڵانسی دوای', '$' + Math.max(0, total - after).toLocaleString('en-US')], ['شێوازی پارەدان', 'کاش']];
    if (p.note) rows.push(['تێبینی', p.note]);
    const inner = `
      <div class="receipt">
        <div class="r-head"><img src="__LOGO__"><div class="r-title">${co.nameKu} — ${co.sub}<span class="num">پسوڵەی پارەدان · ${c.id}</span></div></div>
        <div class="r-amt">$${Number(p.amount).toLocaleString('en-US')}</div>
        <div class="r-rows">${rows.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div>
        <div class="r-sign"><div class="s"><div class="line"></div><div class="lbl">واژۆی وەرگر</div></div><div class="s"><div class="line"></div><div class="lbl">واژۆی نووسینگە</div></div></div>
        <div class="stamp">بناری<br>کۆدۆ</div>
        <div class="r-foot">${co.addressKu}<br>${co.contacts.map((p) => p.phone).join(' · ')}</div>
      </div>`;
    openPrint(inner);
  };
  APP.printContract = function (id) {
    const c = D.contracts.find((x) => x.id === id) || D.agreements.find((x) => x.id === id); if (!c) return;
    const isRent = c.kind === 'rent';
    const idLine = (label, name, phone, nid, res) => `<div class="party"><div class="p-label">${label}</div><div class="p-name">${name || '—'}</div><div class="p-meta">${res ? 'دانیشتووی ' + res + '<br>' : ''}${phone ? 'مۆبایل: <b dir="ltr">' + phone + '</b><br>' : ''}${nid ? 'ژ. ناسنامە: <b dir="ltr">' + nid + '</b>' : ''}</div></div>`;
    const signBlock = (label, name) => `<div class="sign"><div class="lbl">${label}</div><div class="nm">${name || ''}</div><div class="slot"><div class="ln"></div><div class="sk">واژۆ</div></div><div class="slot fp"><div class="ln"></div><div class="sk">پەنجەمۆر</div></div></div>`;
    const inner = `
      ${brandHeadInner()}
      <div class="title-row"><span class="no">No. ${c.id}</span><div class="title">ڕێکەوتننامەی ${isRent ? 'بەکرێدان' : 'کڕین و فرۆشتن'}</div><span class="date">بەروار: ${c.date}</span></div>
      <div class="parties">
        ${idLine('لایەنی یەکەم (' + (isRent ? 'خاوەن' : 'فرۆشیار') + ')', c.first, c.firstPhone, c.firstNid, c.firstRes)}
        ${idLine('لایەنی دووەم (' + (isRent ? 'بەکرێگر' : 'کڕیار') + ')', c.second, c.secondPhone, c.secondNid, c.secondRes)}
      </div>
      <div class="grid4">
        <div class="cell"><div class="k">ناوچە</div><div class="v">${c.areaKu}</div></div>
        <div class="cell"><div class="k">جۆری موڵک</div><div class="v">${c.propType[0]}${c.landDoc && docMap[c.landDoc] ? ' / ' + docMap[c.landDoc] : ''}</div></div>
        <div class="cell"><div class="k">ژمارەی موڵک</div><div class="v">${c.propNumber}</div></div>
        <div class="cell"><div class="k">بەرواری گەیاندن</div><div class="v">${c.deliver}</div></div>
      </div>
      <div class="sec-h">هەردوو لایەن لەسەر ئەم خاڵانەی خوارەوە ڕێککەوتن:</div>
      <ol class="clauses">
        <li><b>یەکەم:</b> لایەنی یەکەم ${isRent ? 'بەکرێدانی' : 'فرۆشتنی'} موڵکی ئاماژەپێکراو بە لایەنی دووەم ڕازییە بەو مەرجانەی لەم گرێبەستەدا هاتووە.</li>
        <li><b>دووەم:</b> نرخی ${isRent ? 'کرێ' : 'فرۆشتن'}ی ڕێککەوتراو بریتییە لە <b>${c.price}</b>، کە لایەنی دووەم پابەندە بە پێدانی.</li>
        <li><b>سێیەم:</b> بڕی پێشەکی <b>${c.advance}</b> وەرگیراوە، بڕی ماوە بەپێی ڕێککەوتن دەدرێت.</li>
        <li><b>چوارەم:</b> لایەنی یەکەم پابەندە بە گەیاندنی موڵکەکە لە بەرواری <b>${c.deliver}</b>.</li>
        <li><b>پێنجەم:</b> هەردوو لایەن پابەندن بە پێدانی ڕێژەی <b>${c.commission}</b> وەک کۆمسیۆن بە نووسینگەی (بناری کۆدۆ).</li>
        <li><b>شەشەم:</b> نووسینگە بەرپرسیار نییە لە هیچ کێشەیەکی یاسایی نێوان هەردوو لایەن دوای واژۆکردن.</li>
        <li><b>حەوتەم:</b> مەسروفاتی قانونی بۆ هەردوولایە.</li>
      </ol>
      <div class="spacer"></div>
      <div class="signs-wrap">
      <div class="signs-h">واژۆ و پەنجەمۆر</div>
      <div class="signs">
        ${signBlock('لایەنی یەکەم (' + (isRent ? 'خاوەن' : 'فرۆشیار') + ')', c.first)}
        ${signBlock('شاهیدی یەکەم', c.witness1)}
        ${signBlock('شاهیدی دووەم', c.witness2)}
        ${signBlock('لایەنی دووەم (' + (isRent ? 'بەکرێگر' : 'کڕیار') + ')', c.second)}
      </div>
      </div>`;
    openPrint(inner);
  };

  /* click wiring */
  document.addEventListener('click', (e) => {
    const pr = e.target.closest('[data-print]');
    if (pr) { const [kind, id] = pr.dataset.print.split(':'); if (kind === 'contract') APP.printContract(id); else APP.printReceipt(kind, id); }
  });
})();
