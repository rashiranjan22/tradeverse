import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./StockChart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = "http://127.0.0.1:5000"; // Update with your backend URL

const StockChart = () => {
  const { symbol } = useParams(); // Get symbol from URL
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${API_URL}/nse/stock_prices?symbol=${symbol}`);

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();

        const dates = data.map(entry => entry.trade_date).reverse();
        const prices = data.map(entry => entry.close_price).reverse();

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: prices,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              tension: 0.3,
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <div className="stock-chart-container">
      <h2>{symbol} - Stock Price Chart</h2>
      {loading ? <p>Loading chart...</p> : <Line data={chartData} />}
    </div>
  );
};

export default StockChart;
