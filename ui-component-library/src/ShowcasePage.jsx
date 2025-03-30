
import React from 'react';

// Import all components
import Accordion from './components/Accordion';
import ButtonCTA from './components/ButtonCTA';
import Card from './components/Card';
import DashboardWidget from './components/DashboardWidget';
import DataVisualization from './components/DataVisualization';
import FormElements from './components/FormElements';
import ModalDialog from './components/ModalDialog';
import Notification from './components/Notification';
import SliderCarousel from './components/SliderCarousel';

const ShowcasePage = () => {
  // Basic example data/props for components
  const accordionItems = [
    { title: 'Section 1', content: 'Content for section 1.' },
    { title: 'Section 2', content: 'Content for section 2.' },
  ];

  const cardData = {
    imageUrl: 'https://via.placeholder.com/300x200',
    title: 'Sample Card',
    description: 'This is a description for the sample card component.',
    tags: ['tag1', 'tag2'],
  };

  const widgetData = {
    title: 'Sample Widget',
    value: '1,234',
    change: '+5.2%',
    isPositiveChange: true,
  };

  const notificationProps = {
    message: 'This is a sample notification!',
    type: 'success',
    isVisible: true,
    onClose: () => console.log('Notification closed'),
  };

  const sliderItems = [
    { id: 1, content: <div className="bg-blue-200 p-4 h-48 flex items-center justify-center">Slide 1</div> },
    { id: 2, content: <div className="bg-green-200 p-4 h-48 flex items-center justify-center">Slide 2</div> },
    { id: 3, content: <div className="bg-yellow-200 p-4 h-48 flex items-center justify-center">Slide 3</div> },
  ];

  // State for controlling the modal visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">UI Component Showcase</h1>
        <p className="text-lg text-gray-600">A gallery of reusable React components built with Tailwind CSS.</p>
      </header>

      {/* Quick Navigation (Optional but helpful) */}
      <nav className="mb-12 p-4 bg-white rounded shadow-md sticky top-0 z-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Components</h2>
        <ul className="flex flex-wrap gap-4 text-blue-600">
          <li><a href="#accordion" className="hover:underline">Accordion</a></li>
          <li><a href="#button" className="hover:underline">ButtonCTA</a></li>
          <li><a href="#card" className="hover:underline">Card</a></li>
          <li><a href="#widget" className="hover:underline">DashboardWidget</a></li>
          <li><a href="#dataviz" className="hover:underline">DataVisualization</a></li>
          <li><a href="#form" className="hover:underline">FormElements</a></li>
          <li><a href="#modal" className="hover:underline">ModalDialog</a></li>
          <li><a href="#notification" className="hover:underline">Notification</a></li>
          <li><a href="#slider" className="hover:underline">SliderCarousel</a></li>
        </ul>
      </nav>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Accordion Section */}
        <section id="accordion" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Accordion</h2>
          <p className="text-gray-600 mb-4">Collapsible content sections.</p>
          {/* Map over items to render individual Accordion components */}
          {accordionItems.map((item, index) => (
            <Accordion key={index} title={item.title} id={`accordion-${index + 1}`}>
              <p>{item.content}</p> {/* Wrap content in a paragraph or appropriate element */}
            </Accordion>
          ))}
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<Accordion title="..." id="...">...</Accordion>'}</code>
            <p className="mt-2">Props: `title` (string), `id` (string, unique), children (ReactNode). Uses CSS for smooth transitions.</p>
          </div>
        </section>

        {/* ButtonCTA Section */}
        <section id="button" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">ButtonCTA</h2>
          <p className="text-gray-600 mb-4">Call-to-action buttons with different types.</p>
          <div className="flex flex-wrap gap-4">
            {/* Update variant prop to type */}
            <ButtonCTA type="primary">Primary</ButtonCTA>
            <ButtonCTA type="secondary">Secondary</ButtonCTA>
            {/* Note: 'danger' type was not defined in component, remove/update if added */}
            {/* <ButtonCTA type="danger">Danger</ButtonCTA> */}
            <ButtonCTA type="primary" size="lg">Large Primary</ButtonCTA>
          </div>
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<ButtonCTA type="primary" size="md">Click Me</ButtonCTA>'}</code>
            <p className="mt-2">Props: `type` ('primary', 'secondary'), `size` ('sm', 'md', 'lg'), `onClick`, `disabled`, `htmlType`, children. Colors/sizes are placeholders.</p>
          </div>
        </section>

        {/* Card Section */}
        <section id="card" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Card</h2>
          <p className="text-gray-600 mb-4">Content container card with image, title, description, and tags.</p>
          <Card {...cardData} />
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<Card imageUrl="..." title="..." description="..." tags={[...]} />'}</code>
            <p className="mt-2">Props: `imageUrl`, `title`, `description`, `tags` (array of strings).</p>
          </div>
        </section>

        {/* DashboardWidget Section */}
        <section id="widget" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">DashboardWidget</h2>
          <p className="text-gray-600 mb-4">Widget for displaying key metrics on a dashboard.</p>
          {/* Pass props according to the updated component definition (title, value, icon, children) */}
          <DashboardWidget title={widgetData.title} value={widgetData.value} >
             {/* Example child showing change */}
             <p className={`text-sm ${widgetData.isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>{widgetData.change}</p>
          </DashboardWidget>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<DashboardWidget title="..." value="..." icon={...}>...</DashboardWidget>'}</code>
            <p className="mt-2">Props: `title` (string), `value` (string|number), `icon` (ReactNode), children (ReactNode). Actions, loading/error states are future considerations.</p>
          </div>
        </section>

        {/* DataVisualization Section */}
        <section id="dataviz" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">DataVisualization</h2>
          <p className="text-gray-600 mb-4">Placeholder for data charts and graphs.</p>
          <DataVisualization title="Sample Chart Title" description="This area requires integration with a charting library."/>
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<DataVisualization title="..." description="..." />'}</code>
            <p className="mt-2">Props: `title` (string), `description` (string). Requires integration with a charting library (e.g., Chart.js, Recharts) for actual display.</p>
          </div>
        </section>

        {/* FormElements Section */}
        <section id="form" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">FormElements</h2>
          <p className="text-gray-600 mb-4">Collection of common form input elements.</p>
          <FormElements />
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<FormElements />'}</code>
            <p className="mt-2">Includes Input, Select, Checkbox, Radio group examples. Review component source for specific props.</p>
          </div>
        </section>

        {/* ModalDialog Section */}
        <section id="modal" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">ModalDialog</h2>
          <p className="text-gray-600 mb-4">Accessible modal dialog component.</p>
          <ButtonCTA onClick={() => setIsModalOpen(true)}>Open Modal</ButtonCTA>
          <ModalDialog
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Sample Modal Title"
          >
            <p className="text-sm text-gray-500">
              This is the content of the modal. You can put any React elements here.
            </p>
            <div className="mt-4">
              <ButtonCTA variant="secondary" onClick={() => setIsModalOpen(false)}>Close</ButtonCTA>
            </div>
          </ModalDialog>
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<ModalDialog isOpen={bool} onClose={func} title="...">...</ModalDialog>'}</code>
            <p className="mt-2">Props: `isOpen` (boolean), `onClose` (function), `title` (string), children. Basic accessibility and focus trapping handled by Headless UI.</p>
          </div>
        </section>

        {/* Notification Section */}
        <section id="notification" className="p-6 bg-white rounded-lg shadow-lg relative min-h-[150px]"> {/* Added relative positioning and min-height */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Notification</h2>
          <p className="text-gray-600 mb-4">Component for displaying temporary messages.</p>
          {/* Note: Notification is positioned absolutely, might need adjustments */}
          <Notification {...notificationProps} />
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            {/* Note: isVisible prop is handled internally now based on state */}
            <code>{'<Notification message="..." type="..." onClose={func} autoDismissDelay={5000} />'}</code>
            <p className="mt-2">Props: `message` (string), `type` ('success', 'error', 'warning', 'info'), `onClose` (func), `autoDismissDelay` (number, ms).</p>
          </div>
        </section>

        {/* SliderCarousel Section */}
        <section id="slider" className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">SliderCarousel</h2>
          <p className="text-gray-600 mb-4">Component for displaying items in a sliding carousel.</p>
          {/* Pass the content directly as an array of React nodes */}
          <SliderCarousel items={sliderItems.map(item => item.content)} />
           <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-700">
            <h4 className="font-semibold mb-1">Usage:</h4>
            <code>{'<SliderCarousel items={[<div key="1">...</div>, ...]} />'}</code>
            <p className="mt-2">Props: `items` (array of ReactNodes). Custom arrows, fade transition, and basic swipe are implemented. `options` are internal but based on react-slick.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ShowcasePage;
