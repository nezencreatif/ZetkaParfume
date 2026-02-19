// --- 1. LINK GAMBAR DRIVE ASLI BOS ZEN ---
const imgParfum = "https://drive.google.com/uc?export=view&id=1V6cdqjzErsOhJBzxxzEgRIVUo6ka_9kr";

// Logo ZETKA
const imgLogoWhite = "https://drive.google.com/uc?export=view&id=1L-nrBYKMLmDvqoLCxyB7c5fmbwZJYU3j"; // Buat Dark Mode (Background Hitam)
const imgLogoBlack = "https://drive.google.com/uc?export=view&id=1k4f2SnUQPsNPv4gAgsjRG-TTUXX88023"; // Buat Light Mode (Background Putih)

// Logo AI Mr. ZK
const imgAiWhite = "https://drive.google.com/uc?export=view&id=14RgUGM9m8w3dGJC5PiE3owI1rLyHrsHU"; // Buat Dark Mode (Background Hitam)
const imgAiBlack = "https://drive.google.com/uc?export=view&id=1S1lnwjvyiXYpbjntJunRvx3B_0ND1Azl"; // Buat Light Mode (Background Putih)

// --- 2. DATABASE PARFUM ---
const products = [
    { 
        id: 'm1', 
        name: "ZETKA ALPHA", 
        segment: "man", 
        desc: "Dominasi dalam botol. Oud & Leather.", 
        stats: { longevity: 90, sillage: 80, unique: 70 }, 
        zkReason: "Aura Alpha banget. Base notes Leather-nya bikin Anda kelihatan dominan pas meeting atau memimpin tim.", 
        tags: ["woody", "leather", "kuat", "strong", "meeting", "bos", "alpha", "kantor", "office", "malam", "night", "maskulin", "laki", "cowo"] 
    },
    { 
        id: 'm2', 
        name: "BLUE HORIZON", 
        segment: "man", 
        desc: "Kesegaran laut & Citrus.", 
        stats: { longevity: 60, sillage: 70, unique: 50 }, 
        zkReason: "Mood booster instan. Wangi Citrus-nya bikin fokus kerja naik, segar seperti habis mandi.", 
        tags: ["fresh", "citrus", "laut", "ocean", "siang", "day", "kantor", "work", "gym", "sport", "segar", "cool"] 
    },
    { 
        id: 'w1', 
        name: "VELVET ROSE", 
        segment: "woman", 
        desc: "Mawar hitam & Vanilla.", 
        stats: { longevity: 85, sillage: 90, unique: 80 }, 
        zkReason: "Kombinasi Seductive. Vanilla-nya adalah aphrodisiac alami, sangat memikat.", 
        tags: ["floral", "sweet", "manis", "malam", "night", "date", "kencan", "seksi", "sexy", "mawar", "rose", "cewe", "wanita"] 
    },
    { 
        id: 'w2', 
        name: "PURE BLANC", 
        segment: "woman", 
        desc: "Clean Laundry & Musk.", 
        stats: { longevity: 50, sillage: 40, unique: 60 }, 
        zkReason: "Definisi 'Clean Girl Aesthetic'. Wangi sopan, bersih, dan profesional untuk harian.", 
        tags: ["fresh", "clean", "musk", "siang", "day", "kuliah", "college", "lembut", "soft", "sopan"] 
    },
    { 
        id: 's1', 
        name: "NEON DUST", 
        segment: "street", 
        desc: "Aspal basah & Mint.", 
        stats: { longevity: 70, sillage: 80, unique: 95 }, 
        zkReason: "Futuristik & Niche abis. Wangi 'Synthetic' yang artsy, cocok untuk yang berani tampil beda.", 
        tags: ["edgy", "metallic", "unik", "unique", "aneh", "weird", "mint", "dingin", "cool", "art", "skena", "nongkrong"] 
    },
    { 
        id: 's2', 
        name: "GLITCH POP", 
        segment: "street", 
        desc: "Permen karet & Asap.", 
        stats: { longevity: 80, sillage: 85, unique: 90 }, 
        zkReason: "Playful tapi berbahaya. Vibe-nya seperti 'Sweet Tobacco', manis namun memiliki sisi rebel.", 
        tags: ["sweet", "party", "manis", "rokok", "tobacco", "asap", "smoke", "nakal", "rebel", "club", "malam"] 
    }
];

const segIndex = { 'man': 0, 'woman': 1, 'street': 2 };

// --- 3. KAMUS GAUL & TRANSLATOR (AI DICTIONARY) ---
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

// --- 4. APP LOGIC UTAMA ---
const app = {
    currentSeg: 'man',
    isAnimating: false,

    init: () => {
        // Cek Tema Tersimpan di Local Storage
        const savedTheme = localStorage.getItem('theme');
        const isLight = savedTheme === 'light';
        
        if(isLight) {
            document.body.classList.add('light-theme');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        } else {
            document.body.classList.remove('light-theme');
            document.getElementById('theme-icon').classList.replace('ph-sun', 'ph-moon');
        }
        
        // Atur Logo Awal Sesuai Tema
        zk.updateLogo(isLight);

        // Hapus Loading Screen Setelah 1.5 Detik
        setTimeout(() => document.getElementById('loader').style.display = 'none', 1500);
        
        // Render Konten Awal
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
            
            // Update Tombol Navigasi
            document.querySelectorAll('.segment-control button').forEach(b => b.classList.remove('active'));
            document.getElementById(`btn-${newSeg}`).classList.add('active');
            
            // Re-apply Theme Color (Untuk Memperbaiki Bug Street Mode)
            const isLight = document.body.classList.contains('light-theme');
            document.body.className = `theme-${newSeg} ${isLight ? 'light-theme' : ''}`;

            wrapper.classList.remove(outClass);
            app.renderContent(newSeg, true);

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
            
            // MENGGUNAKAN GAMBAR PARFUM SAMPLE DARI DRIVE UNTUK SEMUA PRODUK
            card.innerHTML = `
                <div class="card-img" style="background-image: url('${imgParfum}');"></div>
                <div class="card-meta"><h3>${p.name}</h3><p>${p.desc}</p></div>
            `;
            card.onclick = () => ui.openModal(p);
            grid.appendChild(card);
        });
        
        zk.resetChat(true);
    }
};

// --- 5. UI CONTROLLER ---
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
        
        // Fix Segment Colors saat tema berubah
        body.className = `theme-${app.currentSeg} ${isLight ? 'light-theme' : ''}`;
        
        // Panggil fungsi ganti logo setiap kali tema diubah
        zk.updateLogo(isLight);
    },

    toggleMenu: () => document.getElementById('main-menu').classList.toggle('active'),
    
    openModal: (p) => {
        document.getElementById('modal-name').innerText = p.name;
        document.getElementById('modal-desc').innerText = p.desc;
        document.getElementById('modal-seg-tag').innerText = p.segment.toUpperCase();
        document.getElementById('modal-zk-note').innerText = p.zkReason;
        
        // Gambar di dalam Modal juga memakai Parfum Sample dari Drive
        document.getElementById('modal-img-placeholder').style.backgroundImage = `url('${imgParfum}')`;
        
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

// --- 6. MR. ZK INTELLIGENCE (AI LOGIC) ---
const zk = {
    isOpen: false,
    
    // --- LOGIKA GANTI LOGO OTOMATIS BERDASARKAN TEMA ---
    updateLogo: (isLight) => {
        const navLogo = document.getElementById('nav-logo-img');
        const aiLogo = document.getElementById('zk-trigger-img');
        
        if(isLight) {
            // Mode Terang (Background Putih) -> Pakai Logo Hitam agar kontras
            if(navLogo) navLogo.src = imgLogoBlack;
            if(aiLogo) aiLogo.src = imgAiBlack;
        } else {
            // Mode Gelap (Background Hitam) -> Pakai Logo Putih agar kontras
            if(navLogo) navLogo.src = imgLogoWhite;
            if(aiLogo) aiLogo.src = imgAiWhite;
        }
    },

    toggle: () => {
        zk.isOpen = !zk.isOpen;
        const win = document.getElementById('zk-interface');
        if(zk.isOpen) {
            win.style.display = 'flex'; 
            win.classList.add('active');
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
        
        let intro = "";
        if (app.currentSeg === 'street') intro = "Yo, Whats up? Masuk mode Street. Cari scent yang 'rebel' atau 'party'?";
        else if (app.currentSeg === 'man') intro = "Good day, Sir. Mr. ZK ready. Butuh saran untuk Meeting atau Daily?";
        else intro = "Hello Miss. Mencari touch of Elegance atau sesuatu yang Sweet?";

        if(log.innerHTML === "") zk.addBubble(intro, 'bot');
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
        
        if (type === 'bot') {
            div.style.background = "#333"; 
            div.style.color = "#fff"; 
            div.style.alignSelf = "flex-start"; 
            div.style.borderBottomLeftRadius = "2px";
        } else {
            div.style.background = "var(--accent)"; 
            div.style.color = "#000"; 
            div.style.fontWeight = "600"; 
            div.style.alignSelf = "flex-end"; 
            div.style.borderBottomRightRadius = "2px";
        }
        
        div.innerHTML = text;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    },

    handleEnter: (e) => { 
        if(e.key === 'Enter') zk.sendMessage(); 
    },

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

    processQuery: (rawQuery) => {
        let query = rawQuery;
        
        // Translasi Bahasa Gaul
        Object.keys(slangDict).forEach(slang => {
            const regex = new RegExp(`\\b${slang}\\b`, 'gi');
            query = query.replace(regex, slangDict[slang]);
        });

        if (query.includes('halo') || query.includes('hi')) {
            return "Halo! Ada referensi wangi yang dicari? Misal: 'Buat ngedate' atau 'wangi kayu'?";
        }
        if (query.includes('makasih') || query.includes('thx')) {
            return "Siap, sama-sama! Stay fresh.";
        }

        const activeProducts = products.filter(p => p.segment === app.currentSeg);
        let bestMatch = null;
        let highestScore = 0;

        activeProducts.forEach(p => {
            let score = 0;
            p.tags.forEach(tag => { 
                if (query.includes(tag)) score += 10; 
            });
            if (p.desc.toLowerCase().includes(query)) score += 5;
            
            if (score > highestScore) { 
                highestScore = score; 
                bestMatch = p; 
            }
        });

        if (highestScore > 0 && bestMatch) {
            let opening = app.currentSeg === 'street' ? "Nah, ini cocok gaya lo. " : "Saya sarankan ini. ";
            return `${opening}Pilih <b>${bestMatch.name}</b>.<br><br><small>🔍 ${bestMatch.zkReason}</small>`;
        } else {
            const suggestions = activeProducts[0].tags.slice(0,3).join(", ");
            return `Hmm, coba cari kata lain seperti: <i>${suggestions}</i>.`;
        }
    }
};

// Memulai Aplikasi saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
