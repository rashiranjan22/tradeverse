import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// const API_URL = "http://127.0.0.1:5000";  // Remove `/auth/api`

Chart.register(...registerables); // Required for Chart.js v3+

const PortfolioProgress = () => {
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:5000/progress/api/portfolio_progress", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: "include", // If Flask uses session authentication (important)
        })
        .then(response => {
            console.log("Response Headers:", response.headers); // Debugging line
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            console.log("API Response:", data); // Debugging Line
            if (!data || !data.length) {
                console.error("No data received!");
                return;
            }
    
            const labels = data.map(entry => entry.date);
            const values = data.map(entry => entry.value);
    
            setChartData({
                labels,
                datasets: [
                    {
                        label: "Portfolio Value Over Time",
                        data: values,
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                        tension: 0.4,
                    },
                ],
            });
        })
        .catch(error => console.error("Error fetching portfolio data:", error));
    }, []);
    
    

    return (
        <div>
            <h2>Portfolio Progress</h2>
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading graph...</p>
            )}
        </div>
    );
};

export default PortfolioProgress;
