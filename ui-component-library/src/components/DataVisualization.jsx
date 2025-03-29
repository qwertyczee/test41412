
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Ensure chart.js and react-chartjs-2 are installed

/**
 * DataVisualization Component
 *
 * Renders a container for displaying charts or graphs.
 * Intended to be integrated with a charting library.
 *
 * Props:
 *   chartType (string): Type of chart to render (e.g., 'bar', 'line', 'pie').
 *   data (object): Data object compatible with the chosen charting library.
 *   options (object): Configuration options for the chart.
 */
const DataVisualization = ({ chartType = 'bar', data, options }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer.current && data) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      // Integrate Chart.js
      // Ensure 'chart.js' is installed (already done).
      chartInstance.current = new Chart(ctx, {
        type: chartType, // 'line', 'bar', 'pie', etc.
        data: data,       // Data object conforming to Chart.js structure
        options: options  // Options object conforming to Chart.js structure
      });

    } else if (chartContainer.current) {
        // Clear canvas if no data is provided
        const ctx = chartContainer.current.getContext('2d');
        ctx.clearRect(0, 0, chartContainer.current.width, chartContainer.current.height);
        if (chartInstance.current) {
            chartInstance.current.destroy(); // Ensure previous chart is destroyed
            chartInstance.current = null;
        }
         // Optionally display a message when no data is available
        ctx.fillStyle = '#6b7280'; // gray-500
        ctx.textAlign = 'center';
        ctx.font = '16px Arial';
        ctx.fillText('No data available for chart.', chartContainer.current.width / 2, chartContainer.current.height / 2);
    }

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartType, data, options]); // Re-run effect if props change

  return (
    <div className="w-full h-64 md:h-96 bg-gray-50 border border-gray-200 p-4 rounded-lg shadow">
      {/* Canvas element for the chart */}
      <canvas ref={chartContainer} className="w-full h-full"></canvas>
      {/* Fallback content or loading state could be managed here */}
    </div>
  );
};

export default DataVisualization;
