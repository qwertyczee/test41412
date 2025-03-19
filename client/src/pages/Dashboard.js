import React from 'react';
import { Link } from 'react-router-dom';
import PlantList from '../components/PlantList';
import { usePlants } from '../hooks/usePlants';

const Dashboard = () => {
  const { plants, loading, error } = usePlants();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Plants</h1>
        <Link
          to="/plants/new"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Add New Plant
        </Link>
      </div>
      <PlantList plants={plants} />
    </div>
  );
};

export default Dashboard;
