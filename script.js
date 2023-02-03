const fetchDollarCurrency = async () => {
  const url = 'https://economia.awesomeapi.com.br/last/USD-BRL';

  const fetchURL = await fetch(url);
  const data = await fetchURL.json();
  return data.USDBRL;
};

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

const financeDolarContainer = document.querySelector(
  '.finance-custom__dolar-container'
);

const createDollarDiv = async () => {
  const dollarPrice = await fetchDollarCurrency();

  console.log(dollarPrice);
  const dollarPriceData = `
    <div class="finance-custom__dolar-content">
      <span class="financebar-custom__dolar-icon">
      <svg width="28" height="30" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="finance-custom__dolar-svg">
        <g filter="url(#filter0_d_187_3041)">
        <path d="M14 6.75V8.25" stroke="#42C920" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 15.75V17.25" stroke="#42C920" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 21C18.9706 21 23 16.9706 23 12C23 7.02944 18.9706 3 14 3C9.02944 3 5 7.02944 5 12C5 16.9706 9.02944 21 14 21Z" stroke="#42C920" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.75 15.75H15.125C15.6223 15.75 16.0992 15.5525 16.4508 15.2008C16.8025 14.8492 17 14.3723 17 13.875C17 13.3777 16.8025 12.9008 16.4508 12.5492C16.0992 12.1975 15.6223 12 15.125 12H12.875C12.3777 12 11.9008 11.8025 11.5492 11.4508C11.1975 11.0992 11 10.6223 11 10.125C11 9.62772 11.1975 9.15081 11.5492 8.79917C11.9008 8.44754 12.3777 8.25 12.875 8.25H16.25" stroke="#42C920" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <filter id="filter0_d_187_3041" x="0.25" y="2.25" width="27.5" height="27.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_187_3041"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_187_3041" result="shape"/>
        </filter>
        </defs>
      </svg>
      </span>
      <span class="financebar-custom__dolar-currency">Dólar &nbsp;-</span>
      <span class="financebar-custom__dolar-price">${parseFloat(
        dollarPrice.ask
      ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
    </div>
    <span class="financebar-custom__dolar-bar"></span>
    `;

  financeDolarContainer.innerHTML = dollarPriceData;
};

const marketShared = async () => {
  const marketShareData = await fetchMarketShare();

  const createMarketShare = marketShareData
    .map((asset, index) => {
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
            } - </span>
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
          <span class="financebar-custom__marketshare-bar">&nbsp;</span>
          `;
    })
    .join('');

  financeContainer.innerHTML = createMarketShare;
};

createDollarDiv();
marketShared().then(() => {
  $(document)
    .ready(function () {
      $('.financebar-custom__container').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        dots: false,
        variableWidth: true,
        draggable: false,
        centerPadding: '10px',
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
      });
    })
    .on('beforeChange', function () {
      let width = $(
        '.financebar-custom__container .slick-current'
      ).outerWidth();
      let speed = (width * 3000) / 200;
      $('.financebar-custom__container').slick('setOption', 'speed', speed);
    });
});
