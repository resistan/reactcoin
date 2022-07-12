import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinTicker } from "../api";

interface IChartProps {
  coinId: string | undefined;
}

const Price = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery("price", () => fetchCoinTicker(coinId));
  console.log(data);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ul>
          <li>ATH Price: {data.quotes.USD.ath_price}</li>
          <li>
            Current Price: {data.quotes.USD.price}(
            {data.quotes.USD.percent_change_24h > 0 ? "🔺" : "🔻"}{" "}
            {data.quotes.USD.percent_change_24h}% in 24H)
          </li>
          <li>
            Market Cap: {data.quotes.USD.market_cap}(
            {data.quotes.USD.market_cap_change_24h > 0 ? "🔺" : "🔻"}{" "}
            {data.quotes.USD.market_cap_change_24h} in 24H)
          </li>
        </ul>
      )}
    </>
  );
};
export default Price;
