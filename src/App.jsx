import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001'); 

function App() {
  const [reviews, setReviews] = useState([]);
  const [availability, setAvailability] = useState({});
  const [newReview, setNewReview] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [cafeStatus, setCafeStatus] = useState({ seating: '', outlets: '' });

  useEffect(() => {
    socket.on('updateReviews', (updatedReviews) => setReviews(updatedReviews));
    socket.on('updateAvailability', (updatedAvailability) =>
      setAvailability(updatedAvailability)
    );

    return () => {
      socket.off('updateReviews');
      socket.off('updateAvailability');
    };
  }, []);

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      const review = { id: Date.now(), text: newReview, replies: [] };
      socket.emit('newReview', review);
      setNewReview('');
    }
  };

  const handleReplySubmit = (reviewId) => {
    if (replyText.trim()) {
      socket.emit('newReply', { reviewId, text: replyText });
      setReplyText('');
      setSelectedReview(null);
    }
  };

  const handleAvailabilityUpdate = (cafeId) => {
    socket.emit('updateAvailability', {
      cafeId,
      seating: cafeStatus.seating,
      outlets: cafeStatus.outlets,
    });
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
      </header>
    </div>
  );
}

export default App;
