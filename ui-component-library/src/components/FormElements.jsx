
import React, { useState } from 'react';

/**
 * A component showcasing various accessible form elements styled with Tailwind CSS.
 * Includes input fields, select dropdown, checkboxes, radio buttons, and a submit button.
 * Also includes basic examples of validation feedback.
 */
function FormElements() {
  const [textInputValue, setTextInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [textInputError, setTextInputError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInputValue(value);
    if (value.length > 0 && value.length < 3) {
      setTextInputError('Text must be at least 3 characters long.');
    } else {
      setTextInputError('');
    }
  };

   const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length > 0 && !emailPattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Elements Showcase</h2>

      {/* Text Input */}
      <div className="space-y-2">
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
          Text Input
        </label>
        <input
          type="text"
          id="text-input"
          name="text-input"
          placeholder="Enter text here..."
          value={textInputValue}
          onChange={handleTextInputChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${textInputError ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!textInputError}
          aria-describedby={textInputError ? 'text-input-error' : undefined}
        />
        {textInputError && <p id="text-input-error" className="mt-1 text-xs text-red-600">{textInputError}</p>}
        {/* Basic validation message implemented */}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
          Email Input
        </label>
        <input
          type="email"
          id="email-input"
          name="email-input"
          placeholder="you@example.com"
          value={emailValue}
          onChange={handleEmailChange}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" // Basic HTML5 validation pattern
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${emailError ? 'border-red-500' : 'border-gray-300'}`}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-input-error' : undefined}
        />
        {emailError && <p id="email-input-error" className="mt-1 text-xs text-red-600">{emailError}</p>}
        {/* Basic email validation added */}
      </div>

      {/* Select Dropdown */}
      <div className="space-y-2">
        <label htmlFor="select-input" className="block text-sm font-medium text-gray-700">
          Select Option
        </label>
        <select
          id="select-input"
          name="select-input"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue="" // Default value can be set here
          // Note: Custom select components offer more styling, but are complex. Sticking to native select for now.
        >
          <option value="" disabled>--Please choose an option--</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      {/* Checkboxes */}
      <fieldset className="space-y-2">
        <legend className="block text-sm font-medium text-gray-700">Checkboxes</legend>
        <div className="mt-1 space-y-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="checkbox1"
                name="checkbox-group"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                aria-describedby="checkbox1-description" // Link to description
              />
              {/* Accessibility description added and linked */}
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="checkbox1" className="font-medium text-gray-700">Checkbox Option 1</label>
              <p id="checkbox1-description" className="text-gray-500 text-xs">This provides more context for the first checkbox.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="checkbox2"
                name="checkbox-group"
                type="checkbox"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="checkbox2" className="font-medium text-gray-700">Checkbox Option 2</label>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Radio Buttons */}
      <fieldset className="space-y-2">
        <legend className="block text-sm font-medium text-gray-700">Radio Buttons</legend>
        <div className="mt-1 space-y-2">
          <div className="flex items-center">
            <input
              id="radio1"
              name="radio-group" // Ensure same name for grouping
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              // Note: Robust state management is needed for real forms. This is a showcase.
            />
            <label htmlFor="radio1" className="ml-3 block text-sm font-medium text-gray-700">Radio Option A</label>
          </div>
          <div className="flex items-center">
            <input
              id="radio2"
              name="radio-group" // Ensure same name for grouping
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="radio2" className="ml-3 block text-sm font-medium text-gray-700">Radio Option B</label>
          </div>
        </div>
      </fieldset>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          // Example: disable the button based on validation state
          // disabled={!!textInputError || !!emailError}
        >
          Submit Form
        </button>
        {/* Disabled state styling added */}
      </div>
    </div>
  );
}

export default FormElements;
