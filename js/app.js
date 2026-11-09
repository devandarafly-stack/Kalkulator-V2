/**
 * CivilStruct Pro - Application Master Controller
 * Menghubungkan dan mengorkestrasi 6 Modul Utama Teknik Sipil:
 * 1. Balok & Kolom Beton (SNI 2847:2019)
 * 2. Gelagar Jembatan Komposit (SNI 1725:2016)
 * 3. Jembatan Kabel Pancang (UNTIDAR Metode IIIa & IIIb)
 * 4. Jembatan Gantung (UNTIDAR Mekanika Kabel Parabolik)
 * 5. Beban Gempa Statik Ekuivalen (SNI 1726:2019)
 * 6. Konverter Satuan & Formularium Teknik Sipil
 */

// Fungsi Global untuk Navigasi Tab
function switchTab(tabId) {
  // Sembunyikan semua tab content
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => {
    content.classList.add('hidden');
    content.classList.remove('block');
  });

  // Tampilkan tab yang dipilih
  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.classList.add('block');
  }

  // Update styling tombol tab
  const tabButtons = document.querySelectorAll('.nav-tab');
  tabButtons.forEach(btn => {
    btn.classList.remove('active', 'text-white', 'text-blue-400');
    btn.classList.add('text-slate-400');
  });

  const activeBtn = document.getElementById(`tabBtn-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.classList.remove('text-slate-400');
  }

  // Trigger recalculate & re-render canvas saat tab dibuka
  setTimeout(() => {
    if (tabId === 'modul-balok-kolom' && typeof BeamColumnModule !== 'undefined') {
      BeamColumnModule.calculate();
    } else if (tabId === 'modul-jembatan' && typeof BridgeEnterpriseModule !== 'undefined') {
      BridgeEnterpriseModule.calculate();
    } else if (tabId === 'modul-kabel-pancang' && typeof CableStayedModule !== 'undefined') {
      CableStayedModule.calculate();
    } else if (tabId === 'modul-jembatan-gantung' && typeof SuspensionBridgeModule !== 'undefined') {
      SuspensionBridgeModule.calculate();
    } else if (tabId === 'modul-gempa' && typeof SeismicModule !== 'undefined') {
      SeismicModule.calculate();
    }
  }, 40);
}

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Tanggal Cetak
  const elPrintDate = document.getElementById('printHeaderDate');
  if (elPrintDate) {
    const now = new Date();
    elPrintDate.innerText = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Inisialisasi Tombol Cetak / Simpan PDF
  const btnPrint = document.getElementById('btnPrintReport');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Inisialisasi 6 Modul Teknik Sipil
  if (typeof BeamColumnModule !== 'undefined') {
    BeamColumnModule.init();
  }

  if (typeof BridgeEnterpriseModule !== 'undefined') {
    BridgeEnterpriseModule.init();
  }

  if (typeof CableStayedModule !== 'undefined') {
    CableStayedModule.init();
  }

  if (typeof SuspensionBridgeModule !== 'undefined') {
    SuspensionBridgeModule.init();
  }

  if (typeof SeismicModule !== 'undefined') {
    SeismicModule.init();
  }

  if (typeof ConverterModule !== 'undefined') {
    ConverterModule.init();
  }

  console.log('CivilStruct Pro Suite (SNI 2847, SNI 1725, SNI 1726, UNTIDAR Bridges) Ready.');
});
