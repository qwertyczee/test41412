import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PlantProvider } from './context/PlantContext';
import Dashboard from './pages/Dashboard';
import PlantDetail from './pages/PlantDetail';
import AddEditPlant from './pages/AddEditPlant';

function App() {
  return (
    <PlantProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/plants/new" component={AddEditPlant} />
            <Route exact path="/plants/:id" component={PlantDetail} />
            <Route exact path="/plants/:id/edit" component={AddEditPlant} />
          </Switch>
        </div>
      </Router>
    </PlantProvider>
  );
}

export default App;
