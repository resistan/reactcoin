import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinHistoty } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { coinNameAtom, isDarkAtom } from "../atoms";
import { IChartProps, IHistoryData } from "../interfaces/chart";

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistoryData[]>(["ohlcv", coinId], () =>
    fetchCoinHistoty(coinId)
  );
  // console.log(data);

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ReactApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              toolbar: { show: false },
              height: 300,
              width: 500,
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close) ?? [],
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (val) => `$${val.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </>
  );
};;;
export default Chart;
