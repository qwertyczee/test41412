
import React, { useId } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FaChevronDown } from 'react-icons/fa'; // Using react-icons for the arrow


const Select = React.forwardRef(({
  id: providedId,
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  error = null,
  required = false,
  placeholderOption = '', // Default to no placeholder unless specified
  className = '', // Class for the select element itself
  containerClassName = '', // Class for the wrapping div
  ...props
}, ref) => {
  // Generate IDs for label association and error description
  const generatedId = useId();
  const selectId = providedId || generatedId;
  const errorId = error ? `${selectId}-error` : undefined;

  // Base styles for the select element
  const baseStyles =
    'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none appearance-none bg-white'; // Added bg-white

  // Conditional styles
  const normalStyles =
    'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900';
  const errorStyles =
    'border-red-500 text-red-700 placeholder-red-700 focus:ring-red-500 focus:border-red-500'; // Adjusted text color
  const disabledStyles =
    'bg-gray-100 cursor-not-allowed opacity-70 text-gray-500';

  return (
    <div className={clsx('mb-4', containerClassName)}> {/* Apply container class */}
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref} // Forward ref
          id={selectId}
          name={selectId} // Often helpful for form submission
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-describedby={errorId}
          aria-invalid={!!error}
          className={clsx(
            baseStyles,
            error ? errorStyles : normalStyles,
            disabled && disabledStyles,
            'pr-10', // Ensure enough padding for the arrow icon
            className // Apply the passed className to the select element
          )}
          {...props}
        >
          {/* Render placeholder only if provided */}
          {placeholderOption && (
             // Placeholder should be disabled if the field is required and no value is selected
            <option value="" disabled={required && !value} hidden={!placeholderOption}>
              {placeholderOption}
            </option>
          )}
          {/* Render actual options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Arrow icon positioned absolutely */}
        <div className={clsx(
          "pointer-events-none absolute inset-y-0 right-0 flex items-center px-3",
           disabled ? 'text-gray-400' : 'text-gray-700'
         )}>
           <FaChevronDown className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      {/* Error message linked by aria-describedby */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  /**
   * Unique identifier. Auto-generated if not provided.
   */
  id: PropTypes.string,
  /**
   * Label text displayed above the select.
   */
  label: PropTypes.string.isRequired,
  /**
   * Array of option objects. Each object needs `value` and `label`.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * The currently selected value. Should match one of the option values.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Function called when the selection changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Disables the select field.
   */
  disabled: PropTypes.bool,
  /**
   * Error message to display below. Activates error styling.
   */
  error: PropTypes.string,
  /**
   * Marks the field as required. Adds asterisk and potentially affects placeholder.
   */
  required: PropTypes.bool,
  /**
   * Text for the optional placeholder/disabled first option.
   */
  placeholderOption: PropTypes.string,
  /**
   * Additional CSS classes for the `<select>` element.
   */
  className: PropTypes.string,
  /**
   * Additional CSS classes for the container `div`.
   */
  containerClassName: PropTypes.string,
};

Select.defaultProps = {
  options: [],
  disabled: false,
  required: false,
  placeholderOption: '', // No placeholder by default
  className: '',
  containerClassName: '',
};

export default Select;
