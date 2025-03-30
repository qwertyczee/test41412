
import React from 'react';

// Reusable Label Component
export function Label({ htmlFor, children, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}

// Reusable Input Component
export function Input({ id, type = 'text', placeholder, value, onChange, 'aria-label': ariaLabel, className = '', ...props }) {
  return (
    <input
      id={id}
      name={id} // Often helpful to have name match id
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel || placeholder} // Use placeholder as fallback aria-label
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
      {...props}
    />
  );
}

// Reusable Checkbox Component
export function Checkbox({ id, label, checked, onChange, 'aria-label': ariaLabel, labelClassName = '', inputClassName = '', wrapperClassName = '' }) {
  return (
    <div className={`flex items-center ${wrapperClassName}`}>
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel || label}
        className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${inputClassName}`}
      />
      <Label htmlFor={id} className={`ml-2 text-sm text-gray-900 ${labelClassName}`}>
        {label}
      </Label>
    </div>
  );
}

// Reusable Radio Button Component
export function Radio({ id, name, label, value, checked, onChange, 'aria-label': ariaLabel, labelClassName = '', inputClassName = '', wrapperClassName = '' }) {
  return (
    <div className={`flex items-center ${wrapperClassName}`}>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel || label}
        className={`h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${inputClassName}`}
      />
      <Label htmlFor={id} className={`ml-2 block text-sm text-gray-900 ${labelClassName}`}>
        {label}
      </Label>
    </div>
  );
}
