/* --- 1. SETUP & VARIABLES --- */
:root {
    --bg-color: #050505;
    --card-bg: #111;
    --text-main: #ffffff;
    --text-dim: #888888;
    --glass-bg: rgba(5, 5, 5, 0.7);
    --border-color: rgba(255,255,255,0.1);
    --accent: #4a90e2; 
    
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
    --font-street: 'Syncopate', sans-serif;
}

/* LIGHT THEME */
body.light-theme {
    --bg-color: #f2f2f7; /* iOS Light Gray */
    --card-bg: #ffffff;
    --text-main: #000000;
    --text-dim: #666666;
    --glass-bg: rgba(255, 255, 255, 0.85);
    --border-color: rgba(0,0,0,0.1);
}

/* THEME ACCENTS */
body.theme-man { --accent: #007AFF; } /* iOS Blue */
body.theme-woman { --accent: #FF2D55; } /* iOS Pink/Red */
body.theme-street { --accent: #30D158; --bg-color: #000; } /* iOS Green */

* { box-sizing: border-box; transition: background-color 0.4s ease, color 0.3s ease; }
body { background-color: var(--bg-color); color: var(--text-main); font-family: var(--font-body); margin: 0; overflow-x: hidden; }

/* LOGO */
.nav-logo { height: 28px; width: auto; }
.loader-logo { height: 60px; width: auto; margin-bottom: 20px; }

/* NAV */
.glass-nav {
    position: fixed; top: 0; width: 100%; padding: 15px 40px;
    display: flex; justify-content: space-between; align-items: center;
    background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color); z-index: 100;
}
.nav-actions { display: flex; gap: 20px; align-items: center; }
.theme-toggle { background: none; border: none; color: var(--text-main); font-size: 20px; cursor: pointer; padding: 5px; }

/* SEGMENT BUTTONS */
.segment-control button {
    background: none; border: none; color: var(--text-dim);
    font-family: var(--font-heading); font-weight: 600; font-size: 0.85rem;
    margin: 0 10px; cursor: pointer; position: relative; padding-bottom: 5px;
}
.segment-control button.active { color: var(--text-main); }
/* Garis bawah animasi */
.segment-control button::after {
    content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px;
    background: var(--accent); transition: 0.3s ease; transform: translateX(-50%);
}
.segment-control button.active::after { width: 100%; }

/* CONTENT & ANIMATION CONTAINER */
main { padding: 120px 40px 40px; max-width: 1400px; margin: 0 auto; overflow: hidden; }
#content-wrapper { width: 100%; }

/* HERO */
#hero-title {
    font-family: var(--font-heading); font-size: 3.5rem; margin: 0; line-height: 1.1;
    color: var(--text-main); letter-spacing: -1px;
}

/* GRID */
#grid-container {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; margin-top: 40px;
}
.product-card {
    background: var(--card-bg); border: 1px solid var(--border-color);
    border-radius: 16px; padding: 15px; cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: transform 0.3s ease;
}
.product-card:hover { transform: scale(1.02); border-color: var(--accent); }
.card-img { height: 220px; background: #222; border-radius: 12px; margin-bottom: 15px; background-size: cover; background-position: center; }

/* ZK & MODAL (Standard) */
.zk-window { background: var(--card-bg); color: var(--text-main); border-color: var(--border-color); border-radius: 18px; }
.zk-trigger { background: var(--text-main); color: var(--bg-color); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); z-index: 999; display: none; justify-content: center; align-items: center; }
.modal-card { background: var(--card-bg); width: 90%; max-width: 900px; height: 80vh; border-radius: 24px; display: flex; overflow: hidden; border: 1px solid var(--border-color); position: relative; }
.close-modal { position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.5); border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; }

/* --- APPLE FLOW ANIMATIONS (THE MAGIC) --- */

/* Base state */
.flow-animate {
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); /* iOS Smooth Curve */
    animation-fill-mode: forwards;
}

/* Slide KIRI (Masuk dari kanan, Keluar ke kiri) */
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px) scale(0.95); }
    to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideOutLeft {
    from { opacity: 1; transform: translateX(0) scale(1); }
    to { opacity: 0; transform: translateX(-50px) scale(0.95); }
}

/* Slide KANAN (Masuk dari kiri, Keluar ke kanan) */
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px) scale(0.95); }
    to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideOutRight {
    from { opacity: 1; transform: translateX(0) scale(1); }
    to { opacity: 0; transform: translateX(50px) scale(0.95); }
}

/* Helper Classes */
.slide-in-right { animation-name: slideInRight; }
.slide-out-left { animation-name: slideOutLeft; }
.slide-in-left { animation-name: slideInLeft; }
.slide-out-right { animation-name: slideOutRight; }

/* Stagger item muncul satu-satu */
.stagger-item {
    opacity: 0;
    animation: fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

#loader { position: fixed; inset: 0; background: var(--bg-color); z-index: 9999; display: flex; justify-content: center; align-items: center; }
.menu-layer { position: fixed; inset: 0; background: var(--bg-color); z-index: 2000; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; }
.menu-layer.active { transform: translateY(0); }
.close-menu-btn { position: absolute; top: 30px; right: 30px; font-size: 32px; cursor: pointer; }
.menu-links a { display: block; font-family: var(--font-heading); font-size: 2.5rem; color: var(--text-dim); text-decoration: none; margin: 15px 0; transition: 0.3s; }
.menu-links a:hover { color: var(--text-main); transform: translateX(10px); }
