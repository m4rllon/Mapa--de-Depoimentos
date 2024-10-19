import { School } from "../data/schools";

function calculateDistance(x1: number, x2: number, y1: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

const setAlonePoints = (points:School[], radius:number) => {
    points.forEach(point => {
        
    })
}

export default setAlonePoints