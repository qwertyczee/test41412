import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import clsx from 'clsx';

/**
 * SimpleBarChart Component: Renders a basic responsive bar chart using Recharts.
 *
 * Charts are inherently challenging for accessibility; consider alternatives or provide robust fallbacks.
 */
const SimpleBarChart = ({
  data,
  xAxisKey,
  barDataKeys,
  className,
  chartTitle,
}) => {
  // Define a basic color palette for bars - ensure good contrast between bars if stacked/grouped
  const barColors = [
    '#4f46e5',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#6b7280',
  ];

  return (
    // Apply className to the container div
    <div className={clsx('simple-bar-chart-container', className)}>
      {/* Optional Title */}
      {chartTitle && (
        <h4 className="text-lg font-semibold text-center mb-4 text-gray-700">
          {chartTitle}
        </h4>
      )}
      {/* Responsive Container ensures chart adapts to parent size */}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={data}
          margin={{
            top: 5,
            right: 5, // Reduced right margin
            left: 5, // Reduced left margin
            bottom: 5,
          }}
          // Consider adding role="figure" and aria-label/aria-labelledby if appropriate
        >
          {/* Grid adds visual reference lines */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          {/* X-axis displays labels based on xAxisKey */}
          <XAxis dataKey={xAxisKey} stroke="#6b7280" fontSize={12} />
          {/* Y-axis displays value scale */}
          <YAxis stroke="#6b7280" fontSize={12} />
          {/* Tooltip shows data on hover */}
          <Tooltip
            cursor={{ fill: 'rgba(229, 231, 235, 0.5)' }} // Light background on hover target
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              padding: '0.5rem',
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '0.25rem' }}
            itemStyle={{ fontSize: '0.875rem' }}
          />
          {/* Legend identifies the data series (bars) */}
          <Legend wrapperStyle={{ paddingTop: '15px' }} />
          {/* Render a Bar component for each key specified in barDataKeys */}
          {barDataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={barColors[index % barColors.length]} // Cycle through colors
              // Add accessibility attributes if possible (Recharts limitations)
              // role="img" // Bar itself represents data visually
              // aria-label={`${key}: ${/* How to get value here? */} on ${xAxisKey}`} // Difficult to implement dynamically in Recharts mapping
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

SimpleBarChart.propTypes = {
  /**
   * The data array for the chart.
   * Each object should contain keys matching xAxisKey and barDataKeys.
   * Example: [{ name: 'Jan', uv: 4000, pv: 2400 }, ...]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The key in the data objects to use for the X-axis labels.
   */
  xAxisKey: PropTypes.string.isRequired,
  /**
   * An array of keys in the data objects to use for the bars.
   * Each key will result in a separate bar or set of bars.
   */
  barDataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Optional CSS class name for the main container div.
   */
  className: PropTypes.string,
  /**
   * Optional title to display above the chart.
   */
  chartTitle: PropTypes.string,
};

SimpleBarChart.defaultProps = {
  className: '',
  chartTitle: null,
};

export default SimpleBarChart;
