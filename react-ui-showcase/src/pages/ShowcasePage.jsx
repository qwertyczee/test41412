
import React from 'react';
import './ShowcasePage.css';

// Import all UI components
import NavigationBar from '../components/NavigationBar';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import DashboardWidget from '../components/DashboardWidget';
import DataVisualization from '../components/DataVisualization';
import FormElements from '../components/FormElements';
import Modal from '../components/Modal';
import Notification from '../components/Notification';

// State for modal visibility is handled below using useState.
// Basic anchor links are used for navigation; routing (e.g., React Router) could be added for a more robust SPA experience.

function ShowcasePage() {
  // Example data/props for components (replace with actual or dynamic data)
  const accordionItems = [
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
  ];

  const carouselItems = [
    { id: 1, content: 'Slide 1', imageUrl: 'https://via.placeholder.com/800x300/FF0000/FFFFFF?text=Slide+1' },
    { id: 2, content: 'Slide 2', imageUrl: 'https://via.placeholder.com/800x300/00FF00/FFFFFF?text=Slide+2' },
    { id: 3, content: 'Slide 3', imageUrl: 'https://via.placeholder.com/800x300/0000FF/FFFFFF?text=Slide+3' },
  ];

  const widgetData = {
    title: 'Sales Overview',
    value: '$15,430',
    change: '+5.2%',
    description: 'Compared to last month',
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [120, 150, 110, 180, 160],
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="showcase-page">
      <NavigationBar links={[{ href: '#buttons', label: 'Buttons' }, { href: '#cards', label: 'Cards' }, /* Add more links */]} />

      <header className="showcase-header">
        <h1>React UI Component Showcase</h1>
        <p>Explore the collection of reusable UI components.</p>
      </header>

      <main className="showcase-grid">
        {/* Anchor links are implemented via section IDs. Routing could enhance this. */}
        {/* Filtering/search functionality would require additional state and logic. */}

        <section id="buttons" className="showcase-section">
          <h2>Buttons</h2>
          <div className="component-display">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
          <p className="component-description">Various button styles for different actions.</p>
        </section>

        <section id="cards" className="showcase-section">
          <h2>Cards</h2>
          <div className="component-display">
            <Card title="Sample Card" imageUrl="https://via.placeholder.com/300x150">
              This is the content of the card. It can contain text, images, and actions.
            </Card>
          </div>
          <p className="component-description">Flexible content containers.</p>
        </section>

        <section id="forms" className="showcase-section">
          <h2>Form Elements</h2>
          <div className="component-display">
            <FormElements />
          </div>
          <p className="component-description">Inputs, checkboxes, radio buttons, and submit controls.</p>
        </section>

        <section id="modal" className="showcase-section">
          <h2>Modal Dialog</h2>
          <div className="component-display">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Modal Title">
              <p>This is the content of the modal dialog.</p>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </Modal>
          </div>
          <p className="component-description">Overlay dialogs for focused interaction.</p>
        </section>

        <section id="carousel" className="showcase-section">
          <h2>Carousel / Slider</h2>
          <div className="component-display">
            <Carousel items={carouselItems} />
          </div>
          <p className="component-description">Cycles through images or content.</p>
        </section>

        <section id="widgets" className="showcase-section">
          <h2>Dashboard Widgets</h2>
          <div className="component-display">
            <DashboardWidget
              title={widgetData.title}
              value={widgetData.value}
              change={widgetData.change}
              description={widgetData.description}
            />
          </div>
          <p className="component-description">Compact displays for key information.</p>
        </section>

        <section id="notifications" className="showcase-section">
          <h2>Notifications</h2>
          <div className="component-display">
            <Notification type="success" message="Operation completed successfully!" />
            <Notification type="error" message="An error occurred." onClose={() => {}} />
            <Notification type="info" message="Informational message." />
            <Notification type="warning" message="Warning: Please review." />
          </div>
          <p className="component-description">Alerts and messages for user feedback.</p>
        </section>

        <section id="accordion" className="showcase-section">
          <h2>Accordion</h2>
          <div className="component-display">
            <Accordion items={accordionItems} />
          </div>
          <p className="component-description">Collapsible content sections.</p>
        </section>

        <section id="dataviz" className="showcase-section">
          <h2>Data Visualization</h2>
          <div className="component-display">
            <DataVisualization type="bar" data={chartData} title="Sample Bar Chart" />
          </div>
          <p className="component-description">Placeholder for charts and graphs.</p>
        </section>

      </main>

      <footer className="showcase-footer">
        <p>React UI Showcase - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default ShowcasePage;
