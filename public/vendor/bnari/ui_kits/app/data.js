/* Bnari Kodo — mock datasets for the internal app. Bilingual (ku default, en parallel). */
window.DATA = (function () {

  /* ───────── PROPERTIES (8 realistic, fully-filled) ───────── */
  const properties = [
    { id: 'P-2451', type: 'land', icon: 'trees', typeKu: 'زەوی', typeEn: 'Land', number: '245', areaKu: 'کەسنەزان', areaEn: 'Kasnazan', size: '500 م²', sizeEn: '500 m²', price: '$250,000', value: 250000, status: 'available', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/٠٨/١٥', deliverEn: '2026/08/15', partner: 'یوسف سامی', partnerEn: 'Yousif Sami', source: ['کڕیار/خاوەن', 'Owner'], lat: '36.2891° N', lng: '44.0089° E', note: 'زەوی گۆشە، ڕووی بۆ دوو شەقام. بەڵگەنامەکان تەواون.', noteEn: 'Corner plot with two street frontages. Papers complete.' },
    { id: 'P-0018', type: 'villa', icon: 'home', typeKu: 'ڤێلا', typeEn: 'Villa', number: '18', areaKu: 'ئیتالی ڤیلەج', areaEn: 'Italian Village', size: '360 م²', sizeEn: '360 m²', price: '$420,000', value: 420000, status: 'reserved', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/٠٧/٠١', deliverEn: '2026/07/01', partner: 'کۆمپانیای ئاوێر', partnerEn: 'Awer Company', source: ['هاوبەش', 'Partner'], lat: '36.1901° N', lng: '43.9930° E', note: 'ڤێلای دوو نهۆم، ٤ ژووری نوستن، باخچە و گەراج.', noteEn: 'Two-storey villa, 4 bedrooms, garden and garage.' },
    { id: 'P-B403', type: 'apartment', icon: 'building-2', typeKu: 'شوقە', typeEn: 'Apartment', number: 'B-403', areaKu: 'ئیمپایەر', areaEn: 'Empire', size: '140 م²', sizeEn: '140 m²', price: '$900 /مانگ', value: 900, status: 'available', purpose: ['کرێ', 'Rent'], deliver: '٢٠٢٦/٠٦/٢٠', deliverEn: '2026/06/20', partner: 'کۆمپانیای زانا', partnerEn: 'Zana Company', source: ['کۆمپانیا', 'Company'], lat: '36.2103° N', lng: '44.0091° E', note: 'شوقەی مۆدێرن لە نهۆمی ٤، ٢ ژوور، ڕووناکی باش.', noteEn: 'Modern 4th-floor apartment, 2 rooms, great light.' },
    { id: 'P-0077', type: 'shop', icon: 'store', typeKu: 'دوکان', typeEn: 'Shop', number: '77', areaKu: 'شەقامی ٦٠ مەتری', areaEn: '60m Street', size: '85 م²', sizeEn: '85 m²', price: '$185,000', value: 185000, status: 'process', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/٠٩/١٠', deliverEn: '2026/09/10', partner: 'هاوبەش بازرگانی', partnerEn: 'Trade Partner', source: ['کۆمپانیا', 'Company'], lat: '36.1845° N', lng: '44.0210° E', note: 'دوکان لەسەر شەقامی سەرەکی، گونجاو بۆ بازرگانی.', noteEn: 'Shop on main street, ideal for retail.' },
    { id: 'P-0009', type: 'building', icon: 'building', typeKu: 'بینا', typeEn: 'Building', number: '9', areaKu: 'ناوەندی شار', areaEn: 'Downtown', size: '1,200 م²', sizeEn: '1,200 m²', price: '$1,200,000', value: 1200000, status: 'closed', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/٠٥/٣٠', deliverEn: '2026/05/30', partner: 'گرووپی نیشتمان', partnerEn: 'Nishtiman Group', source: ['هاوبەش', 'Partner'], lat: '36.1912° N', lng: '44.0096° E', note: 'بینای بازرگانی ٥ نهۆم، فرۆشراوە بەم مانگە.', noteEn: '5-storey commercial building, closed this month.' },
    { id: 'P-0302', type: 'land', icon: 'trees', typeKu: 'زەوی', typeEn: 'Land', number: '302', areaKu: 'بنەسڵاوە', areaEn: 'Binaslawa', size: '800 م²', sizeEn: '800 m²', price: '$410,000', value: 410000, status: 'available', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/١٠/٠٥', deliverEn: '2026/10/05', partner: 'کۆمپانیای زانا', partnerEn: 'Zana Company', source: ['کۆمپانیا', 'Company'], lat: '36.2455° N', lng: '44.0501° E', note: 'زەوی نیشتەجێبوون بە پلانی فەرمی و خزمەتگوزاری.', noteEn: 'Residential land with official plan and utilities.' },
    { id: 'P-0051', type: 'house', icon: 'home', typeKu: 'خانوو', typeEn: 'House', number: '51', areaKu: 'نیو هاوسێن', areaEn: 'New Hawsin', size: '220 م²', sizeEn: '220 m²', price: '$1,100 /مانگ', value: 1100, status: 'available', purpose: ['کرێ', 'Rent'], deliver: '٢٠٢٦/٠٦/٢٥', deliverEn: '2026/06/25', partner: 'ئاریان محەمەد', partnerEn: 'Aryan Mohammed', source: ['کڕیار/خاوەن', 'Owner'], lat: '36.2670° N', lng: '44.0312° E', note: 'خانووی یەک نهۆم بە حەوشە، گونجاو بۆ خێزان.', noteEn: 'Single-storey house with yard, family-friendly.' },
    { id: 'P-A118', type: 'apartment', icon: 'building-2', typeKu: 'شوقە', typeEn: 'Apartment', number: 'A-118', areaKu: 'زانیاری', areaEn: 'Zanyari', size: '125 م²', sizeEn: '125 m²', price: '$135,000', value: 135000, status: 'reserved', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/١١/١٢', deliverEn: '2026/11/12', partner: 'دلێر عومەر', partnerEn: 'Dler Omer', source: ['هاوبەش', 'Partner'], lat: '36.2218° N', lng: '44.0445° E', note: 'شوقە لە کۆمپلێکسی نوێ، ڕیزێرڤکراو بۆ کڕیار.', noteEn: 'Apartment in new complex, reserved for a buyer.' },
  ];

  /* ───────── PARTNERS ───────── */
  const partners = [
    { id: 'PT-01', name: 'کۆمپانیای زانا', nameEn: 'Zana Company', company: 'زانا بۆ خانووبەرە', companyEn: 'Zana Real Estate', address: 'هەولێر، شەقامی ١٠٠ مەتری', addressEn: 'Erbil, 100m Street', phone: '+964 750 134 0409', email: 'info@zana.co', transactions: 18, value: '$2.4M', properties: 12, since: '٢٠١٨', type: ['هاوبەشی سەرەکی', 'Lead partner'] },
    { id: 'PT-02', name: 'گرووپی نیشتمان', nameEn: 'Nishtiman Group', company: 'نیشتمان بۆ وەبەرهێنان', companyEn: 'Nishtiman Investment', address: 'هەولێر، ناوەندی شار', addressEn: 'Erbil, Downtown', phone: '+964 751 220 7781', email: 'contact@nishtiman.iq', transactions: 11, value: '$3.1M', properties: 7, since: '٢٠١٩', type: ['وەبەرهێنەر', 'Investor'] },
    { id: 'PT-03', name: 'کۆمپانیای ئاوێر', nameEn: 'Awer Company', company: 'ئاوێر بۆ بنیاتنان', companyEn: 'Awer Construction', address: 'هەولێر، ئیتالی ڤیلەج', addressEn: 'Erbil, Italian Village', phone: '+964 750 460 0313', email: 'sales@awer.co', transactions: 9, value: '$1.8M', properties: 6, since: '٢٠٢٠', type: ['هاوبەش', 'Partner'] },
    { id: 'PT-04', name: 'دلێر عومەر', nameEn: 'Dler Omer', company: 'دلێر بۆ کڕین و فرۆشتن', companyEn: 'Dler Trading', address: 'هەولێر، زانیاری', addressEn: 'Erbil, Zanyari', phone: '+964 770 990 1122', email: 'dler.omer@gmail.com', transactions: 6, value: '$640K', properties: 4, since: '٢٠٢١', type: ['هاوبەش', 'Partner'] },
    { id: 'PT-05', name: 'ئاریان محەمەد', nameEn: 'Aryan Mohammed', company: 'ئاریان گرووپ', companyEn: 'Aryan Group', address: 'هەولێر، نیو هاوسێن', addressEn: 'Erbil, New Hawsin', phone: '+964 750 115 3009', email: 'aryan@aryangroup.co', transactions: 5, value: '$520K', properties: 3, since: '٢٠٢٢', type: ['وەبەرهێنەر', 'Investor'] },
    { id: 'PT-06', name: 'کۆمپانیای ڕۆژهەڵات', nameEn: 'Rojhalat Company', company: 'ڕۆژهەڵات بۆ خانووبەرە', companyEn: 'Rojhalat Estates', address: 'هەولێر، دریم سیتی', addressEn: 'Erbil, Dream City', phone: '+964 751 700 4502', email: 'hello@rojhalat.iq', transactions: 8, value: '$1.2M', properties: 5, since: '٢٠٢٠', type: ['هاوبەش', 'Partner'] },
  ];

  /* ───────── CONTACTS ───────── */
  const contacts = [
    { id: 'C-01', name: 'یوسف سامی مجید', nameEn: 'Yousif Sami Majid', company: 'تایبەت', companyEn: 'Individual', address: 'شەقڵاوە', addressEn: 'Shaqlawa', phone: '+964 770 000 0000', email: 'yousif.sami@gmail.com', transactions: 3, value: '$250K', properties: 2, since: '٢٠٢٣', type: ['فرۆشیار', 'Seller'] },
    { id: 'C-02', name: 'خسرۆ جلال جبار', nameEn: 'Khasraw Jalal Jabar', company: 'تایبەت', companyEn: 'Individual', address: 'هەولێر', addressEn: 'Erbil', phone: '+964 750 440 8127', email: 'khasraw.j@gmail.com', transactions: 2, value: '$250K', properties: 1, since: '٢٠٢٤', type: ['کڕیار', 'Buyer'] },
    { id: 'C-03', name: 'ئاسۆ ئیبراهیم', nameEn: 'Aso Ibrahim', company: 'ئاسۆ مارکێت', companyEn: 'Aso Market', address: 'هەولێر، ئەندازیاران', addressEn: 'Erbil, Engineers', phone: '+964 751 332 9087', email: 'aso.ibrahim@asom.iq', transactions: 4, value: '$390K', properties: 2, since: '٢٠٢٢', type: ['کڕیار', 'Buyer'] },
    { id: 'C-04', name: 'هێرۆ کەریم', nameEn: 'Hero Karim', company: 'تایبەت', companyEn: 'Individual', address: 'هەولێر، ئیمپایەر', addressEn: 'Erbil, Empire', phone: '+964 770 551 6643', email: 'hero.karim@gmail.com', transactions: 1, value: '$135K', properties: 1, since: '٢٠٢٤', type: ['خاوەن', 'Owner'] },
    { id: 'C-05', name: 'ڕێبوار تۆفیق', nameEn: 'Rebwar Tofiq', company: 'ڕێبوار بۆ بازرگانی', companyEn: 'Rebwar Trading', address: 'هەولێر، کەسنەزان', addressEn: 'Erbil, Kasnazan', phone: '+964 750 887 2231', email: 'rebwar.t@rtrade.iq', transactions: 5, value: '$610K', properties: 3, since: '٢٠٢١', type: ['فرۆشیار', 'Seller'] },
    { id: 'C-06', name: 'شیلان عەلی', nameEn: 'Shilan Ali', company: 'تایبەت', companyEn: 'Individual', address: 'هەولێر، بنەسڵاوە', addressEn: 'Erbil, Binaslawa', phone: '+964 751 442 0098', email: 'shilan.ali@gmail.com', transactions: 2, value: '$410K', properties: 1, since: '٢٠٢٣', type: ['کڕیار', 'Buyer'] },
    { id: 'C-07', name: 'جەنگاوەر سیوەدین', nameEn: 'Jangawar Siwadin', company: 'بناری کۆدۆ', companyEn: 'Bnari Kodo', address: 'هەولێر، بەختەوەری', addressEn: 'Erbil, Bakhtyari', phone: '+964 750 134 0409', email: 'jangawar@bnarikodo.com', nid: '00198837421', transactions: 4, value: '$1.1M', properties: 3, since: '٢٠١٨', type: ['خاوەن', 'Owner'], bkOwner: true },
    { id: 'C-08', name: 'عەلی حەمە', nameEn: 'Ali Hama', company: 'تایبەت', companyEn: 'Individual', address: 'هەولێر، ئیتالی ڤیلەج', addressEn: 'Erbil, Italian Village', phone: '+964 751 778 2200', email: 'ali.hama@gmail.com', nid: '00204451190', transactions: 1, value: '$50K', properties: 1, since: '٢٠٢٤', type: ['خاوەن', 'Owner'] },
  ];
  /* contacts have an active flag + association-driven lifecycle */
  contacts.forEach((c) => { if (c.active === undefined) c.active = true; });

  /* ───────── CHART OF ACCOUNTS (expense accounts) ───────── */
  const accounts = [
    { id: 'rent', ku: 'کرێی نووسینگە', en: 'Office Rent', icon: 'building' },
    { id: 'salaries', ku: 'مووچە و کرێکاری', en: 'Salaries & Wages', icon: 'users' },
    { id: 'utilities', ku: 'کارەبا و ئاو', en: 'Utilities', icon: 'zap' },
    { id: 'supplies', ku: 'پێداویستی نووسینگە', en: 'Office Supplies', icon: 'paperclip' },
    { id: 'marketing', ku: 'بانگەشە و ڕیکلام', en: 'Marketing & Advertising', icon: 'megaphone' },
    { id: 'fuel', ku: 'سووتەمەنی', en: 'Fuel', icon: 'fuel' },
    { id: 'telecom', ku: 'تەلەفۆن و ئینتەرنێت', en: 'Telephone & Internet', icon: 'wifi' },
    { id: 'bank', ku: 'خەرجی بانک', en: 'Bank Charges', icon: 'landmark' },
    { id: 'commission', ku: 'کۆمسیۆنی دراو', en: 'Commissions Paid', icon: 'percent' },
    { id: 'maintenance', ku: 'چاککردنەوە و پاراستن', en: 'Maintenance & Repairs', icon: 'wrench' },
    { id: 'legal', ku: 'یاسایی و پیشەیی', en: 'Legal & Professional', icon: 'scale' },
    { id: 'travel', ku: 'گەشت و سەفەر', en: 'Travel', icon: 'plane' },
    { id: 'meals', ku: 'خواردن و میوانداری', en: 'Meals & Entertainment', icon: 'utensils' },
    { id: 'misc', ku: 'خەرجی جۆراوجۆر', en: 'Miscellaneous', icon: 'ellipsis' },
  ];

  /* ───────── EXPENSES (mutable — CRUD) ───────── */
  const expenses = [
    { id: 'EXP-0142', date: '٢٠٢٦/٠٦/٠٨', dateEn: '2026/06/08', account: 'rent', vendor: 'خاوەن بینا — ناوەندی شار', vendorEn: 'Landlord — Downtown', amount: 3500, ref: 'INV-5521', status: 'unbilled', noteKu: 'کرێی نووسینگەی مانگی ٦.', noteEn: 'June office rent.' },
    { id: 'EXP-0141', date: '٢٠٢٦/٠٦/٠٧', dateEn: '2026/06/07', account: 'marketing', vendor: 'فەیسبووک ئادز', vendorEn: 'Facebook Ads', amount: 620, ref: 'FB-9931', status: 'billed', noteKu: 'بانگەشەی موڵکە نوێیەکان.', noteEn: 'Campaign for new listings.' },
    { id: 'EXP-0140', date: '٢٠٢٦/٠٦/٠٥', dateEn: '2026/06/05', account: 'salaries', vendor: 'تیمی فرۆشتن', vendorEn: 'Sales team', amount: 7800, ref: 'PR-0606', status: 'reimbursable', noteKu: 'مووچەی نیوەی مانگ.', noteEn: 'Mid-month payroll.' },
    { id: 'EXP-0139', date: '٢٠٢٦/٠٦/٠٤', dateEn: '2026/06/04', account: 'fuel', vendor: 'بنکەی سووتەمەنی ئاسۆ', vendorEn: 'Aso Fuel Station', amount: 180, ref: 'FUEL-221', status: 'unbilled', noteKu: 'سووتەمەنی ئۆتۆمبیلی نووسینگە.', noteEn: 'Office vehicle fuel.' },
    { id: 'EXP-0138', date: '٢٠٢٦/٠٦/٠٣', dateEn: '2026/06/03', account: 'utilities', vendor: 'کۆمپانیای کارەبا', vendorEn: 'Power Company', amount: 240, ref: 'UTL-3390', status: 'billed', noteKu: 'پسوولەی کارەبا و ئاو.', noteEn: 'Electricity & water bill.' },
    { id: 'EXP-0137', date: '٢٠٢٦/٠٦/٠٢', dateEn: '2026/06/02', account: 'telecom', vendor: 'ئاسیاسێل', vendorEn: 'Asiacell', amount: 95, ref: 'TEL-7741', status: 'unbilled', noteKu: 'ئینتەرنێت و تەلەفۆنی مانگانە.', noteEn: 'Monthly internet & phone.' },
    { id: 'EXP-0136', date: '٢٠٢٦/٠٦/٠١', dateEn: '2026/06/01', account: 'supplies', vendor: 'مەکتەبی ڕۆشنبیری', vendorEn: 'Roshanbiri Stationery', amount: 130, ref: 'SUP-1180', status: 'billed', noteKu: 'کاغەز، حیبر و پێداویستی.', noteEn: 'Paper, ink and supplies.' },
    { id: 'EXP-0135', date: '٢٠٢٦/٠٥/٢٩', dateEn: '2026/05/29', account: 'maintenance', vendor: 'تەکنیکی ئاکام', vendorEn: 'Akam Technical', amount: 410, ref: 'MNT-0455', status: 'reimbursable', noteKu: 'چاککردنەوەی سیستەمی فێنک.', noteEn: 'AC system repair.' },
  ];

  /* ───────── CONTRACTS ───────── */
  const contracts = [
    { id: '00035', type: ['گرێبەستی فرۆشتن', 'Sale contract'], kind: 'sale', propType: ['زەوی', 'Land'], landDoc: 'tapo', propNumber: '245', areaKu: 'کەسنەزان', areaEn: 'Kasnazan', deliver: '٢٠٢٦/٠٨/١٥', deliverEn: '2026/08/15', date: '٢٠٢٦/٠٦/٠٩', dateEn: '2026/06/09', first: 'یوسف سامی مجید', firstEn: 'Yousif Sami Majid', firstRes: 'شەقڵاوە', second: 'خسرۆ جلال جبار', secondEn: 'Khasraw Jalal Jabar', secondRes: 'هەولێر', price: '$250,000', priceVal: 250000, advance: '$25,000', commission: '1%', commValue: 2500, status: 'signed', witness1: 'محمد كەیفی ئەنوەر', witness2: 'بالێن سێودین ئەحمەد', payments: [{ id: 'CP-1', date: '2026/06/09', amount: 25000, note: 'پارەی پێشەکی', noteEn: 'Down payment' }] },
    { id: '00034', type: ['گرێبەستی کرێ', 'Rent contract'], kind: 'rent', propType: ['شوقە', 'Apartment'], propNumber: 'B-403', areaKu: 'ئیمپایەر', areaEn: 'Empire', deliver: '٢٠٢٦/٠٦/٢٠', deliverEn: '2026/06/20', date: '٢٠٢٦/٠٦/٠٥', dateEn: '2026/06/05', first: 'کۆمپانیای زانا', firstEn: 'Zana Company', firstRes: 'هەولێر', second: 'هێرۆ کەریم', secondEn: 'Hero Karim', secondRes: 'هەولێر', price: '$900 /مانگ', advance: '$900', commission: '1%', status: 'signed' },
    { id: '00033', type: ['گرێبەستی فرۆشتن', 'Sale contract'], kind: 'sale', propType: ['ڤێلا', 'Villa'], propNumber: '18', areaKu: 'ئیتالی ڤیلەج', areaEn: 'Italian Village', deliver: '٢٠٢٦/٠٧/٠١', deliverEn: '2026/07/01', date: '٢٠٢٦/٠٥/٢٨', dateEn: '2026/05/28', first: 'کۆمپانیای ئاوێر', firstEn: 'Awer Company', firstRes: 'هەولێر', second: 'ئاسۆ ئیبراهیم', secondEn: 'Aso Ibrahim', secondRes: 'هەولێر', price: '$420,000', advance: '$60,000', commission: '1%', status: 'process' },
    { id: '00032', type: ['گرێبەستی فرۆشتن', 'Sale contract'], kind: 'sale', propType: ['بینا', 'Building'], propNumber: '9', areaKu: 'ناوەندی شار', areaEn: 'Downtown', deliver: '٢٠٢٦/٠٥/٣٠', deliverEn: '2026/05/30', date: '٢٠٢٦/٠٥/١٥', dateEn: '2026/05/15', first: 'گرووپی نیشتمان', firstEn: 'Nishtiman Group', firstRes: 'هەولێر', second: 'ڕێبوار تۆفیق', secondEn: 'Rebwar Tofiq', secondRes: 'هەولێر', price: '$1,200,000', advance: '$200,000', commission: '1%', status: 'signed' },
    { id: '00031', type: ['گرێبەستی کرێ', 'Rent contract'], kind: 'rent', propType: ['خانوو', 'House'], propNumber: '51', areaKu: 'نیو هاوسێن', areaEn: 'New Hawsin', deliver: '٢٠٢٦/٠٦/٢٥', deliverEn: '2026/06/25', date: '٢٠٢٦/٠٦/٠١', dateEn: '2026/06/01', first: 'ئاریان محەمەد', firstEn: 'Aryan Mohammed', firstRes: 'هەولێر', second: 'شیلان عەلی', secondEn: 'Shilan Ali', secondRes: 'هەولێر', price: '$1,100 /مانگ', advance: '$1,100', commission: '1%', status: 'draft' },
  ];

  /* ───────── TRANSACTIONS ───────── */
  const transactions = [
    { id: 'TX-1042', kind: 'sale', type: ['فرۆشتن', 'Sale'], icon: 'tag', prop: 'زەوی ٢٤٥', propEn: 'Land 245', party: 'خسرۆ جلال', partyEn: 'Khasraw J.', amount: '$250,000', value: 250000, date: '٢٠٢٦/٠٦/٠٩', dateEn: '2026/06/09', status: 'signed', stage: ['تەواوبوو', 'Completed'], commission: '$2,500' },
    { id: 'TX-1041', kind: 'rent', type: ['کرێ', 'Rent'], icon: 'key', prop: 'شوقە B-403', propEn: 'Apt B-403', party: 'هێرۆ کەریم', partyEn: 'Hero Karim', amount: '$900', value: 900, date: '٢٠٢٦/٠٦/٠٥', dateEn: '2026/06/05', status: 'signed', stage: ['چالاک', 'Active'], commission: '$90' },
    { id: 'TX-1040', kind: 'sale', type: ['فرۆشتن', 'Sale'], icon: 'tag', prop: 'ڤێلا ١٨', propEn: 'Villa 18', party: 'ئاسۆ ئیبراهیم', partyEn: 'Aso Ibrahim', amount: '$420,000', value: 420000, date: '٢٠٢٦/٠٥/٢٨', dateEn: '2026/05/28', status: 'process', stage: ['لە پرۆسەدا', 'In process'], commission: '$4,200' },
    { id: 'TX-1039', kind: 'commission', type: ['کۆمسیۆن', 'Commission'], icon: 'percent', prop: 'بینا ٩', propEn: 'Building 9', party: 'گرووپی نیشتمان', partyEn: 'Nishtiman Group', amount: '$12,000', value: 12000, date: '٢٠٢٦/٠٥/٣٠', dateEn: '2026/05/30', status: 'signed', stage: ['وەرگیرا', 'Received'], commission: '$12,000' },
    { id: 'TX-1038', kind: 'advance', type: ['پێشەکی', 'Advance'], icon: 'wallet', prop: 'شوقە A-118', propEn: 'Apt A-118', party: 'دلێر عومەر', partyEn: 'Dler Omer', amount: '$20,000', value: 20000, date: '٢٠٢٦/٠٥/٢٢', dateEn: '2026/05/22', status: 'reserved', stage: ['ڕیزێرڤ', 'Reserved'], commission: '—' },
    { id: 'TX-1037', kind: 'sale', type: ['فرۆشتن', 'Sale'], icon: 'tag', prop: 'دوکان ٧٧', propEn: 'Shop 77', party: 'ڕێبوار تۆفیق', partyEn: 'Rebwar Tofiq', amount: '$185,000', value: 185000, date: '٢٠٢٦/٠٥/١٨', dateEn: '2026/05/18', status: 'process', stage: ['لە پرۆسەدا', 'In process'], commission: '$1,850' },
  ];

  /* ───────── PAYMENTS ───────── */
  const payments = [
    { id: 'PY-0521', dir: 'in', type: ['پارەی وەرگیراو', 'Received'], party: 'خسرۆ جلال', partyEn: 'Khasraw J.', amount: '$25,000', value: 25000, date: '٢٠٢٦/٠٦/٠٩', dateEn: '2026/06/09', method: ['کاش', 'Cash'], status: 'signed', ref: 'گرێبەست ٠٠٠٣٥', refEn: 'Contract 00035' },
    { id: 'PY-0520', dir: 'in', type: ['کرێی مانگانە', 'Monthly rent'], party: 'هێرۆ کەریم', partyEn: 'Hero Karim', amount: '$900', value: 900, date: '٢٠٢٦/٠٦/٠٥', dateEn: '2026/06/05', method: ['حەواڵە', 'Transfer'], status: 'signed', ref: 'گرێبەست ٠٠٠٣٤', refEn: 'Contract 00034' },
    { id: 'PY-0519', dir: 'out', type: ['پارەدان بۆ هاوبەش', 'Partner payout'], party: 'کۆمپانیای ئاوێر', partyEn: 'Awer Company', amount: '$48,000', value: 48000, date: '٢٠٢٦/٠٦/٠٣', dateEn: '2026/06/03', method: ['حەواڵە', 'Transfer'], status: 'process', ref: 'ڤێلا ١٨', refEn: 'Villa 18' },
    { id: 'PY-0518', dir: 'in', type: ['پێشەکی', 'Advance'], party: 'دلێر عومەر', partyEn: 'Dler Omer', amount: '$20,000', value: 20000, date: '٢٠٢٦/٠٥/٢٢', dateEn: '2026/05/22', method: ['کاش', 'Cash'], status: 'reserved', ref: 'شوقە A-118', refEn: 'Apt A-118' },
    { id: 'PY-0517', dir: 'in', type: ['کۆمسیۆن', 'Commission'], party: 'گرووپی نیشتمان', partyEn: 'Nishtiman Group', amount: '$12,000', value: 12000, date: '٢٠٢٦/٠٥/٣٠', dateEn: '2026/05/30', method: ['چەک', 'Cheque'], status: 'signed', ref: 'بینا ٩', refEn: 'Building 9' },
    { id: 'PY-0516', dir: 'out', type: ['خەرجی نووسینگە', 'Office expense'], party: 'خاوەن بینا', partyEn: 'Landlord', amount: '$3,500', value: 3500, date: '٢٠٢٦/٠٦/٠٨', dateEn: '2026/06/08', method: ['حەواڵە', 'Transfer'], status: 'signed', ref: 'کرێی مانگی ٦', refEn: 'June rent' },
  ];

  /* company info — from the official letterhead */
  const company = {
    nameKu: 'بناری کۆدۆ', nameEn: 'Bnari Kodo', sub: 'BK Real Estates',
    taglineKu: 'بۆ کڕین و فرۆشتن و بەکرێدانی خانوو، زەوی و موڵکی بازرگانی',
    taglineEn: 'Buying, selling & renting houses, land and commercial property',
    contacts: [
      { name: 'جەنگاوەر سیوەدین', nameEn: 'Jangawar Siwadin', phone: '+964 750 134 0409', phone2: '+964 750 115 3009' },
      { name: 'بۆتان علی', nameEn: 'Botan Ali', phone: '+964 750 460 0313' },
    ],
    addresses: [
      'هەولێر - گەڕەکی بەختەوەری، شەقامی 60 مەتری بەرامبەر کوردستان ستی',
      'هەولێر — بۆرسەی عقاراتی فلکەی شێخ محمود',
      'گوندی کۆری خانووی ژمارە B39-8',
    ],
    addressKu: 'هەولێر — بۆرسەی عقاراتی فلکەی شێخ محمود / گوندی کۆری خانووی ژمارە B39-8',
    addressEn: 'Erbil — Sheikh Mahmood Real Estate Bourse / Koya Housing Village, No. B39-8',
  };

  /* ───────── MODULE REGISTRY (for role permissions) ───────── */
  const modules = [
    { key: 'dashboard', ku: 'داشبۆرد', en: 'Dashboard', icon: 'layout-dashboard' },
    { key: 'properties', ku: 'موڵکەکان', en: 'Properties', icon: 'building-2' },
    { key: 'contacts', ku: 'پەیوەندییەکان', en: 'Contacts', icon: 'contact' },
    { key: 'areas', ku: 'ناوچەکان', en: 'Areas', icon: 'map' },
    { key: 'transactions', ku: 'مامەڵەکان', en: 'Transactions', icon: 'repeat' },
    { key: 'contracts', ku: 'گرێبەستەکان', en: 'Contracts', icon: 'file-signature' },
    { key: 'agreements', ku: 'ڕێککەوتنە دەرەکییەکان', en: 'External Agreements', icon: 'file-clock' },
    { key: 'payments', ku: 'پارەدانەکان', en: 'Payments', icon: 'wallet' },
    { key: 'expenses', ku: 'خەرجییەکان', en: 'Expenses', icon: 'receipt' },
    { key: 'reports', ku: 'ڕاپۆرتەکان', en: 'Reports', icon: 'bar-chart-3' },
    { key: 'settings', ku: 'ڕێکخستنەکان', en: 'Settings', icon: 'settings' },
  ];

  /* ───────── USERS (mutable — add/remove, per-module access) ───────── */
  const ALL = modules.map((m) => m.key);
  const users = [
    { id: 'U-01', name: 'ڕێبین ئەحمەد', nameEn: 'Rebin Ahmed', email: 'rebin@bnarikodo.com', role: ['بەڕێوەبەر', 'Admin'], roleKey: 'admin', active: true, modules: ALL.slice() },
    { id: 'U-02', name: 'ئاریان محەمەد', nameEn: 'Aryan Mohammed', email: 'aryan@bnarikodo.com', role: ['فرۆشیار', 'Agent'], roleKey: 'agent', active: true, modules: ['dashboard', 'properties', 'contacts', 'areas', 'transactions', 'contracts'] },
    { id: 'U-03', name: 'شیلان عەلی', nameEn: 'Shilan Ali', email: 'shilan@bnarikodo.com', role: ['ژمێریار', 'Accountant'], roleKey: 'accountant', active: true, modules: ['dashboard', 'payments', 'expenses', 'reports'] },
    { id: 'U-04', name: 'دلێر عومەر', nameEn: 'Dler Omer', email: 'dler@bnarikodo.com', role: ['پشتگیری', 'Support'], roleKey: 'support', active: false, modules: ['dashboard', 'contacts'] },
  ];

  /* ───────── EXTERNAL AGREEMENTS (data-driven) ───────── */
  const agreements = [
    { id: 'EA-0418', kind: 'reservation', type: ['ڕێککەوتنی ڕیزێرڤ', 'Reservation'], prop: 'ڤێلا ١٨ ئیتالی', propEn: 'Villa 18 Italian', party: 'ئاسۆ ئیبراهیم', partyEn: 'Aso Ibrahim', amount: '$5,000', value: 5000, date: '٢٠٢٦/٠٦/٠٨', dateEn: '2026/06/08', status: 'signed' },
    { id: 'EA-0417', kind: 'commission', type: ['ڕێککەوتنی کۆمسیۆن', 'Commission'], prop: 'زەوی ٢٤٥', propEn: 'Land 245', party: 'کۆمپانیای زانا', partyEn: 'Zana Company', amount: '3%', value: 0, date: '٢٠٢٦/٠٦/٠٧', dateEn: '2026/06/07', status: 'draft' },
    { id: 'EA-0416', kind: 'rent', type: ['ڕێککەوتنی کرێی خێرا', 'Quick rent'], prop: 'شوقە B-403', propEn: 'Apt B-403', party: 'هێرۆ کەریم', partyEn: 'Hero Karim', amount: '$900', value: 900, date: '٢٠٢٦/٠٦/٠٥', dateEn: '2026/06/05', status: 'converted' },
    { id: 'EA-0415', kind: 'sale', type: ['ڕێککەوتنی فرۆشتنی خێرا', 'Quick sale'], prop: 'دوکان ٧٧', propEn: 'Shop 77', party: 'ڕێبوار تۆفیق', partyEn: 'Rebwar Tofiq', amount: '$185,000', value: 185000, date: '٢٠٢٦/٠٥/١٨', dateEn: '2026/05/18', status: 'signed' },
    { id: 'EA-0414', kind: 'advance', type: ['پسوولەی پارەی پێشەکی', 'Advance receipt'], prop: 'شوقە A-118', propEn: 'Apt A-118', party: 'دلێر عومەر', partyEn: 'Dler Omer', amount: '$20,000', value: 20000, date: '٢٠٢٦/٠٥/٢٢', dateEn: '2026/05/22', status: 'cancelled' },
  ];

  /* ───────── BNARI KODO OWNERS (entered in Settings; auto-listed in Contacts) ───────── */
  /* stored as contact ids — these contacts are flagged bkOwner:true and treated as company owners for P&L */
  const bkOwners = ['C-07'];

  /* ───────── AREAS (mutable) ───────── */
  const areas = [
    { id: 'AR-01', ku: 'ئیتالی ڤیلەج', en: 'Italian Village', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-02', ku: 'ئیمپایەر', en: 'Empire', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-03', ku: 'دریم سیتی', en: 'Dream City', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-04', ku: 'کەسنەزان', en: 'Kasnazan', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-05', ku: 'ناوەندی شار', en: 'Downtown', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-06', ku: 'بنەسڵاوە', en: 'Binaslawa', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-07', ku: 'نیو هاوسێن', en: 'New Hawsin', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-08', ku: 'زانیاری', en: 'Zanyari', city: 'هەولێر', cityEn: 'Erbil' },
    { id: 'AR-09', ku: 'شەقامی ٦٠ مەتری', en: '60m Street', city: 'هەولێر', cityEn: 'Erbil' },
  ];

  /* normalize contracts: numeric price + payments array (down-payment auto-recorded) */
  contracts.forEach((c) => {
    if (c.priceVal === undefined) c.priceVal = Number(String(c.price).replace(/[^0-9.]/g, '')) || 0;
    if (!Array.isArray(c.payments)) {
      const adv = Number(String(c.advance).replace(/[^0-9.]/g, '')) || 0;
      c.payments = adv ? [{ id: 'CP-' + c.id, date: c.dateEn, amount: adv, note: 'پارەی پێشەکی', noteEn: 'Down payment' }] : [];
    }
    if (!c.witness1) c.witness1 = 'محمد كەیفی ئەنوەر';
    if (!c.witness2) c.witness2 = 'بالێن سێودین ئەحمەد';
  });

  /* ── EXACT EXAMPLE (Bnari Kodo profit-split demo) ──
     Property co-owned by Jangawar (Bnari Kodo owner) + Ali, bought (cost) $40,000.
     Sold for $50,000 with $200 commission. Company gain = 50% × ($50,000 − $40,000) = $5,000. */
  (function () {
    if (!properties.find((p) => p.id === 'P-3940')) {
      properties.push({ id: 'P-3940', type: 'land', icon: 'trees', typeKu: 'زەوی', typeEn: 'Land', number: '512', areaKu: 'کەسنەزان', areaEn: 'Kasnazan', size: '400 م²', sizeEn: '400 m²', price: '$40,000', value: 40000, cost: 40000, status: 'closed', purpose: ['فرۆشتن', 'Sale'], deliver: '٢٠٢٦/٠٦/١٠', deliverEn: '2026/06/10', owners: [{ id: 'C-07', share: 50 }, { id: 'C-08', share: 50 }], partner: 'جەنگاوەر سیوەدین', partnerEn: 'Jangawar Siwadin', ownerId: 'C-07', source: ['کۆمپانیا', 'Company'], landDoc: 'tapo', lat: '36.2901° N', lng: '44.0102° E', note: 'موڵکی کۆمپانیا، خاوەنی هاوبەش: جەنگاوەر و عەلی (٥٠٪/٥٠٪).', noteEn: 'Company property, co-owned by Jangawar & Ali (50/50).' });
    }
    if (!contracts.find((c) => c.id === '00036')) {
      contracts.unshift({ id: '00036', type: ['گرێبەستی فرۆشتن', 'Sale contract'], kind: 'sale', propType: ['زەوی', 'Land'], landDoc: 'tapo', propNumber: '512', areaKu: 'کەسنەزان', areaEn: 'Kasnazan', deliver: '٢٠٢٦/٠٦/١٠', deliverEn: '2026/06/10', date: '٢٠٢٦/٠٦/١٢', dateEn: '2026/06/12', first: 'بناری کۆدۆ', firstEn: 'Bnari Kodo', firstRes: 'هەولێر', second: 'ئاسۆ ئیبراهیم', secondEn: 'Aso Ibrahim', secondRes: 'هەولێر', price: '$50,000', priceVal: 50000, advance: '$50,000', commission: '1%', commValue: 200, status: 'signed', witness1: 'محمد كەیفی ئەنوەر', witness2: 'بالێن سێودین ئەحمەد', payments: [{ id: 'CP-00036', date: '2026/06/12', amount: 50000, note: 'پارەی تەواو', noteEn: 'Full payment' }] });
    }
  })();

  /* normalize agreements into the SAME shape as contracts (identical module behaviour) */
  agreements.forEach((a) => {
    a.kind = a.kind === 'rent' ? 'rent' : 'sale';
    a.type = a.kind === 'rent' ? ['ڕێککەوتنی کرێ', 'Rent agreement'] : ['ڕێککەوتنی فرۆشتن', 'Sale agreement'];
    if (a.priceVal === undefined) a.priceVal = a.value || Number(String(a.amount).replace(/[^0-9.]/g, '')) || 0;
    a.price = a.amount && /\d/.test(String(a.amount)) ? a.amount : ('$' + (a.priceVal || 0).toLocaleString('en-US'));
    // derive property bits
    const digits = (a.prop || '').replace(/\D/g, '') || (a.propEn || '').replace(/\D/g, '');
    const pr = properties.find((p) => p.number && p.number.replace(/\D/g, '') === digits);
    a.propType = pr ? [pr.typeKu, pr.typeEn] : ['موڵک', 'Property'];
    a.propNumber = pr ? pr.number : (digits || '—');
    a.areaKu = pr ? pr.areaKu : (a.prop || '').replace(/[\d\s].*$/, '').trim() || 'هەولێر';
    a.areaEn = pr ? pr.areaEn : 'Erbil';
    a.landDoc = pr ? pr.landDoc : '';
    a.deliver = pr ? pr.deliver : '—'; a.deliverEn = pr ? pr.deliverEn : '—';
    // parties
    a.first = 'بناری کۆدۆ'; a.firstEn = 'Bnari Kodo'; a.firstRes = 'هەولێر'; a.firstPhone = ''; a.firstNid = '';
    a.second = a.party; a.secondEn = a.partyEn; a.secondRes = 'هەولێر'; a.secondPhone = ''; a.secondNid = '';
    a.commission = '1%'; a.commValue = a.commValue || 0;
    a.advance = a.advance || '$0';
    if (!a.witness1) a.witness1 = 'محمد کەیفی ئەنوەر';
    if (!a.witness2) a.witness2 = 'بالێن سێودین ئەحمەد';
    if (!Array.isArray(a.payments)) a.payments = [];
  });

  const seed = { properties, partners, contacts, accounts, expenses, contracts, transactions, payments, company, modules, users, agreements, areas, bkOwners };

  /* ───────── ASSOCIATION CHECK (for deletion rules) ───────── */
  // returns count of records tied to a contact (transactions, properties, contracts) — 0 ⇒ deletable
  seed.contactAssoc = function (id) {
    const c = contacts.find((x) => x.id === id); if (!c) return 0;
    const nm = c.name, nmEn = c.nameEn;
    let n = 0;
    n += properties.filter((p) => p.ownerId === id || (p.owners || []).some((o) => o.id === id) || p.partner === nm).length;
    n += transactions.filter((t) => t.party === nm || t.partyEn === nmEn || t.seller === nm).length;
    n += contracts.filter((ct) => ct.first === nm || ct.second === nm).length;
    return n;
  };
  seed.areaAssoc = function (id) {
    const a = areas.find((x) => x.id === id); if (!a) return 0;
    return properties.filter((p) => p.areaEn === a.en || p.areaKu === a.ku).length;
  };
  // is this contact a Bnari Kodo company owner?
  seed.isBkOwner = function (id) { return bkOwners.indexOf(id) > -1; };

  /* ───────── PERSISTENCE (localStorage) — keeps demo edits across reloads ───────── */
  const KEY = 'bnari_kodo_data_v5';
  // collections that should be saved/restored (skip static config: modules, company)
  const SAVED = ['properties', 'partners', 'contacts', 'accounts', 'expenses', 'contracts', 'transactions', 'payments', 'users', 'agreements', 'areas', 'bkOwners'];

  function persist() {
    try {
      const out = {};
      SAVED.forEach((k) => { out[k] = seed[k]; });
      localStorage.setItem(KEY, JSON.stringify(out));
    } catch (e) { /* storage full / disabled — ignore */ }
  }

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // replace each saved collection's contents IN PLACE so existing references stay valid
      SAVED.forEach((k) => {
        if (Array.isArray(saved[k])) { seed[k].length = 0; saved[k].forEach((item) => seed[k].push(item)); }
      });
    }
  } catch (e) { /* corrupt store — fall back to seed */ }

  seed.save = persist;            // call after any mutation
  seed.reset = function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };

  /* Auto-save: re-persist shortly after any user click that mutated data
     (modules/forms call window.DATA.save() explicitly too). */
  if (typeof window !== 'undefined') {
    window.addEventListener('click', () => { clearTimeout(seed._t); seed._t = setTimeout(persist, 150); });
  }

  return seed;
})();
