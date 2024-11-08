import axios from 'axios';

const getPlaceId = async (collegeName) => {
  return new Promise((resolve, reject) => {
    if (!window.google) return reject("Google API not loaded");

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      query: collegeName,
      fields: ['place_id'],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
        resolve(results[0].place_id);
      } else {
        reject("Place not found");
      }
    });
  });
};

const getZipCode = async (placeId) => {
  return new Promise((resolve, reject) => {
    if (!window.google) return reject("Google API not loaded");

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const zipCodeComponent = addressComponents.find(component =>
          component.types.includes("postal_code")
        );
        resolve(zipCodeComponent ? zipCodeComponent.long_name : "ZIP code not found");
      } else {
        reject("Geocoding failed");
      }
    });
  });
};

const getUniversity = (email) => {
  const domain = email.split('@')[1];
  const university = domain.split('.')[0];
  return university;
}

export const findZipcode = async (email) => {
  const university = getUniversity(email);
  const collegeName = university + " University";

  try {
    const placeId = await getPlaceId(collegeName);
    const zipCode = await getZipCode(placeId);
    console.log(zipCode);
    return zipCode;
  } catch (error) {
    console.error(error);
    return -1;
  }
};
