const BASE_COIN_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = () =>
  fetch(`${BASE_COIN_URL}/coins`).then((response) => response.json());

export const fetchCoinInfo = (coinId: string | undefined) =>
  fetch(`${BASE_COIN_URL}/coins/${coinId}`).then((response) => response.json());

export const fetchCoinTicker = (coinId: string | undefined) =>
  fetch(`${BASE_COIN_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );

export const fetchCoinHistoty = (coinId: string | undefined) => {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
};
