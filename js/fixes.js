/* ═══════════════════════════════════════════════
   FIX 1: Services section on Home page
   FIX 2: Role switch accessible from nav dropdown
   ═══════════════════════════════════════════════ */

/* ─── Add services section to home page ─── */
const _origHome = pageHome;
pageHome = function() {
  return _origHome.call(this) + '\n<section class="py-12 px-4 bg-cream-50/50"><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><div><div class="flex items-center gap-2 mb-1"><i class="fas fa-concierge-bell text-caramel-500"></i><h2 class="font-display font-extrabold text-2xl text-cream-900">Book a Service</h2></div><p class="text-cream-800 text-sm">Trusted professionals, delivered to your door</p></div><button onclick="go(\'book-service\')" class="text-sm font-semibold text-caramel-500 hover:text-caramel-600">View All <i class="fas fa-arrow-right ml-1"></i></button></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">' + SERVICES.slice(0, 3).map(function(s){return '<div class="bg-white rounded-2xl border border-cream-300 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="go(\'book-service\')"><div class="img-zoom h-36 bg-cream-100"><img src="'+s.img+'" class="w-full h-full object-cover" alt=""></div><div class="p-5"><span class="text-[10px] font-medium uppercase text-cream-800">'+s.cat+'</span><h3 class="font-display font-bold text-lg text-cream-900 mt-1 mb-2">'+s.title+'</h3><div class="flex items-center gap-2 mb-3"><i class="fas fa-star text-gold-500 text-xs"></i><span class="text-sm font-medium">'+s.rating+'</span><span class="text-xs text-cream-800">('+s.bookings+' bookings)</span></div><div class="flex items-center justify-between"><span class="font-display font-extrabold text-xl text-caramel-500">$'+s.price.toFixed(2)+'</span><button onclick="event.stopPropagation();openChat(\''+s.title+' Provider\')" class="w-10 h-10 rounded-xl border border-cream-400 flex items-center justify-center hover:bg-cream-100" title="Chat"><i class="fas fa-comment-dots text-caramel-500 text-sm"></i></button></div></div></div>';}).join('') + '</div></div></section>';
};

/* ─── Add services section to categories page ─── */
const _origCat = pageCategories;
pageCategories = function(catFilter) {
  return _origCat.call(this, catFilter) + '\n<section class="py-12 px-4 mt-4"><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><div><div class="flex items-center gap-2 mb-1"><i class="fas fa-concierge-bell text-caramel-500"></i><h2 class="font-display font-extrabold text-2xl text-cream-900">Popular Services</h2></div><p class="text-cream-800 text-sm">Hire trusted professionals</p></div><button onclick="go(\'book-service\')" class="text-sm font-semibold text-caramel-500 hover:text-caramel-600">View All <i class="fas fa-arrow-right ml-1"></i></button></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">' + SERVICES.map(function(s){return '<div class="bg-white rounded-2xl border border-cream-300 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="go(\'book-service\')"><div class="img-zoom h-36 bg-cream-100"><img src="'+s.img+'" class="w-full h-full object-cover" alt=""></div><div class="p-5"><span class="text-[10px] font-medium uppercase text-cream-800">'+s.cat+'</span><h3 class="font-display font-bold text-lg text-cream-900 mt-1 mb-2">'+s.title+'</h3><div class="flex items-center gap-2 mb-3"><i class="fas fa-star text-gold-500 text-xs"></i><span class="text-sm font-medium">'+s.rating+'</span><span class="text-xs text-cream-800">('+s.bookings+' bookings)</span></div><div class="flex items-center justify-between"><span class="font-display font-extrabold text-xl text-caramel-500">$'+s.price.toFixed(2)+'</span><button onclick="event.stopPropagation();openChat(\''+s.title+' Provider\')" class="w-10 h-10 rounded-xl border border-cream-400 flex items-center justify-center hover:bg-cream-100" title="Chat"><i class="fas fa-comment-dots text-caramel-500 text-sm"></i></button></div></div></div>';}).join('') + '</div></div></section>';
};

/* ─── Override profile dropdown to add clear Switch Role ─── */
const _origUpdateDrop = updateProfileDropdown;
updateProfileDropdown = function(r) {
  _origUpdateDrop.call(this, r);

  var drop = document.getElementById('profDrop');
  if (!drop || !user) return;

  /* Build switch role section */
  var switchHTML = '';
  if (r !== ROLES.ADMIN) {
    switchHTML = '<div class="px-4 py-3 border-b border-cream-300"><div class="text-[10px] uppercase font-bold text-cream-500 mb-2 tracking-wider">Switch Role</div><div class="grid grid-cols-4 gap-1.5">';
    SWITCHABLE.forEach(function(k) {
      var active = r === k;
      switchHTML += '<button onclick="changeRole(\'' + k + '\');document.getElementById(\'profDrop\').classList.add(\'hidden\')" class="p-2 rounded-lg text-center transition-all ' + (active ? '' : 'hover:bg-cream-100') + '" style="' + (active ? 'background:' + ROLE_COLORS[k] + '15;border:1.5px solid ' + ROLE_COLORS[k] : 'border:1.5px solid #E8D5C4') + '"><i class="fas ' + ROLE_ICONS[k] + ' text-sm mb-0.5" style="color:' + ROLE_COLORS[k] + '"></i><div class="text-[9px] font-semibold" style="color:' + (active ? ROLE_COLORS[k] : '#7A6558') + '">' + ROLE_LABELS[k] + '</div>' + (active ? '<div class="w-1.5 h-1.5 rounded-full mx-auto mt-0.5" style="background:' + ROLE_COLORS[k] + '"></div>' : '') + '</button>';
    });
    switchHTML += '</div></div>';
  }

  /* Get current dropdown inner HTML and insert switch at top */
  var currentHTML = drop.innerHTML;
  /* Remove old switch if it exists */
  currentHTML = currentHTML.replace(/<div class="px-4 py-3 border-b border-cream-300">[\s\S]*?<\/div>\s*<hr class="my-1/, '<hr class="my-1');
  currentHTML = currentHTML.replace(/<div class="px-4 py-3 border-b border-cream-300">[\s\S]*?<\/div>\s*<a href="#"/, '<a href="#');

  if (switchHTML) {
    drop.innerHTML = switchHTML + currentHTML;
  }
};

/* ─── Make profile page role switch more prominent ─── */
const _origProfile = pageProfile;
pageProfile = function() {
  var r = getUserRole() || ROLES.BUYER;
  var n = user ? user.name || user.email ? user.email.split('@')[0] : 'User' : 'Guest';
  var em = user ? user.email || '' : '';

  var switchSection = '';
  if (r !== ROLES.ADMIN) {
    switchSection = '<div class="mb-6 p-5 rounded-2xl border-2 border-dashed border-cream-300 bg-cream-50"><div class="flex items-center justify-between mb-3"><h3 class="font-display font-bold text-base text-cream-900"><i class="fas fa-exchange-alt mr-2 text-caramel-500"></i>Switch Your Role</h3><span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style="background:' + ROLE_COLORS[r] + '15;color:' + ROLE_COLORS[r] + '"><i class="fas ' + ROLE_ICONS[r] + ' mr-1"></i>Current: ' + ROLE_LABELS[r] + '</span></div><div class="grid grid-cols-4 gap-3">';
    SWITCHABLE.forEach(function(k) {
      var active = r === k;
      switchSection += '<button onclick="changeRole(\'' + k + '\')" class="p-4 rounded-xl border-2 transition-all text-center ' + (active ? 'shadow-md' : 'hover:shadow-sm') + '" style="' + (active ? 'border-color:' + ROLE_COLORS[k] + ';background:' + ROLE_COLORS[k] + '10' : 'border-color:#E8D5C4') + '"><i class="fas ' + ROLE_ICONS[k] + ' text-xl mb-2" style="color:' + ROLE_COLORS[k] + '"></i><div class="text-xs font-bold" style="color:' + (active ? ROLE_COLORS[k] : '#2C1810') + '">' + ROLE_LABELS[k] + '</div>' + (active ? '<div class="text-[9px] font-medium mt-1" style="color:' + ROLE_COLORS[k] + '">Active</div>' : '') + '</button>';
    });
    switchSection += '</div><p class="text-xs text-cream-500 mt-3 text-center">' + ROLE_DESC[r] + '</p></div>';
  }

  return '<section class="py-10 px-4"><div class="max-w-3xl mx-auto"><div class="bg-white rounded-2xl p-8 border border-cream-300 mb-6"><div class="flex items-center gap-5 mb-6"><div class="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-display font-extrabold text-white" style="background:' + ROLE_COLORS[r] + '">' + n.charAt(0).toUpperCase() + '</div><div><h2 class="font-display font-bold text-xl text-cream-900">' + n + '</h2><p class="text-cream-800 text-sm">' + em + '</p><span class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background:' + ROLE_COLORS[r] + '15;color:' + ROLE_COLORS[r] + '"><i class="fas ' + ROLE_ICONS[r] + '"></i> ' + ROLE_LABELS[r] + '</span></div></div>' + switchSection + '<form onsubmit="handleProfUpdate(event)" class="space-y-4"><div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-cream-900 mb-1">Display Name</label><input type="text" id="profNameIn" value="' + n + '" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40"></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Phone</label><input type="tel" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40" placeholder="+1 (555) 000-0000"></div></div><div><label class="block text-sm font-medium text-cream-900 mb-1">Address</label><input type="text" class="w-full h-11 px-4 rounded-xl border border-cream-400 bg-cream-50 text-cream-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500/40" placeholder="Street, City, ZIP"></div><button type="submit" class="h-11 px-8 rounded-xl bg-caramel-500 text-white font-semibold hover:bg-caramel-600">Save Changes</button></form></div><div class="bg-white rounded-2xl p-6 border border-cream-300"><h3 class="font-display font-bold text-lg text-cream-900 mb-4">Your Permissions</h3><div class="space-y-2">' + [{l:'Browse & Search',roles:['buyer','seller','rider','provider','admin']},{l:'Cart & Checkout',roles:['buyer','seller','admin']},{l:'Book Services',roles:['buyer','admin']},{l:'Chat with Others',roles:['buyer','seller','rider','provider','admin']},{l:'Write Reviews',roles:['buyer','seller','admin']},{l:'List Products',roles:['seller','admin']},{l:'Seller Dashboard',roles:['seller','admin']},{l:'Offer Services',roles:['provider','admin']},{l:'Service Dashboard',roles:['provider','admin']},{l:'Rider Dashboard',roles:['rider','admin']},{l:'Manage Users',roles:['admin']},{l:'Verify Accounts',roles:['admin']}].map(function(p){return '<div class="flex items-center justify-between p-3 rounded-lg '+(p.roles.includes(r)?'bg-sage-500/5':'bg-cream-50')+'"><span class="text-sm '+(p.roles.includes(r)?'text-cream-900 font-medium':'text-cream-400')+'">'+p.l+'</span><i class="fas '+(p.roles.includes(r)?'fa-check-circle text-sage-500':'fa-lock text-cream-300')+'"></i></div>';}).join('') + '</div></div></section>';
};
