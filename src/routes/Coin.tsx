import {
  Link,
  useLocation,
  useParams,
  Outlet,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { IInfoData, IPriceData } from "../interfaces/coins";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet";
import { coinNameAtom } from "../atoms";
import { useRecoilState } from "recoil";

const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;
const Loader = styled.div`
  display: block;
  padding: 40px 0;
  text-align: center;
  font-size: 30px;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  padding: 0 10px;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0 20px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  overflow: hidden;
`;
const Tab = styled.span<{ isActive: boolean }>`
  display: block;
  width: 50%;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) =>
    props.isActive ? props.theme.textColor : props.theme.accentColor};
  opacity: ${(props) => (props.isActive ? 0.55 : 1)};
  a {
    display: block;
    padding: 10px;
    text-align: center;
  }
`;

interface IRouterState {
  state: {
    name: string;
    rank: number;
  };
}

function Coin() {
  const [coinName, setCoinName] = useRecoilState(coinNameAtom);
  const { coinId } = useParams();
  const { state } = useLocation() as IRouterState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  if (infoData) {
    console.log(infoData);
    setCoinName(infoData.name);
  }
  const { isLoading: tickerLoading, data: tickerData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTicker(coinId!),
    { refetchInterval: 5000 }
  ); //
  const loading = infoLoading || tickerLoading;
  return (
    <Container>
      <Helmet>
        <title>{coinName && coinName}</title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickerData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId: coinId }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
