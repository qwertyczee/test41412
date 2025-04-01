
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white pt-20 pb-16 md:pt-32 md:pb-28 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Accurate AI Transcription with Oratio
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Get fast, reliable, and highly accurate transcriptions for your audio and video files. Supports multiple languages and formats.
          </p>
          <Link
            to="/transcribe"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-md text-base transition duration-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Oratio?
        </h2>
        {/* Increased gap and added padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 px-4 md:px-0">
          {/* Feature 1 */}
          {/* Changed background, added hover effect */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center"> 
            <div className="text-4xl mb-4 text-blue-500">⚡️</div> 
            <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
            <p className="text-gray-700 leading-relaxed">
              Get your transcripts back in minutes, not hours. Our AI works quickly to process your files.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="text-4xl mb-4 text-green-500">🎯</div>
            <h3 className="text-xl font-semibold mb-2">High Accuracy</h3>
            <p className="text-gray-700 leading-relaxed">
              Leveraging state-of-the-art AI models for industry-leading transcription accuracy.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="text-4xl mb-4 text-purple-500">🌍</div> 
            <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
            <p className="text-gray-700 leading-relaxed">
              Transcribe audio in various languages with support for more being added continuously.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the power of AI transcription today. Upload your file and see the magic happen.
          </p>
          <Link
            to="/transcribe"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md text-base transition duration-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Start Transcribing Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
