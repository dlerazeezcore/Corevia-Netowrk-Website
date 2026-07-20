/* Bnari Kodo — app view templates. Authored in Kurdish (default) with data-en for EN swap. */
window.VIEWS = {};

/* ───────────── HOME (full-screen brand) ───────────── */
VIEWS.home = () => `
  <div class="home-screen">
    <div class="home-logo">
      <img src="../../assets/logo-mark.svg" alt="Bnari Kodo">
    </div>
    <div class="home-name">Bnari <b>Kodo</b></div>
    <div class="home-tag" data-en="Real Estate Management · Erbil">بەڕێوەبردنی خانووبەرە · هەولێر</div>
  </div>
`;

/* ───────────── DASHBOARD ───────────── */
VIEWS.dashboard = () => `
  <div class="quick-actions">
    ${[
      ['building-2','زیادکردنی موڵک','Add property','properties'],
      ['handshake','دروستکردنی مامەڵە','Create deal','transactions'],
      ['file-signature','دروستکردنی گرێبەست','Create contract','contracts'],
      ['file-clock','ڕێککەوتنی دەرەکی','External agreement','agreements'],
      ['receipt','زیادکردنی خەرجی','Add expense','expenses'],
      ['bar-chart-3','بینینی ڕاپۆرت','View report','reports'],
    ].map(([ic,ku,en,v])=>`<button class="qa" data-view="${v}"><span class="qic"><i data-lucide="${ic}"></i></span><span class="ql" data-en="${en}">${ku}</span></button>`).join('')}
  </div>

  <div class="stat-grid">
    ${[
      ['building-2','کۆی موڵکەکان','Total properties','1,284','8%','up','gold'],
      ['layout-grid','بەردەستییەکان','Availabilities','312','4%','up','navy'],
      ['trees','زەوی بەردەست','Available lands','118','3%','up','gold'],
      ['home','خانووی بەردەست','Available houses','94','2%','up','navy'],
    ].map(([ic,ku,en,v,d,dir,acc])=>metric(ic,ku,en,v,'',d,dir,acc)).join('')}
  </div>
  <div class="stat-grid">
    ${[
      ['users','موڵکی هاوبەش','Partner properties','196','','','gold'],
      ['user-round','موڵکی کڕیار/خاوەن','Customer properties','143','','','navy'],
      ['repeat','مامەڵە لە پرۆسەدا','In-process deals','47','1%','down','gold'],
      ['check-circle','داخراوی ئەم مانگە','Closed this month','$1.4M','12%','up','navy'],
    ].map(([ic,ku,en,v,d,dir,acc])=>metric(ic,ku,en,v,'',d,dir,acc)).join('')}
  </div>

  <div class="dash-cols">
    <div class="card">
      <div class="panel-head"><span class="pt"><i data-lucide="trending-up"></i><span data-en="Expected commission — 6 months">کۆمسیۆنی چاوەڕوانکراو — ٦ مانگ</span></span><span class="more" data-en="Details">وردەکاری</span></div>
      <div class="barchart">
        ${[['کانوون','Jan',40],['شوبات','Feb',58],['ئازار','Mar',46],['نیسان','Apr',72],['ئایار','May',60],['حوزەیران','Jun',95]].map(([ku,en,h],i)=>`<div class="col"><div class="bar ${i===5?'g':''}" style="height:${h}%"></div><span class="bl" data-en="${en}">${ku}</span></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="panel-head"><span class="pt"><i data-lucide="pie-chart"></i><span data-en="Availability by status">بەردەستی بەپێی دۆخ</span></span></div>
      <div class="donut-wrap">
        <div class="donut2" style="background:conic-gradient(var(--status-available) 0 54%, var(--status-reserved) 54% 74%, var(--status-process) 74% 88%, var(--status-closed) 88% 100%)">
          <div class="center"><div><div class="n">312</div><div class="l" data-en="Total">کۆ</div></div></div>
        </div>
        <div class="legend">
          ${[['var(--status-available)','بەردەست','Available','168'],['var(--status-reserved)','ڕیزێرڤ','Reserved','62'],['var(--status-process)','لە پرۆسە','In process','44'],['var(--status-closed)','داخراو','Closed','38']].map(([c,ku,en,v])=>`<div class="li"><span class="sw" style="background:${c}"></span><span data-en="${en}">${ku}</span><span class="v num">${v}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div class="dash-cols" style="grid-template-columns:1.6fr 1fr">
    <div class="card">
      <div class="panel-head"><span class="pt"><i data-lucide="layout-grid"></i><span data-en="Internal availability">بەردەستی ناوخۆیی</span></span><span class="more" data-en="View all">بینینی هەموو</span></div>
      <div class="table-wrap">${availTable(5)}</div>
    </div>
    <div class="card">
      <div class="panel-head"><span class="pt"><i data-lucide="file-clock"></i><span data-en="Recent agreements">ڕێککەوتنە نوێیەکان</span></span></div>
      <div style="padding:8px 12px">
        ${[['ڕیزێرڤ ئیتالی ڤیلەج','Italian Village reservation','signed','واژۆکراو','Signed'],['کۆمسیۆن کەسنەزان','Kasnazan commission','draft','ڕەشنووس','Draft'],['کرێی ئیمپایەر B-403','Empire B-403 rent','converted','گۆڕدراو','Converted'],['فرۆشتنی خێرا دوکان ٧٧','Quick sale shop 77','signed','واژۆکراو','Signed']].map(([ku,en,st,stku,sten])=>`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 8px;border-bottom:1px solid var(--border-subtle)"><div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1"><span style="width:34px;height:34px;border-radius:9px;background:var(--gold-100);color:var(--gold-700);display:grid;place-items:center;flex:none"><i data-lucide="file-text" style="font-size:16px"></i></span><span style="font-family:var(--font-arabic);font-size:13px;font-weight:600;color:var(--navy-800);overflow:hidden;text-overflow:ellipsis;white-space:nowrap" data-en="${en}">${ku}</span></div><span class="badge ${st}" style="flex:none"><span class="d"></span><span data-en="${sten}">${stku}</span></span></div>`).join('')}
      </div>
    </div>
  </div>
`;

/* ───────────── PROPERTIES ───────────── */
VIEWS.properties = () => `
  <div class="page-head">
    <div><h2 data-en="Property — Land No. 245">موڵک — زەوی ژمارە ٢٤٥</h2><div class="sub" data-en="Kasnazan · Buyer/Owner source · For sale">کەسنەزان · سەرچاوە کڕیار/خاوەن · بۆ فرۆشتن</div></div>
    <div class="head-actions">
      <button class="btn btn-secondary btn-sm"><i data-lucide="pencil"></i><span data-en="Edit">دەستکاری</span></button>
      <button class="btn btn-gold btn-sm"><i data-lucide="file-signature"></i><span data-en="Create contract">دروستکردنی گرێبەست</span></button>
    </div>
  </div>
  <div class="tabs">
    ${[['info','زانیاری بنەڕەتی','Basic info','info'],['map','نەخشە','Map','map-pin'],['own','خاوەندارێتی / سەرچاوە','Ownership','badge-check'],['avail','بەردەستی','Availability','layout-grid'],['docs','بەڵگەنامەکان','Documents','paperclip'],['deals','مامەڵەکان','Transactions','repeat'],['notes','تێبینییەکان','Notes','sticky-note']].map((t,i)=>`<button class="tab ${i===0?'active':''}"><i data-lucide="${t[3]}"></i><span data-en="${t[2]}">${t[1]}</span></button>`).join('')}
  </div>
  <div class="detail-grid">
    <div class="card card-pad">
      <div class="field-grid">
        ${[
          ['جۆری موڵک','Property type','زەوی','Land','trees',0],
          ['ژمارەی فەرمی','Official number','No. 245','No. 245','hash',1],
          ['ناوچە','Area','کەسنەزان','Kasnazan','map-pin',0],
          ['ڕووبەر','Size','٥٠٠ م²','500 m²','ruler',0],
          ['نرخ','Price','$250,000','$250,000','tag',0],
          ['مەبەست','Purpose','فرۆشتن','Sale','target',0],
          ['سەرچاوە','Source','کڕیار / خاوەن','Buyer / Owner','user-round',0],
          ['دۆخی بەردەستی','Status','بەردەست','Available','circle-check',0],
        ].map(([k,ke,v,ve,ic,imp])=>`<div class="kv ${imp?'imp':''}"><div class="k"><i data-lucide="${ic}"></i><span data-en="${ke}">${k}</span></div><div class="v" data-en="${ve}">${v}</div></div>`).join('')}
      </div>
      <div style="margin-top:20px;padding-top:18px;border-top:1px solid var(--border-subtle)">
        <div class="kv"><div class="k"><i data-lucide="sticky-note"></i><span data-en="Note">تێبینی</span></div><div class="v" style="font-weight:500;line-height:1.8" data-en="Corner plot, two street frontages. Owner ready to sell, papers complete.">زەوی گۆشە، ڕووی بۆ دوو شەقام. خاوەن ئامادەیە بۆ فرۆشتن، بەڵگەنامەکان تەواون.</div></div>
      </div>
    </div>
    <div>
      <div class="card card-pad" style="margin-bottom:16px">
        <div class="kv imp" style="margin-bottom:14px"><div class="k"><i data-lucide="hash"></i><span data-en="Official number">ژمارەی فەرمی</span></div><div class="v" style="font-size:20px"><span class="official-num" style="font-size:16px">No. 245</span></div></div>
        <div class="map-card"><div class="mp"><span class="pin"><span class="ring"></span><span class="core"></span></span></div><span class="mlabel">36.2891° N, 44.0089° E</span></div>
        <a class="btn btn-secondary btn-sm" style="width:100%;margin-top:12px" href="#"><i data-lucide="external-link"></i><span data-en="Open in Google Maps">کردنەوە لە Google Maps</span></a>
      </div>
      <div class="card card-pad">
        <div style="font-family:var(--font-arabic);font-size:13px;font-weight:700;color:var(--navy-800);margin-bottom:12px" data-en="Documents">بەڵگەنامەکان</div>
        ${[['سەنەدی موڵک','Title deed'],['نەخشەی فەرمی','Official map'],['ناسنامەی خاوەن','Owner ID']].map(([ku,en])=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border-subtle)"><i data-lucide="file-text" style="font-size:17px;color:var(--gold-600)"></i><span style="font-family:var(--font-arabic);font-size:13px;color:var(--navy-800)" data-en="${en}">${ku}</span><i data-lucide="download" style="font-size:15px;color:var(--text-muted);margin-inline-start:auto;cursor:pointer"></i></div>`).join('')}
        <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:10px;color:var(--gold-700)"><i data-lucide="upload"></i><span data-en="Upload document">بارکردنی بەڵگەنامە</span></button>
      </div>
    </div>
  </div>
`;

/* ───────────── AVAILABILITIES ───────────── */
VIEWS.availabilities = () => `
  <div class="page-head">
    <div><h2 data-en="Availabilities">بەردەستییەکان</h2><div class="sub" data-en="Internal board — not a public listing">تەختەی ناوخۆیی — نەک بڵاوکراوەی گشتی</div></div>
    <div class="head-actions">
      <button class="btn btn-secondary btn-sm"><i data-lucide="sliders-horizontal"></i><span data-en="Filter">فلتەر</span></button>
      <button class="btn btn-gold btn-sm"><i data-lucide="plus"></i><span data-en="Add availability">زیادکردنی بەردەستی</span></button>
    </div>
  </div>
  <div class="filters">
    ${[['هەموو','All','312',1],['بەردەست','Available','168',0],['ڕیزێرڤ','Reserved','62',0],['لە پرۆسە','In process','44',0],['داخراو','Closed','38',0]].map(([ku,en,c,a])=>`<button class="chip ${a?'active':''}"><span data-en="${en}">${ku}</span><span class="c">${c}</span></button>`).join('')}
  </div>
  <div class="card"><div class="table-wrap">${availTable(8,true)}</div></div>
`;

/* ───────────── EXTERNAL AGREEMENTS ───────────── */
VIEWS.agreements = () => `
  <div class="page-head">
    <div><h2 data-en="External Agreements">ڕێککەوتنە دەرەکییەکان</h2><div class="sub" data-en="Quick, less-formal internal agreements">ڕێککەوتنی خێرا و ناوخۆیی، کەمتر فەرمی</div></div>
    <div class="head-actions"><button class="btn btn-gold btn-sm"><i data-lucide="plus"></i><span data-en="New agreement">ڕێککەوتنی نوێ</span></button></div>
  </div>
  <div style="font-family:var(--font-arabic);font-size:13px;font-weight:700;color:var(--navy-800);margin-bottom:12px" data-en="Choose agreement type">جۆری ڕێککەوتن هەڵبژێرە</div>
  <div class="type-grid">
    ${[
      ['bookmark-check','ڕێککەوتنی ڕیزێرڤ','Reservation','گرتنی موڵک بۆ ماوەیەک','Hold a property',1],
      ['zap','فرۆشتنی خێرا','Quick sale','ڕێککەوتنی خێرای فرۆشتن','Fast sale terms',0],
      ['key','کرێی خێرا','Quick rent','ڕێککەوتنی خێرای کرێ','Fast rent terms',0],
      ['percent','کۆمسیۆن','Commission','ڕێککەوتنی کۆمسیۆن','Commission terms',0],
      ['users','هاوبەش','Partnership','ڕێککەوتنی هاوبەش','Partner deal',0],
      ['receipt','پسوولەی پێشەکی','Advance receipt','پسوولەی پارەی پێشەکی','Advance payment',0],
    ].map(([ic,ku,en,dku,den,sel])=>`<div class="type-card ${sel?'sel':''}"><span class="tic"><i data-lucide="${ic}"></i></span><div class="tn" data-en="${en}">${ku}</div><div class="td" data-en="${den}">${dku}</div></div>`).join('')}
  </div>
  <div class="card">
    <div class="panel-head">
      <span class="pt"><i data-lucide="file-clock"></i><span data-en="All agreements">هەموو ڕێککەوتنەکان</span></span>
      <div style="display:flex;gap:6px"><button class="btn btn-ghost btn-sm"><i data-lucide="printer"></i><span data-en="Print">چاپ</span></button><button class="btn btn-secondary btn-sm"><i data-lucide="file-down"></i><span data-en="Create PDF">دروستکردنی PDF</span></button></div>
    </div>
    <div class="table-wrap"><table class="table">
      <thead><tr><th data-en="No.">ژمارە</th><th data-en="Type">جۆر</th><th data-en="Property">موڵک</th><th data-en="Party">لایەن</th><th data-en="Amount">بڕ</th><th data-en="Status">دۆخ</th><th data-en="Actions">کردارەکان</th></tr></thead>
      <tbody>
      ${[
        ['EA-0418','ڕیزێرڤ','Reservation','خانوو ١٨ ئیتالی','House 18','ڕێبین ئەحمەد','Rebin A.','$5,000','signed','واژۆکراو','Signed'],
        ['EA-0417','کۆمسیۆن','Commission','زەوی ٢٤٥','Land 245','کۆمپانیای زانا','Zana Co.','3%','draft','ڕەشنووس','Draft'],
        ['EA-0416','کرێی خێرا','Quick rent','شوقە B-403','Apt B-403','ئاریان محەمەد','Aryan M.','$900','converted','گۆڕدراو','Converted'],
        ['EA-0415','فرۆشتنی خێرا','Quick sale','دوکان ٧٧','Shop 77','هاوبەش بازرگانی','Partner','$185,000','signed','واژۆکراو','Signed'],
        ['EA-0414','پێشەکی','Advance','بینا ٩','Building 9','کریار دەرەکی','Ext. buyer','$20,000','cancelled','هەڵوەشاوە','Cancelled'],
      ].map(([no,tku,ten,pku,pen,party,partyen,amt,st,stku,sten])=>`<tr>
        <td><span class="official-num">${no}</span></td>
        <td class="strong" data-en="${ten}">${tku}</td>
        <td data-en="${pen}">${pku}</td>
        <td data-en="${partyen}">${party}</td>
        <td class="price">${amt}</td>
        <td><span class="badge ${st}"><span class="d"></span><span data-en="${sten}">${stku}</span></span></td>
        <td><span class="row-actions"><span class="ra" title="PDF"><i data-lucide="file-down"></i></span><span class="ra" title="Sign"><i data-lucide="upload"></i></span><span class="ra" title="Convert"><i data-lucide="arrow-left-right"></i></span></span></td>
      </tr>`).join('')}
      </tbody>
    </table></div>
  </div>
`;

/* ───────────── CONTRACT GENERATOR ───────────── */
VIEWS.contracts = () => `
  <div class="page-head">
    <div><h2 data-en="Contract generator">دروستکەری گرێبەست</h2><div class="sub" data-en="Official Kurdish Sorani contracts">گرێبەستی فەرمیی کوردیی سۆرانی</div></div>
  </div>
  <div class="contract-layout">
    <div class="card card-pad">
      <div class="form-stack">
        <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Contract type">جۆری گرێبەست</span></label><select class="select-ctl"><option>گرێبەستی فرۆشتن</option><option>گرێبەستی کرێ</option><option>گرێبەستی کڕین</option></select></div>
        <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Property">موڵک</span></label><select class="select-ctl"><option>زەوی ژمارە ٢٤٥ — کەسنەزان</option><option>خانوو ١٨ — ئیتالی ڤیلەج</option></select></div>
        <div class="field-grid" style="gap:14px">
          <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="First party">لایەنی یەکەم</span></label><input class="input-ctl" value="کۆمپانیای زانا"></div>
          <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Second party">لایەنی دووەم</span></label><input class="input-ctl" value="ڕێبین ئەحمەد"></div>
          <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Price">نرخ</span></label><input class="input-ctl" value="$250,000"></div>
          <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Advance">پارەی پێشەکی</span></label><input class="input-ctl" value="$50,000"></div>
        </div>
        <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Conditions">مەرجەکان</span></label><textarea class="input-ctl" data-en-ph="Write the contract terms...">پارەدان لەسەر دوو قیست، تەواوکردنی گواستنەوەی سەنەد دوای پارەدانی کۆتایی.</textarea></div>
        <div class="field-grid" style="gap:14px">
          <div><label class="kv" style="margin-bottom:7px"><span class="k" data-en="Contract number">ژمارەی گرێبەست</span></label><input class="input-ctl" value="BK-2025-0418"></div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px">
          <button class="btn btn-gold"><i data-lucide="file-signature"></i><span data-en="Create contract">دروستکردنی گرێبەست</span></button>
          <button class="btn btn-secondary"><i data-lucide="eye"></i><span data-en="Preview">بینینی پێشەکی</span></button>
          <button class="btn btn-ghost"><i data-lucide="printer"></i><span data-en="Print">چاپکردن</span></button>
          <button class="btn btn-ghost"><i data-lucide="upload"></i><span data-en="Upload signed">بارکردنی واژۆکراو</span></button>
        </div>
      </div>
    </div>
    <div class="doc-preview">
      <div class="seal" data-en="OFFICIAL CONTRACT">گرێبەستی<br>فەرمی</div>
      <h3 data-en="Official Sale Contract">گرێبەستی فەرمیی فرۆشتن</h3>
      <div class="dnum">No. BK-2025-0418</div>
      <p class="dpara" data-en="This contract is made between the <b>first party</b> (Zana Company) and the <b>second party</b> (Rebin Ahmed) regarding the sale of <b>Land No. 245</b> in Kasnazan, with an area of 500 m².">ئەم گرێبەستە لەنێوان <b>لایەنی یەکەم</b> (کۆمپانیای زانا) و <b>لایەنی دووەم</b> (ڕێبین ئەحمەد) بەستراوە سەبارەت بە فرۆشتنی <b>زەوی ژمارە ٢٤٥</b> لە کەسنەزان، بە ڕووبەری ٥٠٠ مەتر چوارگۆشە.</p>
      <p class="dpara" data-en="The agreed price is <b>$250,000</b>, with an advance payment of <b>$50,000</b>. The remaining amount is paid in two installments.">نرخی ڕێککەوتراو <b>$250,000</b>ـە، لەگەڵ پارەی پێشەکیی <b>$50,000</b>. بڕی ماوە لەسەر دوو قیست دەدرێت.</p>
      <div class="doc-sign">
        <div class="ds"><div class="sig">Zana Co.</div><div class="sl" data-en="First party">لایەنی یەکەم</div></div>
        <div class="ds"><div class="sig">R. Ahmed</div><div class="sl" data-en="Second party">لایەنی دووەم</div></div>
      </div>
    </div>
  </div>
`;

/* ───────────── generic placeholder ───────────── */
VIEWS.placeholder = (titleKu, titleEn, icon) => `
  <div class="page-head"><div><h2 data-en="${titleEn}">${titleKu}</h2></div></div>
  <div class="card" style="padding:64px;text-align:center">
    <span style="width:64px;height:64px;border-radius:18px;background:var(--gold-100);color:var(--gold-700);display:grid;place-items:center;margin:0 auto 18px"><i data-lucide="${icon}" style="font-size:30px"></i></span>
    <div style="font-family:var(--font-arabic);font-size:17px;font-weight:700;color:var(--navy-800)" data-en="${titleEn}">${titleKu}</div>
    <div style="font-family:var(--font-arabic);font-size:13.5px;color:var(--text-muted);margin-top:6px" data-en="This module is part of the workspace.">ئەم بەشە بەشێکە لە شوێنی کارەکە.</div>
  </div>
`;

/* ───────────── helpers ───────────── */
function metric(ic, ku, en, v, unit, d, dir, acc) {
  return `<div class="metric"><div class="mtop"><span class="mic ${acc==='navy'?'navy':''}"><i data-lucide="${ic}"></i></span>${d?`<span class="delta ${dir}">${dir==='down'?'▾':'▴'} ${d}</span>`:''}</div><div class="mlabel" data-en="${en}">${ku}</div><div class="mvalue">${v}${unit?` <small>${unit}</small>`:''}</div></div>`;
}
function availTable(n, withActions) {
  const rows = [
    ['trees','زەوی','Land','No. 245','کەسنەزان','Kasnazan','کڕیار/خاوەن','Buyer/Owner','فرۆشتن','Sale','$250,000','available','بەردەست','Available'],
    ['home','خانوو','House','No. 18','ئیتالی ڤیلەج','Italian Village','هاوبەش','Partner','فرۆشتن','Sale','$320,000','reserved','ڕیزێرڤ','Reserved'],
    ['building-2','شوقە','Apartment','B-403','ئیمپایەر','Empire','کۆمپانیا','Company','کرێ','Rent','$900','available','بەردەست','Available'],
    ['store','دوکان','Shop','No. 77','شەقامی ٦٠','60m Street','کۆمپانیا','Company','فرۆشتن','Sale','$185,000','process','لە پرۆسە','In process'],
    ['building','بینا','Building','No. 9','ناوەندی شار','Downtown','هاوبەش','Partner','فرۆشتن','Sale','$1.2M','closed','داخراو','Closed'],
    ['home','خانوو','House','No. 51','نیو هاوسێن','New Hawsin','کڕیار/خاوەن','Buyer/Owner','کرێ','Rent','$1,100','available','بەردەست','Available'],
    ['trees','زەوی','Land','No. 302','بنەسڵاوە','Binaslawa','کۆمپانیا','Company','فرۆشتن','Sale','$410,000','reserved','ڕیزێرڤ','Reserved'],
    ['building-2','شوقە','Apartment','A-118','زانیاری','Zanyari','هاوبەش','Partner','کرێ','Rent','$750','unavailable','ناتوانرێت','Unavailable'],
  ].slice(0, n);
  const head = `<thead><tr><th data-en="Type">جۆر</th><th data-en="Official No.">ژمارەی فەرمی</th><th data-en="Area">ناوچە</th><th data-en="Source">سەرچاوە</th><th data-en="Purpose">مەبەست</th><th data-en="Price">نرخ</th><th data-en="Status">دۆخ</th>${withActions?'<th data-en="Actions">کردارەکان</th>':''}</tr></thead>`;
  const body = rows.map(([ic,tku,ten,no,aku,aen,sku,sen,pku,pen,price,st,stku,sten])=>`<tr>
    <td data-label="جۆر" data-label-en="Type"><span class="cell-type"><span class="ti"><i data-lucide="${ic}"></i></span><span class="strong" data-en="${ten}">${tku}</span></span></td>
    <td data-label="ژمارەی فەرمی" data-label-en="Official No."><span class="official-num">${no}</span></td>
    <td data-label="ناوچە" data-label-en="Area" data-en="${aen}">${aku}</td>
    <td data-label="سەرچاوە" data-label-en="Source" data-en="${sen}">${sku}</td>
    <td data-label="مەبەست" data-label-en="Purpose" data-en="${pen}">${pku}</td>
    <td class="price" data-label="نرخ" data-label-en="Price">${price}</td>
    <td data-label="دۆخ" data-label-en="Status"><span class="badge ${st}"><span class="d"></span><span data-en="${sten}">${stku}</span></span></td>
    ${withActions?`<td class="cell-actions" data-label="کردارەکان" data-label-en="Actions"><span class="row-actions"><span class="ra" title="بینین"><i data-lucide="eye"></i></span><span class="ra" title="ڕیزێرڤ"><i data-lucide="bookmark"></i></span><span class="ra" title="مامەڵە"><i data-lucide="handshake"></i></span></span></td>`:''}
  </tr>`).join('');
  return `<table class="table">${head}<tbody>${body}</tbody></table>`;
}
