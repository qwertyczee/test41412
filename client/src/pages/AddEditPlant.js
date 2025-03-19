import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PlantForm from '../components/PlantForm';
import { usePlant } from '../hooks/usePlants';
import { usePlantContext } from '../context/PlantContext';

const AddEditPlant = () => {
  const { id } = useParams();
  const history = useHistory();
  const { plant, loading, error } = usePlant(id);
  const { addPlant, updatePlant } = usePlantContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (id && error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await updatePlant(id, formData);
      } else {
        await addPlant(formData);
      }
      history.push('/');
    } catch (err) {
      console.error('Failed to save plant:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {id ? 'Edit Plant' : 'Add New Plant'}
        </h1>
        <PlantForm
          plant={plant}
          onSubmit={handleSubmit}
          buttonText={id ? 'Update Plant' : 'Add Plant'}
        />
      </div>
    </div>
  );
};

export default AddEditPlant;
