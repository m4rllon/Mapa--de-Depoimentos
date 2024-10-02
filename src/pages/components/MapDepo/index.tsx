import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Markers from "../Markers";
import formatted from "../../../data/schools";

export default function MapDepo(){
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const mapId = import.meta.env.VITE_MAP_ID
    return<div style={{height: '100vh', width: '100%', position: 'absolute'}}>
        <APIProvider apiKey={apiKey}>
            <Map 
            defaultCenter={{lat: -15.885806, lng: -47.989097}} 
            defaultZoom={10} 
            minZoom={5}
            maxZoom={14}
            mapId={mapId}>
                <Markers points={formatted}/>
            </Map>
        </APIProvider>
    </div>
} 