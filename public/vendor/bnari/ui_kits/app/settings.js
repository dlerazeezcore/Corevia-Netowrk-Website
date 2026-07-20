/* Bnari Kodo — Settings module: users (add/remove), per-module access, workspace. */
(function () {
  const D = window.DATA;
  const V = window.VIEWS;
  const APP = window.APP = window.APP || {};
  const S = APP.state;
  if (!S.setTab) S.setTab = 'users';
  S.userEdit = S.userEdit || null;

  const lang = () => (window.bkLang ? window.bkLang() : 'ku');
  const bi = (ku, en) => `<span data-en="${String(en).replace(/"/g, '&quot;')}">${ku}</span>`;
  const T = (ku, en) => (lang() === 'en' ? en : ku);
  const initials = (n) => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

  const SECTIONS = [
    ['users', 'بەکارهێنەران و ڕۆڵ', 'Users & roles', 'users'],
    ['owners', 'خاوەنانی بناری کۆدۆ', 'Bnari Kodo owners', 'crown'],
    ['modules', 'بەشە چالاککراوەکان', 'Enabled modules', 'toggle-right'],
    ['workspace', 'شوێنی کار', 'Workspace', 'building'],
  ];

  function nav() {
    return `<div class="set-nav">${SECTIONS.map(([k, ku, en, ic]) => `<div class="sn ${S.setTab === k ? 'active' : ''}" data-settab="${k}"><i data-lucide="${ic}"></i>${bi(ku, en)}</div>`).join('')}</div>`;
  }

  function usersTab() {
    if (S.userEdit) return userAccess(S.userEdit);
    const active = D.users.filter((u) => u.active).length;
    const admins = D.users.filter((u) => u.roleKey === 'admin').length;
    return `
      <div class="rep-kpis" style="grid-template-columns:repeat(3,1fr)">
        <div class="metric"><div class="mtop"><span class="mic"><i data-lucide="users"></i></span></div><div class="mlabel" data-en="Total users">کۆی بەکارهێنەران</div><div class="mvalue num">${D.users.length}</div></div>
        <div class="metric"><div class="mtop"><span class="mic navy"><i data-lucide="user-check"></i></span></div><div class="mlabel" data-en="Active">چالاک</div><div class="mvalue num">${active}</div></div>
        <div class="metric"><div class="mtop"><span class="mic"><i data-lucide="shield"></i></span></div><div class="mlabel" data-en="Admins">بەڕێوەبەر</div><div class="mvalue num">${admins}</div></div>
      </div>
      <div class="card">
        <div class="panel-head"><span class="pt"><i data-lucide="users"></i>${bi('بەکارهێنەران', 'Users')}</span><button class="btn btn-gold btn-sm" data-uadd><i data-lucide="user-plus"></i><span data-en="Add user">زیادکردنی بەکارهێنەر</span></button></div>
        <div class="list" style="padding:6px">
          ${D.users.map((u) => `<div class="lrow" style="cursor:default">
            <span class="avatar" style="width:42px;height:42px;font-size:14px">${initials(u.name)}</span>
            <div class="lrow-main">
              <div class="lrow-t">${bi(u.name, u.nameEn)} <span class="role-pill ${u.roleKey === 'admin' ? 'admin' : ''}">${bi(u.role[0], u.role[1])}</span></div>
              <div class="lrow-sub"><span class="num" dir="ltr">${u.email}</span></div>
              <div class="user-modules">${u.modules.slice(0, 6).map((k) => { const m = D.modules.find((x) => x.key === k); return `<span class="um">${m ? T(m.ku, m.en) : k}</span>`; }).join('')}${u.modules.length > 6 ? `<span class="um">+${u.modules.length - 6}</span>` : ''}</div>
            </div>
            <div class="lrow-col hide-sm" style="text-align:center"><div class="lc-k">${bi('چالاک', 'Active')}</div><button class="bk-sw ${u.active ? 'on' : ''}" data-utoggle="${u.id}" style="margin-top:4px"><i></i></button></div>
            <button class="btn btn-secondary btn-sm" data-uaccess="${u.id}"><i data-lucide="sliders-horizontal"></i><span data-en="Access">دەستڕاگەیشتن</span></button>
            <button class="uremove" data-uremove="${u.id}" title="سڕینەوە"><i data-lucide="trash-2"></i></button>
          </div>`).join('')}
        </div>
      </div>`;
  }

  function userAccess(id) {
    const u = D.users.find((x) => x.id === id) || D.users[0];
    return `
      <div class="detail-top" style="margin-bottom:18px">
        <button class="back-btn" data-uback><i data-lucide="arrow-right"></i></button>
        <div class="dt-title"><h2>${bi('دەستڕاگەیشتنی ' + u.name, 'Access — ' + u.nameEn)}</h2><div class="sub">${bi('دیاریکردنی بەشەکان بۆ ئەم بەکارهێنەرە', 'Choose which modules this user can open')}</div></div>
      </div>
      <div class="card card-pad" style="max-width:680px">
        <div class="perm-grid">
          ${D.modules.map((m) => `<div class="perm-row">
            <span class="pr-ic"><i data-lucide="${m.icon}"></i></span>
            <div class="pr-main"><div class="pr-t">${bi(m.ku, m.en)}</div></div>
            <button class="bk-sw ${u.modules.includes(m.key) ? 'on' : ''}" data-umod="${u.id}:${m.key}"><i></i></button>
          </div>`).join('')}
        </div>
      </div>`;
  }

  function ownersTab() {
    const owners = D.bkOwners.map((id) => D.contacts.find((c) => c.id === id)).filter(Boolean);
    return `<div class="card card-pad" style="max-width:680px">
      <div class="sec-title"><i data-lucide="crown"></i>${bi('خاوەنانی بناری کۆدۆ', 'Bnari Kodo owners')}</div>
      <div style="font-family:var(--font-arabic);font-size:12.5px;color:var(--text-muted);margin-bottom:14px">${bi('ناوەکانی خاوەنانی کۆمپانیا. بە خۆکارانە لە پەیوەندییەکاندا دەردەکەون، و لە فرۆشتندا قازانجی بەشیان وەک قازانجی کۆمپانیا دەژمێردرێت.', 'Company owner names. They appear automatically in Contacts, and their share of any sale profit counts as company gain in Profit & Loss.')}</div>
      <div class="perm-grid">
        ${owners.map((c) => `<div class="perm-row"><span class="avatar" style="width:36px;height:36px;font-size:13px">${initials(c.name)}</span><div class="pr-main"><div class="pr-t">${bi(c.name, c.nameEn)}</div><div style="font-family:var(--font-arabic);font-size:11.5px;color:var(--text-muted)">${c.id}</div></div><button class="uremove" data-orem="${c.id}" title="لابردن"><i data-lucide="x"></i></button></div>`).join('') || `<div style="font-family:var(--font-arabic);font-size:12.5px;color:var(--text-muted);padding:6px 2px">${bi('هیچ خاوەنێک زیاد نەکراوە', 'No owners added yet')}</div>`}
      </div>
      <div style="display:flex;gap:8px;margin-top:14px">
        <input class="input-ctl" id="bkOwnerName" placeholder="${T('ناوی خاوەن', 'Owner name')}" style="flex:1">
        <button class="btn btn-gold" data-oadd><i data-lucide="plus"></i><span data-en="Add owner">زیادکردنی خاوەن</span></button>
      </div>
    </div>`;
  }

  function modulesTab() {
    return `<div class="card card-pad" style="max-width:680px">
      <div class="sec-title"><i data-lucide="toggle-right"></i>${bi('بەشە چالاککراوەکانی شوێنی کار', 'Modules enabled for this workspace')}</div>
      <div class="perm-grid">
        ${D.modules.filter((m) => m.key !== 'dashboard' && m.key !== 'settings').map((m, i) => `<div class="perm-row">
          <span class="pr-ic"><i data-lucide="${m.icon}"></i></span>
          <div class="pr-main"><div class="pr-t">${bi(m.ku, m.en)}</div></div>
          <button class="bk-sw ${i !== 3 ? 'on' : ''}" data-wsmod="${m.key}"><i></i></button>
        </div>`).join('')}
      </div>
    </div>`;
  }

  function workspaceTab() {
    const c = D.company;
    return `<div class="card card-pad" style="max-width:680px">
      <div class="sec-title"><i data-lucide="building"></i>${bi('زانیاری شوێنی کار', 'Workspace information')}</div>
      <div class="fgrid">
        <div class="ffield"><label class="lbl">${bi('ناوی کۆمپانیا', 'Company name')}</label><input class="input-ctl" value="${c.nameKu}"></div>
        <div class="ffield"><label class="lbl">${bi('ناوی بازرگانی', 'Trade name')}</label><input class="input-ctl" value="${c.sub}"></div>
        <div class="ffield col-2"><label class="lbl">${bi('ناونیشان', 'Address')}</label><input class="input-ctl" value="${c.addressKu}"></div>
        <div class="ffield"><label class="lbl">${bi('تەلەفۆن ١', 'Phone 1')}</label><input class="input-ctl num" dir="ltr" value="${c.contacts[0].phone}"></div>
        <div class="ffield"><label class="lbl">${bi('تەلەفۆن ٢', 'Phone 2')}</label><input class="input-ctl num" dir="ltr" value="${c.contacts[1].phone}"></div>
      </div>
      <div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-gold"><i data-lucide="check"></i><span data-en="Save changes">پاشەکەوتکردنی گۆڕانکارییەکان</span></button>
      <button class="btn btn-ghost danger" data-resetdemo><i data-lucide="rotate-ccw"></i><span data-en="Reset demo data">گەڕاندنەوەی داتای دیمۆ</span></button></div>
      <div style="margin-top:14px;font-family:var(--font-arabic);font-size:12px;color:var(--text-muted);background:var(--surface-sunken);border-radius:var(--radius-sm);padding:11px 14px"><i data-lucide="info" style="width:14px;height:14px;vertical-align:-2px;color:var(--gold-600)"></i> ${bi('هەموو زیادکردن و گۆڕانکارییەکانت بە خۆکارانە پاشەکەوت دەکرێن لەسەر ئەم ئامێرە و دوای نوێکردنەوەی پەڕە دەمێننەوە.', 'All your additions and edits are saved automatically on this device and survive page reloads.')}</div>
    </div>`;
  }

  const BODY = { users: usersTab, owners: ownersTab, modules: modulesTab, workspace: workspaceTab };

  V.settings = () => `
    <div class="page-head">
      <div><h2 data-en="Settings">ڕێکخستنەکان</h2><div class="sub" data-en="Workspace, users and module access">شوێنی کار، بەکارهێنەران و دەستڕاگەیشتنی بەشەکان</div></div>
    </div>
    <div class="set-grid">${nav()}<div>${(BODY[S.setTab] || usersTab)()}</div></div>`;

  /* events */
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-settab]');
    if (tab) { S.setTab = tab.dataset.settab; S.userEdit = null; return rr(); }
    const acc = e.target.closest('[data-uaccess]');
    if (acc) { S.userEdit = acc.dataset.uaccess; return rr(); }
    const back = e.target.closest('[data-uback]');
    if (back) { S.userEdit = null; return rr(); }
    const tog = e.target.closest('[data-utoggle]');
    if (tog) { const u = D.users.find((x) => x.id === tog.dataset.utoggle); if (u) u.active = !u.active; return rr(); }
    const um = e.target.closest('[data-umod]');
    if (um) { const [uid, key] = um.dataset.umod.split(':'); const u = D.users.find((x) => x.id === uid); if (u) { const i = u.modules.indexOf(key); if (i > -1) u.modules.splice(i, 1); else u.modules.push(key); } return rr(); }
    const ws = e.target.closest('[data-wsmod]');
    if (ws) { ws.classList.toggle('on'); return; }
    const rd = e.target.closest('[data-resetdemo]');
    if (rd) { if (confirm(T('گەڕاندنەوەی هەموو داتای دیمۆ بۆ دۆخی سەرەتایی؟', 'Reset all demo data to its original state?'))) { D.reset(); } return; }
    const rm = e.target.closest('[data-uremove]');
    if (rm) { if (confirm(T('سڕینەوەی ئەم بەکارهێنەرە؟', 'Remove this user?'))) { const i = D.users.findIndex((x) => x.id === rm.dataset.uremove); if (i > -1) D.users.splice(i, 1); rr(); } return; }
    const orem = e.target.closest('[data-orem]');
    if (orem) { const id = orem.dataset.orem; const i = D.bkOwners.indexOf(id); if (i > -1) D.bkOwners.splice(i, 1); const c = D.contacts.find((x) => x.id === id); if (c) c.bkOwner = false; if (D.save) D.save(); return rr(); }
    const oadd = e.target.closest('[data-oadd]');
    if (oadd) {
      const inp = document.getElementById('bkOwnerName'); const nm = inp ? inp.value.trim() : ''; if (!nm) return;
      const rec = { id: 'C-' + String(D.contacts.length + 7).padStart(2, '0'), name: nm, nameEn: nm, company: 'بناری کۆدۆ', companyEn: 'Bnari Kodo', address: 'هەولێر', addressEn: 'Erbil', phone: '—', email: '—', nid: '', transactions: 0, value: '$0', properties: 0, since: '٢٠٢٦', type: ['خاوەن', 'Owner'], isPartner: false, active: true, bkOwner: true };
      D.contacts.unshift(rec); D.bkOwners.push(rec.id); if (D.save) D.save(); return rr();
    }
    const add = e.target.closest('[data-uadd]');
    if (add) {
      APP.modal({
        icon: 'user-plus', ku: 'زیادکردنی بەکارهێنەر', en: 'Add User', subKu: 'بەکارهێنەرێکی نوێ و ڕۆڵەکەی', subEn: 'New user and role',
        fields: [
          { id: 'name', ku: 'ناو', en: 'Name', req: 1 }, { id: 'email', ku: 'ئیمەیل', en: 'Email' },
          { id: 'role', ku: 'ڕۆڵ', en: 'Role', type: 'select', col2: 1, options: [{ v: 'admin', ku: 'بەڕێوەبەر', en: 'Admin' }, { v: 'agent', ku: 'فرۆشیار', en: 'Agent' }, { v: 'accountant', ku: 'ژمێریار', en: 'Accountant' }, { v: 'support', ku: 'پشتگیری', en: 'Support' }] },
        ],
        onSave: (v) => {
          const rmap = { admin: ['بەڕێوەبەر', 'Admin'], agent: ['فرۆشیار', 'Agent'], accountant: ['ژمێریار', 'Accountant'], support: ['پشتگیری', 'Support'] };
          const def = { admin: D.modules.map((m) => m.key), agent: ['dashboard', 'properties', 'availabilities', 'contacts', 'transactions', 'contracts'], accountant: ['dashboard', 'payments', 'expenses', 'reports'], support: ['dashboard', 'contacts'] };
          D.users.push({ id: 'U-' + String(D.users.length + 1).padStart(2, '0'), name: v.name || 'بێ ناو', nameEn: v.name || 'New user', email: v.email || 'user@bnarikodo.com', role: rmap[v.role], roleKey: v.role, active: true, modules: (def[v.role] || ['dashboard']).slice() });
        },
      });
      return;
    }
  });
  function rr() { if (window.bkRerender) window.bkRerender(); }
})();
