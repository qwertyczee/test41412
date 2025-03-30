
import React, { useState } from 'react';

const FormElements = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    options: '',
    remember: false
  });

  const validateField = (name, value) => {
    const newErrors = {...errors};
    
    if (!value && typeof value !== 'boolean') {
      newErrors[name] = 'This field is required';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors[name] = 'Invalid email format';
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: fieldValue
    });

    if (touched[name]) {
      validateField(name, fieldValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({...touched, [name]: true});
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(name => {
      setTouched({...touched, [name]: true});
      validateField(name, formData[name]);
    });

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData); // Replace with actual form submission
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      {/* Text Input */}
      <div className={`space-y-1 ${touched['username'] && errors['username'] ? 'border-l-4 border-red-500 pl-3' : ''}`}>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="Enter username"
        />
        {touched['username'] && errors['username'] && (
          <p className="mt-1 text-sm text-red-600">{errors['username']}</p>
        )}
      </div>

      {/* Email Input */}
      <div className={`space-y-1 ${touched['email'] && errors['email'] ? 'border-l-4 border-red-500 pl-3' : ''}`}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          placeholder="Enter email"
        />
        {touched['email'] && errors['email'] && (
          <p className="mt-1 text-sm text-red-600">{errors['email']}</p>
        )}
      </div>

      {/* Checkbox */}
      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={formData.remember}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>

      {/* Radio Buttons */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="flex items-center">
          <input
            id="option1"
            name="options"
            type="radio"
            value="option1"
            checked={formData.options === 'option1'}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="option1" className="ml-2 block text-sm text-gray-700">
            Option 1
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="option2"
            name="options"
            type="radio"
            value="option2"
            checked={formData.options === 'option2'}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="option2" className="ml-2 block text-sm text-gray-700">
            Option 2
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default FormElements;
