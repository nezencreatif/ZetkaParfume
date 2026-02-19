// --- 1. CONFIG: LINK GAMBAR (FORMAT ALTERNATIF ANTI-BLOKIR) ---
const imgParfum = "https://lh3.googleusercontent.com/d/1V6cdqjzErsOhJBzxxzEgRIVUo6ka_9kr"; // Botol Parfum

// Logo ZETKA
const imgLogoWhite = "https://lh3.googleusercontent.com/d/1L-nrBYKMLmDvqoLCxyB7c5fmbwZJYU3j"; // Utk Dark Mode
const imgLogoBlack = "https://lh3.googleusercontent.com/d/1k4f2SnUQPsNPv4gAgsjRG-TTUXX88023"; // Utk Light Mode

// Logo AI
const imgAiWhite = "https://lh3.googleusercontent.com/d/14RgUGM9m8w3dGJC5PiE3owI1rLyHrsHU"; // Utk Dark Mode
const imgAiBlack = "https://lh3.googleusercontent.com/d/1S1lnwjvyiXYpbjntJunRvx3B_0ND1Azl"; // Utk Light Mode

// --- 2. DATABASE PARFUM ---
const products = [
    { id: 'm1', name: "ZETKA ALPHA", segment: "man", desc: "Dominasi dalam botol. Oud & Leather.", stats: { longevity: 90, sillage: 80, unique: 70 }, zkReason: "Aura Alpha banget. Base notes Leather-nya bikin lu kelihatan dominan pas meeting.", tags: ["woody", "leather", "kuat", "bos"] },
    { id: 'm2', name: "BLUE HORIZON", segment: "man", desc: "Kesegaran laut & Citrus.", stats: { longevity: 60, sillage: 70, unique: 50 }, zkReason: "Mood booster instan. Wangi Citrus-nya bikin fokus kerja naik.", tags: ["fresh", "citrus", "laut", "siang"] },
    { id: 'w1', name: "VELVET ROSE", segment: "woman", desc: "Mawar hitam & Vanilla.", stats: { longevity: 85, sillage: 90, unique: 80 }, zkReason: "Kombinasi Seductive. Vanilla-nya itu aphrodisiac alami.", tags: ["floral", "sweet", "malam", "date"] },
    { id: 'w2', name: "PURE BLANC", segment: "woman", desc: "Clean Laundry & Musk.", stats: { longevity: 50, sillage: 40, unique: 60 }, zkReason: "Definisi 'Clean Girl Aesthetic'. Wangi sopan dan bersih.", tags: ["fresh", "clean", "musk", "siang"] },
    { id: 's1', name: "NEON DUST", segment: "street", desc: "Aspal basah & Mint.", stats: { longevity: 70, sillage: 80, unique: 95 }, zkReason: "Futuristik & Niche abis. Wangi 'Synthetic' yang artsy.", tags: ["edgy", "metallic", "unik", "dingin"] },
    { id: 's2', name: "GLITCH POP", segment: "street", desc: "Permen karet & Asap.", stats: { longevity: 80, sillage: 85, unique: 90 }, zkReason: "Playful tapi berbahaya. Vibe-nya kayak 'Sweet Tobacco'.", tags: ["sweet", "party", "rebel"] }
];

const segIndex = { 'man': 0, 'woman': 1, 'street': 2 };

// --- 3. KAMUS GAUL ---
const slangDict = { "gw": "saya", "lo": "anda", "wangi": "aroma" };

// --- 4. APP LOGIC ---
const app = {
    currentSeg: 'man',
    isAnimating: false,

    init: () => {
        const savedTheme = localStorage.getItem('theme');
        const isLight = savedTheme === 'light';
        
        if(isLight) {
            document.body.classList.add('light-theme');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        }
        
        zk.updateLogo(isLight);
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
        
        body.className = `theme-${app.currentSeg} ${isLight ? 'light-theme' : ''}`;
        zk.updateLogo(isLight);
    },

    toggleMenu: () => document.getElementById('main-menu').classList.toggle('active'),
    
    openModal: (p) => {
        document.getElementById('modal-name').innerText = p.name;
        document.getElementById('modal-desc').innerText = p.desc;
        document.getElementById('modal-seg-tag').innerText = p.segment.toUpperCase();
        document.getElementById('modal-zk-note').innerText = p.zkReason;
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

// --- 6. MR. ZK INTELLIGENCE ---
const zk = {
    isOpen: false,
    
    updateLogo: (isLight) => {
        const navLogo = document.getElementById('nav-logo-img');
        const aiLogo = document.getElementById('zk-trigger-img');
        
        if(isLight) {
            if(navLogo) navLogo.src = imgLogoBlack;
            if(aiLogo) aiLogo.src = imgAiBlack;
        } else {
            if(navLogo) navLogo.src = imgLogoWhite;
            if(aiLogo) aiLogo.src = imgAiWhite;
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
        let intro = app.currentSeg === 'street' ? "Yo. Mode Street." : "Hello. Mr. ZK here.";
        if(log.innerHTML === "") zk.addBubble(intro, 'bot');
    },

    addBubble: (text, type) => {
        const log = document.getElementById('zk-chat-log');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.style.padding = "10px 14px"; div.style.marginBottom = "10px"; div.style.borderRadius = "12px"; 
        if (type === 'bot') { div.style.background = "#333"; div.style.color = "#fff"; div.style.alignSelf = "flex-start"; } 
        else { div.style.background = "var(--accent)"; div.style.color = "#000"; div.style.alignSelf = "flex-end"; }
        div.innerHTML = text;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    },

    handleEnter: (e) => { if(e.key === 'Enter') zk.sendMessage(); },

    sendMessage: () => {
        const input = document.getElementById('user-input');
        if(!input.value) return;
        zk.addBubble(input.value, 'user');
        setTimeout(() => zk.addBubble("Saya sarankan <b>ZETKA ALPHA</b>.", 'bot'), 1000);
        input.value = '';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
