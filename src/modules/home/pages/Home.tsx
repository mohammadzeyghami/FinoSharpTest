import LayoutPrimary from "@/components/sections/layouts/LayoutPrimary";
import NavbarPrimary from "@/components/sections/navbar/Primary";
import { useEffect, useState } from "react";
// @ts-ignore
import TradingViewWidget from "react-tradingview-widget";
import { useTheme } from "@/components/molecules/providers/ThemeProvider";

// Define the type for a candlestick data item
interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const HomePage = () => {
  const { theme } = useTheme(); // Access the current theme

  const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);

  useEffect(() => {
    // Fetch data from Binance API
    const fetchCandlestickData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1440" // Get latest 1440 data points (1-minute intervals for the last 24 hours)
        );
        const data: any[] = await response.json();

        // Transform the data into a format suitable for TradingView
        const transformedData: CandlestickData[] = data.map((item) => ({
          time: item[0] / 1000, // Convert milliseconds to seconds for TradingView
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
          volume: parseFloat(item[5]),
        }));

        setCandlestickData(transformedData);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    };

    fetchCandlestickData();
  }, []);

  return (
    <LayoutPrimary navbar={<NavbarPrimary />}>
      {/* TradingView Widget */}
      <TradingViewWidget
        symbol="BINANCE:BTCUSDT" // Use the BINANCE:BTCUSDT symbol
        interval="1" // 1-minute interval
        timezone="Etc/UTC"
        theme={theme} // Use the current theme from context
        locale="en"
        autosize
        datafeed={{
          onReady: (
            callback: (config: { supported_resolutions: string[] }) => void
          ) => callback({ supported_resolutions: ["1"] }),
          resolveSymbol: (
            symbol: string,
            onSymbolResolvedCallback: (symbolInfo: any) => void
          ) => {
            onSymbolResolvedCallback({
              name: symbol,
              ticker: symbol,
              type: "crypto",
              session: "24x7",
              timezone: "Etc/UTC",
              minmov: 1,
              pricescale: 100,
              has_intraday: true,
              supported_resolutions: ["1"],
            });
          },
          getBars: (
            onHistoryCallback: (
              bars: CandlestickData[],
              meta: { noData: boolean }
            ) => void,
            onErrorCallback: (message: string) => void
          ) => {
            if (candlestickData.length > 0) {
              // Call the callback with candlestick data
              onHistoryCallback(candlestickData, { noData: false });
            } else {
              onErrorCallback("No data available"); // Handle no data error
            }
          },
        }}
      />
    </LayoutPrimary>
  );
};

export default HomePage;
