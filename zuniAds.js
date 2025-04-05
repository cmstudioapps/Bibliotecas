const ZuniAds = (function () {
  let ads = [];

  function init(adList) {
    const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

    ads = adList.filter(ad => {
      const expired = ad.expiration && today > ad.expiration;
      const alreadySeen = ad.once && localStorage.getItem('ZuniAd_' + hash(ad));
      return !expired && !alreadySeen;
    });

    if (ads.length === 0) return;

    const selectedAd = pickAd(ads);
    if (selectedAd) showAd(selectedAd);
  }

  function pickAd(ads) {
    const totalChance = ads.reduce((sum, ad) => sum + ad.chance, 0);
    const rand = Math.random() * totalChance;
    let cumulative = 0;

    for (const ad of ads) {
      cumulative += ad.chance;
      if (rand <= cumulative) return ad;
    }
    return null;
  }

  function showAd(ad) {
    if (ad.once) localStorage.setItem('ZuniAd_' + hash(ad), 'true');

    const modal = document.createElement('div');
    modal.innerHTML = `
      <div id="zuniAdModal" style="
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      ">
        <div style="
          position: relative;
          background: white;
          border-radius: 12px;
          max-width: 360px;
          width: 90%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          overflow: hidden;
          font-family: sans-serif;
        ">
          <button id="zuniAdClose" style="
            position: absolute;
            top: 8px;
            right: 12px;
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
          ">&times;</button>
          <img src="${ad.image}" alt="Ad" style="width: 100%; height: auto;">
          <div style="padding: 16px; text-align: center;">
            <h3 style="color: #007bff; font-size: 18px; margin: 8px 0;">${ad.title}</h3>
            <p style="color: #004080; font-size: 15px;">${ad.description}</p>
            <button id="zuniAdBtn" style="
              margin-top: 12px;
              background: #28a745;
              color: white;
              padding: 10px 16px;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: bold;
            ">Saiba mais</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('zuniAdBtn').onclick = () => {
      window.open(ad.link, '_blank');
      closeAd();
    };

    document.getElementById('zuniAdClose').onclick = closeAd;
    document.getElementById('zuniAdModal').onclick = (e) => {
      if (e.target.id === 'zuniAdModal') closeAd();
    };
  }

  function closeAd() {
    const modal = document.getElementById('zuniAdModal');
    if (modal) modal.remove();
  }

  function hash(ad) {
    return btoa(ad.image + ad.title + ad.description + ad.link).slice(0, 12);
  }

  return { init };
})();