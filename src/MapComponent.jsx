import React, { useEffect, useRef, useState } from "react";

const MapComponent = ( {cafes} ) => {
  const mapRef = useRef(null);
  const defaultLocation = { lat: 42.0451, lng: -87.6877 }; // Default to a location, e.g., Chicago


  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 14,
      mapId: 'ae95546a5be3631',
      disableDefaultUI: true,
    });

    // Add markers for each cafe
    cafes.forEach((cafe) => {
      const marker = new window.google.maps.Marker({
        position: { lat: cafe.lat, lng: cafe.lng },
        map: map,
        title: cafe.name,
      });

      // Info window with cafe name
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${cafe.name}</strong></div>`,
      });

      // Show info window on marker click
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
