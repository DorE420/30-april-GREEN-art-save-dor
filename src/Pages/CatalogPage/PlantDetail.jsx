import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Flipper, Flipped } from 'react-flip-toolkit';
import './PlantDetails.css';
import "./CatalogCss.css";
// const PlantDetail = () => {
//   const location = useLocation();
//   let [plant, setPlant] = useState(location?.state?.plant);
//   console.log("Plant from location.state: ", plant);

//   useEffect(() => {
//     if(!plant) {
//       setPlant(JSON.parse(localStorage.getItem('plant')));
//     }
//   }, [plant]);

//   console.log("Plant data: ", plant);

//   return (
//     <div className="plant-detail">
//     <img src={plant?.imageUrl} alt={plant?.name} />
//     <h2>{plant.name}</h2>
//     <p>{plant.description}</p>
//     {/* Add more details here as needed */}
//   </div>
//   );
// };

const PlantDetail = ({ plant, onClose }) => {
  // remove useLocation() since we are now passing the plant directly as prop
  // let [plant, setPlant] = useState(location?.state?.plant);
  
  useEffect(() => {
    // Also remove this, since plant will now always be available as a prop
    // if(!plant) {
    //  setPlant(JSON.parse(localStorage.getItem('plant')));
    // }
  }, [plant]);

  return (
    <div className="plant-detail">
      <div className="plant-card">
      <img src={plant?.imageUrl} alt={plant?.name} />
      <h2>{plant.name}</h2>
      <p>{plant.description}</p>
      {/* Add more details here as needed */}
      <button onClick={onClose}>Close</button> {/* Add this button to close the modal */}
      </div>
    </div>
  );
};


export default PlantDetail;