import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { usePlant } from '../hooks/usePlants';
import { usePlantContext } from '../context/PlantContext';

const PlantDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { plant, loading, error } = usePlant(id);
  const { deletePlant } = usePlantContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!plant) {
    return <div>Plant not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await deletePlant(id);
        history.push('/');
      } catch (err) {
        console.error('Failed to delete plant:', err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{plant.name}</h1>
          <div className="space-x-4">
            <Link
              to={`/plants/${id}/edit`}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-gray-600">Species</h3>
              <p className="font-medium">{plant.species}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Location</h3>
              <p className="font-medium">{plant.location}</p>
            </div>
            <div>
              <h3 className="text-gray-600">Watering Frequency</h3>
              <p className="font-medium">Every {plant.wateringFrequency} days</p>
            </div>
            <div>
              <h3 className="text-gray-600">Sunlight Needs</h3>
              <p className="font-medium">{plant.sunlight}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-600 mb-2">Notes</h3>
            <p className="whitespace-pre-wrap">{plant.notes}</p>
          </div>

          <div>
            <h3 className="text-gray-600 mb-2">Care History</h3>
            {plant.careEvents && plant.careEvents.length > 0 ? (
              <ul className="space-y-2">
                {plant.careEvents.map((event) => (
                  <li key={event._id} className="border-b pb-2">
                    <p className="font-medium">{event.type}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No care events recorded</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
