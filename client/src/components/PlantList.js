import React from 'react';
import { Link } from 'react-router-dom';

const PlantList = ({ plants }) => {
  if (!plants.length) {
    return <p>No plants found. Add your first plant!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plants.map((plant) => (
        <div key={plant._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
          <p className="text-gray-600 mb-2">{plant.species}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Last watered: {new Date(plant.lastWatered).toLocaleDateString()}
            </span>
            <Link
              to={`/plants/${plant._id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlantList;
