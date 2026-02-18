// --- DATABASE PARFUM (DATA REAL) ---
const products = [
    { id: 'm1', name: "ZETKA ALPHA", segment: "man", desc: "Dominasi dalam botol. Oud & Leather.", stats: { longevity: 90, sillage: 80, unique: 70 }, zkReason: "Aura Alpha. Base notes Leather sangat dominan, cocok untuk memimpin meeting.", tags: ["woody", "leather", "kuat", "meeting", "bos", "alpha"] },
    { id: 'm2', name: "BLUE HORIZON", segment: "man", desc: "Kesegaran laut & Citrus.", stats: { longevity: 60, sillage: 70, unique: 50 }, zkReason: "Mood booster instan. Citrus meningkatkan fokus kerja.", tags: ["fresh", "citrus", "laut", "siang", "kantor", "gym"] },
    { id: 'w1', name: "VELVET ROSE", segment: "woman", desc: "Mawar hitam & Vanilla.", stats: { longevity: 85, sillage: 90, unique: 80 }, zkReason: "Kombinasi Seductive. Vanilla adalah aphrodisiac alami.", tags: ["floral", "sweet", "malam", "date", "seksi", "mawar"] },
    { id: 'w2', name: "PURE BLANC", segment: "woman", desc: "Clean Laundry & Musk.", stats: { longevity: 50, sillage: 40, unique: 60 }, zkReason: "Kesan bersih dan profesional tanpa berlebihan.", tags: ["fresh", "clean", "musk", "siang", "kuliah", "lembut"] },
    { id: 's1', name: "NEON DUST", segment: "street", desc: "Aspal basah & Mint.", stats: { longevity: 70, sillage: 80, unique: 95 }, zkReason: "Futuristik & Niche. Aroma 'Synthetic' yang sangat artsy.", tags: ["edgy", "metallic", "unik", "aneh", "mint", "dingin"] },
    { id: 's2', name: "GLITCH POP", segment: "street", desc: "Permen karet & Asap.", stats: { longevity: 80, sillage: 85, unique: 90 }, zkReason: "Playful tapi berbahaya. Sweet tobacco vibe.", tags: ["sweet", "party", "manis", "rokok", "asap", "nakal"] }
];

const segIndex = { 'man': 0, 'woman': 1, 'street': 2 };

// --- LOGIC UTAMA (APP) ---
const app = {
    currentSeg: 'man',
    isAnimating: false,

    init: () => {
        // Cek Tema Tersimpan
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        }
        
        // Update Logo ZK Sesuai Tema Awal
        zk.updateLogo(savedTheme === 'light');

        // Hapus Loading Screen
        setTimeout(() => document.getElementById('loader').style.display = 'none', 1500);
        
        // Render Awal
        app.renderContent('man', false);
    },

    setSegment: (newSeg) => {
        if (app.currentSeg === newSeg || app.isAnimating) return;
        app.isAnimating = true;

        const direction = segIndex[newSeg] > segIndex[app.currentSeg] ? 'next' : 'prev';
        const wrapper = document.getElementById('content-wrapper');

        // Animasi Keluar
        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        wrapper.classList.add(outClass);

        setTimeout(() => {
            app.currentSeg = newSeg;
            
            // Update Navigasi & Tema
            document.querySelectorAll('.segment-control button').forEach(b => b.classList.remove('active'));
            document.getElementById(`btn-${newSeg}`).classList.add('active');
            
            const isLight = document.body.classList.contains('light-theme');
            document.body.className = `theme-${newSeg} ${isLight ? 'light-theme' : ''}`;

            wrapper.classList.remove(outClass);
            app.renderContent(newSeg, true);

            // Animasi Masuk
            const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            wrapper.classList.add(inClass);

            setTimeout(() => {
                wrapper.classList.remove(inClass);
                app.isAnimating = false;
            }, 500);

        }, 450);
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
            if(animateItems) card.style.animationDelay = `${idx * 0.1}s`; 
            if(animateItems) card.classList.add('stagger-item');
            
            card.innerHTML = `
                <div class="card-img" style="background-image: url('assets/${p.id}.jpg'), linear-gradient(45deg, #1a1a1a, #333)"></div>
                <div class="card-meta"><h3>${p.name}</h3><p>${p.desc}</p></div>
            `;
            card.onclick = () => ui.openModal(p);
            grid.appendChild(card);
        });

        zk.resetChat(true); // Reset chat saat ganti segmen (True = Silent reset)
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
        
        // Panggil Update Logo ZK
        zk.updateLogo(isLight);
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
        
        setTimeout(() => {
            document.getElementById('bar-long').style.width = p.stats.longevity + '%';
            document.getElementById('bar-sillage').style.width = p.stats.sillage + '%';
            document.getElementById('bar-unique').style.width = p.stats.unique + '%';
        }, 100);
    },
    
    closeModal: () => document.getElementById('product-modal').style.display = 'none'
};

// --- MR. ZK INTELLIGENCE (AI LOGIC) ---
const zk = {
    isOpen: false,
    
    // Logic Ganti Gambar Logo
    updateLogo: (isLight) => {
        const logoImg = document.getElementById('zk-trigger-img');
        if(logoImg) {
            // Kalau Light Mode -> Pake Logo Hitam (zk-logo-light.png)
            // Kalau Dark Mode -> Pake Logo Putih (zk-logo-dark.png)
            logoImg.src = isLight ? 'assets/zk-logo-light.png' : 'assets/zk-logo-dark.png';
        }
    },

    toggle: () => {
        zk.isOpen = !zk.isOpen;
        const win = document.getElementById('zk-interface');
        if(zk.isOpen) {
            win.style.display = 'flex';
            win.classList.add('active');
            // Fokus ke input pas dibuka
            setTimeout(() => document.getElementById('user-input').focus(), 100);
        } else {
            win.style.display = 'none';
            win.classList.remove('active');
        }
    },

    resetChat: (silent = false) => {
        const log = document.getElementById('zk-chat-log');
        if(!log) return;
        
        if(!silent) log.innerHTML = '';
        
        // Intro beda tiap segmen
        let intro = "";
        if (app.currentSeg === 'street') intro = "Yo. ZK di sini. Mode Street aktif. Cari wangi yang 'nendang' atau 'aneh'?";
        else if (app.currentSeg === 'man') intro = "Halo Sir. ZK siap membantu. Butuh saran untuk Meeting, Date, atau Daily?";
        else intro = "Halo Miss. Mencari sesuatu yang Elegant atau Sweet hari ini?";

        // Cuma nambah intro kalau chat kosong atau reset paksa
        if(log.innerHTML === "") {
            zk.addBubble(intro, 'bot');
        }
    },

    addBubble: (text, type) => {
        const log = document.getElementById('zk-chat-log');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.style.padding = "10px 14px"; 
        div.style.marginBottom = "10px"; 
        div.style.borderRadius = "12px";
        div.style.fontSize = "0.9rem";
        div.style.lineHeight = "1.4";
        
        // Styling Bubble
        if (type === 'bot') {
            div.style.background = "#333";
            div.style.color = "#fff";
            div.style.alignSelf = "flex-start";
            div.style.borderBottomLeftRadius = "2px";
        } else {
            div.style.background = "var(--accent)"; // Ikut warna tema
            div.style.color = "#000"; // Teks user hitam biar kontras
            div.style.fontWeight = "500";
            div.style.alignSelf = "flex-end";
            div.style.borderBottomRightRadius = "2px";
        }
        
        div.innerHTML = text;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    },

    handleEnter: (e) => { if(e.key === 'Enter') zk.sendMessage(); },

    sendMessage: () => {
        const input = document.getElementById('user-input');
        const text = input.value.trim();
        if(!text) return;

        // 1. Tampilkan Chat User
        zk.addBubble(text, 'user');
        input.value = '';

        // 2. Simulasi "Thinking"
        const thinkingId = setTimeout(() => {
            // Hapus timer kalau perlu (disini kita biarkan delay natural)
        }, 0);

        // 3. PROSES AI (Logic Pencocokan)
        setTimeout(() => {
            const reply = zk.processQuery(text.toLowerCase());
            zk.addBubble(reply, 'bot');
        }, 800 + Math.random() * 500); // Delay acak biar kayak manusia (0.8 - 1.3 detik)
    },

    // OTAK AI: Mencocokkan input user dengan database
    processQuery: (query) => {
        // A. Cek Sapaan / Basa-basi
        if (query.includes('halo') || query.includes('hi') || query.includes('pagi') || query.includes('malam')) {
            return "Halo juga! Ada yang bisa saya bantu carikan hari ini?";
        }
        if (query.includes('siapa') || query.includes('zk')) {
            return "Saya ZK, asisten AI kurasi parfum pribadi Anda. Saya menganalisa notes aroma untuk menemukan yang paling cocok dengan karakter Anda.";
        }

        // B. Filter Produk Berdasarkan Segmen Aktif
        const activeProducts = products.filter(p => p.segment === app.currentSeg);
        
        // C. Cari Kecocokan (Scoring System)
        let bestMatch = null;
        let highestScore = 0;

        activeProducts.forEach(p => {
            let score = 0;
            // Cek Tags
            p.tags.forEach(tag => {
                if (query.includes(tag)) score += 10;
            });
            // Cek Deskripsi
            if (p.desc.toLowerCase().includes(query)) score += 5;
            // Cek Nama
            if (p.name.toLowerCase().includes(query)) score += 20;

            if (score > highestScore) {
                highestScore = score;
                bestMatch = p;
            }
        });

        // D. Buat Jawaban
        if (highestScore > 0 && bestMatch) {
            // Jawaban "Nge-follow" omongan user
            const reasons = [
                `Karena Anda mencari sesuatu yang "${query}", saya sangat menyarankan <b>${bestMatch.name}</b>.`,
                `Untuk preferensi "${query}", <b>${bestMatch.name}</b> adalah pilihan terbaik di koleksi ini.`,
                `Analisa saya menunjukkan <b>${bestMatch.name}</b> cocok 95% dengan request "${query}" Anda.`
            ];
            const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
            
            return `${randomReason}<br><br><small>💡 ${bestMatch.zkReason}</small>`;
        } else {
            // Fallback (Kalau gak nemu)
            return `Hmm, saya belum menemukan parfum dengan karakteristik "${query}" di koleksi ${app.currentSeg.toUpperCase()}.<br>Coba kata kunci lain seperti: <i>${activeProducts[0].tags.slice(0,3).join(", ")}</i>.`;
        }
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
