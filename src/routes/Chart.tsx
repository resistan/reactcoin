import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistoty } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { coinNameAtom, isDarkAtom } from "../atoms";
import { IChartProps, IHistoryData } from "../interfaces/chart";
import styled from "styled-components";

const ErrorMessage = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  color: red;
`;

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const coinName = useRecoilValue(coinNameAtom);
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistoryData[] | any>(
    ["ohlcv", coinId],
    () => fetchCoinHistoty(coinId)
  );
  // console.log(data);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : data ? (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data.map((arr: IHistoryData) => ({
                  x: new Date(arr.time_open).toLocaleString(),
                  y: [arr.open, arr.high, arr.low, arr.close],
                })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              toolbar: { show: false },
              height: 300,
              width: 500,
              background: "transparent",
            },
            title: {
              text: `${coinName} Chart`,
              align: "left",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#df2f17",
                  downward: "#045fc1",
                },
              },
            },
            annotations: {
              xaxis: [
                {
                  x: "Oct 06 14:00",
                  borderColor: "#00E396",
                  label: {
                    borderColor: "#00E396",
                    style: {
                      fontSize: "12px",
                      color: "#fff",
                      background: "#00E396",
                    },
                    orientation: "horizontal",
                    offsetY: 7,
                    text: "Annotation Test",
                  },
                },
              ],
            },
            tooltip: {
              enabled: true,
            },
            xaxis: {
              labels: {
                show: false,
              },
            },
            yaxis: {
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      ) : (
        <ErrorMessage>
          <p>Data not found</p>
        </ErrorMessage>
      )}
    </>
  );
};;;;
export default Chart;
