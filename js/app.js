/* ═══════════════════════════════════════════════════════════════
   Vesioh — Main Application Logic
   ═══════════════════════════════════════════════════════════════ */

const SB_URL = 'https://pfkycszeqyrysapovain.supabase.co';
const SB_KEY = 'sb_publishable_5vcUqIm2F5NOqf1ESZSu3w_esDGEhjm';
let sb = null,
  sbOn = false;

try {
  if (
    SB_URL !== 'https://pfkycszeqyrysapovain.supabase.co' &&
    SB_KEY !== 'sb_publishable_5vcUqIm2F5NOqf1ESZSu3w_esDGEhjm'
  ) {
    sb = window.supabase.createClient(SB_URL, SB_KEY);
    sbOn = true;
    console.log('[Vesioh] Supabase connected');
  }
} catch (e) {
  console.warn('[Vesioh] Supabase offline, using local data');
}

// ─── DATA ───
const CATS = [
  {
    id: 1,
    name: 'Electronics',
    icon: 'fas fa-laptop',
    color: '#C47D4E',
    count: 12400,
  },
  {
    id: 2,
    name: 'Fashion',
    icon: 'fas fa-tshirt',
    color: '#C0544F',
    count: 18900,
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: 'fas fa-couch',
    color: '#5B8C5A',
    count: 8700,
  },
  {
    id: 4,
    name: 'Sports',
    icon: 'fas fa-futbol',
    color: '#D4A24E',
    count: 5300,
  },
  { id: 5, name: 'Books', icon: 'fas fa-book', color: '#7A6558', count: 15200 },
  {
    id: 6,
    name: 'Automotive',
    icon: 'fas fa-car',
    color: '#A8623A',
    count: 3400,
  },
  {
    id: 7,
    name: 'Health & Beauty',
    icon: 'fas fa-heart',
    color: '#C0544F',
    count: 9800,
  },
  {
    id: 8,
    name: 'Toys & Games',
    icon: 'fas fa-puzzle-piece',
    color: '#D4A24E',
    count: 6100,
  },
  { id: 9, name: 'Jewelry', icon: 'fas fa-gem', color: '#C47D4E', count: 4500 },
  {
    id: 10,
    name: 'Music',
    icon: 'fas fa-music',
    color: '#5B8C5A',
    count: 3200,
  },
  {
    id: 11,
    name: 'Art & Crafts',
    icon: 'fas fa-palette',
    color: '#A8623A',
    count: 2800,
  },
  { id: 12, name: 'Pets', icon: 'fas fa-paw', color: '#7A6558', count: 4100 },
];

const PRODS = [
  {
    id: 1,
    title: 'Wireless Noise-Cancelling Headphones',
    price: 89.99,
    orig: 149.99,
    cat: 'electronics',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo1/400/400.jpg',
    rate: 4.8,
    rev: 342,
    seller: 'AudioHub',
    flash: true,
  },
  {
    id: 2,
    title: 'Premium Leather Crossbody Bag',
    price: 54.99,
    orig: 79.99,
    cat: 'fashion',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo2/400/400.jpg',
    rate: 4.6,
    rev: 187,
    seller: 'BagCraft',
    flash: true,
  },
  {
    id: 3,
    title: 'Smart Watch Fitness Tracker Pro',
    price: 129.99,
    orig: 199.99,
    cat: 'electronics',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo3/400/400.jpg',
    rate: 4.7,
    rev: 521,
    seller: 'TechWear',
    flash: true,
  },
  {
    id: 4,
    title: 'Organic Cotton Throw Blanket',
    price: 39.99,
    orig: 59.99,
    cat: 'home',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo4/400/400.jpg',
    rate: 4.9,
    rev: 98,
    seller: 'CozyNest',
    flash: true,
  },
  {
    id: 5,
    title: 'Running Shoes Ultra Comfort',
    price: 74.99,
    orig: 119.99,
    cat: 'sports',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo5/400/400.jpg',
    rate: 4.5,
    rev: 267,
    seller: 'RunFree',
    flash: true,
  },
  {
    id: 6,
    title: 'Vintage Denim Jacket',
    price: 45,
    orig: null,
    cat: 'fashion',
    cond: 'Good',
    img: 'https://picsum.photos/seed/vo6/400/400.jpg',
    rate: 4.3,
    rev: 64,
    seller: 'RetroStyle',
  },
  {
    id: 7,
    title: 'Portable Bluetooth Speaker',
    price: 34.99,
    orig: 49.99,
    cat: 'electronics',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo7/400/400.jpg',
    rate: 4.4,
    rev: 412,
    seller: 'SoundWave',
  },
  {
    id: 8,
    title: 'Ceramic Plant Pot Set 3-Pack',
    price: 28.99,
    orig: null,
    cat: 'home',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo8/400/400.jpg',
    rate: 4.7,
    rev: 156,
    seller: 'GreenHome',
  },
  {
    id: 9,
    title: 'Mystery Novel Collection Bestsellers',
    price: 19.99,
    orig: 34.99,
    cat: 'books',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo9/400/400.jpg',
    rate: 4.8,
    rev: 89,
    seller: 'BookHaven',
  },
  {
    id: 10,
    title: 'Yoga Mat Premium Non-Slip',
    price: 32.99,
    orig: 44.99,
    cat: 'sports',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo10/400/400.jpg',
    rate: 4.6,
    rev: 203,
    seller: 'ZenFit',
  },
  {
    id: 11,
    title: 'Mechanical Keyboard RGB Backlit',
    price: 67.99,
    orig: 89.99,
    cat: 'electronics',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo11/400/400.jpg',
    rate: 4.7,
    rev: 678,
    seller: 'KeyCraft',
  },
  {
    id: 12,
    title: 'Silk Scarf Floral Pattern',
    price: 22.99,
    orig: null,
    cat: 'fashion',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo12/400/400.jpg',
    rate: 4.4,
    rev: 91,
    seller: 'SilkRoad',
  },
  {
    id: 13,
    title: 'LED Desk Lamp Adjustable Arm',
    price: 41.99,
    orig: 59.99,
    cat: 'home',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo13/400/400.jpg',
    rate: 4.5,
    rev: 324,
    seller: 'BrightSpace',
  },
  {
    id: 14,
    title: 'Wireless Charging Pad Fast',
    price: 18.99,
    orig: 29.99,
    cat: 'electronics',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo14/400/400.jpg',
    rate: 4.3,
    rev: 547,
    seller: 'ChargeUp',
  },
  {
    id: 15,
    title: 'Handmade Ceramic Mug Set',
    price: 26.99,
    orig: null,
    cat: 'home',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo15/400/400.jpg',
    rate: 4.9,
    rev: 112,
    seller: 'MugLife',
  },
  {
    id: 16,
    title: 'Polarized UV400 Sunglasses',
    price: 15.99,
    orig: 24.99,
    cat: 'fashion',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo16/400/400.jpg',
    rate: 4.2,
    rev: 389,
    seller: 'ShadeWorks',
  },
  {
    id: 17,
    title: 'Resistance Bands Set 5-Piece',
    price: 14.99,
    orig: 22.99,
    cat: 'sports',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo17/400/400.jpg',
    rate: 4.6,
    rev: 178,
    seller: 'FlexBand',
  },
  {
    id: 18,
    title: 'Stainless Steel Water Bottle',
    price: 19.99,
    orig: null,
    cat: 'sports',
    cond: 'New',
    img: 'https://picsum.photos/seed/vo18/400/400.jpg',
    rate: 4.8,
    rev: 445,
    seller: 'HydroMax',
  },
];

const ORDERS = [
  {
    id: 'VO-10001',
    date: '2025-01-10',
    status: 'delivered',
    total: 124.98,
    items: [
      { t: 'Wireless Headphones', q: 1, p: 89.99 },
      { t: 'LED Desk Lamp', q: 1, p: 41.99 },
    ],
    rider: 'Marcus T.',
  },
  {
    id: 'VO-10002',
    date: '2025-01-12',
    status: 'shipping',
    total: 54.99,
    items: [{ t: 'Leather Crossbody Bag', q: 1, p: 54.99 }],
    rider: 'Sarah K.',
  },
  {
    id: 'VO-10003',
    date: '2025-01-14',
    status: 'pending',
    total: 142.98,
    items: [
      { t: 'Smart Watch Pro', q: 1, p: 129.99 },
      { t: 'Silk Scarf', q: 1, p: 22.99 },
    ],
    rider: 'Unassigned',
  },
];

const DELIVS = [
  {
    id: 'D-001',
    from: '123 Market St',
    to: '456 Oak Ave',
    cust: 'Emily R.',
    status: 'in-transit',
    earn: 12.5,
    time: '12 min ago',
  },
  {
    id: 'D-002',
    from: '789 Pine Rd',
    to: '321 Elm Blvd',
    cust: 'James W.',
    status: 'picked-up',
    earn: 8.75,
    time: '25 min ago',
  },
  {
    id: 'D-003',
    from: '555 Cedar Ln',
    to: '888 Birch Dr',
    cust: 'Sophie L.',
    status: 'delivered',
    earn: 15,
    time: '1 hr ago',
  },
];

const EARN = [
  { d: 'Mon', a: 145 },
  { d: 'Tue', a: 178 },
  { d: 'Wed', a: 132 },
  { d: 'Thu', a: 187 },
  { d: 'Fri', a: 165 },
  { d: 'Sat', a: 0 },
  { d: 'Sun', a: 0 },
];
const PAYOUTS = [
  { date: 'Jan 10, 2025', amt: '$842.00', m: 'Bank Transfer', s: 'Completed' },
  { date: 'Jan 3, 2025', amt: '$756.50', m: 'Bank Transfer', s: 'Completed' },
  { date: 'Dec 27, 2024', amt: '$691.25', m: 'Bank Transfer', s: 'Completed' },
];

// ─── STATE ───
let user = null,
  cart = [],
  curPage = 'home',
  delFee = 4.99,
  dealSec = 20538,
  dealTimer = null;

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  cart = JSON.parse(localStorage.getItem('vo_cart') || '[]');
  user = JSON.parse(localStorage.getItem('vo_user') || 'null');
  updateAuth();
  updateCartBadge();
  renderPage();
  document.addEventListener('click', (e) => {
    const d = document.getElementById('profDrop');
    if (d && !d.parentElement.contains(e.target)) d.classList.add('hidden');
  });
});

// ─── TOAST ───
function toast(msg, type = 'info') {
  const c = {
    success: '#5B8C5A',
    error: '#C0544F',
    info: '#C47D4E',
    warning: '#D4A24E',
  };
  const ic = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle',
  };
  const el = document.createElement('div');
  el.className = 'toast';
  el.style.background = c[type];
  el.innerHTML = `<i class="fas ${ic[type]} mr-2"></i>${msg}`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ─── NAVIGATION ───
function go(page) {
  curPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderPage();
  document
    .querySelectorAll('.nav-link')
    .forEach((l) => l.classList.toggle('active', l.dataset.nav === page));
  document.querySelectorAll('.mob-nav').forEach((b) => {
    b.classList.toggle('text-caramel-500', b.dataset.m === page);
    b.classList.toggle('text-cream-800', b.dataset.m !== page);
  });
  document.getElementById('mobMenu').classList.add('hidden');
}

// ─── AUTH ───
function openAuth(mode) {
  document.getElementById('authModal').classList.add('active');
  document
    .getElementById('loginForm')
    .classList.toggle('hidden', mode !== 'login');
  document
    .getElementById('regForm')
    .classList.toggle('hidden', mode !== 'register');
  document.getElementById('authTitle').textContent =
    mode === 'login' ? 'Sign In' : 'Create Account';
  document.getElementById('loginErr').classList.add('hidden');
  document.getElementById('regErr').classList.add('hidden');
}

function closeAuth() {
  document.getElementById('authModal').classList.remove('active');
}

async function doLogin(e) {
  e.preventDefault();
  const em = document.getElementById('loginEmail').value,
    pw = document.getElementById('loginPass').value,
    errEl = document.getElementById('loginErr');
  errEl.classList.add('hidden');
  if (sbOn) {
    const { data, error } = await sb.auth.signInWithPassword({
      email: em,
      password: pw,
    });
    if (error) {
      errEl.textContent = error.message;
      errEl.classList.remove('hidden');
      return;
    }
    const { data: prof } = await sb
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    user = { ...data.user, ...(prof || {}) };
  } else {
    if (!em.includes('@')) {
      errEl.textContent = 'Enter a valid email';
      errEl.classList.remove('hidden');
      return;
    }
    if (pw.length < 3) {
      errEl.textContent = 'Password too short';
      errEl.classList.remove('hidden');
      return;
    }
    user = { id: 'loc_' + Date.now(), email: em, name: em.split('@')[0] };
  }
  localStorage.setItem('vo_user', JSON.stringify(user));
  updateAuth();
  closeAuth();
  toast('Welcome back!', 'success');
  renderPage();
}

async function doRegister(e) {
  e.preventDefault();
  const nm = document.getElementById('regName').value,
    em = document.getElementById('regEmail').value,
    pw = document.getElementById('regPass').value,
    cf = document.getElementById('regConf').value,
    errEl = document.getElementById('regErr');
  errEl.classList.add('hidden');
  if (pw !== cf) {
    errEl.textContent = 'Passwords do not match';
    errEl.classList.remove('hidden');
    return;
  }
  if (pw.length < 6) {
    errEl.textContent = 'Password must be 6+ characters';
    errEl.classList.remove('hidden');
    return;
  }
  if (sbOn) {
    const { data, error } = await sb.auth.signUp({
      email: em,
      password: pw,
      options: { data: { name: nm } },
    });
    if (error) {
      errEl.textContent = error.message;
      errEl.classList.remove('hidden');
      return;
    }
    await sb.from('profiles').upsert({ id: data.user.id, name: nm, email: em });
    user = { ...data.user, name: nm };
  } else {
    user = { id: 'loc_' + Date.now(), email: em, name: nm };
  }
  localStorage.setItem('vo_user', JSON.stringify(user));
  updateAuth();
  closeAuth();
  toast('Account created!', 'success');
  renderPage();
}

function signOut() {
  if (sbOn) sb.auth.signOut();
  user = null;
  localStorage.removeItem('vo_user');
  updateAuth();
  toast('Signed out', 'info');
  go('home');
}

function updateAuth() {
  const a = document.getElementById('authBtn'),
    p = document.getElementById('profBtn');
  if (user) {
    a.classList.add('hidden');
    p.classList.remove('hidden');
    const n =
      user.name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'User';
    document.getElementById('avInit').textContent = n.charAt(0).toUpperCase();
    document.getElementById('avName').textContent = n;
  } else {
    a.classList.remove('hidden');
    p.classList.add('hidden');
  }
}

// ─── CART ───
function addCart(id, silent) {
  const p = PRODS.find((x) => x.id === id);
  if (!p) return;
  const ex = cart.find((c) => c.id === id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty: 1 });
  localStorage.setItem('vo_cart', JSON.stringify(cart));
  updateCartBadge();
  if (!silent) toast(p.title.substring(0, 25) + '... added to cart', 'success');
}

function rmCart(id) {
  cart = cart.filter((c) => c.id !== id);
  localStorage.setItem('vo_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function updCartQty(id, d) {
  const it = cart.find((c) => c.id === id);
  if (!it) return;
  it.qty += d;
  if (it.qty < 1) {
    rmCart(id);
    return;
  }
  localStorage.setItem('vo_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const n = cart.reduce((s, c) => s + c.qty, 0);
  const b = document.getElementById('cartBadge'),
    m = document.getElementById('mobCartBadge');
  if (n > 0) {
    b.classList.remove('hidden');
    b.textContent = n;
    if (m) {
      m.classList.remove('hidden');
      m.textContent = n;
    }
  } else {
    b.classList.add('hidden');
    if (m) m.classList.add('hidden');
  }
}

function openCart() {
  renderCartItems();
  document.getElementById('cartSB').classList.add('open');
  document.getElementById('cartOv').classList.add('open');
}

function closeCart() {
  document.getElementById('cartSB').classList.remove('open');
  document.getElementById('cartOv').classList.remove('open');
}

function renderCartItems() {
  const ci = document.getElementById('cartItems'),
    ce = document.getElementById('cartEmpty'),
    cf = document.getElementById('cartFoot');
  if (!cart.length) {
    ci.innerHTML = '';
    ce.classList.remove('hidden');
    cf.classList.add('hidden');
    return;
  }
  ce.classList.add('hidden');
  cf.classList.remove('hidden');
  ci.innerHTML = cart
    .map(
      (c) => `
    <div class="flex gap-3 p-3 rounded-xl bg-cream-50">
      <img src="${c.img}" class="w-16 h-16 rounded-lg object-cover shrink-0" alt="">
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-cream-900 truncate">${c.title}</h4>
        <p class="text-sm font-display font-bold text-caramel-500 mt-0.5">$${c.price.toFixed(2)}</p>
        <div class="flex items-center justify-between mt-1.5">
          <div class="flex items-center border border-cream-400 rounded-md bg-white">
            <button onclick="updCartQty(${c.id},-1)" class="w-7 h-7 flex items-center justify-center text-cream-800 hover:bg-cream-100 text-xs"><i class="fas fa-minus"></i></button>
            <span class="w-7 h-7 flex items-center justify-center text-xs font-semibold text-cream-900 border-x border-cream-400">${c.qty}</span>
            <button onclick="updCartQty(${c.id},1)" class="w-7 h-7 flex items-center justify-center text-cream-800 hover:bg-cream-100 text-xs"><i class="fas fa-plus"></i></button>
          </div>
          <button onclick="rmCart(${c.id})" class="text-cream-500 hover:text-terracotta-500"><i class="fas fa-trash-alt text-xs"></i></button>
        </div>
      </div>
    </div>`,
    )
    .join('');
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cSub').textContent = '$' + sub.toFixed(2);
  document.getElementById('cDel').textContent = '$' + delFee.toFixed(2);
  document.getElementById('cTot').textContent = '$' + (sub + delFee).toFixed(2);
}

function doCheckout() {
  if (!user) {
    closeCart();
    openAuth('login');
    toast('Sign in to checkout', 'warning');
    return;
  }
  if (!cart.length) return;
  closeCart();
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('coItems').textContent = cart.reduce(
    (s, c) => s + c.qty,
    0,
  );
  document.getElementById('coSub').textContent = '$' + sub.toFixed(2);
  updCO();
  document.getElementById('coModal').classList.add('active');
}

function updCO() {
  const fee = parseFloat(
    document.querySelector('input[name=spd]:checked')?.value || 4.99,
  );
  delFee = fee;
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('coDel').textContent = '$' + fee.toFixed(2);
  document.getElementById('coTot').textContent = '$' + (sub + fee).toFixed(2);
}

function placeOrder(e) {
  e.preventDefault();
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0),
    tot = sub + delFee;
  const oid = 'VO-' + (10004 + Math.floor(Math.random() * 1000));
  cart = [];
  localStorage.setItem('vo_cart', '[]');
  updateCartBadge();
  document.getElementById('coModal').classList.remove('active');
  toast('Order ' + oid + ' placed! Rider will be assigned.', 'success');
  go('orders');
}

// ─── SEARCH ───
function doSearch() {
  const q = (
    document.getElementById('searchInput').value ||
    document.getElementById('mobSearch').value ||
    ''
  )
    .trim()
    .toLowerCase();
  if (!q) {
    go('home');
    return;
  }
  curPage = 'search';
  renderPage(q);
}

// ─── PRODUCT CARD ───
function pcard(p) {
  const disc = p.orig ? Math.round((1 - p.price / p.orig) * 100) : 0;
  const st = Array(5)
    .fill(0)
    .map((_, i) =>
      i < Math.floor(p.rate)
        ? '<i class="fas fa-star text-gold-500 text-[10px]"></i>'
        : '<i class="far fa-star text-cream-400 text-[10px]"></i>',
    )
    .join('');
  return `<div class="product-card bg-white rounded-2xl border border-cream-300 overflow-hidden cursor-pointer" onclick="openProd(${p.id})">
    <div class="relative img-zoom h-44 sm:h-48 bg-cream-100">
      <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover" loading="lazy">
      ${disc ? `<span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-terracotta-500 text-white text-[10px] font-bold">-${disc}%</span>` : ''}
      ${p.flash ? `<span class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-gold-500 text-white text-[10px] font-bold"><i class="fas fa-bolt mr-0.5"></i>DEAL</span>` : ''}
      <button onclick="event.stopPropagation();toast('Added to wishlist','success')" class="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white shadow-sm"><i class="far fa-heart text-cream-900 text-sm"></i></button>
    </div>
    <div class="p-3">
      <p class="text-[11px] text-cream-800 mb-0.5">${p.seller}</p>
      <h3 class="text-sm font-medium text-cream-900 leading-snug mb-2" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.title}</h3>
      <div class="flex items-center gap-1 mb-2">${st}<span class="text-[10px] text-cream-800 ml-1">(${p.rev})</span></div>
      <div class="flex items-center justify-between">
        <div><span class="font-display font-extrabold text-base text-caramel-500">$${p.price.toFixed(2)}</span>${p.orig ? `<span class="text-xs text-cream-500 line-through ml-1">$${p.orig.toFixed(2)}</span>` : ''}</div>
        <button onclick="event.stopPropagation();addCart(${p.id})" class="w-8 h-8 rounded-lg bg-caramel-500 text-white flex items-center justify-center hover:bg-caramel-600 shadow-sm"><i class="fas fa-plus text-xs"></i></button>
      </div>
      <div class="mt-2 flex items-center gap-1 text-[10px] text-cream-800"><i class="fas fa-motorcycle text-caramel-500"></i> Vesioh Delivery</div>
    </div></div>`;
}

// ─── PRODUCT DETAIL ───
function openProd(id) {
  const p = PRODS.find((x) => x.id === id);
  if (!p) return;
  const disc = p.orig ? Math.round((1 - p.price / p.orig) * 100) : 0;
  const st = Array(5)
    .fill(0)
    .map((_, i) =>
      i < Math.floor(p.rate)
        ? '<i class="fas fa-star text-gold-500"></i>'
        : '<i class="far fa-star text-cream-400"></i>',
    )
    .join('');
  document.getElementById('prodModalInner').innerHTML = `
    <div class="grid md:grid-cols-2">
      <div class="img-zoom bg-cream-100 h-72 md:h-full min-h-[300px]"><img src="${p.img}" class="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"></div>
      <div class="p-6 md:p-8">
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <span class="px-2 py-0.5 rounded-md bg-cream-200 text-cream-800 text-xs font-medium">${p.cond}</span>
          <span class="px-2 py-0.5 rounded-md bg-cream-200 text-cream-800 text-xs font-medium capitalize">${p.cat}</span>
          ${disc ? `<span class="px-2 py-0.5 rounded-md bg-terracotta-500/10 text-terracotta-500 text-xs font-bold">-${disc}% OFF</span>` : ''}
        </div>
        <h2 class="font-display font-extrabold text-xl md:text-2xl text-cream-900 mb-2 leading-tight">${p.title}</h2>
        <p class="text-sm text-cream-800 mb-3">Sold by <span class="font-semibold text-caramel-500">${p.seller}</span></p>
        <div class="flex items-center gap-2 mb-4"><div class="flex gap-0.5">${st}</div><span class="text-sm font-medium">${p.rate}</span><span class="text-sm text-cream-800">(${p.rev})</span></div>
        <div class="flex items-baseline gap-3 mb-6"><span class="font-display font-black text-3xl text-caramel-500">$${p.price.toFixed(2)}</span>${p.orig ? `<span class="text-lg text-cream-500 line-through">$${p.orig.toFixed(2)}</span>` : ''}</div>
        <div class="space-y-3 mb-6">
          <div class="flex items-center gap-2 text-sm text-cream-800"><i class="fas fa-motorcycle text-caramel-500 w-5"></i>Delivered by Vesioh Rider</div>
          <div class="flex items-center gap-2 text-sm text-cream-800"><i class="fas fa-shield-alt text-sage-500 w-5"></i>Buyer protection included</div>
          <div class="flex items-center gap-2 text-sm text-cream-800"><i class="fas fa-undo text-gold-500 w-5"></i>30-day return policy</div>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <span class="text-sm font-medium">Qty:</span>
          <div class="flex items-center border border-cream-400 rounded-lg">
            <button onclick="let e=document.getElementById('dQty');let v=parseInt(e.textContent)-1;if(v<1)v=1;e.textContent=v" class="w-9 h-9 flex items-center justify-center text-cream-800 hover:bg-cream-100"><i class="fas fa-minus text-xs"></i></button>
            <span id="dQty" class="w-10 h-9 flex items-center justify-center text-sm font-semibold border-x border-cream-400">1</span>
            <button onclick="let e=document.getElementById('dQty');let v=parseInt(e.textContent)+1;if(v>10)v=10;e.textContent=v" class="w-9 h-9 flex items-center justify-center text-cream-800 hover:bg-cream-100"><i class="fas fa-plus text-xs"></i></button>
          </div>
        </div>
        <div class="flex gap-3">
          <button onclick="let q=parseInt(document.getElementById('dQty').textContent);for(let i=0;i<q;i++)addCart(${p.id},true);document.getElementById('prodModal').classList.remove('active');toast('Added '+q+' item(s) to cart','success')" class="flex-1 h-12 rounded-xl bg-caramel-500 text-white font-semibold hover:bg-caramel-600 shadow-lg shadow-caramel-500/20"><i class="fas fa-shopping-bag mr-2"></i>Add to Cart</button>
          <button onclick="toast('Added to wishlist','success')" class="w-12 h-12 rounded-xl border border-cream-400 flex items-center justify-center hover:border-caramel-500"><i class="far fa-heart text-cream-900"></i></button>
        </div>
      </div>
    </div>`;
  document.getElementById('prodModal').classList.add('active');
}

// ─── DEAL TIMER ───
function startDealTimer() {
  if (dealTimer) clearInterval(dealTimer);
  dealTimer = setInterval(() => {
    dealSec--;
    if (dealSec < 0) dealSec = 21600;
    const h = Math.floor(dealSec / 3600),
      m = Math.floor((dealSec % 3600) / 60),
      s = dealSec % 60;
    const el = document.getElementById('dealTimer');
    if (el)
      el.textContent =
        String(h).padStart(2, '0') +
        ':' +
        String(m).padStart(2, '0') +
        ':' +
        String(s).padStart(2, '0');
  }, 1000);
}

function handleSell(e) {
  e.preventDefault();
  if (!user) {
    openAuth('login');
    toast('Sign in to sell', 'warning');
    return;
  }
  toast('Item listed successfully!', 'success');
  e.target.reset();
  document.getElementById('imgPrev').innerHTML = '';
}

function handleRiderApply(e) {
  e.preventDefault();
  toast(
    'Application submitted! We will contact you within 48 hours.',
    'success',
  );
  e.target.reset();
}

function handleProfUpdate(e) {
  e.preventDefault();
  const n = document.getElementById('profNameIn').value;
  if (n && user) {
    user.name = n;
    localStorage.setItem('vo_user', JSON.stringify(user));
    updateAuth();
  }
  toast('Profile updated!', 'success');
}

function imgPrev(e) {
  const files = e.target.files,
    con = document.getElementById('imgPrev');
  if (!con) return;
  con.innerHTML = '';
  Array.from(files)
    .slice(0, 8)
    .forEach((f) => {
      const r = new FileReader();
      r.onload = (ev) => {
        const d = document.createElement('div');
        d.className = 'relative';
        d.innerHTML = `<img src="${ev.target.result}" class="w-16 h-16 rounded-lg object-cover"><button type="button" onclick="this.parentElement.remove()" class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta-500 text-white flex items-center justify-center text-[10px]"><i class="fas fa-times"></i></button>`;
        con.appendChild(d);
      };
      r.readAsDataURL(f);
    });
}

function filtOrd(f) {
  document
    .querySelectorAll('.ord-tab')
    .forEach((t) => t.classList.toggle('tab-active', t.dataset.ot === f));
  renderOrders(f);
}

function riderTab(t) {
  document
    .querySelectorAll('.r-tab')
    .forEach((el) => el.classList.toggle('tab-active', el.dataset.rt === t));
  document.querySelectorAll('.rc').forEach((el) => el.classList.add('hidden'));
  document.getElementById('rt-' + t).classList.remove('hidden');
}

// ═══════════════════════════════════════════════
//  MAIN RENDER
// ═══════════════════════════════════════════════
function renderPage(searchQuery) {
  const app = document.getElementById('app');
  if (dealTimer) clearInterval(dealTimer);

  if (curPage === 'home') app.innerHTML = pageHome();
  else if (curPage === 'categories') app.innerHTML = pageCategories();
  else if (curPage === 'rider') app.innerHTML = pageRider();
  else if (curPage === 'sell') app.innerHTML = pageSell();
  else if (curPage === 'orders') app.innerHTML = pageOrders();
  else if (curPage === 'profile') app.innerHTML = pageProfile();
  else if (curPage === 'search') app.innerHTML = pageSearch(searchQuery);
  else if (curPage.startsWith('cat:'))
    app.innerHTML = pageCategories(curPage.replace('cat:', ''));
  else app.innerHTML = pageHome();

  startDealTimer();
}

// ─── HOME PAGE ───
function pageHome() {
  const flash = PRODS.filter((p) => p.flash),
    trend = PRODS.slice(0, 10),
    rec = [...PRODS].sort(() => Math.random() - 0.5).slice(0, 6);
  return `
  <section class="relative overflow-hidden py-16 md:py-24 px-4">
    <div class="blob w-72 h-72 bg-caramel-500" style="top:-50px;left:-50px"></div>
    <div class="blob w-96 h-96 bg-gold-500" style="bottom:-80px;right:-80px;animation-delay:-4s"></div>
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 text-caramel-600 text-xs font-semibold mb-6"><i class="fas fa-fire"></i>Trusted by 2M+ buyers and sellers</div>
          <h1 class="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-cream-900 leading-tight mb-5">Everything you need,<br><span class="text-caramel-500">delivered fast.</span></h1>
          <p class="text-cream-800 text-lg mb-8 max-w-md leading-relaxed">Buy and sell with confidence. Our rider network gets your purchases to your door in record time.</p>
          <div class="flex flex-wrap gap-3">
            <button onclick="go('categories')" class="h-12 px-8 rounded-full bg-caramel-500 text-white font-semibold hover:bg-caramel-600 shadow-lg shadow-caramel-500/25 hover:-translate-y-0.5 transition-all">Start Shopping</button>
            <button onclick="go('sell')" class="h-12 px-8 rounded-full border-2 border-cream-400 text-cream-900 font-semibold hover:border-caramel-500 hover:text-caramel-500 hover:-translate-y-0.5 transition-all">List an Item</button>
          </div>
          <div class="flex items-center gap-6 mt-10 text-sm text-cream-800">
            <div class="flex items-center gap-2"><i class="fas fa-shield-alt text-sage-500"></i>Buyer Protection</div>
            <div class="flex items-center gap-2"><i class="fas fa-truck text-caramel-500"></i>Fast Delivery</div>
            <div class="flex items-center gap-2"><i class="fas fa-undo text-gold-500"></i>Easy Returns</div>
          </div>
        </div>
        <div class="relative hidden md:block">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4"><div class="rounded-2xl overflow-hidden shadow-xl img-zoom h-48"><img src="https://picsum.photos/seed/vh1/400/300.jpg" class="w-full h-full object-cover" alt=""></div><div class="rounded-2xl overflow-hidden shadow-xl img-zoom h-64"><img src="https://picsum.photos/seed/vh2/400/400.jpg" class="w-full h-full object-cover" alt=""></div></div>
            <div class="space-y-4 pt-8"><div class="rounded-2xl overflow-hidden shadow-xl img-zoom h-64"><img src="https://picsum.photos/seed/vh3/400/400.jpg" class="w-full h-full object-cover" alt=""></div><div class="rounded-2xl overflow-hidden shadow-xl img-zoom h-48"><img src="https://picsum.photos/seed/vh4/400/300.jpg" class="w-full h-full object-cover" alt=""></div></div>
          </div>
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-3 flex items-center gap-6 border border-cream-300">
            <div class="text-center"><div class="font-display font-extrabold text-xl text-caramel-500">50K+</div><div class="text-xs text-cream-800">Products</div></div>
            <div class="w-px h-8 bg-cream-300"></div>
            <div class="text-center"><div class="font-display font-extrabold text-xl text-caramel-500">2K+</div><div class="text-xs text-cream-800">Riders</div></div>
            <div class="w-px h-8 bg-cream-300"></div>
            <div class="text-center"><div class="font-display font-extrabold text-xl text-caramel-500">4.9</div><div class="text-xs text-cream-800">Rating</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-8 px-4 border-y border-cream-300 bg-cream-50/50"><div class="max-w-7xl mx-auto"><div class="flex gap-4 overflow-x-auto pb-2">${CATS.map((c) => `<button onclick="go('cat:${c.name.toLowerCase().replace(/ & /g, '-')}')" class="flex flex-col items-center gap-2 min-w-[80px] py-3 px-2 rounded-xl hover:bg-cream-200 transition-colors group"><div class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style="background:${c.color}15"><i class="${c.icon} text-lg" style="color:${c.color}"></i></div><span class="text-xs font-medium text-cream-900 whitespace-nowrap">${c.name}</span></button>`).join('')}</div></div></section>
  <section class="py-12 px-4"><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><div><div class="flex items-center gap-2 mb-1"><i class="fas fa-bolt text-gold-500"></i><h2 class="font-display font-extrabold text-2xl text-cream-900">Flash Deals</h2></div><p class="text-cream-800 text-sm">Ends in <span class="font-semibold text-terracotta-500" id="dealTimer" style="font-variant-numeric:tabular-nums">05:42:18</span></p></div><button onclick="go('categories')" class="text-sm font-semibold text-caramel-500 hover:text-caramel-600">View All <i class="fas fa-arrow-right ml-1"></i></button></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">${flash.map(pcard).join('')}</div></div></section>
  <section class="py-12 px-4 bg-cream-50/50"><div class="max-w-7xl mx-auto"><h2 class="font-display font-extrabold text-2xl text-cream-900 mb-8">Trending Now</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">${trend.map(pcard).join('')}</div></div></section>
  <section class="py-12 px-4"><div class="max-w-7xl mx-auto"><div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cream-900 via-cream-800 to-caramel-700 p-8 md:p-12"><div class="blob w-64 h-64 bg-caramel-500" style="top:-30px;right:-30px;opacity:.2"></div><div class="relative z-10 grid md:grid-cols-2 gap-8 items-center"><div><h2 class="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">Become a Vesioh Rider</h2><p class="text-cream-400 text-lg mb-6">Earn on your schedule. Pick up and deliver packages across the city.</p><div class="flex flex-wrap gap-4 mb-6"><div class="flex items-center gap-2 text-cream-300 text-sm"><i class="fas fa-dollar-sign text-gold-500"></i>Earn up to $25/hr</div><div class="flex items-center gap-2 text-cream-300 text-sm"><i class="fas fa-clock text-gold-500"></i>Set your hours</div><div class="flex items-center gap-2 text-cream-300 text-sm"><i class="fas fa-wallet text-gold-500"></i>Weekly payouts</div></div><button onclick="go('rider')" class="h-12 px-8 rounded-full bg-caramel-500 text-white font-semibold hover:bg-caramel-600 shadow-lg">Apply Now <i class="fas fa-arrow-right ml-2"></i></button></div><div class="hidden md:flex justify-center"><div class="rider-map w-full h-64 rounded-2xl flex items-center justify-center relative"><div class="rider-dot"></div><div class="rider-dot" style="animation-delay:-3s;background:var(--success)"></div><div class="rider-dot" style="animation-delay:-6s;background:var(--warning)"></div><div class="relative z-10 bg-white/90 rounded-xl px-6 py-4 shadow-lg text-center"><i class="fas fa-motorcycle text-3xl text-caramel-500 mb-2"></i><div class="font-semibold text-cream-900 text-sm">Active Riders</div><div class="font-display font-extrabold text-2xl text-caramel-500">2,847</div></div></div></div></div></div></div></section>
  <section class="py-12 px-4 bg-cream-50/50"><div class="max-w-7xl mx-auto"><h2 class="font-display font-extrabold text-2xl text-cream-900 mb-8">Recommended For You</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">${rec.map(pcard).join('')}</div></div></section>
  <section class="py-16 px-4"><div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">${[
    {
      i: 'fa-shield-alt',
      c: 'caramel',
      t: 'Secure Payments',
      d: '256-bit encryption',
    },
    { i: 'fa-undo', c: 'sage', t: 'Easy Returns', d: '30-day guarantee' },
    { i: 'fa-headset', c: 'gold', t: '24/7 Support', d: 'Always here' },
    {
      i: 'fa-truck',
      c: 'terracotta',
      t: 'Fast Delivery',
      d: 'Same-day option',
    },
  ]
    .map(
      (x) =>
        `<div><div class="w-14 h-14 rounded-2xl bg-${x.c}-500/10 flex items-center justify-center mx-auto mb-3"><i class="fas ${x.i} text-xl text-${x.c}-500"></i></div><div class="font-semibold text-cream-900 mb-1">${x.t}</div><div class="text-sm text-cream-800">${x.d}</div></div>`,
    )
    .join('')}</div></section>`;
}

// ─── CATEGORIES PAGE ───
function pageCategories(catFilter) {
  let selCat = catFilter || null;
  const catName = selCat
    ? selCat.replace(/-/g, ' & ').replace(/\b\w/g, (c) => c.toUpperCase())
    : null;
  const filtered = selCat
    ? PRODS.filter((p) => p.cat === selCat.split('-')[0])
    : PRODS;
  return `<section class="py-10 px-4"><div class="max-w-7xl mx-auto">
    <h1 class="font-display font-extrabold text-3xl text-cream-900 mb-2">${catName || 'All Categories'}</h1>
    <p class="text-cream-800 mb-8">${catName ? 'Browse ' + catName : 'Browse through our extensive catalog'}</p>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">${CATS.map((c) => `<button onclick="go('cat:${c.name.toLowerCase().replace(/ & /g, '-')}')" class="bg-white rounded-2xl border ${selCat === c.name.toLowerCase().replace(/ & /g, '-') ? 'border-caramel-500 shadow-lg' : 'border-cream-300'} p-5 text-center hover:border-caramel-500 hover:shadow-lg transition-all group"><div class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110" style="background:${c.color}15"><i class="${c.icon} text-xl" style="color:${c.color}"></i></div><h3 class="font-semibold text-sm text-cream-900 mb-0.5">${c.name}</h3><p class="text-xs text-cream-800">${c.count.toLocaleString()} items</p></button>`).join('')}</div>
    <h2 class="font-display font-extrabold text-2xl text-cream-900 mb-6">${catName || 'All Products'}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">${filtered.length ? filtered.map(pcard).join('') : '<div class="col-span-full text-center py-16"><i class="fas fa-search text-4xl text-cream-400 mb-3"></i><p class="text-cream-800 font-medium">No products in this category yet</p></div>'}</div>
  </div></section>`;
}

// ─── RIDER PAGE ───
function pageRider() {
  const stB = {
    in: 'bg-caramel-500/10 text-caramel-600',
    picked: 'bg-gold-500/10 text-gold-600',
    delivered: 'bg-sage-500/10 text-sage-600',
  };
  const stL = { in: 'In Transit', picked: 'Picked Up', delivered: 'Delivered' };
  const active = DELIVS.filter((d) => d.status !== 'delivered');
  const maxE = Math.max(...EARN.map((e) => e.a));
  return `<section class="py-10 px-4"><div class="max-w-7xl mx-auto">
    <div class="text-center mb-12"><h1 class="font-display font-extrabold text-3xl md:text-4xl text-cream-900 mb-3">Rider Dashboard</h1><p class="text-cream-800 text-lg max-w-lg mx-auto">Manage deliveries, track earnings, and stay connected.</p></div>
    <div class="flex gap-1 border-b border-cream-300 mb-8 overflow-x-auto">
      <button onclick="riderTab('overview')" class="r-tab tab-active px-5 py-3 text-sm font-medium text-cream-800 whitespace-nowrap" data-rt="overview">Overview</button>
      <button onclick="riderTab('deliveries')" class="r-tab px-5 py-3 text-sm font-medium text-cream-800 whitespace-nowrap" data-rt="deliveries">Active Deliveries</button>
      <button onclick="riderTab('earnings')" class="r-tab px-5 py-3 text-sm font-medium text-cream-800 whitespace-nowrap" data-rt="earnings">Earnings</button>
      <button onclick="riderTab('apply')" class="r-tab px-5 py-3 text-sm font-medium text-cream-800 whitespace-nowrap" data-rt="apply">Apply</button>
    </div>
    <div id="rt-overview" class="rc">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl p-5 border border-cream-300"><div class="text-sm text-cream-800 mb-1">Today's Deliveries</div><div class="font-display font-extrabold text-2xl text-cream-900">12</div><div class="text-xs text-sage-500 mt-1"><i class="fas fa-arrow-up"></i> +3</div></div>
        <div class="bg-white rounded-2xl p-5 border border-cream-300"><div class="text-sm text-cream-800 mb-1">Today's Earnings</div><div class="font-display font-extrabold text-2xl text-caramel-500">$187</div><div class="text-xs text-sage-500 mt-1"><i class="fas fa-arrow-up"></i> +$24</div></div>
        <div class="bg-white rounded-2xl p-5 border border-cream-300"><div class="text-sm text-cream-800 mb-1">Rating</div><div class="font-display font-extrabold text-2xl text-cream-900">4.9</div><div class="text-xs text-gold-500 mt-1"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div></div>
        <div class="bg-white rounded-2xl p-5 border border-cream-300"><div class="text-sm text-cream-800 mb-1">Weekly Total</div><div class="font-display font-extrabold text-2xl text-cream-900">$842</div><div class="text-xs text-cream-800 mt-1">5 of 7 days</div></div>
      </div>
      <div class="rider-map rounded-2xl h-72 md:h-96 mb-8 relative"><div class="rider-dot"></div><div class="rider-dot" style="animation-delay:-4s;background:var(--success)"></div><div class="rider-dot" style="animation-delay:-7s;background:var(--warning)"></div><div class="absolute top-4 left-4 bg-white/90 rounded-xl px-4 py-3 shadow-lg z-10"><div class="text-xs text-cream-800 mb-1">Active Zone</div><div class="font-semibold text-cream-900">Downtown District</div></div><div class="absolute bottom-4 right-4 bg-white/90 rounded-xl px-4 py-3 shadow-lg z-10"><div class="text-xs text-cream-800 mb-1">Pending Pickups</div><div class="font-display font-extrabold text-xl text-terracotta-500">5</div></div></div>
      <h3 class="font-display font-bold text-lg text-cream-900 mb-4">Recent Deliveries</h3>
      <div class="space-y-3">${DELIVS.map((d) => `<div class="bg-white rounded-xl border border-cream-300 p-4 flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center"><i class="fas fa-box text-caramel-500"></i></div><div><div class="font-medium text-sm text-cream-900">${d.cust}</div><div class="text-xs text-cream-800">${d.from} → ${d.to}</div></div></div><div class="text-right"><span class="px-2 py-0.5 rounded-full text-[10px] font-medium ${stB[d.status === 'picked-up' ? 'picked' : d.status]}">${stL[d.status === 'picked-up' ? 'picked' : d.status]}</span><div class="text-xs text-cream-800 mt-1">${d.time}</div></div></div>`).join('')}</div>
    </div>
    <div id="rt-deliveries" class="rc hidden">${active.length ? active.map((d) => `<div class="bg-white rounded-2xl border border-cream-300 p-5 mb-4"><div class="flex items-center justify-between mb-4"><span class="font-semibold text-cream-900">${d.id}</span><span class="px-3 py-1 rounded-full text-xs font-medium ${stB[d.status === 'picked-up' ? 'picked' : d.status]}">${stL[d.status === 'picked-up' ? 'picked' : d.status]}</span></div><div class="grid sm:grid-cols-2 gap-4 mb-4"><div class="bg-cream-50 rounded-xl p-3"><div class="text-[10px] text-cream-800 uppercase font-semibold mb-1">Pickup</div><div class="text-sm font-medium text-cream-900"><i class="fas fa-map-marker-alt text-caramel-500 mr-1"></i>${d.from}</div></div><div class="bg-cream-50 rounded-xl p-3"><div class="text-[10px] text-cream-800 uppercase font-semibold mb-1">Dropoff</div><div class="text-sm font-medium text-cream-900"><i class="fas fa-flag-checkered text-sage-500 mr-1"></i>${d.to}</div></div></div><div class="flex items-center justify-between"><div class="text-sm text-cream-800"><i class="fas fa-user mr-1"></i>${d.cust}</div><div class="flex items-center gap-3"><span class="font-display font-bold text-caramel-500">$${d.earn.toFixed(2)}</span>${d.status === 'picked-up' ? `<button onclick="toast('Delivery started!','success')" class="h-9 px-4 rounded-lg bg-sage-500 text-white text-sm font-medium hover:bg-sage-600">Start</button>` : ''}${d.status === 'in-transit' ? `<button onclick="toast('Marked as delivered!','success')" class="h-9 px-4 rounded-lg bg-sage-500 text-white text-sm font-medium hover:bg-sage-600">Complete</button>` : ''}</div></div></div>`).join('') : '<div class="text-center py-16"><i class="fas fa-check-circle text-4xl text-sage-500 mb-3"></i><p class="text-cream-800 font-medium">All caught up!</p></div>'}</div>
    <div id="rt-earnings" class="rc hidden"><div class="bg-white rounded-2xl p-6 border border-cream-300 mb-6"><h3 class="font-display font-bold text-lg text-cream-900 mb-4">This Week</h3><div class="grid grid-cols-7 gap-2">${EARN.map((e) => `<div class="text-center"><div class="h-32 flex items-end justify-center mb-2"><div class="w-full max-w-[32px] rounded-lg" style="height:${Math.max((e.a / maxE) * 100, 4)}%;background:${e.a > 0 ? 'var(--accent)' : 'var(--border)'}"></div></div><div class="text-[10px] text-cream-800 font-medium">${e.d}</div><div class="text-xs font-semibold text-cream-900">$${e.a}</div></div>`).join('')}</div></div><div class="bg-white rounded-2xl p-6 border border-cream-300"><h3 class="font-display font-bold text-lg text-cream-900 mb-4">Payout History</h3>${PAYOUTS.map((p) => `<div class="flex items-center justify-between py-3 border-b border-cream-200 last:border-0"><div><div class="font-medium text-sm text-cream-900">${p.amt}</div><div class="text-xs text-cream-800">${p.date} · ${p.m}</div></div><span class="px-3 py-1 rounded-full text-xs font-medium bg-sage-500/10 text-sage-600">${p.s}</span></div>`).join('')}</div></div>
    <div id="rt-apply" class="rc hidden"><div class="max-w-2xl mx-auto"><div class="bg-white rounded-2xl p-8 border border-cream-300"><div class="text-center mb-8"><div class="w-16 h-16 rounded-2xl bg-caramel-500/10 flex items-center justify-center mx-auto mb-4"><i class="fas fa-motorcycle text-2xl text-caramel-500"></i></div><h3 class="font-display font-bold text-xl text-cream-900 mb-2">Join the Vesioh Rider Network</h3><p class="text-cream-800 text-sm">Complete the form and we'll get you started within 48 hours.</p></div><form onsubmit="handleRiderApply(event)" class="space-y-4"><div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-cream-900 mb-1">Full Name</label><input type="text" required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="John Doe"></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Phone</label><input type="tel" required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="+1 (555) 000-0000"></div></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Email</label><input type="email" required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="you@example.com"></div><div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-cream-900 mb-1">City</label><input type="text" required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="New York"></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Vehicle</label><select required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500"><option value="">Select</option><option>Motorcycle</option><option>Bicycle</option><option>Car</option><option>Scooter</option></select></div></div><div><label class="block text-sm font-medium text-cream-900 mb-1">ID Number</label><input type="text" required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="Driver's license or national ID"></div><button type="submit" class="w-full h-12 rounded-xl bg-caramel-500 text-white font-semibold hover:bg-caramel-600 shadow-lg shadow-caramel-500/20">Submit Application</button></form></div></div></div>
  </div></section>`;
}

// ─── SELL PAGE ───
function pageSell() {
  return `<section class="py-10 px-4"><div class="max-w-3xl mx-auto">
    <h1 class="font-display font-extrabold text-3xl text-cream-900 mb-2">List an Item</h1>
    <p class="text-cream-800 mb-8">Reach millions of buyers on Vesioh</p>
    <div class="bg-white rounded-2xl p-6 md:p-8 border border-cream-300">
      <form onsubmit="handleSell(event)" class="space-y-5">
        <div><label class="block text-sm font-medium text-cream-900 mb-1">Product Title</label><input type="text" required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="What are you selling?"></div>
        <div><label class="block text-sm font-medium text-cream-900 mb-1">Description</label><textarea required rows="4" class="w-full px-4 py-3 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500 resize-none" placeholder="Describe your item..."></textarea></div>
        <div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-cream-900 mb-1">Price ($)</label><input type="number" required min="0.01" step="0.01" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="0.00"></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Category</label><select required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500"><option value="">Select</option><option>Electronics</option><option>Fashion</option><option>Home & Garden</option><option>Sports</option><option>Books</option><option>Automotive</option><option>Health & Beauty</option><option>Toys & Games</option></select></div></div>
        <div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-cream-900 mb-1">Condition</label><select required class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500"><option value="">Select</option><option>New</option><option>Like New</option><option>Good</option><option>Fair</option></select></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Quantity</label><input type="number" required min="1" value="1" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500"></div></div>
        <div><label class="block text-sm font-medium text-cream-900 mb-2">Product Images</label><div class="border-2 border-dashed border-cream-400 rounded-xl p-8 text-center hover:border-caramel-500 transition-colors cursor-pointer" onclick="document.getElementById('sellImg').click()"><input type="file" id="sellImg" multiple accept="image/*" class="hidden" onchange="imgPrev(event)"><i class="fas fa-cloud-upload-alt text-3xl text-cream-500 mb-2"></i><p class="text-sm text-cream-800">Click to upload images</p><p class="text-xs text-cream-500 mt-1">PNG, JPG up to 5MB (max 8)</p></div><div class="flex gap-2 mt-3 flex-wrap" id="imgPrev"></div></div>
        <div><label class="block text-sm font-medium text-cream-900 mb-1">Shipping</label><div class="flex flex-wrap gap-2"><label class="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cream-400 cursor-pointer hover:border-caramel-500 has-[:checked]:border-caramel-500 has-[:checked]:bg-caramel-500/5"><input type="radio" name="ship" value="rider" class="accent-caramel-500" checked><span class="text-sm"><i class="fas fa-motorcycle mr-1 text-caramel-500"></i>Vesioh Rider</span></label><label class="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cream-400 cursor-pointer hover:border-caramel-500 has-[:checked]:border-caramel-500 has-[:checked]:bg-caramel-500/5"><input type="radio" name="ship" value="pickup" class="accent-caramel-500"><span class="text-sm"><i class="fas fa-hand-holding mr-1 text-caramel-500"></i>Local Pickup</span></label><label class="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cream-400 cursor-pointer hover:border-caramel-500 has-[:checked]:border-caramel-500 has-[:checked]:bg-caramel-500/5"><input type="radio" name="ship" value="postal" class="accent-caramel-500"><span class="text-sm"><i class="fas fa-box mr-1 text-caramel-500"></i>Postal</span></label></div></div>
        <button type="submit" class="w-full h-12 rounded-xl bg-caramel-500 text-white font-semibold hover:bg-caramel-600 shadow-lg shadow-caramel-500/20">Publish Listing</button>
      </form>
    </div>
  </div></section>`;
}

// ─── ORDERS PAGE ───
function pageOrders() {
  const stC = {
    pending: 'bg-gold-500/10 text-gold-600',
    shipping: 'bg-caramel-500/10 text-caramel-600',
    delivered: 'bg-sage-500/10 text-sage-600',
  };
  const stI = {
    pending: 'fa-clock',
    shipping: 'fa-truck',
    delivered: 'fa-check-circle',
  };
  return `<section class="py-10 px-4"><div class="max-w-4xl mx-auto">
    <h1 class="font-display font-extrabold text-3xl text-cream-900 mb-8">My Orders</h1>
    <div class="flex gap-1 border-b border-cream-300 mb-6 overflow-x-auto">
      <button onclick="filtOrd('all')" class="ord-tab tab-active px-4 py-2.5 text-sm font-medium text-cream-800 whitespace-nowrap" data-ot="all">All</button>
      <button onclick="filtOrd('pending')" class="ord-tab px-4 py-2.5 text-sm font-medium text-cream-800 whitespace-nowrap" data-ot="pending">Pending</button>
      <button onclick="filtOrd('shipping')" class="ord-tab px-4 py-2.5 text-sm font-medium text-cream-800 whitespace-nowrap" data-ot="shipping">Shipping</button>
      <button onclick="filtOrd('delivered')" class="ord-tab px-4 py-2.5 text-sm font-medium text-cream-800 whitespace-nowrap" data-ot="delivered">Delivered</button>
    </div>
    <div id="ordersList" class="space-y-4">${ORDERS.map((o) => `<div class="order-item bg-white rounded-2xl border border-cream-300 p-5" data-status="${o.status}"><div class="flex items-center justify-between mb-3 flex-wrap gap-2"><div class="flex items-center gap-3"><span class="font-semibold text-cream-900 text-sm">${o.id}</span><span class="px-2.5 py-1 rounded-full text-xs font-medium ${stC[o.status]}"><i class="fas ${stI[o.status]} mr-1"></i>${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></div><span class="text-xs text-cream-800">${o.date}</span></div><div class="space-y-1.5 mb-3">${o.items.map((i) => `<div class="flex justify-between text-sm"><span class="text-cream-800">${i.t} x${i.q}</span><span class="font-medium text-cream-900">$${i.p.toFixed(2)}</span></div>`).join('')}</div><div class="flex items-center justify-between pt-3 border-t border-cream-200"><div class="flex items-center gap-1 text-xs text-cream-800"><i class="fas fa-motorcycle text-caramel-500"></i>${o.rider}</div><span class="font-display font-extrabold text-caramel-500">$${o.total.toFixed(2)}</span></div></div>`).join('')}</div>
  </div></section>`;
}
function renderOrders(f) {
  document.querySelectorAll('.order-item').forEach((el) => {
    el.style.display = f === 'all' || el.dataset.status === f ? '' : 'none';
  });
}

// ─── PROFILE PAGE ───
function pageProfile() {
  const n = user
    ? user.name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'User'
    : 'Guest';
  const em = user ? user.email || '' : 'Sign in to view your profile';
  return `<section class="py-10 px-4"><div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-2xl p-8 border border-cream-300 mb-6">
      <div class="flex items-center gap-5 mb-6"><div class="w-20 h-20 rounded-2xl bg-caramel-500 text-white flex items-center justify-center text-2xl font-display font-extrabold">${n.charAt(0).toUpperCase()}</div><div><h2 class="font-display font-bold text-xl text-cream-900">${n}</h2><p class="text-cream-800 text-sm">${em}</p><div class="flex items-center gap-1 mt-1"><i class="fas fa-star text-gold-500 text-xs"></i><span class="text-sm font-medium">4.8</span><span class="text-xs text-cream-800">(24 reviews)</span></div></div></div>
      <form onsubmit="handleProfUpdate(event)" class="space-y-4">
        <div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-cream-900 mb-1">Display Name</label><input type="text" id="profNameIn" value="${n}" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500"></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Phone</label><input type="tel" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="+1 (555) 000-0000"></div></div>
        <div><label class="block text-sm font-medium text-cream-900 mb-1">Address</label><input type="text" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40 focus:border-caramel-500" placeholder="Street, City, ZIP"></div>
        <button type="submit" class="h-11 px-8 rounded-xl bg-caramel-500 text-white font-semibold hover:bg-caramel-600">Save Changes</button>
      </form>
    </div>
    <div class="bg-white rounded-2xl p-6 border border-cream-300"><h3 class="font-display font-bold text-lg text-cream-900 mb-4">Activity Summary</h3><div class="grid grid-cols-3 gap-4 text-center"><div class="p-4 rounded-xl bg-cream-50"><div class="font-display font-extrabold text-2xl text-caramel-500">18</div><div class="text-xs text-cream-800 mt-1">Orders</div></div><div class="p-4 rounded-xl bg-cream-50"><div class="font-display font-extrabold text-2xl text-caramel-500">7</div><div class="text-xs text-cream-800 mt-1">Listed</div></div><div class="p-4 rounded-xl bg-cream-50"><div class="font-display font-extrabold text-2xl text-caramel-500">24</div><div class="text-xs text-cream-800 mt-1">Reviews</div></div></div></div>
  </div></section>`;
}

// ─── SEARCH RESULTS PAGE ───
function pageSearch(q) {
  const results = PRODS.filter(
    (p) =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.cat.includes(q.toLowerCase()) ||
      p.seller.toLowerCase().includes(q.toLowerCase()),
  );
  return `<section class="py-10 px-4"><div class="max-w-7xl mx-auto">
    <h1 class="font-display font-extrabold text-3xl text-cream-900 mb-2">Search Results</h1>
    <p class="text-cream-800 mb-8">${results.length} result${results.length !== 1 ? 's' : ''} for "<span class="font-semibold text-caramel-500">${q}</span>"</p>
    ${results.length ? `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">${results.map(pcard).join('')}</div>` : '<div class="text-center py-20"><i class="fas fa-search text-5xl text-cream-400 mb-4"></i><p class="text-cream-800 font-medium text-lg">No products found</p><p class="text-cream-500 mt-2">Try different keywords or browse categories</p><button onclick="go(\'categories\')" class="mt-6 h-11 px-6 rounded-full bg-caramel-500 text-white font-semibold hover:bg-caramel-600">Browse Categories</button></div>'}
  </div></section>`;
}
