export const findCafes = (dist, address, setCafes) => {
    const radiusMeters = parseFloat(dist) * 1609.34; 

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;

        const service = new window.google.maps.places.PlacesService(document.createElement("div"));
        service.nearbySearch(
          {
            location: location,
            radius: radiusMeters,
            type: "cafe",
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setCafes(results.map((place) => ({
                name: place.name,
                placeId: place.place_id,
                vicinity: place.vicinity
              })));
            } else {
              alert("No cafes found within the specified radius.");
              setCafes([]); 
            }
          }
        );
      } else {
        alert("Invalid zip code or location not found.");
        setCafes([]);
      }
    });
  };