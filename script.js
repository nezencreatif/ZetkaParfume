// --- 1. DATABASE PARFUM (DITAMBAH TAGS GAUL & INGGRIS) ---
const products = [
    // MAN
    { 
        id: 'm1', name: "ZETKA ALPHA", segment: "man", 
        desc: "Dominasi dalam botol. Oud & Leather.", 
        stats: { longevity: 90, sillage: 80, unique: 70 }, 
        zkReason: "Aura Alpha banget. Base notes Leather-nya bikin lu kelihatan dominan pas meeting atau mimpin tim.", 
        tags: ["woody", "leather", "kuat", "strong", "meeting", "bos", "alpha", "kantor", "office", "malam", "night", "maskulin", "laki", "cowo"] 
    },
    { 
        id: 'm2', name: "BLUE HORIZON", segment: "man", 
        desc: "Kesegaran laut & Citrus.", 
        stats: { longevity: 60, sillage: 70, unique: 50 }, 
        zkReason: "Mood booster instan. Wangi Citrus-nya bikin fokus kerja naik, seger kayak abis mandi.", 
        tags: ["fresh", "citrus", "laut", "ocean", "siang", "day", "kantor", "work", "gym", "sport", "segar", "cool"] 
    },
    // WOMAN
    { 
        id: 'w1', name: "VELVET ROSE", segment: "woman", 
        desc: "Mawar hitam & Vanilla.", 
        stats: { longevity: 85, sillage: 90, unique: 80 }, 
        zkReason: "Kombinasi Seductive. Vanilla-nya itu aphrodisiac alami, bikin cowok nengok dua kali.", 
        tags: ["floral", "sweet", "manis", "malam", "night", "date", "kencan", "seksi", "sexy", "mawar", "rose", "cewe", "wanita"] 
    },
    { 
        id: 'w2', name: "PURE BLANC", segment: "woman", 
        desc: "Clean Laundry & Musk.", 
        stats: { longevity: 50, sillage: 40, unique: 60 }, 
        zkReason: "Definisi 'Clean Girl Aesthetic'. Wangi sopan, bersih, dan profesional buat harian.", 
        tags: ["fresh", "clean", "musk", "siang", "day", "kuliah", "college", "lembut", "soft", "sopan"] 
    },
    // STREET
    { 
        id: 's1', name: "NEON DUST", segment: "street", 
        desc: "Aspal basah & Mint.", 
        stats: { longevity: 70, sillage: 80, unique: 95 }, 
        zkReason: "Futuristik & Niche abis. Wangi 'Synthetic' yang artsy, bukan buat orang biasa.", 
        tags: ["edgy", "metallic", "unik", "unique", "aneh", "weird", "mint", "dingin", "cool", "art", "skena", "nongkrong"] 
    },
    { 
        id: 's2', name: "GLITCH POP", segment: "street", 
        desc: "Permen karet & Asap.", 
        stats: { longevity: 80, sillage: 85, unique: 90 }, 
        zkReason: "Playful tapi berbahaya. Vibe-nya kayak 'Sweet Tobacco', manis tapi rebel.", 
        tags: ["sweet", "party", "manis", "rokok", "tobacco", "asap", "smoke", "nakal", "rebel", "club", "malam"] 
    }
];

const segIndex = { 'man': 0, 'woman': 1, 'street': 2 };

// --- 2. KAMUS GAUL & TRANSLATOR (AI DICTIONARY) ---
const slangDict = {
    "gw": "saya", "aku": "saya", "gue": "saya", "gua": "saya", "i": "saya",
    "lo": "anda", "lu": "anda", "u": "anda", "you": "anda",
    "cowo": "man", "pria": "man", "laki": "man", "boy": "man",
    "cewe": "woman", "wanita": "woman", "girl": "woman", "ladies": "woman",
    "wangi": "aroma", "bau": "aroma", "scent": "aroma", "smell": "aroma",
    "keren": "cool", "kece": "cool",
    "nongkrong": "party", "hangout": "party", "main": "daily",
    "kerja": "office", "gawe": "office", "work": "office",
    "kuliah": "daily", "kampus": "daily",
    "pacaran": "date", "kencan": "date", "jalan": "date"
};

// --- 3. APP LOGIC ---
const app = {
    currentSeg: 'man',
    isAnimating: false,

    init: () => {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        }
        zk.updateLogo(savedTheme === 'light');
        setTimeout(() => document.getElementById('loader').style.display = 'none', 1500);
        app.renderContent('man', false);
    },

    setSegment: (newSeg) => {
        if (app.currentSeg === newSeg || app.isAnimating) return;
        app.isAnimating = true;

        const direction = segIndex[newSeg] > segIndex[app.currentSeg] ? 'next' : 'prev';
        const wrapper = document.getElementById('content-wrapper');

        const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
        wrapper.classList.add(outClass);

        setTimeout(() => {
            app.currentSeg = newSeg;
            document.querySelectorAll('.segment-control button').forEach(b => b.classList.remove('active'));
            document.getElementById(`btn-${newSeg}`).classList.add('active');
            
            const isLight = document.body.classList.contains('light-theme');
            document.body.className = `theme-${newSeg} ${isLight ? 'light-theme' : ''}`;

            wrapper.classList.remove(outClass);
            app.renderContent(newSeg, true);

            const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
            wrapper.classList.add(inClass);
            setTimeout(() => { wrapper.classList.remove(inClass); app.isAnimating = false; }, 500);
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
            
            // PAKSA PAKAI GAMBAR BOTOL HITAM UNTUK SEMUA PRODUK
            card.innerHTML = `
                <div class="card-img" style="background-image: url('assets/parfum-sample.jpg'), linear-gradient(45deg, #1a1a1a, #333)"></div>
                <div class="card-meta"><h3>${p.name}</h3><p>${p.desc}</p></div>
            `;
            card.onclick = () => ui.openModal(p);
            grid.appendChild(card);
        });
        zk.resetChat(true);
    }
};

// --- 4. UI CONTROLLER ---
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
        
        // Fix warna segmen saat ganti tema
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
        
        // Modal Gambar Botol Hitam
        document.getElementById('modal-img-placeholder').style.backgroundImage = `url('assets/parfum-sample.jpg'), linear-gradient(45deg, #1a1a1a, #333)`;
        
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

// --- 5. MR. ZK INTELLIGENCE (UPDATED AI LOGIC) ---
const zk = {
    isOpen: false,
    
    updateLogo: (isLight) => {
        const logoImg = document.getElementById('zk-trigger-img');
        if(logoImg) {
            // Ganti source gambar berdasarkan mode
            logoImg.src = isLight ? 'assets/zk-logo-light.png' : 'assets/zk-logo-dark.png';
        }
    },

    toggle: () => {
        zk.isOpen = !zk.isOpen;
        const win = document.getElementById('zk-interface');
        if(zk.isOpen) {
            win.style.display = 'flex'; win.classList.add('active');
            setTimeout(() => document.getElementById('user-input').focus(), 100);
        } else {
            win.style.display = 'none'; win.classList.remove('active');
        }
    },

    resetChat: (silent = false) => {
        const log = document.getElementById('zk-chat-log');
        if(!log) return;
        if(!silent) log.innerHTML = '';
        
        // Persona Bahasa berbeda tiap segmen
        let intro = "";
        if (app.currentSeg === 'street') intro = "Yo, Whats up? Masuk mode Street nih. Cari scent yang 'rebel' atau buat 'party'?";
        else if (app.currentSeg === 'man') intro = "Good day, Sir. Mr. ZK at your service. Butuh saran untuk Meeting atau Daily?";
        else intro = "Hello Miss. Mencari touch of Elegance atau sesuatu yang Sweet?";

        if(log.innerHTML === "") zk.addBubble(intro, 'bot');
    },

    addBubble: (text, type) => {
        const log = document.getElementById('zk-chat-log');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.style.padding = "10px 14px"; div.style.marginBottom = "10px"; div.style.borderRadius = "12px"; div.style.fontSize = "0.9rem"; div.style.lineHeight = "1.4";
        
        if (type === 'bot') {
            div.style.background = "#333"; div.style.color = "#fff"; div.style.alignSelf = "flex-start"; div.style.borderBottomLeftRadius = "2px";
        } else {
            div.style.background = "var(--accent)"; div.style.color = "#000"; div.style.fontWeight = "600"; div.style.alignSelf = "flex-end"; div.style.borderBottomRightRadius = "2px";
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
        zk.addBubble(text, 'user');
        input.value = '';
        setTimeout(() => {
            const reply = zk.processQuery(text.toLowerCase());
            zk.addBubble(reply, 'bot');
        }, 800 + Math.random() * 500);
    },

    // --- OTAK UTAMA AI ---
    processQuery: (rawQuery) => {
        // 1. Normalisasi Bahasa Gaul (Slang to Keyword)
        let query = rawQuery;
        Object.keys(slangDict).forEach(slang => {
            // Ganti kata gaul jadi kata kunci standar
            const regex = new RegExp(`\\b${slang}\\b`, 'gi');
            query = query.replace(regex, slangDict[slang]);
        });

        // 2. Cek Basa-basi
        if (query.includes('halo') || query.includes('hi')) return "Halo! Ada referensi wangi yang dicari? Misal: 'Buat ngedate' atau 'wangi kayu'?";
        if (query.includes('makasih') || query.includes('thx')) return "Siap, sama-sama! Stay fresh.";

        // 3. Filter Produk Segmen Aktif
        const activeProducts = products.filter(p => p.segment === app.currentSeg);
        
        // 4. Scoring Logic (Lebih Cerdas)
        let bestMatch = null;
        let highestScore = 0;

        activeProducts.forEach(p => {
            let score = 0;
            // Cek Tags (Sekarang support Inggris & Indo)
            p.tags.forEach(tag => { 
                if (query.includes(tag)) score += 10; 
            });
            // Cek Deskripsi
            if (p.desc.toLowerCase().includes(query)) score += 5;
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = p;
            }
        });

        // 5. Response Generator
        if (highestScore > 0 && bestMatch) {
            // Gaya bahasa sesuai segmen
            let opening = "";
            if(app.currentSeg === 'street') opening = "Nah, ini cocok banget buat gaya lo. ";
            else if(app.currentSeg === 'man') opening = "Pilihan yang sangat solid, Sir. ";
            else opening = "Pilihan cantik untuk Anda, Miss. ";

            return `${opening}Saya sarankan <b>${bestMatch.name}</b>.<br><br>
                    <small>🔍 <b>Reasoning:</b> ${bestMatch.zkReason}</small>`;
        } else {
            // Fallback kalau gak nemu
            const suggestions = activeProducts[0].tags.slice(0,3).join(", ");
            return `Hmm, database saya belum punya data spesifik soal "${rawQuery}" di segmen ${app.currentSeg.toUpperCase()}.<br>
                    Coba kata kunci lain kayak: <i>${suggestions}</i>.`;
        }
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
