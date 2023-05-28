import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ModeIcon from '@mui/icons-material/Mode';
import "./CatalogCss.css";
import PlantDetail from './PlantDetail';
import { Flipper, Flipped } from 'react-flip-toolkit';
const imageContext = require.context('../../images', true, /\.(jpg|jpeg|png|gif)$/);

const getImages = () => {
  const images = imageContext.keys().map(imageContext);
  return images;
};

console.log(imageContext.keys());

const Catalog = () => {
  const plantImages = getImages();
  const navigate = useNavigate();
  const [selectedPlant, setSelectedPlant] = useState(null);

  const [filter, setFilter] = useState("");
  console.log(plantImages);
  const plants = [
    { id: 1, name: 'במבוק נמוך 50 ליטר',category: 'צמחייה גבוהה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/high1.jpeg' },
    { id: 2, name: 'דקל טבעות 25 ליטר',category: 'צמחייה גבוהה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/high2.jpeg' },
    { id: 3, name: 'סיזיגיום ספירלה 50 ליטר',category: 'צמחייה גבוהה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/high3.jpeg' },
    { id: 4, name: 'מילנבקיה 50 ליטר',category: 'צמחייה גבוהה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/high4.jpeg' },
    { id: 5, name: 'קנציה 25 ליטר', category: 'צמחייה בינונית',imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/mid1.jpeg' },
    { id: 6, name: 'רימון 25 ליטר',category: 'צמחייה בינונית', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/mid2.jpeg' },
    { id: 7, name: 'מילנבקיה משתרע 25 ליטר',category: 'צמחייה בינונית', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/mid3.jpeg' },
    { id: 8, name: 'זנב דג 25 ליטר',category: 'צמחייה בינונית', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/mid4.jpeg' },
    { id: 9, name: 'מנגבה 10 ליטר',category: 'צמחייה קטנה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/small1.jpeg' },
    { id: 10, name: 'מרווה רפואית 7 ליטר',category: 'צמחייה קטנה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/small2.jpeg' },
    { id: 11, name: 'הדס כדור 10 ליטר',category: 'צמחייה קטנה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/small3.jpeg' },
    { id: 12, name: 'לוונדר מנוצה 10 ליטר',category: 'צמחייה קטנה', imageUrl: 'https://proj.ruppin.ac.il/cgroup96/prod/build/images/small4.jpeg' },
];
const groupedPlants = plants.reduce((acc, plant) => {
  acc[plant.category] = acc[plant.category] || [];
  acc[plant.category].push(plant);
  return acc;
}, {});
// const handleClick = useCallback((plant) => {
//    localStorage.setItem('plant', JSON.stringify(plant));
//   navigate(`/catalog/plant/${plant.id}`, { state: { plant } });
// }, [navigate]);


const handleClick = (plant) => {
  setSelectedPlant(plant);
};


const handleClose = () => {
  setSelectedPlant(null);
};


return (
  <Flipper flipKey={selectedPlant} spring="gentle">
    <div className="plant-catalog">
       <input 
       type="text" 
      placeholder="Filter plants..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
       />
      {Object.entries(groupedPlants).map(([category, categoryPlants]) => {
        const filteredCategoryPlants = categoryPlants.filter(plant => plant.name.toLowerCase().includes(filter.toLowerCase()));
        return (
          <div key={category} className={`plant-category ${category}`}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="plants">
              {filteredCategoryPlants.map(plant => (
                <Flipped key={plant.id} flipId={`plant-${plant.id}`}>
                  <div 
                    className="plant-card" 
                    onClick={() => handleClick(plant)}
                  >
                    <img src={plant.imageUrl} alt={plant.name} />
                    <h3>{plant.name}</h3>
                  </div>
                </Flipped>
              ))}
            </div>
          </div>
        );
      })}
      {selectedPlant && (
        <Flipped flipId={`plant-${selectedPlant.id}`} inverted>
          <PlantDetail plant={selectedPlant} onClose={handleClose} />
        </Flipped>
      )}
    </div>
  </Flipper>
);
};

// return (
//   <div className="plant-catalog">
//     <input 
//       type="text" 
//       placeholder="Filter plants..."
//       value={filter}
//       onChange={e => setFilter(e.target.value)}
//     />
//     {Object.entries(groupedPlants).map(([category, categoryPlants]) => {
//       const filteredCategoryPlants = categoryPlants.filter(plant => plant.name.toLowerCase().includes(filter.toLowerCase()));
//       return (
//         <div key={category} className={`plant-category ${category}`}>
//           <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
//           <div className="plants">
//             {filteredCategoryPlants.map(plant => (
//               <div 
//                 className="plant-card" 
//                 key={plant.id}
//                 onClick={() => handleClick(plant)}
//               >
//                 <img src={plant.imageUrl} alt={plant.name} />
//                 <h3>{plant.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// );
// };
  export default Catalog;

