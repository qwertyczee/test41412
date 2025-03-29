
import React, { useState } from 'react'; // Import useState

// Import all components
import NavigationBar from './components/NavigationBar';
import Card from './components/Card';
import FormElements from './components/FormElements';
import ModalDialog from './components/ModalDialog';
import SliderCarousel from './components/SliderCarousel';
import ButtonCTA from './components/ButtonCTA';
import DashboardWidget from './components/DashboardWidget';
import Notification from './components/Notification';
import Accordion from './components/Accordion';
import DataVisualization from './components/DataVisualization';

// --- Helper Icon ---
const SampleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- Basic chart data and options for demonstration ---
const sampleChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sample Dataset',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(59, 130, 246, 0.5)', // blue-500 with opacity
      borderColor: 'rgba(59, 130, 246, 1)', // blue-500
      borderWidth: 1,
      tension: 0.1 // Make line chart slightly curved
    },
  ],
};

const sampleChartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Important for sizing within container
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false, // Hide legend for a cleaner look in showcase
    },
    tooltip: {
      enabled: true, // Enable tooltips on hover
    }
  }
};


function ShowcasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal example
  const [showNotification, setShowNotification] = useState(false); // State for Notification example

  // --- Helper function for smooth scrolling ---
  const navigateTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Basic smooth scrolling implemented
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar /> {/* Links are for display; nav functionality depends on routing setup */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">UI Component Showcase</h1>
          <p className="mt-1 text-sm text-gray-600">
             {/* Links to jump to sections added */}
            Explore the reusable components: {' '}
             <a href="#navigation-bar" onClick={(e) => { e.preventDefault(); navigateTo('navigation-bar'); }} className="text-blue-600 hover:underline">Nav</a> |
             <a href="#card" onClick={(e) => { e.preventDefault(); navigateTo('card'); }} className="text-blue-600 hover:underline">Card</a> |
             <a href="#form-elements" onClick={(e) => { e.preventDefault(); navigateTo('form-elements'); }} className="text-blue-600 hover:underline">Forms</a> |
             <a href="#modal-dialog" onClick={(e) => { e.preventDefault(); navigateTo('modal-dialog'); }} className="text-blue-600 hover:underline">Modal</a> |
             <a href="#slider-carousel" onClick={(e) => { e.preventDefault(); navigateTo('slider-carousel'); }} className="text-blue-600 hover:underline">Slider</a> |
             <a href="#button-cta" onClick={(e) => { e.preventDefault(); navigateTo('button-cta'); }} className="text-blue-600 hover:underline">Buttons</a> |
             <a href="#dashboard-widget" onClick={(e) => { e.preventDefault(); navigateTo('dashboard-widget'); }} className="text-blue-600 hover:underline">Widget</a> |
             <a href="#notification" onClick={(e) => { e.preventDefault(); navigateTo('notification'); }} className="text-blue-600 hover:underline">Notify</a> |
             <a href="#accordion" onClick={(e) => { e.preventDefault(); navigateTo('accordion'); }} className="text-blue-600 hover:underline">Accordion</a> |
             <a href="#data-visualization" onClick={(e) => { e.preventDefault(); navigateTo('data-visualization'); }} className="text-blue-600 hover:underline">Chart</a>
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* NavigationBar Section */}
            <section id="navigation-bar" className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Navigation Bar</h2>
              <p className="text-sm text-gray-600 mb-4">A responsive navigation bar with mobile toggle.</p>
              <NavigationBar />
              <p className="mt-4 text-xs text-gray-500">Customization: Modify props for logo, links, and styling via Tailwind.</p>
            </section>

            {/* Card Section */}
            <section id="card" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Card</h2>
              <p className="text-sm text-gray-600 mb-4">A versatile card component for displaying content.</p>
              <Card title="Example Card" content="This is the content area of the card component." imageUrl="https://via.placeholder.com/150/7c3aed/ffffff?text=Card" />
              <p className="mt-4 text-xs text-gray-500">Customization: Pass title, content, and optional imageUrl props. Style with Tailwind.</p>
            </section>

            {/* Form Elements Section */}
            <section id="form-elements" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Form Elements</h2>
              <p className="text-sm text-gray-600 mb-4">A collection of styled form inputs and controls, with basic validation examples.</p>
              <FormElements />
              <p className="mt-4 text-xs text-gray-500">Customization: Standard form element attributes apply. Basic validation feedback added.</p>
               {/* Validation states demonstrated */}
            </section>

            {/* Modal Dialog Section */}
            <section id="modal-dialog" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Modal Dialog</h2>
              <p className="text-sm text-gray-600 mb-4">A modal dialog component for pop-up information or actions, with transitions and focus trap.</p>
              <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Open Modal
              </button>
              <ModalDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Sample Modal">
                {/* Content for the modal */}
                <div className="mt-2">
                  <p id="modal-content-desc" className="text-sm text-gray-500"> {/* Ensure ID matches aria-describedby */}
                    This is the content inside the modal. Press Esc or click the close button to dismiss. Focus is trapped within the modal.
                  </p>
                </div>
                 <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
                    >
                      Close
                    </button>
                     {/* Add other actions if needed */}
                  </div>
              </ModalDialog>
              <p className="mt-4 text-xs text-gray-500">Customization: Control visibility with `isOpen` prop. Pass `onClose`, optional `title`, and `children` for content.</p>
            </section>

            {/* Slider Carousel Section */}
            <section id="slider-carousel" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Slider/Carousel</h2>
              <p className="text-sm text-gray-600 mb-4">A component for cycling through images or content with fade transitions.</p>
              <SliderCarousel items={[
                <img src="https://via.placeholder.com/400x200/8B5CF6/ffffff?text=Slide+1" alt="Slide 1" className="w-full h-48 object-cover rounded"/>,
                <img src="https://via.placeholder.com/400x200/EC4899/ffffff?text=Slide+2" alt="Slide 2" className="w-full h-48 object-cover rounded"/>,
                <img src="https://via.placeholder.com/400x200/10B981/ffffff?text=Slide+3" alt="Slide 3" className="w-full h-48 object-cover rounded"/>
              ]} />
              <p className="mt-4 text-xs text-gray-500">Customization: Pass an array of React nodes as items. Style controls with Tailwind. Currently uses fade effect.</p>
              {/* Different transition effects like sliding are deferred */}
            </section>

            {/* Button/CTA Section */}
            <section id="button-cta" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Button/CTA</h2>
              <p className="text-sm text-gray-600 mb-4">Buttons for actions and calls to action with different styles, states, and icons.</p>
              <div className="flex flex-wrap gap-2">
                <ButtonCTA label="Primary" variant="primary" onClick={() => alert('Primary clicked!')} />
                <ButtonCTA label="Secondary" variant="secondary" onClick={() => alert('Secondary clicked!')} />
                <ButtonCTA label="Danger" variant="danger" onClick={() => alert('Danger clicked!')} />
                <ButtonCTA label="Disabled" variant="primary" disabled={true} />
                <ButtonCTA label="Sec Disabled" variant="secondary" disabled={true} />
                <ButtonCTA label="Dng Disabled" variant="danger" disabled={true} />
                <ButtonCTA label="Primary Loading" variant="primary" isLoading={true} />
                <ButtonCTA label="With Icon" variant="secondary" iconStart={<SampleIcon />} onClick={() => alert('Icon button clicked!')} />
              </div>
              <p className="mt-4 text-xs text-gray-500">Customization: Use variant, label, onClick, disabled, isLoading, iconStart, iconEnd props.</p>
              {/* 'danger' variant, loading state, and icon demonstrated */}
            </section>

            {/* Dashboard Widget Section */}
            <section id="dashboard-widget" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Dashboard Widget</h2>
              <p className="text-sm text-gray-600 mb-4">A widget container for displaying key metrics or summaries, with icon and chart examples.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DashboardWidget title="Revenue" value="$1,250" icon={<SampleIcon />} />
                <DashboardWidget title="Users" value="345" icon={<span>👥</span>}/> {/* Basic text icon */}
                <DashboardWidget title="User Growth" value="+15%" icon={<SampleIcon />}>
                   <div className="h-16"> {/* Container for small chart */}
                      <DataVisualization chartType="line" data={sampleChartData} options={{...sampleChartOptions, maintainAspectRatio: false, scales: { x: { display: false }, y: { display: false }}, plugins: { legend: { display: false}, tooltip: { enabled: false}}}} />
                   </div>
                </DashboardWidget>
                <DashboardWidget title="Tasks Pending" value="12"/>
              </div>
              <p className="mt-4 text-xs text-gray-500">Customization: Pass title, value, and optional icon props. Children can be used for charts or other content.</p>
              {/* Widget with icon and mini-chart demonstrated */}
            </section>

            {/* Notification Section */}
            <section id="notification" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Notification</h2>
              <p className="text-sm text-gray-600 mb-4">Component for displaying notifications with different types, dismiss options, and animations.</p>
               <button onClick={() => setShowNotification(true)} className="mb-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:opacity-50" disabled={showNotification}>
                   {showNotification ? 'Notification Visible...' : 'Show Auto-Dismiss Notification (5s)'}
               </button>
              <div className="space-y-2 relative min-h-[60px]"> {/* Added relative positioning and min-height */}
                 {/* Auto-dismissing notification example */}
                 {showNotification && (
                    <Notification
                      type="success"
                      message="This notification will dismiss automatically after 5 seconds."
                      autoDismissDuration={5000} // 5 seconds
                      dismiss={() => setShowNotification(false)} // Hide on dismiss
                    />
                  )}
                {/* Manually dismissible examples - Ensure using 'dismiss' prop */}
                <Notification type="error" message="An error occurred. Please try again." dismiss={() => alert('Dismissed error manually')} />
                <Notification type="warning" message="Warning: Check your connection." dismiss={() => alert('Dismissed warning manually')} />
                {/* Removed Info notification for space, can be added back if needed */}
              </div>
              <p className="mt-4 text-xs text-gray-500">Customization: Use `type`, `message`, `dismiss` callback, and optional `autoDismissDuration` (in ms) props. Animations added.</p>
              {/* Auto-dismiss and animations demonstrated */}
            </section>

            {/* Accordion Section */}
            <section id="accordion" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Accordion</h2>
              <p className="text-sm text-gray-600 mb-4">Collapsible sections with smooth transitions. Includes nested example.</p>
              <Accordion items={[ // Provide unique IDs for top-level items
                { id: 'item-1', title: 'Section 1', content: 'Content for section 1 goes here. Lorem ipsum dolor sit amet.' },
                { id: 'item-2', title: 'Section 2 (with Nested Accordion)', content: (
                    <div>
                      <p className="mb-2">This section contains another accordion:</p>
                      <Accordion items={[ // Ensure unique IDs for nested items
                           { id: 'nested-1', title: 'Nested Section A', content: 'Details for nested section A.'},
                           { id: 'nested-2', title: 'Nested Section B', content: 'Details for nested section B. It can contain more text.'},
                      ]} />
                    </div>
                  )},
                { id: 'item-3', title: 'Section 3', content: 'More content for section 3. Allows for longer text descriptions.' }
              ]} />
              <p className="mt-4 text-xs text-gray-500">Customization: Pass an array of {`{ id, title, content }`} objects as items. Basic transitions included.</p>
              {/* Nested accordion demonstrated */}
            </section>

            {/* Data Visualization Section */}
            <section id="data-visualization" className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Data Visualization (Chart.js)</h2>
              <p className="text-sm text-gray-600 mb-4">Example integration with Chart.js rendering a bar chart.</p>
              {/* Example Chart Integration */}
               <div className="h-72 w-full"> {/* Ensure container has dimensions */}
                 <DataVisualization chartType="bar" data={sampleChartData} options={sampleChartOptions} />
               </div>
              <p className="mt-4 text-xs text-gray-500">Customization: Pass `chartType`, `data`, and `options` props compatible with Chart.js.</p>
              {/* Basic example chart displayed */}
            </section>

          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
              UI Component Library Showcase - Built with React & Tailwind CSS
          </div>
      </footer>
    </div>
  );
}

export default ShowcasePage;
