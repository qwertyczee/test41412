
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    // Added space-y for consistent vertical spacing between sections
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12"> 
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">About Oratio</h1>

      {/* Adjusted padding and text color */}
      <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg"> 
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Oratio is dedicated to providing highly accurate and accessible transcription services.
          Our mission is to break down communication barriers by transforming spoken words into searchable,
          editable text, empowering individuals and businesses alike.
        </p>
      </section>

      <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Technology</h2>
        <p className="text-gray-700 leading-relaxed">
          We leverage state-of-the-art artificial intelligence and machine learning models to ensure
          fast, reliable, and precise transcriptions. Our technology is continuously improving
          to handle various accents, background noises, and specialized terminologies.
        </p>
      </section>

      <section className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">The Team</h2>
        <p className="text-gray-700 leading-relaxed">
          Oratio was founded by a passionate team of engineers, linguists, and AI experts committed
          to pushing the boundaries of speech recognition technology. We believe in the power of
          clear communication and strive to make our tools intuitive and effective for everyone.
          {/* (Placeholder: Add more specific team information if available). */}
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
