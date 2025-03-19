import { useEffect } from 'react';
import { usePlantContext } from '../context/PlantContext';

export const usePlants = () => {
  const { plants, loading, error, fetchPlants } = usePlantContext();

  useEffect(() => {
    fetchPlants();
  }, []);

  return { plants, loading, error };
};

export const usePlant = (id) => {
  const { plants, loading, error } = usePlantContext();
  const plant = plants.find(p => p._id === id);

  return { plant, loading, error };
};
