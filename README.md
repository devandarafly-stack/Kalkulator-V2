# CivilStruct Pro - Structural & Bridge Engineering Suite

**CivilStruct Pro** adalah aplikasi web interaktif teknik sipil tingkat profesional yang dirancang khusus untuk analisis rekayasa mekanika struktur bangunan gedung dan jembatan berdasarkan standar **Standar Nasional Indonesia (SNI)** terkini dan Kurikulum Analisis Struktur Jembatan **Universitas Tidar (UNTIDAR)**.

Aplikasi ini difokuskan murni pada perhitungan mekanika teknik, evaluasi kapasitas elemen struktural, analisis pembebanan dinamis/statis, serta visualisasi grafik dan penampang interaktif berbasis HTML5 Canvas secara real-time.

---

## 🏛️ Standar Acuan Teknis & Kurikulum
1. **SNI 2847:2019** - *Persyaratan Beton Struktural untuk Bangunan Gedung dan Penjelasan*.
2. **SNI 1725:2016** - *Pembebanan untuk Jembatan (BTR, BGT, Truk TT 500 kN, Faktor Dinamis DLA/FBD)*.
3. **SNI 1726:2019** - *Tata Cara Perencanaan Ketahanan Gempa untuk Struktur Bangunan Gedung dan Non-Gedung*.
4. **Kurikulum Analisis Struktur Jembatan (Universitas Tidar)**:
   - Jembatan Kabel Pancang (*Cable-Stayed Bridge*): Metode 1 Sudut Memusat (Pertemuan IIIb) & Metode 2 Sudut Seragam Konstan 45° Harp (Pertemuan IIIa).
   - Jembatan Gantung (*Suspension Bridge*): Formulasi Kabel Parabola Utama, Kabel Tepi Backstay, Penggantung Vertikal Hangers, dan Sudut Kritis Keseimbangan.

---

## 🌟 Struktur Navigasi Tab (Total 6 Modul Analisis)

### 1. Modul 1: Analisis Balok & Kolom Beton Bertulang (SNI 2847:2019)
- **Input Parameter**: Dimensi penampang ($b, h$), selimut beton ($d'$), mutu beton ($f'_c$), mutu baja ($f_y$), diameter tulangan utama ($D$) & sengkang ($d_v$), jumlah tulangan ($n$), gaya dalam terfaktor ($M_u, V_u, P_u$).
- **Output & Verifikasi**:
  - Penentuan faktor reduksi kekuatan lentur ($\phi$) dinamis berdasarkan regangan tarik baja ekstrim $\epsilon_t$ ($\phi = 0.65 - 0.90$).
  - Kedalaman blok tegangan ekuivalen Whitney ($a$) dan posisi sumbu netral penampang ($c$).
  - Kapasitas momen nominal terfaktor ($\phi M_n$).
  - Kapasitas geser beton ($V_c$) dengan pengaruh gaya aksial tekan $P_u$ ($V_c = 0.17 [1 + P_u/(14 A_g)] \sqrt{f'_c} b d$) dan kontribusi sengkang ties ($V_s$).
  - Status keselamatan penampang dan progress bar rasio utilitas beban.
- **Dual Visualizer Canvas**:
  - **Visualizer Penampang Balok**: Menggambar penampang beton, sengkang ties, posisi titik tulangan tarik & tekan, blok tegangan Whitney ($a$), garis netral ($c$), dan dimensi ukuran.
  - **Visualizer Kurva Interaksi P-M**: Menghasilkan kurva interaksi $\phi P_n - \phi M_n$ kolom secara live lengkap dengan plot titik kerja aktual $(M_u, P_u)$.

---

### 2. Modul 2: Gelagar Jembatan Komposit & Pembebanan (SNI 1725:2016)
- **Input Parameter**: Bentang jembatan ($L$), Beban Mati Sendiri ($MS$), Beban Mati Tambahan ($MA$), Beban Lajur Terbagi Rata ($BTR / q$), Beban Garis Terpusat ($BGT / P$), Beban Truk Gandar "TT" 500 kN, Faktor Beban Dinamis ($DLA / FBD$), Modulus Elastisitas ($E$), dan Inersia Penampang ($I_{xx}$).
- **Output & Verifikasi**:
  - Kombinasi Pembebanan Kuat I (Ultimate): Momen Maksimum terfaktor ($M_u$) dan Geser Maksimum terfaktor ($V_u$).
  - Lendutan aktual midspan bentang ($\delta_{\max}$) kondisi layan (Service I).
  - Pengecekan limitasi lendutan ijin jembatan lalu lintas: $\delta_{\text{ijin}} = L / 800$.
- **Visualisasi SFD, BMD & Deflection Canvas**:
  - Diagram Gaya Geser (*Shear Force Diagram* - SFD) dan Diagram Momen Lentur (*Bending Moment Diagram* - BMD).
  - Profil kurva lendutan elastis balok gelagar sepanjang bentang.
  - *Interactive cursor hover tooltip* menampilkan koordinat $x$, nilai gaya geser $V(x)$, momen $M(x)$, dan lendutan $\delta(x)$ secara akurat.

---

### 3. Modul 3: Jembatan Kabel Pancang (Cable-Stayed Bridge - Kurikulum UNTIDAR)
Mendukung 2 Metode Analisis Geometri Kabel Kurikulum Praktikum UNTIDAR:
- **Kapasitas Tarik Ijin 1 Kabel (Berlaku Semua Opsi)**:
  $$P_{\text{kabel}} = \sigma_s \cdot \left[0.25 \cdot \pi \cdot \left(\frac{D}{1000}\right)^2\right] \cdot 1000 \quad [\text{kN}]$$
- **Opsi A: Sudut Memusat / Berbeda Per Segmen (Pertemuan IIIb)**:
  - Tinggi Pilar di atas Gelagar: $H_{\text{pilar}} = \tan(\alpha_1) \cdot (L_{\text{main}} / 2) \quad [\text{m}]$
  - Iterasi dari luar ke pilar ($i = 1, 2, \dots$):
    - Kabel 1: $x_1 = L_{\text{main}} / 2$, $\alpha_1 = \text{input}$
    - Kabel $i > 1$: $x_i = x_{i-1} - \Delta L_{i-1}$, $\alpha_i = \arctan(H_{\text{pilar}} / x_i)$
    - Segmen pikul: $\Delta L_i = (P_{\text{kabel}} \cdot \sin \alpha_i) / q \quad [\text{m}]$
    - Panjang fisik kabel: $L_{\text{kabel}, i} = \sqrt{H_{\text{pilar}}^2 + x_i^2} \quad [\text{m}]$
    - **Syarat Berhenti Kritis**: Loop dihentikan sebelum sisa bentang bernilai negatif ($x_i < \Delta L_i$ atau $x_i \le 0$). Menghasilkan tepat **6 kabel valid** pada parameter standar tanpa kabel berjarak negatif.
    - Total Panjang 1 Sisi: $1.613,64\text{ m}$; Total 4 Sisi: $6.454,58\text{ m}$.
- **Opsi B: Sudut Seragam / Konstan 45° Harp Arrangement (Pertemuan IIIa)**:
  - Segmen pikul standar: $\Delta L = (P_{\text{kabel}} \cdot \sin 45^\circ) / q \quad [\text{m}]$
  - Jumlah kabel per sisi: $N_{\text{kabel}} = \lceil(L_{\text{main}} / 2) / \Delta L\rceil$ (Dibulatkan ke atas = **8 kabel**)
  - Panjang segmen gelagar terbagi rata: $\text{segmen} = (L_{\text{main}} / 2) / N_{\text{kabel}} = 28,125\text{ m}$
  - Koordinat dan panjang kabel ($i = 1 \dots N$):
    - Jarak simpul di gelagar: $x_i = \text{segmen} \cdot (i - 0.5) \quad [\text{m}]$
    - Ketinggian jangkar pylon: $y_i = x_i \cdot \tan(45^\circ) = x_i \quad [\text{m}]$
    - Panjang kabel: $L_{\text{kabel}, i} = \sqrt{x_i^2 + y_i^2} \quad [\text{m}]$
    - Total Panjang 1 Sisi: $1.272,79\text{ m}$; Total 4 Sisi: $5.091,17\text{ m}$.
- **Visualisasi Canvas HTML5 Jembatan 2-Pylon**:
  - Menggambar secara adaptif: sistem kabel memusat (*Fan pattern*) pada Opsi A dan sistem kabel bertingkat sejajar (*Harp pattern*) pada Opsi B.
  - Dilengkapi 2 Pylon Merah proporsional, Gelagar Lantai Hijau, Abutment Kuning, dan Aliran Air Sungai Teal.

---

### 4. Modul 4: Analisis Jembatan Gantung (Suspension Bridge - Kurikulum UNTIDAR)
- **Parameter Input**: Beban Merata Lantai/Gelagar ($q$), Bentang Utama Tengah ($L$), Lendutan Sag Kabel Utama ($f$), Tegangan Ijin Baja Kabel ($\sigma_s$), Sudut Kabel Tepi Backstay ($\alpha$), Jarak Horizontal Backstay ke Abutment ($x_{\text{tepi}}$), dan Tinggi Pilar ($h_{\text{pilar}}$).
- **Formulasi & Algoritma Perhitungan**:
  - Rasio Sag: $n = f / L$
  - Gaya Horisontal Kabel: $H = \frac{q \cdot L^2}{8 \cdot f} \quad [\text{kN}]$
  - Gaya Tarik Maksimum Kabel Tengah: $T = H \cdot \sqrt{1 + 16 \cdot n^2} \quad [\text{kN}]$
  - Gaya Tarik Kabel Tepi: $T^* = \frac{H}{\cos(\alpha \cdot \pi / 180)} \quad [\text{kN}]$
  - Dimensi Diameter Kabel (Pembulatan ke atas mm terdekat):
    - Luas & Diameter Kabel Tengah: $A_{\text{tengah}} = \frac{T}{\sigma_s \cdot 1000}$, $d_{\text{tengah}} = \lceil\sqrt{4 A / \pi} \cdot 1000\rceil \quad [\text{mm}]$
    - Luas & Diameter Kabel Tepi: $A_{\text{tepi}} = \frac{T^*}{\sigma_s \cdot 1000}$, $d_{\text{tepi}} = \lceil\sqrt{4 A / \pi} \cdot 1000\rceil \quad [\text{mm}]$
  - Kebutuhan Panjang Fisik Kabel:
    - $L_{\text{tengah}} = L \cdot (1 + \frac{8}{3} n^2) \quad [\text{m}]$
    - $L_{\text{tepi}} = \sqrt{x_{\text{tepi}}^2 + h_{\text{pilar}}^2} \quad [\text{m}]$
    - $L_{\text{total}} = 2 \cdot L_{\text{tepi}} + L_{\text{tengah}} \quad [\text{m}]$
  - Sudut Keseimbangan Kritis: $\alpha_{\text{kritis}} = \arccos(H / T) \cdot \frac{180}{\pi} \quad [\text{derajat}]$
- **Visualisasi Canvas HTML5 Jembatan Gantung**:
  - 2 Pilar Pylon Merah, Kabel Utama Parabolik Putih/Baja ($y = 4f(x/L)(1 - x/L)$), Kabel Tepi Backstay lurus ke Abutment Penambat Kuning, Garis Hanger Vertikal ke Gelagar Lantai Hijau, dan Aliran Sungai Teal dengan efek gelombang halus.

---

### 5. Modul 5: Analisis Beban Gempa Statik Ekuivalen (SNI 1726:2019)
- **Parameter Spektra Gempa**:
  - Kelas situs tanah ($S_A, S_B, S_C, S_D, S_E, S_F$).
  - Akselerasi batuan dasar $S_s$ (0.2s) dan $S_1$ (1.0s).
  - Koefisien situs $F_a$ dan $F_v$ otomatis (Tabel 5 & 6 SNI).
  - Spektrum desain percepatan: $S_{DS} = \frac{2}{3} F_a S_s$ dan $S_{D1} = \frac{2}{3} F_v S_1$.
  - Kategori Desain Seismik (**KDS A - F**).
- **Gaya Geser Dasar & Distribusi Vertikal**:
  - Periode alami pendekatan $T_a = C_t \cdot h_n^x$.
  - Koefisien respons seismik $C_s$ terpakai dengan batas $C_{s,\max}$ dan $C_{s,\min}$.
  - Geser dasar seismik total $V = C_s \cdot W$.
  - Distribusi vertikal gaya gempa lateral per lantai ($F_x$) dan geser tingkat ($V_x$).
- **Visualisasi Canvas Elevasi Gedung**:
  - Elevasi portal gedung 2D bertingkat dengan vektor panah horizontal gaya gempa $F_x$ proporsional di setiap lantai.

---

### 6. Modul 6: Konverter Satuan & Formularium Teknik Sipil
- **Konverter 2 Arah Real-Time**:
  - $\text{MPa} \leftrightarrow \text{kg/cm}^2$ (Tegangan & Kuat Tekan Beton)
  - $\text{kN} \leftrightarrow \text{Ton force}$ (Gaya Aksial & Beban Luar)
  - $\text{kNm} \leftrightarrow \text{Ton}\cdot\text{m}$ (Momen Lentur)
- **Formularium Lengkap**: Bank formula praktis mencakup SNI 2847:2019, SNI 1725:2016, Jembatan Kabel Pancang UNTIDAR, Jembatan Gantung UNTIDAR, dan SNI 1726:2019.

---

## 💻 Struktur Folder & File

```
analisa struktur bangunan dan jembatan/
│
├── index.html                   # Antarmuka utama aplikasi (6 modul navigasi & kop print PDF)
├── css/
│   └── styles.css               # Tema Dark Mode Tailwind, custom canvas styles, & CSS @media print
├── js/
│   ├── beam-column.js           # Modul 1: Balok, Kolom, phi dinamis, Geser, Kurva P-M
│   ├── bridge-enterprise.js     # Modul 2: Gelagar Jembatan, Kuat I, Truk 500kN, SFD/BMD, Deflection
│   ├── cable-stayed.js          # Modul 3: Analisis Iteratif Jembatan Kabel Pancang (UNTIDAR Opsi A & B)
│   ├── suspension-bridge.js     # Modul 4: Analisis Jembatan Gantung (UNTIDAR Kabel Utama & Backstay)
│   ├── seismic-sni.js           # Modul 5: Gempa Statik Ekuivalen SNI 1726, KDS, Fx, Elevasi Gedung
│   ├── converter.js             # Modul 6: Konverter Satuan Interaktif
│   └── app.js                   # Master Controller aplikasi & print handler
└── README.md                    # Dokumentasi teknis & panduan operasional
```

---

## 🚀 Panduan Menjalankan Aplikasi

Aplikasi dibangun murni menggunakan teknologi web modern (**HTML5 Canvas**, **Tailwind CSS**, **FontAwesome Icons**, **Vanilla JavaScript**) tanpa dependensi *node_modules* yang berat.

1. Buka File Explorer ke folder proyek:
   `D:\DEVAN\APLIKOM\aplikasi\analisa struktur bangunan dan jembatan`
2. Klik ganda file `index.html` untuk langsung membukanya di browser apa pun (Google Chrome, Microsoft Edge, Firefox, Safari).
3. Untuk mencetak atau mengekspor tampilan analisis ke PDF, klik tombol **"Cetak Laporan (PDF)"** di pojok kanan atas. Output cetak telah dioptimalkan secara otomatis dengan CSS `@media print` berlatar putih bersih dengan Kop Dokumen resmi.
