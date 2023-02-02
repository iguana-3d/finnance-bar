const fetchMarketShare = async () => {
  const url =
    'https://brapi.dev/api/quote/VALE3,ABEV3,PETR4,TOTS3,RAIZ4,ITUB4,ELET3,MGLU3,AMER3,B3SA3,BBAS3,BBDC4,PRIO3,BPAC11,RENT3,PETR3,HAPV3,ASAI3,RAIL3,INBR32,NTCO3,GGBR4';

  const fetchURL = await fetch(url);
  const data = await fetchURL.json();
  return data.results;
};

const financeContainer = document.querySelector(
  '.financebar-custom__container'
);

const marketShared = async () => {
  let marketShareData = await fetchMarketShare();

  const createMarketShare = marketShareData.map((asset, index) => {
    const classMarketShareVariation =
      asset.regularMarketChange > 0
        ? 'financebar-custom__marketshare-variation--positive'
        : asset.regularMarketChange < 0
        ? 'financebar-custom__marketshare-variation--negative'
        : 'financebar-custom__marketshare-variation--neutral';
    return `
          <div class="financebar-custom__marketshare" data-asset="${index}">
          <span class="financebar-custom__marketshare-assets"> ${
            asset.symbol
          } </span>
          <span class="financebar-custom__marketshare-price"> ${asset.regularMarketPrice.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
          )} </span>
          <span class="financebar-custom__marketshare-variation ${classMarketShareVariation}">
          ${
            asset.regularMarketChange.toFixed(2) > 0 ? '+' : ''
          }${asset.regularMarketChange.toFixed(2)}%
          </span>
          </div>
          <span class="financebar-custom__marketshare-bar">&nbsp;</span>`;
  });

  financeContainer.innerHTML = createMarketShare;

  const marketsharedDiv = document.querySelector(`[data-asset="10"]`);
  console.log(marketsharedDiv);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      console.log(entries);
    },
    {
      threshold: 0,
    }
  );

  intersectionObserver.observe(marketsharedDiv);
};

marketShared();

// let transition = 0;

// setInterval(() => {
//   transition = transition - 10;
//   financeContainer.style.transform = `translateX(${transition}px)`;
// }, 75);