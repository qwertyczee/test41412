
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const DataVisualization = ({ data = [], title }) => {
  // Validate data format
  const isValidData = Array.isArray(data) && 
                     data.every(item => item && item.name && typeof item.value === 'number');

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="w-full h-96">
        {isValidData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Invalid or missing data</p>
          </div>
        )}
      </div>
    </div>
  );
};

DataVisualization.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  title: PropTypes.string
};

export default DataVisualization;
