import React, { useId } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const Textarea = React.forwardRef(
  (
    {
      id: providedId,
      label,
      placeholder,
      value,
      onChange,
      disabled = false,
      error = null,
      required = false,
      rows = 4,
      className = '', // Class for the textarea element
      containerClassName = '', // Class for the wrapping div
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = error ? `${id}-error` : undefined;

    // Base styles
    const baseClasses =
      'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-gray-900 placeholder:text-gray-400';

    // Conditional styles
    const borderClasses = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500';
    const disabledClasses = disabled
      ? 'bg-gray-100 cursor-not-allowed opacity-50 text-gray-500'
      : '';

    return (
      <div className={clsx('mb-4', containerClassName)}>
        {' '}
        {/* Apply container class */}
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label} {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref} // Forward ref
          id={id}
          name={id} // Typically name attribute is same as id for forms
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          className={clsx(
            baseClasses,
            borderClasses,
            disabledClasses,
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  /**
   * Unique identifier for the textarea and its label. Auto-generated if not provided.
   */
  id: PropTypes.string,
  /**
   * Text label displayed above the textarea.
   */
  label: PropTypes.string,
  /**
   * Placeholder text shown when the textarea is empty.
   */
  placeholder: PropTypes.string,
  /**
   * The current value of the textarea. Usually required for controlled components.
   */
  value: PropTypes.string,
  /**
   * Callback function triggered on value change. Usually required for controlled components.
   */
  onChange: PropTypes.func,
  /**
   * Whether the textarea is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Error message to display below the textarea. If present, indicates an error state.
   */
  error: PropTypes.string,
  /**
   * Whether the textarea is required. Adds a visual indicator if label is present.
   */
  required: PropTypes.bool,
  /**
   * The number of visible text lines for the control.
   */
  rows: PropTypes.number,
  /**
   * Additional CSS classes to apply to the textarea element.
   */
  className: PropTypes.string,
  /**
   * Additional CSS classes to apply to the container div.
   */
  containerClassName: PropTypes.string,
};

Textarea.defaultProps = {
  rows: 4,
  disabled: false,
  required: false,
  error: null,
  className: '',
  containerClassName: '',
};

export default Textarea;
