// ---------------------------------------------------------------------------
// Semua konten teks portfolio dikumpulkan di sini supaya mudah diedit tanpa
// harus menyentuh komponen. Ganti nilai-nilai di bawah dengan data kamu.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Kham",
  handle: "kham.dev",
  role: "Backend Developer — Bot & AI Agent",
  age: 17,
  education: "SMA, Kelas 11",
  location: "Indonesia",
  email: "kenclaude605@gmail.com",
  github: "private",
  status: "available for small projects",
  timezone: "Asia/Jakarta",
  // Jam aktif (WIB, format 24 jam) untuk indikator di bagian Contact — sesuaikan.
  activeHours: { from: 15, to: 24 },
};

export const nav = [
  { label: "Home", href: "#home", cmd: "~" },
  { label: "About", href: "#about", cmd: "about" },
  { label: "Skills", href: "#skills", cmd: "skills" },
  { label: "Projects", href: "#projects", cmd: "projects" },
  { label: "Experience", href: "#experience", cmd: "log" },
  { label: "Contact", href: "#contact", cmd: "contact" },
];

export const hero = {
  kicker: "root@kham:~$ whoami",
  roles: ["Backend Developer", "Bot Builder", "AI Agent Tinkerer", "VPS Whisperer"],
  headline: "Saya bangun sistem yang tetap hidup walau saya sedang tidur.",
  sub:
    "Backend developer fokus di bot & AI agent — dari agent yang bisa mikir dan generate file lewat Telegram, sampai bot yang jagain VPS 24 jam nonstop.",
  stats: [
    { label: "active bots", value: "4 running", bar: 82 },
    { label: "stack terpakai", value: "Python / Node.js", bar: 70 },
    { label: "jam ngoding favorit", value: "tengah malam", bar: 95 },
  ],
};

export const about = {
  kicker: "~/about.md",
  heading: "Bikin sistem yang jalan sendiri, jarang tidur — programnya, bukan orangnya.",
  paragraphs: [
    "Backend developer, 17 tahun, masih sekolah kelas 11. Fokus utama di pengembangan bot dan AI agent: dari agent yang bisa mikir dan generate file lewat Telegram, sampai bot yang jagain VPS 24 jam nonstop.",
    "Sebagian besar waktu ngoding dihabiskan buat ngulik LLM (Groq, OpenRouter), deploy ke VPS, dan bikin dashboard buat mantau semuanya secara real-time.",
    "Di luar itu: tidur. Itu satu-satunya hobi yang paling sering kalah lawan deadline.",
  ],
  fields: [
    { k: "role", v: "Backend Developer" },
    { k: "pendidikan", v: "SMA — Kelas 11" },
    { k: "fokus", v: "Bot & AI Agent" },
    { k: "deploy", v: "VPS (Linux)" },
    { k: "hobi", v: "Tidur" },
  ],
};

export const skills = {
  kicker: "~/skills.json",
  heading: "Tools yang dipakai supaya bot-bot ini tetap hidup.",
  groups: [
    { title: "bahasa", items: ["Python", "JavaScript", "Node.js", "Bash"] },
    {
      title: "framework & library",
      items: ["FastAPI", "LangChain / LangGraph", "python-telegram-bot", "Baileys", "Express"],
    },
    {
      title: "infra & platform",
      items: ["VPS / Linux", "Nginx", "Termux", "SQLite", "Groq API", "OpenRouter API"],
    },
    { title: "tools", items: ["Git", "PM2", "Certbot", "Docker"] },
  ],
};

export type Project = {
  slug: string;
  title: string;
  tag: string;
  status: "live" | "wip";
  summary: string;
  description: string;
  stack: string[];
  year: string;
  repo: string;
};

export const projects: Project[] = [
  {
    slug: "telegram-agent-bot",
    title: "Telegram Agent Bot",
    tag: "MCP Client",
    status: "live",
    year: "2026",
    summary:
      "Bot Telegram agent serba bisa — tanya jawab, coding, sampai generate file (PDF, DOCX, XLSX, ZIP, gambar).",
    description:
      "Bot Telegram agent serba bisa — tanya jawab, coding, sampai generate file (PDF, DOCX, XLSX, ZIP, gambar). Pakai LangGraph (ReAct) dengan fallback otomatis antar provider LLM, plus dashboard web real-time buat mantau aktivitas bot.",
    stack: ["Python", "LangGraph", "FastAPI", "Groq / OpenRouter"],
    repo: "private",
  },
  {
    slug: "vps-dashboard-bot",
    title: "VPS Dashboard Bot",
    tag: "v2.1",
    status: "live",
    year: "2025",
    summary:
      "Bot Telegram buat monitoring & automation VPS — histori metrik, alert custom threshold, auto-restart proses yang down.",
    description:
      "Bot Telegram buat monitoring & automation VPS — histori metrik, alert custom threshold, auto-restart proses yang down, kontrol multi-VPS dalam satu bot, sampai jalanin file (.js/.py/.sh) langsung dari chat dengan konfirmasi PIN.",
    stack: ["Node.js", "PM2", "Telegram Bot API"],
    repo: "private",
  },
  {
    slug: "elaina-wa-bot",
    title: "Elaina",
    tag: "WhatsApp Bot — Multi Device",
    status: "wip",
    year: "2025",
    summary:
      "Bot WhatsApp multi-device berbasis Baileys dengan downloader media, edit gambar/sticker, dan perintah grup.",
    description:
      "Bot WhatsApp multi-device berbasis Baileys dengan segudang fitur: downloader media, edit gambar/sticker, pencarian YouTube, sampai perintah grup — dibangun di atas arsitektur event-based yang ringan buat jalan lama di VPS.",
    stack: ["Node.js", "Baileys", "Canvas"],
    repo: "private",
  },
  {
    slug: "ai-agent-termux",
    title: "AI Agent Termux",
    tag: "v3.2",
    status: "live",
    year: "2024",
    summary:
      "AI agent multifungsi yang jalan langsung di Termux — terima perintah teks/suara, eksekusi tugas nyata di HP.",
    description:
      "AI agent multifungsi yang jalan langsung di Termux (Android) — terima perintah teks/suara, eksekusi tugas nyata di HP, mode otonom multi-step, dan dashboard status real-time buat mantau CPU/RAM/baterai/suhu.",
    stack: ["Python", "Termux", "Autonomous Agent"],
    repo: "private",
  },
  {
    slug: "koperasi-guru-sman7",
    title: "Koperasi Guru — SMA Negeri 7 Palembang",
    tag: "v3",
    status: "live",
    year: "2026",
    summary:
      "Aplikasi manajemen koperasi simpan pinjam guru — multi-role, audit log, backup otomatis, dan Asisten AI.",
    description:
      "Aplikasi manajemen koperasi simpan pinjam guru SMA Negeri 7 Palembang. Login multi-role (Admin, Pengurus, Anggota) dengan session-based auth dan penguncian akun otomatis, audit log lengkap, backup database otomatis tiap 24 jam, validasi input di server, serta modul Simpanan/Pinjaman/SHU dengan grafik. Ada juga Asisten AI (Groq/Llama 3.3) yang bisa menjawab pertanyaan seputar data koperasi secara read-only, dan export Laporan RAT ke PDF siap cetak.",
    stack: ["Node.js", "Express", "sql.js (SQLite)", "EJS", "Chart.js", "Groq API"],
    repo: "private",
  },
  {
    slug: "vibe-messenger",
    title: "Vibe Messenger",
    tag: "iOS/Android — Expo",
    status: "wip",
    year: "2026",
    summary:
      "Aplikasi messenger custom berbasis React Native (Expo) — login, list chat, chat room siap WebSocket.",
    description:
      "Pondasi UI aplikasi messenger custom berbasis React Native (Expo): layar login, list chat, chat room yang siap disambungkan ke WebSocket, dan placeholder fitur story. Backend (server WebSocket, database user/pesan, auth OTP, routing pesan ke agent) berjalan terpisah di VPS sendiri.",
    stack: ["React Native", "Expo", "WebSocket-ready"],
    repo: "private",
  },
];

export const featured = projects[0];

export const experience = {
  kicker: "~/log --experience",
  heading: "Jejak singkat — belajar sambil deploy.",
  items: [
    {
      title: "FullStack Developer (Capstone)",
      org: "Telegram Agent Bot — MCP Client",
      period: "2026",
      note: "Merancang arsitektur agent multi-provider dengan fallback otomatis.",
    },
    {
      title: "Backend Developer — Freelance",
      org: "VPS automation & monitoring bots",
      period: "2025",
      note: "Membangun sistem monitoring VPS real-time untuk beberapa klien kecil.",
    },
    {
      title: "Hello World",
      org: "Baris kode pertama",
      period: "2022",
      note: "Mulai belajar Python secara otodidak dari dokumentasi & forum.",
    },
  ],
};

export const contact = {
  kicker: "~/contact.sh",
  heading: "Ada project atau mau ngobrol soal bot?",
  body: "Repo GitHub masih private, jadi cara paling gampang buat menghubungi lewat email. Biasanya balas cukup cepat — di sela-sela nungguin deploy selesai.",
};

export const footer = {
  tagline: "Dibangun dari scratch, di-deploy dari VPS sendiri.",
  year: new Date().getFullYear(),
};

// Section tambahan yang tidak masuk navbar utama, tapi muncul di Command Palette.
export const navExtra = [
  { label: "Bot Demo", href: "#demo", cmd: "demo" },
  { label: "Layanan", href: "#services", cmd: "services" },
  { label: "Alur Kerja", href: "#process", cmd: "process" },
  { label: "Architecture", href: "#architecture", cmd: "arch" },
  { label: "Aktivitas", href: "#activity", cmd: "activity" },
  { label: "Now", href: "#now", cmd: "now" },
  { label: "Live Status", href: "#status", cmd: "status" },
  { label: "Agent Trace", href: "#trace", cmd: "trace" },
  { label: "LLM Router", href: "#router", cmd: "router" },
  { label: "Rate Limiter", href: "#limiter", cmd: "limiter" },
  { label: "Terminal", href: "#terminal", cmd: "term" },
  { label: "Changelog", href: "#changelog", cmd: "changelog" },
  { label: "FAQ", href: "#faq", cmd: "faq" },
];

export const faq = {
  kicker: "~/faq.md",
  heading: "Pertanyaan yang sering muncul.",
  items: [
    {
      q: "Bisa terima project kecil?",
      a: "Bisa. Status saat ini: available for small projects. Kirim gambaran singkat lewat email — bot, automation VPS, atau integrasi LLM.",
    },
    {
      q: "Kenapa repo-nya private?",
      a: "Sebagian besar repo memang masih private. Detail arsitektur dan cerita di baliknya terbuka buat didiskusikan lewat email.",
    },
    {
      q: "Stack utama yang dipakai apa?",
      a: "Python dan Node.js. Untuk agent: LangGraph + FastAPI dengan Groq/OpenRouter. Untuk deploy: VPS Linux dengan Nginx, PM2, dan Certbot.",
    },
    {
      q: "Bagaimana bot dijaga tetap hidup?",
      a: "Proses dijalankan lewat PM2, dipantau oleh VPS Dashboard Bot dengan alert threshold, dan proses yang down di-restart otomatis.",
    },
    {
      q: "Bagaimana alur kerjanya?",
      a: "Brief singkat, scope disepakati, dibangun bertahap dengan update berkala, lalu deploy dan serah terima. Detailnya ada di section Alur Kerja.",
    },
    {
      q: "Apakah demo bot di atas itu bot asli?",
      a: "Itu simulasi berskrip supaya bisa dicoba langsung di browser. Responsnya meniru gaya bot yang asli, tapi tidak terhubung ke server mana pun.",
    },
    {
      q: "Masih sekolah, apa bisa dikejar deadline-nya?",
      a: "Masih kelas 11, jadi pengerjaan di sela sekolah. Estimasi waktu disepakati di awal supaya realistis.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Changelog portfolio. Tanggal bersifat perkiraan — sesuaikan sendiri.
// ---------------------------------------------------------------------------
export type ChangeType = "feat" | "fix" | "perf";
export type Release = {
  version: string;
  date: string;
  type: ChangeType;
  title: string;
  items: string[];
};

export const changelog = {
  kicker: "~/changelog.md",
  heading: "Portfolio ini juga punya riwayat rilis.",
  body: "Dibangun bertahap — tiap versi nambah satu lapis. Klik rilis buat lihat isinya.",
  releases: [
    {
      version: "1.9",
      date: "Okt 2026",
      type: "feat",
      title: "Demo bot, layanan, alur kerja & pintasan",
      items: [
        "Simulator chat Telegram interaktif (Bot Demo)",
        "Section Layanan, Alur Kerja, Aktivitas, dan Now",
        "Navigasi titik di sisi layar dengan scrollspy",
        "Jam lokal WIB dan indikator ketersediaan di Contact",
        "Pintasan keyboard (tekan ?) dan notifikasi toast",
      ],
    },
    {
      version: "1.8",
      date: "Okt 2026",
      type: "feat",
      title: "Tema terang/gelap & interaksi baru",
      items: [
        "Toggle tema dengan transisi lingkaran membesar dari tombol",
        "Section changelog dengan garis timeline yang terisi saat scroll",
        "Kartu proyek miring 3D mengikuti kursor",
        "Efek scramble pada judul section",
        "Perintah ganti tema di Command Palette",
      ],
    },
    {
      version: "1.7",
      date: "Okt 2026",
      type: "feat",
      title: "Command Palette, FAQ, cari & urut proyek",
      items: [
        "Command Palette (Ctrl K) untuk lompat section dan buka proyek",
        "Section FAQ dengan accordion",
        "Pencarian dan pengurutan di daftar proyek",
      ],
    },
    {
      version: "1.6",
      date: "Okt 2026",
      type: "perf",
      title: "Live dashboard, arsitektur & terminal",
      items: [
        "Live status dashboard dengan sparkline CPU/RAM",
        "Diagram arsitektur dan section terminal interaktif",
        "Hormati prefers-reduced-motion di seluruh animasi",
      ],
    },
    {
      version: "1.5",
      date: "Okt 2026",
      type: "feat",
      title: "Orbit galaxy, marquee & cursor glow",
      items: [
        "Orbit galaxy untuk visualisasi skill",
        "Tech marquee dan strip statistik",
        "Cursor glow dan progress bar scroll",
      ],
    },
    {
      version: "1.0",
      date: "Sep 2026",
      type: "feat",
      title: "Rilis pertama",
      items: [
        "Hero, About, Skills, Featured Project, dan Contact",
        "Video background, musik latar, dan robot maskot",
      ],
    },
  ] as Release[],
};


// ---------------------------------------------------------------------------
// Tambahan v1.9
// ---------------------------------------------------------------------------

export const demo = {
  kicker: "~/demo.sh",
  heading: "Coba ngobrol sama botnya — langsung di sini.",
  body: "Simulasi berskrip, bukan koneksi ke server asli. Tekan salah satu perintah di bawah chat.",
  botName: "Agent Bot",
  intro: "Halo! Aku siap bantu. Coba salah satu perintah di bawah.",
  commands: [
    {
      cmd: "/status",
      reply: [
        "VPS-01 · online",
        "CPU 23% · RAM 1.4/4 GB · disk 41%",
        "Proses aktif: agent-bot, vps-dashboard, elaina (3/3)",
      ],
    },
    {
      cmd: "/restart elaina",
      reply: [
        "Menjalankan: pm2 restart elaina",
        "elaina berhasil restart dalam 1.8 detik",
        "Alert threshold tetap aktif.",
      ],
    },
    {
      cmd: "/buat laporan",
      reply: [
        "Mengumpulkan metrik 7 hari terakhir...",
        "laporan-mingguan.pdf siap (2 halaman)",
        "Uptime rata-rata 99.4%, 1 restart otomatis.",
      ],
    },
    {
      cmd: "/tanya Apa itu PM2?",
      reply: [
        "PM2 adalah process manager untuk Node.js.",
        "Fungsinya menjaga proses tetap hidup, restart otomatis saat crash, dan mengumpulkan log.",
      ],
    },
  ],
};

export const services = {
  kicker: "~/services.md",
  heading: "Yang bisa dikerjakan bareng.",
  body: "Fokus ke hal yang memang jadi keseharian — bukan semua hal sekaligus.",
  items: [
    {
      icon: "bot",
      title: "Bot Telegram & WhatsApp",
      desc: "Bot custom untuk komunitas atau bisnis kecil: menu, pembayaran manual, broadcast, hingga downloader.",
      points: ["Telegram Bot API", "Baileys (WhatsApp)", "Panel admin"],
      eta: "3–10 hari",
    },
    {
      icon: "cpu",
      title: "AI Agent & integrasi LLM",
      desc: "Agent yang bisa memanggil tools, membaca data, dan membuat file, dengan fallback antar provider.",
      points: ["LangGraph / LangChain", "Groq & OpenRouter", "Generate PDF, DOCX, XLSX"],
      eta: "1–3 minggu",
    },
    {
      icon: "server",
      title: "Deploy & monitoring VPS",
      desc: "Setup server Linux, Nginx, HTTPS, PM2, serta alert supaya tahu lebih dulu sebelum pengguna.",
      points: ["Nginx + Certbot", "PM2 auto-restart", "Alert threshold"],
      eta: "1–3 hari",
    },
    {
      icon: "workflow",
      title: "Automasi & dashboard",
      desc: "Skrip dan dashboard web kecil untuk memantau data atau menggantikan pekerjaan manual berulang.",
      points: ["FastAPI / Express", "SQLite", "Dashboard real-time"],
      eta: "3–14 hari",
    },
  ],
};

export const workflow = {
  kicker: "~/process.md",
  heading: "Alur kerja dari brief sampai jalan di server.",
  steps: [
    { n: "01", title: "Brief", desc: "Kirim gambaran singkat lewat email. Dibalas dengan pertanyaan seperlunya.", time: "1 hari" },
    { n: "02", title: "Scope", desc: "Fitur inti disepakati, estimasi waktu dibuat realistis karena pengerjaan di sela sekolah.", time: "1–2 hari" },
    { n: "03", title: "Bangun", desc: "Dikerjakan bertahap, ada update berkala dan bisa dicoba sebelum selesai.", time: "sesuai scope" },
    { n: "04", title: "Deploy", desc: "Pasang di VPS, set PM2 dan monitoring, lalu serah terima dengan catatan singkat.", time: "1 hari" },
  ],
};

export const activity = {
  kicker: "~/activity.log",
  heading: "Ritme ngoding — mayoritas larut malam.",
  body: "Visualisasi ilustrasi (data acak yang konsisten), bukan statistik commit asli.",
  weeks: 26,
};

export const now = {
  kicker: "~/now.md",
  heading: "Lagi ngapain sekarang.",
  updated: "Okt 2026",
  items: [
    { label: "membangun", title: "Vibe Messenger", note: "Backend WebSocket, auth OTP, dan routing pesan ke agent." },
    { label: "mempelajari", title: "Orkestrasi multi-agent", note: "Pola LangGraph yang lebih rapi dan fallback provider yang lebih cerdas." },
    { label: "merapikan", title: "Monitoring & alert", note: "Threshold yang tidak berisik, restart otomatis yang aman." },
  ],
};

export const shortcuts = [
  { keys: ["Ctrl", "K"], label: "Buka Command Palette" },
  { keys: ["/"], label: "Buka Command Palette" },
  { keys: ["?"], label: "Tampilkan pintasan ini" },
  { keys: ["T"], label: "Ganti tema gelap / terang" },
  { keys: ["G"], label: "Kembali ke atas" },
  { keys: ["Esc"], label: "Tutup dialog" },
];

// Urutan section untuk navigasi titik di sisi layar.
export const sectionDots = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "showcase", label: "Showcase" },
  { id: "demo", label: "Bot Demo" },
  { id: "services", label: "Layanan" },
  { id: "process", label: "Alur Kerja" },
  { id: "trace", label: "Agent Trace" },
  { id: "router", label: "LLM Router" },
  { id: "limiter", label: "Rate Limiter" },
  { id: "architecture", label: "Architecture" },
  { id: "status", label: "Live Status" },
  { id: "activity", label: "Aktivitas" },
  { id: "experience", label: "Experience" },
  { id: "now", label: "Now" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
