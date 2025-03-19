import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/plants');
      setPlants(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (plantData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/plants', plantData);
      setPlants([...plants, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlant = async (id, plantData) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/plants/${id}`, plantData);
      setPlants(plants.map(plant => plant._id === id ? response.data : plant));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/plants/${id}`);
      setPlants(plants.filter(plant => plant._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlantContext.Provider value={{
      plants,
      loading,
      error,
      fetchPlants,
      addPlant,
      updatePlant,
      deletePlant
    }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlantContext must be used within a PlantProvider');
  }
  return context;
};
