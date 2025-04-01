import React from 'react';
import Layout from './components/Layout';
import ShowcasePage from './pages/ShowcasePage'; // Import the ShowcasePage
import './App.css'; // For any global non-utility styles

function App() {
  return (
    <Layout>
      {/* Render the ShowcasePage inside the Layout */}
      <ShowcasePage />
    </Layout>
  );
}

export default App;
