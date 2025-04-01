
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'; // Import Tailwind styles

// Import Layout and Page Components
import Layout from './components/layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import TranscriptionPage from './pages/TranscriptionPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import PricingPage from './pages/PricingPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import App from './App.tsx'; // Import App for potential root error element or other config

// Define an error page component (simple example)
const ErrorPage = () => (
  <div className="text-center p-10">
    <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>Not Found or other error</i>
    </p>
  </div>
);

// Configure the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the main structure
    errorElement: <ErrorPage />, // Basic error handling
    children: [
      { index: true, element: <HomePage /> }, // Default page at "/"
      { path: "transcribe", element: <TranscriptionPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "contact", element: <ContactPage /> },
      // Add other nested routes here if needed in the future
    ],
  },
  // You could add other top-level routes here if they don't use the main Layout
  // Example: { path: "/login", element: <LoginPage /> }
]);

// Render the app using the RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
