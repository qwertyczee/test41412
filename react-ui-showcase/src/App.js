import React from 'react';
import './App.css';
import ShowcasePage from './pages/ShowcasePage'; // Import the ShowcasePage

function App() {
  return (
    <div className="App">
      {/* Render the ShowcasePage instead of the default header */}
      <ShowcasePage />
    </div>
  );
}

export default App;
