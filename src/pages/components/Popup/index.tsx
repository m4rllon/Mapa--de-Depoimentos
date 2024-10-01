import React, { useEffect, useRef } from "react";

const PopupMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  let popup

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -33.9, lng: 151.1 },
      zoom: 10,
    });

    const content = document.createElement("div");
    content.innerText = "Hello World!";
    content.id = "content";
    popup = new Popup(
      new window.google.maps.LatLng(-33.866, 151.196),
      content
    );
    popup.setMap(map);
  }, []);

  return <div ref={mapRef} id="map" style={{ width: "100%", height: "500px" }} />;
};

export default PopupMap;
