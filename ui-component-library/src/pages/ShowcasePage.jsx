import React, { useState } from 'react';
import {
  FaBeer,
  FaCloud,
  FaCog,
  FaEnvelope,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegCheckCircle,
  FaTimes,
  FaUser,
  FaUsers,
  FaDollarSign,
  FaShoppingCart,
} from 'react-icons/fa'; // Example icons

// Import Components
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Modal from '../components/Modal';
import Accordion from '../components/Accordion';
import Notification from '../components/Notification';
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';
import DashboardWidget from '../components/DashboardWidget';
import SimpleBarChart from '../components/BarChart';

function ShowcasePage() {
  // --- State ---
  const [notification, setNotification] = useState({
    message: null,
    type: 'info',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('Test'); // Pre-fill for demo
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [inputError, setInputError] = useState(null); // For username input validation

  // --- Event Handlers ---
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const handleCloseNotification = () => {
    setNotification({ message: null, type: 'info' });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Example Input Validation
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value && value.length < 3) {
      setInputError('Username must be at least 3 characters.');
    } else {
      setInputError(null);
    }
  };
  const handleTextareaChange = (e) => setTextareaValue(e.target.value);
  const handleSelectChange = (e) => setSelectValue(e.target.value);

  // --- Sample Data ---
  const navLinks = [
    { href: '#buttons', label: 'Buttons' },
    { href: '#cards', label: 'Cards' },
    { href: '#forms', label: 'Forms' },
    { href: '#modal', label: 'Modal' },
    { href: '#accordion', label: 'Accordion' },
    { href: '#notification', label: 'Notification' },
    { href: '#carousel', label: 'Carousel' },
    { href: '#widgets', label: 'Widgets' },
    { href: '#charts', label: 'Charts' },
  ];
  const logoElement = (
    <a
      href="#top"
      className="text-indigo-600 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
    >
      UI Lib
    </a>
  );
  const ctaButtonElement = (
    <Button
      size="sm"
      onClick={() => showNotification('Sign Up Clicked!', 'success')}
    >
      Sign Up
    </Button>
  );

  const barChartData = [
    { name: 'Jan', uv: 400, pv: 240 },
    { name: 'Feb', uv: 300, pv: 139 },
    { name: 'Mar', uv: 200, pv: 980 },
    { name: 'Apr', uv: 278, pv: 390 },
    { name: 'May', uv: 189, pv: 480 },
    { name: 'Jun', uv: 239, pv: 380 },
    { name: 'Jul', uv: 349, pv: 430 },
  ];

  const accordionItems = [
    {
      title: 'Item 1: What is Lorem Ipsum?',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      title: 'Item 2: Why do we use it?',
      content: (
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. Use{' '}
          <strong>React nodes</strong> here too!
        </p>
      ),
    },
    {
      title: 'Item 3: Where does it come from?',
      content:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
  ];

  const carouselItems = [
    // NOTE: For accessibility, content within carousels needs careful consideration.
    // Text on colored backgrounds must have sufficient contrast.
    // Interactive elements must be keyboard accessible. Images need alt text.
    <div
      key="slide1"
      className="bg-blue-600 h-64 flex items-center justify-center text-white text-2xl p-4 rounded-lg shadow-inner"
    >
      Slide 1 Content
    </div>,
    <div
      key="slide2"
      className="bg-green-600 h-64 flex items-center justify-center text-white text-2xl p-4 rounded-lg shadow-inner"
    >
      Slide 2 Content
    </div>,
    <div
      key="slide3"
      className="bg-indigo-600 h-64 flex items-center justify-center text-white text-2xl p-4 rounded-lg shadow-inner"
    >
      Slide 3 Content
    </div>,
    <img
      key="slide4"
      src="https://via.placeholder.com/800x300/E2E8F0/1A202C?text=Sample+Image"
      alt="Placeholder image showing grey background with text Sample Image"
      className="w-full h-64 object-cover rounded-lg shadow-inner"
    />, // Added better alt text and styling
  ];

  const selectOptions = [
    { value: 'option1', label: 'Option One' },
    { value: 'option2', label: 'Option Two' },
    { value: 'option3', label: 'Option Three - A Longer Option' },
  ];

  // --- Render ---
  return (
    <div className="bg-gray-50 min-h-screen">
      {' '}
      {/* Added background color */}
      {/* --- NavBar --- */}
      <NavBar
        logo={logoElement}
        navLinks={navLinks}
        ctaButton={ctaButtonElement}
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200" // Refined sticky styles
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-16">
        {' '}
        {/* Added max-width, padding, increased spacing */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mt-6 mb-12">
          Component Showcase
        </h1>
        {/* --- Buttons --- */}
        <section id="buttons" aria-labelledby="buttons-heading">
          <h2
            id="buttons-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Buttons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {' '}
            {/* Adjusted grid and gap */}
            {/* Variants */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium mb-2">Variants</h3>
              <Button
                onClick={() =>
                  showNotification('Primary button clicked!', 'info')
                }
              >
                Primary
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  showNotification('Secondary button clicked!', 'info')
                }
              >
                Secondary
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  showNotification('Danger button clicked!', 'error')
                }
              >
                Danger
              </Button>
            </div>
            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium mb-2">Sizes</h3>
              <div className="flex flex-col items-start gap-3">
                {' '}
                {/* Stack sizes */}
                <Button size="sm">Small</Button>
                <Button size="md">Medium (Default)</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            {/* With Icons */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium mb-2">With Icons</h3>
              <div className="flex flex-col items-start gap-3">
                {/* Add aria-hidden to icons if they are purely decorative */}
                <Button iconLeft={<FaBeer aria-hidden="true" />}>
                  Icon Left
                </Button>
                <Button
                  variant="secondary"
                  iconRight={<FaCloud aria-hidden="true" />}
                >
                  Icon Right
                </Button>
                <Button
                  size="sm"
                  iconLeft={<FaCog aria-hidden="true" />}
                  aria-label="Settings"
                />{' '}
                {/* Icon only - requires aria-label */}
              </div>
            </div>
            {/* Disabled State */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium mb-2">Disabled</h3>
              <div className="flex flex-col items-start gap-3">
                <Button disabled>Primary Disabled</Button>
                <Button variant="secondary" disabled>
                  Secondary Disabled
                </Button>
                <Button
                  variant="danger"
                  disabled
                  iconLeft={<FaTimes aria-hidden="true" />}
                >
                  Danger Disabled
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* --- Cards --- */}
        <section id="cards" aria-labelledby="cards-heading">
          <h2
            id="cards-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Card */}
            <Card title="Standard Content Card">
              This is the content area of a basic card. You can put any text or
              elements here. Ensure sufficient contrast for text.
            </Card>
            {/* Card with Image */}
            <Card
              title="Card With Image"
              imageUrl="https://via.placeholder.com/400x200/E2E8F0/1A202C?text=Featured+Image"
              imageAlt="Placeholder image with text Featured Image" // Example alt text
            >
              This card includes an image. Meaningful alt text must be provided
              via `imageAlt` prop for accessibility.
            </Card>
            {/* Card with Footer */}
            <Card
              title="Card With Footer"
              imageAlt="Descriptive alt text for image if present" // Alt needed even if imageUrl is null/not set if it could be set later
              footerContent={
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Updated 10 mins ago
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      showNotification('Card action triggered!', 'success')
                    }
                  >
                    Learn More
                  </Button>
                </div>
              }
            >
              This card has a distinct footer section, often used for actions or
              meta-data.
            </Card>
          </div>
        </section>
        {/* --- Forms --- */}
        <section id="forms" aria-labelledby="forms-heading">
          <h2
            id="forms-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Forms
          </h2>
          {/* Use a form tag for semantic grouping and better accessibility */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            {/* Input Examples */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium mb-3">Inputs</h3>
              {/* Using state for error example */}
              <Input
                label="Username"
                id="input-username" // Use a simple ID
                placeholder="Enter username (min 3 chars)"
                value={inputValue}
                onChange={handleInputChange}
                error={inputError} // Bind error state
                required
                aria-describedby={
                  inputError ? 'username-error-desc' : undefined
                } // Link error message
              />
              {/* Visible error message linked by aria-describedby */}
              {inputError && (
                <p
                  id="username-error-desc"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {inputError}
                </p>
              )}

              <Input
                label="Email (Disabled)"
                id="input-email-disabled"
                type="email"
                placeholder="user@example.com"
                value="prefilled@example.com"
                disabled
              />
              <Input
                label="Search"
                id="input-search"
                type="search"
                placeholder="Search items..."
                onChange={() => {}}
              />
            </div>

            {/* Textarea & Select Examples */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium mb-3">Textarea & Select</h3>
              <Textarea
                label="Feedback"
                id="textarea-feedback"
                placeholder="Type your feedback here..."
                value={textareaValue}
                onChange={handleTextareaChange}
                rows={5}
                required
              />
              <Select
                label="Choose Category"
                id="select-category"
                options={selectOptions}
                value={selectValue}
                onChange={handleSelectChange}
                placeholderOption="-- Please select --"
                required
              />
              <Select
                label="Choose Status (with Error)"
                id="select-status-error"
                options={selectOptions}
                value="" // Simulate unselected state
                onChange={() => {}}
                placeholderOption="-- Please select --"
                error="Status selection is mandatory." // Example error
                required
              />
              <Select
                label="Assigned User (Disabled)"
                id="select-user-disabled"
                options={selectOptions}
                value={selectOptions[1].value} // Pre-select second option
                onChange={() => {}}
                disabled
              />
            </div>
          </form>
        </section>
        {/* --- Modal --- */}
        <section id="modal" aria-labelledby="modal-heading">
          <h2
            id="modal-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Modal
          </h2>
          <p className="mb-4 text-gray-600">
            Click the button below to launch the modal dialog. It includes basic
            focus management and Escape key closing. Uses ARIA attributes for
            accessibility.
          </p>
          <Button onClick={openModal}>Open Standard Modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Confirm Your Action" // Updated title
          >
            {/* Example modal content */}
            {/* <div id="modal-description"> Added optional description ID */}
            <p className="mb-4 text-gray-700">
              Are you sure you want to proceed with this action? This cannot be
              undone easily.
            </p>
            <p className="text-sm text-gray-500">
              Review the details carefully before confirming.
            </p>
            {/* </div> */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  showNotification('Action Confirmed!', 'success');
                  closeModal();
                }}
              >
                Confirm Action
              </Button>
            </div>
          </Modal>
        </section>
        {/* --- Accordion --- */}
        <section id="accordion" aria-labelledby="accordion-heading">
          <h2
            id="accordion-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Accordion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border p-4 rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-medium mb-3">Single Open At Once</h3>
              <p className="text-sm text-gray-600 mb-4">
                Only one accordion section can be open at any given time. Uses
                ARIA attributes for expansion state.
              </p>
              <Accordion items={accordionItems} />
            </div>
            <div className="border p-4 rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-medium mb-3">
                Multiple Open Allowed
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Multiple sections can be expanded simultaneously.
              </p>
              <Accordion items={accordionItems} allowMultipleOpen />
            </div>
          </div>
        </section>
        {/* --- Notification / Toast --- */}
        <section id="notification" aria-labelledby="notification-heading">
          <h2
            id="notification-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Notification / Toast
          </h2>
          <p className="text-gray-600 mb-4">
            Notifications provide feedback. They use ARIA live regions (`status`
            or `alert`) to be announced by screen readers. Icons are included
            within the component.
          </p>
          <div className="flex flex-wrap gap-3 mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <Button
              onClick={() =>
                showNotification(
                  'Success! Your profile was updated.',
                  'success'
                )
              }
            >
              Show Success
            </Button>
            <Button
              onClick={() =>
                showNotification('Error! Could not save changes.', 'error')
              }
              variant="danger"
            >
              Show Error
            </Button>
            <Button
              onClick={() =>
                showNotification('Warning: Session expiring soon.', 'warning')
              }
              variant="secondary"
            >
              Show Warning
            </Button>
            <Button
              onClick={() =>
                showNotification('File upload is in progress.', 'info')
              }
              variant="secondary"
            >
              Show Info
            </Button>
          </div>
        </section>
        {/* --- Carousel --- */}
        <section id="carousel" aria-labelledby="carousel-heading">
          <h2
            id="carousel-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Carousel / Slider
          </h2>
          <p className="text-gray-600 mb-4">
            Uses <code>react-slick</code>. Ensure controls are accessible
            (library dependent), images have alt text, and content has
            sufficient contrast.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            {/* Ensure slick-carousel CSS is imported globally (e.g., in main.jsx or index.js) */}
            {/* Check react-slick docs for accessibility best practices (keyboard nav, focus management) */}
            <Carousel items={carouselItems} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Note: Requires <code>react-slick</code> and its CSS. Check its
            accessibility features.
          </p>
        </section>
        {/* --- Dashboard Widgets --- */}
        <section id="widgets" aria-labelledby="widgets-heading">
          <h2
            id="widgets-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Dashboard Widgets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Icons passed here are cloned and sized within the component */}
            <DashboardWidget
              title="Total Users"
              value="10,345"
              icon={<FaUsers />} // Component styles and sizes the icon
              description={
                <span className="text-green-600 text-xs">
                  +5% from last month
                </span>
              } // Added text-xs
            />
            <DashboardWidget
              title="Revenue"
              value="$56,789"
              icon={<FaDollarSign />}
              description="Fiscal Year 2024"
            />
            <DashboardWidget
              title="New Orders"
              value="1,203"
              icon={<FaShoppingCart />}
              description={
                <span className="text-red-600 text-xs">-2% from yesterday</span>
              } // Added text-xs
            />
            <DashboardWidget
              title="Open Tickets"
              value="87"
              icon={<FaEnvelope />}
              description="Awaiting assignment"
            />
          </div>
        </section>
        {/* --- Charts --- */}
        <section id="charts" aria-labelledby="charts-heading">
          <h2
            id="charts-heading"
            className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 text-gray-700"
          >
            Charts
          </h2>
          <p className="text-gray-600 mb-4">
            Example using <code>recharts</code>. Charts require careful
            accessibility considerations (e.g., providing data tables as
            alternatives, ensuring keyboard navigation for tooltips/legends).
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <SimpleBarChart
              data={barChartData}
              xAxisKey="name"
              barDataKeys={['uv', 'pv']} // Define which keys represent bars
              className="h-80" // Increased height slightly
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Responsive bar chart example. Accessibility for charts needs careful
            implementation.
          </p>
        </section>
      </div>{' '}
      {/* Close main content container */}
      {/* --- Notification Component Instance --- */}
      {/* This instance renders the current notification state */}
      {/* Positioned fixed, outside the main layout flow */}
      <Notification
        message={notification.message}
        type={notification.type}
        duration={5000} // Auto-close after 5 seconds
        onClose={handleCloseNotification}
        position="top-right" // Default position
      />
    </div>
  );
}

// ShowcasePage typically doesn't need PropTypes unless it accepts props itself.
// export default ShowcasePage; // Assuming it's exported elsewhere if needed

// For standalone running or testing:
export default ShowcasePage;
