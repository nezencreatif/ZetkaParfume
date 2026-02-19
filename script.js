// --- 1. LINK GAMBAR JALUR VIP GOOGLE (ANTI-ERROR / ANTI-BLOKIR) ---
// Menggunakan format lh3.googleusercontent.com dengan ID asli milik Bos Zen
const imgParfum = "https://lh3.googleusercontent.com/d/1V6cdqjzErsOhJBzxxzEgRIVUo6ka_9kr";

// Logo ZETKA
const imgLogoWhite = "https://lh3.googleusercontent.com/d/1L-nrBYKMLmDvqoLCxyB7c5fmbwZJYU3j"; // Buat Dark Mode (Background Hitam)
const imgLogoBlack = "https://lh3.googleusercontent.com/d/1k4f2SnUQPsNPv4gAgsjRG-TTUXX88023"; // Buat Light Mode (Background Putih)

// Logo AI Mr. ZK
const imgAiWhite = "https://lh3.googleusercontent.com/d/14RgUGM9m8w3dGJC5PiE3owI1rLyHrsHU"; // Buat Dark Mode (Background Hitam)
const imgAiBlack = "https://lh3.googleusercontent.com/d/1S1lnwjvyiXYpbjntJunRvx3B_0ND1Azl"; // Buat Light Mode (Background Putih)

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
    "nongkrong": "party", "hangout": "party
