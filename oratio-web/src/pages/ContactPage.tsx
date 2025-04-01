
import React from 'react';
import ContactForm from '../components/ContactForm'; // Import the new form component

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Contact Us</h1>

      {/* Adjusted gap and padding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"> 
        {/* Contact Info Section */}
         {/* Adjusted padding, shadow */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Have questions about our services or pricing? Need help with your account?
            Reach out to us using the form or the details below.
          </p>
          <div className="space-y-3">
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:support@oratio.example.com" className="text-indigo-600 hover:underline">support@oratio.example.com</a> (Placeholder)
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Innovation Drive, Tech City, TX 75001 (Placeholder)
            </p>
             {/* Add more contact methods if needed, e.g., phone number */}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:col-span-1">
          {/* Render the ContactForm component */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
