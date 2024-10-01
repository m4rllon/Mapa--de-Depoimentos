import { useState } from "react";
import { School } from "../../../data/schools"

interface props {
    pontosDoCluster: School[];
}

export const ContentInfoWindow = ({pontosDoCluster}:props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === pontosDoCluster.length - 1 ? 0 : prevIndex + 1,
        );
      };
    
      const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? pontosDoCluster.length - 1 : prevIndex - 1,
        );
      };

    return <div style={{ display:'flex' }}>
        <h1>"</h1>
        <span style={{display:'flex', flexDirection: 'column'}}>
            <p>{pontosDoCluster[currentIndex].name}</p>
            <p>{pontosDoCluster[currentIndex].depo}</p>
        </span>
        <span>
            <button onClick={handlePrevious}>{'<'}</button>
            <button onClick={handleNext}>{'>'}</button>
        </span>
    </div>
}