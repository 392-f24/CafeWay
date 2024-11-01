import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [availability, setAvailability] = useState({});
  const [newReview, setNewReview] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [cafeStatus, setCafeStatus] = useState({ seating: '', outlets: '' });
  const [address, setAddress] = useState('');
  const [dist, setDist] = useState('');
  const [cafes, setCafes] = useState([]); 

  useEffect(() => {
  }, []);

  const findCafes = () => {
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
              setCafes(results.map((place) => place.name));
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

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      const review = { id: Date.now(), text: newReview, replies: [] };
      setNewReview('');
    }
  };

  const handleReplySubmit = (reviewId) => {
    if (replyText.trim()) {
      setReplyText('');
      setSelectedReview(null);
    }
  };

  const handleAvailabilityUpdate = (cafeId) => {

  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CafeWay</h1>

        <div>
          <input
            type="text"
            placeholder="Share a quick review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleReviewSubmit}>Submit</button>
        </div>

        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <p onClick={() => setSelectedReview(review)}>{review.text}</p>

              <ul className="reply-list">
                {review.replies.map((reply, index) => (
                  <li key={index} className="reply-item">
                    <span className="reply-label">Reply:</span> {reply}
                  </li>
                ))}
              </ul>

              {selectedReview && selectedReview.id === review.id && (
                <div className="reply-input">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => handleReplySubmit(review.id)}>
                    Send
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="availability-section">
          <h2>Update Cafe Availability</h2>
          <input
            type="text"
            placeholder="Seating status (e.g., Few seats left)"
            value={cafeStatus.seating}
            onChange={(e) =>
              setCafeStatus({ ...cafeStatus, seating: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Outlet status (e.g., All taken)"
            value={cafeStatus.outlets}
            onChange={(e) =>
              setCafeStatus({ ...cafeStatus, outlets: e.target.value })
            }
          />
          <button onClick={() => handleAvailabilityUpdate('cafe-123')}>
            Update Availability
          </button>
        </div>

        <div className="availability-display">
          <h2>Availability History</h2>
          {availability['cafe-123']?.history?.map((update, index) => (
            <div key={index} className="availability-item">
              <p>
                <strong>{update.timestamp}:</strong> Seating: {update.seating}, Outlets: {update.outlets}
              </p>
            </div>
          ))}
        </div>

        <div className="cafes-nearby">
          <h2>Cafes Near Me</h2>
          <input
            type="text"
            placeholder="Enter zip code"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter radius (in miles)"
            value={dist}
            onChange={(e) => setDist(e.target.value)}
          />
          <button onClick={findCafes}>
            Search
          </button>

          <ul>
            {cafes.map((cafe, index) => (
              <li className="cafe-card" key={index}>{cafe}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
