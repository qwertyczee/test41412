
import React from 'react';
import PropTypes from 'prop-types';
import './DataVisualization.css';

/**
 * DataVisualization Component
 * Renders charts or graphs based on provided data.
 * Designed for integration with charting libraries or basic SVG rendering.
 */
const DataVisualization = ({ data, type = 'bar', options = {}, isLoading, error }) => {
  // Rendering logic using a charting library (e.g., Chart.js, D3.js) or SVG would go here.
  // The current implementation provides a basic SVG bar chart placeholder.

  // Example placeholder rendering:
  const renderPlaceholder = () => {
    // Add loading and error states based on props
    if (isLoading) {
      return <div className="data-viz-placeholder">Loading chart...</div>;
    }
    if (error) {
      return <div className="data-viz-placeholder">Error loading chart: {typeof error === 'string' ? error : 'Unknown error'}</div>;
    }
    if (!data || data.length === 0) {
      return <div className="data-viz-placeholder">No data available.</div>;
    }

    // Basic SVG bar chart example (very rudimentary)
    if (type === 'bar') {
      const maxValue = Math.max(...data.map(item => item.value));
      const barWidth = 80 / data.length; // Simple width calculation

      return (
        <svg width="100%" height="200" className="data-viz-svg">
          <g transform="translate(10, 10)"> {/* Padding */}
            {data.map((item, index) => (
              <rect
                key={item.label}
                x={index * barWidth + '%'}
                y={180 - (item.value / maxValue) * 170} // Scale height
                width={barWidth - 2 + '%'} // Bar width with gap
                height={(item.value / maxValue) * 170}
                fill="steelblue"
              />
              {/* Labels and axes would be added here for a more complete chart */}
            ))}
          </g>
        </svg>
      );
    }

    return <div className="data-viz-placeholder">Chart type '{type}' not implemented yet.</div>;
  };

  // Add CSS classes for loading/error states
  const containerClasses = `data-visualization-container ${isLoading ? 'loading' : ''} ${error ? 'error' : ''}`;

  return (
    <div className={containerClasses}>
      <h2>Data Visualization ({type})</h2>
      {/* Placeholder is rendered below. Replace with actual chart implementation. */}
      {renderPlaceholder()}
      {/* Customization options (titles, legends, tooltips) depend on the chosen library/implementation. */}
      {/* Integration with libraries like Chart.js or D3.js would replace the placeholder logic. */}
    </div>
  );
};

DataVisualization.propTypes = {
  /**
   * The data array to visualize. Structure depends on the chart type.
   * Example for bar chart: [{ label: 'A', value: 10 }, { label: 'B', value: 20 }]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * The type of chart to render (e.g., 'bar', 'line', 'pie').
   */
  type: PropTypes.string,
  /**
   * Configuration options for the chart (passed to the charting library or used for SVG).
   */
  options: PropTypes.object,
  /** Optional loading state indicator */
  isLoading: PropTypes.bool,
  /** Optional error object or message */
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DataVisualization;
