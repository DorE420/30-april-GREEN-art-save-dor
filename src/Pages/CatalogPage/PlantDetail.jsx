import React from 'react';
import { useLocation } from 'react-router-dom';

const PlantDetail = () => {
  const location = useLocation();
  let plant = location?.state?.plant;

  // If plant is not available in location.state, fetch it from localStorage
  if (!plant) {
    plant = JSON.parse(localStorage.getItem('plant'));
  }

  console.log("Plant data: ", plant);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={plant.imageUrl} alt={plant.name} />
      <h2>{plant.name}</h2>
      <p>{plant.description}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default PlantDetail;
