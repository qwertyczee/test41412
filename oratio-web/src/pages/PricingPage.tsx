
import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Free Tier */}
        <div className="border rounded-lg shadow-lg p-6 flex flex-col bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Free</h2>
          <p className="text-center text-gray-500 mb-6">Perfect for occasional use</p>
          <p className="text-4xl font-bold text-center mb-6">$0<span className="text-xl font-normal">/month</span></p>
          <ul className="space-y-2 mb-8 flex-grow text-gray-700">
            <li>✓ Up to 30 mins transcription/month</li>
            <li>✓ Standard Accuracy</li>
            <li>✓ Basic Support</li>
            <li>- Advanced Features</li>
          </ul>
          <button className="mt-auto w-full bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200">
            Current Plan (Disabled)
          </button>
        </div>

        {/* Pro Tier */}
        {/* Added slight scale on hover for emphasis */}
        <div className="border border-indigo-500 rounded-lg shadow-xl p-6 flex flex-col bg-white relative transform hover:scale-105 transition-transform duration-300">
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Most Popular</span>
          <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-700">Pro</h2>
          <p className="text-center text-gray-600 mb-6">Ideal for professionals & teams</p>
          <p className="text-4xl font-bold text-center mb-6">$15<span className="text-xl font-normal text-gray-500">/month</span></p>
          <ul className="space-y-2 mb-8 flex-grow text-gray-700">
            <li>✓ Up to 500 mins transcription/month</li>
            <li>✓ High Accuracy</li>
            <li>✓ Priority Support</li>
            <li>✓ Advanced Features (Speaker Diarization)</li>
          </ul>
          <button className="mt-auto w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200">
            Upgrade Now
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="border rounded-lg shadow-lg p-6 flex flex-col bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4">Enterprise</h2>
          <p className="text-center text-gray-600 mb-6">For large organizations</p>
          <p className="text-4xl font-bold text-center mb-6">Custom</p> {/* Keep Custom as is */}
          <ul className="space-y-2 mb-8 flex-grow text-gray-700">
            <li>✓ Unlimited Transcription</li>
            <li>✓ Highest Accuracy & Custom Models</li>
            <li>✓ Dedicated Support & SLA</li>
            <li>✓ API Access & Integrations</li>
          </ul>
          <button className="mt-auto w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-200">
            Contact Sales
          </button>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
