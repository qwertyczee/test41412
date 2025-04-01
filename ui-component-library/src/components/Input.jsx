import React, { useId } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Input = React.forwardRef(
  (
    {
      id: providedId,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      disabled = false,
      error = null,
      required = false,
      className = '',
      containerClassName = '', // Add class for the container div
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = error ? `${id}-error` : undefined;

    // Base styles for the input element
    const baseInputClasses =
      'block w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none text-gray-900 placeholder:text-gray-400';

    // Styles based on state (normal, error, disabled)
    const focusClasses =
      'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
    const disabledClasses =
      'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed';
    const errorClasses = error
      ? 'border-red-500 text-red-700 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300';

    return (
      <div className={clsx('mb-4', containerClassName)}>
        {' '}
        {/* Apply container class */}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref} // Forward ref to the input element
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'} // Indicate invalid state
          aria-describedby={errorId} // Link to error message if present
          className={clsx(
            baseInputClasses,
            focusClasses,
            errorClasses,
            disabledClasses,
            className // Allow custom classes for the input itself
          )}
          {...props} // Pass down any other native input props
        />
        {error && (
          // Error message with ID linked by aria-describedby
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; // Add display name

Input.propTypes = {
  /**
   * Unique identifier for the input and its label. Auto-generated if not provided.
   */
  id: PropTypes.string,
  /**
   * Text label displayed above the input.
   */
  label: PropTypes.string,
  /**
   * The type of the input element (e.g., 'text', 'password', 'email', 'number', 'search').
   */
  type: PropTypes.string,
  /**
   * Placeholder text shown when the input is empty.
   */
  placeholder: PropTypes.string,
  /**
   * The current value of the input. Usually required for controlled components.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Callback function executed when the input value changes. Usually required for controlled components.
   */
  onChange: PropTypes.func,
  /**
   * Disables the input field if true.
   */
  disabled: PropTypes.bool,
  /**
   * Error message to display below the input. If present, applies error styling and aria-invalid.
   */
  error: PropTypes.string,
  /**
   * Marks the input field as required, displaying an asterisk (*) next to the label and setting the required attribute.
   */
  required: PropTypes.bool,
  /**
   * Additional CSS classes to apply specifically to the input element.
   */
  className: PropTypes.string,
  /**
   * Additional CSS classes to apply to the container div wrapping the label, input, and error message.
   */
  containerClassName: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  disabled: false,
  required: false,
  error: null,
  className: '',
  containerClassName: '',
  // `value` and `onChange` often don't have defaults as they depend on usage (controlled/uncontrolled)
};

export default Input;
