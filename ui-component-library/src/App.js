// Removed default imports logo and App.css
import ShowcasePage from './ShowcasePage.jsx'; // Import the main showcase page
import './index.css'; // Ensure Tailwind styles are globally available if not already in index.js

function App() {
  return (
    // Render the ShowcasePage component as the root of the application
    <ShowcasePage />
  );
}

export default App;
