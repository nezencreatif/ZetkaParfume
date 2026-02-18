// --- DATABASE PARFUM ---
const products = [
    { id: 'm1', name: "ZETKA ALPHA", segment: "man", desc: "Dominasi dalam botol. Oud & Leather.", stats: { longevity: 90, sillage: 80, unique: 70 }, zkReason: "Aura Alpha. Base notes Leather sangat dominan.", tags: ["woody", "leather"] },
    { id: 'm2', name: "BLUE HORIZON", segment: "man", desc: "Kesegaran laut & Citrus.", stats: { longevity: 60, sillage: 70, unique: 50 }, zkReason: "Mood booster instan untuk produktivitas.", tags: ["fresh", "citrus"] },
    { id: 'w1', name: "VELVET ROSE", segment: "woman", desc: "Mawar hitam & Vanilla.", stats: { longevity: 85, sillage: 90, unique: 80 }, zkReason: "Kombinasi Seductive. Sangat memikat.", tags: ["floral", "sweet"] },
    { id: 'w2', name: "PURE BLANC", segment: "woman", desc: "Clean Laundry & Musk.", stats: { longevity: 50, sillage: 40, unique: 60 }, zkReason: "Kesan bersih dan profesional.", tags: ["fresh", "clean"] },
    { id: 's1', name: "NEON DUST", segment: "street", desc: "Aspal basah & Mint.", stats: { longevity: 70, sillage: 80, unique: 95 }, zkReason: "Futuristik & Niche.", tags: ["edgy", "metallic"] },
    { id: 's2', name: "GLITCH POP", segment: "street", desc: "Permen karet & Asap.", stats: { longevity: 80, sillage: 85, unique: 90 }, zkReason: "Playful tapi berbahaya.", tags: ["sweet", "party"] }
];

const segIndex = { 'man': 0, 'woman': 1, 'street': 2 };

// --- LOGIC UTAMA ---
const app = {
    currentSeg: 'man',
    isAnimating: false,

    init: () => {
        // Cek Tema Tersimpan
        if(localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        }
        
        // Hapus Loading Screen (Delay dikit biar smooth)
        setTimeout(() => document.getElementById('loader').style.display = 'none', 1500);
        
        // Render Awal
        app.renderContent('man', false);
    },

    setSegment: (newSeg) => {
        if (app.currentSeg === newSeg || app.isAnimating) return;
        app.isAnimating = true;

        // Tentukan Arah Flow (Kiri/Kanan)
        const direction = segIndex[newSeg] > segIndex[app.currentSeg] ? 'next' : 'prev';
        const wrapper = document.getElementById('content-wrapper');

        // 1. Slide Keluar
        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        wrapper.classList.add(outClass);

        // 2. Ganti Konten Pas Animasi Keluar Selesai
        setTimeout(() => {
            app.currentSeg = newSeg;
            
            // Update Tombol Navigasi
            document.querySelectorAll('.segment-control button').forEach(b => b.classList.remove('active'));
            document.getElementById(`btn-${newSeg}`).classList.add('active');
            
            // Update Tema Warna
            const isLight = document.body.classList.contains('light-theme');
            document.body.className = `theme-${newSeg} ${isLight ? 'light-theme' : ''}`;

            // Hapus Class Animasi Lama
            wrapper.classList.remove(outClass);
            
            // Render Konten Baru
            app.renderContent(newSeg, true);

            // 3. Slide Masuk
            const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            wrapper.classList.add(inClass);

            // Bersihkan Class setelah selesai
            setTimeout(() => {
                wrapper.classList.remove(inClass);
                app.isAnimating = false;
            }, 500);

        }, 450); // Timing disesuaikan dengan CSS (0.5s)
    },

    renderContent: (seg, animateItems) => {
        const textMap = {
            man: { t: "PROFESSIONAL<br>COLLECTION", d: "Curated for the modern gentleman." },
            woman: { t: "ELEGANCE<br>REDEFINED", d: "Scent that whispers class." },
            street: { t: "URBAN<br>GLITCH_MODE", d: "Break the rules. Smell distinct." }
        };
        document.getElementById('hero-title').innerHTML = textMap[seg].t;
        document.getElementById('hero-desc').innerText = textMap[seg].d;

        const grid = document.getElementById('grid-container');
        grid.innerHTML = '';
        
        const filtered = products.filter(p => p.segment === seg);
        filtered.forEach((p, idx) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Stagger Effect (Muncul satu-satu)
            if(animateItems) card.style.animationDelay = `${idx * 0.1}s`; 
            if(animateItems) card.classList.add('stagger-item');
            
            // Placeholder Gradient kalau gambar belum ada
            card.innerHTML = `
                <div class="card-img" style="background-image: url('assets/${p.id}.jpg'), linear-gradient(45deg, #1a1a1a, #333)"></div>
                <div class="card-meta"><h3>${p.name}</h3><p>${p.desc}</p></div>
            `;
            card.onclick = () => ui.openModal(p);
            grid.appendChild(card);
        });

        zk.resetChat();
    }
};

// --- UI CONTROLLER ---
const ui = {
    toggleTheme: () => {
        const body = document.body;
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        const icon = document.getElementById('theme-icon');
        
        if(isLight) {
            icon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'dark');
        }
        body.className = `theme-${app.currentSeg} ${isLight ? 'light-theme' : ''}`;
    },
    toggleMenu: () => document.getElementById('main-menu').classList.toggle('active'),
    openModal: (p) => {
        document.getElementById('modal-name').innerText = p.name;
        document.getElementById('modal-desc').innerText = p.desc;
        document.getElementById('modal-seg-tag').innerText = p.segment.toUpperCase();
        document.getElementById('modal-zk-note').innerText = p.zkReason;
        document.getElementById('modal-img-placeholder').style.backgroundImage = `url('assets/${p.id}.jpg'), linear-gradient(45deg, #1a1a1a, #333)`;
        
        ['long','sillage','unique'].forEach(k => document.getElementById(`bar-${k}`).style.width = '0%');
        document.getElementById('product-modal').style.display = 'flex';
        
        // Animasi Bar
        setTimeout(() => {
            document.getElementById('bar-long').style.width = p.stats.longevity + '%';
            document.getElementById('bar-sillage').style.width = p.stats.sillage + '%';
            document.getElementById('bar-unique').style.width = p.stats.unique + '%';
        }, 100);
    },
    closeModal: () => document.getElementById('product-modal').style.display = 'none'
};

// --- MR. ZK LOGIC ---
const zk = {
    isOpen: false,
    toggle: () => {
        zk.isOpen = !zk.isOpen;
        const win = document.getElementById('zk-interface');
        if(zk.isOpen) {
            win.style.display = 'flex';
            win.classList.add('active');
        } else {
            win.style.display = 'none';
            win.classList.remove('active');
        }
    },
    resetChat: () => {
        const log = document.getElementById('zk-chat-log');
        if(log) {
            log.innerHTML = '';
            const intro = app.currentSeg === 'street' ? "Yo. Street mode on. Cari yang aneh atau aman?" : 
                          app.currentSeg === 'man' ? "Hello Sir. Butuh saran untuk Meeting atau Date?" :
                          "Hello Miss. Mencari wangi Elegant atau Sweet?";
            zk.addBubble(intro, 'bot');
        }
    },
    addBubble: (text, type) => {
        const log = document.getElementById('zk-chat-log');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.style.padding = "8px 12px"; div.style.marginBottom="10px"; div.style.borderRadius="8px";
        div.style.background = type === 'bot' ? "#333" : "var(--accent)";
        div.style.color = type === 'bot' ? "#fff" : "#000";
        div.style.alignSelf = type === 'bot' ? "flex-start" : "flex-end";
        div.innerHTML = text;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    },
    handleEnter: (e) => { if(e.key === 'Enter') zk.sendMessage(); },
    sendMessage: () => {
        const input = document.getElementById('user-input');
        if(!input.value) return;
        zk.addBubble(input.value, 'user');
        
        // Simulasi AI Mikir
        setTimeout(() => {
             zk.addBubble(`Rekomendasi ZK: <b>ZETKA ALPHA</b>.<br>Cocok karena anda mencari vibe "${input.value}".`, 'bot');
        }, 1000);
        
        input.value = '';
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
