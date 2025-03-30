
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DashboardWidget = ({ title, fetchUrl, pollingInterval = 10000 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();
    
    // Set up polling if interval provided
    let intervalId;
    if (pollingInterval > 0) {
      intervalId = setInterval(fetchData, pollingInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchUrl, pollingInterval]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="text-sm font-medium text-gray-500">{key}</div>
              <div className="text-xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DashboardWidget.propTypes = {
  title: PropTypes.string,
  fetchUrl: PropTypes.string.isRequired,
  pollingInterval: PropTypes.number
};

export default DashboardWidget;
