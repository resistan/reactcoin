import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinTicker } from "../api";
import { IPriceProps } from "../interfaces/coins";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { coinNameAtom } from "../atoms";

const PriceList = styled.ul`
  margin: 1em 0;
  padding-left: 2em;
  li {
    display: flex;
    flex-flow: row wrap;
    margin: 0.5em 0;
    > span:first-child {
      width: 50%;
      padding: 0 0 5px;
      &:before {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        margin: 4px 0;
        border: 4px solid transparent;
        border-left-color: ${(props) => props.theme.textColor};
      }
    }
    span:nth-child(2) {
      width: 50%;
    }
    span:nth-child(3) {
      padding-left: 50%;
      font-size: 0.75em;
    }
  }
`;
const UpdateInfo = styled.p`
  text-align: right;
  font-size: 0.85em;
  color: gray;
`;

const Price = () => {
  const { coinId } = useOutletContext<IPriceProps>();
  const { isLoading, data } = useQuery("price", () => fetchCoinTicker(coinId));
  // console.log(data);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <PriceList>
            <li>
              <span>All Time High Price</span>{" "}
              <span>${data.quotes.USD.ath_price}</span>
            </li>
            <li>
              <span>Current Price</span>
              <span>${data.quotes.USD.price}</span>
            </li>
            <li>
              <span>Price from ATH</span>
              <span>
                {data.quotes.USD.percent_from_price_ath > 0 ? (
                  <span className="up">⬆</span>
                ) : (
                  <span className="down">⬇</span>
                )}{" "}
                {data.quotes.USD.percent_from_price_ath}%
              </span>
            </li>
            <li>
              <span>Price Change 24 Hours</span>
              <span>
                {data.quotes.USD.percent_change_24h > 0 ? (
                  <span className="up">⬆</span>
                ) : (
                  <span className="down">⬇</span>
                )}{" "}
                {data.quotes.USD.percent_change_24h}%
              </span>
            </li>
            <li>
              <span>Price Change 7 Days</span>
              <span>
                {data.quotes.USD.percent_change_7d > 0 ? (
                  <span className="up">⬆</span>
                ) : (
                  <span className="down">⬇</span>
                )}{" "}
                {data.quotes.USD.percent_change_7d}%
              </span>
            </li>
            <li>
              <span>Price Change 1 Year</span>
              <span>
                {data.quotes.USD.percent_change_1y > 0 ? (
                  <span className="up">⬆</span>
                ) : (
                  <span className="down">⬇</span>
                )}{" "}
                {data.quotes.USD.percent_change_1y}%
              </span>
            </li>
            <li>
              <span>Market Capitalization</span>{" "}
              <span>{data.quotes.USD.market_cap}</span>
            </li>
          </PriceList>
          <UpdateInfo>
            Last updated: {new Date(data.last_updated).toLocaleString()}
          </UpdateInfo>
        </>
      )}
    </>
  );
};
export default Price;
