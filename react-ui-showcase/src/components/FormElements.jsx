
import React, { useState } from 'react';
import './FormElements.css';

function FormElements() {
  // State for controlled components
  const [textInput, setTextInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [radioOption, setRadioOption] = useState('option1');
  const [selectedOption, setSelectedOption] = useState('default');
  const [textareaValue, setTextareaValue] = useState(''); // Add state for textarea
  const [errors, setErrors] = useState({}); // State for validation errors

  // Basic form validation example
  const validateForm = () => {
    const newErrors = {};
    if (!textInput.trim()) {
      newErrors.textInput = 'Text input cannot be empty.';
    }
    // Add more validation rules here (e.g., for email, password formats)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Form submission logic
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // If validation passes:
      console.log('Form submitted:', { textInput, isChecked, radioOption, selectedOption, textareaValue });
      // Actual submission logic (e.g., API call) would go here
      alert('Form submitted successfully!'); // Placeholder feedback
    } else {
      console.log('Form validation failed:', errors);
      // Optionally provide feedback to the user about validation errors
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Form Elements Showcase</h2>

      {/* Text Input */}
      <div className="form-group">
        <label htmlFor="text-input">Text Input:</label>
        <input
          type="text"
          id="text-input"
          name="textInput"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter text here"
          aria-label="Text Input Field"
          required // Basic HTML5 validation
          className={errors.textInput ? 'error' : ''} // Add error class if needed
        />
        {errors.textInput && <p className="error-message">{errors.textInput}</p>}
      </div>

      {/* Checkbox */}
      <div className="form-group form-group-inline">
        <input
          type="checkbox"
          id="checkbox-input"
          name="checkboxInput"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          aria-labelledby="checkbox-label"
        />
        <label htmlFor="checkbox-input" id="checkbox-label">I agree to the terms</label>
      </div>

      {/* Radio Buttons */}
      <fieldset className="form-group">
        <legend>Choose an option:</legend>
        <div className="form-group-inline">
          <input
            type="radio"
            id="radio-option1"
            name="radioGroup"
            value="option1"
            checked={radioOption === 'option1'}
            onChange={(e) => setRadioOption(e.target.value)}
            aria-label="Option 1"
          />
          <label htmlFor="radio-option1">Option 1</label>
        </div>
        <div className="form-group-inline">
          <input
            type="radio"
            id="radio-option2"
            name="radioGroup"
            value="option2"
            checked={radioOption === 'option2'}
            onChange={(e) => setRadioOption(e.target.value)}
            aria-label="Option 2"
          />
          <label htmlFor="radio-option2">Option 2</label>
        </div>
      </fieldset>

      {/* Select Dropdown */}
      <div className="form-group">
        <label htmlFor="select-input">Select Dropdown:</label>
        <select
          id="select-input"
          name="selectInput"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          aria-label="Select an option"
        >
          <option value="default" disabled>-- Select an option --</option>
          <option value="item1">Item 1</option>
          <option value="item2">Item 2</option>
          <option value="item3">Item 3</option>
        </select>
      </div>

      {/* Textarea */}
      <div className="form-group">
          <label htmlFor="textarea-input">Textarea:</label>
          <textarea
              id="textarea-input"
              name="textareaInput"
              rows="4"
              placeholder="Enter details here..."
              aria-label="Text Area Input"
              value={textareaValue} // Bind value to state
              onChange={(e) => setTextareaValue(e.target.value)} // Add onChange handler
          ></textarea>
      </div>

      {/* Submit Button */}
      <div className="form-group">
        <button type="submit" className="submit-button">Submit Form</button>
      </div>
    </form>
  );
}

export default FormElements;
