// --- 1. DATABASE PARFUM (THE SCENT LIBRARY) ---
const products = [
    // === MAN SEGMENT ===
    {
        id: 'm1', name: "ZETKA ALPHA", segment: "man",
        desc: "Dominasi dalam botol. Perpaduan Oud dan Leather yang menciptakan aura pemimpin.",
        stats: { longevity: 90, sillage: 80, unique: 70 },
        zkNote: "Best seller untuk Business Meeting. Aura wibawa sangat kuat.",
        tags: ["woody", "leather", "strong"]
    },
    {
        id: 'm2', name: "BLUE HORIZON", segment: "man",
        desc: "Kesegaran laut dalam dengan sentuhan Citrus Italia.",
        stats: { longevity: 60, sillage: 70, unique: 50 },
        zkNote: "Sangat aman untuk Daily Office atau Gym. Tidak menyengat.",
        tags: ["fresh", "citrus", "ocean"]
    },

    // === WOMAN SEGMENT ===
    {
        id: 'w1', name: "VELVET ROSE", segment: "woman",
        desc: "Mawar hitam yang misterius dengan base Vanilla Madagascar.",
        stats: { longevity: 85, sillage: 90, unique: 80 },
        zkNote: "Pilihan tepat untuk Date Night. Sangat seductive.",
        tags: ["floral", "sweet", "romantic"]
    },
    {
        id: 'w2', name: "PURE BLANC", segment: "woman",
        desc: "Wangi linen bersih dan White Musk. Minimalis dan elegan.",
        stats: { longevity: 50, sillage: 40, unique: 60 },
        zkNote: "Clean girl aesthetic. Cocok untuk acara formal siang hari.",
        tags: ["fresh", "clean", "musk"]
    },

    // === STREET SEGMENT (GEN Z / EDGY) ===
    {
        id: 's1', name: "NEON DUST", segment: "street",
        desc: "Aroma aspal basah bercampur metallic mint. Future classic.",
        stats: { longevity: 70, sillage: 80, unique: 95 },
        zkNote: "WARNING: Bukan untuk semua orang. Sangat artsy & niche.",
        tags: ["metallic", "unique", "edgy"]
    },
    {
        id: 's2', name: "BUBBLEGUM HAZE", segment: "street",
        desc: "Manis sintetis yang rebel. Tembakau manis dan permen karet.",
        stats: { longevity: 80, sillage: 90, unique: 85 },
        zkNote: "Party monster. Dijamin dilirik orang saat lewat.",
        tags: ["sweet", "tobacco", "party"]
    }
];

// --- 2. CORE APP LOGIC ---
const app = {
    currentSeg: 'man',

    init: () => {
        // Preloader remover
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 2000);

        app.renderGrid();
    },

    setSegment: (seg) => {
        app.currentSeg = seg;
        
        // 1. Update UI Buttons
        document.querySelectorAll('.segment-control button').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${seg}`).classList.add('active');

        // 2. Update Theme (Body Class)
        document.body.className = `theme-${seg}`;

        // 3. Update Text Hero
        const titles = {
            man: "PROFESSIONAL<br>COLLECTION",
            woman: "ELEGANCE<br>REDEFINED",
            street: "URBAN<br>GLITCH_MODE"
        };
        const descs = {
            man: "Curated for the modern gentleman.",
            woman: "Scent that whispers class.",
            street: "Break the rules. Smell distinct."
        };
        
        document.getElementById('hero-title').innerHTML = titles[seg];
        document.getElementById('hero-desc').innerText = descs[seg];

        // 4. Update Mr. ZK Context
        document.getElementById('zk-current-seg').innerText = seg.toUpperCase();

        // 5. Re-render Grid
        app.renderGrid();
    },

    renderGrid: () => {
        const grid = document.getElementById('grid-container');
        grid.innerHTML = ''; // Clear

        const filtered = products.filter(p => p.segment === app.currentSeg);

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="card-img"></div>
                <div class="card-meta">
                    <h3>${p.name}</h3>
                    <p>${p.desc.substring(0, 50)}...</p>
                </div>
            `;
            card.onclick = () => ui.openModal(p);
            grid.appendChild(card);
        });
    }
};

// --- 3. UI CONTROLLER ---
const ui = {
    toggleMenu: () => {
        document.getElementById('main-menu').classList.toggle('active');
    },

    openModal: (product) => {
        const modal = document.getElementById('product-modal');
        
        // Populate Data
        document.getElementById('modal-name').innerText = product.name;
        document.getElementById('modal-desc').innerText = product.desc;
        document.getElementById('modal-seg-tag').innerText = product.segment.toUpperCase() + " SERIES";
        document.getElementById('modal-zk-note').innerText = `ZK Analysis: ${product.zkNote}`;

        // Reset Bars first (for animation effect)
        document.getElementById('bar-long').style.width = '0%';
        document.getElementById('bar-sillage').style.width = '0%';
        document.getElementById('bar-unique').style.width = '0%';

        // Show Modal
        modal.style.display = 'flex';

        // Animate Bars after small delay
        setTimeout(() => {
            document.getElementById('bar-long').style.width = product.stats.longevity + '%';
            document.getElementById('bar-sillage').style.width = product.stats.sillage + '%';
            document.getElementById('bar-unique').style.width = product.stats.unique + '%';
            
            // Set text values
            document.getElementById('val-long').innerText = product.stats.longevity + '/100';
            document.getElementById('val-sillage').innerText = product.stats.sillage + '/100';
            document.getElementById('val-unique').innerText = product.stats.unique + '%';
        }, 100);
    },

    closeModal: () => {
        document.getElementById('product-modal').style.display = 'none';
    }
};

// --- 4. MR. ZK (AI LOGIC) ---
const zk = {
    isOpen: false,

    toggle: () => {
        zk.isOpen = !zk.isOpen;
        const win = document.getElementById('zk-interface');
        if(zk.isOpen) win.classList.add('active');
        else win.classList.remove('active');
    },

    handleEnter: (e) => {
        if(e.key === 'Enter') zk.sendMessage();
    },

    sendMessage: () => {
        const inputField = document.getElementById('user-input');
        const text = inputField.value.toLowerCase().trim();
        if(!text) return;

        // 1. Add User Message
        zk.addBubble(inputField.value, 'user');
        inputField.value = '';

        // 2. AI Thinking (Delay)
        setTimeout(() => {
            zk.processLogic(text);
        }, 800);
    },

    processLogic: (text) => {
        // Filter products based on current segment ONLY
        const segmentProducts = products.filter(p => p.segment === app.currentSeg);
        let match = null;

        // Simple Keyword Matching
        segmentProducts.forEach(p => {
            p.tags.forEach(tag => {
                if(text.includes(tag)) match = p;
            });
        });

        if(match) {
            zk.addBubble(`Saya menyarankan <b>${match.name}</b>. Karena anda mencari nuansa "${text}".`, 'bot');
        } else {
            zk.addBubble(`Maaf, data spesifik "${text}" tidak ditemukan di segmen ${app.currentSeg}. Coba kata kunci lain seperti: Fresh, Sweet, atau Woody.`, 'bot');
        }
    },

    addBubble: (html, type) => {
        const chatLog = document.getElementById('zk-chat-log');
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerHTML = html;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight; // Auto scroll down
    }
};

// Start App
app.init();
