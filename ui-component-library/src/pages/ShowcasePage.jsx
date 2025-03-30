
import React, { useState, useEffect } from 'react';
import { componentExamples, demoOptions } from '../config/showcaseConfig';
import { 
  Accordion, 
  ButtonCTA, 
  Card, 
  DataVisualization,
  FormElements,
  ModalDialog,
  NavigationBar,
  Notification,
  SliderCarousel
} from '../components';

const ShowcasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [demoProps, setDemoProps] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Filter components based on search and active tab
  const filteredComponents = componentExamples.filter(component => {
    const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || component.tags.includes(activeTab);
    return matchesSearch && matchesTab;
  });

  // Update demo props when changed
  const handlePropChange = (componentId, propName, value) => {
    setDemoProps(prev => ({
      ...prev,
      [componentId]: {
        ...prev[componentId],
        [propName]: value
      }
    }));
  };

  // Get component by ID
  const getComponent = (id) => {
    switch(id) {
      case 'accordion': return Accordion;
      case 'button': return ButtonCTA;
      case 'card': return Card;
      case 'datavis': return DataVisualization;
      case 'form': return FormElements;
      case 'modal': return ModalDialog;
      case 'nav': return NavigationBar;
      case 'notification': return Notification;
      case 'slider': return SliderCarousel;
      default: return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Component Showcase</h1>
      
      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select 
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="all">All Components</option>
            <option value="ui">UI Elements</option>
            <option value="action">Actions</option>
            <option value="data">Data Display</option>
          </select>
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => {
          const Component = getComponent(component.id);
          const currentProps = {
            ...component.props,
            ...(demoProps[component.id] || {})
          };

          return (
            <div key={component.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">{component.title}</h2>
                <p className="text-gray-600 text-sm">{component.description}</p>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <Component {...currentProps} />
                </div>

                {/* Demo Controls */}
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Demo Options</h3>
                  {component.id === 'button' && (
                    <>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Size</label>
                        <select
                          className="w-full border rounded px-2 py-1 text-sm"
                          value={currentProps.size || 'md'}
                          onChange={(e) => handlePropChange(component.id, 'size', e.target.value)}
                        >
                          {demoOptions.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for larger demos */}
      {showModal && (
        <ModalDialog title="Interactive Demo" onClose={() => setShowModal(false)}>
          <div className="p-4">
            {/* Additional demo content would go here */}
          </div>
        </ModalDialog>
      )}
    </div>
  );
};

export default ShowcasePage;
