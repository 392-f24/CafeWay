import React, { useEffect, useRef, useState } from "react";

const MapComponent = ({ cafes }) => {
  const mapRef = useRef(null);
  const defaultLocation = { lat: 42.0451, lng: -87.6877 };
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

      const newMap = new Map(mapRef.current, {
        center: defaultLocation,
        zoom: 14,
        mapId: 'ae95546a5be3631',
        disableDefaultUI: true,
      });

      setMap(newMap);
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map || !cafes.length) return;

    const bounds = new window.google.maps.LatLngBounds();
    const geocoder = new window.google.maps.Geocoder();

    cafes.forEach((cafe) => {
      geocoder.geocode({ address: cafe.vicinity }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const position = results[0].geometry.location;
          
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position,
            title: cafe.name,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><strong>${cafe.name}</strong></div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          bounds.extend(position);
          map.fitBounds(bounds);
        } else {
          console.error(`Geocoding failed for ${cafe.name}: ${status}`);
        }
      });
    });
  }, [cafes, map]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;