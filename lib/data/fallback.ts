export type Profile = {
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  linkedin_url: string;
  github_url: string;
  photo_url: string | null;
  cv_url: string | null;
  availability: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  role: string;
  tech: string[];
  repo_url: string | null;
  demo_url: string | null;
  year: number;
  featured: boolean;
  thumbnail_url: string | null;
};

export type Experience = {
  company: string;
  role: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  highlights: string[];
  tech: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  issued_at: string;
  credential_url: string | null;
};

export const fallbackProfile: Profile = {
  full_name: "Rayshan Gani Putra",
  headline: "Fullstack Web Developer",
  bio: "Saya membangun sistem web yang menyelesaikan masalah operasional nyata. Selama magang di Dinas Cipta Karya, Bina Konstruksi dan Tata Ruang Kota Bandung, saya mengembangkan backend SiAdit — sistem audit data pemakaman yang mengubah pencocokan manual 47.000 baris Excel menjadi proses otomatis 19–21 detik.\n\nSebelumnya saya memimpin HIMATIF ULBI bersama 47 pengurus dan 21 program kerja. Saya terbiasa bekerja dari perancangan basis data, API, antarmuka, sampai deployment — dan menutup pekerjaan dengan pengujian, bukan asumsi.",
  location: "Bandung, Indonesia",
  email: "rayshangp@gmail.com",
  linkedin_url: "https://www.linkedin.com/in/rayshannn/",
  github_url: "https://github.com/Rayshan10",
  photo_url: null,
  cv_url: null,
  availability: "Terbuka untuk peluang full-time",
};

export const fallbackProjects: Project[] = [
  {
    slug: "siadit",
    title: "SiAdit — Sistem Informasi Audit Data",
    summary:
      "Sistem audit data pemakaman yang menggantikan pencocokan manual 47.000 baris Excel dengan mesin rekonsiliasi tiga tahap.",
    problem:
      "Dua berkas Excel berisi lebih dari 47.000 baris data pemakaman dicocokkan manual dengan VLOOKUP dan COUNTIF. Prosesnya lambat, rawan double-claim, dan tidak punya jejak yang bisa ditelusuri.",
    solution:
      "Mesin audit tiga tahap: exact match, pencocokan tahun berbeda, lalu fuzzy matching berbasis Levenshtein dengan penjaga agar satu baris cabang tidak pernah dipakai dua kali. Impor dan audit dijalankan lewat queue, dilengkapi RBAC tiga peran dan 59 test otomatis.",
    outcome:
      "Audit 47.000 baris selesai dalam 19–21 detik, 88,5% baris pusat memiliki pasangan pasti, dan nol baris cabang terpakai ganda.",
    role: "Backend Developer",
    tech: ["Laravel 13", "PHP 8.3", "MySQL 8", "Tailwind CSS", "Chart.js", "PHPUnit"],
    repo_url: "https://github.com/Rayshan10/SiAdit",
    demo_url: null,
    year: 2026,
    featured: true,
    thumbnail_url: null,
  },
  {
    slug: "logitrack",
    title: "LogiTrack — Monitoring Distribusi Barang",
    summary:
      "Sistem monitoring distribusi berbasis QR Code dengan metode SAW untuk menentukan prioritas pengiriman. Proyek tugas akhir.",
    problem:
      "Pencatatan status distribusi masih manual sehingga posisi barang tidak terlacak dan prioritas pengiriman ditentukan tanpa dasar yang terukur.",
    solution:
      "QR Code sebagai identitas unik tiap barang, riwayat status otomatis, dashboard KPI, dan implementasi Simple Additive Weighting (urgensi 40%, lama penyimpanan 35%, keterlambatan 25%) untuk merangking prioritas. Impor dataset massal dan ekspor laporan PDF.",
    outcome:
      "Seluruh perpindahan barang tercatat real-time, prioritas distribusi dihitung konsisten dari tiga kriteria, dan laporan siap cetak dihasilkan otomatis.",
    role: "Full-Stack Developer",
    tech: ["Laravel 12", "PHP 8.2", "MySQL", "Bootstrap 5", "Chart.js", "Simple QrCode", "DomPDF"],
    repo_url: "https://github.com/Rayshan10/LogiTrack",
    demo_url: null,
    year: 2026,
    featured: true,
    thumbnail_url: null,
  },
  {
    slug: "inventra",
    title: "Inventra — Manajemen Stok",
    summary:
      "Aplikasi manajemen stok web dan mobile dalam satu monorepo, terhubung lewat REST API.",
    problem:
      "Toko buku dan fotokopi mencatat stok di buku manual, sehingga selisih barang baru diketahui setelah stok habis.",
    solution:
      "Monorepo berisi web React + Vite, API Node.js/Express, dan aplikasi Flutter. Mencatat barang masuk/keluar, notifikasi real-time, dan sinkronisasi data lewat REST API.",
    outcome:
      "Pemilik toko bisa memantau stok dari web maupun ponsel dengan satu sumber data, tanpa pencatatan ganda.",
    role: "Full-Stack Developer",
    tech: ["React", "Vite", "Node.js", "Express.js", "Flutter", "REST API"],
    repo_url: "https://github.com/Rayshan10/Inventra",
    demo_url: null,
    year: 2025,
    featured: true,
    thumbnail_url: null,
  },
  {
    slug: "snapbooth",
    title: "SnapBooth — Self Photobooth",
    summary:
      "Aplikasi photobooth untuk event: foto, filter, cetak otomatis, softfile QR, GIF, dan panel admin.",
    problem:
      "Operator photobooth event harus mengurus pengambilan foto, pencetakan, dan distribusi softfile secara manual di tengah antrean pengunjung.",
    solution:
      "Aplikasi kiosk berbasis React + Vite dengan alur mandiri: pilih frame, ambil foto, filter, cetak, lalu unduh softfile lewat QR. Panel admin mengatur voucher, statistik, dan status printer. Cloudflare Tunnel memberi akses dari perangkat seluler.",
    outcome:
      "Pengunjung menyelesaikan seluruh alur tanpa operator, dan penyelenggara memantau pemakaian voucher serta kondisi printer dari satu dashboard.",
    role: "Full-Stack Developer",
    tech: ["React", "Vite", "JavaScript", "Cloudflare Tunnel"],
    repo_url: "https://github.com/Rayshan10/SnapBooth",
    demo_url: null,
    year: 2026,
    featured: true,
    thumbnail_url: null,
  },
  {
    slug: "sellora",
    title: "Sellora — Manajemen Penjualan",
    summary:
      "Sistem penjualan web dan mobile dengan autentikasi JWT, CRUD, filter tanggal, dan dashboard statistik.",
    problem:
      "Pencatatan penjualan tersebar dan sulit diringkas menjadi laporan harian yang bisa dipercaya.",
    solution:
      "Backend Node.js/Express + MongoDB dengan JWT, aplikasi Flutter untuk kasir, serta dashboard statistik dan filter tanggal untuk pemilik usaha.",
    outcome:
      "Data penjualan terpusat, laporan bisa difilter per tanggal, dan akses dibatasi per pengguna melalui JWT.",
    role: "Full-Stack Developer",
    tech: ["Flutter", "Node.js", "Express.js", "MongoDB", "JWT"],
    repo_url: "https://github.com/Rayshan10/Sellora",
    demo_url: null,
    year: 2025,
    featured: false,
    thumbnail_url: null,
  },
  {
    slug: "yummy",
    title: "Yummy — Reservasi Meja Restoran",
    summary:
      "Aplikasi reservasi meja berbasis CodeIgniter 4 dengan dashboard admin untuk mengelola seluruh reservasi.",
    problem:
      "Reservasi restoran dicatat lewat pesan pribadi sehingga jadwal bentrok dan kapasitas meja sulit dipantau.",
    solution:
      "Form reservasi terstruktur dengan validasi jadwal, plus dashboard admin untuk melihat, mengubah, dan membatalkan reservasi.",
    outcome:
      "Reservasi tercatat rapi dan bentrok jadwal bisa dicegah sebelum tamu datang.",
    role: "Web Developer",
    tech: ["CodeIgniter 4", "PHP", "MySQL"],
    repo_url: "https://github.com/Rayshan10/Yummy",
    demo_url: null,
    year: 2026,
    featured: false,
    thumbnail_url: null,
  },
  {
    slug: "bandungeats",
    title: "BandungEats — Resep Makanan Khas Bandung",
    summary:
      "Sistem informasi resep makanan khas Bandung berbasis web dengan pengelolaan konten di sisi admin.",
    problem:
      "Resep makanan khas Bandung tersebar di banyak sumber dan tidak terdokumentasi dalam satu tempat.",
    solution:
      "Katalog resep dengan pencarian, kategori, dan panel admin untuk menambah serta memperbarui data resep.",
    outcome:
      "Resep terkumpul dalam satu katalog yang mudah dicari dan diperbarui.",
    role: "Web Developer",
    tech: ["Laravel 12", "Blade", "MySQL"],
    repo_url: "https://github.com/Rayshan10/BandungEats",
    demo_url: null,
    year: 2026,
    featured: false,
    thumbnail_url: null,
  },
  {
    slug: "hydrodash",
    title: "HydroDash — Monitoring Kualitas Air",
    summary:
      "Pemantauan kualitas dan kuantitas air hidroponik secara real-time dari perangkat IoT.",
    problem:
      "Kondisi air hidroponik berubah cepat dan pengecekan manual tidak cukup untuk mencegah kerusakan tanaman.",
    solution:
      "Perangkat ESP32 mengirim pembacaan sensor ke endpoint web, lalu data ditampilkan sebagai metrik dan grafik waktu nyata.",
    outcome:
      "Kondisi air bisa dipantau dari jarak jauh dan masalah terdeteksi sebelum berdampak pada tanaman.",
    role: "Full-Stack Developer",
    tech: ["PHP", "ESP32", "IoT", "Realtime"],
    repo_url: "https://github.com/Rayshan10/HydroDash",
    demo_url: null,
    year: 2026,
    featured: false,
    thumbnail_url: null,
  },
];

export const fallbackExperiences: Experience[] = [
  {
    company: "Dinas Cipta Karya, Bina Konstruksi dan Tata Ruang Kota Bandung",
    role: "Backend Developer (Magang)",
    employment_type: "Magang",
    location: "Bandung, Indonesia",
    start_date: "2026-04-01",
    end_date: "2026-06-30",
    description:
      "Mengembangkan backend SiAdit, sistem informasi untuk sinkronisasi data pemakaman TPU Pandu.",
    highlights: [
      "Merancang autentikasi dan RBAC untuk tiga peran: admin, kepala TPU, dan kepala UPTD.",
      "Membangun mesin pencocokan dan klasifikasi otomatis untuk 47.000+ baris data dengan waktu audit 19–21 detik.",
      "Menutup pekerjaan dengan 59 test otomatis, termasuk regresi untuk tanggal nol dan double-claim.",
    ],
    tech: ["Laravel 13", "PHP 8.3", "MySQL", "PHPUnit"],
  },
  {
    company: "HIMATIF Universitas Logistik dan Bisnis Internasional",
    role: "Ketua Himpunan",
    employment_type: "Organisasi",
    location: "Bandung, Indonesia",
    start_date: "2025-05-01",
    end_date: "2026-06-30",
    description:
      "Memimpin 47 pengurus dalam 6 departemen selama periode kepengurusan 2025/2026.",
    highlights: [
      "Menginisiasi 21 program kerja dan 6 agenda kerja, termasuk pembaruan sistem kaderisasi.",
      "Membangun forum diskusi dan penyaluran aspirasi mahasiswa.",
      "Menjalin kolaborasi dengan himpunan di dalam dan luar kampus.",
    ],
    tech: ["Leadership", "Project Management", "Public Relations"],
  },
];

export const fallbackSkills: SkillGroup[] = [
  {
    category: "Bahasa",
    items: ["JavaScript", "TypeScript", "PHP", "Python", "Dart", "Java", "C++"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Flutter"],
  },
  {
    category: "Backend",
    items: ["Laravel", "Node.js", "Express.js", "CodeIgniter 4", "REST API", "GraphQL"],
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "SQLite"],
  },
  {
    category: "DevOps & Infra",
    items: ["Docker", "Nginx", "Linux", "Cloudflare", "Vercel"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Android Studio", "n8n"],
  },
];

export const fallbackCertifications: Certification[] = [
  {
    name: "Teknisi Muda Jaringan Komputer",
    issuer: "BNSP",
    issued_at: "2026-10-01",
    credential_url: null,
  },
  {
    name: "AI Agent for Programming",
    issuer: "Hacktiv8 Indonesia",
    issued_at: "2026-07-01",
    credential_url: null,
  },
  {
    name: "BC400 — Introduction to the ABAP Workbench",
    issuer: "SAP University Partnership Program",
    issued_at: "2025-07-01",
    credential_url: null,
  },
  {
    name: "SAP01 — SAP Overview",
    issuer: "SAP University Partnership Program",
    issued_at: "2024-01-01",
    credential_url: null,
  },
];
